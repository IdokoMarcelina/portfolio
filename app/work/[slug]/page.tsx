import { Suspense, type ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, pad, projects } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { Stage } from "@/components/media/Stage";
import { Gallery } from "@/components/work/Gallery";
import { StoreLinks } from "@/components/home/Projects";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Arrow, Eyebrow } from "@/components/ui/primitives";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const data = getProject((await params).slug);
  if (!data) return {};
  return { title: data.project.title, description: `${data.project.tagline}. ${data.project.description}` };
}

// Params are read inside Suspense so the route keeps an instant static shell (the curtain covers the fallback).
export default function Page({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<main className="min-h-svh" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const data = getProject((await params).slug);
  if (!data) notFound();
  const { project: p, index, next, nextIndex } = data;
  const total = pad(projects.length);

  return (
    <main className="px-gutter pt-28 pb-32">
      <Reveal>
        <div data-reveal="up" className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
          <TransitionLink href="/#work" className="group inline-flex items-center gap-2 text-muted hover:text-fg">
            <Arrow className="rotate-180 transition-transform group-hover:-translate-x-1" /> All work
          </TransitionLink>
          <span className="text-muted tabular-nums">
            <span className="text-fg">{pad(index + 1)}</span> / {total}
          </span>
        </div>

        <header className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1
              data-reveal="lines"
              className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-balance"
            >
              {p.title}
            </h1>
            <p data-reveal="up" className="mt-6 font-display text-2xl text-fg/85 md:text-3xl">
              {p.tagline}
            </p>
          </div>
          <p data-reveal="up" className="max-w-md self-end text-pretty text-muted lg:col-span-4">
            {p.description}
          </p>
        </header>

        <dl data-reveal="stagger" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-6 md:grid-cols-4">
          <Meta label="Role">{p.role}</Meta>
          <Meta label="When">
            {p.year} · {p.platforms.join(", ")}
          </Meta>
          <Meta label="Stack">{p.stack.join(", ")}</Meta>
          <Meta label="Links">
            <StoreLinks links={p.links} />
          </Meta>
        </dl>

        <div data-reveal="up" className="mt-16">
          <Stage project={p} className="aspect-[4/3.4] md:aspect-[16/9]" />
        </div>

        <section className="mt-28 space-y-16 md:mt-40">
          <Story n="01" label="Problem" body={p.problem} />
          <Story n="02" label="Approach" body={p.approach} />
        </section>

        <section className="mt-28 md:mt-40">
          <div data-reveal="up" className="mb-12 flex items-end justify-between">
            <Eyebrow>03 — Key screens</Eyebrow>
            <span className="font-mono text-[11px] text-muted">{pad(p.media.length)} screens</span>
          </div>
          <Gallery media={p.media} accent={p.accent} title={p.title} />
        </section>

        <section className="mt-28 md:mt-40">
          <div data-reveal="up" className="mb-10">
            <Eyebrow>04 — Highlights</Eyebrow>
          </div>
          <ul data-reveal="stagger" className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
            {p.highlights.map((h) => (
              <li key={h.label} className="bg-bg p-6 md:p-8">
                <p className="font-display text-[clamp(3rem,6vw,5rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">
                  {h.value}
                </p>
                <p className="mt-3 text-sm text-muted">{h.label}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-28 md:mt-40">
          <div data-reveal="up" className="mb-10">
            <Eyebrow>05 — Decisions</Eyebrow>
          </div>
          <ol>
            {p.decisions.map((d, i) => (
              <li key={d.title} className="relative grid gap-3 py-8 md:grid-cols-12 md:gap-6">
                <span data-reveal="line" aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
                <span data-reveal="up" className="font-mono text-xs text-accent md:col-span-2 md:pt-2">
                  /{pad(i + 1)}
                </span>
                <h3 data-reveal="up" className="font-display text-2xl font-medium tracking-[-0.02em] md:col-span-4 md:text-3xl">
                  {d.title}
                </h3>
                <p data-reveal="up" className="text-pretty text-muted md:col-span-6 md:pt-2">
                  {d.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <TransitionLink
          href={`/work/${next.slug}`}
          data-reveal="up"
          className="group mt-32 block border-t border-border pt-8 md:mt-44"
        >
          <Eyebrow>
            Next project — {pad(nextIndex + 1)} / {total}
          </Eyebrow>
          <span className="mt-6 flex items-end justify-between gap-6">
            <span className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-semibold tracking-[-0.045em] transition-colors duration-500 group-hover:text-accent">
              {next.title}
            </span>
            <Arrow className="mb-[2vw] text-[clamp(2rem,5vw,4rem)] transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </TransitionLink>
      </Reveal>
    </main>
  );
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{label}</dt>
      <dd className="text-sm text-fg/85">{children}</dd>
    </div>
  );
}

function Story({ n, label, body }: { n: string; label: string; body: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-12 md:gap-6">
      <div data-reveal="up" className="md:col-span-4">
        <Eyebrow>
          {n} — {label}
        </Eyebrow>
      </div>
      <p
        data-reveal="lines"
        className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em] text-pretty md:col-span-8"
      >
        {body}
      </p>
    </div>
  );
}
