import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { resolveShopMode, shopModeTitle } from "@/lib/commerce/shop-helpers";

const DESCRIPTIONS: Record<string, string> = {
  rings: "Statement stones and everyday bands, in gold vermeil and silver.",
  earrings: "Hoops, studs and drops made for daily wear.",
  necklaces: "Delicate chains and pendants that layer beautifully.",
  bracelets: "Chains and charms for the wrist you actually wear.",
  sets: "Matching pieces, bundled together at a better price.",
  "new-arrivals": "Just landed — the newest additions to the Aavira edit.",
  "best-sellers": "The pieces our customers keep coming back for.",
};

export async function generateMetadata(
  props: PageProps<"/shop/[category]">
): Promise<Metadata> {
  const { category } = await props.params;
  const mode = resolveShopMode(category);
  if (!mode) return { title: "Shop" };
  return { title: shopModeTitle(mode) };
}

export default async function ShopCategoryPage(
  props: PageProps<"/shop/[category]">
) {
  const { category } = await props.params;
  const mode = resolveShopMode(category);
  if (!mode) notFound();

  const title = shopModeTitle(mode);

  return (
    <div>
      <PageHeader eyebrow="Shop" title={title} description={DESCRIPTIONS[category]} />
      <ShopPageClient mode={mode} />
    </div>
  );
}
