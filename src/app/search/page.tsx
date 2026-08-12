import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchPageClient } from "@/components/shop/SearchPageClient";
import { getProducts } from "@/lib/commerce/data";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <div>
      <PageHeader eyebrow="Search" title="Find your next piece" />
      <SearchPageClient allProducts={products} />
    </div>
  );
}
