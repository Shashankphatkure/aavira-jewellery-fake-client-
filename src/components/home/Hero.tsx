"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { LinkButton } from "@/components/ui/Button";
import { LIFESTYLE_IMAGES } from "@/lib/commerce/images";

export function Hero() {
  return (
    <section className="relative h-[86vh] min-h-[560px] max-h-[900px] w-full overflow-hidden bg-charcoal">
      <Image
        src={LIFESTYLE_IMAGES.editorialPortrait}
        alt="Woman wearing Aavira gold hoop earrings and rings"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center] opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />

      <div className="relative h-full container-aavira flex flex-col justify-end pb-16 md:pb-24 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/80 text-xs uppercase tracking-[0.2em] mb-4"
        >
          The Everyday Edit
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-cream max-w-xl text-balance leading-[1.08]"
        >
          Jewellery designed to become part of your everyday.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-cream/85 max-w-md leading-relaxed"
        >
          Elegant, modern pieces in 18K gold vermeil and sterling silver —
          priced for real life, made for wearing often.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <LinkButton href="/shop/new-arrivals" variant="gold">
            Shop New Arrivals
          </LinkButton>
          <LinkButton
            href="/shop/best-sellers"
            variant="outline"
            className="!border-cream text-cream hover:!bg-cream hover:!text-charcoal"
          >
            Shop Best Sellers
          </LinkButton>
        </motion.div>
      </div>
    </section>
  );
}
