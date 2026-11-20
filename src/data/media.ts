/**
 * MEDIA REGISTRY
 * ----------------------------------------------------------------------------
 * Every image used on the website is declared here, once.
 *
 * To replace a placeholder with a real photograph:
 *   1. Export the photo as a high-quality JPG (long edge 2400–3000px, sRGB).
 *   2. Save it at exactly the `src` path below (inside /public), overwriting the
 *      placeholder file.
 *   3. Update `width` / `height` to the real pixel size, write a descriptive
 *      `alt`, and set `placeholder: false`.
 *
 * Next.js converts every image to AVIF/WebP at the right size automatically,
 * so there is no need to export multiple sizes.
 *
 * See ASSETS.md for the full checklist of photographs needed.
 * ----------------------------------------------------------------------------
 * NOTE: This file is also read by `scripts/generate-placeholders.ts`, so keep
 * it free of path aliases and runtime imports.
 */

export type MediaAsset = {
  /** Path inside /public */
  src: string;
  width: number;
  height: number;
  /** Descriptive alternative text (SEO + accessibility). */
  alt: string;
  /** Optional focal point for object-position, e.g. "50% 30%". */
  focus?: string;
  /** True while the file is a generated placeholder. */
  placeholder?: boolean;
};

const L = { width: 2400, height: 1600 }; // landscape 3:2
const P = { width: 1600, height: 2000 }; // portrait 4:5
const T = { width: 1500, height: 2250 }; // tall portrait 2:3
const W = { width: 2400, height: 1200 }; // wide 2:1
const M = { width: 1080, height: 1920 }; // mobile hero 9:16

function ph(src: string, size: { width: number; height: number }, alt: string): MediaAsset {
  return { src, ...size, alt, placeholder: true };
}

export const media = {
  /* --------------------------------------------------------------- HOMEPAGE */
  homeHero: ph("/images/homepage/homepage-hero.jpg", L, "Bride and groom sharing a candid moment on their wedding day in Cyprus"),
  homeHeroMobile: ph("/images/homepage/homepage-hero-mobile.jpg", M, "Bride and groom sharing a candid moment on their wedding day in Cyprus"),
  homeFilm: ph("/images/homepage/homepage-film-poster.jpg", L, "Still frame from a cinematic wedding film by Candid Weddings Co."),

  /* --------------------------------------------------------------- FOUNDERS */
  founders: ph("/images/founders/about-founders.jpg", P, "Doros and George, the photographers and filmmakers behind Candid Weddings Co."),
  foundersWide: ph("/images/founders/about-founders-wide.jpg", L, "Doros and George photographing a wedding in Cyprus"),
  doros: ph("/images/founders/founder-doros.jpg", T, "Portrait of Doros, co-founder of Candid Weddings Co."),
  george: ph("/images/founders/founder-george.jpg", T, "Portrait of George, co-founder of Candid Weddings Co."),

  /* ------------------------------------------------------------------ ABOUT */
  aboutApproach: ph("/images/about/about-approach.jpg", L, "Candid moment between wedding guests"),

  /* ------------------------------------------------------------- EXPERIENCE */
  experienceSide: ph("/images/experience/experience-process.jpg", T, "Couple laughing together during their wedding day"),
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

/* -------------------------------------------------------- GALLERY PHOTOGRAPHS
 * Ordered list of photographs for the Gallery's "Photographs" view. Mix orientations freely — the
 * editorial layout engine arranges them automatically.
 */
const photoShapes = [L, T, P, W, P, L, T, L, P, T, W, P, L, T, P, L, T, W];
export const galleryPhotoMedia: MediaAsset[] = photoShapes.map((size, i) => {
  const n = String(i + 1).padStart(2, "0");
  return ph(`/images/gallery/photo-${n}.jpg`, size, `Wedding photograph ${n} by Candid Weddings Co.`);
});

/* ------------------------------------------------------- WEDDING STORY MEDIA
 * Helper used by src/data/weddings.ts to declare placeholder galleries.
 */
const galleryShapes = [W, T, P, L, T, P, L, W, P, T];
export function weddingPlaceholderMedia(folder: string) {
  return {
    cover: ph(`/images/weddings/${folder}/cover.jpg`, L, "Wedding story cover photograph"),
    coverMobile: ph(`/images/weddings/${folder}/cover-mobile.jpg`, M, "Wedding story cover photograph"),
    gallery: galleryShapes.map((size, i) => {
      const n = String(i + 1).padStart(2, "0");
      return ph(`/images/weddings/${folder}/gallery-${n}.jpg`, size, `Wedding story photograph ${n}`);
    }),
  };
}

/** Folder names for the sample wedding stories (see weddings.ts). */
export const sampleWeddingFolders = ["wedding-story-01", "wedding-story-02", "wedding-story-03", "wedding-story-04"];

/** Every asset, for tooling (placeholder generation, audits). */
export function allMedia(): MediaAsset[] {
  return [
    ...Object.values(media),
    ...galleryPhotoMedia,
    ...sampleWeddingFolders.flatMap((f) => {
      const m = weddingPlaceholderMedia(f);
      return [m.cover, m.coverMobile, ...m.gallery];
    }),
  ];
}
