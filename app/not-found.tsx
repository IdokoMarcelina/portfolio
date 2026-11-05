import { TransitionLink } from "@/components/ui/TransitionLink";
import { Arrow, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col justify-end px-gutter pb-32">
      <Eyebrow dot>404 — Not found</Eyebrow>
      <h1 className="mt-6 font-display text-[clamp(4rem,18vw,16rem)] leading-[0.85] font-medium tracking-[-0.055em]">
        lost screen
      </h1>
      <TransitionLink href="/" className="group mt-10 inline-flex items-center gap-2 text-sm">
        Back home <Arrow className="transition-transform group-hover:rotate-45" />
      </TransitionLink>
    </main>
  );
}
