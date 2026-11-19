import { media } from "@/data/media";
import { homeCopy } from "@/data/copy";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";

/** Brand introduction — Reference 4 composition: large type left, caps copy right, asymmetric images. */
export function HomeIntro() {
  const c = homeCopy.intro;
  return (
    <section id="introduction" className="section-y scroll-mt-[var(--header-h)]">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <h2 className="text-statement font-normal tracking-[-0.015em]">
              {c.heading}
              <span className="block font-serif text-[1.18em] italic font-light leading-[1.1]">{c.italic}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8 md:pt-40 lg:col-span-4 lg:col-start-9">
            <div className="caps space-y-6 text-ink-soft">
              {c.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-[var(--space-block)] grid grid-cols-12 items-start gap-x-4 gap-y-10 md:gap-x-8">
          <Photo
            asset={media.homeIntro01}
            sizes="(min-width: 768px) 34vw, 70vw"
            ratio="aspect-[2/3]"
            className="col-span-8 md:col-span-4 md:col-start-2"
            parallax={6}
          />
          <div className="col-span-10 col-start-3 md:col-span-6 md:col-start-7 md:mt-[28vh]">
            <Photo asset={media.homeIntro02} sizes="(min-width: 768px) 50vw, 84vw" ratio="aspect-[3/2]" />
            <p className="eyebrow mt-4 text-muted">The moments in between</p>
          </div>
        </div>
      </div>
    </section>
  );
}
