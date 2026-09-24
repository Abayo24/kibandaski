import Image from "next/image";
import { AddToOrder } from "@/components/menu/AddToOrder";
import { formatKES } from "@/lib/format";
import { getFeaturedItems } from "@/lib/repositories/menu";
import type { MenuItem } from "@/types/domain";
import { CircleText, Leaf, Sparkle, Tomato } from "@/components/art/Art";
import { FlameIcon } from "@/components/ui/Icons";

function Price({ item, className = "" }: { item: MenuItem; className?: string }) {
  return (
    <p className={`display text-3xl tabular-nums ${className}`}>
      <span className="sr-only">Price: </span>
      {formatKES(item.price)}
    </p>
  );
}

/** Editorial collage driven by `featured: true` menu items. */
export async function FeaturedSection() {
  const [a, b, c, d] = await getFeaturedItems(4);
  if (!a) return null;

  return (
    <section aria-labelledby="featured-heading" className="container-page py-16 sm:py-24">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
        {/* A — hero card */}
        <article className="reveal relative isolate flex flex-col overflow-hidden rounded-5xl bg-maize p-6 sm:min-h-[38rem] sm:p-10 lg:col-span-7 lg:row-span-2">
          <CircleText
            text="SMOKY ✺ SALTY ✺ PROPER ✺ "
            className="pop-in absolute right-6 top-6 z-10 hidden size-28 rounded-full bg-ember sm:grid lg:size-32"
            ringClass="fill-cream"
            radius={70}
            fontSize={24}
          >
            <FlameIcon className="size-9 text-maize" />
          </CircleText>
          <Sparkle className="twinkle absolute left-[52%] top-[42%] hidden size-7 text-cream sm:block" />
          <h2 id="featured-heading" className="display max-w-[11ch] text-[clamp(2.6rem,8vw,5.25rem)] text-ember-700">
            Flavor you&apos;ll come back for.
          </h2>
          <div className="relative z-10 mt-auto max-w-[14rem] pt-6 sm:max-w-[17rem] lg:max-w-[15rem] xl:max-w-[17rem]">
            <p className="text-sm font-bold uppercase tracking-widest text-cocoa-700">Crowd favourite</p>
            <h3 className="mt-1 text-2xl font-extrabold text-cocoa">{a.name}</h3>
            <p className="mt-1 text-cocoa-700">{a.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Price item={a} className="text-cocoa" />
              <AddToOrder id={a.id} name={a.name} available={a.available} tone="cream" />
            </div>
          </div>
          <div className="reveal-img relative order-first -mr-14 -mt-2 mb-4 aspect-square w-[70%] self-end overflow-hidden rounded-full ring-[14px] ring-maize-300 sm:absolute sm:-bottom-10 sm:-right-14 sm:-z-10 sm:order-none sm:m-0 sm:w-[60%]">
            <Image src={a.image.src} alt={a.image.alt} fill sizes="(min-width: 1024px) 30vw, 70vw" className="object-cover" quality={75} />
          </div>
        </article>

        {/* B — dark card, image left */}
        {b && (
          <article className="reveal group on-dark relative grid overflow-hidden rounded-5xl bg-cocoa min-[420px]:grid-cols-[42%_1fr] text-cream sm:min-h-72 lg:col-span-5">
            <div className="relative aspect-[16/10] min-[420px]:aspect-auto min-[420px]:min-h-60">
              <Image src={b.image.src} alt={b.image.alt} fill sizes="(min-width: 1024px) 18vw, 42vw" className="object-cover transition-transform duration-700 group-hover:scale-110" quality={70} />
            </div>
            <div className="flex flex-col p-5 sm:p-7">
              <Sparkle className="twinkle absolute right-5 top-5 size-6 text-maize" />
              <h3 className="display text-3xl text-maize sm:text-4xl">{b.name}</h3>
              <p className="mt-2 text-sm text-cream/85 sm:text-base">{b.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                <Price item={b} />
                <AddToOrder id={b.id} name={b.name} available={b.available} />
              </div>
            </div>
          </article>
        )}

        {/* C — ember card, image right */}
        {c && (
          <article className="reveal group on-dark relative grid overflow-hidden rounded-5xl bg-ember min-[420px]:grid-cols-[1fr_42%] text-cream sm:min-h-72 lg:col-span-5">
            <div className="order-last flex flex-col p-5 min-[420px]:order-none min-[420px]:text-right sm:p-7">
              <h3 className="display text-3xl text-maize sm:text-4xl">{c.name}</h3>
              <p className="mt-2 text-sm text-cream/90 sm:text-base">{c.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 min-[420px]:justify-end">
                <Price item={c} />
                <AddToOrder id={c.id} name={c.name} available={c.available} />
              </div>
            </div>
            <div className="relative aspect-[16/10] min-[420px]:aspect-auto min-[420px]:min-h-60">
              <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 18vw, 42vw" className="object-cover transition-transform duration-700 group-hover:scale-110" quality={70} />
            </div>
          </article>
        )}

        {/* D — wide strip */}
        {d && (
          <article className="reveal group bg-doodles relative flex flex-col items-center gap-5 overflow-hidden rounded-5xl bg-sand p-5 sm:flex-row sm:p-6 lg:col-span-12">
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-4xl sm:aspect-square sm:w-44 lg:w-52">
              <Image src={d.image.src} alt={d.image.alt} fill sizes="(min-width: 640px) 13rem, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-110" quality={70} />
            </div>
            <div className="relative flex-1">
              <Leaf className="bob absolute -top-3 right-0 hidden w-10 sm:block lg:right-24" />
              <Tomato className="bob delay-2 absolute -bottom-2 right-10 hidden w-8 sm:block lg:right-40" />
              <p className="text-sm font-bold uppercase tracking-widest text-sukuma">Everyday favourite</p>
              <h3 className="display mt-1 text-4xl text-ember sm:text-5xl">{d.name}</h3>
              <p className="mt-2 max-w-xl text-cocoa-700">{d.description}</p>
            </div>
            <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end">
              <Price item={d} className="text-cocoa sm:text-4xl" />
              <AddToOrder id={d.id} name={d.name} available={d.available} />
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
