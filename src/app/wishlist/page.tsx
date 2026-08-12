import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { WishlistPageClient } from "@/components/shop/WishlistPageClient";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div>
      <PageHeader eyebrow="Saved" title="Your Wishlist" />
      <WishlistPageClient />
    </div>
  );
}
