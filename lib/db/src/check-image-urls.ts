#!/usr/bin/env tsx
/**
 * Image URL Reachability Checker
 *
 * Performs HTTP HEAD requests on every image URL stored in the products table
 * and reports any that do not return HTTP 200. Exits with code 1 if any broken
 * URLs are found so CI / pre-deploy checks can catch them automatically.
 *
 * Run with: pnpm --filter @workspace/db run check-images
 */
import { db, productsTable } from "./index.js";

// ── ANSI helpers ───────────────────────────────────────────────────────────────
const bold  = (s: string) => `\x1b[1m${s}\x1b[0m`;
const red   = (s: string) => `\x1b[31m\x1b[1m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const dim   = (s: string) => `\x1b[2m${s}\x1b[0m`;

// ── Config ─────────────────────────────────────────────────────────────────────
const CONCURRENCY   = 8;   // parallel HEAD requests
const TIMEOUT_MS    = 10_000;
const MAX_REDIRECTS = 5;
const RETRIES       = 2;   // retry once on network error / 5xx

// ── HEAD request with timeout, redirect following, and retry ──────────────────
async function checkUrl(url: string, attempt = 1): Promise<{ ok: boolean; status: number; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "BigDeals-ImageChecker/1.0",
      },
    });
    clearTimeout(timer);
    return { ok: res.status === 200, status: res.status };
  } catch (err: unknown) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : String(err);
    if (attempt < RETRIES && (msg.includes("ECONNRESET") || msg.includes("abort") || msg.includes("timeout"))) {
      await new Promise(r => setTimeout(r, 500 * attempt));
      return checkUrl(url, attempt + 1);
    }
    return { ok: false, status: 0, error: msg };
  }
}

// ── Worker pool ────────────────────────────────────────────────────────────────
async function checkAllUrls(urls: { url: string; productId: number; productName: string; index: number }[]) {
  const results: { url: string; productId: number; productName: string; index: number; ok: boolean; status: number; error?: string }[] = [];

  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const item = urls[i++];
      const result = await checkUrl(item.url);
      results.push({ ...item, ...result });
      const icon = result.ok ? green("✔") : red("✖");
      const statusStr = result.status ? `[${result.status}]` : "[ERR]";
      const shortUrl = item.url.length > 80 ? item.url.slice(0, 77) + "…" : item.url;
      process.stdout.write(`  ${icon} ${statusStr.padEnd(6)} ${dim(shortUrl)}\n`);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);
  return results;
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${bold("══════════════════════════════════════════════════════")}`);
  console.log(`${bold("  BigDeals Nigeria — Image URL Reachability Check")}`);
  console.log(`${bold("══════════════════════════════════════════════════════")}\n`);

  const products = await db.select().from(productsTable).orderBy(productsTable.id);
  console.log(dim(`Loaded ${products.length} products from database.\n`));

  // Collect all image URLs with context
  const allUrls: { url: string; productId: number; productName: string; index: number }[] = [];
  for (const product of products) {
    const images = product.images ?? [];
    for (let idx = 0; idx < images.length; idx++) {
      const url = images[idx];
      if (url && url.startsWith("http")) {
        allUrls.push({ url, productId: product.id, productName: product.name, index: idx });
      }
    }
  }

  console.log(dim(`Checking ${allUrls.length} image URLs (concurrency: ${CONCURRENCY})…\n`));

  const results = await checkAllUrls(allUrls);

  // ── Summary ─────────────────────────────────────────────────────────────────
  const broken = results.filter(r => !r.ok);
  const passed = results.filter(r => r.ok);

  console.log(`\n${bold("══════════════════════════════════════════════════════")}`);
  console.log(`${bold("  Summary")}`);
  console.log(`${bold("══════════════════════════════════════════════════════")}`);
  console.log(`  URLs checked  : ${results.length}`);
  console.log(`  ${green("Reachable")}     : ${passed.length}`);
  console.log(`  ${red("Broken")}        : ${broken.length}`);
  console.log();

  if (broken.length === 0) {
    console.log(green("  ✔ All image URLs are reachable — catalog is image-healthy!\n"));
    return 0;
  }

  console.log(red(`  ✖ ${broken.length} broken URL(s) — fix these before deploying:\n`));
  for (const r of broken) {
    const statusStr = r.status ? `HTTP ${r.status}` : `ERROR: ${r.error ?? "unknown"}`;
    console.log(`  • ${bold(`[Product #${r.productId}]`)} ${r.productName}`);
    console.log(`    Image index ${r.index}: ${yellow(statusStr)}`);
    console.log(dim(`    ${r.url}`));
    console.log();
  }
  return 1;
}

main()
  .then(exitCode => process.exit(exitCode))
  .catch(err => {
    console.error("URL check failed:", err);
    process.exit(2);
  });
