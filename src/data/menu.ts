import type { MenuItem } from "@/types/domain";

/**
 * The Kibandaski menu.
 *
 * To change a price, name or photo, edit the entry below — every
 * card, the cart, the WhatsApp message and the SEO structured data
 * read from this list. Set `available: false` to show "Sold out".
 * Set `featured: true` to show a dish under "Popular" and in the "Flavor" collage
 * (4 works best — it fills one row).
 *
 * When an admin dashboard is added, replace src/lib/repositories/menu.ts
 * with database queries that return this same shape.
 */

const SEEDED = "2026-09-01T08:00:00.000Z";

type Seed = Omit<MenuItem, "createdAt" | "updatedAt" | "available" | "featured"> &
  Partial<Pick<MenuItem, "available" | "featured">>;

const seed = (s: Seed): MenuItem => ({
  available: true,
  featured: false,
  createdAt: SEEDED,
  updatedAt: SEEDED,
  ...s,
});

export const menuItems: MenuItem[] = [
  // Breakfast
  seed({
    id: "chai-mandazi",
    name: "Chai & Mandazi",
    description: "A cup of spiced milky chai with three soft, golden mandazi.",
    price: 150,
    category: "breakfast",
    image: { src: "/images/mandazi.webp", alt: "Golden mandazi piled in a bowl" },
  }),
  seed({
    id: "beef-samosa",
    name: "Beef Samosas (3 pcs)",
    description: "Crispy pastry filled with spiced minced beef and onions. Served with chilli.",
    price: 180,
    category: "breakfast",
    image: { src: "/images/samosa.webp", alt: "Three crispy samosas with a green chilli on a wooden board" },
  }),
  seed({
    id: "chai-maziwa",
    name: "Chai ya Maziwa",
    description: "Proper Kenyan tea, brewed strong with milk and a hint of tangawizi.",
    price: 80,
    category: "breakfast",
    image: { src: "/images/chai.webp", alt: "A cup of milky tea seen from above" },
  }),

  // Nyama
  seed({
    id: "nyama-choma",
    name: "Nyama Choma",
    description: "Half kilo of slow-grilled goat, salted and smoky. Comes with kachumbari.",
    price: 600,
    category: "nyama",
    featured: true,
    image: { src: "/images/nyama-choma.webp", alt: "Grilled meat roasting over hot charcoal" },
  }),
  seed({
    id: "beef-stew",
    name: "Beef Stew",
    description: "Tender beef simmered with tomatoes, dhania and peppers. Rich and homely.",
    price: 350,
    category: "nyama",
    image: { src: "/images/beef-stew.webp", alt: "A pan of beef stew with peppers and spices" },
  }),
  seed({
    id: "mbuzi-fry",
    name: "Mbuzi Fry",
    description: "Goat meat pan-fried with onions and dhania until the edges crisp up.",
    price: 550,
    category: "nyama",
    image: { src: "/images/mbuzi-fry.webp", alt: "A plate of fried goat meat" },
  }),
  seed({
    id: "mishkaki-chips",
    name: "Mishkaki & Chips",
    description: "Three marinated beef skewers off the grill with chips and fresh tomatoes.",
    price: 550,
    category: "nyama",
    featured: true,
    image: { src: "/images/mishkaki-chips.webp", alt: "Grilled beef skewers with chips and sliced tomatoes" },
  }),

  // Chicken
  seed({
    id: "chicken-chips",
    name: "Chicken & Chips",
    description: "Quarter chicken, fried crispy, on a bed of hot chips. Add pili pili if you dare.",
    price: 450,
    category: "chicken",
    featured: true,
    image: { src: "/images/chicken-chips.webp", alt: "Crispy fried chicken with chips on a wooden board" },
  }),
  seed({
    id: "kuku-fry",
    name: "Kuku Fry",
    description: "Kienyeji-style chicken pieces fried with garlic and spices.",
    price: 500,
    category: "chicken",
    image: { src: "/images/kuku-fry.webp", alt: "A plate of spiced fried chicken pieces" },
  }),
  seed({
    id: "rice-chicken",
    name: "Rice & Chicken",
    description: "Fluffy white rice, fried chicken, kachumbari and a side of greens.",
    price: 450,
    category: "chicken",
    image: { src: "/images/chicken-rice.webp", alt: "Fried chicken with white rice, greens and tomato" },
  }),

  // Fish
  seed({
    id: "fish-chips",
    name: "Fish & Chips",
    description: "Whole fried fish with chips, onions and a squeeze of lime.",
    price: 650,
    category: "fish",
    image: { src: "/images/fish-chips.webp", alt: "Grilled whole fish with chips, onions and lime" },
  }),

  // Chips
  seed({
    id: "chips-plain",
    name: "Chips Plain",
    description: "Hot, salted, crispy outside and soft inside. With ketchup.",
    price: 150,
    category: "chips",
    image: { src: "/images/chips.webp", alt: "Crispy chips on paper with a tomato dip" },
  }),
  seed({
    id: "chips-masala",
    name: "Masala Chips",
    description: "Chips tossed in our tangy tomato-chilli masala sauce.",
    price: 250,
    category: "chips",
    image: { src: "/images/masala-chips.webp", alt: "Potato wedges with a bowl of red sauce" },
  }),

  // Ugali
  seed({
    id: "ugali-beef",
    name: "Ugali & Beef",
    description: "Firm white ugali with our beef stew and sautéed sukuma wiki.",
    price: 400,
    category: "ugali",
    image: { src: "/images/beef-stew-bowl.webp", alt: "A bowl of beef stew with vegetables" },
  }),
  seed({
    id: "ugali-sukuma",
    name: "Ugali Sukuma",
    description: "Ugali with sukuma wiki fried in onions and tomatoes. Simple and filling.",
    price: 200,
    category: "ugali",
    image: { src: "/images/ugali-sukuma.webp", alt: "Ugali served with sautéed sukuma wiki greens" },
  }),
  seed({
    id: "ugali-fish",
    name: "Ugali & Fish",
    description: "Fried tilapia with ugali, kachumbari and greens. A lakeside classic.",
    price: 650,
    category: "ugali",
    image: { src: "/images/ugali-fish.webp", alt: "Fried whole fish with ugali and a fresh salad" },
  }),

  // Chapati
  seed({
    id: "chapati-beef",
    name: "Chapati & Beef",
    description: "Two soft layered chapatis with beef stew and greens.",
    price: 350,
    category: "chapati",
    image: { src: "/images/chapati-beef.webp", alt: "Chapatis served with stew and greens" },
  }),
  seed({
    id: "chapati-2",
    name: "Chapati (2 pcs)",
    description: "Freshly rolled, soft and flaky. Perfect with any stew.",
    price: 60,
    category: "chapati",
    image: { src: "/images/chapati.webp", alt: "A stack of folded chapatis on a cloth" },
  }),

  // Pilau
  seed({
    id: "pilau-beef",
    name: "Pilau Beef",
    description: "Coastal-style spiced rice cooked with tender beef. Kachumbari on the side.",
    price: 400,
    category: "pilau",
    featured: true,
    image: { src: "/images/pilau-beef.webp", alt: "Spiced pilau rice with beef on a decorative plate" },
  }),
  seed({
    id: "pilau-chicken",
    name: "Pilau & Chicken",
    description: "Fragrant pilau with fried chicken pieces and fresh kachumbari.",
    price: 450,
    category: "pilau",
    image: { src: "/images/pilau-chicken.webp", alt: "A bowl of spiced pilau rice" },
  }),

  // Drinks
  seed({
    id: "passion-juice",
    name: "Fresh Passion Juice",
    description: "Freshly blended passion fruit, served cold. 500ml.",
    price: 150,
    category: "drinks",
    image: { src: "/images/passion-juice.webp", alt: "Glasses of fresh passion fruit juice with mango pieces" },
  }),
  seed({
    id: "tropical-juice",
    name: "Tropical Mix",
    description: "Mango, pineapple and passion, blended fresh. 500ml.",
    price: 180,
    category: "drinks",
    image: { src: "/images/tropical-juice.webp", alt: "A glass of yellow tropical juice" },
  }),
];
