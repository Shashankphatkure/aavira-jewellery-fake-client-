import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getNewArrivals } from "@/lib/commerce/data";
import { LIFESTYLE_IMAGES } from "@/lib/commerce/images";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedCollection() {
  const products = getNewArrivals().slice(0, 3);

  return (
    <section className="container-aavira py-20 md:py-28">
      <div className="grid md:grid-cols-12 gap-8 md:gap-10">
        <Reveal className="md:col-span-4 relative">
          <div className="relative aspect-[3/4] md:h-full overflow-hidden bg-ivory-deep">
            <Image
              src={LIFESTYLE_IMAGES.paperclipNecklaceModel}
              alt="Model wearing a layered Aavira necklace"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-2">
              New This Season
            </p>
            <h2 className="font-display text-3xl leading-tight mb-3">
              The Monsoon Edit
            </h2>
            <p className="text-sm text-charcoal-soft leading-relaxed mb-5 max-w-xs">
              Just-landed pieces built for everyday wear — light enough for
              humid days, polished enough for anything after.
            </p>
            <Link
              href="/shop/new-arrivals"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] border-b border-charcoal pb-1 hover:text-gold-deep hover:border-gold-deep transition-colors"
            >
              Shop New Arrivals <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>

        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-10">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(0.1 + i * 0.08, 0.35)}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
