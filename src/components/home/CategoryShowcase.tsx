import Image from "next/image";
import Link from "next/link";
import {
  BRACELET_IMAGES,
  EARRING_IMAGES,
  NECKLACE_IMAGES,
  RING_IMAGES,
  SET_FLATLAY_IMAGES,
} from "@/lib/commerce/images";
import { getProductsByCategory } from "@/lib/commerce/data";
import { Reveal } from "@/components/ui/Reveal";

const CATEGORIES = [
  { label: "Rings", href: "/shop/rings", image: RING_IMAGES[0], category: "rings" as const },
  { label: "Earrings", href: "/shop/earrings", image: EARRING_IMAGES[0], category: "earrings" as const },
  { label: "Necklaces", href: "/shop/necklaces", image: NECKLACE_IMAGES[0], category: "necklaces" as const },
  { label: "Bracelets", href: "/shop/bracelets", image: BRACELET_IMAGES[0], category: "bracelets" as const },
  { label: "Sets", href: "/shop/sets", image: SET_FLATLAY_IMAGES[0], category: "sets" as const },
];

export function CategoryShowcase() {
  return (
    <section className="container-aavira py-20 md:py-28">
      <Reveal className="text-center mb-12 md:mb-14">
        <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-2">
          Browse Top Categories
        </p>
        <h2 className="font-display text-3xl md:text-4xl">Find Your Piece</h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {CATEGORIES.map((cat, i) => {
          const count = getProductsByCategory(cat.category).length;
          return (
            <Reveal key={cat.href} delay={Math.min(i * 0.06, 0.3)}>
              <Link href={cat.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-cream text-sm uppercase tracking-[0.1em]">
                      {cat.label}
                    </p>
                    <p className="text-cream/70 text-[11px] mt-0.5">
                      {count} {count === 1 ? "piece" : "pieces"}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
