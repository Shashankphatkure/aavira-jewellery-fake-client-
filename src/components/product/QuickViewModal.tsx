"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { cn, formatPrice } from "@/lib/utils";
import { useCommerce } from "@/context/CommerceContext";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { VariantSelector } from "@/components/product/VariantSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {product && <QuickViewContent product={product} onClose={onClose} />}
    </AnimatePresence>
  );
}

function QuickViewContent({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart } = useCommerce();
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      product.variants.map((v) => [v.name, v.options[0].value])
    )
  );
  const [quantity, setQuantity] = useState(1);

  const variantLabel = product.variants
    .map((v) => selected[v.name])
    .join(" / ") || "Default";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-charcoal/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-ivory w-full max-w-3xl max-h-[90vh] overflow-y-auto grid sm:grid-cols-2"
      >
        <button
          type="button"
          aria-label="Close quick view"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-cream flex items-center justify-center"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="relative aspect-square sm:aspect-auto bg-ivory-deep">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="p-6 sm:p-8 flex flex-col">
          <h2 className="font-display text-2xl mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-xs text-charcoal-faint">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <span className={cn("text-lg", product.compareAtPrice && "font-semibold text-blush-deep")}>
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-charcoal-faint line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <p className="text-sm text-charcoal-soft leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex flex-col gap-5 mb-6">
            {product.variants.map((variant) => (
              <VariantSelector
                key={variant.name}
                variant={variant}
                selected={selected[variant.name]}
                onSelect={(value) =>
                  setSelected((s) => ({ ...s, [variant.name]: value }))
                }
              />
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Button
              onClick={() => {
                addToCart(product, variantLabel, quantity);
                onClose();
              }}
              className="w-full"
            >
              Add to Bag
            </Button>
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-center text-xs uppercase tracking-[0.12em] text-charcoal-soft hover:text-charcoal underline underline-offset-4"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
