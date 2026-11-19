import { media } from "@/data/media";
import { experienceIntro } from "@/data/experience";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/media/Photo";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ExperienceSteps } from "@/components/sections/shared/ExperienceSteps";

export const metadata = pageMetadata({
  title: "The Experience — How We Photograph Your Wedding",
  description:
    "From our first chat to the final gallery — here’s what to expect when Candid Weddings Co. photographs and films your wedding in Cyprus or abroad.",
  path: "/experience",
  image: media.experienceSide,
});

/** Reference 2: large opening statement, asymmetric two-column process. */
export default function ExperiencePage() {
  return (
    <>
      <section className="container-x pt-[calc(var(--header-h)+var(--space-block))] pb-[var(--space-block)]">
        <h1 className="sr-only">The Experience — working with Candid Weddings Co.</h1>
        <Reveal immediate y={20}>
          <p className="max-w-[78rem] text-statement tracking-[-0.012em]">{experienceIntro.statement}</p>
        </Reveal>
      </section>

      <section className="container-x pb-[var(--space-section)]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <Photo asset={media.experienceSide} eager sizes="(min-width: 768px) 40vw, 100vw" ratio="aspect-[4/5] md:aspect-[2/3]" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-10">
            <h2 className="font-serif text-h1 font-light tracking-[-0.02em]">
              <LineReveal lines={[experienceIntro.title]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 font-serif text-[1.45rem] italic leading-snug text-ink-soft md:text-[1.75rem]">
                “{experienceIntro.subtitle}”
              </p>
            </Reveal>
            <div className="mt-16 md:mt-24">
              <ExperienceSteps />
            </div>
            <Reveal className="mt-16 md:mt-20">
              <ButtonLink href="/contact">Inquire now</ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Closing" className="relative">
        <Photo asset={media.experienceClosing} sizes="100vw" ratio="aspect-[4/5] sm:aspect-[2/1]" parallax={6} />
      </section>
    </>
  );
}
