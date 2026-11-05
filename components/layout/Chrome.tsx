"use client";

import { setCurtain } from "@/lib/transition";

/** Route-transition curtain. */
export function Curtain() {
  return (
    <div
      ref={setCurtain}
      aria-hidden
      className="invisible fixed inset-0 z-90 flex items-end bg-surface p-gutter"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        Loading —
      </span>
    </div>
  );
}

/** Fixed hairline grid behind everything (timothymaarv). */
export function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage:
          "radial-gradient(ellipse at 50% 30%, black 20%, transparent 80%)",
      }}
    />
  );
}
