"use client";

import { gsap } from "./gsap";

// Curtain wipe between routes: cover() before router.push, reveal() once the pathname changes.
let curtain: HTMLElement | null = null;
let pending = false;
let failsafe: ReturnType<typeof setTimeout> | undefined;

export const setCurtain = (el: HTMLElement | null) => {
  curtain = el;
};

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function cover(then: () => void) {
  if (!curtain || reduced()) return then();
  pending = true;
  gsap.killTweensOf(curtain);
  gsap.fromTo(
    curtain,
    { yPercent: 100, visibility: "visible" },
    {
      yPercent: 0,
      duration: 0.65,
      ease: "expo.inOut",
      onComplete: () => {
        then();
        // Never leave the page covered if the navigation stalls or lands on the same path.
        clearTimeout(failsafe);
        failsafe = setTimeout(reveal, 3000);
      },
    },
  );
}

/** Lifts the curtain if a transition is in flight. Returns whether one was. */
export function reveal() {
  clearTimeout(failsafe);
  if (!curtain || !pending) return false;
  pending = false;
  gsap.killTweensOf(curtain);
  gsap.to(curtain, {
    yPercent: -100,
    duration: 0.9,
    delay: 0.1,
    ease: "expo.inOut",
    onComplete: () => gsap.set(curtain, { visibility: "hidden" }),
  });
  return true;
}
