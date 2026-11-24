# Ellery Expat Tax — demo site

Next.js 16 (App Router) site for a US expat tax firm. "Ellery Expat Tax" is a fictional demo brand.

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo. Framework preset: Next.js. No settings to change.
3. (Optional) Environment variable `NEXT_PUBLIC_SITE_URL` = your final domain, e.g. https://example.com
   (used for canonical URLs, sitemap.xml, robots.txt and llms.txt).

Or from the terminal: `npx vercel` then `npx vercel --prod`.

## What's inside
- 92 statically generated pages from one content file: `lib/content.ts`
  (23 services, 30 forms, 6 divisions, 16 countries, deadlines, glossary, FAQs, pricing).
- Templates: `app/services/[slug]`, `app/forms/[slug]`, `app/divisions/[slug]`, `app/countries/[slug]`.
- Form ↔ service two-way links are generated from the data.
- SEO: per-page metadata + canonical, `sitemap.xml`, `robots.txt` (AI crawlers allowed), breadcrumbs.
- AEO/GEO: short-answer block at the top of every template, FAQ blocks, `/llms.txt`, JSON-LD
  (AccountingService, WebSite, BreadcrumbList, Service, Article, FAQPage, DefinedTermSet, Event).
- Interactive: filing checker on the home page, 4-step booking flow (`/contact/book/`), fee estimator (`/contact/quote/`).

## Before going live
- Booking submit is simulated in `components/BookingFlow.tsx` (`submit`). Connect it to Cal.com, HubSpot
  or an API route that emails via Resend.
- Replace sample pricing in `lib/content.ts`, legal page text, and add team/credential profiles on /about/.
- Review all tax figures each season (2026 values used).
