import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/LocationSection";

export const metadata: Metadata = {
  title: "About Us — Kenyan Food Made with Love",
  description:
    "Kibandaski serves tasty, filling and affordable Kenyan meals cooked fresh every day. Learn our story and order on WhatsApp.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutSection variant="full" />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
