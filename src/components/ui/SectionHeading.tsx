export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] ${className}`}>
      <span aria-hidden className="inline-block h-0.5 w-6 bg-current" />
      {children}
    </p>
  );
}
