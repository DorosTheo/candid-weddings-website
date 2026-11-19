import Link from "next/link";
import { weddings } from "@/data/weddings";
import { media } from "@/data/media";
import { realWeddingsCopy } from "@/data/copy";
import { pageMetadata } from "@/lib/seo";
import { HeroImage } from "@/components/media/HeroImage";
import { Photo } from "@/components/media/Photo";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollCue } from "@/components/sections/shared/ScrollCue";
import { WeddingCaption } from "@/components/sections/shared/WeddingCaption";

export const metadata = pageMetadata({
  title: "Real Weddings — Cyprus & Destination Wedding Stories",
  description:
    "A glimpse into the love stories we’ve captured. Real weddings photographed and filmed by Candid Weddings Co. in Cyprus and around the world.",
  path: "/real-weddings",
  image: media.realWeddingsHero,
});

/** Reference 3: cinematic B&W hero, oversized serif/sans contrast, spacious intro, scroll cue. */
export default function RealWeddingsPage() {
  return (
    <>
      <section className="relative isolate h-[78svh] min-h-[30rem] overflow-hidden bg-ink text-white md:h-[88svh]">
        <div className="absolute inset-0 -z-10 grayscale motion-safe:animate-[hero-settle_2.6s_var(--ease-editorial)_both]">
          <HeroImage desktop={media.realWeddingsHero} mobile={media.realWeddingsHeroMobile} />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/15" />
        <h1 className="container-x relative flex h-full flex-col justify-center pt-(--header-h)">
          <LineReveal
            inView={false}
            delay={0.2}
            lines={[
              <span key="r" className="font-serif text-display italic font-light tracking-[-0.03em]">Real</span>,
              <span key="w" className="block pl-[14vw] text-[clamp(3.1rem,0.6rem+11.2vw,13.5rem)] font-extralight uppercase leading-[0.9] tracking-[-0.05em] md:pl-[24vw]">
                Weddings
              </span>,
            ]}
          />
        </h1>
      </section>

      <section className="container-x py-[var(--space-section)] text-center">
        <Reveal>
          <h2 className="mx-auto max-w-5xl text-statement uppercase tracking-[-0.005em]">{realWeddingsCopy.heading}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="caps mx-auto mt-10 max-w-3xl text-ink-soft">{realWeddingsCopy.body}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-16 md:mt-24">
          <ScrollCue href="#stories" />
        </Reveal>
      </section>

      <section id="stories" aria-label="Wedding stories" className="container-x scroll-mt-[var(--header-h)] pb-[var(--space-section)]">
        <ol className="space-y-[clamp(5rem,3rem+8vw,12rem)]">
          {weddings.map((w, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={w.slug} className="grid items-end gap-8 md:grid-cols-12 md:gap-8">
                <Link
                  href={`/real-weddings/${w.slug}`}
                  aria-label={`${w.couple} — view wedding story`}
                  className={`group block md:col-span-8 ${flip ? "md:order-2 md:col-start-5" : ""}`}
                >
                  <Photo
                    asset={w.cover}
                    sizes="(min-width: 768px) 66vw, 100vw"
                    ratio="aspect-[4/5] sm:aspect-[3/2]"
                    imgClassName="transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.03]"
                  />
                </Link>
                <Reveal className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : ""}`}>
                  <WeddingCaption wedding={w} index={i} size="lg" />
                  <p className="caps mt-6 text-muted">{w.excerpt}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-t border-line section-y text-center">
        <div className="container-x">
          <p className="font-serif text-h1 font-light tracking-[-0.02em]">
            Your wedding, <span className="italic">next?</span>
          </p>
          <div className="mt-10">
            <ButtonLink href="/contact">Let’s talk</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
