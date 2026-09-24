/**
 * Domain types. These mirror the shape a future database / admin
 * dashboard will store, so the UI never has to change when the data
 * source does. Money is always an integer amount in Kenyan shillings.
 */

export type ISODateString = string;

export type CategoryId =
  | "breakfast"
  | "nyama"
  | "chicken"
  | "fish"
  | "chips"
  | "ugali"
  | "chapati"
  | "pilau"
  | "drinks";

export interface Category {
  id: CategoryId;
  name: string;
  /** Short Swahili/English tagline shown under the filter. */
  tagline: string;
  /** Image used for the filter tile. */
  image: string;
  sortOrder: number;
}

export interface MenuImage {
  src: string;
  alt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in whole KES. */
  price: number;
  category: CategoryId;
  image: MenuImage;
  available: boolean;
  featured: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Pre-filled WhatsApp message used by the CTA. */
  whatsappMessage: string;
  ctaLabel: string;
  image: MenuImage;
  tone: "maize" | "cream" | "sukuma";
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export type Weekday = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export interface OpeningHours {
  label: string;
  days: Weekday[];
  /** 24h "HH:MM" */
  opens: string;
  closes: string;
}

export interface Branch {
  id: string;
  name: string;
  street?: string;
  area?: string;
  city?: string;
  country: string;
  countryCode: "KE";
  phoneDisplay: string;
  /** International format, digits only e.g. 254769622996 */
  whatsapp: string;
  hours: OpeningHours[];
  /** Google Maps embed URL. Empty shows a placeholder. */
  mapEmbedUrl: string;
  geo?: { lat: number; lng: number };
}
