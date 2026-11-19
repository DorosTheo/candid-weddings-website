import { contactCopy } from "@/data/copy";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Contact — Book Your Wedding Photographer in Cyprus",
  description:
    "Inquire about wedding photography and cinematography with Candid Weddings Co. — in Cyprus and for destination weddings worldwide. Email info@candidweddingsco.com.",
  path: "/contact",
});

/** Reference 1: centred serif heading, minimal intro, two-column underlined form. */
export default function ContactPage() {
  return (
    <section className="container-x pt-[calc(var(--header-h)+var(--space-block))] pb-[var(--space-section)]">
      <header className="mx-auto max-w-5xl text-center">
        <h1 className="font-serif text-h1 font-light tracking-[-0.02em]">
          <LineReveal inView={false} lines={[contactCopy.heading]} />
        </h1>
        <Reveal immediate delay={0.15}>
          <p className="caps mx-auto mt-10 max-w-4xl text-ink-soft">{contactCopy.intro}</p>
          <p className="caps mt-6">
            {contactCopy.emailLine}{" "}
            <a href={`mailto:${site.email}`} className="link-underline whitespace-nowrap">
              {site.email}
            </a>
          </p>
        </Reveal>
      </header>

      <Reveal immediate delay={0.25} className="mx-auto mt-16 max-w-[63rem] md:mt-24">
        <InquiryForm />
      </Reveal>

      <div className="mx-auto mt-[var(--space-block)] grid max-w-[63rem] gap-6 border-t border-line pt-8 sm:grid-cols-3">
        <p className="eyebrow text-muted">Based in Cyprus</p>
        <p className="eyebrow text-muted sm:text-center">Available worldwide</p>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline-in w-fit sm:justify-self-end">
          Instagram {site.instagram.handle}
        </a>
      </div>
    </section>
  );
}
