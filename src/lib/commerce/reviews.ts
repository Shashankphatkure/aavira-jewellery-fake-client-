import type { Review } from "./types";

export function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 5;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
