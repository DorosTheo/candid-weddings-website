import type { MediaAsset } from "@/data/media";
import { Photo } from "@/components/media/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

/** Closing invitation to get in touch — full-bleed photograph, large serif statement. */
export function CtaBanner({
  image,
  lines,
  body,
  cta = "Let’s talk",
  href = "/contact",
}: {
  image: MediaAsset;
  lines: string[];
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <Photo asset={image} sizes="100vw" ratio="h-full" className="h-full" parallax={6} reveal={false} />
        <div className="absolute inset-0 bg-black/45" />
      </div>
      <div className="container-x flex min-h-[85svh] flex-col items-center justify-center py-[var(--space-section)] text-center">
        <h2 className="font-serif text-h1 font-light tracking-[-0.02em]">
          <LineReveal
          lines={lines.map((line, i) => (i === lines.length - 1 ? <span key={i} className="italic">{line}</span> : line))}
        />
        </h2>
        {body && (
          <Reveal delay={0.2}>
            <p className="caps mx-auto mt-10 max-w-xl text-white/85">{body}</p>
          </Reveal>
        )}
        <Reveal delay={0.3} className="mt-12">
          <ButtonLink href={href} tone="light">
            {cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
