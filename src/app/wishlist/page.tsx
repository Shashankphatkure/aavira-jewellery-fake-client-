import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { WishlistPageClient } from "@/components/shop/WishlistPageClient";
import { getProducts } from "@/lib/commerce/data";

export const metadata: Metadata = { title: "Wishlist" };

export default async function WishlistPage() {
  const products = await getProducts();

  return (
    <div>
      <PageHeader eyebrow="Saved" title="Your Wishlist" />
      <WishlistPageClient allProducts={products} />
    </div>
  );
}
