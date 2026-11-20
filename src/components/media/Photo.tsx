import Image from "next/image";
import type { MediaAsset } from "@/data/media";
import { ImageReveal } from "./ImageReveal";

type PhotoProps = {
  asset: MediaAsset;
  /** Responsive `sizes` hint — be accurate, it controls download size. */
  sizes: string;
  /** Tailwind aspect ratio class for the frame, e.g. "aspect-[4/5]". Omit to use the image's own ratio. */
  ratio?: string;
  className?: string;
  imgClassName?: string;
  /** Above-the-fold image: preload + no lazy loading + no reveal. */
  preload?: boolean;
  /** Likely visible on load (but not the hero): load immediately, keep the reveal. */
  eager?: boolean;
  reveal?: boolean;
  quality?: number;
  alt?: string;
};

/**
 * Editorial photograph. Always reserves its space (no layout shift), serves
 * AVIF/WebP at the right size and reveals gracefully on scroll.
 */
export function Photo({
  asset,
  sizes,
  ratio,
  className = "",
  imgClassName = "",
  preload = false,
  eager = false,
  reveal = true,
  quality = 82,
  alt,
}: PhotoProps) {
  const image = (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      fill
      sizes={sizes}
      quality={quality}
      preload={preload}
      loading={preload || eager ? "eager" : "lazy"}
      className={`object-cover ${imgClassName}`}
      style={asset.focus ? { objectPosition: asset.focus } : undefined}
    />
  );


  return (
    <div
      className={`relative overflow-hidden bg-paper-deep ${ratio ?? ""} ${className}`}
      style={ratio ? undefined : { aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      {reveal && !preload ? <ImageReveal>{image}</ImageReveal> : image}
    </div>
  );
}
