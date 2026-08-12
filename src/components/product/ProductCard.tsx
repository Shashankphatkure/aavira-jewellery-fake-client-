"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { cn, formatPrice } from "@/lib/utils";
import { useCommerce } from "@/context/CommerceContext";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { WishlistButton } from "@/components/product/WishlistButton";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { addToCart } = useCommerce();
  const [hovering, setHovering] = useState(false);
  const secondImage = product.images[1];
  const defaultVariantLabel = product.variants[0]?.options[0]?.label ?? "Default";
  const discountPct = product.compareAtPrice
    ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
    : null;

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              hovering && secondImage ? "opacity-0" : "opacity-100"
            )}
          />
          {secondImage && (
            <Image
              src={secondImage}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={cn(
                "object-cover transition-opacity duration-500 absolute inset-0",
                hovering ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.tags.includes("new-arrival") && <Badge variant="new">New</Badge>}
          {product.tags.includes("best-seller") && (
            <Badge variant="bestseller">Bestseller</Badge>
          )}
          {discountPct && <Badge variant="sale">-{discountPct}%</Badge>}
        </div>

        <WishlistButton
          productId={product.id}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-cream/90 hover:bg-cream transition-colors"
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex gap-2 p-3 transition-all duration-300",
            "md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
          )}
        >
          <button
            type="button"
            onClick={() => addToCart(product, defaultVariantLabel)}
            className="flex-1 bg-charcoal text-cream text-[11px] uppercase tracking-[0.1em] py-2.5 hover:bg-gold-deep transition-colors"
          >
            Quick Add
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="bg-cream text-charcoal text-[11px] uppercase tracking-[0.1em] px-3.5 py-2.5 hover:bg-ivory-deep transition-colors"
            >
              View
            </button>
          )}
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3.5">
        <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
        <div className="mt-1 flex items-center gap-1.5">
          <StarRating rating={product.rating} size={11} />
          <span className="text-[11px] text-charcoal-faint">
            ({product.reviewCount})
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span
            className={cn(
              "text-sm",
              product.compareAtPrice && "text-base font-semibold text-blush-deep"
            )}
          >
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-charcoal-faint line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
