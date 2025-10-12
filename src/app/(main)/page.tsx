import { Hero } from "@/components/home/Hero";
import { ShopByBenefit } from "@/components/home/ShopByBenefit";
import { BestSellers } from "@/components/home/BestSellers";
import { EducationalBlock } from "@/components/home/EducationalBlock";
import { Reviews } from "@/components/home/Reviews";
import { SubscriptionCta } from "@/components/home/SubscriptionCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ShopByBenefit />
      <BestSellers />
      <EducationalBlock />
      <Reviews />
      <SubscriptionCta />
    </>
  );
}
