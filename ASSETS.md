# Asset mapping — photographs, films & brand files

Every image on the site is currently a **clearly labelled placeholder** (a grey
tonal image printed with its file name). Nothing on the site is stock
photography, and no wedding content has been invented.

To go live, replace each file below with a real Candid Weddings Co. photograph
**at exactly the same path**, then update its entry in `src/data/media.ts`
(`width`, `height`, `alt`, and `placeholder: false`).

**Export settings:** JPG, sRGB, long edge 2400–3000px, quality 85–90. Next.js
automatically serves AVIF/WebP at the right size for every screen, so you only
need one master file per image.

> Tip: keep each image's orientation close to the suggested ratio. Most frames
> crop with `object-fit: cover`, while gallery images (Gallery photographs and wedding
> stories) are shown uncropped at whatever ratio you supply.

## Homepage — `public/images/homepage/`

| File | Ratio | Used for | What to choose |
|---|---|---|---|
| `homepage-hero.jpg` | 3:2 landscape | Full-screen opening image (desktop) | Your single strongest frame. A darker lower third keeps the headline legible. |
| `homepage-hero-mobile.jpg` | 9:16 portrait | Opening image on phones | A vertical crop or a different vertical frame. |
| `homepage-film-poster.jpg` | 16:9 | Showreel poster (Gallery → Film) | A still from your showreel. |

The homepage's "Selected weddings" use the first three wedding stories marked `featured: true`.

## Founders — `public/images/founders/`

| File | Ratio | Used for |
|---|---|---|
| `about-founders.jpg` | 4:5 | Homepage "Doros & George" — **genuine photo of you both** |
| `about-founders-wide.jpg` | 3:2 | About page opening image — ✅ **supplied** (Doros & George with cameras) |
| `founder-doros.jpg` | 2:3 | About page portrait of Doros |
| `founder-george.jpg` | 2:3 | About page portrait of George |

## About & Experience

| File | Ratio | Used for |
|---|---|---|
| `about/about-approach.jpg` | 3:2 | About → "Our approach" — a candid moment |
| `experience/experience-process.jpg` | 4:5 | The Experience — image beside the 4 steps |

## Wedding stories — `public/images/weddings/<slug>/`

Each story folder contains `cover.jpg` (3:2), `cover-mobile.jpg` (9:16) and
`gallery-01.jpg` … `gallery-NN.jpg` (any orientation, any number).

The four sample stories (`wedding-story-01` … `04`) are placeholders named
“Name & Name”. **Replace them with real weddings** in `src/data/weddings.ts`
(the file explains how). Until `placeholder: false` is set, a story is hidden
from Google (`noindex`) and excluded from the sitemap.

## Gallery photographs — `public/images/gallery/`

`photo-01.jpg` … `photo-18.jpg` — your best photographs for Gallery →
Photographs, in display order. Any orientation works; very wide images
(≥ 1.7:1) are shown full-width automatically. Add or remove files and update
the list in `src/data/media.ts` (`photoShapes`), or replace `galleryPhotos` in
`src/data/gallery.ts` with a hand-written list.

## Films

No film URLs have been provided yet, so film frames show the poster image
without a play button. To enable playback, paste a Vimeo or YouTube URL:

- Showreel (Gallery → Film): `showreel.url` in `src/data/weddings.ts`
- Per-wedding film: `film: { url: "https://vimeo.com/…", poster: … }` on each wedding

Self-hosted MP4s can go in `public/videos/` (e.g. `/videos/homepage/showreel.mp4`),
but Vimeo/YouTube is recommended for bandwidth and adaptive streaming.

## Brand — `public/brand/`

| File | Status |
|---|---|
| `brand/logo/logo.svg` | **Missing.** The site currently uses a typographic wordmark (`src/components/navigation/Wordmark.tsx`). Supply an SVG logo and it can replace the wordmark. |
| `brand/og-default.jpg` | Generated typographic social-sharing image (1200×630). Replace with a branded photo card if preferred. |
| `src/app/icon.svg` | Simple “C” favicon. Replace with the official mark. |
