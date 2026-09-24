import Image from "next/image";
import Link from "next/link";
import { mainBranch } from "@/config/site";
import { formatKES, formatTime } from "@/lib/format";
import { whatsappLink } from "@/lib/ordering/whatsapp";
import { getMenuItemById } from "@/lib/repositories/menu";
import { buttonClass } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Chilli, CircleText, CurlyArrow, Leaf, Sparkle, Steam } from "@/components/art/Art";

const MARQUEE = ["Nyama choma", "Pilau", "Chapati", "Ugali", "Samosa", "Chai", "Mishkaki", "Kuku fry", "Masala chips"];

export async function Hero() {
  const [hero, side] = await Promise.all([getMenuItemById("mishkaki-chips"), getMenuItemById("beef-samosa")]);
  const earliest = [...mainBranch.hours].sort((a, b) => a.opens.localeCompare(b.opens))[0];

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Decorative background shapes */}
      <svg aria-hidden className="absolute -right-24 -top-24 -z-10 size-[28rem] text-sand lg:size-[44rem]" viewBox="0 0 200 200">
        <path fill="currentColor" d="M45.3-58.9C57.6-47.6 65.4-31.6 69.4-14.2 73.3 3.2 73.4 22 64.9 35.6 56.4 49.2 39.3 57.6 21.4 63.6 3.5 69.6-15.2 73.2-31.5 67.5-47.8 61.8-61.7 46.8-68.4 29.6-75.1 12.4-74.6-7-67.3-22.7-60-38.4-45.9-50.4-30.6-61.1-15.3-71.8 1.2-81.2 16.4-78.1 31.6-75 33-70.2 45.3-58.9Z" transform="translate(100 100)" />
      </svg>

      <div className="container-page grid items-center gap-10 pb-14 pt-8 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-20 lg:pt-14">
        {/* Copy */}
        <div className="@container relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-sukuma-100 px-3 py-1.5 text-sm font-bold text-sukuma">
            <span aria-hidden className="size-2 rounded-full bg-sukuma" />
            Kenyan food · Order on WhatsApp
          </p>

          <h1 id="hero-heading" className="hero-line display mt-5 text-[clamp(2.1rem,13.4cqi,7.25rem)] text-ember [&>span]:whitespace-nowrap">
            <span className="block">Chakula cha</span>
            <span className="block">Kibandaski,</span>
            <span className="!flex items-center gap-[0.12em] text-cocoa">
              Ladha ya
              <span aria-hidden className="relative inline-block h-[0.78em] w-[1.9em] shrink-0 overflow-hidden rounded-full ring-[0.06em] ring-maize">
                <Image src="/images/nyama-choma.webp" alt="" fill sizes="(min-width: 1024px) 12rem, 6rem" className="object-cover" loading="eager" quality={70} />
              </span>
            </span>
            <span className="relative !inline-block text-cocoa">
              kweli.
              <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.16em] w-full text-maize">
                <path d="M3 17C60 5 140 3 297 12" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" pathLength={1} className="underline-draw" />
              </svg>
            </span>
          </h1>

          <Sparkle className="twinkle absolute -top-2 right-[8%] hidden size-8 text-maize sm:block" />
          <Sparkle className="twinkle delay-2 absolute top-[38%] right-[2%] hidden size-5 text-ember sm:block" />

          <p className="mt-7 max-w-md text-lg leading-relaxed text-cocoa-700 sm:text-xl">
            Fresh, filling Kenyan meals made for good days, busy days, and every craving in between.
          </p>

          <div className="relative mt-8 flex flex-col gap-3 min-[430px]:flex-row">
            <CurlyArrow className="absolute -top-16 left-[calc(100%-2rem)] hidden w-24 -scale-x-100 rotate-[20deg] text-ember/70 xl:block" />
            <a
              href={whatsappLink(mainBranch.whatsapp, "Hello Kibandaski, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary", "lg")}
            >
              <WhatsAppIcon className="size-6" />
              Order on WhatsApp
              <span className="sr-only">(opens WhatsApp)</span>
            </a>
            <Link href="/menu" className={buttonClass("outline", "lg")}>
              View menu
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-cocoa-700">
            {["No sign-up needed", "Delivery or pick-up", earliest && `Open daily from ${formatTime(earliest.opens)}`]
              .filter(Boolean)
              .map((t) => (
                <li key={t as string} className="flex items-center gap-1.5">
                  <CheckIcon className="size-4 text-sukuma" />
                  {t}
                </li>
              ))}
          </ul>
        </div>

        {/* Food composition */}
        <div className="relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[32rem] lg:max-w-none">
          <div aria-hidden className="absolute inset-[7%] rounded-full bg-ember" />
          <CircleText
            text="FRESH DAILY ✺ MADE NA UPENDO ✺ ORDER ON WHATSAPP ✺ LADHA YA KWELI ✺ "
            className="absolute inset-0 grid"
            ringClass="fill-ember"
            radius={90}
            fontSize={10.5}
          />

          {hero && (
            <div className="plate-in absolute inset-[13%] overflow-hidden rounded-full shadow-2xl shadow-cocoa/40 ring-8 ring-cream">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 64vw"
                className="object-cover"
                quality={60}
              />
            </div>
          )}

          <Steam className="absolute left-[36%] top-[-2%] h-[16%] w-[28%]" />
          <Chilli className="sway absolute left-[-1%] top-[-1%] w-[13%]" />
          <Leaf className="bob delay-2 absolute bottom-[-2%] right-[30%] w-[9%] rotate-12" />
          <Sparkle className="twinkle absolute right-[26%] top-[2%] w-[6%] text-maize" />
          <Sparkle className="twinkle delay-3 absolute bottom-[2%] left-[42%] w-[5%] text-ember" />

          {side && (
            <div className="bob delay-1 absolute -left-1 bottom-[4%] w-[38%] sm:-left-4">
            <div className="-rotate-6 rounded-3xl bg-cream p-2 shadow-xl shadow-cocoa/20 transition-transform duration-300 hover:rotate-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={side.image.src} alt={side.image.alt} fill sizes="12rem" className="object-cover" quality={70} />
              </div>
              <p className="px-1 pt-1.5 text-xs font-bold leading-tight sm:text-sm">{side.name}</p>
              <p className="px-1 text-sm font-extrabold text-ember">{formatKES(side.price)}</p>
            </div>
            </div>
          )}

          <div className="bob delay-3 absolute right-[2%] top-[4%] w-[22%] overflow-hidden rounded-full ring-4 ring-cream shadow-lg">
            <div className="relative aspect-square">
              <Image src="/images/chapati.webp" alt="" fill sizes="8rem" className="object-cover" quality={70} />
            </div>
          </div>

          {hero && (
            <div className="pop-in absolute bottom-[14%] right-0 size-[30%] [animation-delay:0.5s] sm:right-[2%]">
            <div className="hover-wiggle grid size-full rotate-12 place-items-center rounded-full bg-maize text-center text-cocoa shadow-xl">
              <div className="px-2 leading-none">
                <p className="text-[clamp(0.7rem,2.4vw,0.85rem)] font-bold uppercase">{hero.name}</p>
                <p className="display mt-1 text-[clamp(1.2rem,5.2vw,2rem)]">{formatKES(hero.price)}</p>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Marquee */}
      <div aria-hidden className="on-dark relative -rotate-1 overflow-hidden bg-ember py-3 text-cream">
        <div className="flex w-max motion-safe:animate-[marquee_40s_linear_infinite]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 gap-6 pr-6">
              {MARQUEE.map((w) => (
                <span key={w} className="display flex items-center gap-6 text-2xl sm:text-3xl">
                  {w}
                  <span className="text-maize">✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
