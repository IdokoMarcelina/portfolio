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
  url: "https://idokomarcelina.com", // TODO: real domain (used for metadata, sitemap, robots)
  first: "idoko",
  last: "marcelina",
  role: "Mobile Developer",
  tagline: "Building fluid, native-feeling apps for iOS and Android", // TODO
  roles: ["Mobile Engineer", "iOS", "Android", "Flutter"], // TODO
  bio: [
    "Hi, I'm Marcelina, a mobile developer focused on building apps that feel fast, considered and genuinely native on every screen they land on.", // TODO
    "I care about the details people feel but rarely name: the spring on a sheet, the frame-perfect transition, the empty state that still says something.", // TODO
  ],
  email: "hello@idokomarcelina.com", // TODO
  calendar: "mailto:hello@idokomarcelina.com?subject=Let%27s%20talk", // TODO: Cal.com / Calendly link
  cv: undefined as string | undefined, // TODO: drop cv.pdf into /public, then set "/cv.pdf"
  portrait: undefined as string | undefined, // TODO: e.g. "/portrait.jpg"
  available: false,
  year: 2026, // footer & preloader copyright year
  location: "Nigeria", // TODO
};

export const socials = [
  { label: "GitHub", href: "https://github.com/" }, // TODO
  { label: "LinkedIn", href: "https://linkedin.com/" }, // TODO
  { label: "X", href: "https://x.com/" }, // TODO
  { label: "Dribbble", href: "https://dribbble.com/" }, // TODO
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
    slug: "project-one", // TODO
    title: "Project One",
    tagline: "From first tap to daily habit",
    description:
      "A consumer app built from zero to store release. Placeholder copy until the real case study lands.",
    year: "2026",
    role: "Lead mobile engineer",
    platforms: ["iOS", "Android"],
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "Codemagic"],
    accent: "#c6f432",
    cover: {
      mobile: { kind: "mobile", caption: "Cover" },
      desktop: { kind: "desktop", caption: "Cover" },
    },
    problem:
      "What was broken, slow or missing before this app existed, and for whom. One or two sentences.",
    approach:
      "How the product was shaped: the architecture, the trade-offs, the moments that needed the most care.",
    media: placeholderMedia(1),
    highlights: [
      { value: "4.8★", label: "App Store rating" },
      { value: "50k+", label: "Downloads" },
      { value: "60fps", label: "On mid-range Android" },
    ],
    decisions: [
      {
        title: "Offline-first",
        body: "Local cache with background sync so the app never shows a blank screen.",
      },
      {
        title: "One codebase",
        body: "Shared UI and logic across iOS and Android without losing platform feel.",
      },
    ],
    links: { appStore: "#", playStore: "#" },
  },
  {
    slug: "project-two", // TODO
    title: "Project Two",
    tagline: "Payments that feel instant",
    description:
      "A fintech experience across mobile and web. Placeholder copy until the real case study lands.",
    year: "2025",
    role: "Mobile engineer",
    platforms: ["iOS", "Android", "Web"],
    stack: ["React Native", "Expo", "TypeScript", "Zustand", "Supabase"],
    accent: "#7dd3fc",
    cover: {
      mobile: { kind: "mobile", caption: "Cover" },
      desktop: { kind: "desktop", caption: "Cover" },
    },
    problem:
      "What was broken, slow or missing before this app existed, and for whom. One or two sentences.",
    approach:
      "How the product was shaped: the architecture, the trade-offs, the moments that needed the most care.",
    media: placeholderMedia(2),
    highlights: [
      { value: "−40%", label: "Checkout time" },
      { value: "99.9%", label: "Crash-free sessions" },
      { value: "3", label: "Platforms, one team" },
    ],
    decisions: [
      {
        title: "Optimistic UI",
        body: "Transfers render immediately and reconcile in the background.",
      },
      {
        title: "Biometric auth",
        body: "Face ID and fingerprint gates on every sensitive action.",
      },
    ],
    links: { appStore: "#", playStore: "#", live: "#" },
  },
  {
    slug: "project-three", // TODO
    title: "Project Three",
    tagline: "A native companion, rebuilt",
    description:
      "A native rebuild of an existing product. Placeholder copy until the real case study lands.",
    year: "2024",
    role: "iOS & Android developer",
    platforms: ["iOS", "Android"],
    stack: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "GraphQL"],
    accent: "#f9a8d4",
    cover: { mobile: { kind: "mobile", caption: "Cover" } },
    problem:
      "What was broken, slow or missing before this app existed, and for whom. One or two sentences.",
    approach:
      "How the product was shaped: the architecture, the trade-offs, the moments that needed the most care.",
    media: placeholderMedia(3),
    highlights: [
      { value: "2×", label: "Faster cold start" },
      { value: "−35%", label: "Bundle size" },
      { value: "4.7★", label: "Play Store rating" },
    ],
    decisions: [
      {
        title: "Go native",
        body: "SwiftUI and Compose for the interactions a cross-platform layer couldn't match.",
      },
      {
        title: "Shared contracts",
        body: "A typed GraphQL schema keeps both apps in lockstep.",
      },
    ],
    links: { appStore: "#", playStore: "#", github: "#" },
  },
];

export const skills = [
  // TODO
  {
    title: "Cross-platform",
    items: ["Flutter", "Dart", "React Native", "Expo"],
  },
  { title: "Native", items: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose"] },
  {
    title: "Architecture & state",
    items: [
      "Clean architecture",
      "Riverpod / Bloc",
      "Redux / Zustand",
      "Offline-first",
    ],
  },
  {
    title: "Backend & data",
    items: ["Firebase", "Supabase", "REST & GraphQL", "Push notifications"],
  },
  {
    title: "Shipping",
    items: [
      "CI/CD",
      "Fastlane",
      "App Store Connect",
      "Play Console",
      "Testing",
    ],
  },
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
  { n: "003", label: "experience", href: "/#experience" },
  { n: "004", label: "contact", href: "/#contact" },
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
