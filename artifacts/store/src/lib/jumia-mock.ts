export function getDiscount(productId: number) {
  const pcts = [10, 15, 20, 25, 30, 35, 40, 45];
  return pcts[productId % pcts.length];
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