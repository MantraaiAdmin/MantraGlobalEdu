# Mantra Global Education — SEO implementation report

Branch: `praveen/seo-overhaul` · Date: 22 Oct 2026 · Scope: `apps/web` (Next.js 15), `packages/config`, catalog seed data, build scripts.

## A. Executive summary

The live site had no robots.txt or sitemap (both 404), one site-wide title, duplicate
www/non-www hosts, and most content pages (countries, resources, courses, scholarships)
rendered only in the browser — crawlers saw loading spinners, and invalid URLs
returned HTTP 200 "not found" messages. The Resources, Contact form and Cost
Estimator APIs returned 404 in production. Placeholder phone numbers and several
unverifiable statistics, fake testimonials and ratings were published.

This release:

- Centralises all contact data and statistics in `packages/config/src/business.ts`.
- Removes every unverified claim (see `BUSINESS-VERIFICATION.md`).
- Server-renders or statically generates every public content page, with unique
  titles, descriptions, H1s, self-canonicals, Open Graph/X tags and JSON-LD.
- Adds robots.txt, an XML sitemap (55 canonical URLs), an HTML sitemap, a custom 404,
  301 redirects for legacy URLs and the www host, and noindex for private/thin pages.
- Adds a Coimbatore landing page, 10 reviewed destination guides, 9 service pages,
  a 6-category knowledge centre with 10 original articles, and 4 legal pages.
- Rebuilds the counselling and contact forms (client + server validation, spam
  protection, privacy consent, unticked marketing consent) and fixes the broken APIs.
- Adds consent-gated GA4 event tracking.

No ranking outcome is promised; this makes the site crawlable, accurate and ready
for Search Console.

## B. SEO issues fixed

| Issue (before) | Resolution |
| --- | --- |
| `robots.txt` 404 | `app/robots.ts`: allows public pages, blocks `/portal/` and `/api/`, references the sitemap |
| `sitemap.xml` 404 | `app/sitemap.ts` built from one page registry (`lib/site-pages.ts`), indexable canonical URLs only |
| Every page titled "Mantra Global Education" | `lib/seo.ts#pageMetadata` gives each page a unique title, description, canonical, OG and X tags |
| www and apex both 200 | Middleware 301 www → `https://mantraglobaledu.com` (HTTP → HTTPS was already 308 at the host) |
| Country/course/university/scholarship/resource pages client-rendered; bad slugs returned 200 | Converted to server components with `generateStaticParams`, `dynamicParams = false` → real 404 |
| `/countries/GB` and `/countries/uk` both 200 (duplicates) | Canonical slugs (`/countries/uk`); ISO codes, aliases and uppercase 301 to the slug |
| Resources API 404 in production (page showed "Failed to load articles") | Static, server-rendered knowledge centre |
| Contact form posted to a non-existent API | New `/api/v1/public/contact` route |
| Cost estimator API 404 in production | New `/api/v1/public/cost-estimate` route |
| H1 rendered with `opacity:0` until JS loaded | Hero rewritten as a server component without entrance animation |
| Duplicate desktop/mobile content trees (MANTRA framework) | One responsive ordered list |
| Hidden mobile menu links were still focusable | Menu uses `hidden`, `aria-expanded`, `aria-controls`, Escape to close |
| No breadcrumbs | Visible breadcrumbs + BreadcrumbList on all inner public pages |
| `/shortlist` crashed (React error #185, infinite render loop) | Stable `useSyncExternalStore` snapshots in `lib/shortlist.ts` |
| Notification emails interpolated user input into HTML | Input escaped in `lib/server/mailer.ts` |
| `images.remotePatterns: '**'` (open image proxy) | Remote images disabled; all imagery is local |

## C. Contact information

Confirmed site-wide, from one source (`BUSINESS_CONTACT`):

- Phone: **+91 99401 13077** — link `tel:+919940113077`
- Email: **vinodhini@mantraglobaledu.com** — link `mailto:vinodhini@mantraglobaledu.com`

Global search results (excluding `node_modules`/build output):
`98765` → 0 in the website (fixed in `docs/` deck sources too), `123-4567` → 0,
`admin@vinodhini` → 0, placeholder WhatsApp `919876543210` → 0. Remaining
`@mantraglobaledu.com` addresses are internal only (SMTP `noreply@` sender,
staff notification recipients, seed admin login).

Used in: header (desktop + mobile menu), mobile sticky bar, footer, homepage hero,
Coimbatore section, Coimbatore page, contact page, booking page, every CTA band,
404 page, form error states, legal pages, Organization JSON-LD.

## D. URL inventory (indexable, in sitemap)

Main: `/`, `/study-abroad-consultants-coimbatore`, `/book-counselling`
Destinations: `/countries`, `/countries/{uk,usa,canada,australia,germany,ireland,france,new-zealand,netherlands,singapore}`
Services: `/services`, `/services/{study-abroad-counselling,university-admissions,scholarship-assistance,visa-documentation,sop-lor-support,education-loan-assistance,pre-departure-support,career-guidance,tech-portfolio}`
Resources: `/resources`, `/resources/{study-abroad-guides,scholarships,visa-updates,university-guides,application-guides,career-guides}` + 10 articles under `/resources/<category>/<slug>`
Tools: `/find-a-course`, `/scholarships`, `/universities`, `/cost-estimator`, `/profile-check`, `/document-checklist`
Company: `/about`, `/partners`, `/contact`, `/sitemap`
Legal: `/privacy-policy`, `/terms`, `/cookie-policy`, `/disclaimer`

Total: 55 URLs.

## E. New pages

| Page | Purpose |
| --- | --- |
| `/study-abroad-consultants-coimbatore` | Dedicated local landing page (primary local intent) |
| `/services/*` (9) | One crawlable page per service, with scope and what is not guaranteed |
| `/countries/<slug>` guides (10, replacing code URLs) | Destination guides with official sources and review date |
| `/resources/<category>` (6) | Knowledge-centre categories |
| `/resources/<category>/<slug>` (10) | Original guides (choosing a country, shortlisting, application checklist, SOP, LOR, mistakes, scholarships, visa documents, evaluating universities, tech portfolio) |
| `/book-counselling` | Rebuilt counselling form (replaces `/book-counseling`) |
| `/privacy-policy`, `/terms`, `/cookie-policy`, `/disclaimer` | Legal pages reflecting actual data use |
| `/sitemap` | HTML sitemap |
| `not-found` | Custom 404 with key links and CTAs |
| `/opengraph-image` | Branded 1200×630 social image (generated) |

## F. Substantially modified pages

Homepage (new H1, section order, removed fake testimonials/stats/"real students"
gallery), About, Services hub, Countries hub, Scholarships, Course finder hero,
Universities hub, Partners, Contact, course/university/scholarship detail pages,
header, footer, mobile sticky bar.

## G. Redirect map (all HTTP 301, single hop)

| Old URL | New URL |
| --- | --- |
| `https://www.mantraglobaledu.com/*` | `https://mantraglobaledu.com/*` |
| `/countries/GB`, `/countries/gb`, `/countries/UK` | `/countries/uk` |
| `/countries/US` | `/countries/usa` |
| `/countries/CA`, `AU`, `DE`, `FR`, `IE`, `NZ`, `NL`, `SG` | `/countries/canada`, `australia`, `germany`, `france`, `ireland`, `new-zealand`, `netherlands`, `singapore` |
| `/countries/IT`, `CH`, `AE`, `JP`, `KR`, `MY`, `SE`, `ES`, `FI` | `/countries/italy`, `switzerland`, `uae`, `japan`, `south-korea`, `malaysia`, `sweden`, `spain`, `finland` |
| `/book-counseling` | `/book-counselling` |
| `/courses` | `/find-a-course` |
| `/resources?category=guides` / `visa` / `scholarships` / `universities` / `career` | `/resources/study-abroad-guides` / `visa-updates` / `scholarships` / `university-guides` / `career-guides` |
| `/resources/complete-guide-study-usa-2026` | `/countries/usa` |
| `/resources/uk-student-visa-updates-2026` | `/resources/visa-updates/student-visa-documents-guide` |
| `/resources/study-australia-guide-2026` | `/countries/australia` |
| `/scholarships/<10 unverified ids>` | `/scholarships` |
| Any uppercase public path | lowercase equivalent |

Unknown URLs return a real 404.

## H. Removed / noindexed pages

| Page(s) | Status | Reason |
| --- | --- | --- |
| `/countries/{italy,switzerland,uae,japan,south-korea,malaysia,sweden,spain,finland}` | live, `noindex, follow`, not in sitemap | Only catalog listings — too thin to index until a reviewed guide exists |
| `/courses/<slug>` (65), `/universities/<slug>` (42), `/scholarships/<id>` (24) | live, `noindex, follow`, not in sitemap | Repeat university-published data; entry points are the finder and guides |
| `/shortlist`, `/compare-courses` | `noindex` | Per-visitor state |
| `/login/*`, `/portal/*`, `/api/*` | `noindex` (meta + X-Robots-Tag); portal/api disallowed in robots | Private |
| `/testimonials` | not created | No verified testimonials with consent exist |
| Old DB article URLs | 301 (see G) | They never rendered content in production |

## I. Title / meta map

See the table at the end of this document (generated from the final crawl).

## J. Keyword / page map

| Search intent | Page |
| --- | --- |
| study abroad consultants in Coimbatore (brand + primary) | `/` |
| study abroad / overseas education consultants in Coimbatore, counselling in Coimbatore, Tamil Nadu | `/study-abroad-consultants-coimbatore` |
| study in UK / USA / Canada / Australia / Germany / Ireland… (+ "consultants in Coimbatore" variants) | `/countries/<slug>` |
| study abroad destinations / countries for Indian students | `/countries` |
| study abroad counselling | `/services/study-abroad-counselling` |
| university application assistance | `/services/university-admissions` |
| study abroad scholarships for Indian students | `/scholarships` (listing) + `/resources/scholarships/how-to-find-study-abroad-scholarships` (how-to) |
| SOP and LOR assistance | `/services/sop-lor-support`; how-to intent → SOP and LOR articles |
| overseas education loan assistance | `/services/education-loan-assistance` |
| study abroad course finder | `/find-a-course` |
| universities abroad for Indian students | `/universities` |
| masters abroad for Indian students | `/resources/study-abroad-guides/how-to-choose-a-country-for-your-masters` |

Note: the brief specified the same title for `/` and the Coimbatore page. To avoid two
pages competing for one title, the Coimbatore page uses
"Study Abroad Consultants in Coimbatore: Counselling & Support | Mantra". Watch both
in Search Console; if Google consistently prefers one for the local query, consider
moving the homepage title toward the brand.

## K. Structured data

| Template | Types |
| --- | --- |
| All pages (root layout) | `Organization` (name, url, logo, email, telephone, founder, contactPoint, areaServed), `WebSite` |
| Inner pages | `BreadcrumbList` |
| Service pages | `Service` |
| Articles | `Article` (author = organisation, published/modified dates) |
| About | `Person` (founder) |
| Course pages (noindex) | `Course` |

Not emitted (unverified): LocalBusiness/ProfessionalService, address, opening hours,
ratings, reviews, AggregateRating, awards. All JSON-LD parsed as valid JSON in the
crawl; it has not yet been run through Google's Rich Results Test (needs the
deployed URL).

## L. robots.txt

```
User-Agent: *
Allow: /
Disallow: /portal/
Disallow: /api/
Host: https://mantraglobaledu.com
Sitemap: https://mantraglobaledu.com/sitemap.xml
```

No `Disallow: /`. CSS/JS under `/_next/` is not blocked.

## M. XML sitemap

`/sitemap.xml` — 55 URLs, all `https://mantraglobaledu.com`, all returned HTTP 200,
self-canonical and indexable in the final crawl. Generated from the same registry as
the HTML sitemap. A sitemap index is not needed at this size.

## N. Internal linking

- Header: Study Destinations, Find a Course, Scholarships, Services, Resources, About,
  Partners + phone + "Book Free Counselling" (standard anchors).
- Footer: contact, 8 destinations, 9 services, 6 resource categories + tools,
  company, legal.
- Homepage → destinations, course finder, services, scholarships, resources,
  Coimbatore page.
- Country guides → services, related articles, scholarships, universities, courses.
- Service pages → destinations, related services, related articles.
- Articles → destinations, services, more articles in the category.
- Scholarships → country guides, scholarship assistance, finder.
- Final crawl: 152 unique internal links, all HTTP 200 (no broken links, no redirect hops).

## O. Performance

Measured from the production build (`next build`):

- Content pages are static/SSG; shared first-load JS is 102 kB, and most content
  pages total about 126 kB first-load JS. The course finder (206 kB), profile check
  and cost estimator (about 180 kB) are the heaviest, interactive pages.
- The hero image is preloaded only on desktop layouts, the H1 is no longer animated,
  fonts use `display: swap`, and next/image serves AVIF/WebP.
- Long cache headers were added for `/images` and `/brand`.

Lighthouse / Core Web Vitals were **not** measured in this session. Run PageSpeed
Insights on the deployed URLs; field data will appear in Search Console after traffic.

Known opportunity: `/public/brand` contains large PNGs (up to 2.1 MB) that are not
currently referenced except the emblem (served via next/image).

## P. Accessibility

Tests performed: automated check of heading order (no skipped levels) and image alt
attributes on all 55 sitemap pages; keyboard check of the mobile menu; the form's
error announcement and focus; a horizontal-overflow and clipped-text sweep.

Fixes: skip link, `main` landmark on every page, labelled navs, accessible mobile
menu, native `<details>` FAQs, real `<label>`s, `aria-invalid`/`aria-describedby`
errors and focus on the first error, visible focus on radio pills, `aria-hidden`
decorative icons, gold-on-white small text darkened (#8a5f00) for contrast,
reduced-motion-safe hero animation, success/error live regions.

Not done: a full manual screen-reader pass, and a contrast audit of untouched
pages (portal, login, profile check, cost estimator internals).

## Q. Form test (local production build, no database configured)

| Test | Result |
| --- | --- |
| Empty submit (browser) | 7 field errors shown and focus moved to the first one; nothing sent |
| Invalid body (API) | HTTP 422 with field messages |
| Honeypot filled | HTTP 201 fake success (bot is not told) |
| Submitted < 3 s after first input | HTTP 201 fake success |
| Valid submission | Passed validation; HTTP 503 generic error because no local `DATABASE_URL` — the UI showed the error with phone/email fallbacks |
| > 5 submissions in 10 min from one IP | HTTP 429 |
| Marketing consent default | Unticked |
| Cost estimator API | HTTP 200 with a correct calculation |

**Not tested:** an actual write to the production database or email delivery. Submit
one real test enquiry after deploying and confirm it appears in Admin → CRM and in
the notification inbox.

## R. Broken link test

Final crawl of the local production build: 55 sitemap pages + 152 internal links — 0
non-200, 0 redirects. JavaScript error sweep of 64 pages (sitemap + noindex/private
samples) at 375 px: 0 errors after the shortlist fix. Overflow sweep at 320, 360,
375, 390, 414, 768 and 1024 px: no horizontal page overflow. Long breadcrumb titles
were truncated at 320–375 px and now wrap.

External source links: 75 catalog URLs checked; 9 returned 404 and were replaced
with the university's homepage. 23 more returned 403/503/timeouts, which looks like
bot protection — they could not be confirmed automatically.

## S. Business information requiring verification

See `docs/seo/BUSINESS-VERIFICATION.md`.

## T. Google Search Console checklist (after deploying)

1. Make sure the Vercel domain settings serve `mantraglobaledu.com` as primary (the
   middleware also 301s www).
2. Add a **Domain property** for `mantraglobaledu.com` (DNS TXT verification).
3. Sitemaps → submit `https://mantraglobaledu.com/sitemap.xml`.
4. URL Inspection → Test live URL and Request indexing for: `/`,
   `/study-abroad-consultants-coimbatore`, `/countries/uk`, `/countries/usa`,
   `/countries/canada`, `/countries/australia`, `/countries/germany`,
   `/countries/ireland`, `/services`, `/services/study-abroad-counselling`,
   `/scholarships`, `/find-a-course`.
5. Run the Rich Results Test / Schema Markup Validator on `/`, a service page and an article.
6. Check old URLs (`/countries/GB`, `/book-counseling`, www) return 301 with URL Inspection.
7. Monitor Pages (indexing), Core Web Vitals, HTTPS, Manual actions, Security issues.
8. After 4–8 weeks review Performance → Queries/Pages for the Coimbatore and destination intents.
9. If GA4 is wanted: set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel, then mark
   `counselling_form_submit` and `phone_click` as key events.

Submitting to Search Console does not guarantee indexing or rankings.

## U. Google Business Profile checklist

- [ ] Confirm the exact business name used everywhere: "Mantra Global Education".
- [ ] Decide whether to show an address (only if clients are seen at a verified
      location) or set up as a service-area business covering Coimbatore.
- [ ] Phone +91 99401 13077, website https://mantraglobaledu.com/ (or the Coimbatore page).
- [ ] Verified opening hours.
- [ ] Category, e.g. "Educational consultant".
- [ ] Once verified, add the profile URL and hours to `BUSINESS_CONTACT`, which can then
      enable a `ProfessionalService` schema with address.
- [ ] Ask genuine clients for reviews on the profile (never write or incentivise reviews).

## V. Remaining issues

- Nothing has been deployed or committed; production still runs the old site.
- Database writes and email delivery for forms were not tested (no local database).
- Lighthouse/Core Web Vitals were not measured.
- Content (guides, services, articles, legal) needs review by the business and,
  for legal pages, by a lawyer.
- Course/university/scholarship detail pages are noindexed until enriched; the
  catalog's tuition figures are recorded data, labelled as such.
- The old Express API (`apps/api`) still contains an unused
  `/public/articles` endpoint and seed articles with a placeholder author; they are
  not used by the website.
- PDF/PPTX decks in `docs/` need regenerating with the corrected contact details.
- Rotate the admin password if the formerly committed default was ever used.
- `prisma db push --accept-data-loss` runs on every deploy (pre-existing risk).

---

## Final title / meta / H1 map (from the crawl)

| URL | Title | Meta description | H1 | Schema |
|---|---|---|---|---|
| `/` | Study Abroad Consultants in Coimbatore \| Mantra Global Education | Personalised study abroad counselling, university applications, scholarship and visa guidance — plus Mantra.Ai profile building. Book a free session. | Study Abroad with Expert Guidance and a Career-Ready Profile | Organization, WebSite |
| `/study-abroad-consultants-coimbatore` | Study Abroad Consultants in Coimbatore: Counselling & Support \| Mantra | Study abroad counselling for Coimbatore students and parents: country and course selection, applications, scholarships, visa documents and profile support. | Personalised Study Abroad Counselling in Coimbatore | Organization, WebSite, BreadcrumbList |
| `/book-counselling` | Book Free Study Abroad Counselling \| Mantra Global Education | Request a free study abroad counselling session online, by phone or in Coimbatore. Get help choosing a country, course and universities, and plan your applications. | Book Free Study Abroad Counselling | Organization, WebSite, BreadcrumbList |
| `/countries` | Study Abroad Destinations, Universities & Costs \| Mantra | Compare study destinations for Indian students — UK, USA, Canada, Australia, Germany, Ireland and more — by intakes, costs, visas and post-study options. | Study Abroad Destinations for Indian Students | Organization, WebSite, BreadcrumbList |
| `/countries/uk` | Study in the UK: Universities, Costs & Intakes \| Mantra | Plan your UK studies: one-year master’s, UCAS applications, intakes, Student visa basics, costs and the Graduate route, with expert counselling. | Study in the UK: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/usa` | Study in the USA: Universities, Costs & Intakes \| Mantra | Plan your US studies: choosing universities, Fall and Spring intakes, GRE/SAT and English tests, F-1 visa steps, costs and OPT. | Study in the USA: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/canada` | Study in Canada: Colleges, Universities & Intakes \| Mantra | Plan your studies in Canada: universities vs colleges, intakes, study permits, attestation letters, costs and post-graduation work options. | Study in Canada: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/australia` | Study in Australia: Universities, Costs & Intakes \| Mantra | Plan your studies in Australia: February and July intakes, the subclass 500 Student visa, Genuine Student requirement, costs and graduate visas. | Study in Australia: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/germany` | Study in Germany: Public Universities, APS & Intakes \| Mantra | Plan your studies in Germany: low-tuition public universities, English-taught master’s, APS certificate, blocked account, intakes and job search. | Study in Germany: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/ireland` | Study in Ireland: Universities, Visa & Intakes \| Mantra | Plan your studies in Ireland: one-year master’s, September intake, study visa and Stamp 2, part-time work and the Third Level Graduate Programme. | Study in Ireland: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/france` | Study in France: Universities, Campus France & Visa \| Mantra | Plan your studies in France: public universities and grandes écoles, English-taught programmes, Campus France, the VLS-TS visa and work rights. | Study in France: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/new-zealand` | Study in New Zealand: Universities, Visa & Intakes \| Mantra | Plan your studies in New Zealand: eight universities, February and July intakes, student visa basics, part-time work and post-study work options. | Study in New Zealand: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/netherlands` | Study in the Netherlands: Universities & Intakes \| Mantra | Plan your studies in the Netherlands: research vs applied sciences universities, Studielink, residence permits and the orientation year. | Study in the Netherlands: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/countries/singapore` | Study in Singapore: Universities, Student’s Pass & Costs \| Mantra | Plan your studies in Singapore: autonomous universities, private institutions, the Student’s Pass, tuition grant obligations and work passes. | Study in Singapore: Universities, Costs and Intakes | Organization, WebSite, BreadcrumbList |
| `/services` | Study Abroad Counselling & Admission Services \| Mantra | Study abroad counselling, university admissions, scholarships, visa documentation, SOP/LOR support, education loans, pre-departure and career guidance. | Study Abroad Counselling and Admission Services | Organization, WebSite, BreadcrumbList |
| `/services/study-abroad-counselling` | Study Abroad Counselling in Coimbatore & Online \| Mantra | One-to-one study abroad counselling to help you choose a country, course and universities that fit your goals, academics and budget. Online or from Coimbatore. | Study Abroad Counselling | Organization, WebSite, Service, BreadcrumbList |
| `/services/university-admissions` | University Application & Admissions Assistance \| Mantra | Help with university shortlisting, application forms, document preparation and deadlines for universities abroad, from first application to offer comparison. | University Admissions & Application Assistance | Organization, WebSite, Service, BreadcrumbList |
| `/services/scholarship-assistance` | Study Abroad Scholarship Assistance for Indian Students \| Mantra | Find scholarships you may be eligible for, understand deadlines and requirements, and prepare stronger scholarship applications for study abroad. | Scholarship Assistance | Organization, WebSite, Service, BreadcrumbList |
| `/services/visa-documentation` | Student Visa Documentation Guidance \| Mantra Global Education | Understand student visa requirements, organise financial and academic documents, and prepare for visa interviews — with guidance from Mantra Global Education. | Student Visa Documentation Guidance | Organization, WebSite, Service, BreadcrumbList |
| `/services/sop-lor-support` | SOP and LOR Assistance for Study Abroad \| Mantra | Guidance on writing your statement of purpose and requesting strong letters of recommendation — structure, feedback and review, written in your own voice. | SOP & LOR Support | Organization, WebSite, Service, BreadcrumbList |
| `/services/education-loan-assistance` | Education Loan Guidance for Study Abroad \| Mantra | Understand overseas education loan options, documentation and timelines so you can plan funding for your studies abroad with confidence. | Education Loan Assistance | Organization, WebSite, Service, BreadcrumbList |
| `/services/pre-departure-support` | Pre-Departure Support for Students Going Abroad \| Mantra | Prepare for life abroad: accommodation, travel, forex, health insurance, packing and arrival planning — practical pre-departure guidance from Mantra Global Education. | Pre-Departure Support | Organization, WebSite, Service, BreadcrumbList |
| `/services/career-guidance` | Career Guidance for Study Abroad Students \| Mantra | Connect your course choice to your career goals: understand roles, skills and post-study options before you choose where and what to study. | Career Guidance for Students Planning to Study Abroad | Organization, WebSite, Service, BreadcrumbList |
| `/services/tech-portfolio` | Tech Portfolio & Profile Development with Mantra.Ai \| Mantra | Build a technology portfolio while you prepare for and pursue study abroad — projects, skills and a professional profile, supported by Mantra.Ai. | Tech Portfolio & Profile Development with Mantra.Ai | Organization, WebSite, Service, BreadcrumbList |
| `/resources` | Study Abroad Resources & Guides \| Mantra Global Education | Practical study abroad guides for Indian students: choosing a country, shortlisting universities, SOPs and LORs, scholarships, student visa documents and career planning. | Study Abroad Resources and Guides | Organization, WebSite, BreadcrumbList |
| `/resources/study-abroad-guides` | Study Abroad Guides for Indian Students \| Mantra | Step-by-step guides to planning your studies abroad — choosing a country, shortlisting universities and building a realistic timeline. | Study Abroad Guides | Organization, WebSite, BreadcrumbList |
| `/resources/scholarships` | Study Abroad Scholarship Guides \| Mantra Global Education | How to find scholarships, check eligibility and prepare stronger funding applications for study abroad. | Scholarship Guides | Organization, WebSite, BreadcrumbList |
| `/resources/visa-updates` | Student Visa Guidance & Document Preparation \| Mantra | Practical guidance on preparing student visa applications, with links to the official government sources for each country. | Visa Guidance | Organization, WebSite, BreadcrumbList |
| `/resources/university-guides` | How to Evaluate Universities Abroad \| Mantra Global Education | How to evaluate universities and programmes abroad beyond headline rankings. | University Guides | Organization, WebSite, BreadcrumbList |
| `/resources/application-guides` | University Application Guides: SOP, LOR & Checklists \| Mantra | Guides to statements of purpose, letters of recommendation, application checklists and common mistakes. | Application Guides | Organization, WebSite, BreadcrumbList |
| `/resources/career-guides` | Career Guides for Students Studying Abroad \| Mantra | Planning skills, projects and experience so your studies abroad support your long-term career. | Career Guides | Organization, WebSite, BreadcrumbList |
| `/resources/study-abroad-guides/how-to-choose-a-country-for-your-masters` | How to Choose a Country for Your Master’s Abroad \| Mantra | A practical framework for comparing study destinations by course length, total cost, intakes, visa rules and post-study options. | How to Choose a Country for Your Master’s | Organization, WebSite, Article, BreadcrumbList |
| `/resources/study-abroad-guides/how-to-shortlist-universities-abroad` | How to Shortlist Universities Abroad: A Step-by-Step Guide \| Mantra | Build a balanced shortlist of universities using course content, entry requirements, cost and fit — not rankings alone. | How to Shortlist Universities Abroad | Organization, WebSite, Article, BreadcrumbList |
| `/resources/application-guides/study-abroad-application-checklist` | Study Abroad Application Checklist: Documents & Steps \| Mantra | A step-by-step checklist of the documents and actions most university applications abroad require, from transcripts to offer acceptance. | Study Abroad Application Checklist | Organization, WebSite, Article, BreadcrumbList |
| `/resources/application-guides/how-to-write-a-strong-sop` | How to Write a Strong SOP for Universities Abroad \| Mantra | What admissions teams look for in a statement of purpose, a clear structure you can follow, and common mistakes to avoid. | How to Write a Strong Statement of Purpose | Organization, WebSite, Article, BreadcrumbList |
| `/resources/application-guides/letter-of-recommendation-guide` | Letters of Recommendation for Study Abroad: A Guide \| Mantra | Who to ask for a letter of recommendation, how to ask, and how to help your referees write a useful letter. | Letter of Recommendation Guide | Organization, WebSite, Article, BreadcrumbList |
| `/resources/application-guides/common-study-abroad-application-mistakes` | Common Study Abroad Application Mistakes to Avoid \| Mantra | The most common mistakes we see in study abroad applications, from missed deadlines to inconsistent documents, and how to avoid them. | Common Study Abroad Application Mistakes | Organization, WebSite, Article, BreadcrumbList |
| `/resources/scholarships/how-to-find-study-abroad-scholarships` | How to Find Study Abroad Scholarships for Indian Students \| Mantra | Where study abroad scholarships come from, how to check eligibility and deadlines, and how to prepare a competitive application. | How to Find Study Abroad Scholarships as an Indian Student | Organization, WebSite, Article, BreadcrumbList |
| `/resources/visa-updates/student-visa-documents-guide` | Student Visa Documents: How to Prepare Your Application \| Mantra | The documents most student visa applications require, how to keep them consistent, and where to find the official rules for each country. | Preparing Your Student Visa Documents | Organization, WebSite, Article, BreadcrumbList |
| `/resources/university-guides/how-to-evaluate-a-university-abroad` | How to Evaluate a University Abroad Beyond Rankings \| Mantra | Questions to ask about course content, teaching, location, support and outcomes when comparing universities abroad. | How to Evaluate a University Abroad Beyond Rankings | Organization, WebSite, Article, BreadcrumbList |
| `/resources/career-guides/building-a-tech-portfolio-while-studying-abroad` | Building a Tech Portfolio While Studying Abroad \| Mantra | How students in computing, data and engineering can build a portfolio of real projects before and during their studies abroad. | Building a Tech Portfolio While Studying Abroad | Organization, WebSite, Article, BreadcrumbList |
| `/find-a-course` | Find Courses to Study Abroad \| Mantra Global Education | Search study abroad courses by country, university, study level, tuition and intake. Shortlist programmes and get free counselling from Mantra Global Education. | Find Courses to Study Abroad | Organization, WebSite, BreadcrumbList |
| `/scholarships` | Study Abroad Scholarships for Indian Students \| Mantra | Browse government and university scholarship programmes for study in the UK, USA, Australia, Germany, Canada, Ireland and more, with links to each official source. | Study Abroad Scholarships for Indian Students | Organization, WebSite, BreadcrumbList |
| `/universities` | Universities Abroad for Indian Students \| Mantra Global Education | Explore universities in the UK, USA, Australia, Canada, Germany and more listed in our course finder, with courses, recorded fees and scholarship links. | Universities Abroad | Organization, WebSite, BreadcrumbList |
| `/cost-estimator` | Study Abroad Cost Estimator \| Mantra Global Education | Estimate the total cost of studying abroad, including tuition, living expenses, visa and insurance, for popular destinations. | Cost Estimator | Organization, WebSite |
| `/profile-check` | Study Abroad Profile Check \| Mantra Global Education | A free four-step readiness check for your target study destination. See where your profile stands and what to work on before you apply. | Check your study abroad readiness | Organization, WebSite |
| `/document-checklist` | Study Abroad Document Checklist \| Mantra Global Education | Country-specific checklists of the application and student visa documents commonly needed for undergraduate and postgraduate study abroad. | Application Document Checklist | Organization, WebSite |
| `/about` | About Mantra Global Education \| Coimbatore | Mantra Global Education is a Coimbatore study abroad consultancy founded by Vinodhini Y., and the education vertical of Mantra.Ai. Learn how we work. | About Mantra Global Education | Organization, WebSite, Person, BreadcrumbList |
| `/partners` | Partner with Mantra Global Education \| Universities & Colleges | Partnership opportunities for universities, engineering colleges and career partners who want to work with Mantra Global Education. | Partner with Mantra Global Education | Organization, WebSite, BreadcrumbList |
| `/contact` | Contact Mantra Global Education \| Study Abroad Counselling | Contact Mantra Global Education by phone on +91 99401 13077 or email vinodhini@mantraglobaledu.com for study abroad counselling, applications and partnership enquiries. | Contact Mantra Global Education | Organization, WebSite, BreadcrumbList |
| `/sitemap` | Site Map \| Mantra Global Education | A list of all main pages on the Mantra Global Education website, grouped by section. | Site Map | Organization, WebSite, BreadcrumbList |
| `/privacy-policy` | Privacy Policy \| Mantra Global Education | How Mantra Global Education collects, uses and protects personal information submitted through this website. | Privacy Policy | Organization, WebSite, BreadcrumbList |
| `/terms` | Terms of Use \| Mantra Global Education | The terms that apply to using the Mantra Global Education website and its tools. | Terms of Use | Organization, WebSite, BreadcrumbList |
| `/cookie-policy` | Cookie Policy \| Mantra Global Education | The cookies and browser storage used by the Mantra Global Education website and how to control them. | Cookie Policy | Organization, WebSite, BreadcrumbList |
| `/disclaimer` | Disclaimer \| Mantra Global Education | Important information about the limits of the guidance provided by Mantra Global Education. | Disclaimer | Organization, WebSite, BreadcrumbList |
