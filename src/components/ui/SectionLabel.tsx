/** Small numbered label used to open editorial sections, e.g. "01 — Selected stories". */
export function SectionLabel({ index, children, className = "" }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-4 text-muted ${className}`}>
      {index && <span className="text-ink">{index}</span>}
      {index && <span aria-hidden className="h-px w-10 bg-current opacity-40" />}
      <span>{children}</span>
    </p>
  );
}
