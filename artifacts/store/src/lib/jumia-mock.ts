// Deterministic promo discounts — stable hash so every product ID always gets
// the same value regardless of whether IDs are sequential or sparse.
// Spread: 30–69% (realistic Nigerian e-commerce range).
function deterministicDiscount(productId: number): number {
  // Simple linear congruential hash — no imports needed
  const h = ((productId * 2654435761) >>> 0) % 40;
  return 30 + h; // 30–69
}

export function getDiscount(productId: number): number {
  return deterministicDiscount(productId);
}

export function getOriginalPrice(priceKobo: number, productId: number) {
  const disc = getDiscount(productId);
  return Math.round(priceKobo / (1 - disc / 100));
}

export function getRating(productId: number) {
  const ratings = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8];
  return ratings[productId % ratings.length];
}

export function getReviewCount(productId: number) {
  // Deterministic but varied: 5–497
  return ((productId * 31 + 7) % 493) + 5;
}
