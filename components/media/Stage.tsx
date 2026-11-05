import clsx from "clsx";
import type { Project } from "@/lib/data";
import { DesktopMockup, PhoneMockup } from "./Mockups";

/** oyewale-style big rounded card: desktop recording behind, phone recording in front. */
export function Stage({
  project: p,
  playing = true,
  className,
}: {
  project: Project;
  playing?: boolean;
  className?: string;
}) {
  return (
    <div
      data-ch-stage
      className={clsx(
        "relative overflow-hidden rounded-[28px] border border-white/5",
        className,
      )}
      style={{
        background: `radial-gradient(80% 80% at 70% 100%, ${p.accent}30, transparent 60%), #111`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {p.cover.desktop && (
        <div data-ch-desktop className="absolute top-[12%] left-[7%] w-[72%]">
          <DesktopMockup
            media={p.cover.desktop}
            accent={p.accent}
            title={p.title}
            active={playing}
          />
        </div>
      )}
      <div
        data-ch-phone
        className={clsx(
          "absolute max-w-75",
          p.cover.desktop
            ? "right-[8%] bottom-[-10%] w-[30%]"
            : "bottom-[-14%] left-1/2 w-[36%] -translate-x-1/2",
        )}
      >
        <PhoneMockup
          media={p.cover.mobile}
          accent={p.accent}
          title={p.title}
          active={playing}
        />
      </div>
    </div>
  );
}
