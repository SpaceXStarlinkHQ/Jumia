import { Router } from "express";
import https from "https";
import http from "http";
import dns from "dns";
import net from "net";

const router = Router();

// ── Allowlist ─────────────────────────────────────────────────────────────────
// Only these hostnames may be proxied. Extend here when adding new image CDNs.
const ALLOWED_HOSTS = new Set([
  "images.unsplash.com",
  "resource.logitech.com",
  "store.storeimages.cdn-apple.com",
  "techmall-images-repo.s3.eu-west-2.amazonaws.com",
  "www.danby.com",
  "www.koolatron.com",
  "www.lg.com",
  "static.nike.com",
  "firmanpowerequipment.com",
  // legacy seed URLs kept for backward compat (may 404, but safe to attempt)
  "contents.mediadecathlon.com",
  "encrypted-tbn0.gstatic.com",
  "i.etsystatic.com",
  "images.samsung.com",
  "m.media-amazon.com",
  "ng.jumia.is",
  "p1-ofp.static.pub",
  "ssl-product-images.www8-hp.com",
  "www.hisense.com.ng",
  "www.neutrogena.com",
  "www.philips.com.ng",
  "www.ralphlauren.com",
]);

// ── SSRF guard ────────────────────────────────────────────────────────────────
// Returns true when the resolved IP must be blocked (private / metadata ranges).
function isPrivateIp(ip: string): boolean {
  if (!net.isIP(ip)) return true; // unparseable → block

  // IPv6 loopback / link-local
  if (ip === "::1") return true;
  if (ip.startsWith("fe80:") || ip.startsWith("FE80:")) return true;
  if (ip.toLowerCase().startsWith("fc") || ip.toLowerCase().startsWith("fd"))
    return true;

  if (!net.isIPv4(ip)) return false; // unknown IPv6 format — allow through

  const parts = ip.split(".").map(Number);
  const [a, b] = parts as [number, number, number, number];

  return (
    a === 10 ||                          // 10.0.0.0/8
    a === 127 ||                          // 127.0.0.0/8  loopback
    (a === 172 && b >= 16 && b <= 31) || // 172.16-31.0.0/12
    (a === 192 && b === 168) ||           // 192.168.0.0/16
    (a === 169 && b === 254) ||           // 169.254.0.0/16  link-local / AWS metadata
    a === 0 ||                            // 0.x.x.x
    a === 100 && b >= 64 && b <= 127 ||   // 100.64-127.x  CGNAT / Replit internal
    a === 198 && (b === 18 || b === 19)   // 198.18-19.x  benchmark
  );
}

async function resolveAndCheckHost(hostname: string): Promise<boolean> {
  return new Promise((resolve) => {
    dns.lookup(hostname, { all: true }, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        resolve(false); // DNS failure → block
        return;
      }
      const safe = addresses.every((a) => !isPrivateIp(a.address));
      resolve(safe);
    });
  });
}

// ── Allowed image content-types ───────────────────────────────────────────────
const ALLOWED_CONTENT_TYPE_PREFIX = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
];

function isImageContentType(ct: string | undefined): boolean {
  if (!ct) return false;
  const lower = ct.toLowerCase();
  return ALLOWED_CONTENT_TYPE_PREFIX.some((p) => lower.startsWith(p));
}

// ── Proxy handler ─────────────────────────────────────────────────────────────
const MAX_REDIRECTS = 2;
const TIMEOUT_MS = 10_000;

async function fetchImage(
  url: URL,
  redirectsLeft: number,
): Promise<{ status: number; contentType: string; body: Buffer } | { error: number }> {
  if (redirectsLeft < 0) return { error: 502 };

  // 1. Allowlist check
  if (!ALLOWED_HOSTS.has(url.hostname)) return { error: 403 };

  // 2. SSRF / private-IP check
  const safe = await resolveAndCheckHost(url.hostname);
  if (!safe) return { error: 403 };

  return new Promise((resolve) => {
    const lib = url.protocol === "https:" ? https : http;

    const req = lib.get(
      url.toString(),
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "image/webp,image/avif,image/apng,image/*,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
      async (res) => {
        const status = res.statusCode ?? 0;
        const location = res.headers["location"];

        // Follow redirect
        if (status >= 300 && status < 400 && location && redirectsLeft > 0) {
          res.resume();
          try {
            const next = new URL(location, url.toString());
            if (!["http:", "https:"].includes(next.protocol)) {
              resolve({ error: 400 });
              return;
            }
            resolve(await fetchImage(next, redirectsLeft - 1));
          } catch {
            resolve({ error: 502 });
          }
          return;
        }

        if (status < 200 || status >= 400) {
          res.resume();
          resolve({ error: status || 502 });
          return;
        }

        const contentType = res.headers["content-type"] ?? "";
        if (!isImageContentType(contentType)) {
          res.resume();
          resolve({ error: 415 }); // Unsupported Media Type
          return;
        }

        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () =>
          resolve({ status, contentType, body: Buffer.concat(chunks) }),
        );
        res.on("error", () => resolve({ error: 502 }));
      },
    );

    req.on("error", () => resolve({ error: 502 }));
    req.setTimeout(TIMEOUT_MS, () => {
      req.destroy();
      resolve({ error: 504 });
    });
  });
}

// GET /api/image-proxy?url=<encoded-url>
router.get("/image-proxy", async (req, res) => {
  const raw = req.query["url"];
  if (typeof raw !== "string" || !raw) {
    res.status(400).json({ error: "Missing url query param" });
    return;
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(raw);
  } catch {
    res.status(400).json({ error: "Invalid url" });
    return;
  }

  if (!["http:", "https:"].includes(targetUrl.protocol)) {
    res.status(400).json({ error: "Only http/https URLs are supported" });
    return;
  }

  const result = await fetchImage(targetUrl, MAX_REDIRECTS);

  if ("error" in result) {
    res.status(result.error).end();
    return;
  }

  res.setHeader("Content-Type", result.contentType);
  res.setHeader("Content-Length", result.body.length);
  res.setHeader(
    "Cache-Control",
    "public, max-age=86400, stale-while-revalidate=604800",
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(result.status).send(result.body);
});

export default router;
