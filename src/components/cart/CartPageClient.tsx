"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCommerce } from "@/context/CommerceContext";
import { formatPrice } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";
import { OrderSummary } from "@/components/cart/OrderSummary";

export function CartPageClient() {
  const { cart, updateQuantity, removeFromCart, cartSubtotal } = useCommerce();

  if (cart.length === 0) {
    return (
      <div className="container-aavira py-10 md:py-14">
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-charcoal-soft">
            Your bag is empty. Let&apos;s find something you&apos;ll love.
          </p>
          <LinkButton href="/shop">Continue Shopping</LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="container-aavira py-10 md:py-14">
      <div className="grid lg:grid-cols-[1fr_360px] gap-12">
        <div className="flex flex-col divide-y divide-line">
          {cart.map((line) => (
            <div key={`${line.productId}-${line.variantLabel}`} className="py-6 flex gap-5">
              <Link
                href={`/product/${line.slug}`}
                className="relative h-28 w-24 sm:h-32 sm:w-28 shrink-0 overflow-hidden bg-ivory-deep"
              >
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${line.slug}`}
                      className="font-medium hover:text-gold-deep"
                    >
                      {line.name}
                    </Link>
                    <p className="text-xs text-charcoal-faint mt-1">{line.variantLabel}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeFromCart(line.productId, line.variantLabel)}
                    className="text-charcoal-faint hover:text-charcoal"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center border border-line">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(line.productId, line.variantLabel, line.quantity - 1)
                      }
                      className="h-9 w-9 flex items-center justify-center hover:bg-ivory-deep"
                    >
                      <Minus size={13} strokeWidth={1.5} />
                    </button>
                    <span className="w-8 text-center text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(line.productId, line.variantLabel, line.quantity + 1)
                      }
                      className="h-9 w-9 flex items-center justify-center hover:bg-ivory-deep"
                    >
                      <Plus size={13} strokeWidth={1.5} />
                    </button>
                  </div>
                  <span className="font-medium">{formatPrice(line.price * line.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <OrderSummary subtotal={cartSubtotal} />
          <LinkButton href="/checkout" className="w-full">
            Proceed to Checkout
          </LinkButton>
          <LinkButton href="/shop" variant="ghost" className="w-full">
            Continue Shopping
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
