import { MenuExplorer } from "@/components/menu/MenuExplorer";
import type { FilterValue } from "@/components/menu/CategoryFilter";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getCategories, getMenuItems } from "@/lib/repositories/menu";
import { formatKES } from "@/lib/format";
import { Chilli, CurlyArrow, Sparkle } from "@/components/art/Art";

export async function MenuSection({ headingLevel = "h2", initial = "all" }: { headingLevel?: "h1" | "h2"; initial?: FilterValue }) {
  const [categories, items] = await Promise.all([getCategories(), getMenuItems()]);
  const Heading = headingLevel;
  const minPrice = Math.min(...items.filter((i) => i.available).map((i) => i.price));

  return (
    <section id="menu" aria-labelledby="menu-heading" className="container-page relative py-16 sm:py-24">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative">
          <Chilli className="sway absolute -top-4 left-40 w-10 rotate-12 sm:left-48 sm:w-12" />
          <Sparkle className="twinkle absolute -right-8 top-10 hidden size-7 text-maize sm:block" />
          <Eyebrow className="text-sukuma">Menu ya leo</Eyebrow>
          <Heading id="menu-heading" className="display mt-3 text-[clamp(2.6rem,9vw,5.5rem)] text-ember [text-wrap:wrap]">
            What are you
            <br className="hidden sm:block" /> eating{" "}
            <span className="relative inline-block">
              today?
              <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-[0.14em] left-0 h-[0.16em] w-full text-maize">
                <path d="M3 15C70 4 170 6 297 14" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" pathLength={1} className="draw-in" />
              </svg>
            </span>
          </Heading>
        </div>
        <p className="relative max-w-sm text-lg text-cocoa-700 lg:text-right">
          <CurlyArrow className="absolute -bottom-16 right-4 hidden w-20 rotate-[10deg] text-ember lg:block" />
          Prices from <strong className="text-cocoa">{formatKES(minPrice)}</strong>. Tap <strong className="text-cocoa">Add</strong>, then send your order on WhatsApp.
        </p>
      </div>
      <MenuExplorer categories={categories} items={items} initial={initial} groupHeadingLevel={headingLevel === "h1" ? "h2" : "h3"} />
    </section>
  );
}
