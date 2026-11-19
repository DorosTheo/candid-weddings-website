import Link from "next/link";
import type { Wedding } from "@/data/weddings";
import { TextLink } from "@/components/ui/Button";

/** Minimal editorial caption: index, couple, place & year, explore link. */
export function WeddingCaption({ wedding, index, className = "", size = "md" }: { wedding: Wedding; index?: number; className?: string; size?: "md" | "lg" }) {
  const href = `/real-weddings/${wedding.slug}`;
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-baseline gap-4">
        {index !== undefined && <span className="eyebrow text-muted">{String(index + 1).padStart(2, "0")}</span>}
        <h3 className={`font-serif leading-[1.02] tracking-[-0.015em] ${size === "lg" ? "text-h2" : "text-h3"}`}>
          <Link href={href} className="hover:italic">
            {wedding.couple}
          </Link>
        </h3>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-4">
        <p className="eyebrow text-muted">
          {wedding.location} <span aria-hidden>·</span> {wedding.year}
        </p>
        <TextLink href={href} aria-label={`Explore the story of ${wedding.couple}`}>
          Explore story
        </TextLink>
      </div>
    </div>
  );
}
