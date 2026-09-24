import Link from "next/link";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60dvh] place-items-center py-20 text-center">
      <div>
        <p aria-hidden className="display text-[clamp(5rem,25vw,12rem)] text-maize">404</p>
        <h1 className="display text-5xl text-ember">Hii plate haipo.</h1>
        <p className="mt-3 text-lg text-cocoa-700">We couldn&apos;t find that page. The food is still here though.</p>
        <Link href="/menu" className={buttonClass("primary", "lg", "mt-8")}>
          See the menu
        </Link>
      </div>
    </section>
  );
}
