"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LinkButton } from "@/components/ui/Button";
import { LIFESTYLE_IMAGES } from "@/lib/commerce/images";
import { cn } from "@/lib/utils";

type HeroSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  description?: string;
  image?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  placeholder?: boolean;
};

const SLIDES: HeroSlide[] = [
  {
    id: "everyday-edit",
    eyebrow: "The Everyday Edit",
    headline: "Jewellery designed to become part of your everyday.",
    description:
      "Elegant, modern pieces in 18K gold vermeil and sterling silver — priced for real life, made for wearing often.",
    image: LIFESTYLE_IMAGES.editorialPortrait,
    primaryCta: { label: "Shop New Arrivals", href: "/shop/new-arrivals" },
    secondaryCta: { label: "Shop Best Sellers", href: "/shop/best-sellers" },
  },
  {
    id: "next-campaign",
    eyebrow: "Coming Soon",
    headline: "Your next campaign goes here",
    description:
      "This slide is a placeholder — swap it for your next sale, drop, or seasonal moment.",
    placeholder: true,
  },
];

const AUTO_ADVANCE_MS = 6500;

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative h-[86vh] min-h-[560px] max-h-[900px] w-full overflow-hidden bg-charcoal">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {slide.placeholder ? (
            <PlaceholderSlide slide={slide} />
          ) : (
            <ContentSlide slide={slide} />
          )}
        </motion.div>
      </AnimatePresence>

      {SLIDES.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-cream" : "w-1.5 bg-cream/40 hover:bg-cream/70"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ContentSlide({ slide }: { slide: HeroSlide }) {
  return (
    <>
      {slide.image && (
        <Image
          src={slide.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] opacity-90"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />

      <div className="relative h-full container-aavira flex flex-col justify-end pb-16 md:pb-24 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/80 text-xs uppercase tracking-[0.2em] mb-4"
        >
          {slide.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-cream max-w-xl text-balance leading-[1.08]"
        >
          {slide.headline}
        </motion.h1>
        {slide.description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-cream/85 max-w-md leading-relaxed"
          >
            {slide.description}
          </motion.p>
        )}
        {(slide.primaryCta || slide.secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {slide.primaryCta && (
              <LinkButton href={slide.primaryCta.href} variant="gold">
                {slide.primaryCta.label}
              </LinkButton>
            )}
            {slide.secondaryCta && (
              <LinkButton
                href={slide.secondaryCta.href}
                variant="outline"
                className="!border-cream text-cream hover:!bg-cream hover:!text-charcoal"
              >
                {slide.secondaryCta.label}
              </LinkButton>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}

function PlaceholderSlide({ slide }: { slide: HeroSlide }) {
  return (
    <div className="h-full w-full bg-ivory-deep flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border border-dashed border-charcoal-faint/50 px-10 py-14 text-center max-w-md"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep mb-3">
          {slide.eyebrow}
        </p>
        <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-3 text-balance">
          {slide.headline}
        </h2>
        {slide.description && (
          <p className="text-sm text-charcoal-soft leading-relaxed">
            {slide.description}
          </p>
        )}
      </motion.div>
    </div>
  );
}
