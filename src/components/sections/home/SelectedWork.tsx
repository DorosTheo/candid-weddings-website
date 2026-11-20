import Link from "next/link";
import { getFeaturedWeddings } from "@/data/weddings";
import { homeCopy } from "@/data/copy";
import { Photo } from "@/components/media/Photo";
import { TextLink } from "@/components/ui/Button";
import { StoryCaption } from "../shared/WeddingCaption";

/** Three wedding stories, generous spacing, captions in one quiet line. */
export function SelectedWork() {
  const [first, second, third] = getFeaturedWeddings(3);
  return (
    <section className="container-x pb-[var(--space-section)]">
      <div className="mb-10 flex items-baseline justify-between gap-6 md:mb-14">
        <h2 className="eyebrow text-muted">{homeCopy.work.heading}</h2>
        <TextLink href="/gallery">{homeCopy.work.link}</TextLink>
      </div>

      {first && (
        <Link href={`/gallery/${first.slug}`} className="group block">
          <Photo asset={first.cover} sizes="100vw" ratio="aspect-[4/5] sm:aspect-[16/9]" />
          <StoryCaption wedding={first} />
        </Link>
      )}

      <div className="mt-[var(--space-block)] grid gap-[var(--space-block)] md:grid-cols-12 md:gap-x-8">
        {second && (
          <Link href={`/gallery/${second.slug}`} className="group block md:col-span-6">
            <Photo asset={second.gallery[2] ?? second.cover} sizes="(min-width: 768px) 50vw, 100vw" ratio="aspect-[4/5]" />
            <StoryCaption wedding={second} />
          </Link>
        )}
        {third && (
          <Link href={`/gallery/${third.slug}`} className="group block md:col-span-4 md:col-start-9 md:mt-[24vh]">
            <Photo asset={third.gallery[1] ?? third.cover} sizes="(min-width: 768px) 33vw, 100vw" ratio="aspect-[3/4]" />
            <StoryCaption wedding={third} />
          </Link>
        )}
      </div>
    </section>
  );
}
