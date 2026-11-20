import { ButtonLink, TextLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-center justify-center pt-(--header-h) text-center">
      <p className="eyebrow text-muted">404</p>
      <h1 className="mt-6 font-serif text-h1 font-light">
        This moment <span className="italic">wasn’t captured.</span>
      </h1>
      <p className="body-sm mt-8 max-w-md text-ink-soft">The page you’re looking for has moved or no longer exists.</p>
      <div className="mt-12 flex flex-col items-center gap-8 sm:flex-row">
        <ButtonLink href="/">Back to home</ButtonLink>
        <TextLink href="/gallery">View the gallery</TextLink>
      </div>
    </section>
  );
}
