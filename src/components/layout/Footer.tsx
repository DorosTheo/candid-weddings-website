import Link from "next/link";
import { cacheLife } from "next/cache";
import { mainNavigation } from "@/data/navigation";
import { site } from "@/data/site";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** One quiet band: brand, navigation, contact. */
export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="container-x border-t border-line py-10 text-ink">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-[1.35rem] italic">Candid Weddings Co.</p>
          <p className="eyebrow mt-2 text-muted">Cyprus · Worldwide</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="eyebrow link-underline-in">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col gap-2 md:items-end">
          <li>
            <a href={`mailto:${site.email}`} className="body-sm link-underline-in">
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="body-sm link-underline-in">
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-10 flex flex-wrap justify-between gap-4 text-muted">
        <p className="eyebrow">
          © {year} {site.name}
        </p>
        <Link href="/privacy" className="eyebrow link-underline-in">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
