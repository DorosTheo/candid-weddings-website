import { media, sampleWeddingFolders, weddingPlaceholderMedia, type MediaAsset } from "./media";

/**
 * REAL WEDDINGS
 * ----------------------------------------------------------------------------
 * Each entry automatically gets its own page at /real-weddings/<slug>, a card
 * on the Real Weddings page, a sitemap entry and previous/next navigation.
 *
 * TO ADD A WEDDING
 *   1. Create /public/images/weddings/<slug>/ and add cover.jpg, cover-mobile.jpg
 *      (optional, 9:16 crop) and gallery-01.jpg, gallery-02.jpg, ...
 *   2. Copy one of the objects below, fill it in, set `placeholder: false`.
 *   3. Set `featured: true` to show it on the homepage (first three are used).
 *
 * The sample stories below are PLACEHOLDERS ("Name & Name") — replace them with
 * real weddings. While `placeholder: true` a story is hidden from search
 * engines (noindex) and excluded from the sitemap.
 * ----------------------------------------------------------------------------
 */

export type Wedding = {
  slug: string;
  /** e.g. "Anna & Chris" */
  couple: string;
  /** e.g. "Limassol, Cyprus" */
  location: string;
  year: string;
  /** Optional venue name shown in the details list */
  venue?: string;
  /** "Photography", "Film" or both */
  services: ("Photography" | "Film")[];
  /** One-sentence summary used for cards and meta descriptions */
  excerpt: string;
  /** Longer introduction — each string is a paragraph */
  story: string[];
  cover: MediaAsset;
  coverMobile?: MediaAsset;
  gallery: MediaAsset[];
  /** Vimeo / YouTube URL or /videos/... path */
  film?: { url?: string; poster: MediaAsset };
  featured?: boolean;
  placeholder?: boolean;
};

function sample(index: number): Wedding {
  const folder = sampleWeddingFolders[index];
  const m = weddingPlaceholderMedia(folder);
  return {
    slug: folder,
    couple: "Name & Name",
    location: "Location, Cyprus",
    year: "Year",
    services: ["Photography", "Film"],
    excerpt: "Placeholder story — replace with a one-sentence summary of this wedding.",
    story: [
      "Placeholder introduction. Tell the story of the day in two or three short paragraphs: who the couple are, the setting, the atmosphere, and the moments that made it theirs.",
      "Keep it personal and conversational — the photographs will do most of the talking.",
    ],
    cover: m.cover,
    coverMobile: m.coverMobile,
    gallery: m.gallery,
    film: index < 2 ? { poster: m.gallery[0] } : undefined,
    featured: index < 3,
    placeholder: true,
  };
}

export const weddings: Wedding[] = [sample(0), sample(1), sample(2), sample(3)];

/* ------------------------------------------------------------------ helpers */

export function getWedding(slug: string) {
  return weddings.find((w) => w.slug === slug);
}

export function getFeaturedWeddings(limit = 3) {
  const featured = weddings.filter((w) => w.featured);
  return (featured.length ? featured : weddings).slice(0, limit);
}

export function getAdjacentWeddings(slug: string) {
  const i = weddings.findIndex((w) => w.slug === slug);
  const n = weddings.length;
  return {
    previous: weddings[(i - 1 + n) % n],
    next: weddings[(i + 1) % n],
  };
}

/** Homepage / portfolio showreel. Add a Vimeo or YouTube URL when available. */
export const showreel = {
  url: undefined as string | undefined,
  poster: media.homeFilm,
};
