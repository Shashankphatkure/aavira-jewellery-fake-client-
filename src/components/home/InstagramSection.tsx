import Image from "next/image";
import Link from "next/link";
import {
  EARRING_IMAGES,
  LIFESTYLE_IMAGES,
  NECKLACE_IMAGES,
  RING_IMAGES,
  BRACELET_IMAGES,
} from "@/lib/commerce/images";
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { Reveal } from "@/components/ui/Reveal";

const GRID_TILES = [
  {
    image: LIFESTYLE_IMAGES.layeredNecklaceModel,
    caption: "Layered for everyday",
    href: "/shop/necklaces",
  },
  {
    image: RING_IMAGES[0],
    caption: "The Rosette Ring",
    href: "/shop/rings",
  },
  {
    image: LIFESTYLE_IMAGES.editorialPortrait,
    caption: "Effortless gold",
    href: "/shop",
  },
  {
    image: NECKLACE_IMAGES[3],
    caption: "Evening ready",
    href: "/shop/necklaces",
  },
  {
    image: EARRING_IMAGES[4],
    caption: "Stack them up",
    href: "/shop/earrings",
  },
  {
    image: BRACELET_IMAGES[3],
    caption: "Wrist stack",
    href: "/shop/bracelets",
  },
];

export function InstagramSection() {
  return (
    <section className="py-20 md:py-28">
      <Reveal className="container-aavira text-center mb-10">
        <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-2">
          Follow Along
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-3">
          @aavirajewellery
        </h2>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm hover:text-gold-deep transition-colors"
        >
          <InstagramIcon />
          See more on Instagram
        </a>
      </Reveal>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 sm:gap-2">
        {GRID_TILES.map((tile, i) => (
          <Link
            key={i}
            href={tile.href}
            className="relative aspect-square overflow-hidden group block"
          >
            <Image
              src={tile.image}
              alt={tile.caption}
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <InstagramIcon className="absolute top-2.5 right-2.5 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2.5 left-2.5 right-2.5 text-cream text-[11px] sm:text-xs uppercase tracking-[0.06em] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {tile.caption}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
