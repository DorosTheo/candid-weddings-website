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
  // Common alternative paths → new canonical pages
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/the-experience", destination: "/experience", permanent: true },
  { source: "/gallery", destination: "/portfolio", permanent: true },
  { source: "/work", destination: "/portfolio", permanent: true },
  { source: "/weddings", destination: "/real-weddings", permanent: true },
  { source: "/weddings/:slug", destination: "/real-weddings/:slug", permanent: true },
  { source: "/home", destination: "/", permanent: true },
  // TODO: add the old site's actual URLs once they have been exported, e.g.
  // { source: "/blog/anna-and-chris", destination: "/real-weddings/anna-and-chris", permanent: true },
];
