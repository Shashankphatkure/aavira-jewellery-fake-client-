import type { Product } from "@/lib/commerce/types";
import { getRelatedProducts } from "@/lib/commerce/data";
import { ProductCard } from "@/components/product/ProductCard";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product);
  if (related.length === 0) return null;

  return (
    <section className="container-aavira py-16 md:py-20 border-t border-line">
      <h2 className="font-display text-2xl md:text-3xl mb-10">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
