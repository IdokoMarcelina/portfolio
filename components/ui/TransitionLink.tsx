"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { cover } from "@/lib/transition";
import { scrollToTarget } from "@/lib/scroll";

type Props = ComponentProps<typeof Link> & { href: string; onBeforeNavigate?: () => void };

/** Link that scrolls smoothly for same-page anchors and wipes the curtain for route changes. */
export function TransitionLink({ href, onClick, onBeforeNavigate, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    const [path, hash] = href.split("#");
    const targetPath = path || pathname;
    e.preventDefault();
    onBeforeNavigate?.();

    if (targetPath === pathname) {
      scrollToTarget(hash ? `#${hash}` : 0);
      return;
    }
    cover(() => router.push(href, { scroll: !hash }));
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
