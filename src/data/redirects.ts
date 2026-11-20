/**
 * 301 REDIRECTS
 * ----------------------------------------------------------------------------
 * Protects SEO equity from the previous website. Add every legacy URL that no
 * longer exists here (export the old sitemap.xml or check Google Search
 * Console → Pages to get the full list).
 *
 * `permanent: true` issues a 308 (the modern equivalent of a 301, treated
 * identically by Google).
 */
export type Redirect = { source: string; destination: string; permanent: boolean };

export const legacyRedirects: Redirect[] = [
  // Portfolio + Real Weddings were merged into Gallery
  { source: "/portfolio", destination: "/gallery", permanent: true },
  { source: "/real-weddings", destination: "/gallery", permanent: true },
  { source: "/real-weddings/:slug", destination: "/gallery/:slug", permanent: true },
  // Common alternative paths → canonical pages
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/the-experience", destination: "/experience", permanent: true },
  { source: "/work", destination: "/gallery", permanent: true },
  { source: "/weddings", destination: "/gallery", permanent: true },
  { source: "/weddings/:slug", destination: "/gallery/:slug", permanent: true },
  { source: "/home", destination: "/", permanent: true },
  // TODO: add the old site's actual URLs once they have been exported, e.g.
  // { source: "/blog/anna-and-chris", destination: "/gallery/anna-and-chris", permanent: true },
];
