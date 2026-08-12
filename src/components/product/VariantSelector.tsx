"use client";

import { cn } from "@/lib/utils";
import type { Variant } from "@/lib/commerce/types";

export function VariantSelector({
  variant,
  selected,
  onSelect,
}: {
  variant: Variant;
  selected: string;
  onSelect: (value: string) => void;
}) {
  const isSwatch = variant.options.some((o) => o.swatch);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.12em] text-charcoal-soft mb-2.5">
        {variant.name}
        <span className="text-charcoal-faint normal-case tracking-normal">
          {" "}
          — {selected}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {variant.options.map((option) =>
          isSwatch ? (
            <button
              key={option.value}
              type="button"
              aria-label={option.label}
              onClick={() => onSelect(option.value)}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-colors",
                selected === option.value ? "border-charcoal" : "border-transparent"
              )}
              style={{ backgroundColor: option.swatch }}
            />
          ) : (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={cn(
                "px-4 py-2 text-xs uppercase tracking-[0.08em] border transition-colors",
                selected === option.value
                  ? "border-charcoal bg-charcoal text-cream"
                  : "border-line hover:border-charcoal"
              )}
            >
              {option.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
