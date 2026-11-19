export type NavItem = { label: string; href: string };

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Real Weddings", href: "/real-weddings" },
  { label: "The Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

/** Routes whose first section is a full-bleed photograph (header sits on top in white). */
export const overlayHeaderRoutes = ["/", "/real-weddings"];
export const overlayHeaderPrefixes = ["/real-weddings/"];
