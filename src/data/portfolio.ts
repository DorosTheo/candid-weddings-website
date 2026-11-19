import { portfolioMedia, type MediaAsset } from "./media";

/**
 * Portfolio photographs, in display order. Edit the list in media.ts
 * (portfolioMedia) or replace this array with a hand-picked selection.
 */
export const portfolioImages: MediaAsset[] = portfolioMedia;

export type Film = {
  title: string;
  /** e.g. "Limassol, Cyprus" — leave empty until confirmed */
  caption?: string;
  poster: MediaAsset;
  /** Vimeo or YouTube URL, or a self-hosted /videos/*.mp4 path. */
  video?: string;
  placeholder?: boolean;
};
