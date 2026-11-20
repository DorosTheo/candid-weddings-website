import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAdjacentWeddings, getWedding, weddings } from "@/data/weddings";
import { breadcrumbJsonLd, pageMetadata, weddingJsonLd } from "@/lib/seo";
import { HeroImage } from "@/components/media/HeroImage";
import { VideoFacade } from "@/components/media/VideoFacade";
import { EditorialGallery } from "@/components/gallery/EditorialGallery";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { ContactPrompt } from "@/components/sections/shared/ContactPrompt";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return weddings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) return {};
  return pageMetadata({
    title: `${w.couple} — ${w.location} Wedding`,
    description: `${w.excerpt} Wedding ${w.services.join(" & ").toLowerCase()} by Candid Weddings Co.`,
    path: `/gallery/${w.slug}`,
    image: w.cover,
    noindex: w.placeholder,
  });
}

export default function WeddingPage({ params }: PageProps<"/gallery/[slug]">) {
  return (
    <Suspense fallback={<div className="h-[100svh] min-h-[34rem] bg-ink" aria-hidden />}>
      <WeddingStory params={params} />
    </Suspense>
  );
}

async function WeddingStory({ params }: Pick<PageProps<"/gallery/[slug]">, "params">) {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) notFound();

  const { previous, next } = getAdjacentWeddings(w.slug);
  const details = [w.location, ...(w.venue ? [w.venue] : []), w.year, w.services.join(" & ")];

  return (
    <>
      <JsonLd
        data={[
          weddingJsonLd(w),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
            { name: w.couple, path: `/gallery/${w.slug}` },
          ]),
        ]}
      />

      {/* Cover */}
      <section className="relative isolate h-[100svh] min-h-[34rem] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10">
          <HeroImage desktop={w.cover} mobile={w.coverMobile} />
        </div>
        <div aria-hidden className="scrim-bottom absolute inset-0 -z-10" />
        <div className="container-x flex h-full flex-col justify-end pb-10 md:pb-14">
          <h1 className="font-serif text-hero font-light italic tracking-[-0.02em]">
            <LineReveal inView={false} delay={0.2} lines={[w.couple]} />
          </h1>
          <p className="eyebrow mt-5 text-white/85">
            {w.location} · {w.year}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="container-x py-[var(--space-section)]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-muted">{details.join("  ·  ")}</p>
          <div className="mt-8 space-y-5 font-serif text-[1.35rem] font-light leading-[1.6] md:text-[1.55rem]">
            {w.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Photographs */}
      <section aria-label={`${w.couple} — photographs`} className="container-x pb-[var(--space-section)]">
        <EditorialGallery images={w.gallery} title={w.couple} />
      </section>

      {/* Film (optional) */}
      {w.film && (
        <section aria-label="Wedding film" className="container-x pb-[var(--space-section)]">
          <p className="eyebrow mb-6 text-muted">The film</p>
          <VideoFacade poster={w.film.poster} url={w.film.url} title={`${w.couple} — wedding film`} sizes="100vw" ratio="aspect-[4/5] sm:aspect-video" />
        </section>
      )}

      {/* Previous / next */}
      <nav aria-label="More wedding stories" className="container-x border-t border-line">
        <div className="flex items-center justify-between gap-6 py-10">
          <Link href={`/gallery/${previous.slug}`} className="group flex flex-col gap-1">
            <span className="eyebrow text-muted">← Previous</span>
            <span className="font-serif text-[1.35rem] group-hover:italic">{previous.couple}</span>
          </Link>
          <Link href="/gallery" className="eyebrow link-underline-in hidden text-muted sm:block">
            All weddings
          </Link>
          <Link href={`/gallery/${next.slug}`} className="group flex flex-col items-end gap-1 text-right">
            <span className="eyebrow text-muted">Next →</span>
            <span className="font-serif text-[1.35rem] group-hover:italic">{next.couple}</span>
          </Link>
        </div>
      </nav>

      <ContactPrompt line="Planning your wedding?" />
    </>
  );
}
