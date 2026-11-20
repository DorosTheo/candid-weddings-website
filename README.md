# Candid Weddings Co. — website

Wedding photography & cinematography studio in Cyprus — official website.

**Stack:** Next.js 16 (App Router, Cache Components, Turbopack) · React 19 ·
TypeScript · Tailwind CSS 4 · Motion · Resend · Zod · Lucide.

---

## Run locally

Requires Node.js 20.9+ (22 recommended).

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open http://localhost:3000. Without `RESEND_API_KEY` the site works fully,
but the contact form returns an error rather than a false success.

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (type-checks and prerenders every page) |
| `npm start` | Serve the production build |
| `npm run lint` / `npm run typecheck` | Code quality |
| `npm run placeholders` | Create labelled placeholders for any image listed in `src/data/media.ts` that doesn't exist yet. It never overwrites real photos. |
| `npm run og` | Regenerate the default social-sharing image |

## Deploy (Vercel recommended)

1. Push the repository to GitHub and import it at vercel.com/new. The framework is detected automatically.
2. Add the environment variables from `.env.example` (Project → Settings → Environment Variables).
3. In Resend, add and verify the `candidweddingsco.com` domain (DNS records), and use an address on it for `CONTACT_FROM_EMAIL`.
4. Point the domain's DNS at Vercel (Project → Settings → Domains). Use `www.candidweddingsco.com` as primary and redirect the apex to it, so it matches `NEXT_PUBLIC_SITE_URL`.
5. After launch: submit `https://www.candidweddingsco.com/sitemap.xml` in Google Search Console, and send a test inquiry.

Any Node.js host that supports Next.js 16 also works (Netlify, Render, a VPS with `npm run build && npm start`). Static export is **not** suitable because the contact form needs a server route.

## Project structure

```
src/
  app/                    Routes (one folder per page) + sitemap, robots, API
    api/inquiry/route.ts  Contact-form endpoint (validation, spam protection, Resend)
    gallery/              Gallery (weddings / photographs / film tabs)
    gallery/[slug]        Wedding story template — one page per entry in weddings.ts
  components/
    navigation/           Header, mobile menu, wordmark
    layout/               Footer
    sections/home|shared  Page sections (hero, featured weddings, CTA banner, …)
    gallery/              Gallery tabs, editorial layout engine + lightbox
    media/                Photo, art-directed hero, parallax, reveal, video facade
    forms/                Inquiry form
    ui/                   Buttons, reveal animations, labels, motion provider
    analytics/ seo/       Consent-gated analytics, JSON-LD
  data/                   ALL CONTENT LIVES HERE
    site.ts               Business details (email, Instagram, description)
    copy.ts               Page wording
    media.ts              Image registry (paths, sizes, alt text)
    weddings.ts           Real wedding stories
    gallery.ts            Gallery photographs selection
    experience.ts         The 4-step process + delivery timeframe
    navigation.ts         Menu
    redirects.ts          301 redirects from old URLs
  lib/                    SEO helpers, validation schema, email template, rate limiting
scripts/                  Placeholder & OG image generators
public/images/            Photographs (see ASSETS.md)
```

## Common edits

- **Add a wedding:** follow the comment at the top of `src/data/weddings.ts`. The page, card, sitemap entry and previous/next links are created automatically.
- **Change wording:** edit `src/data/copy.ts`.
- **Change the delivery timeframe:** edit `deliveryTimeframe` in `src/data/experience.ts`.
- **Replace photos:** see [ASSETS.md](./ASSETS.md).
- **Add old-site redirects:** edit `src/data/redirects.ts`.

### Do you need a CMS?

Not yet. All content is structured TypeScript data, so adding a wedding is a
copy/paste of one object plus a folder of photos. If you'd prefer to add
weddings without touching code, the data layer is ready to connect to a
headless CMS:

- **Sanity:** best editing experience and an excellent image pipeline. Free tier is generous. *Recommended if you want a CMS.*
- **Payload:** self-hosted inside this Next.js app, no external service.
- **Contentful / Storyblok:** polished, but more expensive as you grow.

## Contact form

`POST /api/inquiry`:

- Server-side validation with the same Zod schema the browser uses (`src/lib/inquiry.ts`).
- Spam protection: hidden honeypot field, minimum fill time, same-origin check, per-IP rate limit (5 per 10 minutes), 20 KB body cap.
- All user input is HTML-escaped in the email. The couple's address is set as **Reply-To**, so you can answer directly from your inbox.
- Success is shown **only** when Resend confirms the email was accepted. Otherwise the visitor sees an error with a direct email link.

## Analytics & consent

Google Analytics 4 and the Meta Pixel are pre-wired but **inactive**. Set
`NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_META_PIXEL_ID` to enable them. A
consent banner then appears, and scripts load only after the visitor accepts.
Successful inquiries fire `generate_lead` (GA4) and `Lead` (Meta). For Search
Console, set `GOOGLE_SITE_VERIFICATION`, or verify via DNS.
