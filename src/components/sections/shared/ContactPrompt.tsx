import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

/** Closing invitation — just type on paper. */
export function ContactPrompt({ line = "Tell us about your day." }: { line?: string }) {
  return (
    <section className="container-x border-t border-line py-[var(--space-section)] text-center">
      <Reveal>
        <p className="eyebrow text-muted">{line}</p>
        <Link href="/contact" className="mt-6 inline-block font-serif text-h1 font-light italic transition-opacity hover:opacity-60">
          Let’s talk.
        </Link>
        <p className="body-sm mt-6 text-muted">
          or{" "}
          <a href={`mailto:${site.email}`} className="link-underline text-ink">
            {site.email}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
