"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { reveal } from "@/lib/transition";
import { scrollToTarget } from "@/lib/scroll";

/**
 * Lifts the route curtain whenever the pathname changes. Keyed on pathname rather than a
 * template remount, because /work/a → /work/b keeps the same top-level segment.
 */
export function RouteReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Only reset scroll after our own transitions, so browser back/forward keeps its position.
    if (reveal()) {
      const hash = window.location.hash;
      scrollToTarget(hash && document.querySelector(hash) ? hash : 0, true);
    }
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
