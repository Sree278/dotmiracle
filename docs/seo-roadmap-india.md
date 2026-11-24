# DotMiracle: India-wide SEO roadmap

> **Historical plan:** This document describes an earlier site and includes outdated URLs and case-study statements. For the current React site's 32-page inventory, evidence caveats, keyword map and build workflow, use [keyword-placement-plan.md](keyword-placement-plan.md). Do not treat the old baseline or URLs below as current.

## Objective and positioning

Help small and growing businesses across India find relevant SEO and website services, understand the work and make an informed enquiry. Retain the site's existing Chennai-base claim; services can be delivered remotely without implying a local office in every city. Target markets based on evidence and delivery fit, not city names alone.

**Important:** City and keyword choices below are hypotheses. No Search Console, Keyword Planner, Analytics, competitor-rank or enquiry data was available for this roadmap. There is no basis here to claim that a city has the highest demand, that a keyword is easy, or that any ranking or lead outcome is guaranteed.

## Current-site baseline

- The site already has real, prerendered URLs, titles, descriptions, canonical links, structured data, a sitemap and a robots file. The source is `index.html`; run `node scripts/build.mjs` and commit `public/` after edits.
- Core pages include SEO, local SEO, website design, maintenance, pricing and three published case studies. Search pages already exist for Bengaluru and Hyderabad; web design pages exist for Chennai, Hyderabad and Kochi. Review these before adding competing pages.
- Mindtech's Bengaluru case study has a reported enquiry figure, not fully analytics-attributed results. Penkkasavvu and Service Joy are delivery examples, not evidence of SEO growth. Keep those distinctions.
- The contact journey opens an email draft; the visitor must send it. Clicking or opening the draft is **not** a completed enquiry.
- The supplied Google container snippet is present. Verify its firing, consent behavior and any analytics configuration in Tag Assistant before assuming page views or conversions are recorded.
- This roadmap is a code/content review, not a Search Console audit, a crawl/indexation report, a Core Web Vitals assessment, or proof that a Business Profile is eligible or optimized.

## Where to focus first

| Priority | Market/intent | Why it is a candidate | Evidence gate before expansion |
| --- | --- | --- | --- |
| 1 | India-wide SEO and local SEO | Core offers already have useful service and pricing pages; available remotely | Confirm business fit and relevant queries in Search Console; inspect lead quality |
| 1 | Chennai website/SEO | Existing stated base and Service Joy delivery; existing combined page | Verify location details and discover whether separate SEO intent needs a distinct page rather than splitting the existing one |
| 1 | Bengaluru SEO | A named Bengaluru SEO case study and existing service page | Check query impressions, fit and actual enquiry data; do not extrapolate this result to other clients |
| 2 | Hyderabad SEO and web design; Kochi web design | Existing pages and regional delivery examples | Review search intent, distinctiveness and demand; the case studies are not Hyderabad-specific proof |
| 3 | Delhi NCR, Mumbai, Pune, Kerala beyond Kochi, and other cities | Possible expansion candidates, not a claim of high demand | Compare query data, commercially relevant demand, competition, capacity and unique evidence before creating a city page |
| Later | Clinics, hospitality, real estate, ecommerce and education | Potential niches, not confirmed client expertise | Confirm permission, experience, useful examples and buyer questions before publishing industry claims |

### Market-selection procedure

1. Export the past 3 and 12 months of Search Console queries and landing pages, excluding branded searches separately. Search Console country filters are not city-level demand estimates; clicks and impressions are only for this site's appearances, not total search volume.
2. Use Keyword Planner or another licensed source to compare India/city-level keyword ranges and trend direction. Record date range, location, language, source and limitations; do not treat modeled estimates as observed demand.
3. Review actual qualified enquiries and closed work by city and service, with consent and without putting personal information into analytics. Ask sales/operations whether remote delivery and support are feasible.
4. Inspect current results for each query: user intent, dominant page types, genuine local competition and whether an existing DotMiracle page already satisfies the query.
5. Score each candidate 0–3 for verified commercial demand, delivery fit, distinct evidence and opportunity to make a useful page. Treat missing data as unknown, not zero or a high score. Publish only where the owner can verify details and the page offers material local value.

## Intent-to-page map

Keyword examples are topics to validate, not verified search volumes. Each cluster has one primary destination to reduce overlap.

| Intent and example searches | Primary page | Next action |
| --- | --- | --- |
| Commercial: SEO services India, monthly SEO for small businesses | `/seo-services/` | Pricing or relevant enquiry |
| Commercial: local SEO, Google Business Profile support | `/local-seo-services/` | Local SEO enquiry |
| Research/problem: small business SEO audit checklist, why a page is not found | `/seo-audit-checklist/` | SEO services, pricing or Mindtech case study |
| Commercial: SEO company Bangalore / Bengaluru | `/seo-company-bangalore/` | Mindtech case study or enquiry |
| Commercial: SEO company Hyderabad | `/seo-company-hyderabad/` | Regional case study with its actual location disclosed or enquiry |
| Commercial: website design Chennai, Hyderabad, Kochi | Existing city website pages | Related delivery case study or enquiry |
| Decision: SEO and website costs | `/pricing/` | Relevant service or scoped enquiry |
| Trust: evidence and process | `/work/`, `/about/`, individual case studies | Relevant service or enquiry |
| Potential SEO in Kerala, Kochi, Delhi or Mumbai | No new page until evidence gate is met | Test existing service/locations pages against actual search intent |
| Potential industry-specific SEO | Research only; no industry page yet | Publish only with genuine sector knowledge, evidence and useful differentiation |

Do not create nearly identical city pages by swapping place names or make unsupported office, client, review or ranking claims. Maps visibility and website search are different journeys; a remote client service area is not proof of eligibility for an office listing in each city.

## 90-day execution

### Days 1–30: establish a trustworthy baseline

- Verify Search Console ownership and sitemap submission; inspect indexing, canonical selection, important redirects and errors. Validate HTML structured data with Google's tools; FAQ markup does not guarantee a rich result.
- Test mobile layouts, keyboard access, contact flow, email draft/fallback and representative live pages. Run PageSpeed Insights and record field data where available; do not state performance results before measuring.
- Confirm the container is published and firing, define consent requirements, and verify Analytics events. A `mailto:` click or Gmail link is an intent signal, not a sent email or qualified lead.
- Export a baseline for non-branded queries, impressions, clicks and landing pages. Separately record qualified enquiries and origin only when known; do not send names, email addresses, phone numbers, form content or other personal data to Analytics.
- Review the existing SEO, local SEO, pricing, Bengaluru and Chennai pages for uniqueness, current prices and accurate claims. The new SEO audit checklist supports informational intent and links back to the relevant service and proof.

### Days 31–60: validate intent and improve pages

- Interview several consenting customers or prospects about the search, comparison and hesitation that preceded contact; document actual language and limitations of the sample.
- Compare market candidates using the evidence gate above. Improve existing pages before adding new geography. Review Kerala specifically if validated demand and genuine coverage justify it; do not describe DotMiracle as Kerala-based without confirmation.
- Review the prepared technical SEO, Google Maps visibility and SEO-vs-Ads guides against real customer questions before publication. Assign a named reviewer only with approval; avoid invented author credentials, examples or statistics. Choose any further content using actual customer and search evidence.
- Add approved proof near relevant offers. Preserve case-study attribution caveats and distinguish delivery from measured SEO outcomes.

### Days 61–90: expand only where justified

- If demand and unique evidence support one city or industry opportunity, publish one genuinely differentiated page, link it from related service/locations content and submit the updated sitemap. Otherwise improve existing pages instead.
- Pursue relevant partnerships and legitimate citations only when details and eligibility are accurate. Do not buy spam links or invent Google Business Profiles, reviews or addresses.
- Compare matched periods, noting sample size, seasonality and time since publication. Improve pages based on qualified enquiries, relevant clicks and user feedback—not rankings alone. Keep an experiment log of changes and decision dates.

## Measurement and safeguards

| Question | Measure | Constraint |
| --- | --- | --- |
| Are relevant people discovering us? | Non-branded Search Console impressions/clicks by query and landing page | Not total market demand; avoid over-reading small numbers |
| Are visitors considering the offer? | Service and case-study engagement, if analytics is configured with appropriate consent | Engagement is not a lead |
| Are visitors trying to make contact? | Aggregate email-draft/copy/Gmail-intent events after verified implementation | These do not prove a message was sent |
| Are enquiries qualified? | Manually reviewed, permission-appropriate lead counts by service/source | Store personal information outside analytics; establish a baseline before targets |
| Can visitors use the site? | Contact-flow checks, accessibility review and actual performance measurements | Record device, date and test conditions |

**Owner inputs needed:** access to Search Console and the chosen analytics property; confirmation of services, pricing, coverage and Business Profile eligibility; consent to use client evidence; and a privacy/consent approach. Actual market volumes, rankings, enquiry counts and customer research remain to be collected.

## References

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google spam policies and doorway abuse: https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse
- Google Business Profile guidelines: https://support.google.com/business/answer/3038177
- Google structured data features: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Search Console help: https://support.google.com/webmasters/answer/9128668
