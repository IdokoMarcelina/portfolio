import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { INTRO_KEY } from "@/lib/intro";
import { Nav } from "@/components/layout/Nav";
import { Dock } from "@/components/layout/Dock";
import { Curtain, GridBackground } from "@/components/layout/Chrome";
import { RouteReveal } from "@/components/layout/RouteReveal";

const display = Funnel_Display({ variable: "--font-funnel-display", subsets: ["latin"] });
const sans = Funnel_Sans({ variable: "--font-funnel-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: `${profile.name} — ${profile.role}`, template: `%s · ${profile.name}` },
  description: profile.tagline,
  openGraph: { title: `${profile.name} — ${profile.role}`, description: profile.tagline, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#050505" };

// Hides the preloader before first paint on repeat visits in the same session.
const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.classList.add("intro-seen")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`[data-preloader]{display:none}`}</style>
        </noscript>
        {/* Inter — hero body text */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* basis33 — pixel font for hero */}
        <link
          href="https://db.onlinewebfonts.com/c/d08bafd725a4cfc309efb5a88e0b63a5?family=basis33"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning: browser extensions inject attributes on <body> */}
      <body suppressHydrationWarning>
        <a
          href="#about"
          className="fixed top-2 left-2 z-200 -translate-y-20 rounded bg-fg px-3 py-2 text-sm text-bg focus:translate-y-0"
        >
          Skip to content
        </a>
        <GridBackground />
        <SmoothScroll />
        <Preloader />
        <Curtain />
        <RouteReveal />
        <Nav />
        {children}
        <Dock />
      </body>
    </html>
  );
}
