import type { Category } from "@/types/domain";

export const categories: Category[] = [
  { id: "breakfast", name: "Breakfast", tagline: "Chai time", image: "/images/mandazi.webp", sortOrder: 1 },
  { id: "nyama", name: "Nyama", tagline: "Choma & stew", image: "/images/nyama-choma.webp", sortOrder: 2 },
  { id: "chicken", name: "Chicken", tagline: "Kuku, any style", image: "/images/kuku-fry.webp", sortOrder: 3 },
  { id: "fish", name: "Fish", tagline: "Fresh from the lake", image: "/images/ugali-fish.webp", sortOrder: 4 },
  { id: "chips", name: "Chips", tagline: "Crispy, always", image: "/images/chips.webp", sortOrder: 5 },
  { id: "ugali", name: "Ugali", tagline: "The real deal", image: "/images/ugali-sukuma.webp", sortOrder: 6 },
  { id: "chapati", name: "Chapati", tagline: "Soft layers", image: "/images/chapati.webp", sortOrder: 7 },
  { id: "pilau", name: "Pilau", tagline: "Spiced right", image: "/images/pilau-beef.webp", sortOrder: 8 },
  { id: "drinks", name: "Drinks", tagline: "Cool down", image: "/images/passion-juice.webp", sortOrder: 9 },
];
