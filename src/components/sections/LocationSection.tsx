import Image from "next/image";
import { mainBranch, site } from "@/config/site";
import { formatTime } from "@/lib/format";
import { whatsappLink } from "@/lib/ordering/whatsapp";
import { buttonClass } from "@/components/ui/button";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Chilli, Sparkle, Sunburst } from "@/components/art/Art";

export function OpeningHoursList({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <dl className="space-y-2">
      {mainBranch.hours.map((h) => (
        <div key={h.label} className={`flex justify-between gap-4 border-b border-dashed pb-2 ${tone === "dark" ? "border-cream/25" : "border-cocoa/20"}`}>
          <dt className="font-semibold">{h.label}</dt>
          <dd className="tabular-nums">
            {formatTime(h.opens)} – {formatTime(h.closes)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="container-page pt-16 sm:pt-24">
      <div className="reveal relative isolate overflow-hidden rounded-5xl bg-maize px-5 py-14 text-center sm:px-10 sm:py-20">
        <Sunburst className="absolute left-1/2 top-1/2 -z-20 size-[60rem] -translate-x-1/2 -translate-y-1/2 text-maize-300/45" />
        <Chilli className="sway absolute bottom-6 left-6 w-12 sm:hidden" />
        <Sparkle className="twinkle absolute right-[22%] top-8 size-7 text-ember" />
        <Sparkle className="twinkle delay-2 absolute bottom-10 left-[24%] size-5 text-cocoa" />
        <div aria-hidden className="bob absolute -left-10 top-6 -z-10 hidden size-40 overflow-hidden rounded-full ring-8 ring-maize-300 sm:block lg:left-8 lg:size-52">
          <Image src="/images/samosa.webp" alt="" fill sizes="13rem" className="object-cover" quality={70} />
        </div>
        <div aria-hidden className="bob delay-2 absolute -bottom-10 -right-10 -z-10 hidden size-44 overflow-hidden rounded-full ring-8 ring-maize-300 sm:block lg:right-8 lg:size-56">
          <Image src="/images/chicken-chips.webp" alt="" fill sizes="14rem" className="object-cover" quality={70} />
        </div>
        <h2 id="cta-heading" className="display mx-auto max-w-[12ch] text-[clamp(2.8rem,9vw,6rem)] text-ember-700">
          Hungry? Tuko ready.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg font-medium text-cocoa">
          Send your order on WhatsApp or pull up a chair. Your next meal is waiting.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 min-[430px]:flex-row">
          <a href={whatsappLink(mainBranch.whatsapp, "Hello Kibandaski, I'd like to place an order.")} target="_blank" rel="noopener noreferrer" className={buttonClass("ember", "lg")}>
            <WhatsAppIcon className="size-6" />
            Order on WhatsApp
            <span className="sr-only">(opens WhatsApp)</span>
          </a>
          <a href={`tel:+${mainBranch.whatsapp}`} className={buttonClass("outline", "lg")}>
            <PhoneIcon className="size-5" />
            Call {mainBranch.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export function LocationSection({ headingLevel = "h2", title = "Come through" }: { headingLevel?: "h1" | "h2"; title?: string }) {
  const b = mainBranch;
  const Heading = headingLevel;
  const Sub = headingLevel === "h1" ? "h2" : "h3";
  const address = [b.street, b.area, b.city, b.country].filter(Boolean).join(", ");

  return (
    <section id="visit" aria-labelledby="visit-heading" className="container-page py-16 sm:py-24">
      <Heading id="visit-heading" className="display text-[clamp(2.6rem,8vw,5rem)] text-ember">
        {title}
      </Heading>
      <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="on-dark flex flex-col gap-6 rounded-5xl bg-cocoa p-6 text-cream sm:p-8">
          <div>
            <Sub className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-maize">
              <PinIcon className="size-5" /> Find us
            </Sub>
            <address className="not-italic">
              <p className="display mt-2 text-4xl normal-case">{site.name}</p>
              <p className="mt-1 text-lg text-cream/90">{address}</p>
            </address>

            <Sub className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-maize">
              <PhoneIcon className="size-5" /> Phone
            </Sub>
            <a href={`tel:+${b.whatsapp}`} className="mt-1 inline-flex min-h-11 items-center text-2xl font-extrabold underline decoration-maize decoration-2 underline-offset-4">
              {b.phoneDisplay}
            </a>
          </div>

          <div>
            <Sub className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-maize">
              <ClockIcon className="size-5" /> Opening hours
            </Sub>
            <div className="mt-3">
              <OpeningHoursList tone="dark" />
            </div>
          </div>

          <a href={whatsappLink(b.whatsapp, "Hello Kibandaski, I'd like to place an order.")} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "lg", "mt-auto w-full")}>
            <WhatsAppIcon className="size-6" />
            Order via WhatsApp
            <span className="sr-only">(opens WhatsApp)</span>
          </a>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-5xl bg-sand lg:min-h-full">
          {b.mapEmbedUrl ? (
            <iframe
              src={b.mapEmbedUrl}
              title={`Map showing ${site.name} location`}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <svg aria-hidden className="absolute inset-0 size-full text-sand-deep" preserveAspectRatio="none" viewBox="0 0 400 300">
                <path d="M0 80 C100 60 160 140 400 100 M0 200 C120 180 260 260 400 210 M120 0 C140 100 90 200 140 300 M280 0 C260 120 320 180 290 300" stroke="currentColor" strokeWidth="14" fill="none" />
              </svg>
              <div className="relative">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-ember text-cream shadow-lg">
                  <PinIcon className="size-8" />
                </span>
                <p className="mt-4 text-xl font-extrabold">Map coming soon</p>
                <p className="mt-1 max-w-xs text-cocoa-700">Message us on WhatsApp and we&apos;ll share our exact location pin.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
