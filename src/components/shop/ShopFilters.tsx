"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/commerce/types";
import {
  CATEGORY_LABELS,
  PRICE_BAND_LABELS,
  type PriceBand,
} from "@/lib/commerce/shop-helpers";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];
const PRICE_BANDS = Object.keys(PRICE_BAND_LABELS) as PriceBand[];

export function ShopFilters({
  showCategoryFilter,
  selectedCategories,
  onToggleCategory,
  priceBand,
  onPriceBandChange,
}: {
  showCategoryFilter: boolean;
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
  priceBand: PriceBand;
  onPriceBandChange: (band: PriceBand) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      {showCategoryFilter && (
        <div>
          <h3 className="text-xs uppercase tracking-[0.14em] text-charcoal-soft mb-3">
            Category
          </h3>
          <div className="flex flex-col gap-2.5">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2.5 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onToggleCategory(cat)}
                  className="h-4 w-4 accent-charcoal"
                />
                {CATEGORY_LABELS[cat]}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs uppercase tracking-[0.14em] text-charcoal-soft mb-3">
          Price
        </h3>
        <div className="flex flex-col gap-2.5">
          {PRICE_BANDS.map((band) => (
            <button
              key={band}
              type="button"
              onClick={() => onPriceBandChange(band)}
              className={cn(
                "text-left text-sm py-0.5",
                priceBand === band
                  ? "text-charcoal font-medium"
                  : "text-charcoal-soft hover:text-charcoal"
              )}
            >
              {PRICE_BAND_LABELS[band]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
