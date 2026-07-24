/**
 * Routes an external image URL through the API server proxy so that
 * hotlink-protected sources (Jumia, Amazon, LG, etc.) load correctly.
 *
 * The API is always reachable at /api (path-routed by the Replit proxy).
 */
export function proxyImage(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  // Already a relative / data URL — serve as-is
  if (url.startsWith("/") || url.startsWith("data:")) return url;
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}
