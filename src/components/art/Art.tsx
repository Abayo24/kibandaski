/**
 * Decorative art for Kibandaski: hand-drawn street-food doodles,
 * kitenge-inspired pattern bands, spinning sticker text, steam and waves.
 *
 * Everything here is purely decorative (aria-hidden) and animates only
 * transform / opacity on whole elements, so the browser can run it on the
 * GPU. All motion is switched off by `prefers-reduced-motion`.
 */
import { useId } from "react";

type ArtProps = { className?: string; style?: React.CSSProperties };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---------------- Doodles ---------------- */

export function Chilli({ className = "", style }: ArtProps) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className} style={style}>
      <path d="M44 14c-3 6-6 10-12 15S16 42 12 54c14-2 26-10 32-20 4-7 4-14 0-20Z" fill="var(--color-ember)" stroke="var(--color-cocoa)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38 24c-4 6-9 11-15 16" stroke="var(--color-flame)" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
      <path d="M44 14c1-4 4-7 8-8M44 14c-3-2-3-5-1-7" stroke="var(--color-sukuma)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Leaf({ className = "", style }: ArtProps) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className} style={style}>
      <path d="M10 54C8 30 24 10 54 8c2 28-16 46-44 46Z" fill="var(--color-sukuma)" stroke="var(--color-cocoa)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 52 44 20M22 42l-2-10M30 34l-1-10M22 42l10 1M30 34l10 1" stroke="var(--color-sukuma-100)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Tomato({ className = "", style }: ArtProps) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className} style={style}>
      <circle cx="32" cy="36" r="20" fill="#d9401a" stroke="var(--color-cocoa)" strokeWidth="2.5" />
      <path d="M22 28c3-4 7-5 11-5" stroke="#fff7ec" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
      <path d="M32 17l-5-6 5 3 4-5-1 7 7-2-6 5" fill="var(--color-sukuma)" stroke="var(--color-cocoa)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className = "", style }: ArtProps) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className} style={style}>
      <path d="M20 2c1.5 10 4 13 18 18-14 5-16.5 8-18 18-1.5-10-4-13-18-18 14-5 16.5-8 18-18Z" fill="currentColor" />
    </svg>
  );
}

export function Squiggle({ className = "", style }: ArtProps) {
  return (
    <svg aria-hidden viewBox="0 0 120 30" className={className} style={style}>
      <path d="M4 18c10-12 18-12 24 0s14 12 22 0 16-12 24 0 14 12 22 0 14-10 20-6" {...stroke} strokeWidth="5" />
    </svg>
  );
}

/** Hand-drawn curly arrow; points down-right by default. */
export function CurlyArrow({ className = "", style }: ArtProps) {
  return (
    <svg aria-hidden viewBox="0 0 120 90" className={className} style={style}>
      <path d="M8 12c30-6 58 2 60 22 2 16-22 18-20 4 2-12 28-12 44 6 8 9 12 22 14 36" {...stroke} className="draw-in" pathLength={1} />
      <path d="M94 66l12 16 10-18" {...stroke} />
    </svg>
  );
}

/** Three wavy steam wisps that rise and fade in a loop. */
export function Steam({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none flex items-end gap-[18%] ${className}`}>
      {[0, 1, 2].map((i) => (
        <svg key={i} viewBox="0 0 20 60" className="steam h-full w-[14%] text-cocoa/35" style={{ animationDelay: `${i * 0.9}s` }}>
          <path d="M10 58c-8-8 8-14 0-24S14 12 8 2" {...stroke} strokeWidth="3.5" />
        </svg>
      ))}
    </div>
  );
}

/* ---------------- Stickers ---------------- */

/** Round sticker with text running around the edge; the ring spins slowly.
 *  Pass position + display (e.g. "absolute inset-0 grid") via className. */
export function CircleText({
  text,
  className = "",
  ringClass = "fill-cocoa",
  radius = 78,
  fontSize = 22,
  children,
}: {
  text: string;
  className?: string;
  ringClass?: string;
  /** Baseline radius in a 200×200 box; glyphs sit outside it. */
  radius?: number;
  fontSize?: number;
  children?: React.ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const r = radius;
  const circumference = Math.round(2 * Math.PI * r) - 4;
  return (
    <div aria-hidden className={`place-items-center ${className}`}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full">
        <defs>
          <path id={id} d={`M100 100m-${r} 0a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1-${2 * r} 0`} />
        </defs>
        <text className={`display ${ringClass}`} style={{ fontSize }}>
          <textPath href={`#${id}`} textLength={circumference} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}

/* ---------------- Patterns & dividers ---------------- */

/** Kitenge / kikoi-inspired geometric band. */
export function KitengeBand({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`kitenge h-5 w-full ${className}`} />;
}

/** Soft wave edge used between sections. `flip` puts the wave on the top edge. */
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`block h-6 w-full sm:h-10 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d="M0 60V28c120 22 240 30 360 16S600 0 720 4s240 40 360 42 240-22 360-30v44Z" fill="currentColor" />
    </svg>
  );
}

/** Sun-ray burst that slowly rotates behind content. */
export function Sunburst({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 18 }, (_, i) => i * 20);
  return (
    <svg aria-hidden viewBox="-100 -100 200 200" className={`spin-slower ${className}`}>
      {rays.map((r) => (
        <path key={r} d="M0 0 L-9 -100 L9 -100 Z" transform={`rotate(${r})`} fill="currentColor" />
      ))}
    </svg>
  );
}
