export type NavItem = { label: string; href: string };

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "The Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

/** Routes whose first section is a full-bleed photograph (header sits on top in white). */
export const overlayHeaderRoutes = ["/"];
/** Wedding story pages (/gallery/<slug>) open on a full-bleed cover photograph. */
export const overlayHeaderPrefixes = ["/gallery/"];
