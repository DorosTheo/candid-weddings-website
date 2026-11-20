import { weddings, showreel } from "@/data/weddings";
import { galleryPhotos } from "@/data/gallery";
import { galleryCopy } from "@/data/copy";
import { pageMetadata } from "@/lib/seo";
import { GalleryTabs } from "@/components/gallery/GalleryTabs";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { ContactPrompt } from "@/components/sections/shared/ContactPrompt";

export const metadata = pageMetadata({
  title: "Gallery — Wedding Photography & Films in Cyprus",
  description:
    "Real weddings, photographs and films by Candid Weddings Co. — documentary, editorial wedding photography and cinematography in Cyprus and worldwide.",
  path: "/gallery",
  image: weddings[0]?.cover,
});

export default function GalleryPage() {
  const films = [
    { title: "Showreel", caption: "Candid Weddings Co.", poster: showreel.poster, url: showreel.url },
    ...weddings
      .filter((w) => w.film)
      .map((w) => ({
        title: w.couple,
        caption: `${w.location} · ${w.year}`,
        poster: w.film!.poster,
        url: w.film!.url,
        href: `/gallery/${w.slug}`,
      })),
  ];

  return (
    <>
      <section className="container-x pt-[calc(var(--header-h)+var(--space-block))] pb-[var(--space-section)]">
        <header className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h1 className="font-serif text-h1 font-light tracking-[-0.02em]">
            <LineReveal inView={false} lines={[galleryCopy.heading]} />
          </h1>
          <Reveal immediate delay={0.2}>
            <p className="body-sm max-w-sm text-muted md:text-right">{galleryCopy.body}</p>
          </Reveal>
        </header>
        <GalleryTabs weddings={weddings} photos={galleryPhotos} films={films} />
      </section>
      <ContactPrompt />
    </>
  );
}
