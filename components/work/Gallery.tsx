"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { pad, type Media } from "@/lib/data";
import { DesktopMockup, PhoneMockup } from "@/components/media/Mockups";

type Props = { media: Media[]; accent: string; title: string };

/** talade-style numbered, captioned screens with an "Enlarge" lightbox that FLIPs from the thumbnail. */
export function Gallery({ media, accent, title }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const thumbs = useRef<(HTMLDivElement | null)[]>([]);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  // Activity keeps this route mounted while hidden; never come back to an open lightbox.
  useLayoutEffect(() => () => setOpen(null), []);

  return (
    <>
      <ol
        data-reveal="stagger"
        className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-6"
      >
        {media.map((m, i) => (
          <li key={i} className={clsx(m.kind === "desktop" && "col-span-full")}>
            <figure>
              <div
                ref={(el) => {
                  thumbs.current[i] = el;
                }}
                className={clsx(
                  "mx-auto",
                  m.kind === "mobile" ? "w-[78%] max-w-75" : "w-full",
                )}
              >
                <Shot media={m} accent={accent} title={title} />
              </div>
              <figcaption className="mt-5 flex items-start gap-3 text-sm">
                <span className="font-mono text-[11px] text-accent">
                  {pad(i + 1)}
                </span>
                <span className="flex-1 text-pretty text-muted">
                  {m.caption}
                </span>
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setOpen(i)}
                  className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-fg/70 underline-offset-4 hover:text-fg hover:underline"
                >
                  Enlarge<span className="sr-only"> screen {i + 1}</span>
                </button>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      {open !== null && (
        <Lightbox
          media={media}
          index={open}
          accent={accent}
          title={title}
          thumbs={thumbs}
          onIndex={setOpen}
          onClose={() => {
            const i = open;
            setOpen(null);
            triggers.current[i]?.focus();
          }}
        />
      )}
    </>
  );
}

function Shot({
  media,
  accent,
  title,
}: {
  media: Media;
  accent: string;
  title: string;
}) {
  return media.kind === "mobile" ? (
    <PhoneMockup media={media} accent={accent} title={title} />
  ) : (
    <DesktopMockup media={media} accent={accent} title={title} />
  );
}

type LightboxProps = Props & {
  index: number;
  thumbs: { current: (HTMLDivElement | null)[] };
  onIndex: (i: number) => void;
  onClose: () => void;
};

function Lightbox({
  media,
  index,
  accent,
  title,
  thumbs,
  onIndex,
  onClose,
}: LightboxProps) {
  const backdrop = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const m = media[index];
  const first = useRef(true);

  // FLIP from the thumbnail on first open; plain fade when paging.
  useLayoutEffect(() => {
    const t = target.current!;
    const from = thumbs.current[index];
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (first.current && from && !reduced) {
      const a = from.getBoundingClientRect();
      const b = t.getBoundingClientRect();
      gsap.from(t, {
        x: a.left - b.left,
        y: a.top - b.top,
        scale: a.width / b.width,
        transformOrigin: "top left",
        duration: 0.8,
        ease: "expo.out",
      });
      gsap.from(backdrop.current, { opacity: 0, duration: 0.4 });
    } else if (!reduced) {
      gsap.from(t, { opacity: 0, y: 16, duration: 0.4, ease: "power2.out" });
    }
    first.current = false;
  }, [index, thumbs]);

  const close = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return onClose();
    gsap.to([target.current, backdrop.current], {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    getLenis()?.stop();
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") onIndex((index + 1) % media.length);
      if (e.key === "ArrowLeft")
        onIndex((index - 1 + media.length) % media.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [close, index, media.length, onIndex]);

  return createPortal(
    <div
      role="dialog"
      aria-modal
      aria-label={`${title}, screen ${index + 1}`}
      className="fixed inset-0 z-80"
    >
      <div
        ref={backdrop}
        className="absolute inset-0 bg-bg/95 backdrop-blur-sm"
        onClick={close}
      />
      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center gap-5 p-gutter">
        <div
          ref={target}
          className={clsx(
            "pointer-events-auto",
            m.kind === "mobile"
              ? "w-[min(86vw,calc(78svh*9/19.5))]"
              : "w-[min(92vw,1300px)]",
          )}
        >
          <Shot media={m} accent={accent} title={title} />
        </div>
        <div className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-4 text-sm">
          <button
            type="button"
            onClick={() => onIndex((index - 1 + media.length) % media.length)}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-fg"
          >
            ← Prev
          </button>
          <p className="text-center text-muted">
            <span className="mr-2 font-mono text-[11px] text-accent tabular-nums">
              {pad(index + 1)} / {pad(media.length)}
            </span>
            {m.caption}
          </p>
          <button
            type="button"
            onClick={() => onIndex((index + 1) % media.length)}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-fg"
          >
            Next →
          </button>
        </div>
      </div>
      <button
        ref={closeBtn}
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute top-5 right-gutter grid size-12 place-items-center rounded-full bg-fg text-bg"
      >
        <span className="absolute h-px w-5 rotate-45 bg-current" />
        <span className="absolute h-px w-5 -rotate-45 bg-current" />
      </button>
    </div>,
    document.body,
  );
}
