import { profile, projects, socials, techStack } from "@/lib/data";
import { Arrow } from "@/components/ui/primitives";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Magnetic } from "@/components/ui/MagneticButton";
import { DesktopMockup, PhoneMockup } from "@/components/media/Mockups";

/* ── Tech Stack ──────────────────────────────────────────────── */
export function Skills() {
  return (
    <section
      id="skills"
      className="bg-[#e8e5e0] px-gutter py-20 md:py-28"
    >
      {/* Header row */}
      <div data-reveal="up" className="mb-8 flex items-center justify-between">
        <p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "#EE5021" }}
        >
          Tech Stack
        </p>
        {/* Two dot indicators */}
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#bbb]" aria-hidden />
          <span className="size-2 rounded-full" style={{ backgroundColor: "#EE5021" }} aria-hidden />
        </div>
      </div>

      {/* Full-width bordered grid */}
      <div
        data-reveal="up"
        className="w-full border-t border-l"
        style={{ borderColor: "#ccc8c0" }}
      >
        {chunk(techStack, 4).map((row, ri) => (
          <div key={ri} className="grid grid-cols-2 md:grid-cols-4">
            {row.map((tech) => (
              <div
                key={tech}
                className="border-r border-b px-6 py-7 text-center"
                style={{ borderColor: "#ccc8c0" }}
              >
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: "#444" }}
                >
                  {tech}
                </span>
              </div>
            ))}
            {/* fill empty cells in last row */}
            {row.length < 4 &&
              Array.from({ length: 4 - row.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="border-r border-b px-6 py-7"
                  style={{ borderColor: "#ccc8c0" }}
                />
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Recent Projects ─────────────────────────────────────────── */
export function Projects() {
  const web = projects.filter((p) => p.platforms.includes("Web"));
  const mobile = projects.filter((p) => !p.platforms.includes("Web"));

  return (
    <section id="work" className="bg-bg px-gutter py-20 md:py-28">
      {/* Header row */}
      <div data-reveal="up" className="mb-8 flex items-center justify-between">
        <p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "#EE5021" }}
        >
          Recent Projects
        </p>
        <TransitionLink
          href="/#work"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg"
        >
          View All →
        </TransitionLink>
      </div>

      {/* Web projects — laptop-on-chair, 2 columns */}
      <div data-reveal="up" className="grid gap-4 md:grid-cols-2">
        {web.map((p, i) => (
          <LaptopCard key={p.slug} project={p} warmIndex={i} />
        ))}
      </div>

      {/* Mobile projects — phones side by side in one row */}
      <div data-reveal="up" className="mt-4 grid gap-4 md:grid-cols-2">
        {mobile.map((p) => (
          <PhoneCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

/* Laptop-on-chair card — warm dark bg, desktop mockup centred */
function LaptopCard({ project: p, warmIndex }: { project: typeof projects[0]; warmIndex: number }) {
  const href = p.links.live ?? p.links.github ?? `/work/${p.slug}`;
  const warmBg = warmIndex % 2 === 0
    ? "linear-gradient(145deg,#1e0d05 0%,#4a1e08 35%,#7a3010 65%,#b04a1a 100%)"
    : "linear-gradient(145deg,#120808 0%,#3d1408 35%,#6b2510 65%,#9c3c18 100%)";

  return (
    <a
      href={href}
      target={p.links.live ? "_blank" : undefined}
      rel={p.links.live ? "noreferrer" : undefined}
      className="group relative flex flex-col overflow-hidden rounded-sm"
      style={{ background: warmBg, minHeight: "340px" }}
    >
      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 p-4">
        {p.stack.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded-sm bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50 backdrop-blur-sm"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Laptop mockup — grows to fill space */}
      <div className="relative flex flex-1 items-end justify-center px-8 pb-10">
        <div className="w-full max-w-[85%] transition-transform duration-700 group-hover:-translate-y-2">
          <DesktopMockup
            media={p.cover.desktop ?? p.cover.mobile}
            accent={p.accent}
            title={p.title}
          />
        </div>
      </div>

      {/* Bottom label */}
      <div className="flex items-end justify-between px-5 pb-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 mb-0.5">
            View Project
          </p>
          <p className="font-display text-lg font-semibold text-white leading-tight">
            {p.title}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-white/40">{p.year}</span>
          <span className="flex size-8 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
            <Arrow dir="ne" className="text-xs" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* Phone card — two phones side by side on dark bg */
function PhoneCard({ project: p }: { project: typeof projects[0] }) {
  const href = p.links.playStore ?? p.links.github ?? `/work/${p.slug}`;

  return (
    <a
      href={href}
      target={p.links.playStore && p.links.playStore !== "#" ? "_blank" : undefined}
      rel={p.links.playStore && p.links.playStore !== "#" ? "noreferrer" : undefined}
      className="group relative flex flex-col overflow-hidden rounded-sm bg-[#111]"
      style={{ minHeight: "340px" }}
    >
      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 p-4">
        {p.stack.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded-sm bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Two phones side by side */}
      <div className="relative flex flex-1 items-end justify-center gap-4 px-6 pb-14">
        {/* Back phone — slightly behind and tilted */}
        <div
          className="w-[30%] transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-[-2deg]"
          style={{ transform: "translateY(12%) rotate(-4deg)" }}
        >
          <PhoneMockup
            media={p.cover.mobile}
            accent={p.accent}
            title={p.title}
          />
        </div>
        {/* Front phone */}
        <div className="w-[32%] transition-transform duration-700 group-hover:-translate-y-5">
          <PhoneMockup
            media={p.cover.mobile}
            accent={p.accent}
            title={p.title}
          />
        </div>
        {/* Third phone — right side tilted */}
        <div
          className="w-[30%] transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-[2deg]"
          style={{ transform: "translateY(12%) rotate(4deg)" }}
        >
          <PhoneMockup
            media={p.cover.mobile}
            accent={p.accent}
            title={p.title}
          />
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 mb-0.5">
            View App
          </p>
          <p className="font-display text-lg font-semibold text-white leading-tight">
            {p.title}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-white/40">{p.year}</span>
          <span className="flex size-8 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
            <Arrow dir="ne" className="text-xs" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ── Contact ─────────────────────────────────────────────────── */
export function Contact() {
  return (
    <section id="contact" className="relative bg-bg px-gutter pt-20 pb-0 md:pt-32">
      <div data-reveal="up">
        <p
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "#EE5021" }}
        >
          004 / contact
        </p>
      </div>
      <h2
        data-reveal="lines"
        className="max-w-[14ch] font-display text-[clamp(3rem,9vw,9rem)] leading-[0.9] font-semibold tracking-tighter text-fg"
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
            className="inline-flex items-center gap-3 rounded-sm px-7 py-4 text-base font-semibold text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#EE5021" }}
          >
            Schedule a call <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </Magnetic>
        <CopyEmail email={profile.email} className="text-lg text-muted hover:text-fg transition-colors" />
      </div>

      <footer className="mt-32 flex flex-col gap-8 border-t border-border pt-8 pb-20 text-sm md:mt-44 md:flex-row md:items-end md:justify-between">
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

/* ── Helper ──────────────────────────────────────────────────── */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
