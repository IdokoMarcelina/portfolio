"use client";

import type Lenis from "lenis";

// Module-level handle so any component can drive the one Lenis instance at event time.
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, duration: 1.4, force: true });
    return;
  }
  const behavior: ScrollBehavior = immediate ? "instant" : "smooth";
  if (typeof target === "number") window.scrollTo({ top: target, behavior });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior });
  }
}
