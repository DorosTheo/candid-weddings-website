import { homeCopy } from "@/data/copy";
import { Reveal } from "@/components/ui/Reveal";

/** One centred statement and a single sentence — nothing more. */
export function HomeIntro() {
  const c = homeCopy.intro;
  return (
    <section id="introduction" className="container-x scroll-mt-(--header-h) py-[var(--space-section)]">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-h2 font-light leading-[1.2] tracking-[-0.015em]">
          {c.heading} <span className="italic">{c.italic}</span>
        </h2>
        <p className="body-sm mx-auto mt-8 max-w-md text-muted">{c.body}</p>
      </Reveal>
    </section>
  );
}
