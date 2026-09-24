"use client";

import { useId, useMemo, useState } from "react";
import { CategoryFilter, type FilterValue } from "./CategoryFilter";
import { MenuGrid } from "./MenuGrid";
import { MenuCard } from "./MenuCard";
import type { Category, MenuItem } from "@/types/domain";

interface Props {
  categories: Category[];
  items: MenuItem[];
  initial?: FilterValue;
  /** Heading level of the category titles; dish names sit one level below. */
  groupHeadingLevel?: "h2" | "h3";
}

const POPULAR: Category = { id: "popular" as Category["id"], name: "Popular right now", tagline: "Crowd favourites", image: "", sortOrder: 0 };

/**
 * Category filter + grid. Cards render from the item data (not pre-rendered
 * trees) so the page payload stays small. "All" groups dishes by category.
 */
export function MenuExplorer({ categories, items, initial = "all", groupHeadingLevel = "h3" }: Props) {
  const [active, setActive] = useState<FilterValue>(initial);
  const [interacted, setInteracted] = useState(false);
  const gridId = useId();
  const cardHeading = groupHeadingLevel === "h2" ? "h3" : "h4";

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length, popular: items.filter((i) => i.featured).length };
    for (const i of items) c[i.category] = (c[i.category] ?? 0) + 1;
    return c;
  }, [items]);

  const groups: { category: Category; items: MenuItem[] }[] =
    active === "popular"
      ? [{ category: POPULAR, items: items.filter((i) => i.featured) }]
      : categories
          .filter((c) => active === "all" || c.id === active)
          .map((c) => ({ category: c, items: items.filter((i) => i.category === c.id) }))
          .filter((g) => g.items.length > 0);

  const activeName =
    active === "all" ? "all dishes" : active === "popular" ? "popular dishes" : categories.find((c) => c.id === active)?.name;

  return (
    <>
      <CategoryFilter
        categories={categories}
        counts={counts}
        active={active}
        onChange={(v) => {
          setActive(v);
          setInteracted(true);
        }}
        controls={gridId}
      />
      <p className="sr-only" aria-live="polite">
        Showing {activeName}, {counts[active] ?? 0} dishes
      </p>
      <div id={gridId} key={active} className="mt-8 space-y-12 sm:mt-10">
        {groups.map((g) => (
          <MenuGrid key={g.category.id} category={g.category} showHeading={active === "all"} headingLevel={groupHeadingLevel}>
            {g.items.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} headingLevel={cardHeading} animate={interacted} />
            ))}
          </MenuGrid>
        ))}
      </div>
    </>
  );
}
