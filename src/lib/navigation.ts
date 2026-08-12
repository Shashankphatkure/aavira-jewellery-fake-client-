export const SHOP_LINKS = [
  { label: "New Arrivals", href: "/shop/new-arrivals" },
  { label: "Best Sellers", href: "/shop/best-sellers" },
  { label: "Rings", href: "/shop/rings" },
  { label: "Earrings", href: "/shop/earrings" },
  { label: "Necklaces", href: "/shop/necklaces" },
  { label: "Bracelets", href: "/shop/bracelets" },
  { label: "Sets", href: "/shop/sets" },
] as const;

export const PRIMARY_NAV = [
  { label: "Shop All", href: "/shop" },
  ...SHOP_LINKS,
  { label: "Our Story", href: "/about" },
] as const;

export const FOOTER_LINKS = {
  shop: SHOP_LINKS,
  help: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Delivery", href: "/shipping-delivery" },
    { label: "Returns & Refunds", href: "/returns-refunds" },
    { label: "Jewellery Care", href: "/jewellery-care" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
} as const;
