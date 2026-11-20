"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { mainNavigation, overlayHeaderPrefixes, overlayHeaderRoutes } from "@/data/navigation";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Reads the route (must sit inside <Suspense> under Cache Components). */
export function Header() {
  const pathname = usePathname();
  return <HeaderView pathname={pathname} />;
}

/**
 * Minimal fixed header.
 *  - Over full-bleed photography it starts transparent with white type.
 *  - Once scrolled it becomes a quiet paper bar.
 *  - It tucks away while scrolling down and returns when scrolling up, so it
 *    never competes with the photographs.
 */
export function HeaderView({ pathname }: { pathname: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const overlayRoute =
    !!pathname && (overlayHeaderRoutes.includes(pathname) || overlayHeaderPrefixes.some((p) => pathname.startsWith(p)));
  const overlay = overlayRoute && !scrolled && !menuOpen;

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320);
        lastY = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const first = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the menu whenever the route changes (state adjustment during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setHidden(false);
  }

  const tone = overlay ? "text-white" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500 ease-editorial ${tone} ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          overlay || menuOpen
            ? "border-b border-transparent bg-transparent"
            : "border-b border-line/70 bg-paper/88 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-paper"
        }`}
      >
        {overlay && <div aria-hidden className="scrim-top pointer-events-none absolute inset-x-0 top-0 -z-10 h-40" />}
        <div className="container-x flex h-(--header-h) items-center justify-between gap-6">
          <Link href="/" aria-label="Candid Weddings Co. — home" className="relative z-[60]">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-11">
              {mainNavigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="eyebrow link-underline-in"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            className="relative z-[60] -mr-2 flex min-h-11 items-center gap-3 px-2 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="eyebrow">{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-2.5 w-7">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-editorial ${
                  menuOpen ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px bg-current transition-all duration-500 ease-editorial ${
                  menuOpen ? "top-1/2 w-full -rotate-45" : "top-full w-2/3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
