import Link from "next/link";
import { getFeaturedWeddings } from "@/data/weddings";
import { homeCopy } from "@/data/copy";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WeddingCaption } from "../shared/WeddingCaption";

/** Three wedding stories in an asymmetric editorial composition — no boxed cards. */
export function FeaturedWeddings() {
  const [first, second, third] = getFeaturedWeddings(3);
  const c = homeCopy.featured;

  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="01">{c.label}</SectionLabel>
            <h2 className="mt-6 font-serif text-h1 font-light tracking-[-0.02em]">
              {c.heading} <span className="italic">{c.italic}</span>
            </h2>
          </div>
          <TextLink href="/real-weddings" className="shrink-0">
            All real weddings
          </TextLink>
        </div>

        {first && (
          <article>
            <Link href={`/real-weddings/${first.slug}`} aria-label={`${first.couple} — view wedding story`} className="block">
              <Photo asset={first.cover} sizes="100vw" ratio="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/10]" parallax={5} />
            </Link>
            <Reveal className="mt-6 md:ml-auto md:w-1/2 lg:w-5/12">
              <WeddingCaption wedding={first} index={0} />
            </Reveal>
          </article>
        )}

        <div className="mt-[var(--space-block)] grid gap-y-20 md:grid-cols-12 md:gap-x-8">
          {second && (
            <article className="md:col-span-7">
              <Link href={`/real-weddings/${second.slug}`} aria-label={`${second.couple} — view wedding story`} className="block">
                <Photo asset={second.gallery[2] ?? second.cover} sizes="(min-width: 768px) 58vw, 100vw" ratio="aspect-[4/5]" />
              </Link>
              <Reveal className="mt-6">
                <WeddingCaption wedding={second} index={1} />
              </Reveal>
            </article>
          )}
          {third && (
            <article className="md:col-span-4 md:col-start-9 md:mt-[38vh]">
              <Link href={`/real-weddings/${third.slug}`} aria-label={`${third.couple} — view wedding story`} className="block">
                <Photo asset={third.gallery[1] ?? third.cover} sizes="(min-width: 768px) 33vw, 100vw" ratio="aspect-[3/4]" />
              </Link>
              <Reveal className="mt-6">
                <WeddingCaption wedding={third} index={2} />
              </Reveal>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
