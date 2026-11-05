"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText, EASE, MOTION_OK } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { profile } from "@/lib/data";
import { Arrow, Eyebrow, Pill } from "@/components/ui/primitives";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Magnetic } from "@/components/ui/MagneticButton";

/** oyewalephilip-style hero: portrait top-right, tagline, giant full-bleed lowercase name, role pills. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const box = root.current!.querySelector<HTMLElement>("[data-fit]")!;
      const inner = box.firstElementChild as HTMLElement;

      // Scale the name so its widest line spans the full content width.
      const fit = () => {
        box.style.fontSize = "100px";
        const w = inner.getBoundingClientRect().width;
        if (w) box.style.fontSize = `${(100 * box.clientWidth) / w}px`;
      };
      fit();
      document.fonts.ready.then(fit);
      window.addEventListener("resize", fit);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(inner.children, {
          type: "chars",
          mask: "chars",
        });
        gsap.set(split.chars, { yPercent: 115 });
        gsap.set("[data-hero-fade]", { opacity: 0, y: 24 });
        gsap.set("[data-hero-portrait]", { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set("[data-hero-portrait] > *", { scale: 1.3 });

        const off = onIntroDone(() => {
          gsap
            .timeline({ delay: 0.15 })
            .to(split.chars, {
              yPercent: 0,
              stagger: 0.035,
              duration: 1.4,
              ease: EASE,
            })
            .to(
              "[data-hero-portrait]",
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.4,
                ease: "expo.inOut",
              },
              0.1,
            )
            .to(
              "[data-hero-portrait] > *",
              { scale: 1, duration: 1.8, ease: EASE },
              0.1,
            )
            .to(
              "[data-hero-fade]",
              { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: EASE },
              0.5,
            );
        });

        const scrub = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(box, {
          yPercent: -10,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: scrub,
        });
        gsap.to("[data-hero-portrait]", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: scrub,
        });

        return off;
      });

      return () => window.removeEventListener("resize", fit);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden px-gutter pt-24 pb-6"
    >
      <div className="relative flex flex-1 flex-col justify-between gap-10 md:flex-row md:items-end">
        <div className="order-2 max-w-md md:order-1 md:pb-[2vw]">
          <div data-hero-fade>
            <Eyebrow dot className="mb-4">
              {profile.role} · {profile.location}
            </Eyebrow>
          </div>
          <p
            data-hero-fade
            className="font-display text-xl leading-snug font-medium text-balance md:text-2xl"
          >
            {profile.tagline}
          </p>
        </div>

        <div
          data-hero-portrait
          className="relative order-1 aspect-4/5 w-[min(52vw,340px)] self-end overflow-hidden rounded-md bg-surface md:order-2 md:mr-[10vw] md:w-[min(24vw,380px)] md:self-start"
        >
          {profile.portrait ? (
            <Image
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 768px) 24vw, 52vw"
              className="object-cover grayscale"
            />
          ) : (
            <div
              className="flex h-full w-full items-end p-3"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to top right, transparent calc(50% - 0.5px), rgba(255,255,255,0.08) 50%, transparent calc(50% + 0.5px))",
                backgroundSize: "25% 20%, 25% 20%, 100% 100%",
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Portrait · 4:5
              </span>
            </div>
          )}
        </div>
      </div>

      <h1
        data-fit
        aria-label={profile.name}
        className="relative z-10 mt-6 font-display text-[19vw] leading-[0.82] font-medium tracking-[-0.055em] whitespace-nowrap lowercase sm:text-[11vw]"
      >
        <span
          aria-hidden
          className="inline-flex flex-col sm:flex-row sm:gap-[0.2em]"
        >
          <span>{profile.first}</span>
          <span>{profile.last}</span>
        </span>
      </h1>

      <div className="mt-6 flex items-center justify-between gap-4">
        <ul data-hero-fade className="flex flex-wrap gap-2">
          {profile.roles.map((r) => (
            <li key={r}>
              <Pill>{r}</Pill>
            </li>
          ))}
        </ul>
        <div data-hero-fade className="hidden sm:block">
          <Magnetic>
            <TransitionLink
              href="#about"
              className="flex items-center gap-2 text-sm font-medium"
            >
              Scroll <Arrow dir="se" />
            </TransitionLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
