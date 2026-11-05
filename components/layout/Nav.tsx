"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { nav, profile, socials } from "@/lib/data";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Magnetic } from "@/components/ui/MagneticButton";
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
          { clipPath: "circle(0% at calc(100% - 44px) 44px)" },
          {
            clipPath: "circle(150% at calc(100% - 44px) 44px)",
            duration: 0.9,
            ease: "expo.inOut",
          },
        )
        .from(
          "[data-menu-link]",
          { yPercent: 110, stagger: 0.06, duration: 0.9, ease: EASE },
          "-=0.45",
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-gutter pt-5">
        <TransitionLink
          href="/"
          onBeforeNavigate={close}
          aria-label={`${profile.name}, home`}
          className="pointer-events-auto flex flex-row gap-2 font-display text-[15px] font-semibold leading-[1.05] mix-blend-difference"
        >
          <span>I</span>
          <span>/</span>
          <span>M</span>
        </TransitionLink>

        <div className="pointer-events-auto flex items-center gap-8">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 mix-blend-difference md:flex"
          >
            {nav.map((item) => (
              <TransitionLink
                key={item.n}
                href={item.href}
                className="group flex items-baseline gap-1.5 text-[13px] text-fg/80 transition-colors hover:text-fg"
              >
                <span className="font-mono text-[10px] text-muted transition-colors group-hover:text-accent">
                  {item.n}
                </span>
                {item.label}
              </TransitionLink>
            ))}
          </nav>
          <Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-12 place-items-center cursor-pointer rounded-full bg-fg text-bg transition-transform active:scale-95"
            >
              <span
                className={clsx(
                  "absolute h-px w-5 bg-current transition-transform duration-500",
                  open ? "rotate-45" : "-translate-y-0.75",
                )}
              />
              <span
                className={clsx(
                  "absolute h-px w-5 bg-current transition-transform duration-500",
                  open ? "-rotate-45" : "translate-y-0.75",
                )}
              />
            </button>
          </Magnetic>
        </div>
      </header>

      <div
        ref={overlay}
        id="site-menu"
        aria-hidden={!open}
        inert={!open}
        className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-surface p-gutter pt-28"
      >
        <nav aria-label="Menu">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.n} className="overflow-hidden">
                <TransitionLink
                  data-menu-link
                  href={item.href}
                  onBeforeNavigate={close}
                  className="group flex items-start gap-4 font-display text-[clamp(3rem,11vw,9rem)] font-medium leading-[0.95] tracking-[-0.045em]"
                >
                  <span className="mt-[0.5em] font-mono text-xs tracking-normal text-muted transition-colors group-hover:text-accent">
                    {item.n}
                  </span>
                  <span className="transition-transform duration-500 group-hover:translate-x-3 group-hover:underline">
                    {item.label}
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6 text-sm">
          <div data-menu-meta>
            <CopyEmail email={profile.email} />
          </div>
          <ul className="flex flex-wrap gap-5">
            {socials.map((s) => (
              <li key={s.label} data-menu-meta>
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
