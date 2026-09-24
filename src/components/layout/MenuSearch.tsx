"use client";

import Image from "next/image";
import { useCallback, useDeferredValue, useId, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { AddToOrder } from "@/components/menu/AddToOrder";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { useDialog } from "@/components/ui/useDialog";
import { formatKES } from "@/lib/format";

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function MenuSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { catalog } = useCart();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const handleClose = useCallback(() => onClose(), [onClose]);
  const ref = useDialog(open, handleClose);
  const inputId = useId();

  const results = useMemo(() => {
    const q = normalize(deferred.trim().slice(0, 50));
    if (!q) return [];
    return catalog.filter((i) => normalize(`${i.name} ${i.description} ${i.category}`).includes(q)).slice(0, 8);
  }, [catalog, deferred]);

  return (
    <dialog ref={ref} className="sheet from-top" aria-label="Search the menu">
      <div className="container-page max-w-3xl py-4">
        <div className="flex items-center gap-2">
          <label htmlFor={inputId} className="sr-only">
            Search dishes
          </label>
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-cocoa-500" />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “pilau”, “chicken” or “chai”"
              maxLength={50}
              autoFocus
              autoComplete="off"
              className="min-h-13 w-full rounded-full border-2 border-sand-deep bg-white pl-12 pr-4 text-base"
            />
          </div>
          <button type="button" onClick={() => ref.current?.close()} className="grid size-12 place-items-center rounded-full hover:bg-sand" aria-label="Close search">
            <CloseIcon />
          </button>
        </div>

        <div aria-live="polite" className="mt-4 max-h-[70dvh] overflow-y-auto">
          {deferred.trim() && results.length === 0 && (
            <p className="px-2 py-6 text-center text-cocoa-700">No dishes match “{deferred.trim()}”. Try another word.</p>
          )}
          {results.length > 0 && (
            <ul className="space-y-2" aria-label={`${results.length} matching dishes`}>
              {results.map((i) => (
                <li key={i.id} className="flex items-center gap-3 rounded-3xl bg-sand p-2 pr-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl">
                    <Image src={i.image.src} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{i.name}</p>
                    <p className="text-sm font-bold text-ember">{formatKES(i.price)}</p>
                  </div>
                  <AddToOrder id={i.id} name={i.name} available={i.available} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </dialog>
  );
}
