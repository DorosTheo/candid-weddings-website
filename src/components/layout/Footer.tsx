import Link from "next/link";
import { cacheLife } from "next/cache";
import { mainNavigation } from "@/data/navigation";
import { site } from "@/data/site";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();

  return (
    <footer className="bg-paper text-ink">
      <div className="container-x border-t border-line pt-[var(--space-block)] pb-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-serif text-h3 leading-tight">
              Wedding photography &amp; cinematography,
              <br />
              <span className="italic">for the moments that matter.</span>
            </p>
            <p className="caps mt-6 text-muted">{site.availability}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-5 text-muted">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="caps link-underline-in">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5 text-muted">Say hello</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="caps link-underline-in break-all">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="caps link-underline-in">
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/contact" className="caps link-underline-in">
                  Inquire now
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-[var(--space-block)] select-none whitespace-nowrap text-center font-serif text-[clamp(2.6rem,10.4vw,13rem)] leading-none tracking-[-0.03em]"
        >
          Candid <span className="italic">Weddings</span> Co.
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">
            © {year} {site.name} — Cyprus / Worldwide
          </p>
          <Link href="/privacy" className="eyebrow link-underline-in w-fit">
            Privacy
          </Link>
          <a href="#top" className="eyebrow link-underline-in w-fit">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
