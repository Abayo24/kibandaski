"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/Icons";

interface Props {
  name: string;
  quantity: number;
  onChange: (q: number) => void;
  size?: "sm" | "md";
  tone?: "maize" | "cream" | "sand";
}

export function QuantityStepper({ name, quantity, onChange, size = "md", tone = "maize" }: Props) {
  const btn = size === "sm" ? "size-10" : "size-11";
  const bg = { maize: "bg-maize", cream: "bg-cream", sand: "bg-sand" }[tone];
  return (
    <div role="group" aria-label={`Quantity of ${name}`} className={`inline-flex items-center rounded-full ${bg} p-0.5 text-cocoa`}>
      <button
        type="button"
        className={`${btn} grid place-items-center rounded-full hover:bg-cocoa hover:text-cream transition-colors`}
        onClick={() => onChange(quantity - 1)}
        aria-label={quantity === 1 ? `Remove ${name}` : `Decrease ${name}`}
      >
        {quantity === 1 ? <TrashIcon className="size-4.5" /> : <MinusIcon className="size-4.5" />}
      </button>
      <span className="min-w-8 text-center text-base font-extrabold tabular-nums" aria-live="off">
        {quantity}
      </span>
      <button
        type="button"
        className={`${btn} grid place-items-center rounded-full hover:bg-cocoa hover:text-cream transition-colors disabled:opacity-40`}
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= 20}
        aria-label={`Increase ${name}`}
      >
        <PlusIcon className="size-4.5" />
      </button>
    </div>
  );
}
