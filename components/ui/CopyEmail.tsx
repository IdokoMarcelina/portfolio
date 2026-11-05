"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={clsx("group inline-flex items-center gap-2 text-left", className)}
      aria-label={`Copy email address ${email}`}
    >
      <span className="underline decoration-fg/30 underline-offset-4 transition-colors group-hover:decoration-accent">
        {email}
      </span>
      <span className="relative inline-grid font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className={clsx("col-start-1 row-start-1 transition-all duration-300", copied && "-translate-y-2 opacity-0")}>
          click to copy
        </span>
        <span
          aria-live="polite"
          className={clsx(
            "col-start-1 row-start-1 text-accent transition-all duration-300",
            !copied && "translate-y-2 opacity-0",
          )}
        >
          {copied ? "copied ✓" : ""}
        </span>
      </span>
    </button>
  );
}
