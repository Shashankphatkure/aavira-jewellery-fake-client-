import type { Category } from "./types";

export const CATEGORY_LABELS: Record<Category, string> = {
  rings: "Rings",
  earrings: "Earrings",
  necklaces: "Necklaces",
  bracelets: "Bracelets",
  sets: "Sets",
};

export type ShopMode =
  | { type: "all" }
  | { type: "category"; category: Category }
  | { type: "tag"; tag: "new-arrival" | "best-seller"; label: string };

const CATEGORY_SLUGS = Object.keys(CATEGORY_LABELS) as Category[];

export function shopModeTitle(mode: ShopMode): string {
  if (mode.type === "all") return "All Jewellery";
  if (mode.type === "category") return CATEGORY_LABELS[mode.category];
  return mode.label;
}

export function resolveShopMode(categorySlug: string): ShopMode | null {
  if (categorySlug === "new-arrivals") {
    return { type: "tag", tag: "new-arrival", label: "New Arrivals" };
  }
  if (categorySlug === "best-sellers") {
    return { type: "tag", tag: "best-seller", label: "Best Sellers" };
  }
  if (CATEGORY_SLUGS.includes(categorySlug as Category)) {
    return { type: "category", category: categorySlug as Category };
  }
  return null;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
};

export type PriceBand = "all" | "under-1500" | "1500-2500" | "above-2500";

export const PRICE_BAND_LABELS: Record<PriceBand, string> = {
  all: "All Prices",
  "under-1500": "Under ₹1,500",
  "1500-2500": "₹1,500 – ₹2,500",
  "above-2500": "Above ₹2,500",
};

export function matchesPriceBand(price: number, band: PriceBand) {
  if (band === "all") return true;
  if (band === "under-1500") return price < 1500;
  if (band === "1500-2500") return price >= 1500 && price <= 2500;
  return price > 2500;
}
