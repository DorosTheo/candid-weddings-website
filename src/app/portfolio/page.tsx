import { portfolioImages } from "@/data/portfolio";
import { portfolioCopy } from "@/data/copy";
import { showreel } from "@/data/weddings";
import { media } from "@/data/media";
import { pageMetadata } from "@/lib/seo";
import { EditorialGallery } from "@/components/gallery/EditorialGallery";
import { VideoFacade } from "@/components/media/VideoFacade";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { homeCopy } from "@/data/copy";

export const metadata = pageMetadata({
  title: "Portfolio — Wedding Photography & Films in Cyprus",
  description:
    "Explore the portfolio of Candid Weddings Co.: editorial, documentary wedding photography and cinematic wedding films from Cyprus and destination weddings worldwide.",
  path: "/portfolio",
  image: portfolioImages[0],
});

export default function PortfolioPage() {
  return (
    <>
      <section className="container-x pt-[calc(var(--header-h)+var(--space-block))] pb-[var(--space-block)]">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <h1 className="md:col-span-8">
            <LineReveal
              inView={false}
              lines={[
                <span key="t" className="font-sans text-display font-extralight uppercase tracking-[var(--tracking-display)]">
                  {portfolioCopy.heading}
                </span>,
                <span key="i" className="block pl-[6vw] font-serif text-h1 italic font-light">
                  {portfolioCopy.italic}
                </span>,
              ]}
            />
          </h1>
          <Reveal immediate delay={0.3} className="md:col-span-4">
            <p className="caps text-ink-soft">{portfolioCopy.body}</p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Photography" className="container-x pb-[var(--space-section)]">
        <SectionLabel index="01" className="mb-10 md:mb-16">
          Photography
        </SectionLabel>
        <EditorialGallery images={portfolioImages} title="Portfolio" />
      </section>

      <section aria-label="Films" className="border-t border-line bg-white section-y">
        <div className="container-x">
          <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionLabel index="02">Film</SectionLabel>
              <h2 className="mt-6 font-serif text-h1 font-light tracking-[-0.02em]">
                Cinematic <span className="italic">wedding films.</span>
              </h2>
            </div>
            <p className="caps text-ink-soft md:col-span-4 md:col-start-9">
              The sound of the vows, the movement of the day, the feeling of the room — your wedding, told in motion.
            </p>
          </div>
          <Reveal>
            <VideoFacade poster={showreel.poster} url={showreel.url} title="Candid Weddings Co. — showreel" sizes="100vw" ratio="aspect-[4/5] sm:aspect-video" />
          </Reveal>
        </div>
      </section>

      <CtaBanner image={media.homeCta} lines={["Imagine", "your story", "here."]} body={homeCopy.finalCta.body} cta="Inquire now" />
    </>
  );
}
