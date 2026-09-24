import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, FlameIcon, HeartIcon, LeafIcon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/button";
import { Leaf, Sparkle, Squiggle, Steam } from "@/components/art/Art";

const VALUES = [
  { icon: LeafIcon, title: "Fresh every morning", text: "Sukuma, tomatoes and meat bought daily. No shortcuts." },
  { icon: FlameIcon, title: "Cooked the way you know", text: "Recipes from home kitchens, not a corporate manual." },
  { icon: HeartIcon, title: "Fair, honest prices", text: "Portions that fill you, at prices that make sense." },
];

export function AboutSection({ variant = "teaser" }: { variant?: "teaser" | "full" }) {
  const Heading = variant === "full" ? "h1" : "h2";
  const Sub = variant === "full" ? "h2" : "h3";
  return (
    <section aria-labelledby="about-heading" className="container-page py-16 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Images */}
        <div className="relative mx-auto w-full max-w-lg pb-16 pr-10 sm:pb-20 sm:pr-16">
          <Steam className="absolute -top-14 left-[30%] z-10 h-16 w-28" />
          <Leaf className="bob absolute -right-2 top-[18%] z-10 w-14 -rotate-12 sm:w-16" />
          <Squiggle className="absolute -bottom-2 left-2 w-28 text-maize" />
          <Sparkle className="twinkle delay-1 absolute bottom-[40%] -left-4 size-7 text-ember" />
          <div className="reveal-img relative aspect-[4/5] overflow-hidden rounded-5xl">
            <Image
              src="/images/kitchen-community.webp"
              alt="People gathered around a table while food cooks on a small stove"
              fill
              sizes="(min-width: 1024px) 34vw, 90vw"
              className="object-cover"
              quality={70}
              priority={variant === "full"}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-4xl ring-8 ring-cream">
            <div className="relative aspect-square">
              <Image src="/images/chapati-making.webp" alt="A cook rolling chapati dough by hand" fill sizes="(min-width: 1024px) 18vw, 48vw" className="object-cover" quality={70} />
            </div>
          </div>
          <div aria-hidden className="sway absolute -left-2 top-8 grid size-28 place-items-center rounded-full bg-maize text-center text-cocoa shadow-lg [animation-duration:7s] sm:size-32">
            <p className="display text-lg leading-none sm:text-xl">
              Made
              <br />
              <span className="text-ember-700">na</span>
              <br />
              upendo
            </p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <Eyebrow className="text-sukuma">Our story</Eyebrow>
          <Heading id="about-heading" className="display mt-3 text-[clamp(2.6rem,7.5vw,5rem)] text-ember">
            Made for Kenyans.
            <br />
            <span className="text-cocoa">Made with love.</span>
          </Heading>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-cocoa-700">
            <p>
              Kibandaski started with a simple idea: the food you grab from your favourite kibanda — hot, filling and fairly
              priced — deserves a proper home.
            </p>
            <p>
              So we cook the meals Kenyans actually eat every day. Ugali that holds its shape, pilau with real spice, chapati
              rolled by hand and nyama choma worth waiting for.
            </p>
            {variant === "full" && (
              <>
                <p>
                  We keep the menu short so everything stays fresh. When something runs out, it&apos;s gone for the day.
                  We&apos;d rather tell you &ldquo;sold out&rdquo; than serve you yesterday&apos;s food.
                </p>
                <p>
                  Ordering should be easy too. No app to download, no account to create. Pick your food, send it to us on
                  WhatsApp, and we&apos;ll confirm with you directly.
                </p>
              </>
            )}
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="group rounded-3xl bg-sand p-4 transition-transform duration-300 hover:-translate-y-1">
                <span className="grid size-11 place-items-center rounded-full bg-sukuma text-cream transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  <Icon className="size-5.5" />
                </span>
                <Sub className="mt-3 font-extrabold leading-tight">{title}</Sub>
                <p className="mt-1 text-sm text-cocoa-700">{text}</p>
              </li>
            ))}
          </ul>

          {variant === "teaser" && (
            <Link href="/about" className={buttonClass("outline", "md", "mt-8")}>
              Read our story
              <ArrowRightIcon className="size-5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
