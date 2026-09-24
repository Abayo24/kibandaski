"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";
import { WhatsAppCheckout } from "./WhatsAppCheckout";
import { useDialog } from "@/components/ui/useDialog";
import { BagIcon, CloseIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/button";
import { formatKES } from "@/lib/format";

/** Loaded on demand (see CartMount) so the checkout code isn't in the initial bundle. */
export default function CartDrawer() {
  const { isOpen, closeCart, lines, count, total, setQuantity, remove, clear } = useCart();
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const onClose = useCallback(() => closeCart(), [closeCart]);
  const ref = useDialog(isOpen, onClose);

  const startOver = () => {
    clear();
    setSentUrl(null);
    closeCart();
  };

  return (
    <dialog ref={ref} className="sheet" aria-labelledby="cart-title">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-3 border-b-2 border-sand px-4 py-3 sm:px-6">
          <h2 id="cart-title" className="display text-3xl text-ember">
            Your order
            {count > 0 && !sentUrl && (
              <span className="ml-2 align-middle font-sans text-base font-bold normal-case tracking-normal text-cocoa-500">
                ({count} {count === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button type="button" onClick={closeCart} className="grid size-11 place-items-center rounded-full hover:bg-sand" aria-label="Close order">
            <CloseIcon />
          </button>
        </header>

        {sentUrl ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-sukuma text-cream">
              <CheckIcon className="size-10" />
            </span>
            <h3 className="display text-4xl text-cocoa">Almost done!</h3>
            <p className="max-w-xs text-cocoa-700">
              WhatsApp should now be open with your order typed out. <strong>Tap send</strong> and we&apos;ll confirm your order and delivery time.
            </p>
            <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "md")}>
              <WhatsAppIcon className="size-5" />
              Open WhatsApp again
            </a>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={startOver} className={buttonClass("outline", "sm")}>
                Start a new order
              </button>
              <button type="button" onClick={() => { setSentUrl(null); closeCart(); }} className={buttonClass("ghost", "sm")}>
                Back to menu
              </button>
            </div>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-sand text-ember">
              <BagIcon className="size-9" />
            </span>
            <h3 className="display text-4xl">Your plate is empty</h3>
            <p className="max-w-xs text-cocoa-700">Pick something tasty from the menu and it&apos;ll show up here.</p>
            <Link href="/menu" onClick={closeCart} className={buttonClass("primary", "md")}>
              Browse the menu
            </Link>
          </div>
        ) : (
          <WhatsAppCheckout
            lines={lines}
            total={total}
            onSent={setSentUrl}
            itemList={
              <ul className="divide-y-2 divide-sand" aria-label="Items in your order">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 py-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-sand">
                      <Image src={l.image.src} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold leading-tight">{l.name}</p>
                      <p className="text-sm text-cocoa-500">{formatKES(l.unitPrice)} each</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <QuantityStepper name={l.name} quantity={l.quantity} onChange={(q) => setQuantity(l.id, q)} size="sm" tone="sand" />
                        {l.quantity > 1 && (
                          <button type="button" onClick={() => remove(l.id)} className="min-h-11 px-2 text-sm font-semibold underline underline-offset-2 text-cocoa-500 hover:text-ember">
                            Remove<span className="sr-only"> {l.name}</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="self-start pt-0.5 font-extrabold tabular-nums">{formatKES(l.quantity * l.unitPrice)}</p>
                  </li>
                ))}
              </ul>
            }
          />
        )}
      </div>
    </dialog>
  );
}
