import { media } from "@/data/media";
import { aboutCopy } from "@/data/copy";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/media/Photo";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { ContactPrompt } from "@/components/sections/shared/ContactPrompt";

export const metadata = pageMetadata({
  title: "About Doros & George — Wedding Photographers in Cyprus",
  description:
    "Meet Doros & George, the creative people behind Candid Weddings Co. A fashion background, a relaxed documentary approach and a passion for telling your story in photographs and film.",
  path: "/about",
  image: media.founders,
});

export default function AboutPage() {
  const c = aboutCopy;
  return (
    <>
      {/* Opening: large type left, supporting copy right */}
      <section className="container-x pt-[calc(var(--header-h)+var(--space-block))] pb-[var(--space-section)]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <h1 className="font-serif text-h1 font-light leading-[1.1] tracking-[-0.02em] md:col-span-6">
            <LineReveal inView={false} lines={[c.intro.heading, <span key="i" className="italic">{c.intro.italic}</span>]} />
          </h1>
          <Reveal immediate delay={0.25} className="body-sm space-y-5 text-ink-soft md:col-span-4 md:col-start-9 md:pt-3">
            {c.intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
        <Photo asset={media.foundersWide} eager sizes="100vw" ratio="aspect-[4/5] sm:aspect-[16/9]" className="mt-[var(--space-block)]" />
      </section>

      {/* Doros & George */}
      <section aria-label="Doros & George" className="container-x pb-[var(--space-section)]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-8">
          <figure className="md:col-span-4 md:col-start-3">
            <Photo asset={media.doros} sizes="(min-width: 768px) 33vw, 50vw" ratio="aspect-[2/3]" />
            <figcaption className="mt-4 font-serif text-[1.35rem] italic">Doros</figcaption>
          </figure>
          <figure className="mt-[12vh] md:col-span-4 md:col-start-8">
            <Photo asset={media.george} sizes="(min-width: 768px) 33vw, 50vw" ratio="aspect-[2/3]" />
            <figcaption className="mt-4 font-serif text-[1.35rem] italic">George</figcaption>
          </figure>
        </div>
      </section>

      {/* Approach */}
      <section className="container-x pb-[var(--space-section)]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-muted">{c.approach.label}</p>
          <p className="mt-8 font-serif text-statement font-light leading-[1.5]">{c.approach.statement}</p>
        </Reveal>
        <Photo asset={media.aboutApproach} sizes="(min-width: 768px) 66vw, 100vw" ratio="aspect-[3/2]" className="mx-auto mt-[var(--space-block)] md:w-2/3" />
      </section>

      <ContactPrompt line="We’d love to hear your story." />
    </>
  );
}
