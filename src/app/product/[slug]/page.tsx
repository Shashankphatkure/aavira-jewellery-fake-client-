import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/commerce/data";
import { CATEGORY_LABELS } from "@/lib/commerce/shop-helpers";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/product/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    material: product.material,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-aavira pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-faint">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-charcoal">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop/${product.category}`} className="hover:text-charcoal">
            {CATEGORY_LABELS[product.category]}
          </Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      <div className="container-aavira py-6 md:py-10 grid md:grid-cols-2 gap-10 md:gap-14">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      <ReviewsSection product={product} />
      <RelatedProducts product={product} />
    </div>
  );
}
