import { media } from "@/data/media";
import { aboutCopy } from "@/data/copy";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/media/Photo";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";

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
      {/* Reference 4 — opening composition */}
      <section className="container-x pt-[calc(var(--header-h)+var(--space-block))] pb-[var(--space-section)]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <h1 className="md:col-span-7">
            <LineReveal
              inView={false}
              lines={[
                <span key="h" className="text-h2 font-normal tracking-[-0.02em]">{c.intro.heading}</span>,
                <span key="i" className="font-serif text-[calc(var(--text-h2)*1.2)] italic font-light leading-[1.05]">{c.intro.italic}</span>,
              ]}
            />
          </h1>
          <Reveal delay={0.25} className="md:col-span-5 md:col-start-8 md:pt-48 lg:col-span-4 lg:col-start-9">
            <div className="caps space-y-6 text-ink-soft">
              {c.intro.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mt-[var(--space-block)]">
          <Photo asset={media.foundersWide} eager sizes="100vw" ratio="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" parallax={6} />
        </div>
      </section>

      {/* 1. Meet Doros & George */}
      <section className="border-t border-line section-y">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-6">
              <SectionLabel index="01">{c.meet.label}</SectionLabel>
              <h2 className="mt-6 font-serif text-display font-light tracking-[-0.03em]">
                {c.meet.heading} <span className="italic">{c.meet.italic}</span>
              </h2>
            </div>
            <Reveal className="md:col-span-4 md:col-start-9">
              <p className="text-lead text-ink-soft">{c.meet.body}</p>
            </Reveal>
          </div>
          <div className="mt-[var(--space-block)] grid grid-cols-12 gap-x-4 gap-y-12 md:gap-x-8">
            <figure className="col-span-10 md:col-span-5 md:col-start-2">
              <Photo asset={media.doros} sizes="(min-width: 768px) 42vw, 84vw" ratio="aspect-[2/3]" />
              <figcaption className="mt-5 font-serif text-h3 italic">Doros</figcaption>
            </figure>
            <figure className="col-span-10 col-start-3 md:col-span-5 md:col-start-8 md:mt-[24vh]">
              <Photo asset={media.george} sizes="(min-width: 768px) 42vw, 84vw" ratio="aspect-[2/3]" />
              <figcaption className="mt-5 font-serif text-h3 italic">George</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Creative background */}
      <section className="bg-white section-y">
        <div className="container-x grid items-center gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 md:order-2 md:col-start-8">
            <Photo asset={media.aboutBackground} sizes="(min-width: 768px) 40vw, 100vw" ratio="aspect-[4/5]" parallax={6} />
          </div>
          <div className="md:col-span-6 md:order-1">
            <SectionLabel index="02">{c.background.label}</SectionLabel>
            <h2 className="mt-8 font-serif text-h1 font-light tracking-[-0.02em]">
              <LineReveal lines={[c.background.heading, <span key="i" className="italic">{c.background.italic}</span>]} />
            </h2>
            <Reveal delay={0.1} className="mt-10 max-w-xl space-y-5 text-lead text-ink-soft">
              {c.background.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Approach — the manifesto */}
      <section className="section-y">
        <div className="container-x">
          <SectionLabel index="03">{c.approach.label}</SectionLabel>
          <Reveal>
            <blockquote className="mt-12 max-w-[72rem] text-statement tracking-[-0.012em]">
              <p>
                {c.approach.quote.map((line, i) => (
                  <span key={line} className={i % 2 ? "text-muted" : ""}>
                    {line}{" "}
                  </span>
                ))}
              </p>
            </blockquote>
          </Reveal>
          <div className="mt-[var(--space-block)] grid grid-cols-12 items-end gap-x-4 gap-y-10 md:gap-x-8">
            <Photo asset={media.aboutApproach01} sizes="(min-width: 768px) 58vw, 100vw" ratio="aspect-[3/2]" className="col-span-12 md:col-span-7" />
            <Photo asset={media.aboutApproach02} sizes="(min-width: 768px) 33vw, 66vw" ratio="aspect-[2/3]" className="col-span-8 col-start-5 md:col-span-4 md:col-start-9" />
          </div>
        </div>
      </section>

      {/* 4. Philosophy */}
      <section className="border-t border-line section-y">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <SectionLabel index="04">{c.philosophy.label}</SectionLabel>
            <h2 className="mt-8 font-serif text-display font-light tracking-[-0.03em]">
              <LineReveal lines={[c.philosophy.heading, <span key="i" className="italic">{c.philosophy.italic}</span>]} />
            </h2>
          </div>
          <Reveal className="caps space-y-6 text-ink-soft md:col-span-4 md:col-start-9 md:self-end">
            {c.philosophy.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
        <div className="mt-[var(--space-block)]">
          <Photo asset={media.aboutPhilosophy} sizes="100vw" ratio="aspect-[4/5] sm:aspect-[2/1]" parallax={7} className="w-full" />
        </div>
      </section>

      {/* 5. Storytelling */}
      <section className="section-y">
        <div className="container-x grid items-center gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Photo asset={media.aboutStorytelling} sizes="(min-width: 768px) 58vw, 100vw" ratio="aspect-[3/2]" />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <SectionLabel index="05">{c.storytelling.label}</SectionLabel>
            <h2 className="mt-8 font-serif text-h2 font-light tracking-[-0.02em]">
              {c.storytelling.heading} <span className="italic">{c.storytelling.italic}</span>
            </h2>
            <Reveal className="mt-8">
              <p className="caps text-ink-soft">{c.storytelling.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner
        image={media.homeCta}
        lines={["We’d love to", "hear your", "story."]}
        body="Tell us about your plans — we’ll get back to you personally."
      />
    </>
  );
}
