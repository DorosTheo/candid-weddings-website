import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAdjacentWeddings, getWedding, weddings } from "@/data/weddings";
import { media } from "@/data/media";
import { breadcrumbJsonLd, pageMetadata, weddingJsonLd } from "@/lib/seo";
import { HeroImage } from "@/components/media/HeroImage";
import { Photo } from "@/components/media/Photo";
import { VideoFacade } from "@/components/media/VideoFacade";
import { EditorialGallery } from "@/components/gallery/EditorialGallery";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return weddings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/real-weddings/[slug]">) {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) return {};
  return pageMetadata({
    title: `${w.couple} — ${w.location} Wedding`,
    description: `${w.excerpt} Wedding ${w.services.join(" & ").toLowerCase()} by Candid Weddings Co.`,
    path: `/real-weddings/${w.slug}`,
    image: w.cover,
    noindex: w.placeholder,
  });
}

export default function WeddingPage({ params }: PageProps<"/real-weddings/[slug]">) {
  return (
    <Suspense fallback={<div className="h-[100svh] min-h-[34rem] bg-ink" aria-hidden />}>
      <WeddingStory params={params} />
    </Suspense>
  );
}

async function WeddingStory({ params }: Pick<PageProps<"/real-weddings/[slug]">, "params">) {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) notFound();

  const { previous, next } = getAdjacentWeddings(w.slug);
  const details = [
    { label: "Location", value: w.location },
    ...(w.venue ? [{ label: "Venue", value: w.venue }] : []),
    { label: "Year", value: w.year },
    { label: "Services", value: w.services.join(" & ") },
  ];

  return (
    <>
      <JsonLd
        data={[
          weddingJsonLd(w),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Real Weddings", path: "/real-weddings" },
            { name: w.couple, path: `/real-weddings/${w.slug}` },
          ]),
        ]}
      />

      {/* 1–3. Hero, couple, location */}
      <section className="relative isolate h-[100svh] min-h-[34rem] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10 motion-safe:animate-[hero-settle_2.6s_var(--ease-editorial)_both]">
          <HeroImage desktop={w.cover} mobile={w.coverMobile} />
        </div>
        <div aria-hidden className="scrim-bottom absolute inset-0 -z-10" />
        <div className="container-x flex h-full flex-col justify-end pb-10 md:pb-14">
          <p className="eyebrow mb-6 text-white/80">
            <Link href="/real-weddings" className="link-underline-in">
              Real Weddings
            </Link>
            <span aria-hidden className="mx-3">/</span>
            {w.location}
          </p>
          <h1 className="font-serif text-hero font-light tracking-[-0.025em]">
            <LineReveal inView={false} delay={0.2} lines={[<span key="c" className="italic">{w.couple}</span>]} />
          </h1>
          <p className="eyebrow mt-6 border-t border-white/30 pt-5 text-white/85">
            {w.location} <span aria-hidden className="mx-2">·</span> {w.year}
          </p>
        </div>
      </section>

      {/* 4. Introduction */}
      <section className="container-x section-y">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <dl className="border-t border-line">
              {details.map((d) => (
                <div key={d.label} className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="eyebrow text-muted">{d.label}</dt>
                  <dd className="eyebrow text-right">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-7 md:col-start-6">
            <SectionLabel>The story</SectionLabel>
            <div className="mt-8 space-y-6 text-statement font-light tracking-[-0.01em]">
              {w.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Curated gallery */}
      <section aria-label={`${w.couple} — photographs`} className="container-x pb-[var(--space-section)]">
        <EditorialGallery images={w.gallery} title={w.couple} />
      </section>

      {/* 6. Optional film */}
      {w.film && (
        <section aria-label="Wedding film" className="bg-white section-y">
          <div className="container-x">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="font-serif text-h1 font-light tracking-[-0.02em]">
                The <span className="italic">film.</span>
              </h2>
              <p className="eyebrow text-muted">{w.couple} — {w.location}</p>
            </div>
            <Reveal>
              <VideoFacade poster={w.film.poster} url={w.film.url} title={`${w.couple} — wedding film`} sizes="100vw" ratio="aspect-[4/5] sm:aspect-video" />
            </Reveal>
          </div>
        </section>
      )}

      {/* 7. Previous / next */}
      <nav aria-label="More wedding stories" className="border-t border-line">
        <div className="container-x grid gap-px py-[var(--space-block)] md:grid-cols-2 md:gap-8">
          {[
            { w: previous, label: "Previous story", align: "" },
            { w: next, label: "Next story", align: "md:text-right md:items-end" },
          ].map(({ w: other, label, align }) => (
            <Link key={label} href={`/real-weddings/${other.slug}`} className={`group flex flex-col gap-5 py-6 ${align}`}>
              <span className="eyebrow text-muted">{label}</span>
              <div className="w-full overflow-hidden">
                <Photo
                  asset={other.cover}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  ratio="aspect-[16/9]"
                  reveal={false}
                  imgClassName="transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.04]"
                />
              </div>
              <span className="font-serif text-h3 group-hover:italic">{other.couple}</span>
              <span className="eyebrow text-muted">
                {other.location} · {other.year}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* 8. Contact CTA */}
      <CtaBanner
        image={media.homeCta}
        lines={["Your story deserves", "to be remembered", "beautifully."]}
        body="Planning your wedding in Cyprus or abroad? Tell us about your day."
      />
    </>
  );
}
