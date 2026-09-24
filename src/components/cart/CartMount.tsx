"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

/** Mounts the cart drawer the first time it's opened (keeps checkout JS out of the first load). */
export function CartMount() {
  const { isOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);
  return mounted ? <CartDrawer /> : null;
}
