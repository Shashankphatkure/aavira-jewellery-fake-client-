import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = { title: "Your Bag" };

export default function CartPage() {
  return (
    <div>
      <PageHeader eyebrow="Bag" title="Your Bag" />
      <CartPageClient />
    </div>
  );
}
