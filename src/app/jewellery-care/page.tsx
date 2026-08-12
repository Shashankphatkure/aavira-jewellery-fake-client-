import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Jewellery Care" };

const DO = [
  "Store pieces separately in the pouch or box they arrived in",
  "Put jewellery on last, after perfume, lotion and hairspray",
  "Wipe gently with a soft, dry cloth after each wear",
  "Remove before swimming, bathing or sleeping",
];

const AVOID = [
  "Direct contact with water, sweat, or perfume",
  "Chlorine, sea water, and swimming pools",
  "Harsh scrubbing or ultrasonic cleaners",
  "Leaving pieces tangled together in one place",
];

export default function JewelleryCarePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Support"
        title="Jewellery Care"
        description="A little care goes a long way. Follow these tips to keep your Aavira pieces looking as good as day one."
      />
      <div className="container-aavira py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 max-w-3xl">
          <div>
            <h2 className="font-display text-xl mb-4">Do</h2>
            <ul className="flex flex-col gap-3">
              {DO.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-charcoal-soft leading-relaxed">
                  <span className="text-gold-deep mt-0.5">＋</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl mb-4">Avoid</h2>
            <ul className="flex flex-col gap-3">
              {AVOID.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-charcoal-soft leading-relaxed">
                  <span className="text-blush-deep mt-0.5">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-2xl mt-16 pt-12 border-t border-line">
          <h2 className="font-display text-xl mb-3">About our materials</h2>
          <p className="text-sm text-charcoal-soft leading-relaxed">
            Most Aavira pieces are crafted in 18K gold vermeil (a thick layer
            of gold over 925 sterling silver) or solid 925 sterling silver —
            far more durable than standard plated fashion jewellery, but
            still precious metal that deserves a little care. With the tips
            above, your pieces are made to be worn often, for years.
          </p>
        </div>
      </div>
    </div>
  );
}
