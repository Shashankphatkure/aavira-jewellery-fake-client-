import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div>
      <PageHeader eyebrow="Checkout" title="Checkout" />
      <CheckoutClient />
    </div>
  );
}
