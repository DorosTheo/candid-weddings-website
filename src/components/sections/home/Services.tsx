import { media } from "@/data/media";
import { homeCopy } from "@/data/copy";
import { showreel } from "@/data/weddings";
import { Photo } from "@/components/media/Photo";
import { VideoFacade } from "@/components/media/VideoFacade";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Photography & film introduced through imagery, with a minimal service index. */
export function Services() {
  const c = homeCopy.services;
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="mb-14 md:mb-20">
          <SectionLabel index="03">{c.label}</SectionLabel>
          <h2 className="mt-6 font-serif text-h1 font-light tracking-[-0.02em]">
            {c.heading} <span className="italic">{c.italic}</span>
          </h2>
        </div>

        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
          <figure className="md:col-span-5">
            <Photo asset={media.homePhotography} sizes="(min-width: 768px) 40vw, 100vw" ratio="aspect-[4/5]" />
            <figcaption className="eyebrow mt-4 flex justify-between text-muted">
              <span>Photography</span>
              <span>01</span>
            </figcaption>
          </figure>

          <div className="md:col-span-6 md:col-start-7 md:pt-[16vh]">
            <Reveal>
              <VideoFacade poster={showreel.poster} url={showreel.url} title="Candid Weddings Co. — wedding film" sizes="(min-width: 768px) 50vw, 100vw" />
              <p className="eyebrow mt-4 flex justify-between text-muted">
                <span>Film</span>
                <span>02</span>
              </p>
            </Reveal>

            <ul className="mt-16 border-b border-line">
              {c.items.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-6 sm:grid-cols-[3rem_1fr_1fr] sm:items-baseline">
                  <span className="eyebrow text-muted">{item.index}</span>
                  <h3 className="font-serif text-[1.6rem] leading-tight">{item.title}</h3>
                  <p className="caps col-start-2 text-muted sm:col-start-3">{item.body}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-12">
              <ButtonLink href="/portfolio">Explore our work</ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
