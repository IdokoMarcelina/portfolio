"use client";

import { useEffect } from "react";

/**
 * Mounts on the homepage only.
 * Adds `data-hero-page` to <html> so global CSS can hide the site nav/dock/grid
 * while the full-screen hero is visible.
 */
export function HeroPageSetup() {
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-hero-page", "");
    return () => html.removeAttribute("data-hero-page");
  }, []);

  return null;
}
