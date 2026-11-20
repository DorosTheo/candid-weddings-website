/**
 * Core business details. Update here and the whole site (footer, metadata,
 * structured data, contact page) updates with it.
 */
export const site = {
  name: "Candid Weddings Co.",
  shortName: "Candid Weddings",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.candidweddingsco.com").replace(/\/$/, ""),
  email: "info@candidweddingsco.com",
  instagram: {
    handle: "@candidweddingsco",
    url: "https://www.instagram.com/candidweddingsco/",
  },
  founders: ["Doros", "George"],
  location: "Cyprus",
  availability: "Cyprus & destination weddings worldwide",
  tagline: "Wedding Photography & Cinematography — Cyprus & Worldwide",
  description:
    "Candid Weddings Co. is a wedding photography and cinematography studio in Cyprus, founded by Doros & George. Fashion-inspired, documentary storytelling for couples in Cyprus and destination weddings worldwide.",
} as const;
