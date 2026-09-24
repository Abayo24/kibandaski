"use client";

import Image from "next/image";
import type { Category, CategoryId } from "@/types/domain";

export type FilterValue = CategoryId | "all" | "popular";

interface Props {
  categories: Category[];
  counts: Record<string, number>;
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  controls: string;
}

export function CategoryFilter({ categories, counts, active, onChange, controls }: Props) {
  const options: { id: FilterValue; name: string; image: string }[] = [
    { id: "popular", name: "Popular", image: "/images/mishkaki-chips.webp" },
    { id: "all", name: "All", image: "/images/family-spread.webp" },
    ...categories.map((c) => ({ id: c.id, name: c.name, image: c.image })),
  ];

  return (
    <div
      role="group"
      aria-label="Filter menu by category"
      className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-11 lg:gap-3 lg:overflow-visible lg:px-0"
    >
      {options.map((o) => {
        const pressed = active === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={pressed}
            aria-controls={controls}
            onClick={() => onChange(o.id)}
            className={`group flex w-[5.75rem] shrink-0 snap-start flex-col items-center gap-2 rounded-3xl p-2 pb-3 transition-colors duration-200 lg:w-auto ${
              pressed ? "bg-ember text-cream" : "bg-sand text-cocoa hover:bg-sand-deep"
            }`}
          >
            <span className={`relative block size-16 overflow-hidden rounded-full ring-4 transition-transform duration-300 group-hover:scale-105 ${pressed ? "ring-maize" : "ring-cream"}`}>
              <Image src={o.image} alt="" fill sizes="64px" className="object-cover" quality={70} />
            </span>
            <span className="text-sm font-bold leading-none">{o.name}</span>
            <span className={`text-xs font-semibold leading-none ${pressed ? "text-maize-300" : "text-cocoa-500"}`}>
              {counts[o.id] ?? 0}
              <span className="sr-only"> dishes</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
