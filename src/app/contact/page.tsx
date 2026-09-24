import type { Metadata } from "next";
import { LocationSection } from "@/components/sections/LocationSection";
import { mainBranch } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Opening Hours",
  description: `Call Kibandaski on ${mainBranch.phoneDisplay} or order on WhatsApp. See our opening hours and location in Kenya.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <LocationSection headingLevel="h1" title="Contact Kibandaski" />;
}
