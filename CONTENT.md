# Content guide: real data and videos

Everything on the site is placeholder until you replace it. All the copy lives in **one file**, `lib/data.ts`, and every file (videos, images, CV) goes in **`public/`**. You shouldn't need to touch any component.

To list every placeholder still left:

```bash
grep -n "TODO" lib/data.ts
```

When `grep` finds nothing, and every `Project One`, `Company Name` and `#` link is gone, the content is done.

---

## 1. Checklist

| What | Where | Notes |
| --- | --- | --- |
| Domain | `profile.url` | Full origin, no trailing slash: `https://example.com`. Used for metadata, `sitemap.xml` and `robots.txt`. |
| Tagline | `profile.tagline` | One line. Shows in the hero and as the site's meta description. |
| Role pills | `profile.roles` | 3–5 short words. These are the pills under the big name. |
| Bio | `profile.bio` | 1–3 paragraphs. Each paragraph must be unique (the text is used as its key). |
| Email | `profile.email` | Used by every "click to copy" button. |
| Booking link | `profile.calendar` | A Cal.com or Calendly URL. "Schedule a call" and "Hire me" use it. |
| CV | `profile.cv` | Put the file at `public/cv.pdf`, then set `cv: "/cv.pdf"`. The dock's CV button stays hidden while this is unset. |
| Portrait | `profile.portrait` | Put the file at `public/portrait.jpg`, then set `portrait: "/portrait.jpg"`. See [§5](#5-portrait). |
| Location | `profile.location` | Shows in the hero eyebrow. |
| Availability | `profile.available` | `false` hides the green "Available" dot in the dock. |
| Socials | `socials` | Swap in real profile URLs. Delete any row you don't use. |
| Projects | `projects` | See [§2](#2-projects). |
| Skills | `skills` | Groups of `{ title, items }`. Any number of groups and items. |
| Experience | `experience` | Newest first. `note` is optional: an empty string hides it. |
| Education | `education` | Same shape as experience. |

The name (`name`, `first`, `last`) is already real. `first` and `last` are the two lowercase words in the giant hero name and the social preview image.

---

## 2. Projects

Each entry in `projects` becomes a pinned chapter on the home page, a tile in the About section, and a full case study at `/work/<slug>`. You can have any number of projects. The scroll animation, counters and "next project" link adapt to the count.

```ts
{
  slug: "spendwise",                 // URL: /work/spendwise. Lowercase, hyphens, unique.
  title: "Spendwise",
  tagline: "Budgeting that sticks",  // One short line under the title
  description: "…",                  // 1–2 sentences for the home page chapter
  year: "2025",
  role: "Lead mobile engineer",
  platforms: ["iOS", "Android"],     // Any of "iOS" | "Android" | "Web"
  stack: ["Flutter", "Riverpod", "Firebase"],
  accent: "#7dd3fc",                 // MUST be a 6-digit hex, see below
  cover: {
    mobile:  { kind: "mobile",  src: "/media/spendwise/cover-mobile.mp4",  poster: "/media/spendwise/cover-mobile.jpg",  caption: "Cover" },
    desktop: { kind: "desktop", src: "/media/spendwise/cover-desktop.mp4", poster: "/media/spendwise/cover-desktop.jpg", caption: "Cover" }, // optional
  },
  problem: "…",                      // Case study §01: 1–2 sentences
  approach: "…",                     // Case study §02: 2–4 sentences
  media: [ /* gallery screens, see §3 */ ],
  highlights: [                      // Exactly 3 fit the grid best
    { value: "4.8★", label: "App Store rating" },
  ],
  decisions: [                       // Any number
    { title: "Offline-first", body: "…" },
  ],
  links: { appStore: "https://apps.apple.com/…", playStore: "https://play.google.com/…" },
}
```

Things that will break or look wrong if you miss them:

- **`accent` must be a 6-digit hex** like `#7dd3fc`. The code appends two alpha digits to it (`#7dd3fc30`), so `#7cf`, `rgb(…)` or a colour name will silently stop the glow from showing. Pick the app's brand colour. It tints that project's tiles, stage and placeholder screens.
- **`links`: delete any key you don't have.** Only links that are present get shown. The placeholder `"#"` values open a blank tab, so don't leave them in. You can use `appStore`, `playStore`, `live` (website) and `github`.
- **`slug` is the URL.** Changing it later breaks links people have shared.
- **No `cover.desktop`?** Leave it out and the phone sits centred on the stage by itself. That's the right choice for mobile-only apps.
- **No numbers for `highlights` yet?** Use honest qualitative ones ("2 platforms", "1 codebase", "v1 → v3") rather than made-up metrics.

### Copy that's still in components

Two lines of copy live in the components rather than `data.ts`. Update them if they no longer fit:

- `components/home/Projects.tsx`: the section aside says *"Three apps, start to store."* Change it if you don't have three projects.
- `components/home/Sections.tsx`: the Contact heading *"Have an app in mind? Let's ship it."*

### Remove the placeholder helper

Once each project has its own `media` array, delete the `placeholderMedia` function near the top of `lib/data.ts`.

---

## 3. Adding videos (and screenshots)

### Where each video appears

| Field | Shown in | Frame |
| --- | --- | --- |
| `cover.mobile` | Home "Selected work" tile, home chapter stage, case-study hero stage | Phone |
| `cover.desktop` (optional) | Behind the phone on both stages | Browser window |
| `media[]` | Case-study "Key screens" gallery + Enlarge lightbox | Phone for `kind: "mobile"`, full-width browser for `kind: "desktop"` |

Every item is a `Media` object:

```ts
{ kind: "mobile", src: "/media/spendwise/onboarding.mp4", poster: "/media/spendwise/onboarding.jpg", caption: "Onboarding in three taps." }
```

- `src`: a video (`.mp4`, `.webm`) or a still image (`.png`, `.jpg`, `.webp`, `.avif`). Paths start with `/` and are relative to `public/`. Leave `src` out to keep the animated "recording soon" placeholder.
- `poster`: the image shown before a video loads. Optional, but strongly recommended (see below). It's ignored for images.
- `caption`: one sentence about what the screen shows. It's used as the gallery caption and as the accessible label.

The `cover` fields need a caption too, but it's only read by screen readers, so something like `"Spendwise home screen"` is enough.

### Folder layout

One folder per project, named after its slug:

```
public/
  cv.pdf
  portrait.jpg
  media/
    spendwise/
      cover-mobile.mp4      cover-mobile.jpg
      cover-desktop.mp4     cover-desktop.jpg
      onboarding.mp4        onboarding.jpg
      home.mp4              home.jpg
      dashboard.png         ← a still screenshot works too
```

### How videos behave

Videos are always **muted, looping and inline**, with no controls, like an animated screenshot. They don't download until they're about 600px from the viewport, and they only play while visible. On the pinned home section only the active chapter plays. Visitors with *reduced motion* turned on see the poster frame and the video never plays, which is one more reason to always add a poster.

### Recording

- **iOS**: Control Centre → Screen Recording. Turn on Do Not Disturb first and set the clock to 9:41 if you want it tidy. Simulator: `xcrun simctl io booted recordVideo raw.mov`.
- **Android**: the Quick Settings screen recorder, or `adb shell screenrecord /sdcard/raw.mp4` then `adb pull /sdcard/raw.mp4`. Turn on Demo Mode (Developer options) for a clean status bar.
- **Web / desktop**: record just the browser viewport, not the whole screen. Aim for a 16:10 window (e.g. 1440×900).

Tips:

- Keep each clip to **6–15 seconds** and one idea: one flow, one gesture, one transition.
- Make the last frame look like the first so the loop is seamless, or end on a still moment.
- Move slowly. Fast scrolling turns to mush once it's compressed.
- Use realistic demo data. Never show real users' personal information.

### Frame shapes (what gets cropped)

Videos fill their frame with `object-cover`, so anything that doesn't match the frame's shape gets cropped from the edges. Images are pinned to the top and cropped from the bottom.

- **Phone frame: 9 : 19.5.** Modern iPhone recordings (1179×2556 etc.) match exactly. Taller Android recordings lose a sliver top and bottom, which is fine. Don't record landscape.
- **Browser frame: 16 : 10.** A 1440×900 or 1280×800 capture matches exactly. 16:9 captures lose a little on the left and right.

### Compressing (do this every time)

Raw screen recordings are huge: 50–200 MB with audio. Shrink them with [ffmpeg](https://ffmpeg.org/) (`brew install ffmpeg`, `sudo apt install ffmpeg`, or `winget install ffmpeg`):

```bash
# Phone clip → 720px wide, 30fps, no audio, H.264, streams immediately
ffmpeg -i raw.mov -an -vf "scale=720:-2,fps=30" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  public/media/spendwise/onboarding.mp4

# Desktop clip → 1600px wide
ffmpeg -i raw.mov -an -vf "scale=1600:-2,fps=30" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  public/media/spendwise/cover-desktop.mp4

# Trim while you're at it: keep 00:02 → 00:14
ffmpeg -ss 2 -to 14 -i raw.mov -an -vf "scale=720:-2,fps=30" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  public/media/spendwise/home.mp4
```

What the flags do: `-an` strips audio (the player is always muted). `-pix_fmt yuv420p` makes it play in Safari and on iOS. `-movflags +faststart` lets it start playing before it has fully downloaded.

**Size targets:** about 1–3 MB per phone clip, 3–6 MB per desktop clip. If a file comes out bigger, raise `-crf` (28 or 30 makes it smaller and slightly softer) or trim it shorter.

### Poster frames

Grab a frame from about half a second in, from the *compressed* file:

```bash
ffmpeg -ss 0.5 -i public/media/spendwise/onboarding.mp4 -frames:v 1 -q:v 3 \
  public/media/spendwise/onboarding.jpg
```

### Batch: a whole folder at once

Drop the raw recordings for one project into a folder, then:

```bash
# Usage: ./encode.sh raw/spendwise spendwise
in="$1"; slug="$2"; out="public/media/$slug"; mkdir -p "$out"
for f in "$in"/*.{mov,mp4,MOV,MP4}; do
  [ -e "$f" ] || continue
  name=$(basename "${f%.*}")
  ffmpeg -y -i "$f" -an -vf "scale='min(720,iw)':-2,fps=30" \
    -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "$out/$name.mp4"
  ffmpeg -y -ss 0.5 -i "$out/$name.mp4" -frames:v 1 -q:v 3 "$out/$name.jpg"
done
```

Use `scale='min(1600,iw)':-2` instead for desktop recordings.

### Wire them up

```ts
media: [
  { kind: "mobile",  src: "/media/spendwise/onboarding.mp4", poster: "/media/spendwise/onboarding.jpg", caption: "Onboarding in three taps, skippable at every step." },
  { kind: "mobile",  src: "/media/spendwise/home.mp4",       poster: "/media/spendwise/home.jpg",       caption: "Home: this month's spend at a glance." },
  { kind: "desktop", src: "/media/spendwise/dashboard.png",                                              caption: "Web dashboard on the same API." },
],
```

In the gallery, phone screens sit three per row on desktop and two per row on mobile. Each `desktop` item spans the full width. **4–8 screens** per project is the sweet spot.

### Screenshots instead of videos

Any `src` ending in `.png`, `.jpg`, `.webp` or `.avif` renders as a still through `next/image`, which resizes and optimises it automatically. Export phone screenshots at about 1170px wide and desktop ones at about 2400px wide. You can mix videos and images freely.

### Lots of video? Host it elsewhere

`public/` is committed to git, so dozens of videos will bloat the repo. If the media folder grows past roughly 100 MB, put the videos on a storage bucket or CDN (Cloudflare R2, Bunny, S3) and use the full URL as `src`:

```ts
src: "https://media.example.com/spendwise/onboarding.mp4"
```

That works as-is for videos. Remote **images** also need their host added to `images.remotePatterns` in `next.config.ts`.

---

## 4. CV

1. Export the CV as a PDF and save it as `public/cv.pdf`.
2. In `lib/data.ts`, set `cv: "/cv.pdf"`.

The dock's CV button appears once that's set, and clicking it downloads the file.

## 5. Portrait

- **Shape: 4 : 5 portrait** (e.g. 1200×1500). It's cropped to fill that frame.
- It's shown **in greyscale**, so pick a photo with good contrast and a plain background.
- Save it as `public/portrait.jpg` and set `portrait: "/portrait.jpg"`. Next.js resizes and optimises it, so a high-quality JPG under about 2 MB is fine.

## 6. Things that update themselves

- **Social preview image** (`app/opengraph-image.tsx`): generated from `profile.role`, `first` and `last`.
- **Page titles and descriptions**: built from `profile` and each project's `tagline` and `description`.
- **`sitemap.xml` and `robots.txt`**: built from `profile.url` and the project slugs.
- **Favicon**: `app/icon.svg`. Replace that file if you want a different one.

## 7. Check your work

```bash
npm run dev     # http://localhost:3000. Check every page, on a phone-width window too
npm run build   # must finish without errors before you deploy
```

Things to look at:

- Every video plays in Safari (iOS) as well as Chrome. If one shows only a black frame, re-encode it with the `ffmpeg` command above.
- With reduced motion turned on, each video shows its poster rather than a blank frame.
- Every store, social and booking link goes to the right place.
- The case-study pages read well with real text: `problem` and `approach` are shown large, so keep them tight.
