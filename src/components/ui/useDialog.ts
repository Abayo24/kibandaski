"use client";

import { useEffect, useRef } from "react";

/** Syncs a native <dialog> (focus trap, Esc, inert background for free) with React state. */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const handleClose = () => onClose();
    const handleClick = (e: MouseEvent) => {
      if (e.target === d) d.close(); // backdrop click
    };
    d.addEventListener("close", handleClose);
    d.addEventListener("click", handleClick);
    return () => {
      d.removeEventListener("close", handleClose);
      d.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return ref;
}
