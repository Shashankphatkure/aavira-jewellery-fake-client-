import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { averageRating } from "./reviews";
import type { Category, Product, Review, Tag, Variant } from "./types";

function mapReview(row: {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
  verified: boolean;
}): Review {
  return {
    id: row.id,
    author: row.author,
    rating: row.rating as Review["rating"],
    title: row.title,
    body: row.body,
    date: row.created_at.slice(0, 10),
    verified: row.verified,
  };
}

function mapProduct(
  row: {
    id: string;
    slug: string;
    name: string;
    category: string;
    tags: string[];
    price: number;
    compare_at_price: number | null;
    description: string;
    highlights: string[];
    material: string;
    images: string[];
    variants: unknown;
    stock: number;
  },
  reviews: Review[]
): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as Category,
    tags: row.tags as Tag[],
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    images: row.images,
    description: row.description,
    highlights: row.highlights,
    material: row.material,
    variants: row.variants as Variant[],
    stock: row.stock,
    rating: averageRating(reviews),
    reviewCount: reviews.length,
    reviews,
  };
}

// React's cache() memoizes this per request/render pass, so calling
// getProducts(), getProductBySlug(), etc. from many components in the same
// page only hits the database once.
const fetchAllProducts = cache(async (): Promise<Product[]> => {
  const supabase = createPublicClient();

  const [{ data: productRows, error: productsError }, { data: reviewRows, error: reviewsError }] =
    await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: true }),
      supabase.from("reviews").select("*").order("created_at", { ascending: true }),
    ]);

  if (productsError) throw productsError;
  if (reviewsError) throw reviewsError;

  const reviewsByProduct = new Map<string, Review[]>();
  for (const row of reviewRows ?? []) {
    const list = reviewsByProduct.get(row.product_id) ?? [];
    list.push(mapReview(row));
    reviewsByProduct.set(row.product_id, list);
  }

  return (productRows ?? []).map((row) =>
    mapProduct(row, reviewsByProduct.get(row.id) ?? [])
  );
});

export async function getProducts(): Promise<Product[]> {
  return fetchAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await fetchAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.filter((p) => p.category === category);
}

export async function getNewArrivals(): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.filter((p) => p.tags.includes("new-arrival"));
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.filter((p) => p.tags.includes("best-seller"));
}

export async function getRelatedProducts(product: Product, count = 4): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}
