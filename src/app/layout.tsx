import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider, type CatalogItem } from "@/components/cart/CartProvider";
import { CartMount } from "@/components/cart/CartMount";
import { MobileCartBar } from "@/components/cart/MobileCartBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMenuItems } from "@/lib/repositories/menu";
import { restaurantJsonLd } from "@/lib/seo/jsonld";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: "800",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Kibandaski — Kenyan food, ordered on WhatsApp" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
  other: { "geo.region": "KE" },
};

export const viewport: Viewport = {
  themeColor: "#a63a0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const items = await getMenuItems();
  const catalog: CatalogItem[] = items.map(({ id, name, price, image, available, category, description }) => ({
    id,
    name,
    price,
    image,
    available,
    category,
    description,
  }));
  const prices = items.map((i) => i.price);

  return (
    <html lang="en-KE" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:font-bold focus:text-cream"
        >
          Skip to content
        </a>
        <JsonLd data={restaurantJsonLd(Math.min(...prices), Math.max(...prices))} />
        <CartProvider catalog={catalog}>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileCartBar />
          <CartMount />
        </CartProvider>
      </body>
    </html>
  );
}
