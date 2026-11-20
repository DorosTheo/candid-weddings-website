"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/data/media";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen photograph viewer.
 *  - Previous / next buttons, arrow keys, Escape to close
 *  - Swipe left / right on touch screens
 *  - Focus is trapped while open and returned to the thumbnail on close
 *  - Neighbouring images are preloaded for instant navigation
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  title,
}: {
  images: MediaAsset[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  title?: string;
}) {
  const open = index !== null;
  const [direction, setDirection] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDirection(delta);
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbar}px`;
    const t = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 50);

    return () => {
      window.clearTimeout(t);
      body.style.overflow = "";
      body.style.paddingRight = "";
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
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
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  const current = index !== null ? images[index] : null;
  const neighbours = index !== null ? [images[(index + 1) % count], images[(index - 1 + count) % count]] : [];

  return (
    <AnimatePresence>
      {open && current && (
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title ? `${title} — photo viewer` : "Photo viewer"}
          className="fixed inset-0 z-[90] flex flex-col bg-[#0e0e0d] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between md:h-20">
            <p className="eyebrow tabular-nums text-white/70" aria-live="polite">
              {String(index! + 1).padStart(2, "0")} <span className="mx-2 text-white/35">/</span> {String(count).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              className="-mr-3 flex min-h-11 items-center gap-3 px-3 eyebrow text-white/85 transition-colors hover:text-white"
            >
              Close <X aria-hidden strokeWidth={1.25} className="size-5" />
            </button>
          </div>

          <div
            className="relative flex-1 touch-pan-y select-none"
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") touch.current = { x: e.clientX, y: e.clientY };
            }}
            onPointerUp={(e) => {
              const start = touch.current;
              touch.current = null;
              if (!start) return;
              const dx = e.clientX - start.x;
              const dy = e.clientY - start.y;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
            }}
            onPointerCancel={() => (touch.current = null)}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.div
                key={current.src}
                custom={direction}
                className="absolute inset-0 mx-3 md:mx-24 lg:mx-32"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  quality={85}
                  preload
                  className="object-contain"
                  draggable={false}
                />
              </m.div>
            </AnimatePresence>

            {/* Preload neighbours */}
            <div aria-hidden className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
              {neighbours.map((img) => (
                <Image key={img.src} src={img.src} alt="" width={img.width} height={img.height} sizes="100vw" quality={85} loading="eager" />
              ))}
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photograph"
                  className="absolute top-1/2 left-2 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white md:flex lg:left-6"
                >
                  <ArrowLeft aria-hidden strokeWidth={1} className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photograph"
                  className="absolute top-1/2 right-2 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white md:flex lg:right-6"
                >
                  <ArrowRight aria-hidden strokeWidth={1} className="size-6" />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="container-x flex h-20 shrink-0 items-center justify-between md:hidden">
              <button type="button" onClick={() => go(-1)} className="flex min-h-12 items-center gap-3 eyebrow text-white/80">
                <ArrowLeft aria-hidden strokeWidth={1.25} className="size-5" /> Prev
              </button>
              <p className="eyebrow text-white/40">Swipe</p>
              <button type="button" onClick={() => go(1)} className="flex min-h-12 items-center gap-3 eyebrow text-white/80">
                Next <ArrowRight aria-hidden strokeWidth={1.25} className="size-5" />
              </button>
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
}
