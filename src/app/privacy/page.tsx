import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How Candid Weddings Co. handles the information you share through this website.",
  path: "/privacy",
});

// NOTE: plain-language starting point — have it reviewed for GDPR compliance before launch.
export default function PrivacyPage() {
  return (
    <section className="container-x pt-[calc(var(--header-h)+var(--space-block))] pb-[var(--space-section)]">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-h1 font-light">Privacy</h1>
        <div className="mt-12 space-y-10 text-lead text-ink-soft [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-h3 [&_h2]:text-ink">
          <div>
            <h2>Your inquiry</h2>
            <p>
              When you send an inquiry, the details you enter are emailed to us so we can reply. We use them only to
              respond to you and to plan your wedding coverage, and we never sell or share them for marketing.
            </p>
          </div>
          <div>
            <h2>Cookies &amp; analytics</h2>
            <p>
              This site works without optional cookies. If analytics are enabled, they load only after you accept them in
              the cookie banner, and you can change your mind at any time by clearing this site’s data in your browser.
            </p>
          </div>
          <div>
            <h2>Your rights</h2>
            <p>
              You can ask us to access, correct or delete the information you’ve shared at any time by emailing{" "}
              <a className="link-underline text-ink" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
