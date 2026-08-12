import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/navigation";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";

const POPULAR_SEARCHES = [
  { label: "Gold Earrings", href: "/shop/earrings" },
  { label: "Silver Rings", href: "/shop/rings" },
  { label: "Necklace Sets", href: "/shop/sets" },
  { label: "Everyday Bracelets", href: "/shop/bracelets" },
  { label: "Anniversary Gifts", href: "/shop/sets" },
  { label: "Gifts For Her", href: "/shop/best-sellers" },
  { label: "New Arrivals", href: "/shop/new-arrivals" },
  { label: "Layered Necklaces", href: "/shop/necklaces" },
];

const PAYMENT_METHODS = ["UPI", "Visa", "Mastercard", "RuPay", "COD"];

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-24">
      <div className="container-aavira py-8 border-b border-cream/10">
        <h3 className="text-xs uppercase tracking-[0.14em] text-cream/40 mb-4">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs text-cream/60">
          {POPULAR_SEARCHES.map((item, i) => (
            <span key={item.href + item.label} className="inline-flex items-center">
              <Link href={item.href} className="hover:text-cream transition-colors">
                {item.label}
              </Link>
              {i < POPULAR_SEARCHES.length - 1 && (
                <span className="ml-2 text-cream/20">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="container-aavira py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <span className="font-display italic text-2xl">Aavira</span>
          <p className="mt-4 text-sm text-cream/60 max-w-xs leading-relaxed">
            Jewellery designed to become part of your everyday. Elegant,
            modern pieces made for the way you actually live.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-cream/70 hover:text-cream"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-cream/70 hover:text-cream"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-cream/70 hover:text-cream"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>

        <FooterColumn title="Shop" links={FOOTER_LINKS.shop} />
        <FooterColumn title="Help" links={FOOTER_LINKS.help} />
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />
      </div>

      <div className="border-t border-cream/10">
        <div className="container-aavira py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-[11px] text-cream/50 tracking-wide order-2 sm:order-1">
            <span>© {new Date().getFullYear()} Aavira Jewellery. All rights reserved.</span>
            <span className="hidden sm:inline text-cream/20">|</span>
            <span>Made in Mumbai, India</span>
          </div>
          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="text-[10px] uppercase tracking-[0.04em] border border-cream/20 text-cream/60 px-2 py-1"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.14em] text-cream/50 mb-4">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-cream/80 hover:text-cream transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
