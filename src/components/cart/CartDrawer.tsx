"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { useCommerce } from "@/context/CommerceContext";
import { formatPrice } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, cartSubtotal } =
    useCommerce();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-charcoal/40"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 w-full max-w-md bg-ivory shadow-lift flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-5 border-b border-line">
              <h2 className="font-display text-lg">
                Your Bag {cart.length > 0 && `(${cart.length})`}
              </h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
                className="p-2"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-charcoal-soft text-sm">
                  Your bag is empty. Let&apos;s find something you&apos;ll love.
                </p>
                <LinkButton href="/shop" size="sm" onClick={closeCart}>
                  Continue Shopping
                </LinkButton>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
                  {cart.map((line) => (
                    <div
                      key={`${line.productId}-${line.variantLabel}`}
                      className="flex gap-4"
                    >
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-ivory-deep">
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/product/${line.slug}`}
                              onClick={closeCart}
                              className="text-sm font-medium hover:text-gold-deep"
                            >
                              {line.name}
                            </Link>
                            <p className="text-xs text-charcoal-faint mt-1">
                              {line.variantLabel}
                            </p>
                          </div>
                          <span className="text-sm">
                            {formatPrice(line.price * line.quantity)}
                          </span>
                        </div>
                        <div className="mt-auto flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQuantity(
                                line.productId,
                                line.variantLabel,
                                line.quantity - 1
                              )
                            }
                            className="h-7 w-7 border border-line flex items-center justify-center hover:border-charcoal"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs w-4 text-center">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(
                                line.productId,
                                line.variantLabel,
                                line.quantity + 1
                              )
                            }
                            className="h-7 w-7 border border-line flex items-center justify-center hover:border-charcoal"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line px-5 py-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal-soft">Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(cartSubtotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-faint">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <LinkButton href="/checkout" onClick={closeCart} className="w-full">
                    Checkout
                  </LinkButton>
                  <LinkButton
                    href="/cart"
                    variant="outline"
                    onClick={closeCart}
                    className="w-full"
                  >
                    View Bag
                  </LinkButton>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
