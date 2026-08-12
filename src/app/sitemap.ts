import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/commerce/data";
import { SHOP_LINKS } from "@/lib/navigation";
import { SITE_URL } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/shop",
  "/about",
  "/contact",
  "/faq",
  "/shipping-delivery",
  "/returns-refunds",
  "/jewellery-care",
  "/privacy-policy",
  "/terms-conditions",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryEntries = SHOP_LINKS.map((link) => ({
    url: `${SITE_URL}${link.href}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
