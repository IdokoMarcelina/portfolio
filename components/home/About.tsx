import { pad, profile, projects } from "@/lib/data";
import { Eyebrow } from "@/components/ui/primitives";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { PhoneMockup } from "@/components/media/Mockups";

/** timothymaarv-style narrow bio column, then one row of three autoplaying recording tiles. */
export function About() {
  return (
    <section id="about" className="px-gutter py-28 md:py-44">
      <div className="mx-auto max-w-160">
        <div
          data-reveal="up"
          className="mb-10 flex items-start justify-between gap-6"
        >
          <div>
            <p className="font-medium">{profile.name}</p>
            <p className="text-sm text-muted">{profile.role}</p>
          </div>
          <Eyebrow>001 / about</Eyebrow>
        </div>
        <div className="space-y-6 text-[17px] leading-relaxed text-pretty text-fg/75 md:text-lg">
          {profile.bio.map((p) => (
            <p key={p} data-reveal="up">
              {p}{" "}
              <a
                href={profile.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-fg underline underline-offset-4 decoration-fg/30 hover:decoration-fg transition-colors"
              >
                teach ↗
              </a>
              .
            </p>
          ))}
          <p data-reveal="up">
            You can reach me at{" "}
            <CopyEmail email={profile.email} className="text-fg" />
          </p>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-280 md:mt-32">
        <div
          data-reveal="up"
          className="mb-5 flex items-center justify-between"
        >
          <p className="flex items-center gap-2 text-sm">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            Selected work
          </p>
          <p className="font-mono text-[11px] text-muted">
            {pad(projects.length)} projects
          </p>
        </div>

        <ul
          data-reveal="stagger"
          className="-mx-gutter flex snap-x snap-mandatory gap-3 overflow-x-auto px-gutter pb-2 scrollbar-none md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
        >
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className="w-[78vw] max-w-90 shrink-0 snap-center md:w-auto md:max-w-none"
            >
              <TransitionLink
                href={`/work/${p.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-sm border border-border bg-surface"
                style={{
                  backgroundImage: `radial-gradient(90% 70% at 50% 100%, ${p.accent}22, transparent 70%), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                  backgroundSize: "100% 100%, 25% 25%, 25% 25%",
                }}
              >
                <div className="absolute inset-x-0 top-0 z-10 flex justify-between p-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  <span className="relative inline-grid overflow-hidden">
                    <span className="col-start-1 row-start-1 transition-transform duration-500 group-hover:-translate-y-full">
                      {p.title}
                    </span>
                    <span className="col-start-1 row-start-1 translate-y-full text-fg transition-transform duration-500 group-hover:translate-y-0">
                      View case ↗
                    </span>
                  </span>
                  <span>{pad(i + 1)}</span>
                </div>
                <PhoneMockup
                  media={p.cover.mobile}
                  accent={p.accent}
                  title={p.title}
                  className="absolute top-[13%] left-1/2 w-[30%] -translate-x-1/2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-4%] group-hover:scale-[1.04]"
                />
                <p className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-bg/90 to-transparent p-3 pt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {p.year} · {p.platforms.join(" / ")}
                </p>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
