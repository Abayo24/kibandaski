import type { Branch } from "@/types/domain";

/**
 * Site-wide settings. Edit here (or via environment variables) —
 * no component contains hard-coded contact details.
 */

const DEFAULT_WHATSAPP = "254769622996";
const DEFAULT_SITE_URL = "https://kibandaski.co.ke";

/** Digits only, e.g. 254769622996. Falls back to the default if unset, empty or implausible. */
function resolveWhatsapp(raw: string | undefined): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15 ? digits : DEFAULT_WHATSAPP;
}

/**
 * Absolute site origin with no trailing slash. Accepts values with or
 * without a scheme ("kibandaski.co.ke" or "https://kibandaski.co.ke").
 * If NEXT_PUBLIC_SITE_URL is unset or invalid, uses Vercel's production
 * domain when available, then the default.
 */
function resolveSiteUrl(): string {
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    try {
      const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      return url.origin;
    } catch {
      /* try the next candidate */
    }
  }
  return DEFAULT_SITE_URL;
}

const whatsapp = resolveWhatsapp(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

/** Kibandaski currently has one branch. Add more here when you expand. */
export const branches: Branch[] = [
  {
    id: "main",
    name: "Kibandaski",
    // TODO: add the street / area once confirmed, e.g. street: "Moi Avenue", area: "CBD", city: "Nairobi"
    country: "Kenya",
    countryCode: "KE",
    phoneDisplay: "0769 622 996",
    whatsapp,
    hours: [
      { label: "Monday – Friday", days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "07:00", closes: "22:00" },
      { label: "Saturday", days: ["Sa"], opens: "08:00", closes: "23:00" },
      { label: "Sunday", days: ["Su"], opens: "09:00", closes: "21:00" },
    ],
    mapEmbedUrl: (process.env.NEXT_PUBLIC_MAP_EMBED_URL ?? "").trim(),
  },
];

export const mainBranch = branches[0]!;

export const site = {
  name: "Kibandaski",
  title: "Kibandaski | Kenyan Food & Restaurant",
  description:
    "Order delicious Kenyan meals from Kibandaski. Browse our menu and order fresh food through WhatsApp.",
  shortDescription:
    "Fresh, filling Kenyan meals — nyama choma, pilau, ugali, chapati and more. Browse, pick, and order on WhatsApp.",
  url: resolveSiteUrl(),
  locale: "en_KE",
  keywords: [
    "Kenyan restaurant",
    "Kenyan food",
    "restaurant in Kenya",
    "nyama choma",
    "Kenyan lunch",
    "food delivery Kenya",
    "order food WhatsApp Kenya",
    "pilau",
    "ugali",
    "chapati",
  ],
  // TODO: confirm these handles belong to Kibandaski before launch.
  social: [
    { name: "Instagram", href: "https://www.instagram.com/kibandaski" },
    { name: "TikTok", href: "https://www.tiktok.com/@kibandaski" },
    { name: "Facebook", href: "https://www.facebook.com/kibandaski" },
    { name: "X", href: "https://x.com/kibandaski" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
