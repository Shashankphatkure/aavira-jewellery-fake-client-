import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchPageClient } from "@/components/shop/SearchPageClient";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <div>
      <PageHeader eyebrow="Search" title="Find your next piece" />
      <SearchPageClient />
    </div>
  );
}
