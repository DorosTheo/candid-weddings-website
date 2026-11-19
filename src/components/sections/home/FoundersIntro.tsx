import { media } from "@/data/media";
import { homeCopy } from "@/data/copy";
import { Photo } from "@/components/media/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FoundersIntro() {
  const c = homeCopy.founders;
  return (
    <section className="section-y bg-white">
      <div className="container-x grid items-center gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Photo asset={media.founders} sizes="(min-width: 768px) 40vw, 100vw" ratio="aspect-[4/5]" parallax={6} />
          <p className="eyebrow mt-4 text-muted">Doros &amp; George</p>
        </div>
        <div className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <SectionLabel index="02">{c.label}</SectionLabel>
          <h2 className="mt-8 font-serif text-h1 font-light tracking-[-0.02em]">
            <LineReveal lines={[c.heading, <span key="i" className="italic">{c.italic}</span>]} />
          </h2>
          <Reveal delay={0.1} className="mt-10 space-y-5 text-lead text-ink-soft">
            {c.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-12">
            <TextLink href="/about">Meet us</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
