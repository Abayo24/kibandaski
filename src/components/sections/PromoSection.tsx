import Image from "next/image";
import { mainBranch } from "@/config/site";
import { whatsappLink } from "@/lib/ordering/whatsapp";
import { getActivePromotions } from "@/lib/repositories/content";
import { buttonClass } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import type { Promotion } from "@/types/domain";
import { Chilli, KitengeBand, Sparkle, Sunburst, Wave } from "@/components/art/Art";

const TONES: Record<Promotion["tone"], { card: string; sub: string; btn: Parameters<typeof buttonClass>[0] }> = {
  maize: { card: "bg-maize text-cocoa", sub: "text-ember-700", btn: "ember" },
  cream: { card: "bg-cream text-cocoa", sub: "text-ember", btn: "primary" },
  sukuma: { card: "bg-sukuma text-cream on-dark", sub: "text-maize-300", btn: "primary" },
};

export async function PromoSection() {
  const promos = await getActivePromotions();
  if (promos.length === 0) return null;

  return (
    <section aria-labelledby="promo-heading" className="on-dark relative isolate overflow-hidden bg-cocoa py-20 sm:py-28">
      <Wave flip className="absolute inset-x-0 top-0 z-10 text-cream" />
      <Wave className="absolute inset-x-0 bottom-0 z-10 text-cream" />
      <Image src="/images/choma-grill.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" quality={70} />
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-5xl bg-ember p-5 pt-10 text-cream sm:p-8 sm:pt-12 lg:p-12 lg:pt-14">
          <KitengeBand className="absolute inset-x-0 top-0" />
          <Sunburst className="absolute -left-40 -top-40 -z-10 size-[34rem] text-ember-700/60" />
          <Chilli className="sway absolute right-6 top-10 hidden w-14 lg:block" />
          <Sparkle className="twinkle absolute right-28 top-24 hidden size-6 text-maize lg:block" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="promo-heading" className="display text-[clamp(2.6rem,8vw,5.5rem)]">
              More bites.
              <br />
              <span className="text-maize">Less shillings.</span>
            </h2>
            <p className="max-w-sm text-lg text-cream/90">
              Deals we run every week. Tap one and we&apos;ll sort you out on WhatsApp.
            </p>
          </div>

          <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-12">
            {promos.map((p, i) => {
              const t = TONES[p.tone];
              return (
                <li key={p.id} className={`reveal ${i === 1 ? "md:translate-y-6" : ""}`}>
                  <div className={`group flex h-full flex-col overflow-hidden rounded-4xl shadow-[0_6px_0_0_var(--color-cocoa)] transition-transform duration-300 hover:-translate-y-2 ${i % 2 ? "hover:rotate-1" : "hover:-rotate-1"} ${t.card}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-110" quality={70} />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="display text-4xl">{p.title}</h3>
                    <p className={`mt-1 text-lg font-extrabold ${t.sub}`}>{p.subtitle}</p>
                    <p className="mt-2 flex-1 opacity-90">{p.description}</p>
                    <a
                      href={whatsappLink(mainBranch.whatsapp, p.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass(t.btn, "md", "mt-5 self-start")}
                    >
                      <WhatsAppIcon className="size-5" />
                      {p.ctaLabel}
                      <span className="sr-only">(opens WhatsApp)</span>
                    </a>
                  </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
