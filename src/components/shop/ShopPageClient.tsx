"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { PRODUCTS } from "@/lib/commerce/data";
import type { Category, Product } from "@/lib/commerce/types";
import {
  matchesPriceBand,
  type PriceBand,
  type ShopMode,
  type SortOption,
} from "@/lib/commerce/shop-helpers";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { cn } from "@/lib/utils";

function baseProducts(mode: ShopMode): Product[] {
  if (mode.type === "all") return PRODUCTS;
  if (mode.type === "category")
    return PRODUCTS.filter((p) => p.category === mode.category);
  return PRODUCTS.filter((p) => p.tags.includes(mode.tag));
}

export function ShopPageClient({ mode }: { mode: ShopMode }) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [priceBand, setPriceBand] = useState<PriceBand>("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const products = useMemo(() => {
    let list = baseProducts(mode);

    if (mode.type === "all" && selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    list = list.filter((p) => matchesPriceBand(p.price, priceBand));

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [mode, selectedCategories, priceBand, sort]);

  function toggleCategory(category: Category) {
    setSelectedCategories((s) =>
      s.includes(category) ? s.filter((c) => c !== category) : [...s, category]
    );
  }

  return (
    <div className="container-aavira py-10 md:py-14">
      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block">
          <ShopFilters
            showCategoryFilter={mode.type === "all"}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            priceBand={priceBand}
            onPriceBandChange={setPriceBand}
          />
        </aside>

        <div>
          <ShopToolbar
            count={products.length}
            sort={sort}
            onSortChange={setSort}
            onOpenFilters={() => setMobileFiltersOpen(true)}
          />

          {products.length === 0 ? (
            <p className="text-sm text-charcoal-faint py-20 text-center">
              No pieces match these filters just yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          mobileFiltersOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-charcoal/40"
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 w-[80%] max-w-xs bg-ivory p-6 overflow-y-auto transition-transform duration-300",
            mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg">Filters</h2>
            <button type="button" onClick={() => setMobileFiltersOpen(false)}>
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <ShopFilters
            showCategoryFilter={mode.type === "all"}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            priceBand={priceBand}
            onPriceBandChange={setPriceBand}
          />
        </div>
      </div>
    </div>
  );
}
