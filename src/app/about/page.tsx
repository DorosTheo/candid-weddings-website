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
  image: media.foundersWide,
});

export default function AboutPage() {
  const c = aboutCopy;
  return (
    <>
      {/* Opening photograph */}
      {/* Opening photograph with the headline set in the sky.
          Phones: framed 4:5 crop within the margins. Desktop: edge to edge, filling the screen below the header. */}
      <section aria-label="Doros & George" className="container-x pt-(--header-h) md:px-0">
        <div className="relative mt-6 md:mt-0">
          <Photo
            asset={media.foundersWide}
            preload
            sizes="100vw"
            quality={85}
            ratio="aspect-[4/5] md:aspect-[3/2] md:landscape:aspect-auto md:landscape:h-[calc(100svh-var(--header-h))] md:landscape:min-h-[32rem]"
          />
          <h1 className="absolute inset-x-0 top-[10%] px-6 text-center text-ink md:top-[13%]">
            <LineReveal
              inView={false}
              delay={0.3}
              lines={[
                <span key="d" className="block font-brand text-[clamp(1.55rem,1.05rem+2.3vw,3.4rem)] leading-[1.05] tracking-[0.01em] uppercase">
                  More than photos &amp; videos
                </span>,
                <span key="s" className="mt-4 block text-[clamp(0.6rem,0.55rem+0.2vw,0.75rem)] font-normal tracking-[0.32em] uppercase md:mt-5">
                  {c.intro.italic.replace(/\.$/, "")}
                </span>,
              ]}
            />
          </h1>
        </div>
      </section>

      {/* Short introduction */}
      <section className="container-x pt-[var(--space-block)] pb-[var(--space-section)]">
        <Reveal immediate delay={0.4} className="body-sm mx-auto max-w-xl space-y-5 text-center text-ink-soft">
          {c.intro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </section>

      {/* Doros & George */}
      <section aria-label="Portraits" className="container-x pb-[var(--space-section)]">
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
