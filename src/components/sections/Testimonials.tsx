import { getTestimonials } from "@/lib/repositories/content";
import { StarIcon } from "@/components/ui/Icons";
import { Sparkle } from "@/components/art/Art";

const TILTS = ["md:-rotate-1", "md:rotate-1 md:translate-y-6", "md:-rotate-[0.5deg]"];
const BGS = ["bg-cream", "bg-maize", "bg-cream"];

export async function Testimonials() {
  const items = await getTestimonials();
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="reviews-heading" className="bg-doodles relative bg-sand py-16 sm:py-24">
      <div className="container-page relative">
        <Sparkle className="twinkle absolute left-[8%] top-0 hidden size-8 text-maize md:block" />
        <Sparkle className="twinkle delay-2 absolute right-[10%] top-12 hidden size-6 text-ember md:block" />
        <h2 id="reviews-heading" className="display text-center text-[clamp(2.6rem,8vw,5rem)] text-ember">
          What our customers say
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-8">
          {items.map((t, i) => (
            <li key={t.id} className={`reveal ${TILTS[i % 3]}`}>
              <figure className={`relative flex h-full flex-col overflow-hidden rounded-4xl p-6 shadow-[0_6px_0_0_var(--color-cocoa)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 sm:p-7 ${BGS[i % 3]}`}>
                <span aria-hidden className="display pointer-events-none absolute -right-2 -top-6 text-[9rem] leading-none text-ember/10">&rdquo;</span>
                <div className="flex gap-0.5 text-ember" role="img" aria-label={`Rated ${t.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <StarIcon key={s} filled={s < t.rating} className="size-5" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-lg font-medium leading-relaxed text-cocoa">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden className="grid size-11 place-items-center rounded-full bg-ember font-extrabold text-cream">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-extrabold">{t.name}</span>
                    <span className="block text-sm text-cocoa-700">{t.area}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
