import type { Metadata } from "next";
import { MenuSection } from "@/components/sections/MenuSection";
import { PromoSection } from "@/components/sections/PromoSection";
import { CtaBanner } from "@/components/sections/LocationSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCategories, getMenuItems } from "@/lib/repositories/menu";
import { menuJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Menu — Nyama Choma, Pilau, Ugali & More",
  description:
    "See the full Kibandaski menu with prices in KES: nyama choma, chicken & chips, pilau, ugali, chapati, breakfast and drinks. Order on WhatsApp.",
  alternates: { canonical: "/menu" },
};

export default async function MenuPage() {
  const [categories, items] = await Promise.all([getCategories(), getMenuItems()]);
  return (
    <>
      <JsonLd data={menuJsonLd(categories, items)} />
      <MenuSection headingLevel="h1" />
      <PromoSection />
      <CtaBanner />
    </>
  );
}
