import Link from "next/link";
import { mainBranch, site } from "@/config/site";
import { whatsappLink } from "@/lib/ordering/whatsapp";
import { Logo } from "@/components/ui/Logo";
import { OpeningHoursList } from "@/components/sections/LocationSection";
import { buttonClass } from "@/components/ui/button";
import { PhoneIcon, WhatsAppIcon, socialIcons } from "@/components/ui/Icons";
import { KitengeBand } from "@/components/art/Art";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative mt-16 overflow-hidden bg-cocoa pb-28 pt-14 text-cream sm:mt-24 md:pb-10">
      <KitengeBand className="absolute inset-x-0 top-0" />
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-cream/85">{site.shortDescription}</p>
            <a href={whatsappLink(mainBranch.whatsapp, "Hello Kibandaski, I'd like to place an order.")} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "mt-6")}>
              <WhatsAppIcon className="size-5" />
              Order on WhatsApp
              <span className="sr-only">(opens WhatsApp)</span>
            </a>
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {site.social.map((s) => {
                const Icon = socialIcons[s.name];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-11 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-maize hover:text-cocoa"
                      aria-label={`${site.name} on ${s.name}`}
                    >
                      {Icon && <Icon className="size-5" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-bold uppercase tracking-widest text-maize">Explore</h2>
            <ul className="mt-4 space-y-1">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center font-semibold hover:text-maize hover:underline underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-maize">Opening hours</h2>
            <div className="mt-4 text-cream/90">
              <OpeningHoursList tone="dark" />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-maize">Talk to us</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`tel:+${mainBranch.whatsapp}`} className="inline-flex min-h-11 items-center gap-2 font-semibold hover:text-maize">
                  <PhoneIcon className="size-5" /> {mainBranch.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink(mainBranch.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold hover:text-maize">
                  <WhatsAppIcon className="size-5" /> WhatsApp us
                </a>
              </li>
              <li className="text-cream/85">{[mainBranch.city, mainBranch.country].filter(Boolean).join(", ")}</li>
            </ul>
          </div>
        </div>

        <p aria-hidden className="display pointer-events-none mt-12 select-none whitespace-nowrap text-center text-[14vw] leading-[0.8] text-maize/10 min-[1440px]:text-[12.5rem]">
          Kibandaski
        </p>
        <div className="mt-8 flex flex-col gap-2 border-t border-cream/15 pt-6 text-sm text-cream/75 sm:flex-row sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Chakula cha Kibandaski, ladha ya kweli.</p>
        </div>
      </div>
    </footer>
  );
}
