"use client";

import { useCallback, useState } from "react";
import type { MediaAsset } from "@/data/media";
import { Photo } from "@/components/media/Photo";
import { Lightbox } from "./Lightbox";

/**
 * Editorial layout engine.
 * Photographs are shown at their natural proportions (never cropped) and
 * arranged in a repeating sequence of magazine-style spreads: full-bleed,
 * asymmetric pairs, offset singles and staggered trios. Add or remove images
 * freely — the layout adapts.
 */

type Slot = { col: string; offset?: string; sizes: string };
type Spread = { take: number; wrap: string; slots: Slot[] };

const isWide = (a: MediaAsset) => a.width / a.height >= 1.7;

// Column spans for a 12-col grid (desktop). On phones every slot becomes a
// single column with alternating widths for rhythm.
const spreads: Spread[] = [
  {
    take: 2,
    wrap: "items-end",
    slots: [
      { col: "md:col-span-7", sizes: "(min-width: 768px) 58vw, 100vw" },
      { col: "md:col-span-4 md:col-start-9", sizes: "(min-width: 768px) 33vw, 80vw" },
    ],
  },
  {
    take: 1,
    wrap: "",
    slots: [{ col: "md:col-span-6 md:col-start-6", sizes: "(min-width: 768px) 50vw, 100vw" }],
  },
  {
    take: 2,
    wrap: "items-start",
    slots: [
      { col: "md:col-span-5 md:col-start-2", sizes: "(min-width: 768px) 42vw, 100vw" },
      { col: "md:col-span-5 md:col-start-8", offset: "md:mt-[22vh]", sizes: "(min-width: 768px) 42vw, 80vw" },
    ],
  },
  {
    take: 3,
    wrap: "items-start",
    slots: [
      { col: "md:col-span-4", sizes: "(min-width: 768px) 33vw, 100vw" },
      { col: "md:col-span-4", offset: "md:mt-[14vh]", sizes: "(min-width: 768px) 33vw, 80vw" },
      { col: "md:col-span-4", sizes: "(min-width: 768px) 33vw, 100vw" },
    ],
  },
];

type Row = { kind: "wide"; items: number[] } | { kind: "spread"; spread: Spread; items: number[] };

function buildRows(images: MediaAsset[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  let s = 0;
  while (i < images.length) {
    if (isWide(images[i])) {
      rows.push({ kind: "wide", items: [i] });
      i++;
      continue;
    }
    const spread = spreads[s % spreads.length];
    s++;
    const items: number[] = [];
    while (items.length < spread.take && i < images.length && !isWide(images[i])) items.push(i++);
    rows.push({ kind: "spread", spread, items });
  }
  return rows;
}

export function EditorialGallery({ images, title }: { images: MediaAsset[]; title?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const rows = buildRows(images);

  const tile = (index: number, sizes: string) => (
    <button
      type="button"
      onClick={() => setActive(index)}
      className="group block w-full cursor-zoom-in text-left"
      aria-label={`Open photograph ${index + 1} of ${images.length}: ${images[index].alt}`}
    >
      <Photo
        asset={images[index]}
        sizes={sizes}
        eager={index < 2}
        imgClassName="transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.025]"
      />
    </button>
  );

  return (
    <>
      <div className="space-y-[clamp(3.5rem,2rem+7vw,10rem)]">
        {rows.map((row, r) =>
          row.kind === "wide" ? (
            <div key={r}>{tile(row.items[0], "100vw")}</div>
          ) : (
            <div key={r} className={`grid grid-cols-12 gap-y-[clamp(3.5rem,2rem+7vw,10rem)] md:gap-x-8 ${row.spread.wrap}`}>
              {row.items.map((index, k) => {
                const slot = row.spread.slots[k];
                // Mobile rhythm: alternate full width / inset left / inset right.
                const mobile = ["col-span-12", "col-span-10 col-start-3", "col-span-10"][(r + k) % 3];
                return (
                  <div key={index} className={`${mobile} ${slot.col} ${slot.col.includes("md:col-start") ? "" : "md:col-start-auto"} ${slot.offset ?? ""}`}>
                    {tile(index, slot.sizes)}
                  </div>
                );
              })}
            </div>
          ),
        )}
      </div>
      <Lightbox images={images} index={active} onClose={close} onIndexChange={setActive} title={title} />
    </>
  );
}
