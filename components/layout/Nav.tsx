"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { nav, profile, socials } from "@/lib/data";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Arrow } from "@/components/ui/primitives";

export function Nav() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(overlay.current, { visibility: "visible" })
        .fromTo(
          overlay.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" },
        )
        .from(
          "[data-menu-link]",
          { yPercent: 110, stagger: 0.07, duration: 0.9, ease: EASE },
          "-=0.4",
        )
        .from(
          "[data-menu-meta]",
          { opacity: 0, y: 12, stagger: 0.05, duration: 0.5 },
          "-=0.6",
        );
    },
    { scope: overlay },
  );

  useEffect(() => {
    if (open) {
      tl.current?.timeScale(1).play();
      getLenis()?.stop();
    } else {
      tl.current?.timeScale(1.6).reverse();
      getLenis()?.start();
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Flat black navbar */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-bg px-gutter h-16 border-b border-border">
        {/* Logo: orange square + name */}
        <TransitionLink
          href="/"
          onBeforeNavigate={close}
          aria-label={`${profile.name}, home`}
          className="flex items-center gap-2.5"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-sm text-[10px] font-bold text-white"
            style={{ backgroundColor: "#EE5021" }}
            aria-hidden
          >
            M
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
            Marcelina
          </span>
        </TransitionLink>

        {/* Hamburger — plain two-line, no circle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 cursor-pointer flex-col items-end justify-center gap-[6px]"
        >
          <span
            className={clsx(
              "block h-px bg-fg transition-all duration-500 origin-center",
              open ? "w-6 rotate-45 translate-y-[7px]" : "w-6",
            )}
          />
          <span
            className={clsx(
              "block h-px bg-fg transition-all duration-500 origin-center",
              open ? "w-6 -rotate-45 -translate-y-[7px]" : "w-4",
            )}
          />
        </button>
      </header>

      {/* Full-screen overlay menu */}
      <div
        ref={overlay}
        id="site-menu"
        aria-hidden={!open}
        inert={!open}
        className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-surface px-gutter pt-24 pb-10"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav aria-label="Menu">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.n} className="overflow-hidden border-b border-border py-2">
                <TransitionLink
                  data-menu-link
                  href={item.href}
                  onBeforeNavigate={close}
                  className="group flex items-center justify-between font-display text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[1] tracking-[-0.04em] text-fg transition-colors hover:text-accent"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-sm text-muted group-hover:text-accent">{item.n}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div data-menu-meta className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6 text-sm">
          <CopyEmail email={profile.email} />
          <ul className="flex flex-wrap gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
                >
                  {s.label} <Arrow className="text-[10px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
