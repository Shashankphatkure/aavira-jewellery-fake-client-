"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { PRODUCTS } from "@/lib/commerce/data";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";

const fuse = new Fuse(PRODUCTS, {
  keys: ["name", "category", "material", "description"],
  threshold: 0.35,
});

export function SearchPageClient() {
  const [query, setQuery] = useState("");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((r) => r.item);
  }, [query]);

  return (
    <div className="container-aavira py-10 md:py-14">
      <div className="relative max-w-xl mx-auto mb-12">
        <Search
          size={18}
          strokeWidth={1.5}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-faint"
        />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for rings, necklaces, earrings…"
          className="w-full border border-line bg-cream pl-12 pr-4 py-4 text-sm outline-none focus:border-charcoal transition-colors"
        />
      </div>

      {query.trim() && (
        <p className="text-sm text-charcoal-soft mb-8 text-center">
          {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
        </p>
      )}

      {query.trim() && results.length === 0 && (
        <p className="text-sm text-charcoal-faint text-center py-16">
          No pieces found. Try &ldquo;rings&rdquo;, &ldquo;gold&rdquo; or &ldquo;hoops&rdquo;.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={setQuickView} />
        ))}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
