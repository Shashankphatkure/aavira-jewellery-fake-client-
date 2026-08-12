import { getProducts } from "@/lib/commerce/data";
import type { Product } from "@/lib/commerce/types";
import { StarRating } from "@/components/ui/StarRating";
import { Reveal } from "@/components/ui/Reveal";

function pickTestimonials(products: Product[]) {
  const seen = new Set<string>();
  const picked: { author: string; title: string; body: string; rating: number; product: string }[] = [];

  for (const product of products) {
    for (const review of product.reviews) {
      if (review.rating < 5 || seen.has(review.title)) continue;
      seen.add(review.title);
      picked.push({
        author: review.author,
        title: review.title,
        body: review.body,
        rating: review.rating,
        product: product.name,
      });
      break;
    }
    if (picked.length >= 4) break;
  }
  return picked;
}

export async function CustomerReviews() {
  const products = await getProducts();
  const testimonials = pickTestimonials(products);

  return (
    <section className="container-aavira py-20 md:py-28">
      <Reveal className="text-center mb-12 md:mb-14">
        <p className="text-xs uppercase tracking-[0.16em] text-gold-deep mb-2">
          15,000+ Happy Customers
        </p>
        <h2 className="font-display text-3xl md:text-4xl">
          Loved by everyday wearers
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.title} delay={Math.min(i * 0.08, 0.3)}>
            <div className="border border-line p-6 flex flex-col bg-cream h-full">
              <StarRating rating={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-charcoal-soft flex-1">
                &ldquo;{t.body}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-line-soft">
                <p className="text-sm font-medium">{t.author}</p>
                <p className="text-xs text-charcoal-faint mt-0.5">
                  Purchased {t.product}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
