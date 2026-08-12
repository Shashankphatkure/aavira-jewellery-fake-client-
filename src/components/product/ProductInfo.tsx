"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { cn, formatPrice } from "@/lib/utils";
import { useCommerce } from "@/context/CommerceContext";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { VariantSelector } from "@/components/product/VariantSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { WishlistButton } from "@/components/product/WishlistButton";
import { Accordion } from "@/components/ui/Accordion";

export function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCommerce();
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.variants.map((v) => [v.name, v.options[0].value]))
  );
  const [quantity, setQuantity] = useState(1);
  const discountPct = product.compareAtPrice
    ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
    : null;

  const variantLabel =
    product.variants.map((v) => selected[v.name]).join(" / ") || "Default";

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.14em] text-gold-deep mb-2">
        {product.category}
      </p>
      <h1 className="font-display text-3xl md:text-4xl mb-3">{product.name}</h1>

      <div className="flex items-center gap-2 mb-4">
        <StarRating rating={product.rating} />
        <span className="text-sm text-charcoal-faint">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <span className={cn("text-xl", product.compareAtPrice && "font-semibold text-blush-deep")}>
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="text-charcoal-faint line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="text-xs text-blush-deep font-medium">
              Save {discountPct}%
            </span>
          </>
        )}
      </div>

      <p className="text-charcoal-soft leading-relaxed mb-7">
        {product.description}
      </p>

      <div className="flex flex-col gap-6 mb-7">
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

      <div className="flex items-center gap-4 mb-6">
        <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
        <span className="text-xs text-charcoal-faint">
          {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button
          onClick={() => addToCart(product, variantLabel, quantity)}
          variant="outline"
          className="flex-1"
        >
          Add to Bag
        </Button>
        <Button
          onClick={() => {
            addToCart(product, variantLabel, quantity);
            router.push("/checkout");
          }}
          className="flex-1"
        >
          Buy Now
        </Button>
        <WishlistButton
          productId={product.id}
          size={18}
          className="h-[52px] w-[52px] shrink-0 border border-line hover:border-charcoal transition-colors"
        />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 text-center">
        <TrustItem icon={<Truck size={18} strokeWidth={1.5} />} label="Free shipping over ₹1,499" />
        <TrustItem icon={<RotateCcw size={18} strokeWidth={1.5} />} label="7-day easy returns" />
        <TrustItem icon={<ShieldCheck size={18} strokeWidth={1.5} />} label="Nickel-free & skin-safe" />
      </div>

      <Accordion
        items={[
          {
            question: "Material & Details",
            answer: `${product.material}. ${product.highlights.join(". ")}.`,
          },
          {
            question: "Delivery Information",
            answer:
              "Ships within 24-48 hours. Free delivery above ₹1,499 (₹79 otherwise), 3-6 business days depending on your location. Cash on Delivery available at checkout.",
          },
          {
            question: "Jewellery Care",
            answer:
              "Keep away from water, perfume and lotion. Store in the pouch provided and wipe gently with a soft cloth after wear. See our full Jewellery Care guide for more.",
          },
        ]}
      />
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 border border-line py-4 px-2">
      <span className="text-gold-deep">{icon}</span>
      <span className="text-[10px] uppercase tracking-[0.06em] text-charcoal-soft leading-tight">
        {label}
      </span>
    </div>
  );
}
