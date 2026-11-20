import { media } from "@/data/media";
import { homeCopy } from "@/data/copy";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";

export function FoundersIntro() {
  const c = homeCopy.founders;
  return (
    <section className="container-x pb-[var(--space-section)]">
      <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
        <Photo asset={media.founders} sizes="(min-width: 768px) 33vw, 100vw" ratio="aspect-[4/5]" className="md:col-span-4 md:col-start-2" />
        <Reveal className="md:col-span-5 md:col-start-7">
          <h2 className="font-serif text-h2 font-light italic">{c.heading}</h2>
          <p className="body-sm mt-6 max-w-md text-ink-soft">{c.body}</p>
          <TextLink href="/about" className="mt-8">
            {c.link}
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
