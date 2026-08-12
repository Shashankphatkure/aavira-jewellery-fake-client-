"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { PRIMARY_NAV, SHOP_LINKS } from "@/lib/navigation";
import { useCommerce } from "@/context/CommerceContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlist, openCart } = useCommerce();

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur border-b border-line">
      <div className="container-aavira flex items-center justify-between h-16 md:h-20">
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden -ml-2 p-2 text-charcoal"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        <Link
          href="/"
          className="font-display text-2xl md:text-3xl italic tracking-tight text-charcoal"
        >
          Aavira
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {PRIMARY_NAV.slice(0, 6).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.12em] text-charcoal-soft hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="p-2 text-charcoal hover:text-gold-deep transition-colors"
          >
            <Search size={19} strokeWidth={1.5} />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden sm:inline-flex p-2 text-charcoal hover:text-gold-deep transition-colors"
          >
            <User size={19} strokeWidth={1.5} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative p-2 text-charcoal hover:text-gold-deep transition-colors"
          >
            <Heart size={19} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-gold text-[9px] text-cream flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Open cart"
            onClick={openCart}
            className="relative p-2 text-charcoal hover:text-gold-deep transition-colors"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-gold text-[9px] text-cream flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden transition-opacity duration-300",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div
        className="absolute inset-0 bg-charcoal/40"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-[82%] max-w-sm bg-ivory shadow-lift transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-line">
          <span className="font-display italic text-xl">Aavira</span>
          <button
            type="button"
            aria-label="Close menu"
            className="p-2"
            onClick={onClose}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col px-5 py-6 gap-1 overflow-y-auto">
          <Link
            href="/shop"
            onClick={onClose}
            className="py-3 text-sm uppercase tracking-[0.12em] border-b border-line-soft"
          >
            Shop All
          </Link>
          {SHOP_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3 text-sm uppercase tracking-[0.12em] border-b border-line-soft text-charcoal-soft"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={onClose}
            className="py-3 text-sm uppercase tracking-[0.12em] border-b border-line-soft text-charcoal-soft"
          >
            Our Story
          </Link>
          <Link
            href="/account"
            onClick={onClose}
            className="py-3 text-sm uppercase tracking-[0.12em] text-charcoal-soft"
          >
            Account
          </Link>
        </nav>
      </div>
    </div>
  );
}
