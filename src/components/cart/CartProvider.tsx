"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { MenuItem } from "@/types/domain";
import type { OrderLine } from "@/lib/ordering/whatsapp";

export type CatalogItem = Pick<MenuItem, "id" | "name" | "price" | "image" | "available" | "category" | "description">;

export interface CartLine extends OrderLine {
  id: string;
  image: CatalogItem["image"];
}

type Quantities = Record<string, number>;
type Action =
  | { type: "hydrate"; state: Quantities }
  | { type: "set"; id: string; quantity: number }
  | { type: "clear" };

const MAX_QTY = 20;
const STORAGE_KEY = "kibandaski:cart:v1";

function reducer(state: Quantities, action: Action): Quantities {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "set": {
      const next = { ...state };
      const q = Math.min(MAX_QTY, Math.max(0, Math.floor(action.quantity)));
      if (q === 0) delete next[action.id];
      else next[action.id] = q;
      return next;
    }
    case "clear":
      return {};
  }
}

interface CartContextValue {
  catalog: CatalogItem[];
  lines: CartLine[];
  count: number;
  total: number;
  quantityOf: (id: string) => number;
  add: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  announce: (message: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ catalog, children }: { catalog: CatalogItem[]; children: React.ReactNode }) {
  const [quantities, dispatch] = useReducer(reducer, {});
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const hydrated = useRef(false);

  const byId = useMemo(() => new Map(catalog.map((i) => [i.id, i])), [catalog]);

  // Restore saved cart (browser-only convenience; only ids + quantities are stored).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        const clean: Quantities = {};
        if (parsed && typeof parsed === "object") {
          for (const [id, q] of Object.entries(parsed as Record<string, unknown>)) {
            const item = byId.get(id);
            if (item?.available && typeof q === "number" && q > 0) clean[id] = Math.min(MAX_QTY, Math.floor(q));
          }
        }
        dispatch({ type: "hydrate", state: clean });
      }
    } catch {
      /* storage unavailable — start empty */
    }
    hydrated.current = true;
  }, [byId]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      /* ignore */
    }
  }, [quantities]);

  const announce = useCallback((m: string) => {
    setMessage("");
    requestAnimationFrame(() => setMessage(m));
  }, []);

  const setQuantity = useCallback(
    (id: string, quantity: number) => {
      const item = byId.get(id);
      if (!item || !item.available) return;
      dispatch({ type: "set", id, quantity });
      announce(quantity > 0 ? `${item.name}: ${Math.min(quantity, MAX_QTY)} in your order` : `${item.name} removed from your order`);
    },
    [byId, announce],
  );

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = Object.entries(quantities).flatMap(([id, quantity]) => {
      const item = byId.get(id);
      return item ? [{ id, name: item.name, unitPrice: item.price, quantity, image: item.image }] : [];
    });
    return {
      catalog,
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      total: lines.reduce((n, l) => n + l.quantity * l.unitPrice, 0),
      quantityOf: (id) => quantities[id] ?? 0,
      add: (id) => setQuantity(id, (quantities[id] ?? 0) + 1),
      setQuantity,
      remove: (id) => setQuantity(id, 0),
      clear: () => dispatch({ type: "clear" }),
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      announce,
    };
  }, [quantities, byId, catalog, isOpen, setQuantity, announce]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {message}
      </p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
