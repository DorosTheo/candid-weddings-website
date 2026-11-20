import type { Wedding } from "@/data/weddings";

/** One-line caption under a story image: couple on the left, place & year on the right. */
export function StoryCaption({ wedding, className = "" }: { wedding: Wedding; className?: string }) {
  return (
    <div className={`mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 ${className}`}>
      <h3 className="font-serif text-[1.35rem] leading-tight group-hover:italic">{wedding.couple}</h3>
      <p className="eyebrow text-muted">
        {wedding.location} · {wedding.year}
      </p>
    </div>
  );
}
