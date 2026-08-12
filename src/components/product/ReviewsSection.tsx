import { BadgeCheck } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { StarRating } from "@/components/ui/StarRating";

export function ReviewsSection({ product }: { product: Product }) {
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
  }));
  const total = product.reviews.length || 1;

  return (
    <section className="container-aavira py-16 md:py-20 border-t border-line">
      <h2 className="font-display text-2xl md:text-3xl mb-10">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-[240px_1fr] gap-12">
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-display text-4xl">{product.rating}</span>
            <span className="text-charcoal-faint text-sm">/ 5</span>
          </div>
          <StarRating rating={product.rating} size={16} />
          <p className="text-xs text-charcoal-faint mt-1.5 mb-6">
            Based on {product.reviewCount} reviews
          </p>

          <div className="flex flex-col gap-1.5">
            {breakdown.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 text-charcoal-soft">{star}</span>
                <div className="flex-1 h-1.5 bg-ivory-deep">
                  <div
                    className="h-full bg-gold"
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
                <span className="w-4 text-charcoal-faint">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b border-line-soft pb-6">
              <div className="flex items-center justify-between mb-1.5">
                <StarRating rating={review.rating} size={13} />
                <span className="text-xs text-charcoal-faint">{review.date}</span>
              </div>
              <h3 className="text-sm font-medium mb-1">{review.title}</h3>
              <p className="text-sm text-charcoal-soft leading-relaxed mb-2">
                {review.body}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-charcoal-faint">
                <span>{review.author}</span>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 text-gold-deep">
                    <BadgeCheck size={13} strokeWidth={1.5} /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
