/** Minimal "scroll to discover" indicator with a slow drawing line. */
export function ScrollCue({ href = "#content", className = "", label = "Scroll to discover" }: { href?: string; className?: string; label?: string }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-4 eyebrow ${className}`}>
      <span className="link-underline-in">{label}</span>
      <span aria-hidden className="relative block h-9 w-px overflow-hidden">
        <span className="absolute inset-0 bg-current opacity-25" />
        <span className="absolute inset-0 bg-current [animation:scroll-cue_2.4s_var(--ease-editorial)_infinite] motion-reduce:[animation:none]" />
      </span>
    </a>
  );
}
