import { media } from "@/data/media";
import { homeCopy } from "@/data/copy";
import { HeroImage } from "@/components/media/HeroImage";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

/** Full-bleed photograph with a single, quiet line of type. The image does the talking. */
export function HomeHero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[34rem] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <HeroImage desktop={media.homeHero} mobile={media.homeHeroMobile} />
      </div>
      <div aria-hidden className="scrim-bottom absolute inset-0 -z-10" />

      <div className="container-x flex h-full flex-col justify-end pb-10 md:pb-14">
        <h1 className="max-w-3xl font-serif text-hero font-light tracking-[-0.02em]">
          <LineReveal inView={false} delay={0.2} lines={[homeCopy.hero.line]} />
          <span className="sr-only"> — Candid Weddings Co., wedding photographer and videographer in Cyprus</span>
        </h1>
        <Reveal immediate delay={0.5} className="mt-6 flex items-end justify-between gap-6">
          <p className="eyebrow text-white/85">{homeCopy.hero.kicker}</p>
          <a href="#introduction" className="eyebrow hidden text-white/85 transition-colors hover:text-white sm:block">
            Scroll ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
}
