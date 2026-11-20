import { media } from "@/data/media";
import { experienceIntro } from "@/data/experience";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ExperienceSteps } from "@/components/sections/shared/ExperienceSteps";
import { ContactPrompt } from "@/components/sections/shared/ContactPrompt";

export const metadata = pageMetadata({
  title: "The Experience — How We Photograph Your Wedding",
  description:
    "From our first chat to the final gallery — here’s what to expect when Candid Weddings Co. photographs and films your wedding in Cyprus or abroad.",
  path: "/experience",
  image: media.experienceSide,
});

/** Opening statement, then image left / four steps right. */
export default function ExperiencePage() {
  return (
    <>
      <section className="container-x pt-[calc(var(--header-h)+var(--space-block))] pb-[var(--space-section)]">
        <h1 className="sr-only">The Experience — working with Candid Weddings Co.</h1>
        <Reveal immediate y={16}>
          <p className="max-w-4xl font-serif text-statement font-light leading-[1.45]">{experienceIntro.statement}</p>
        </Reveal>
      </section>

      <section className="container-x pb-[var(--space-section)]">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <Photo asset={media.experienceSide} eager sizes="(min-width: 768px) 40vw, 100vw" ratio="aspect-[4/5]" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-serif text-h2 font-light">{experienceIntro.title}</h2>
            <p className="body-sm mt-4 text-muted">{experienceIntro.subtitle}</p>
            <div className="mt-14">
              <ExperienceSteps />
            </div>
          </div>
        </div>
      </section>

      <ContactPrompt line="Ready when you are." />
    </>
  );
}
