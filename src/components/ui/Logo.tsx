import Link from "next/link";

/** Kibandaski mark: a striped kibanda awning over a bowl. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable={false}>
      <rect width="40" height="40" rx="12" fill="var(--color-ember)" />
      <path d="M7 15 10 9h20l3 6H7Z" fill="var(--color-maize)" />
      <path d="M13.5 9 12 15M20 9v6M26.5 9l1.5 6" stroke="var(--color-ember)" strokeWidth="2.2" />
      <path d="M9 21h22a11 11 0 0 1-22 0Z" fill="var(--color-cream)" />
      <path d="M16 18.5c0-1 1-1.4 1-2.4M21 18.5c0-1 1-1.4 1-2.4" stroke="var(--color-cream)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-2 rounded-xl ${className}`}
      aria-label="Kibandaski — home"
    >
      <LogoMark className="size-8 shrink-0 sm:size-9" />
      <span className={`display text-[1.4rem] normal-case min-[380px]:text-[1.6rem] tracking-tight ${tone === "dark" ? "text-ember" : "text-maize"}`}>
        Kibandaski
      </span>
    </Link>
  );
}
