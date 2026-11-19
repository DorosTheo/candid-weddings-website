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
> crop with `object-fit: cover`, while gallery images (portfolio and wedding
> stories) are shown uncropped at whatever ratio you supply.

## Homepage — `public/images/homepage/`

| File | Ratio | Used for | What to choose |
|---|---|---|---|
| `homepage-hero.jpg` | 3:2 landscape | Full-screen opening image (desktop) | Your single strongest, most cinematic frame. Darker lower third keeps the headline legible. |
| `homepage-hero-mobile.jpg` | 9:16 portrait | Opening image on phones | A vertical crop or a different vertical frame. |
| `homepage-intro-01.jpg` | 2:3 portrait | Brand introduction | A quiet, candid moment. |
| `homepage-intro-02.jpg` | 3:2 landscape | Brand introduction | Laughter / guests / atmosphere. |
| `homepage-photography.jpg` | 4:5 portrait | “Photography” service | An editorial portrait. |
| `homepage-film-poster.jpg` | 16:9 landscape | Film poster (play button appears when a film URL is added) | A still from your showreel. |
| `homepage-experience.jpg` | 2:3 portrait | “The Experience” section | Couple, relaxed and natural. |
| `homepage-final-cta.jpg` | 2:1 wide | “Your story deserves…” banner (also reused on several page endings) | Atmospheric, darker image; white text sits on top. |
| `homepage-storytelling.jpg` | 4:5 | Reserved (not currently displayed) | — |

## Founders — `public/images/founders/`

| File | Ratio | Used for |
|---|---|---|
| `about-founders.jpg` | 4:5 | Homepage “Two perspectives” section — **genuine photo of Doros & George together** |
| `about-founders-wide.jpg` | 21:9 / 16:9 | About page opening image — Doros & George at work |
| `founder-doros.jpg` | 2:3 | About → “Meet us” — portrait of Doros |
| `founder-george.jpg` | 2:3 | About → “Meet us” — portrait of George |

## About — `public/images/about/`

| File | Ratio | Used for |
|---|---|---|
| `about-creative-background.jpg` | 4:5 | “Our creative background” — fashion-led editorial frame |
| `about-approach-01.jpg` | 3:2 | “Our approach” — candid moment |
| `about-approach-02.jpg` | 2:3 | “Our approach” — natural portrait |
| `about-philosophy.jpg` | 2:1 | “Our philosophy” — wide, full-bleed |
| `about-storytelling.jpg` | 3:2 | “Our passion for storytelling” — ideally a film still |

## Real Weddings hub — `public/images/weddings/`

| File | Ratio | Used for |
|---|---|---|
| `real-weddings-hero.jpg` | 2:1 wide | Hero (displayed in black & white automatically) |
| `real-weddings-hero-mobile.jpg` | 9:16 | Hero on phones |

## Wedding stories — `public/images/weddings/<slug>/`

Each story folder contains `cover.jpg` (3:2), `cover-mobile.jpg` (9:16) and
`gallery-01.jpg` … `gallery-NN.jpg` (any orientation, any number).

The four sample stories (`wedding-story-01` … `04`) are placeholders named
“Name & Name”. **Replace them with real weddings** in `src/data/weddings.ts`
(the file explains how). Until `placeholder: false` is set, a story is hidden
from Google (`noindex`) and excluded from the sitemap.

## Portfolio — `public/images/portfolio/`

`portfolio-01.jpg` … `portfolio-18.jpg` — your best photographs, in display
order. Any orientation works; very wide images (≥ 1.7:1) are shown full-width
automatically. Add or remove files and update the list in `src/data/media.ts`
(`portfolioShapes`) or replace `portfolioImages` in `src/data/portfolio.ts`
with a hand-written list.

## Experience & contact

| File | Ratio | Used for |
|---|---|---|
| `experience/experience-process.jpg` | 2:3 | Experience page, sticky image beside the 4 steps |
| `experience/experience-closing.jpg` | 2:1 | Experience page closing image |
| `contact/contact.jpg` | 3:2 | Reserved (not currently displayed) |

## Films

No film URLs have been provided yet, so film frames show the poster image
without a play button. To enable playback, paste a Vimeo or YouTube URL:

- Showreel (homepage + portfolio): `showreel.url` in `src/data/weddings.ts`
- Per-wedding film: `film: { url: "https://vimeo.com/…", poster: … }` on each wedding

Self-hosted MP4s can go in `public/videos/` (e.g. `/videos/homepage/showreel.mp4`),
but Vimeo/YouTube is recommended for bandwidth and adaptive streaming.

## Brand — `public/brand/`

| File | Status |
|---|---|
| `brand/logo/logo.svg` | **Missing.** The site currently uses a typographic wordmark (`src/components/navigation/Wordmark.tsx`). Supply an SVG logo and it can replace the wordmark. |
| `brand/og-default.jpg` | Generated typographic social-sharing image (1200×630). Replace with a branded photo card if preferred. |
| `src/app/icon.svg` | Simple “C” favicon. Replace with the official mark. |
