"use client";

import { useId, useRef, useState } from "react";
import { mainBranch, site } from "@/config/site";
import { formatKES } from "@/lib/format";
import { LIMITS, validateCheckout, type CheckoutErrors, type CheckoutInput, type Fulfilment } from "@/lib/ordering/validation";
import { buildOrderMessage, whatsappLink, type OrderLine } from "@/lib/ordering/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/button";

interface Props {
  lines: OrderLine[];
  total: number;
  itemList: React.ReactNode;
  onSent: (url: string) => void;
}

const FIELD_ORDER: (keyof CheckoutInput)[] = ["name", "phone", "location", "notes"];

export function WhatsAppCheckout({ lines, total, itemList, onSent }: Props) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [fulfilment, setFulfilment] = useState<Fulfilment>("delivery");
  const [notesLength, setNotesLength] = useState(0);
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const id = (f: string) => `${uid}-${f}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const input: CheckoutInput = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      fulfilment,
      location: String(fd.get("location") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    };
    const { data, errors: errs } = validateCheckout(input);
    setErrors(errs);
    if (!data) {
      const first = FIELD_ORDER.find((f) => errs[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const url = whatsappLink(mainBranch.whatsapp, buildOrderMessage(lines, data, site.name));
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url; // popup blocked → same tab
    onSent(url);
  }

  const inputCls = (err?: string) =>
    `mt-1.5 block w-full rounded-2xl border-2 bg-white px-4 py-3 text-base text-cocoa placeholder:text-cocoa-500/80 transition-colors focus:border-ember ${
      err ? "border-ember" : "border-sand-deep"
    }`;

  const ErrorText = ({ field }: { field: keyof CheckoutInput }) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-ember">
        <span aria-hidden className="font-black">!</span>
        {errors[field]}
      </p>
    ) : null;

  const aria = (field: keyof CheckoutInput, hint?: string) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": [errors[field] && id(`${field}-error`), hint].filter(Boolean).join(" ") || undefined,
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
        {itemList}

        <fieldset className="mt-4 space-y-4 rounded-4xl bg-sand p-4 sm:p-5">
          <legend className="sr-only">Your details</legend>
          <p className="display text-2xl text-ember" aria-hidden>
            Your details
          </p>
          <p className="-mt-2 text-sm text-cocoa-700">No account needed. We only use these to deliver your food.</p>

          <div>
            <label htmlFor={id("name")} className="font-bold">
              Name <span className="font-normal text-cocoa-500">(required)</span>
            </label>
            <input id={id("name")} name="name" type="text" autoComplete="name" required maxLength={LIMITS.name} className={inputCls(errors.name)} {...aria("name")} />
            <ErrorText field="name" />
          </div>

          <div>
            <label htmlFor={id("phone")} className="font-bold">
              Phone number <span className="font-normal text-cocoa-500">(required)</span>
            </label>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              maxLength={LIMITS.phone}
              placeholder="0712 345 678"
              className={inputCls(errors.phone)}
              {...aria("phone")}
            />
            <ErrorText field="phone" />
          </div>

          <fieldset>
            <legend className="font-bold">How do you want it?</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["delivery", "pickup"] as const).map((f) => (
                <label
                  key={f}
                  className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-sand-deep bg-white px-3 font-bold has-checked:border-cocoa has-checked:bg-cocoa has-checked:text-cream has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-cocoa"
                >
                  <input type="radio" name="fulfilment" value={f} checked={fulfilment === f} onChange={() => setFulfilment(f)} className="sr-only" />
                  <span aria-hidden className="grid size-4 place-items-center rounded-full border-2 border-current">
                    {fulfilment === f && <span className="size-1.5 rounded-full bg-current" />}
                  </span>
                  {f === "delivery" ? "Delivery" : "Pick up"}
                </label>
              ))}
            </div>
          </fieldset>

          {fulfilment === "delivery" && (
            <div>
              <label htmlFor={id("location")} className="font-bold">
                Delivery location <span className="font-normal text-cocoa-500">(required)</span>
              </label>
              <input
                id={id("location")}
                name="location"
                type="text"
                autoComplete="street-address"
                required
                maxLength={LIMITS.location}
                placeholder="e.g. Nairobi CBD, Moi Avenue"
                className={inputCls(errors.location)}
                {...aria("location", id("location-hint"))}
              />
              <p id={id("location-hint")} className="mt-1 text-sm text-cocoa-500">
                Add a landmark or building to help the rider find you.
              </p>
              <ErrorText field="location" />
            </div>
          )}

          <div>
            <label htmlFor={id("notes")} className="font-bold">
              Order notes <span className="font-normal text-cocoa-500">(optional)</span>
            </label>
            <textarea
              id={id("notes")}
              name="notes"
              rows={3}
              maxLength={LIMITS.notes}
              placeholder="e.g. Please make the chicken spicy."
              onChange={(e) => setNotesLength(e.target.value.length)}
              className={`${inputCls()} resize-y`}
              aria-describedby={id("notes-count")}
            />
            <p id={id("notes-count")} className="mt-1 text-right text-sm text-cocoa-500">
              {notesLength}/{LIMITS.notes}
            </p>
          </div>
        </fieldset>
      </div>

      <footer className="border-t-2 border-sand bg-cream px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-bold tabular-nums">{formatKES(total)}</dd>
          </div>
          <div className="flex justify-between text-cocoa-500">
            <dt>Delivery</dt>
            <dd>{fulfilment === "pickup" ? "Free (pick up)" : "Confirmed on WhatsApp"}</dd>
          </div>
          <div className="flex items-baseline justify-between pt-1 text-lg">
            <dt className="font-bold">Total</dt>
            <dd className="text-2xl font-extrabold tabular-nums text-ember">{formatKES(total)}</dd>
          </div>
        </dl>
        <button type="submit" className={buttonClass("whatsapp", "lg", "mt-3 w-full")}>
          <WhatsAppIcon className="size-6" />
          Order via WhatsApp
        </button>
        <p className="mt-2 text-center text-sm text-cocoa-500">Opens WhatsApp with your order ready to send to {mainBranch.phoneDisplay}.</p>
      </footer>
    </form>
  );
}
