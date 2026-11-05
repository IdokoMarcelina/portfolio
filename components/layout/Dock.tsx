"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, EASE } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { scrollToTarget } from "@/lib/scroll";
import { profile } from "@/lib/data";
import { Arrow } from "@/components/ui/primitives";

/** nanaamoako-style floating pill dock + a round back-to-top button. */
export function Dock() {
  const dock = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    gsap.set(dock.current, { yPercent: 160 });
    const off = onIntroDone(() =>
      gsap.to(dock.current, { yPercent: 0, duration: 1.1, delay: 0.9, ease: EASE }),
    );

    gsap.set(top.current, { autoAlpha: 0, scale: 0.6 });
    ScrollTrigger.create({
      start: () => window.innerHeight,
      onToggle: ({ isActive }) =>
        gsap.to(top.current, { autoAlpha: isActive ? 1 : 0, scale: isActive ? 1 : 0.6, duration: 0.4, ease: "back.out(2)" }),
    });
    return off;
  });

  return (
    <>
      <div
        ref={dock}
        className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex justify-center px-gutter sm:bottom-6"
      >
        <div className="flex items-center gap-1 rounded-full border border-border-strong bg-surface/80 p-1 text-[13px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <span className="hidden items-center gap-2 pr-2 pl-3 font-display font-semibold uppercase tracking-tight sm:flex">
            <span className="grid size-5 place-items-center rounded-full bg-fg text-[9px] text-bg">IM</span>
            {profile.name}
          </span>
          {profile.available && (
            <span className="flex items-center gap-2 border-border-strong px-3 text-fg/80 sm:border-l">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              Available
            </span>
          )}
          <a
            href={profile.calendar}
            className="flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 font-medium text-bg transition-colors hover:bg-accent"
          >
            Hire me
          </a>
          {profile.cv && (
            <a
              href={profile.cv}
              download
              className="flex items-center gap-1 rounded-full px-3 py-2 text-fg/80 transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <Arrow dir="se" className="text-[11px]" /> CV
            </a>
          )}
        </div>
      </div>

      <button
        ref={top}
        type="button"
        aria-label="Back to top"
        onClick={() => scrollToTarget(0)}
        className="fixed right-gutter bottom-4 z-30 hidden size-11 place-items-center rounded-full border border-border-strong bg-surface/80 backdrop-blur-xl transition-colors hover:border-fg/40 sm:bottom-6 sm:grid"
      >
        <Arrow dir="up" className="text-sm" />
      </button>
    </>
  );
}
