// Varied promo discounts per product — realistic spread between 30–70%
const DISCOUNTS: Record<number, number> = {
  21: 65, 22: 58, 23: 62, 24: 65, 25: 60,
  26: 55, 27: 48, 28: 42, 29: 35, 30: 50,
  31: 38, 32: 45, 33: 40, 34: 52, 35: 56,
  36: 47, 37: 30, 38: 44, 39: 36, 40: 33,
};
export function getDiscount(productId: number): number {
  return DISCOUNTS[productId] ?? 40;
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
  return (productId * 17) % 200 + 5;
}
