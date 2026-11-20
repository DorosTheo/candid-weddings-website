/**
 * Typographic wordmark. Replace with the official logo (SVG) when available:
 * save it to /public/brand/logo/logo.svg and swap this component's contents
 * for an <Image> — see ASSETS.md.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-baseline gap-2 whitespace-nowrap leading-none ${className}`}>
      <span className="serif-italic text-[1.7rem] tracking-[-0.02em] md:text-[1.9rem]">Candid</span>
      <span className="eyebrow !text-[0.625rem] !tracking-[0.26em] md:!text-[0.6875rem]">Weddings Co.</span>
    </span>
  );
}
