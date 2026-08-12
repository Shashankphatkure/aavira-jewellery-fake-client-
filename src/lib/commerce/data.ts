import type { Product, Variant } from "./types";
import {
  BRACELET_IMAGES,
  EARRING_IMAGES,
  NECKLACE_IMAGES,
  RING_IMAGES,
  SET_FLATLAY_IMAGES,
} from "./images";
import { averageRating, makeReviews } from "./reviews";

const FINISH_GOLD_ROSE_SILVER: Variant = {
  name: "Finish",
  options: [
    { label: "Gold", value: "gold", swatch: "#B8925A" },
    { label: "Rose Gold", value: "rose-gold", swatch: "#D8A8A0" },
    { label: "Silver", value: "silver", swatch: "#C9CDD3" },
  ],
};

const FINISH_GOLD_SILVER: Variant = {
  name: "Finish",
  options: [
    { label: "Gold", value: "gold", swatch: "#B8925A" },
    { label: "Silver", value: "silver", swatch: "#C9CDD3" },
  ],
};

const RING_SIZE: Variant = {
  name: "Ring Size",
  options: ["5", "6", "7", "8", "9"].map((v) => ({ label: v, value: v })),
};

type Seed = {
  slug: string;
  name: string;
  category: Product["category"];
  price: number;
  compareAtPrice?: number;
  images: string[];
  description: string;
  highlights: string[];
  material: string;
  variants: Variant[];
  stock: number;
  tags: Product["tags"];
  reviewCount: number;
};

function build(seed: Seed, index: number): Product {
  const reviews = makeReviews(index, seed.reviewCount);
  return {
    id: `p-${index + 1}`,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    tags: seed.tags,
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    images: seed.images,
    description: seed.description,
    highlights: seed.highlights,
    material: seed.material,
    variants: seed.variants,
    stock: seed.stock,
    rating: averageRating(reviews),
    reviewCount: reviews.length,
    reviews,
  };
}

const CARE_HIGHLIGHT = "Nickel-free & hypoallergenic — safe for everyday, all-day wear";

const SEEDS: Seed[] = [
  // Rings
  {
    slug: "rosette-cocktail-ring",
    name: "Rosette Cocktail Ring",
    category: "rings",
    price: 2499,
    compareAtPrice: 3199,
    images: [RING_IMAGES[0], RING_IMAGES[4]],
    description:
      "A cluster of blush stones set in warm gold, designed to catch the light with every gesture. Statement enough for evenings, comfortable enough to forget you're wearing it.",
    highlights: [CARE_HIGHLIGHT, "18K gold vermeil over 925 silver", "Adjustable-fit band"],
    material: "18K Gold Vermeil & Cubic Zirconia",
    variants: [FINISH_GOLD_ROSE_SILVER, RING_SIZE],
    stock: 24,
    tags: ["best-seller"],
    reviewCount: 5,
  },
  {
    slug: "aiden-signet-ring",
    name: "Aiden Signet Ring",
    category: "rings",
    price: 1899,
    images: [RING_IMAGES[1], RING_IMAGES[2]],
    description:
      "A modern take on the classic signet, with a softly engraved face and a substantial, grounded feel on the hand. Wears beautifully alone or stacked.",
    highlights: [CARE_HIGHLIGHT, "18K gold vermeil on sterling silver", "Solid, weighted band"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_SILVER, RING_SIZE],
    stock: 18,
    tags: ["new-arrival"],
    reviewCount: 3,
  },
  {
    slug: "wren-solitaire-ring",
    name: "Wren Solitaire Ring",
    category: "rings",
    price: 1599,
    images: [RING_IMAGES[2], RING_IMAGES[0]],
    description:
      "A single clean stone on a delicate band — the ring you reach for when you want quiet polish rather than sparkle. Pairs effortlessly with everything else you own.",
    highlights: [CARE_HIGHLIGHT, "925 sterling silver base", "Slim, stackable band"],
    material: "925 Sterling Silver & Cubic Zirconia",
    variants: [FINISH_GOLD_SILVER, RING_SIZE],
    stock: 30,
    tags: [],
    reviewCount: 4,
  },
  {
    slug: "celeste-stone-ring",
    name: "Celeste Stone Ring",
    category: "rings",
    price: 2199,
    compareAtPrice: 2799,
    images: [RING_IMAGES[3], RING_IMAGES[4]],
    description:
      "A deep, saturated stone in a delicate pavé setting — a small dose of colour for hands that usually stay neutral. Genuinely photographs as good as it looks in person.",
    highlights: [CARE_HIGHLIGHT, "Rhodium-plated for extra shine", "Pavé-set border"],
    material: "Rhodium-Plated 925 Silver & Zircon",
    variants: [FINISH_GOLD_SILVER, RING_SIZE],
    stock: 15,
    tags: [],
    reviewCount: 3,
  },
  {
    slug: "dune-stacking-ring-duo",
    name: "Dune Stacking Ring Duo",
    category: "rings",
    price: 1799,
    images: [RING_IMAGES[4], RING_IMAGES[1]],
    description:
      "Two-tone bands designed to be worn together or split across fingers. A quiet, architectural piece that looks intentional whichever way you wear it.",
    highlights: [CARE_HIGHLIGHT, "Sold as a set of two", "Mixed gold & silver finish"],
    material: "18K Gold Vermeil & Rhodium-Plated Silver",
    variants: [RING_SIZE],
    stock: 20,
    tags: ["best-seller"],
    reviewCount: 6,
  },

  // Necklaces
  {
    slug: "mira-dangle-necklace",
    name: "Mira Dangle Necklace",
    category: "necklaces",
    price: 2299,
    images: [NECKLACE_IMAGES[0], NECKLACE_IMAGES[1]],
    description:
      "A fine chain finished with a row of small floral charms that catch light with movement. Sits just above the collarbone — our most-gifted necklace, for good reason.",
    highlights: [CARE_HIGHLIGHT, "16-18 inch adjustable chain", "Lobster clasp closure"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_ROSE_SILVER],
    stock: 22,
    tags: ["best-seller"],
    reviewCount: 7,
  },
  {
    slug: "linen-bead-chain-necklace",
    name: "Linen Bead Chain Necklace",
    category: "necklaces",
    price: 1499,
    images: [NECKLACE_IMAGES[1], NECKLACE_IMAGES[2]],
    description:
      "A fine cable chain punctuated with tiny polished beads — subtle texture that reads as detail rather than decoration. Layers beautifully with anything else in your jewellery box.",
    highlights: [CARE_HIGHLIGHT, "18 inch chain with 2 inch extender", "Everyday-weight chain"],
    material: "14K Gold Filled",
    variants: [FINISH_GOLD_SILVER],
    stock: 28,
    tags: [],
    reviewCount: 4,
  },
  {
    slug: "aura-pendant-necklace",
    name: "Aura Pendant Necklace",
    category: "necklaces",
    price: 1299,
    images: [NECKLACE_IMAGES[2], NECKLACE_IMAGES[3]],
    description:
      "A single faceted stone on a whisper-thin chain. Small enough to wear every day, considered enough that it never feels like an afterthought.",
    highlights: [CARE_HIGHLIGHT, "925 sterling silver chain", "16 inch length"],
    material: "925 Sterling Silver & Cubic Zirconia",
    variants: [FINISH_GOLD_SILVER],
    stock: 26,
    tags: [],
    reviewCount: 3,
  },
  {
    slug: "nightfall-charm-necklace",
    name: "Nightfall Charm Necklace",
    category: "necklaces",
    price: 2799,
    compareAtPrice: 3499,
    images: [NECKLACE_IMAGES[3], NECKLACE_IMAGES[0]],
    description:
      "A row of textured gold discs on a fine box chain, made for evenings but easy enough to wear well past them. Our design team's favourite from this season.",
    highlights: [CARE_HIGHLIGHT, "18K gold vermeil finish", "17 inch chain"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_ROSE_SILVER],
    stock: 12,
    tags: ["new-arrival"],
    reviewCount: 4,
  },
  {
    slug: "halo-layered-necklace",
    name: "Halo Layered Necklace",
    category: "necklaces",
    price: 2599,
    images: [NECKLACE_IMAGES[0], NECKLACE_IMAGES[2]],
    description:
      "Two chains of different lengths, pre-layered so you get the look without the tangle. One clasp, two necklaces' worth of impact.",
    highlights: [CARE_HIGHLIGHT, "Pre-layered double chain", "14-16 inch adjustable"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_ROSE_SILVER],
    stock: 16,
    tags: [],
    reviewCount: 5,
  },

  // Earrings
  {
    slug: "aria-gold-hoops",
    name: "Aria Gold Hoops",
    category: "earrings",
    price: 1399,
    images: [EARRING_IMAGES[0], EARRING_IMAGES[4]],
    description:
      "Our signature hoop — a clean, substantial curve with a set stone detail at the base. The pair you'll reach for on repeat, from desk to dinner.",
    highlights: [CARE_HIGHLIGHT, "18K gold vermeil", "Secure hinged closure"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_SILVER],
    stock: 32,
    tags: ["best-seller"],
    reviewCount: 8,
  },
  {
    slug: "dewdrop-earrings",
    name: "Dewdrop Earrings",
    category: "earrings",
    price: 1199,
    images: [EARRING_IMAGES[1], EARRING_IMAGES[3]],
    description:
      "A smooth, sculptural teardrop that swings gently with movement. Understated on its own, striking when it catches the light.",
    highlights: [CARE_HIGHLIGHT, "Lightweight hollow build", "Secure fish-hook backing"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_ROSE_SILVER],
    stock: 20,
    tags: [],
    reviewCount: 4,
  },
  {
    slug: "foil-texture-studs",
    name: "Foil Texture Studs",
    category: "earrings",
    price: 999,
    images: [EARRING_IMAGES[2], EARRING_IMAGES[5]],
    description:
      "Hammered, crumpled-metal texture that plays with light from every angle. A sculptural stud for people who usually skip earrings entirely.",
    highlights: [CARE_HIGHLIGHT, "Push-back closure", "Featherlight, all-day comfortable"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_SILVER],
    stock: 34,
    tags: ["new-arrival"],
    reviewCount: 3,
  },
  {
    slug: "rosa-swirl-drops",
    name: "Rosa Swirl Drops",
    category: "earrings",
    price: 1099,
    images: [EARRING_IMAGES[3], EARRING_IMAGES[1]],
    description:
      "A soft spiral silhouette in warm rose gold, small enough for daytime and detailed enough to notice up close.",
    highlights: [CARE_HIGHLIGHT, "Rose gold vermeil finish", "Secure ear-wire backing"],
    material: "18K Rose Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_ROSE_SILVER],
    stock: 19,
    tags: [],
    reviewCount: 3,
  },
  {
    slug: "halo-pave-huggies",
    name: "Halo Pavé Huggies",
    category: "earrings",
    price: 1499,
    compareAtPrice: 1899,
    images: [EARRING_IMAGES[4], EARRING_IMAGES[0]],
    description:
      "Close-fitting huggie hoops lined edge-to-edge with pavé stones. Small, bright, and impossible to stop wearing once you start.",
    highlights: [CARE_HIGHLIGHT, "Pavé-set cubic zirconia", "Hinged snap closure"],
    material: "925 Sterling Silver & Cubic Zirconia",
    variants: [FINISH_GOLD_SILVER],
    stock: 14,
    tags: ["new-arrival"],
    reviewCount: 5,
  },
  {
    slug: "petite-twist-hoops",
    name: "Petite Twist Hoops",
    category: "earrings",
    price: 899,
    images: [EARRING_IMAGES[6], EARRING_IMAGES[5]],
    description:
      "A ribbed, rope-twist hoop in a smaller silhouette — an easy first pair for anyone building their everyday jewellery edit.",
    highlights: [CARE_HIGHLIGHT, "925 sterling silver", "Comfortable for all-day wear"],
    material: "925 Sterling Silver",
    variants: [FINISH_GOLD_SILVER],
    stock: 27,
    tags: [],
    reviewCount: 4,
  },

  // Bracelets
  {
    slug: "chainlink-bracelet",
    name: "Chainlink Bracelet",
    category: "bracelets",
    price: 1699,
    images: [BRACELET_IMAGES[0], BRACELET_IMAGES[1]],
    description:
      "A chunky, oval-link chain that layers well with your watch or wears confidently alone. Substantial in hand, light on the wrist.",
    highlights: [CARE_HIGHLIGHT, "18K gold vermeil", "Adjustable 6-7.5 inch length"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_SILVER],
    stock: 21,
    tags: ["best-seller"],
    reviewCount: 6,
  },
  {
    slug: "wanderlust-chain-bracelet",
    name: "Wanderlust Chain Bracelet",
    category: "bracelets",
    price: 1499,
    images: [BRACELET_IMAGES[1], BRACELET_IMAGES[0]],
    description:
      "A finer paperclip-style chain designed to be stacked two or three deep, or worn solo for something quieter.",
    highlights: [CARE_HIGHLIGHT, "18K gold vermeil", "Adjustable with extender chain"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_SILVER],
    stock: 25,
    tags: [],
    reviewCount: 3,
  },
  {
    slug: "halo-charm-bracelet",
    name: "Halo Charm Bracelet",
    category: "bracelets",
    price: 1899,
    images: [BRACELET_IMAGES[2], BRACELET_IMAGES[3]],
    description:
      "A double-row chain centred on a pavé-set charm — delicate, a little bit precious, made for gifting as much as keeping.",
    highlights: [CARE_HIGHLIGHT, "Pavé cubic zirconia detail", "Adjustable double chain"],
    material: "18K Gold Vermeil & Cubic Zirconia",
    variants: [FINISH_GOLD_ROSE_SILVER],
    stock: 17,
    tags: [],
    reviewCount: 4,
  },
  {
    slug: "aegis-evil-eye-bracelet",
    name: "Aegis Evil Eye Bracelet",
    category: "bracelets",
    price: 1299,
    images: [BRACELET_IMAGES[3], BRACELET_IMAGES[2]],
    description:
      "A protective evil-eye charm in blue and white enamel, set on a fine paperclip chain. Meaningful without being heavy-handed about it.",
    highlights: [CARE_HIGHLIGHT, "Hand-set enamel detail", "Adjustable chain length"],
    material: "18K Gold Vermeil, Enamel & Cubic Zirconia",
    variants: [FINISH_GOLD_SILVER],
    stock: 23,
    tags: ["new-arrival"],
    reviewCount: 4,
  },

  // Sets
  {
    slug: "aavira-signature-duo",
    name: "Aavira Signature Duo",
    category: "sets",
    price: 3699,
    compareAtPrice: 4599,
    images: [NECKLACE_IMAGES[0], EARRING_IMAGES[0]],
    description:
      "Our dangle necklace and signature hoops, bundled together at a better price than buying separately. Designed to be worn together or split across two very good days.",
    highlights: [CARE_HIGHLIGHT, "Necklace + earrings, one box", "Save versus buying separately"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_SILVER],
    stock: 15,
    tags: ["best-seller"],
    reviewCount: 5,
  },
  {
    slug: "golden-hour-set",
    name: "Golden Hour Set",
    category: "sets",
    price: 4999,
    compareAtPrice: 6299,
    images: [SET_FLATLAY_IMAGES[0], SET_FLATLAY_IMAGES[1]],
    description:
      "A curated edit of everyday pieces — necklace, bracelet, and earrings — for building your rotation in one order instead of five. Our most complete gift set.",
    highlights: [CARE_HIGHLIGHT, "5-piece curated edit", "Signature gift packaging included"],
    material: "18K Gold Vermeil on 925 Sterling Silver",
    variants: [FINISH_GOLD_SILVER],
    stock: 10,
    tags: ["new-arrival"],
    reviewCount: 4,
  },
  {
    slug: "celeste-set",
    name: "Celeste Set",
    category: "sets",
    price: 3299,
    images: [NECKLACE_IMAGES[3], EARRING_IMAGES[4]],
    description:
      "The Nightfall necklace paired with our pavé huggies — evening-ready, priced kinder than buying the two pieces apart.",
    highlights: [CARE_HIGHLIGHT, "Necklace + earrings, one box", "Save versus buying separately"],
    material: "18K Gold Vermeil & Cubic Zirconia",
    variants: [FINISH_GOLD_SILVER],
    stock: 11,
    tags: [],
    reviewCount: 3,
  },
  {
    slug: "bloom-set",
    name: "Bloom Set",
    category: "sets",
    price: 2999,
    images: [BRACELET_IMAGES[2], EARRING_IMAGES[1]],
    description:
      "A pavé charm bracelet and matching teardrop earrings — soft, romantic, and an easy gift when you're not sure what to pick.",
    highlights: [CARE_HIGHLIGHT, "Bracelet + earrings, one box", "Signature gift packaging included"],
    material: "18K Gold Vermeil & Cubic Zirconia",
    variants: [FINISH_GOLD_ROSE_SILVER],
    stock: 13,
    tags: [],
    reviewCount: 3,
  },
];

export const PRODUCTS: Product[] = SEEDS.map(build);

export function getProducts() {
  return PRODUCTS;
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getNewArrivals() {
  return PRODUCTS.filter((p) => p.tags.includes("new-arrival"));
}

export function getBestSellers() {
  return PRODUCTS.filter((p) => p.tags.includes("best-seller"));
}

export function getRelatedProducts(product: Product, count = 4) {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, count);
}

export function searchProductsSync(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
  );
}
