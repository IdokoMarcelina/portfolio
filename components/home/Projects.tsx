"use client";

import { useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { pad, projects, type Project } from "@/lib/data";
import { Arrow, Eyebrow, SectionTitle } from "@/components/ui/primitives";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Stage } from "@/components/media/Stage";

const PIN = `(min-width: 1024px) and ${MOTION_OK}`;

/**
 * Three full-viewport project chapters. On desktop the section pins and scrubs chapter → chapter;
 * on mobile (or reduced motion) chapters simply stack.
 */
export function Projects() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]");
      const n = chapters.length;

      mm.add(PIN, () => {
        setPinned(true);
        const sel = (c: HTMLElement, s: string) => c.querySelectorAll(`[data-ch-${s}]`);

        chapters.forEach((c, i) => {
          if (!i) return;
          gsap.set(sel(c, "text"), { yPercent: 110 });
          gsap.set(sel(c, "stage"), { yPercent: 105 });
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "top top",
            end: () => `+=${(n - 1) * window.innerHeight * 1.3}`,
            pin: true,
            scrub: 1,
            snap: { snapTo: "labels", duration: { min: 0.3, max: 0.8 }, ease: "power2.inOut" },
            onUpdate: (self) => {
              setActive(Math.round(self.progress * (n - 1)));
              gsap.set("[data-progress]", { scaleX: self.progress });
            },
          },
        });

        tl.addLabel("c0");
        for (let i = 1; i < n; i++) {
          const prev = chapters[i - 1];
          const cur = chapters[i];
          const at = `c${i - 1}+=0.1`;
          tl.to(sel(prev, "text"), { yPercent: -110, stagger: 0.02, duration: 0.35, ease: "power2.in" }, at)
            .to(sel(prev, "phone"), { yPercent: -18, rotate: -5, duration: 1 }, at)
            .to(sel(cur, "stage"), { yPercent: 0, duration: 1 }, at)
            .from(sel(cur, "phone"), { yPercent: 45, rotate: 6, duration: 1 }, at);
          const desktop = sel(cur, "desktop");
          if (desktop.length) tl.from(desktop, { yPercent: 18, duration: 1 }, at);
          tl.to(sel(cur, "text"), { yPercent: 0, stagger: 0.04, duration: 0.6, ease: "power2.out" }, `${at}+=0.5`)
            .addLabel(`c${i}`);
        }

        return () => setPinned(false);
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        chapters.forEach((c) =>
          gsap.from(c.querySelectorAll("[data-ch-stage], [data-ch-text]"), {
            y: 50,
            opacity: 0,
            stagger: 0.06,
            duration: 1.1,
            ease: EASE,
            scrollTrigger: { trigger: c, start: "top 80%", once: true },
          }),
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="pt-12 md:pt-24">
      <div className="px-gutter">
        <SectionTitle
          eyebrow="002 / work"
          title="Projects"
          aside="Four projects, web to mobile. Each one has a full case study."
        />
      </div>

      <div data-pin className="relative px-gutter lg:h-svh lg:overflow-hidden">
        {/* Pinned chrome: rolling counter + progress */}
        <div className="pointer-events-none absolute top-24 left-gutter z-20 hidden items-center gap-4 font-mono text-xs text-muted lg:motion-safe:flex">
          <span className="inline-flex h-[1.2em] overflow-hidden text-fg">
            <span
              className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateY(-${active * 1.2}em)` }}
            >
              {projects.map((_, i) => (
                <span key={i} className="h-[1.2em] leading-[1.2em]">
                  {pad(i + 1)}
                </span>
              ))}
            </span>
          </span>
          <span>/ {pad(projects.length)}</span>
          <span className="h-px w-24 bg-border">
            <span data-progress className="block h-full origin-left scale-x-0 bg-accent" />
          </span>
        </div>

        <div className="relative flex flex-col gap-24 lg:motion-safe:block lg:motion-safe:h-full">
          {projects.map((p, i) => (
            <Chapter key={p.slug} project={p} index={i} playing={!pinned || active === i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter({ project: p, index, playing }: { project: Project; index: number; playing: boolean }) {
  return (
    <article
      data-chapter
      className={clsx(
        "grid items-center gap-8 lg:grid-cols-12 lg:gap-10",
        "lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:pt-20 lg:motion-safe:pb-8",
      )}
      style={{ zIndex: index }}
    >
      <div className="order-2 lg:order-1 lg:col-span-5">
        <Mask className="mb-6">
          <Eyebrow>
            {pad(index + 1)} — {p.year} · {p.platforms.join(" / ")}
          </Eyebrow>
        </Mask>
        <Mask>
          <h3 className="font-display text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.045em]">
            {p.title}
          </h3>
        </Mask>
        <Mask className="mt-4">
          <p className="font-display text-xl text-fg/80 md:text-2xl">{p.tagline}</p>
        </Mask>
        <Mask className="mt-5">
          <p className="max-w-md text-pretty text-muted">{p.description}</p>
        </Mask>
        <Mask className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-border-strong px-3 py-1 text-xs text-fg/80">
                {s}
              </li>
            ))}
          </ul>
        </Mask>
        <Mask className="mt-8">
          <div className="flex flex-wrap items-center gap-5 pb-1">
            <TransitionLink
              href={`/work/${p.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent"
            >
              Read case study <Arrow className="transition-transform group-hover:rotate-45" />
            </TransitionLink>
            <StoreLinks links={p.links} />
          </div>
        </Mask>
      </div>

      <Stage
        project={p}
        playing={playing}
        className="order-1 aspect-[4/3.4] lg:order-2 lg:col-span-7 lg:motion-safe:aspect-auto lg:motion-safe:h-full lg:motion-safe:max-h-[78svh]"
      />
    </article>
  );
}

// Spacing is margin on the mask (outside its clip box), so a ±110% slide fully hides the content.
function Mask({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("overflow-hidden", className)}>
      <div data-ch-text>{children}</div>
    </div>
  );
}

export function StoreLinks({ links }: { links: Project["links"] }) {
  const items = [
    ["App Store", links.appStore],
    ["Google Play", links.playStore],
    ["Live", links.live],
    ["GitHub", links.github],
  ].filter(([, href]) => href) as [string, string][];
  return (
    <ul className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.14em]">
      {items.map(([label, href]) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
          >
            {label} <Arrow className="text-[10px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
