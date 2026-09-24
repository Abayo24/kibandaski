/**
 * Checkout validation + sanitisation. Runs in the browser today and is
 * framework-free so the same rules can guard a server order API later.
 */

export type Fulfilment = "delivery" | "pickup";

export interface CheckoutInput {
  name: string;
  phone: string;
  fulfilment: Fulfilment;
  location: string;
  notes: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutInput, string>>;

export const LIMITS = { name: 60, phone: 16, location: 120, notes: 300 } as const;

/** Removes control chars / zero-width chars, collapses spaces, trims, and caps length. */
export function sanitizeText(value: string, max: number, { multiline = false } = {}): string {
  let v = value.normalize("NFKC").replace(/[​-‏‪-‮⁠-⁯﻿]/g, "");
  v = multiline
    ? v.replace(/[^\S\n]+/g, " ").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").replace(/\n{3,}/g, "\n\n")
    : v.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ");
  return v.trim().slice(0, max);
}

/** Accepts 07XX / 01XX / +254 / 254 formats. Returns 0XXXXXXXXX or null. */
export function normalizeKenyanPhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "");
  const m = /^(?:\+?254|0)?([17]\d{8})$/.exec(digits);
  return m ? `0${m[1]}` : null;
}

const NAME_RE = /^[\p{L}\p{M}' .-]+$/u;

export function validateCheckout(input: CheckoutInput): { data?: CheckoutInput; errors: CheckoutErrors } {
  const errors: CheckoutErrors = {};
  const name = sanitizeText(input.name, LIMITS.name);
  const location = sanitizeText(input.location, LIMITS.location);
  const notes = sanitizeText(input.notes, LIMITS.notes, { multiline: true });
  const phone = normalizeKenyanPhone(input.phone);
  const fulfilment: Fulfilment = input.fulfilment === "pickup" ? "pickup" : "delivery";

  if (name.length < 2) errors.name = "Please enter your name (at least 2 letters).";
  else if (!NAME_RE.test(name)) errors.name = "Names can only contain letters, spaces, apostrophes and hyphens.";

  if (!phone) errors.phone = "Enter a valid Kenyan number, e.g. 0712 345 678.";

  if (fulfilment === "delivery" && location.length < 3)
    errors.location = "Tell us where to deliver, e.g. Nairobi CBD, Moi Avenue.";

  if (Object.keys(errors).length > 0) return { errors };
  return { data: { name, phone: phone!, fulfilment, location, notes }, errors };
}
