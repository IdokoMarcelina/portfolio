# Idoko Marcelina — Portfolio

Mobile developer portfolio built with Next.js 16, Tailwind CSS 4, GSAP and Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Content

All copy lives in `lib/data.ts`, and every file (videos, screenshots, portrait, CV) goes in `public/`.
**See [CONTENT.md](./CONTENT.md)** for how to replace the placeholder data and add screen recordings.

## Structure

```
app/                 routes: home, /work/[slug] case studies, 404, OG image, sitemap, robots
components/home/     hero, about, pinned project chapters, skills / experience / contact
components/work/     case-study gallery + lightbox
components/media/    phone & browser mockups, lazy autoplaying video
components/layout/   nav, dock, preloader, route-transition curtain
lib/data.ts          all site content
```
