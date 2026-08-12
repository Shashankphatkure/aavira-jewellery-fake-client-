import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Shipping & Delivery" };

const ROWS = [
  { label: "Metro cities", value: "3-4 business days" },
  { label: "Rest of India", value: "4-6 business days" },
  { label: "Order processing", value: "Ships within 24-48 hours" },
  { label: "Shipping charge", value: "Free above ₹1,499, else ₹79" },
];

export default function ShippingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Support"
        title="Shipping & Delivery"
        description="We ship every order carefully packaged, insured, and trackable — anywhere in India."
      />
      <div className="container-aavira py-14 md:py-20 max-w-2xl">
        <div className="border border-line divide-y divide-line mb-12">
          {ROWS.map((row) => (
            <div key={row.label} className="flex justify-between px-5 py-4 text-sm">
              <span className="text-charcoal-soft">{row.label}</span>
              <span className="font-medium">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 text-sm text-charcoal-soft leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-charcoal mb-2">
              Order tracking
            </h2>
            <p>
              As soon as your order leaves our studio, you&apos;ll get a tracking
              link by email and SMS. You can also check your order status
              anytime from your account.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-charcoal mb-2">
              Cash on Delivery
            </h2>
            <p>
              COD is available on most pin codes across India for orders up
              to ₹10,000. Availability is confirmed automatically at
              checkout based on your delivery address.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-charcoal mb-2">
              International shipping
            </h2>
            <p>
              We currently ship only within India. We&apos;re working on
              bringing Aavira to more countries soon — follow us on
              Instagram for updates.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-charcoal mb-2">
              Packaging
            </h2>
            <p>
              Every piece arrives in Aavira&apos;s signature box, cushioned
              and ready to gift — no extra wrapping needed.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
