/** Shared button styles so links and buttons look identical. */
type Variant = "primary" | "ember" | "outline" | "outline-light" | "whatsapp" | "ghost" | "cream";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-maize text-cocoa hover:bg-maize-300 shadow-[0_3px_0_0_var(--color-cocoa)] active:shadow-none active:translate-y-[3px]",
  ember: "bg-ember text-cream hover:bg-ember-700 shadow-[0_3px_0_0_var(--color-cocoa)] active:shadow-none active:translate-y-[3px]",
  whatsapp: "bg-whatsapp text-white hover:bg-[#186540] shadow-[0_3px_0_0_var(--color-cocoa)] active:shadow-none active:translate-y-[3px]",
  outline: "border-2 border-cocoa text-cocoa hover:bg-cocoa hover:text-cream",
  "outline-light": "border-2 border-cream text-cream hover:bg-cream hover:text-cocoa",
  cream: "bg-cream text-cocoa hover:bg-sand",
  ghost: "text-cocoa hover:bg-sand",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-[0.95rem]",
  lg: "min-h-14 px-7 text-base sm:text-lg",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wide",
    "transition-[background-color,color,transform,box-shadow] duration-150 select-none",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    extra,
  ].join(" ");
}
