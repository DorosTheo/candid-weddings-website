import type { Metadata } from "next";
import { site } from "@/data/site";
import type { MediaAsset } from "@/data/media";
import type { Wedding } from "@/data/weddings";

const defaultOg = { url: "/brand/og-default.jpg", width: 1200, height: 630, alt: site.name };

/** Builds consistent per-page metadata: title, description, canonical URL, Open Graph & Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
}: {
  title?: string;
  description: string;
  path: string;
  image?: MediaAsset;
  noindex?: boolean;
}): Metadata {
  const ogImage = image ? { url: image.src, width: image.width, height: image.height, alt: image.alt } : defaultOg;
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — Wedding Photographer & Videographer in Cyprus`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ---------------------------------------------------------- structured data */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    image: `${site.url}/brand/og-default.jpg`,
    logo: `${site.url}/icon.svg`,
    sameAs: [site.instagram.url],
    areaServed: [
      { "@type": "Country", name: "Cyprus" },
      { "@type": "Place", name: "Worldwide (destination weddings)" },
    ],
    address: { "@type": "PostalAddress", addressCountry: "CY" },
    founder: site.founders.map((name) => ({ "@type": "Person", name })),
    knowsAbout: ["Wedding photography", "Wedding cinematography", "Destination weddings", "Documentary wedding photography"],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Photography", areaServed: "Cyprus" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Cinematography", areaServed: "Cyprus" } },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function weddingJsonLd(w: Wedding) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${w.couple} — ${w.location}`,
    description: w.excerpt,
    url: `${site.url}/real-weddings/${w.slug}`,
    author: { "@id": `${site.url}/#business` },
    contentLocation: { "@type": "Place", name: w.location },
    image: [w.cover, ...w.gallery.slice(0, 8)].map((img) => `${site.url}${img.src}`),
  };
}
