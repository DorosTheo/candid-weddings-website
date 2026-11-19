import { media } from "@/data/media";
import { homeCopy } from "@/data/copy";
import { HeroImage } from "@/components/media/HeroImage";
import { LineReveal } from "@/components/ui/Reveal";
import { ScrollCue } from "../shared/ScrollCue";

/** Full-viewport cinematic opening with oversized serif / sans editorial type. */
export function HomeHero() {
  const [l1, l2, l3] = homeCopy.hero.lines;
  return (
    <section className="relative isolate h-[100svh] min-h-[36rem] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10 motion-safe:animate-[hero-settle_2.6s_var(--ease-editorial)_both]">
        <HeroImage desktop={media.homeHero} mobile={media.homeHeroMobile} />
      </div>
      <div aria-hidden className="scrim-bottom absolute inset-0 -z-10" />

      <div className="container-x flex h-full flex-col justify-end pb-8 md:pb-12">
        <h1 className="mb-10 md:mb-14">
          <LineReveal
            inView={false}
            delay={0.25}
            lines={[
              <span key="1" className="font-serif text-hero italic font-light tracking-[-0.02em]">{l1}</span>,
              <span key="2" className="block pl-[8vw] text-[clamp(2.3rem,0.8rem+6.4vw,8.5rem)] font-extralight uppercase leading-[0.95] tracking-[-0.04em] md:pl-[16vw]">
                {l2}
              </span>,
              <span key="3" className="block pl-[2vw] font-serif text-hero italic font-light tracking-[-0.02em] md:pl-[6vw]">{l3}</span>,
            ]}
          />
          <span className="sr-only"> — Candid Weddings Co., wedding photographer and videographer in Cyprus</span>
        </h1>

        <div className="flex items-end justify-between gap-6 border-t border-white/30 pt-5">
          <p className="eyebrow max-w-[16rem] leading-relaxed text-white/90 sm:max-w-none">
            {homeCopy.hero.kicker}
            <span aria-hidden className="mx-3 hidden sm:inline">/</span>
            <br className="sm:hidden" />
            {homeCopy.hero.location}
          </p>
          <ScrollCue href="#introduction" className="shrink-0 text-white" label="Scroll" />
        </div>
      </div>
    </section>
  );
}
