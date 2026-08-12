import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { getProducts } from "@/lib/commerce/data";

export const metadata: Metadata = { title: "Shop All" };

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div>
      <PageHeader
        eyebrow="Shop"
        title="All Jewellery"
        description="The full Aavira edit — browse rings, earrings, necklaces, bracelets and sets."
      />
      <ShopPageClient mode={{ type: "all" }} allProducts={products} />
    </div>
  );
}
