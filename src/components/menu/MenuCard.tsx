import Image from "next/image";
import { AddToOrder } from "./AddToOrder";
import { formatKES } from "@/lib/format";
import type { MenuItem } from "@/types/domain";

/**
 * Menu card. Horizontal on phones (fast to scan, big tap targets),
 * vertical with a large photo from `sm` upward.
 */
export function MenuCard({ item, index = 0, priority = false, headingLevel = "h4", animate = false }: { item: MenuItem; index?: number; priority?: boolean; headingLevel?: "h3" | "h4"; animate?: boolean }) {
  const Heading = headingLevel;
  return (
    <article
      className={`group relative grid grid-cols-[6.75rem_1fr] gap-3 rounded-4xl bg-sand p-2.5 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_-12px_rgb(43_22_12/0.35)] min-[400px]:grid-cols-[7.5rem_1fr] sm:flex sm:flex-col sm:gap-0 sm:p-3 ${animate ? "animate-rise" : ""}`}
      style={animate ? { animationDelay: `${Math.min(index, 8) * 40}ms` } : undefined}
      aria-labelledby={`item-${item.id}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-sand-deep sm:aspect-[4/3]">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 8rem"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${item.available ? "" : "grayscale"}`}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={70}
        />
        {!item.available && (
          <span className="absolute left-2 top-2 rounded-full bg-cocoa px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-cream">
            Sold out
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col py-1 pr-1 sm:flex-1 sm:px-2 sm:pb-1 sm:pt-4">
        <Heading id={`item-${item.id}`} className="text-lg font-extrabold leading-tight text-cocoa sm:text-xl">
          {item.name}
        </Heading>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-cocoa-700 sm:text-[0.95rem]">{item.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <p className="text-lg font-extrabold tabular-nums text-ember sm:text-xl">
            <span className="sr-only">Price: </span>
            {formatKES(item.price)}
          </p>
          <AddToOrder id={item.id} name={item.name} available={item.available} />
        </div>
      </div>
    </article>
  );
}
