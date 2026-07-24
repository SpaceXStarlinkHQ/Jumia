/**
 * Routes an external image URL through the API server proxy so that
 * hotlink-protected sources (Jumia, Amazon, LG, etc.) load correctly.
 *
 * In development (Replit), the API is reachable at /api (path-routed by the
 * Replit proxy). In production (Vercel), VITE_API_BASE_URL points at the
 * Railway backend, so we build an absolute URL to avoid hitting Vercel itself.
 */
export function proxyImage(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  // Already a relative / data URL — serve as-is
  if (url.startsWith("/") || url.startsWith("data:")) return url;
  // In production, VITE_API_BASE_URL is set to the Railway API origin.
  // Use it to build an absolute proxy URL; fall back to relative /api in dev.
  const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)
    ? (import.meta.env.VITE_API_BASE_URL as string).replace(/\/$/, "")
    : "/api";
  return `${apiBase}/image-proxy?url=${encodeURIComponent(url)}`;
}
