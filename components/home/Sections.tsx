import {
  education,
  pad,
  profile,
  skills,
  socials,
} from "@/lib/data";
import { Arrow, Eyebrow, SectionTitle } from "@/components/ui/primitives";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Magnetic } from "@/components/ui/MagneticButton";

export function Skills() {
  return (
    <section id="skills" className="px-gutter py-28 md:py-44">
      <SectionTitle
        eyebrow="Capabilities"
        title="Skills"
        aside="The tools I reach for, from first prototype to store release."
      />
      <ol>
        {skills.map((s, i) => (
          <li
            key={s.title}
            className="relative grid gap-3 py-6 md:grid-cols-12 md:gap-6 md:py-8"
          >
            <span
              data-reveal="line"
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-border"
            />
            <span
              data-reveal="up"
              className="font-mono text-xs text-accent md:col-span-2 md:pt-2"
            >
              /{pad(i + 1)}
            </span>
            <h3
              data-reveal="up"
              className="font-display text-3xl font-medium tracking-[-0.03em] md:col-span-4 md:text-4xl"
            >
              {s.title}
            </h3>
            <ul
              data-reveal="up"
              className="flex flex-wrap gap-x-4 gap-y-1 text-muted md:col-span-6 md:pt-2"
            >
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Timeline({
  rows,
}: {
  rows: { role: string; org: string; period: string; note: string }[];
}) {
  return (
    <ol>
      {rows.map((r) => (
        <li
          key={r.role + r.period}
          className="group relative grid gap-2 py-6 md:grid-cols-12 md:gap-6 md:py-8"
        >
          <span
            data-reveal="line"
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-border"
          />
          <span
            data-reveal="up"
            className="font-mono text-xs text-muted md:col-span-3 md:pt-2"
          >
            {r.period}
          </span>
          <div data-reveal="up" className="md:col-span-5">
            <h3 className="font-display text-2xl font-medium tracking-[-0.02em] md:text-3xl">
              {r.role}
            </h3>
            <p className="mt-1 text-muted">{r.org}</p>
          </div>
          {r.note && (
            <p
              data-reveal="up"
              className="text-sm text-muted md:col-span-4 md:pt-2"
            >
              {r.note}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export function Experience() {
  return (
    <section id="experience" className="px-gutter py-28 md:py-44">
      <SectionTitle eyebrow="003 / experience" title="Experience" />
      <Timeline rows={experience} />
      <div data-reveal="up" className="mt-24 mb-8">
        <Eyebrow>Education</Eyebrow>
      </div>
      <Timeline rows={education} />
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative px-gutter pt-28 md:pt-44">
      <div data-reveal="up">
        <Eyebrow dot className="mb-6">
          004 / contact
        </Eyebrow>
      </div>
      <h2
        data-reveal="lines"
        className="max-w-[14ch] font-display text-[clamp(3rem,9vw,9rem)] leading-[0.9] font-medium tracking-tighter"
      >
        Have an app in mind?{" "}
        <span className="text-muted">Let&rsquo;s ship it.</span>
      </h2>

      <div
        data-reveal="up"
        className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6"
      >
        <Magnetic>
          <a
            href={profile.calendar}
            className="group inline-flex items-center gap-3 rounded-full bg-fg px-7 py-4 text-base font-medium text-bg transition-colors hover:bg-accent"
          >
            Schedule a call{" "}
            <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </Magnetic>
        <CopyEmail email={profile.email} className="text-lg" />
      </div>

      <footer className="mt-32 flex flex-col gap-8 border-t border-border pt-8 pb-28 text-sm md:mt-44 md:flex-row md:items-end md:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          © {profile.year} {profile.name} — Designed & built with care
        </p>
      </footer>
    </section>
  );
}
