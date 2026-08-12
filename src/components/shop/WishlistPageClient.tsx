"use client";

import { useCommerce } from "@/context/CommerceContext";
import { PRODUCTS } from "@/lib/commerce/data";
import { ProductCard } from "@/components/product/ProductCard";
import { LinkButton } from "@/components/ui/Button";

export function WishlistPageClient() {
  const { wishlist } = useCommerce();
  const products = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-aavira py-10 md:py-14">
      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-charcoal-soft">
            Nothing saved yet. Tap the heart on any piece to keep it here.
          </p>
          <LinkButton href="/shop">Explore The Shop</LinkButton>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
