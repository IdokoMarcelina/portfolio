import Image from "next/image";
import { profile } from "@/lib/data";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { CopyEmail } from "@/components/ui/CopyEmail";

export function About() {
  return (
    <section
      id="about"
      className="bg-[#f0eeea] px-gutter py-24 md:py-36"
      style={{ color: "#111" }}
    >
      {/* Eyebrow */}
      <div data-reveal="up" className="mb-12 flex items-center gap-4">
        <span className="block h-px w-10 bg-[#999]" aria-hidden />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#888]">
          About me
        </p>
      </div>

      {/* Two-column grid */}
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        {/* Left — bio */}
        <div>
          <h2
            data-reveal="lines"
            className="font-display text-[clamp(1.9rem,4vw,3.4rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0d0d0d]"
          >
            I&apos;m Marcelina &mdash; a fullstack developer who builds digital
            products at the intersection of clean design and solid engineering.
            I also write technical articles and{" "}
            <a
              href={profile.youtube}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-[#aaa] hover:decoration-[#111] transition-colors"
            >
              teach
            </a>
            .
          </h2>

          <p
            data-reveal="up"
            className="mt-8 max-w-md text-[15px] leading-relaxed text-[#555]"
          >
            Based in {profile.location}, I work with startups and teams worldwide to
            turn ideas into polished, production-ready products. From API
            architecture to pixel-perfect interfaces — I own the full stack.
          </p>

          <div data-reveal="up" className="mt-10 flex flex-wrap items-center gap-6">
            <TransitionLink
              href="/#work"
              className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#EE5021" }}
            >
              See my work →
            </TransitionLink>
            <CopyEmail
              email={profile.email}
              className="text-sm text-[#555] underline underline-offset-4 decoration-[#bbb] hover:text-[#111] transition-colors"
            />
          </div>
        </div>

        {/* Right — portrait */}
        <div data-reveal="up" className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#ddd]">
            {profile.portrait && (
              <Image
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover grayscale"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
