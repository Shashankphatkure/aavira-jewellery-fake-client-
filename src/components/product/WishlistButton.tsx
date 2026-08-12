"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useCommerce } from "@/context/CommerceContext";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  size = 15,
  className,
}: {
  productId: string;
  size?: number;
  className?: string;
}) {
  const router = useRouter();
  const { user, toggleWishlist, isWishlisted } = useCommerce();
  const wishlisted = isWishlisted(productId);

  return (
    <button
      type="button"
      aria-label={
        !user
          ? "Sign in to save to your wishlist"
          : wishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
      }
      onClick={(e) => {
        e.preventDefault();
        if (!user) {
          router.push("/account");
          return;
        }
        toggleWishlist(productId);
      }}
      className={cn(
        "flex items-center justify-center",
        className
      )}
    >
      <motion.span
        key={wishlisted ? "on" : "off"}
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="flex"
      >
        <Heart
          size={size}
          strokeWidth={1.5}
          className={wishlisted ? "fill-blush-deep text-blush-deep" : "text-charcoal"}
        />
      </motion.span>
    </button>
  );
}
