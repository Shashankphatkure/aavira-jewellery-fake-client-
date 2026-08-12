"use client";

import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { applyCoupon, shippingFee } from "@/lib/commerce/coupon";
import { formatPrice } from "@/lib/utils";

export function OrderSummary({
  subtotal,
  onTotalChange,
}: {
  subtotal: number;
  onTotalChange?: (total: number) => void;
}) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<
    { code: string; discount: number; message: string } | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const shipping = shippingFee(subtotal);
  const discount = applied?.discount ?? 0;
  const total = Math.max(0, subtotal - discount + shipping);

  useEffect(() => {
    onTotalChange?.(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  function handleApply() {
    if (!code.trim()) return;
    const result = applyCoupon(code, subtotal);
    if (result.valid) {
      setApplied({ code: result.code, discount: result.discount, message: result.message });
      setError(null);
    } else {
      setApplied(null);
      setError(result.message);
    }
  }

  return (
    <div className="border border-line p-6 flex flex-col gap-5">
      <div>
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-charcoal-soft mb-2">
          <Tag size={13} strokeWidth={1.5} /> Coupon Code
        </label>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="AAVIRA10"
            className="flex-1 border border-line bg-cream px-3 py-2.5 text-sm outline-none focus:border-charcoal"
          />
          <button
            type="button"
            onClick={handleApply}
            className="px-4 text-xs uppercase tracking-[0.1em] border border-charcoal hover:bg-charcoal hover:text-cream transition-colors"
          >
            Apply
          </button>
        </div>
        {applied && (
          <p className="text-xs text-gold-deep mt-2">
            &ldquo;{applied.code}&rdquo; applied — {applied.message}
          </p>
        )}
        {error && <p className="text-xs text-error mt-2">{error}</p>}
      </div>

      <div className="flex flex-col gap-2.5 text-sm pt-4 border-t border-line-soft">
        <Row label="Subtotal" value={formatPrice(subtotal)} />
        {discount > 0 && <Row label="Discount" value={`-${formatPrice(discount)}`} />}
        <Row
          label="Shipping"
          value={shipping === 0 ? "Free" : formatPrice(shipping)}
        />
        <div className="flex items-center justify-between pt-2.5 border-t border-line-soft text-base font-medium">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-charcoal-soft">
      <span>{label}</span>
      <span className="text-charcoal">{value}</span>
    </div>
  );
}
