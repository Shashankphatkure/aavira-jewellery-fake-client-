import type { Metadata } from "next";
import Image from "next/image";
import { Gem, Heart, Leaf, MapPin } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  CRAFTSMANSHIP_IMAGES,
  LIFESTYLE_IMAGES,
} from "@/lib/commerce/images";

export const metadata: Metadata = { title: "Our Story" };

const DIFFERENTIATORS = [
  {
    icon: <Gem size={20} strokeWidth={1.5} />,
    title: "Demi-fine, not fast fashion",
    body: "18K gold vermeil and 925 sterling silver — real precious metal, built to outlast a season.",
  },
  {
    icon: <Heart size={20} strokeWidth={1.5} />,
    title: "Made for sensitive skin",
    body: "Every piece is nickel-free and hypoallergenic, tested for all-day, every-day wear.",
  },
  {
    icon: <MapPin size={20} strokeWidth={1.5} />,
    title: "Designed in Mumbai",
    body: "Our team designs, photographs and ships every piece from right here in India.",
  },
  {
    icon: <Leaf size={20} strokeWidth={1.5} />,
    title: "Direct-to-you pricing",
    body: "No middlemen, no showroom markups — just honest pricing between ₹799 and ₹6,999.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] max-h-[640px] w-full overflow-hidden bg-charcoal">
        <Image
          src={LIFESTYLE_IMAGES.dramaticPortrait}
          alt="Model wearing Aavira jewellery"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <div className="relative h-full container-aavira flex flex-col justify-end pb-14">
          <p className="text-cream/80 text-xs uppercase tracking-[0.2em] mb-4">
            Our Story
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-cream max-w-2xl text-balance leading-tight">
            Jewellery designed to become part of your everyday.
          </h1>
        </div>
      </section>

      <section className="container-aavira py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-3">
            Why We Started
          </p>
          <h2 className="font-display text-3xl mb-5 text-balance">
            We wanted jewellery that didn&apos;t wait for an occasion.
          </h2>
          <p className="text-charcoal-soft leading-relaxed mb-4">
            Aavira started with a simple frustration: everything available
            online felt like one of two extremes — flimsy costume jewellery
            that turned green in a week, or traditional showroom gold that
            felt formal, expensive, and reserved for weddings.
          </p>
          <p className="text-charcoal-soft leading-relaxed mb-4">
            We wanted something in between. Pieces good enough to wear daily,
            without needing a special occasion or a five-figure budget to
            justify them.
          </p>
          <p className="text-charcoal-soft leading-relaxed">
            So in 2023, we built Aavira — a small, Mumbai-based team designing
            demi-fine jewellery for the way people actually live, priced
            between ₹799 and ₹6,999.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
          <Image
            src={LIFESTYLE_IMAGES.layeredNecklaceModel}
            alt="Woman wearing layered Aavira necklaces"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      <section className="bg-ivory-deep/60 py-16 md:py-24">
        <div className="container-aavira grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal className="grid grid-cols-2 gap-4 order-2 md:order-1">
            <div className="relative aspect-square overflow-hidden bg-cream">
              <Image
                src={CRAFTSMANSHIP_IMAGES[0]}
                alt="Goldsmith soldering a piece by hand"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-cream mt-8">
              <Image
                src={CRAFTSMANSHIP_IMAGES[2]}
                alt="Jeweller shaping metal by hand"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 md:order-2">
            <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-3">
              Design & Craftsmanship
            </p>
            <h2 className="font-display text-3xl mb-5 text-balance">
              Built by hand, designed to be worn without a second thought.
            </h2>
            <p className="text-charcoal-soft leading-relaxed mb-4">
              Every Aavira piece begins as a sketch informed by what we
              actually see people reaching for — clean lines, wearable
              proportions, details that hold up to close inspection rather
              than just photographing well.
            </p>
            <p className="text-charcoal-soft leading-relaxed">
              We work in 18K gold vermeil over 925 sterling silver and solid
              sterling silver, finished and quality-checked by hand before
              any piece reaches you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-aavira py-16 md:py-24">
        <Reveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-2">
            What Makes Us Different
          </p>
          <h2 className="font-display text-3xl md:text-4xl">
            The Aavira difference
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.08, 0.3)}>
              <div className="border border-line p-6 h-full">
                <span className="text-gold-deep">{item.icon}</span>
                <h3 className="font-medium mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal-soft leading-relaxed">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-16 md:py-20 text-center">
        <Reveal className="container-aavira">
          <h2 className="font-display text-2xl md:text-3xl text-cream mb-6">
            Ready to find your everyday piece?
          </h2>
          <LinkButton href="/shop" variant="gold">
            Shop The Full Edit
          </LinkButton>
        </Reveal>
      </section>
    </div>
  );
}
