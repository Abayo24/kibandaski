import type { Promotion } from "@/types/domain";

export const promotions: Promotion[] = [
  {
    id: "lunch-combo",
    title: "Lunch Combo",
    subtitle: "Meal + drink from KES 500",
    description: "Any plate from the menu with a fresh juice or soda. Monday to Friday, 12 – 3pm.",
    whatsappMessage: "Hello Kibandaski, I'd like to order the Lunch Combo. What are today's options?",
    ctaLabel: "Get the combo",
    image: { src: "/images/rice-beef.webp", alt: "Rice with beef stew and salad" },
    tone: "maize",
    active: true,
  },
  {
    id: "weekend-choma",
    title: "Weekend Choma",
    subtitle: "Fresh nyama choma every weekend",
    description: "Goat and beef on the grill from Friday evening. Order early — it goes fast.",
    whatsappMessage: "Hello Kibandaski, I'd like to reserve nyama choma for this weekend.",
    ctaLabel: "Reserve your choma",
    image: { src: "/images/choma-grill.webp", alt: "Meat roasting over a charcoal grill" },
    tone: "cream",
    active: true,
  },
  {
    id: "family-combo",
    title: "Family Combo",
    subtitle: "Meals for the whole crew",
    description: "Pilau, chicken, chapati, kachumbari and drinks for 4 – 6 people. Tell us your number.",
    whatsappMessage: "Hello Kibandaski, I'd like a Family Combo. We are ___ people.",
    ctaLabel: "Feed the crew",
    image: { src: "/images/family-spread.webp", alt: "A table spread with several dishes" },
    tone: "sukuma",
    active: true,
  },
];
