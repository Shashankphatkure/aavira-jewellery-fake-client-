import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CRAFTSMANSHIP_IMAGES } from "@/lib/commerce/images";
import { Reveal } from "@/components/ui/Reveal";

export function BrandStory() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-aavira grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] overflow-hidden bg-ivory-deep mt-8">
            <Image
              src={CRAFTSMANSHIP_IMAGES[1]}
              alt="Goldsmith soldering a ring by hand"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-ivory-deep">
            <Image
              src={CRAFTSMANSHIP_IMAGES[2]}
              alt="Jeweller shaping metal on a workbench"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-3">
            Our Story
          </p>
          <blockquote className="mb-6">
            <span className="font-display text-gold text-5xl leading-none block mb-2" aria-hidden>
              &ldquo;
            </span>
            <p className="font-display italic text-2xl md:text-[1.75rem] leading-snug text-balance">
              We wanted jewellery you&apos;d reach for on an ordinary Tuesday
              — not just save for a wedding.
            </p>
            <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-charcoal-faint">
              — The Aavira Founding Team
            </footer>
          </blockquote>
          <p className="text-charcoal-soft leading-relaxed mb-4">
            Most of what we saw online was either flimsy fast-fashion or
            traditional showroom gold — nothing in between for someone who
            just wants to get dressed and feel put together. So we built the
            in-between: 18K gold vermeil and sterling silver pieces, priced
            for actual daily wear.
          </p>
          <p className="text-charcoal-soft leading-relaxed mb-7">
            Every piece is designed in Mumbai and tested for the way people
            really live — through humid commutes, long workdays and
            everything after.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] border-b border-charcoal pb-1 hover:text-gold-deep hover:border-gold-deep transition-colors"
          >
            Read Our Full Story <ArrowUpRight size={14} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
