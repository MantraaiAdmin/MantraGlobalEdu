# Business information requiring verification

Nothing in this list is shown on the public website until it has been confirmed.
When an item is verified, update `packages/config/src/business.ts` (the single
source of truth) and redeploy.

## Verified (in use)

| Item | Value |
| --- | --- |
| Business name | Mantra Global Education |
| Website | https://mantraglobaledu.com/ |
| Phone | +91 99401 13077 (`tel:+919940113077`) |
| Email | vinodhini@mantraglobaledu.com |
| City | Coimbatore, Tamil Nadu (city level only) |

## Not verified — removed from the site or never shown

| Claim / data | Where it appeared | Action taken | To re-enable |
| --- | --- | --- | --- |
| "Around 700+" students placed / guided | Hero, founder section, About, Services, Partners | Removed | Evidence of count (CRM export) → set `BUSINESS_STATS.studentsGuided` |
| "42+ partner universities" vs "15+ partner universities" (contradictory) | Hero, About, Partners | Removed. Catalog count is now described as "universities in our course finder", not partners | Signed partnership agreements → set `BUSINESS_STATS.partnerUniversities` |
| "94% visa success rate" | Hero, Services | Removed | Auditable visa outcome data |
| "94% partner satisfaction" | Partners | Removed | Survey data |
| "Join thousands of students" / "trusted by thousands" | Showcase, Services | Removed | — |
| "500+ programs available", "4.9★ avg. counselor rating" | Course finder hero | Removed | Real review source (e.g. Google Business Profile) |
| Three testimonials with 5-star ratings (Aditya M., Lakshmi R., Karthik S.) | Homepage | Removed — no evidence of consent or authenticity | Written consent + verifiable outcome per testimonial |
| Fake article counts (24/18/31/42/15) | Homepage resources | Replaced with real counts | — |
| WhatsApp number 919876543210 (placeholder) | Mobile sticky bar, Contact | Removed; replaced with Call button | Verified WhatsApp Business number → `BUSINESS_CONTACT.whatsappNumber` |
| Street address, postal code | — | Never shown | Verified address → enables LocalBusiness schema, map, NAP |
| Office hours | — | Never shown | Verified hours |
| In-person counselling in Coimbatore | Booking form option "by arrangement" | Kept as "by arrangement", no address | Confirm an office/meeting location exists |
| Google Business Profile URL, social profiles | — | Not linked | Add to `BUSINESS_CONTACT.sameAs` |
| 10 scholarship entries (see `apps/web/src/data/scholarship-verification.ts`) | Scholarship finder | Hidden; URLs 301 to /scholarships | Confirm each programme exists on the provider's site |
| Award amounts and deadlines for all scholarships | Scholarship finder, country pages | No longer displayed (recorded data not re-verified for the current cycle) | Re-verify per cycle and add a checked date |

## Kept, but evidence should be on file before Search Console submission

These were supplied by the business and are shown once (founder section and About
page) rather than repeated as badges:

- Founder: 10+ years of experience in international education counselling
- Former IDP counsellor
- British Council certified counsellor
- Pan-India Top 17 counsellors / Best Counsellor — Silver category

If any of these cannot be evidenced, remove it from `FOUNDER.credentials` in
`packages/config/src/business.ts`.

## Content review

- Destination guides (`apps/web/src/data/country-guides.ts`), service pages and
  resource articles were written for this release and dated 22 Oct 2026. They
  avoid precise, frequently changing figures and link to official sources, but
  a counsellor should review them; then consider naming a reviewer on articles.
- Legal pages (`apps/web/src/data/legal.ts`) describe actual data collection but
  have not been reviewed by a lawyer. No company registration details are shown
  because none were provided.

## Other assets still containing old details

- `docs/*.pdf` and `docs/*.pptx` sales decks were generated before this change.
  Their source files were updated (phone, email, domain); regenerate the PDFs/PPTX.
- Other deck HTML in `docs/` may still contain marketing statistics (e.g. student
  counts) — review before reuse.

## Security follow-up

- A default admin password was committed in `scripts/vercel-build.sh` and
  `scripts/setup-production-db.sh` (now removed). It remains in git history:
  **rotate the admin password** if that default was ever used in production.
- `scripts/vercel-build.sh` runs `prisma db push --accept-data-loss` on every
  deploy. Consider switching to `prisma migrate deploy`.
