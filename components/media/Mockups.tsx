import Image from "next/image";
import clsx from "clsx";
import type { CSSProperties } from "react";
import type { Media } from "@/lib/data";
import { LazyVideo } from "./LazyVideo";

type ScreenProps = { media: Media; accent: string; active?: boolean; title: string };

const IMAGE = /\.(png|jpe?g|webp|avif|gif)$/i;

function Screen({ media, accent, active, title }: ScreenProps) {
  const label = `${title}: ${media.caption}`;
  if (media.src && IMAGE.test(media.src)) {
    const sizes = media.kind === "mobile" ? "(min-width: 768px) 300px, 40vw" : "(min-width: 768px) 70vw, 92vw";
    return <Image src={media.src} alt={label} fill sizes={sizes} className="object-cover object-top" />;
  }
  if (media.src) {
    return <LazyVideo src={media.src} poster={media.poster} active={active} label={label} />;
  }
  return <PlaceholderScreen kind={media.kind} accent={accent} title={title} />;
}

/** Skeleton app UI shown until the real recording is dropped in. */
function PlaceholderScreen({ kind, accent, title }: { kind: Media["kind"]; accent: string; title: string }) {
  const mobile = kind === "mobile";
  return (
    <div
      role="img"
      aria-label={`${title}: recording coming soon`}
      className="relative flex h-full w-full flex-col gap-[calc(var(--u)*4)] overflow-hidden bg-[#0b0b0b] p-[calc(var(--u)*6)]"
      style={
        {
          "--u": mobile ? "1cqw" : "0.4cqw",
          backgroundImage: `radial-gradient(120% 60% at 50% 0%, ${accent}26, transparent 70%)`,
        } as CSSProperties
      }
    >
      {mobile && (
        <div className="flex justify-between pt-[calc(var(--u)*1)] font-mono text-[length:calc(var(--u)*4.5)] text-fg/70">
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>
      )}
      <div className="mt-[calc(var(--u)*4)] h-[calc(var(--u)*5)] w-1/3 rounded-full" style={{ background: accent }} />
      <div className="h-[calc(var(--u)*9)] w-4/5 rounded-[calc(var(--u)*2)] bg-fg/10" />
      <div className={clsx("grid flex-1 gap-[calc(var(--u)*3)]", mobile ? "grid-cols-2" : "grid-cols-4")}>
        {Array.from({ length: mobile ? 6 : 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-[calc(var(--u)*3)] bg-fg/6"
            style={{ animationDelay: `${i * 120}ms`, animationDuration: "2.4s" }}
          />
        ))}
      </div>
      <p className="absolute inset-x-0 bottom-[calc(var(--u)*5)] text-center font-mono text-[length:calc(var(--u)*3.6)] uppercase tracking-[0.2em] text-fg/40">
        recording soon
      </p>
    </div>
  );
}

// The outer element is the size container, so the frame's cqw radii/padding scale with the mockup itself.
export function PhoneMockup({ className, ...screen }: ScreenProps & { className?: string }) {
  return (
    <div className={clsx("@container", className)}>
      <div className="relative aspect-[9/19.5] rounded-[16cqw] bg-[#1a1a1a] p-[3.2cqw] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative h-full w-full overflow-hidden rounded-[13cqw] bg-black">
          <Screen {...screen} />
          <div className="absolute top-[3cqw] left-1/2 h-[8cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

export function DesktopMockup({ className, ...screen }: ScreenProps & { className?: string }) {
  return (
    <div className={clsx("@container", className)}>
      <div className="relative overflow-hidden rounded-[1.4cqw] border border-white/10 bg-[#141414] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-[0.8cqw] border-b border-white/5 px-[1.6cqw] py-[1.2cqw]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-[1.1cqw] rounded-full bg-white/15" />
          ))}
          <span className="ml-[2cqw] h-[1.8cqw] w-1/3 rounded-full bg-white/5" />
        </div>
        <div className="@container relative aspect-16/10">
          <Screen {...screen} />
        </div>
      </div>
    </div>
  );
}
