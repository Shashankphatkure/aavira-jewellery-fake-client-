"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import { useCommerce } from "@/context/CommerceContext";
import { formatPrice, cn } from "@/lib/utils";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button, LinkButton } from "@/components/ui/Button";
import { saveLastOrder } from "@/lib/commerce/order";

const STEPS = ["Contact", "Shipping", "Payment", "Review"] as const;
type PaymentMethod = "upi" | "card" | "cod";

const inputClasses =
  "w-full border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-charcoal transition-colors";

export function CheckoutClient() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useCommerce();
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(cartSubtotal);
  const [payment, setPayment] = useState<PaymentMethod>("upi");

  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (cart.length === 0) {
    return (
      <div className="container-aavira py-20 text-center">
        <p className="text-charcoal-soft mb-5">
          Your bag is empty — add something before checking out.
        </p>
        <LinkButton href="/shop">Continue Shopping</LinkButton>
      </div>
    );
  }

  function placeOrder() {
    const orderNumber = `AAV${Math.abs(
      Array.from(contact.email + Date.now())
        .reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 1000000, 7)
    )}`.slice(0, 9);

    saveLastOrder({
      orderNumber,
      contact,
      address,
      payment,
      items: cart,
      total,
      placedAt: new Date().toISOString(),
    });
    clearCart();
    router.push("/checkout/confirmation");
  }

  return (
    <div className="container-aavira py-10 md:py-14">
      <ol className="flex items-center gap-3 sm:gap-6 mb-10 overflow-x-auto">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-[11px]",
                i < step
                  ? "bg-gold text-cream"
                  : i === step
                    ? "bg-charcoal text-cream"
                    : "bg-ivory-deep text-charcoal-faint"
              )}
            >
              {i < step ? <Check size={12} /> : i + 1}
            </span>
            <span
              className={cn(
                "text-xs uppercase tracking-[0.08em]",
                i === step ? "text-charcoal" : "text-charcoal-faint"
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="grid lg:grid-cols-[1fr_360px] gap-12">
        <div>
          {step === 0 && (
            <div className="flex flex-col gap-4 max-w-md">
              <h2 className="font-display text-xl mb-1">Contact Information</h2>
              <input
                required
                placeholder="Full name"
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                className={inputClasses}
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                className={inputClasses}
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                value={contact.phone}
                onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                className={inputClasses}
              />
              <Button
                className="self-start mt-2"
                disabled={!contact.name || !contact.email || !contact.phone}
                onClick={() => setStep(1)}
              >
                Continue to Shipping
              </Button>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4 max-w-md">
              <h2 className="font-display text-xl mb-1">Shipping Address</h2>
              <input
                required
                placeholder="Address line 1"
                value={address.line1}
                onChange={(e) => setAddress((a) => ({ ...a, line1: e.target.value }))}
                className={inputClasses}
              />
              <input
                placeholder="Address line 2 (optional)"
                value={address.line2}
                onChange={(e) => setAddress((a) => ({ ...a, line2: e.target.value }))}
                className={inputClasses}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                  className={inputClasses}
                />
                <input
                  required
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
                  className={inputClasses}
                />
              </div>
              <input
                required
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress((a) => ({ ...a, pincode: e.target.value }))}
                className={inputClasses}
              />
              <div className="flex gap-3 mt-2">
                <Button variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button
                  disabled={!address.line1 || !address.city || !address.state || !address.pincode}
                  onClick={() => setStep(2)}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4 max-w-md">
              <h2 className="font-display text-xl mb-1">Payment Method</h2>
              <PaymentOption
                id="upi"
                label="UPI"
                description="Pay via Google Pay, PhonePe, Paytm or any UPI app"
                selected={payment === "upi"}
                onSelect={() => setPayment("upi")}
              />
              <PaymentOption
                id="card"
                label="Credit / Debit Card"
                description="Visa, Mastercard, RuPay accepted"
                selected={payment === "card"}
                onSelect={() => setPayment("card")}
              >
                {payment === "card" && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <input placeholder="Card number" className={cn(inputClasses, "col-span-2")} />
                    <input placeholder="MM / YY" className={inputClasses} />
                    <input placeholder="CVV" className={inputClasses} />
                  </div>
                )}
              </PaymentOption>
              <PaymentOption
                id="cod"
                label="Cash on Delivery"
                description="Pay in cash when your order arrives"
                selected={payment === "cod"}
                onSelect={() => setPayment("cod")}
              />
              <div className="flex gap-3 mt-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>Review Order</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-md">
              <h2 className="font-display text-xl mb-4">Review Your Order</h2>
              <div className="border border-line divide-y divide-line-soft text-sm mb-6">
                <SummaryRow label="Contact" value={`${contact.name} · ${contact.email}`} />
                <SummaryRow
                  label="Shipping to"
                  value={`${address.line1}, ${address.city}, ${address.state} ${address.pincode}`}
                />
                <SummaryRow
                  label="Payment"
                  value={
                    payment === "upi" ? "UPI" : payment === "card" ? "Card" : "Cash on Delivery"
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                {cart.map((line) => (
                  <div
                    key={`${line.productId}-${line.variantLabel}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-charcoal-soft">
                      {line.name} ({line.variantLabel}) × {line.quantity}
                    </span>
                    <span>{formatPrice(line.price * line.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={placeOrder}>Place Order — {formatPrice(total)}</Button>
              </div>
            </div>
          )}
        </div>

        <div>
          <OrderSummary subtotal={cartSubtotal} onTotalChange={setTotal} />
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3">
      <span className="text-charcoal-faint">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

function PaymentOption({
  id,
  label,
  description,
  selected,
  onSelect,
  children,
}: {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border p-4 cursor-pointer transition-colors",
        selected ? "border-charcoal" : "border-line hover:border-charcoal-faint"
      )}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
            selected ? "border-charcoal" : "border-line"
          )}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-charcoal" />}
        </span>
        <label htmlFor={id} className="flex-1">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-charcoal-faint mt-0.5">{description}</p>
        </label>
      </div>
      {children}
    </div>
  );
}
