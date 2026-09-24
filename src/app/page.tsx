import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { PromoSection } from "@/components/sections/PromoSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner, LocationSection } from "@/components/sections/LocationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MenuSection initial="popular" />
      <FeaturedSection />
      <PromoSection />
      <AboutSection />
      <Testimonials />
      <CtaBanner />
      <LocationSection />
    </>
  );
}
