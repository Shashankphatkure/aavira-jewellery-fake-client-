"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  quantity,
  onChange,
  max = 10,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-line">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="h-11 w-11 flex items-center justify-center hover:bg-ivory-deep transition-colors disabled:opacity-30"
        disabled={quantity <= 1}
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="w-10 text-center text-sm">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="h-11 w-11 flex items-center justify-center hover:bg-ivory-deep transition-colors disabled:opacity-30"
        disabled={quantity >= max}
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
