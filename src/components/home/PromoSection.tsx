import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { NECKLACE_IMAGES } from "@/lib/commerce/images";
import { Reveal } from "@/components/ui/Reveal";

export function PromoSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-charcoal">
      <Image
        src={NECKLACE_IMAGES[3]}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />

      <Reveal className="relative container-aavira text-center max-w-xl mx-auto">
        <p className="text-gold text-xs uppercase tracking-[0.2em] mb-4">
          First Order?
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-cream mb-4 text-balance">
          Get 10% off with code AAVIRA10
        </h2>
        <p className="text-cream/70 mb-8 leading-relaxed">
          Plus free shipping on orders above ₹1,499 and Cash on Delivery,
          anywhere in India.
        </p>
        <LinkButton href="/shop" variant="gold">
          Start Shopping
        </LinkButton>
      </Reveal>
    </section>
  );
}
