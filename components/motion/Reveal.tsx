"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText, EASE, MOTION_OK } from "@/lib/gsap";

/**
 * Declarative scroll reveals for server-rendered markup. Mark elements with:
 *  data-reveal="up"      fade + rise
 *  data-reveal="lines"   SplitText line-mask reveal (headings)
 *  data-reveal="line"    hairline draws left → right
 *  data-reveal="stagger" children rise in sequence
 */
export function Reveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = (v: string) => gsap.utils.toArray<HTMLElement>(`[data-reveal="${v}"]`, root.current);
        const st = (trigger: HTMLElement, start = "top 88%") => ({ trigger, start, once: true });

        q("up").forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: EASE, scrollTrigger: st(el) }));

        q("lines").forEach((el) =>
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => {
              // Tight display leading would clip descenders; pad the masks without shifting layout.
              gsap.set(self.masks, { paddingBottom: "0.14em", marginBottom: "-0.14em" });
              return gsap.from(self.lines, { yPercent: 115, stagger: 0.08, duration: 1.3, ease: EASE, scrollTrigger: st(el) });
            },
          }),
        );

        q("line").forEach((el) =>
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: st(el, "top 94%"),
          }),
        );

        q("stagger").forEach((el) =>
          gsap.from(el.children, {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: EASE,
            scrollTrigger: st(el, "top 85%"),
          }),
        );

        // Fonts can shift layout after first measure.
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
