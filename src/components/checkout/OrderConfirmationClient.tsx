"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { readLastOrderSnapshot, type Order } from "@/lib/commerce/orders";
import { formatPrice } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

export function OrderConfirmationClient() {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    // Hydrating client-only sessionStorage after mount avoids an SSR/client markup mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(readLastOrderSnapshot());
  }, []);

  if (order === undefined) return null;

  if (order === null) {
    return (
      <div className="container-aavira py-20 text-center">
        <p className="text-charcoal-soft mb-5">
          We couldn&apos;t find a recent order. If you just checked out, try
          refreshing this page.
        </p>
        <LinkButton href="/shop">Continue Shopping</LinkButton>
      </div>
    );
  }

  return (
    <div className="container-aavira py-14 md:py-20 max-w-2xl mx-auto text-center">
      <CheckCircle2 size={44} strokeWidth={1.2} className="mx-auto text-gold-deep mb-5" />
      <h1 className="font-display text-3xl md:text-4xl mb-3">
        Thank you, {order.contactName.split(" ")[0]}
      </h1>
      <p className="text-charcoal-soft mb-1">Your order has been confirmed.</p>
      <p className="text-sm text-charcoal-faint mb-10">
        Order #{order.orderNumber} · A confirmation has been sent to{" "}
        {order.contactEmail}
      </p>

      <div className="border border-line text-left divide-y divide-line-soft mb-8">
        {order.items.map((line) => (
          <div key={line.id} className="flex gap-4 p-4">
            <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-ivory-deep">
              <Image src={line.image} alt={line.productName} fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{line.productName}</p>
                <p className="text-xs text-charcoal-faint">
                  {line.variantLabel} · Qty {line.quantity}
                </p>
              </div>
              <span className="text-sm">{formatPrice(line.price * line.quantity)}</span>
            </div>
          </div>
        ))}
        <div className="flex justify-between p-4 text-sm font-medium">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 text-left mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-charcoal-faint mb-1.5">
            Shipping to
          </p>
          <p className="text-sm text-charcoal-soft leading-relaxed">
            {order.addressLine1}
            {order.addressLine2 && `, ${order.addressLine2}`}
            <br />
            {order.city}, {order.state} {order.pincode}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-charcoal-faint mb-1.5">
            Payment
          </p>
          <p className="text-sm text-charcoal-soft">
            {order.paymentMethod === "upi"
              ? "UPI"
              : order.paymentMethod === "card"
                ? "Credit / Debit Card"
                : "Cash on Delivery"}
          </p>
        </div>
      </div>

      <LinkButton href="/shop">Continue Shopping</LinkButton>
    </div>
  );
}
