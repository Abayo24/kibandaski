"use client";

import { useCart } from "./CartProvider";
import { formatKES } from "@/lib/format";
import { ArrowRightIcon } from "@/components/ui/Icons";

/** Sticky bottom bar on phones once something is in the order. */
export function MobileCartBar() {
  const { count, total, openCart, isOpen } = useCart();
  if (count === 0 || isOpen) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden animate-rise">
      <button
        type="button"
        onClick={openCart}
        className="flex min-h-14 w-full items-center justify-between gap-3 rounded-full bg-cocoa py-2 pl-2 pr-5 text-cream shadow-xl shadow-cocoa/30"
      >
        <span className="grid size-10 place-items-center rounded-full bg-maize text-sm font-extrabold text-cocoa">{count}</span>
        <span className="flex-1 text-left font-bold uppercase tracking-wide">View order</span>
        <span className="flex items-center gap-2 font-extrabold tabular-nums">
          {formatKES(total)}
          <ArrowRightIcon className="size-5" />
        </span>
      </button>
    </div>
  );
}
