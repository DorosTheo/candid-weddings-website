"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef } from "react";
import { mainNavigation } from "@/data/navigation";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen editorial menu for phones and tablets: large serif links,
 * contact details always one tap away. Traps focus and closes on Escape.
 */
export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string | null }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbar}px`;

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []).concat(
        Array.from(document.querySelectorAll<HTMLElement>("header a[href], header button")),
      );
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus(), 350);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = focusables();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      body.style.overflow = "";
      body.style.paddingRight = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper text-ink lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.75, ease }}
        >
          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+2rem)] pb-10">
            <ol className="space-y-1">
              {mainNavigation.map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                return (
                  <li key={item.href} className="overflow-hidden">
                    <m.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-1.5"
                      >
                        <span className="eyebrow w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-serif text-[clamp(2.4rem,11vw,4.5rem)] leading-[1.05] tracking-[-0.02em] transition-[font-style] ${
                            active ? "italic" : "group-hover:italic"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </m.div>
                  </li>
                );
              })}
            </ol>
          </nav>

          <m.div
            className="container-x border-t border-line py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <a href={`mailto:${site.email}`} className="caps link-underline block w-fit">
                  {site.email}
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="caps link-underline block w-fit">
                  Instagram {site.instagram.handle}
                </a>
              </div>
              <p className="eyebrow text-muted">{site.availability}</p>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
