import clsx from "clsx";
import type { ReactNode } from "react";

export function Eyebrow({ children, className, dot }: { children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <p
      className={clsx(
        "flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted",
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-accent" aria-hidden />}
      {children}
    </p>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-fg/40 px-3 py-1 text-[12px] leading-none text-fg/90",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Arrow({ className, dir = "ne" }: { className?: string; dir?: "ne" | "e" | "se" | "up" }) {
  const rotate = { ne: "-rotate-45", e: "", se: "rotate-45", up: "-rotate-90" }[dir];
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={clsx("size-[1em]", rotate, className)}>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function SectionTitle({ eyebrow, title, aside }: { eyebrow: string; title: string; aside?: ReactNode }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-20">
      <div>
        <div data-reveal="up">
          <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        </div>
        <h2
          data-reveal="lines"
          className="font-display text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-balance"
        >
          {title}
        </h2>
      </div>
      {aside && (
        <div data-reveal="up" className="max-w-xs text-sm text-muted">
          {aside}
        </div>
      )}
    </div>
  );
}
