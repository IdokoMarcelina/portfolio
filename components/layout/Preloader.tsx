"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { finishIntro, INTRO_KEY } from "@/lib/intro";
import { profile } from "@/lib/data";


export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      let seen = false;
      try {
        seen = !!sessionStorage.getItem(INTRO_KEY);
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}

      if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.style.display = "none";
        finishIntro();
        return;
      }

      const html = document.documentElement;
      html.style.overflow = "hidden";
      const count = el.querySelector<HTMLElement>("[data-count]")!;
      const counter = { v: 0 };
      const done = () => {
        el.style.display = "none";
        html.style.overflow = "";
      };

      gsap
        .timeline({ onComplete: done })
        .from("[data-pl-char]", { yPercent: 110, stagger: 0.035, duration: 1.1, ease: EASE })
        .from("[data-pl-meta]", { opacity: 0, y: 10, stagger: 0.1, duration: 0.6 }, 0.2)
        .to(
          counter,
          {
            v: 100,
            duration: 1.8,
            ease: "power3.inOut",
            onUpdate: () => {
              count.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0,
        )
        .to("[data-pl-inner]", { yPercent: -12, opacity: 0, duration: 0.6, ease: "power2.in" })
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut", onStart: finishIntro }, "-=0.25");

      return () => {
        html.style.overflow = "";
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-preloader
      aria-hidden
      className="fixed inset-0 z-[100] bg-bg"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div data-pl-inner className="flex h-full flex-col justify-between p-gutter">
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span data-pl-meta>{profile.role}</span>
          <span data-pl-meta>Portfolio ©{profile.year}</span>
        </div>
        <p className="font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-none tracking-[-0.045em]">
          {profile.name.split("").map((c, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span data-pl-char className="inline-block whitespace-pre">
                {c}
              </span>
            </span>
          ))}
        </p>
        <div className="flex items-end justify-between">
          <span data-pl-meta className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Loading
          </span>
          <span data-count className="font-mono text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight tabular-nums">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
