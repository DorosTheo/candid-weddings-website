import { media } from "@/data/media";
import { experienceIntro } from "@/data/experience";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExperienceSteps } from "../shared/ExperienceSteps";

/** Reference 2 layout: sticky image left, serif title and numbered steps right. */
export function ExperiencePreview() {
  return (
    <section className="section-y bg-paper-deep">
      <div className="container-x grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <Photo asset={media.homeExperience} sizes="(min-width: 768px) 40vw, 100vw" ratio="aspect-[4/5] md:aspect-[2/3]" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:py-10">
          <SectionLabel index="04">How it works</SectionLabel>
          <Reveal>
            <h2 className="mt-8 font-serif text-h1 font-light tracking-[-0.02em]">{experienceIntro.title}</h2>
            <p className="mt-6 font-serif text-[1.45rem] italic leading-snug text-ink-soft md:text-[1.7rem]">
              “{experienceIntro.subtitle}”
            </p>
          </Reveal>
          <div className="mt-14 md:mt-20">
            <ExperienceSteps compact />
          </div>
          <Reveal className="mt-14">
            <TextLink href="/experience">Discover the experience</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
