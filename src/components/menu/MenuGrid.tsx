import type { Category } from "@/types/domain";

interface Props {
  category: Category;
  showHeading: boolean;
  headingLevel?: "h2" | "h3";
  children: React.ReactNode;
}

export function MenuGrid({ category, showHeading, headingLevel = "h3", children }: Props) {
  const Heading = headingLevel;
  return (
    <section aria-labelledby={`cat-${category.id}`}>
      <div className={showHeading ? "mb-4 flex items-baseline gap-3" : "sr-only"}>
        <Heading id={`cat-${category.id}`} className="display text-3xl text-cocoa sm:text-4xl">
          {category.name}
        </Heading>
        <span className="text-sm font-semibold italic text-cocoa-500">{category.tagline}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
    </section>
  );
}
