"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { CartButton } from "@/components/cart/CartButton";
import { CloseIcon, MenuIcon, SearchIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/button";
import { useDialog } from "@/components/ui/useDialog";
import { mainBranch, site } from "@/config/site";
import { whatsappLink } from "@/lib/ordering/whatsapp";
import { KitengeBand } from "@/components/art/Art";

const MenuSearch = dynamic(() => import("./MenuSearch"), { ssr: false });

export function Navbar() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const navRef = useDialog(navOpen, closeNav);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const openSearch = () => {
    setSearchLoaded(true);
    setSearchOpen(true);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-sand-deep/60 bg-cream/90 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-cream">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-3">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="relative inline-flex min-h-11 items-center rounded-full px-4 font-semibold text-cocoa-700 transition-colors hover:text-ember aria-[current=page]:text-ember after:absolute after:inset-x-4 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform aria-[current=page]:after:scale-x-100 hover:after:scale-x-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button type="button" onClick={openSearch} className="hidden min-[360px]:grid size-11 place-items-center rounded-full text-cocoa hover:bg-sand" aria-label="Search the menu">
            <SearchIcon className="size-5.5" />
          </button>
          <div className="hidden md:block">
            <CartButton />
          </div>
          <div className="md:hidden">
            <CartButton compact />
          </div>
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            className="grid size-11 place-items-center rounded-full text-cocoa hover:bg-sand md:hidden"
            aria-label="Open menu"
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <dialog ref={navRef} id="mobile-nav" className="sheet from-top on-dark !bg-ember text-cream" aria-label="Menu">
        <div className="container-page flex h-[var(--header-h)] items-center justify-between">
          <span className="display text-[1.6rem] normal-case text-maize">Kibandaski</span>
          <button type="button" onClick={closeNav} className="grid size-11 place-items-center rounded-full hover:bg-ember-700" aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-page pb-8 pt-4">
          <ul className="space-y-1">
            {site.nav.map((l, i) => (
              <li key={l.href} className="animate-rise" style={{ animationDelay: `${i * 50}ms` }}>
                <Link
                  href={l.href}
                  onClick={closeNav}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="display block py-2 text-6xl text-cream aria-[current=page]:text-maize"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              closeNav();
              openSearch();
            }}
            className="mt-4 flex min-h-12 w-full items-center gap-3 rounded-full bg-ember-700 px-5 font-semibold text-cream"
          >
            <SearchIcon className="size-5" />
            Search the menu
          </button>
          <a
            href={whatsappLink(mainBranch.whatsapp, "Hello Kibandaski, I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "lg", "mt-8 w-full")}
          >
            <WhatsAppIcon className="size-6" />
            Order on WhatsApp
          </a>
          <p className="mt-4 text-center text-cream/90">
            or call <a href={`tel:+${mainBranch.whatsapp}`} className="font-bold underline underline-offset-4">{mainBranch.phoneDisplay}</a>
          </p>
        </nav>
        <KitengeBand />
      </dialog>

      {searchLoaded && <MenuSearch open={searchOpen} onClose={closeSearch} />}
    </header>
  );
}
