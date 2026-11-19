"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import type { MediaAsset } from "@/data/media";

/** Converts a Vimeo / YouTube page URL into an embeddable player URL. */
function toEmbed(url: string): { kind: "iframe" | "file"; src: string } {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
  if (vimeo) {
    const hash = vimeo[2] ? `&h=${vimeo[2]}` : "";
    return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1${hash}` };
  }
  return { kind: "file", src: url };
}

/**
 * Lightweight film player: shows a poster and only loads the (heavy) video
 * player when the visitor presses play. If no film URL has been configured
 * yet, it renders as a still image without a play control.
 */
export function VideoFacade({
  poster,
  url,
  title,
  sizes,
  ratio = "aspect-video",
  className = "",
}: {
  poster: MediaAsset;
  url?: string;
  title: string;
  sizes: string;
  ratio?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embed = url ? toEmbed(url) : null;

  return (
    <div className={`group relative overflow-hidden bg-black ${ratio} ${className}`}>
      {playing && embed ? (
        embed.kind === "iframe" ? (
          <iframe
            src={embed.src}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={embed.src} className="absolute inset-0 h-full w-full object-cover" controls autoPlay playsInline />
        )
      ) : (
        <>
          <Image
            src={poster.src}
            alt={poster.alt}
            fill
            sizes={sizes}
            quality={82}
            className="object-cover transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.03]"
          />
          {embed && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/10 text-white transition-colors duration-500 hover:bg-black/25"
              aria-label={`Play film: ${title}`}
            >
              <span className="flex size-20 items-center justify-center rounded-full border border-white/70 backdrop-blur-[2px] transition-transform duration-500 ease-editorial group-hover:scale-110 md:size-24">
                <Play aria-hidden strokeWidth={1} className="ml-1 size-6 fill-white" />
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
