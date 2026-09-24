"use client";

import { useCart } from "./CartProvider";
import { BagIcon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/button";

export function CartButton({ compact = false }: { compact?: boolean }) {
  const { count, openCart } = useCart();
  const label = count > 0 ? `Open your order, ${count} ${count === 1 ? "item" : "items"}` : "Open your order";

  if (compact) {
    return (
      <button type="button" data-cart-target onClick={openCart} aria-label={label} className="relative grid size-11 place-items-center rounded-full bg-maize text-cocoa">
        <BagIcon className="size-5.5" />
        {count > 0 && (
          <span key={count} className="animate-pop absolute -right-1 -top-1 grid min-w-5.5 place-items-center rounded-full bg-ember px-1 text-xs font-bold text-cream ring-2 ring-cream">
            {count}
          </span>
        )}
      </button>
    );
  }

  return (
    <button type="button" data-cart-target onClick={openCart} aria-label={label} className={buttonClass("primary", "sm", "whitespace-nowrap")}>
      <BagIcon className="size-5" />
      Order now
      {count > 0 && (
        <span key={count} className="animate-pop grid min-w-6 place-items-center rounded-full bg-ember px-1.5 text-xs text-cream">
          {count}
        </span>
      )}
    </button>
  );
}
