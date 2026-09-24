import { formatKES } from "@/lib/format";
import type { CheckoutInput } from "./validation";

export interface OrderLine {
  name: string;
  quantity: number;
  unitPrice: number;
}

export function orderTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);
}

/** Builds the plain-text order message. Inputs must already be validated. */
export function buildOrderMessage(lines: OrderLine[], customer: CheckoutInput, restaurant = "Kibandaski"): string {
  const items = lines.map((l) => `${l.quantity}x ${l.name} - ${formatKES(l.quantity * l.unitPrice)}`);
  const parts = [
    `Hello ${restaurant},`,
    "I would like to place an order:",
    "",
    ...items,
    "",
    `Total: ${formatKES(orderTotal(lines))}`,
    "",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    customer.fulfilment === "pickup" ? "Pickup: I'll collect from the restaurant" : `Location: ${customer.location}`,
  ];
  if (customer.notes) parts.push("", "Order notes:", customer.notes);
  return parts.join("\n");
}

/** wa.me deep link. `number` must be digits only in international format. */
export function whatsappLink(number: string, message?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
