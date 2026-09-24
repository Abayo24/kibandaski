import { mainBranch, site } from "@/config/site";
import type { Category, MenuItem } from "@/types/domain";

const DAY_URI: Record<string, string> = {
  Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday",
};

export function restaurantJsonLd(minPrice: number, maxPrice: number) {
  const b = mainBranch;
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/images/mishkaki-chips.webp`,
    logo: `${site.url}/icon.svg`,
    telephone: `+${b.whatsapp}`,
    servesCuisine: ["Kenyan", "African", "Street food"],
    priceRange: `KES ${minPrice} – ${maxPrice}`,
    currenciesAccepted: "KES",
    acceptsReservations: true,
    hasMenu: `${site.url}/menu`,
    address: {
      "@type": "PostalAddress",
      ...(b.street && { streetAddress: b.street }),
      ...(b.city && { addressLocality: b.city }),
      addressCountry: b.countryCode,
    },
    ...(b.geo && { geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng } }),
    openingHoursSpecification: b.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${DAY_URI[d]}`),
      opens: h.opens,
      closes: h.closes,
    })),
    potentialAction: {
      "@type": "OrderAction",
      target: { "@type": "EntryPoint", urlTemplate: `https://wa.me/${b.whatsapp}`, actionPlatform: "https://schema.org/MobileWebPlatform" },
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet", "http://purl.org/goodrelations/v1#DeliveryModePickUp"],
    },
    sameAs: site.social.map((s) => s.href),
  };
}

export function menuJsonLd(categories: Category[], items: MenuItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${site.url}/menu#menu`,
    name: `${site.name} Menu`,
    url: `${site.url}/menu`,
    inLanguage: "en-KE",
    hasMenuSection: categories
      .map((c) => ({
        "@type": "MenuSection",
        name: c.name,
        hasMenuItem: items
          .filter((i) => i.category === c.id)
          .map((i) => ({
            "@type": "MenuItem",
            name: i.name,
            description: i.description,
            image: `${site.url}${i.image.src}`,
            offers: {
              "@type": "Offer",
              price: i.price,
              priceCurrency: "KES",
              availability: i.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          })),
      }))
      .filter((s) => s.hasMenuItem.length > 0),
  };
}

/** Serialises JSON-LD safely for inline <script> tags. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\u003c").replace(/>/g, "\u003e").replace(/&/g, "\u0026");
}
