"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  src: string;
  poster?: string;
  /** Extra gate on top of visibility, e.g. only the active pinned chapter plays. */
  active?: boolean;
  className?: string;
  label: string;
};

/** Muted looping screen recording that only loads near the viewport and only plays while visible. */
export function LazyVideo({ src, poster, active = true, className, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);

  const sync = () => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (visible.current && active && !reduced) v.play().catch(() => {});
    else v.pause();
  };

  useEffect(() => {
    const v = ref.current!;
    const preload = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.preload = "auto";
          preload.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    const play = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    preload.observe(v);
    play.observe(v);
    return () => {
      preload.disconnect();
      play.disconnect();
      v.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(sync, [active]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={clsx("h-full w-full object-cover", className)}
    />
  );
}
