/**
 * Tiny "fly to cart" flourish: a round thumbnail of the dish arcs from the
 * Add button to the visible cart button, which then bumps. Pure Web
 * Animations API, no library. Skipped entirely for reduced-motion users.
 */
export function flyToCart(from: HTMLElement) {
  if (typeof window === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const target = [...document.querySelectorAll<HTMLElement>("[data-cart-target]")].find((el) => el.getClientRects().length > 0);
  if (!target) return;

  const img = from.closest("article, li")?.querySelector("img");
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const size = 56;

  const dot = document.createElement("div");
  dot.setAttribute("aria-hidden", "true");
  Object.assign(dot.style, {
    position: "fixed",
    left: `${a.left + a.width / 2 - size / 2}px`,
    top: `${a.top + a.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "9999px",
    zIndex: "60",
    pointerEvents: "none",
    background: img?.currentSrc ? `center / cover url("${img.currentSrc}")` : "var(--color-maize)",
    boxShadow: "0 0 0 3px var(--color-cream), 0 8px 20px rgb(43 22 12 / .35)",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(dot);

  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const lift = Math.min(160, Math.abs(dy) * 0.4 + 60);

  const anim = dot.animate(
    [
      { transform: "translate(0,0) scale(0.6)", opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - lift}px) scale(1)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.25)`, opacity: 0.7 },
    ],
    { duration: 700, easing: "cubic-bezier(.45,.05,.35,1)" },
  );
  anim.onfinish = () => {
    dot.remove();
    target.classList.remove("bump");
    void target.offsetWidth; // restart the CSS animation
    target.classList.add("bump");
  };
}
