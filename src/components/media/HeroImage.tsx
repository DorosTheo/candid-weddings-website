import { getImageProps } from "next/image";
import type { MediaAsset } from "@/data/media";

/**
 * Art-directed, full-bleed hero image: a dedicated portrait crop is served to
 * phones and the landscape original to larger screens. Never lazy-loaded —
 * this is the Largest Contentful Paint element.
 */
export function HeroImage({
  desktop,
  mobile,
  className = "",
  quality = 85,
}: {
  desktop: MediaAsset;
  mobile?: MediaAsset;
  className?: string;
  quality?: number;
}) {
  const common = { fill: true, quality, sizes: "100vw", alt: desktop.alt, fetchPriority: "high" as const, loading: "eager" as const };
  const { props: desktopProps } = getImageProps({ ...common, src: desktop.src });
  const mobileSrcSet = mobile ? getImageProps({ ...common, src: mobile.src }).props.srcSet : undefined;

  return (
    <picture>
      {mobileSrcSet && <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is supplied via getImageProps */}
      <img
        {...desktopProps}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        style={{ ...desktopProps.style, objectPosition: desktop.focus }}
      />
    </picture>
  );
}
