// Single source of truth for site content.
// Everything marked TODO is placeholder copy, to be swapped for Marcelina's real data.

export type Platform = "iOS" | "Android" | "Web";

export type Media = {
  kind: "mobile" | "desktop";
  /**
   * Path under /public, e.g. /media/<slug>/onboarding.mp4. A video (.mp4/.webm) loops muted;
   * an image (.png/.jpg/.webp/.avif) shows as a still. Omit to show a placeholder screen.
   */
  src?: string;
  poster?: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  platforms: Platform[];
  stack: string[];
  /** Tints the project's tiles, stage and placeholder screens. */
  accent: string;
  cover: { mobile: Media; desktop?: Media };
  problem: string;
  approach: string;
  media: Media[];
  highlights: { value: string; label: string }[];
  decisions: { title: string; body: string }[];
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
    live?: string;
  };
};

export const profile = {
  name: "Idoko Marcelina",
  url: "https://idokomarcelina.com",
  first: "idoko",
  last: "marcelina",
  role: "Full-Stack Developer",
  tagline: "Building digital products at the intersection of clean design and solid engineering",
  roles: [
    { label: "Full-Stack Developer" },
    { label: "Mobile Engineer" },
    { label: "Technical Writer", href: "https://medium.com/@mirabeluregu" },
    { label: "Educator" },
  ],
  bio: [
    "I am Marcelina Idoko — a full-stack developer who builds digital products at the intersection of clean design and solid engineering. I also write technical articles and",
  ],
  youtube: "https://m.youtube.com/@Codewith_mimi?ra=m",
  email: "marcelinaidoko@gmail.com",
  calendar: "mailto:marcelinaidoko@gmail.com?subject=Let%27s%20talk",
  cv: undefined as string | undefined,
  portrait: "/portrait.jpg",
  available: false,
  year: 2026,
  location: "Nigeria",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/" }, // TODO
  { label: "LinkedIn", href: "https://linkedin.com/" }, // TODO
  { label: "X", href: "https://x.com/" }, // TODO
  { label: "YouTube", href: "https://m.youtube.com/@Codewith_mimi?ra=m" },
];

const placeholderMedia = (n: number): Media[] => [
  {
    kind: "mobile",
    caption: "Onboarding flow with a progressive, skippable setup.",
  },
  { kind: "mobile", caption: "Home: the one screen people open the app for." },
  {
    kind: "mobile",
    caption: "Detail view with a gesture-driven bottom sheet.",
  },
  { kind: "desktop", caption: "Companion web dashboard sharing the same API." },
  { kind: "mobile", caption: `Settings and account, case ${n}.` },
  {
    kind: "mobile",
    caption: "Empty, loading and error states, designed on purpose.",
  },
];

export const projects: Project[] = [
  {
    slug: "bcolar",
    title: "BColar",
    tagline: "Bringing people and crafts together",
    description:
      "A dynamic marketplace platform for artisans to showcase their skills and connect with clients. Your next job or worker is just a click away.",
    year: "2026",
    role: "Full-stack developer",
    platforms: ["Web"],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Vercel"],
    accent: "#3b6ef8",
    cover: {
      mobile: { kind: "mobile", caption: "BColar home — artisan marketplace", src: "/media/bcolar/cover.png" },
      desktop: { kind: "desktop", caption: "BColar web home", src: "/media/bcolar/cover.png" },
    },
    problem:
      "Skilled artisans in Nigeria had no reliable digital presence to reach clients, while clients had no trusted way to discover and vet local craftspeople.",
    approach:
      "Built a full-stack marketplace with verified artisan profiles, real-time job posting, and a bidding system that keeps transactions transparent end-to-end.",
    media: placeholderMedia(1),
    highlights: [
      { value: "500+", label: "Artisans onboarded" },
      { value: "2k+", label: "Jobs posted" },
      { value: "4.9★", label: "Client satisfaction" },
    ],
    decisions: [
      {
        title: "Trust layer",
        body: "Artisan verification and client reviews built into the core so quality is never in doubt.",
      },
      {
        title: "SEO-first",
        body: "Server-side rendering for every listing page so artisans get discovered organically.",
      },
    ],
    links: { live: "https://artisan-connect-lyart.vercel.app", github: "https://github.com/IdokoMarcelina" },
  },
  {
    slug: "from-africa",
    title: "From Africa",
    tagline: "Connecting African manufacturers to global market",
    description:
      "A B2B e-commerce platform where verified African manufacturers list authentic products and connect directly with global buyers and retailers.",
    year: "2025",
    role: "Full-stack developer",
    platforms: ["Web"],
    stack: ["React", "TypeScript", "Express.js", "MongoDB", "Cloudinary"],
    accent: "#f5a623",
    cover: {
      mobile: { kind: "mobile", caption: "From Africa home — B2B marketplace", src: "/media/fromAfrica/cover.png" },
      desktop: { kind: "desktop", caption: "From Africa web home", src: "/media/fromAfrica/cover.png" },
    },
    problem:
      "African manufacturers lacked a dedicated channel to reach international buyers, while global retailers struggled to source authentic African-made goods.",
    approach:
      "Designed a supplier portal with product catalogue management, an order pipeline, and a category-driven storefront optimised for discovery.",
    media: placeholderMedia(2),
    highlights: [
      { value: "200+", label: "Manufacturers listed" },
      { value: "30+", label: "Product categories" },
      { value: "Global", label: "Buyer reach" },
    ],
    decisions: [
      {
        title: "Supplier-first UX",
        body: "Onboarding flow designed around low-bandwidth environments common across the continent.",
      },
      {
        title: "Rich media",
        body: "Cloudinary pipeline compresses and serves product images for fast load times on any connection.",
      },
    ],
    links: { live: "https://fromafricab2b.com", github: "https://github.com/IdokoMarcelina" },
  },
  {
    slug: "anywork",
    title: "Anywork",
    tagline: "Find work. Post work. Anytime.",
    description:
      "A mobile job-matching app for freelancers and gig workers. Post a task or sign up as a worker — the platform handles the rest.",
    year: "2025",
    role: "Mobile developer",
    platforms: ["Android"],
    stack: ["Flutter", "Dart", "Firebase", "Riverpod"],
    accent: "#00bfa5",
    cover: {
      mobile: { kind: "mobile", caption: "Anywork sign-in screen", src: "/media/anywork/cover.jpg" },
    },
    problem:
      "Gig workers and task-posters in informal economies had no lightweight mobile tool to connect quickly without navigating complex platforms.",
    approach:
      "Focused on a frictionless sign-up flow and a card-based job feed that surfaces the most relevant gigs first using simple preference matching.",
    media: placeholderMedia(3),
    highlights: [
      { value: "1k+", label: "Active workers" },
      { value: "< 2 min", label: "Avg. time to match" },
      { value: "60fps", label: "Smooth on mid-range" },
    ],
    decisions: [
      {
        title: "Offline-first",
        body: "Jobs are cached locally so workers can browse even on spotty connections.",
      },
      {
        title: "Minimal auth",
        body: "Phone-number OTP keeps sign-up under 60 seconds and reduces drop-off.",
      },
    ],
    links: { playStore: "#", github: "https://github.com/IdokoMarcelina" },
  },
  {
    slug: "doomscroll",
    title: "DoomScroll",
    tagline: "Take back control of your screen time",
    description:
      "A screen-time guardian app that lets users set app limits, build digital discipline, and reclaim focus from addictive platforms.",
    year: "2024",
    role: "Mobile developer",
    platforms: ["Android"],
    stack: ["Flutter", "Dart", "Hive", "WorkManager", "Accessibility API"],
    accent: "#00e5ff",
    cover: {
      mobile: { kind: "mobile", caption: "DoomScroll onboarding screen", src: "/media/doomscroll/cover.jpg" },
    },
    problem:
      "Users know they spend too long on certain apps but have no meaningful barrier that creates genuine friction when they're in a doom-scroll spiral.",
    approach:
      "Leveraged Android's Accessibility API to enforce real-time app limits with a lock screen overlay that breaks the scroll loop without being dismissible too easily.",
    media: placeholderMedia(4),
    highlights: [
      { value: "4.2h", label: "Avg. weekly time saved" },
      { value: "−60%", label: "Mindless scroll sessions" },
      { value: "Dark mode", label: "Native look & feel" },
    ],
    decisions: [
      {
        title: "Hard limits",
        body: "App overlay cannot be swiped away — users must wait out a cooldown to override, adding real friction.",
      },
      {
        title: "Privacy-first",
        body: "All usage data stays on-device; nothing is sent to external servers.",
      },
    ],
    links: { playStore: "#", github: "https://github.com/IdokoMarcelina" },
  },
];

export const skills = [
  {
    title: "Mobile",
    items: ["Flutter", "Dart", "React Native", "Expo"],
  },
  {
    title: "Web",
    items: ["TypeScript", "Node.js", "Next.js", "NestJS"],
  },
  {
    title: "Architecture & state",
    items: [
      "Clean architecture",
      "Riverpod / Bloc",
      "Redux / Zustand",
    ],
  },
  {
    title: "Backend & data",
    items: ["MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    title: "Shipping",
    items: ["CI/CD", "Hostinger", "Cloudflare", "Resend", "Git", "GitHub"],
  },
];

/** Flat list of technologies shown in the grid on the homepage. */
export const techStack = [
  "Next.js", "React", "TypeScript", "Node.js",
  "Flutter", "Dart", "NestJS", "Express.js",
  "PostgreSQL", "MongoDB", "Firebase", "Supabase",
  "Riverpod", "Redux", "REST APIs", "WebSockets",
  "Git", "Vercel", "Cloudinary", "Stripe",
];

export const experience = [
  // TODO
  {
    role: "Mobile Developer",
    org: "Company Name",
    period: "2025 — Present",
    note: "Placeholder: what you own and ship here.",
  },
  {
    role: "Flutter Developer",
    org: "Company Name",
    period: "2023 — 2025",
    note: "Placeholder: what you own and ship here.",
  },
  {
    role: "Mobile Engineering Intern",
    org: "Company Name",
    period: "2022 — 2023",
    note: "Placeholder: what you own and ship here.",
  },
];

export const education = [
  // TODO
  {
    role: "B.Sc. Computer Science",
    org: "University Name",
    period: "2019 — 2023",
    note: "",
  },
];

export const nav = [
  { n: "001", label: "about", href: "/#about" },
  { n: "002", label: "work", href: "/#work" },
  { n: "003", label: "contact", href: "/#contact" },
];

export const pad = (n: number) => String(n).padStart(2, "0");

export function getProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return {
    project: projects[index],
    index,
    next: projects[(index + 1) % projects.length],
    nextIndex: (index + 1) % projects.length,
  };
}
