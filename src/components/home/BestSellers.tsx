import { getBestSellers } from "@/lib/commerce/data";
import { ProductCard } from "@/components/product/ProductCard";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export async function BestSellers() {
  const bestSellers = await getBestSellers();
  const products = bestSellers.slice(0, 6);

  return (
    <section className="bg-ivory-deep/60 py-20 md:py-28">
      <div className="container-aavira">
        <Reveal className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-2">
              Loved & Worn
            </p>
            <h2 className="font-display text-3xl md:text-4xl">Best Sellers</h2>
          </div>
          <LinkButton href="/shop/best-sellers" variant="ghost" size="sm" className="hidden sm:inline-flex">
            View All
          </LinkButton>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i * 0.05, 0.3)}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <LinkButton href="/shop/best-sellers" variant="outline" className="w-full">
            View All Best Sellers
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
