import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { BestSellers } from "@/components/home/BestSellers";
import { BrandStory } from "@/components/home/BrandStory";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { InstagramSection } from "@/components/home/InstagramSection";
import { PromoSection } from "@/components/home/PromoSection";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCollection />
      <BestSellers />
      <BrandStory />
      <CategoryShowcase />
      <CustomerReviews />
      <InstagramSection />
      <PromoSection />
      <Newsletter />
    </>
  );
}
