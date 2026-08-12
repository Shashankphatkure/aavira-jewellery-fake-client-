"use client";

import { SlidersHorizontal } from "lucide-react";
import { SORT_LABELS, type SortOption } from "@/lib/commerce/shop-helpers";

export function ShopToolbar({
  count,
  sort,
  onSortChange,
  onOpenFilters,
}: {
  count: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenFilters: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
      <button
        type="button"
        onClick={onOpenFilters}
        className="lg:hidden inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em]"
      >
        <SlidersHorizontal size={15} strokeWidth={1.5} />
        Filters
      </button>
      <span className="hidden lg:inline text-sm text-charcoal-soft">
        {count} {count === 1 ? "piece" : "pieces"}
      </span>
      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] ml-auto">
        <span className="hidden sm:inline text-charcoal-soft">Sort by</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-transparent border border-line px-3 py-2 outline-none focus:border-charcoal"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
