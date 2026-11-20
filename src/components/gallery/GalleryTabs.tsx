"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { MediaAsset } from "@/data/media";
import type { Wedding } from "@/data/weddings";
import { Photo } from "@/components/media/Photo";
import { VideoFacade } from "@/components/media/VideoFacade";
import { StoryCaption } from "@/components/sections/shared/WeddingCaption";
import { EditorialGallery } from "./EditorialGallery";

type Tab = "weddings" | "photographs" | "film";

/**
 * Gallery: wedding stories, photographs and film on one page, switched by
 * three quiet text tabs. The active tab is mirrored in the URL hash
 * (/gallery#photographs) so it can be linked to directly.
 */
export function GalleryTabs({
  weddings,
  photos,
  films,
}: {
  weddings: Wedding[];
  photos: MediaAsset[];
  films: { title: string; caption: string; poster: MediaAsset; url?: string; href?: string }[];
}) {
  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "weddings", label: "Weddings", count: weddings.length },
    { id: "photographs", label: "Photographs", count: photos.length },
    { id: "film", label: "Film", count: films.length },
  ];
  const [active, setActive] = useState<Tab>("weddings");
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ weddings: null, photographs: null, film: null });

  useEffect(() => {
    const read = () => {
      const hash = window.location.hash.slice(1) as Tab;
      if (tabs.some((t) => t.id === hash)) setActive(hash);
    };
    const id = requestAnimationFrame(read);
    window.addEventListener("hashchange", read);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("hashchange", read);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (id: Tab, focus = false) => {
    setActive(id);
    window.history.replaceState(null, "", id === "weddings" ? window.location.pathname : `#${id}`);
    if (focus) refs.current[id]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length].id, true);
    else if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length].id, true);
    else if (e.key === "Home") select(tabs[0].id, true);
    else if (e.key === "End") select(tabs[tabs.length - 1].id, true);
    else return;
    e.preventDefault();
  };

  return (
    <>
      <div role="tablist" aria-label="Gallery" onKeyDown={onKey} className="flex gap-5 border-b border-line xs:gap-8 md:gap-12">
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el;
              }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(t.id)}
              className={`-mb-px flex min-h-12 items-baseline gap-2 border-b pb-3 eyebrow transition-colors duration-300 ${
                selected ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t.label}
              <sup className="hidden text-[0.6rem] tabular-nums opacity-60 xs:inline">{String(t.count).padStart(2, "0")}</sup>
            </button>
          );
        })}
      </div>

      <div className="pt-[var(--space-block)]">
        <div role="tabpanel" id="panel-weddings" aria-labelledby="tab-weddings" hidden={active !== "weddings"}>
          <ul className="grid gap-x-8 gap-y-[var(--space-block)] md:grid-cols-2">
            {weddings.map((w, i) => (
              <li key={w.slug} className={i % 2 === 1 ? "md:mt-[18vh]" : ""}>
                <Link href={`/gallery/${w.slug}`} className="group block">
                  <Photo
                    asset={w.cover}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    ratio="aspect-[4/5]"
                    imgClassName="transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.02]"
                  />
                  <StoryCaption wedding={w} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div role="tabpanel" id="panel-photographs" aria-labelledby="tab-photographs" hidden={active !== "photographs"}>
          {active === "photographs" && <EditorialGallery images={photos} title="Gallery" />}
        </div>

        <div role="tabpanel" id="panel-film" aria-labelledby="tab-film" hidden={active !== "film"}>
          {active === "film" && (
            <ul className="space-y-[var(--space-block)]">
              {films.map((f) => (
                <li key={f.poster.src}>
                  <VideoFacade poster={f.poster} url={f.url} title={f.title} sizes="100vw" ratio="aspect-[4/5] sm:aspect-video" />
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-serif text-[1.35rem] leading-tight">{f.title}</h3>
                    {f.href ? (
                      <Link href={f.href} className="eyebrow link-underline-in text-muted">
                        {f.caption}
                      </Link>
                    ) : (
                      <p className="eyebrow text-muted">{f.caption}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
