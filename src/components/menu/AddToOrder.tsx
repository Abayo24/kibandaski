"use client";

import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { PlusIcon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/button";
import { flyToCart } from "@/lib/flyToCart";

export function AddToOrder({ id, name, available, tone = "maize" }: { id: string; name: string; available: boolean; tone?: "maize" | "cream" }) {
  const { quantityOf, add, setQuantity } = useCart();
  const qty = quantityOf(id);

  if (!available) {
    return (
      <span className="inline-flex min-h-11 items-center rounded-full border-2 border-dashed border-cocoa-500 px-4 text-sm font-bold uppercase text-cocoa-500">
        Sold out
      </span>
    );
  }

  if (qty > 0) {
    return <QuantityStepper name={name} quantity={qty} onChange={(q) => setQuantity(id, q)} size="sm" tone={tone} />;
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        add(id);
        flyToCart(e.currentTarget);
      }}
      className={buttonClass(tone === "maize" ? "primary" : "cream", "sm", "group pl-3")}
      aria-label={`Add ${name} to order`}
    >
      <PlusIcon className="size-4.5 transition-transform duration-300 group-hover:rotate-90" />
      Add
    </button>
  );
}
