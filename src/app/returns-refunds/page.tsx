import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Returns & Refunds" };

const STEPS = [
  {
    step: "01",
    title: "Request a return",
    body: "Go to your account or write to hello@aavirajewellery.com within 7 days of delivery, with your order number.",
  },
  {
    step: "02",
    title: "We schedule a pickup",
    body: "A reverse pickup is arranged from your address, free of charge, for eligible pin codes.",
  },
  {
    step: "03",
    title: "Inspection",
    body: "Once we receive your return, our team inspects the piece to confirm it's unused and in original packaging.",
  },
  {
    step: "04",
    title: "Refund or exchange",
    body: "Refunds are issued to your original payment method within 5-7 business days, or we ship your exchange right away.",
  },
];

export default function ReturnsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Support"
        title="Returns & Refunds"
        description="Didn't fall in love at first wear? You have 7 days to return or exchange, no questions asked."
      />
      <div className="container-aavira py-14 md:py-20">
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {STEPS.map((s) => (
            <div key={s.step}>
              <span className="font-display text-3xl text-gold">{s.step}</span>
              <h3 className="font-medium mt-3 mb-1.5">{s.title}</h3>
              <p className="text-sm text-charcoal-soft leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl flex flex-col gap-8 text-sm text-charcoal-soft leading-relaxed border-t border-line pt-12">
          <section>
            <h2 className="font-display text-xl text-charcoal mb-2">
              What can be returned
            </h2>
            <p>
              Unused, unworn pieces in their original packaging with all
              tags attached, returned within 7 days of delivery.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-charcoal mb-2">
              What can&apos;t be returned
            </h2>
            <p>
              For hygiene reasons, pierced earrings cannot be returned once
              the packaging seal is opened, unless the piece arrives
              damaged or defective. Customised or personalised pieces are
              also final sale.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-charcoal mb-2">
              Exchanges
            </h2>
            <p>
              Want a different size or finish instead? Select exchange
              rather than refund when you raise your request, and we&apos;ll
              ship the replacement as soon as your return is picked up.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
