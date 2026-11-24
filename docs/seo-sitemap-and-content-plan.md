# DotMiracle: SEO sitemap, page briefs and internal linking map

> **Historical plan:** This document describes an earlier site and includes outdated URLs and case-study statements. For the current React site's 32-page inventory, evidence caveats, keyword map and build workflow, use [keyword-placement-plan.md](keyword-placement-plan.md). Do not treat the old baseline or URLs below as current.

## 1. Scope and decisions

**Goal:** Help qualified prospects across India discover the right service, evaluate credible evidence and take an informed next step. The current site says DotMiracle is based in Chennai and serves clients remotely across India. The suggested Kerala-first positioning, Kerala office and sector specialization have **not been confirmed**. Do not publish those claims as facts without owner confirmation.

**Status key:** **Existing** = in the current site source; **Draft** = prepared in this branch but not yet published; **Proposed** = a potential future page, not created or promised. No search-volume, ranking, conversion or competitor data was available for this plan. The suggested queries are intent hypotheses, not proven demand or difficulty. The first priorities reflect existing offers and evidence, not a ranking of cities by search demand.

**URL policy:** Keep the existing real, crawlable URLs. The nested paths in the suggestion are a conceptual hierarchy, not a requirement to move URLs. Moving published URLs solely for a tidier directory creates migration work; if a move is ever justified, map and test a permanent redirect, canonical, sitemap and internal-link update for every old URL. A clean directory name alone does not guarantee better rankings.

**Evidence policy:** Mindtech's 13+ enquiries in three months were reported by management and checked in conversations, not fully analytics-attributed. Penkkasavvu and Service Joy demonstrate delivered websites/platforms; do not present those as measured SEO results. Do not invent local offices, client results, reviews, author credentials, guaranteed rankings or new service pricing.

## 2. Actual sitemap and recommended roles

This is the current source sitemap, including the unpublished audit checklist and guide cluster prepared on this branch. Grouping is logical; indentation does not imply a URL change.

```text
/                                      Home [existing]
/about/                                About / approach [existing]
/services/                             Services hub [existing]
  /seo-services/                       SEO services [existing]
  /local-seo-services/                 Local SEO [existing]
  /website-design/                     Website design [existing]
  /website-maintenance/                Maintenance [existing]
  /saas-development-company-chennai/   SaaS [existing]
  /mvp-development-company/            MVP development [existing]
  /custom-software-development-company-chennai/  Custom software [existing]
  /ecommerce-website-development-chennai/        Ecommerce build [existing]
/locations/                            Service areas [existing]
  /website-design-company-chennai/     Chennai web + SEO [existing]
  /seo-company-bangalore/              Bengaluru SEO [existing]
  /seo-company-hyderabad/              Hyderabad SEO [existing]
  /website-design-company-hyderabad/   Hyderabad web [existing]
  /website-design-company-kochi/       Kochi web [existing]
/pricing/                              Pricing guide [existing]
/work/                                 Case-study hub [existing]
  /work/mindtech-solutions/            SEO + revamp [existing]
  /work/pennkasavvu/                   Ecommerce delivery [existing]
  /work/servicejoy/                    Booking-platform delivery [existing]
/contact/                              Enquiry [existing]
/seo-audit-checklist/                  Educational SEO checklist [draft]
/guides/                               SEO resources hub [draft]
  /guides/technical-seo-checklist/     Technical SEO checklist [draft]
  /guides/google-maps-visibility/      Local visibility troubleshooting [draft]
  /guides/seo-vs-google-ads/           SEO vs paid search comparison [draft]
```

`/404.html` is a utility page, not an indexable content destination; the generated sitemap should contain canonical pages only. A standalone FAQ hub is not needed: keep service FAQs on their relevant pages.

### Proposed additions, gated by research

| Proposed URL | Main intent | Decision gate / overlap to avoid |
| --- | --- | --- |
| `/technical-seo-services/` | Commercial: help implementing technical SEO | Confirm it is an actual standalone offer and query intent needs more than `/seo-services/`; gather scope, exclusions, example deliverables and pricing approach. |
| `/seo-audit-services/` | Commercial: commission a scoped audit | Confirm deliverables, price/quotation and whether it is separate from monthly SEO. Keep distinct from the **educational** `/seo-audit-checklist/`. |
| `/ecommerce-seo-services/` | Commercial: improve organic search for a store | Confirm capability and deliverables; distinct from ecommerce **website development** and its delivery case study. |
| `/seo-services-kerala/` | Regional commercial intent | Validate demand and coverage; no Kerala office claim unless verified. Require differentiated service, customer questions and relevant local context. |
| `/seo-company-kochi/` | Kochi SEO intent | Add only if search intent is distinct from the Kerala/India pages and the existing Kochi web page; no invented local SEO case study. |
| `/seo-company-thiruvananthapuram/` and `/seo-company-kozhikode/` | City-specific SEO intent | Validate demand, real delivery capacity and unique material first. Account for Trivandrum/Calicut name variants naturally, not by publishing duplicate pages. |
| `/seo-for-clinics/`, `/seo-for-hotels/`, `/seo-for-real-estate/` | Industry commercial intent | Publish only when actual expertise, customer questions and permissioned evidence justify a useful sector page. No claims of regulated professional expertise. |

Do not launch every proposed page at once. No search-volume estimates or claim that Kerala is the highest-demand market is implied.

## 3. Page-by-page content and linking plan

Each row is a brief, not a claim that all sections already exist. Add content only when DotMiracle can substantiate it. **Primary action** refers to an existing path; `/contact/` opens an email draft that the visitor must send.

### Core and trust pages

| Page | Audience / intent | Content to maintain or add | Primary action | Contextual links |
| --- | --- | --- | --- | --- |
| `/` | Broad: businesses looking for search, website and care | Clear India-wide offer and actual base; goal-led paths; verified case-study summary; pricing starting points; how to start. Avoid targeting every city/industry in the headline. | `/contact/` | `/seo-services/`, `/local-seo-services/`, `/website-design/`, `/work/mindtech-solutions/`, `/seo-audit-checklist/` when published |
| `/services/` | Compare offers | Short problem/outcome summaries; which service fits; scope and links to detail pages; help for visitors unsure what they need. | Relevant service page | Four core services, SaaS/software pages, `/pricing/`, `/contact/` |
| `/about/` | Evaluate who is behind the work | Explain team, methods, working style and actual service coverage; add owner-approved identities or credentials only when supplied. | `/contact/` | `/work/`, `/services/`, `/locations/` |
| `/locations/` | Understand where remote services are available | Explain Chennai base and remote coverage; group cities by service area without claiming offices or measured demand; describe limits of Maps eligibility. | Relevant service | Existing city pages, `/seo-services/`, `/local-seo-services/`, `/contact/` |
| `/pricing/` | Commercial investigation: cost and scope | Explain existing verified starting prices, scope boundaries, price drivers, examples and what must be quoted. Review periodically with owner. | `/contact/` | `/seo-services/`, `/website-design/`, `/website-maintenance/` |
| `/work/` | Evaluate proof | Introduce all three engagements; label SEO outcome versus website delivery; indicate where results and attribution are available. | Relevant case study | Three `/work/…/` pages, appropriate services |
| `/contact/` | Ready to enquire | Explain service-specific questions, email-draft behavior and what visitor must do; keep fallback accessible; describe next steps without promising a response SLA. | Open and send the email draft | `/services/`, `/pricing/`, relevant case studies for visitors not ready |

### SEO and website services

| Page | Audience / intent | Content to maintain or add | Primary action | Contextual links |
| --- | --- | --- | --- | --- |
| `/seo-services/` | Businesses seeking ongoing SEO | Who it fits, research/fixes/content, measurement, scope and current starting price, expectations and FAQ; no ranking guarantees. | `/contact/?service=seo` | `/seo-audit-checklist/`, `/local-seo-services/`, `/pricing/`, `/work/mindtech-solutions/` |
| `/local-seo-services/` | Businesses serving a defined area | Eligibility, accurate profiles, categories, reviews, local pages and measurement; explain that relevance, distance and prominence affect results. | `/contact/?service=local-seo` | `/seo-services/`, `/locations/`, `/seo-audit-checklist/` |
| `/website-design/` | New or improved business website | Audience, discovery, design/build, mobile use, launch, ownership, integrations and verified pricing; proof of relevant delivery. | Website enquiry through `/contact/` | `/work/pennkasavvu/`, `/website-maintenance/`, `/pricing/` |
| `/website-maintenance/` | Existing-site owner seeking care | Updates, backups, support boundaries, eligibility of existing sites, verified annual pricing and what is agreed in writing. | Maintenance enquiry through `/contact/` | `/website-design/`, `/pricing/`, `/contact/` |
| `/ecommerce-website-development-chennai/` | Businesses seeking an online store | Catalogue, payment/shipping scope, launch and handover; Penkkasavvu delivery with accurate scope; do not imply measured SEO growth. | Website enquiry through `/contact/` | `/work/pennkasavvu/`, `/website-design/`, `/pricing/` |

### City-focused pages

| Page | Audience / intent | Content to maintain or add | Primary action | Contextual links |
| --- | --- | --- | --- | --- |
| `/website-design-company-chennai/` | Chennai web/SEO buyer | Genuine base, service fit and process; show Service Joy as a booking-platform delivery, not a measured SEO result. Check whether standalone Chennai SEO needs a page before splitting intent. | `/contact/` | `/website-design/`, `/seo-services/`, `/work/servicejoy/`, `/locations/` |
| `/seo-company-bangalore/` | Bengaluru SEO buyer | Remote delivery from Chennai, SEO scope, honest timeline and Mindtech evidence with attribution caveat. | SEO enquiry | `/seo-services/`, `/work/mindtech-solutions/`, `/locations/` |
| `/seo-company-hyderabad/` | Hyderabad SEO buyer | Remote service and local buyer questions; identify Mindtech as Bengaluru-based rather than implying a Hyderabad client. | SEO enquiry | `/seo-services/`, `/work/mindtech-solutions/`, `/locations/` |
| `/website-design-company-hyderabad/` | Hyderabad website buyer | Remote scope, design/launch/ownership and verified pricing; only use examples with their real geography and scope. | Website enquiry | `/website-design/`, relevant case studies, `/locations/` |
| `/website-design-company-kochi/` | Kochi website buyer | Remote website/store scope; Penkkasavvu as Kerala delivery, not a claim that DotMiracle has a Kochi office or measured SEO results. | Website enquiry | `/website-design/`, `/work/pennkasavvu/`, `/locations/` |

### Product and software pages

| Page | Audience / intent | Content to maintain or add | Primary action | Contextual links |
| --- | --- | --- | --- | --- |
| `/saas-development-company-chennai/` | SaaS founder or team | Users and first-release scope, development, launch and support; outcomes and timing depend on agreed scope. | SaaS enquiry | `/mvp-development-company/`, `/custom-software-development-company-chennai/`, `/contact/` |
| `/mvp-development-company/` | Founder validating a product idea | Problem validation, prioritization, release scope, testing and ownership; avoid a fixed timeline promise. | SaaS enquiry | SaaS page, `/pricing/`, `/contact/` |
| `/custom-software-development-company-chennai/` | Business needing a custom system | Use cases, discovery, integrations, ownership and ongoing support; quote based on agreed requirements. | Software enquiry | SaaS page, MVP page, `/contact/` |

### Case studies and informational content

| Page | Audience / intent | Content to maintain or add | Primary action | Contextual links |
| --- | --- | --- | --- | --- |
| `/work/mindtech-solutions/` | Evaluate SEO/revamp evidence | Starting point, work, 13+ reported enquiries, how source was assessed, limits and next phase; identify client as Bengaluru-based. | `/contact/` | `/seo-services/`, `/seo-company-bangalore/`, `/website-design/` |
| `/work/pennkasavvu/` | Evaluate ecommerce delivery | Store context, actual design/build/hosting scope, live site if approved, and SEO phase status. | `/contact/` | Ecommerce build page, `/website-design/` |
| `/work/servicejoy/` | Evaluate platform delivery | Chennai service context, booking-platform scope and current SEO phase; do not imply local pages alone produced rankings. | `/contact/` | Chennai web page, `/website-design/` |
| `/seo-audit-checklist/` **[draft]** | Business owner checking site health | Indexing, content, technical/mobile, local profile eligibility, contact-flow checks and measurement; specific actions and reputable references. | `/seo-services/` or contact | `/local-seo-services/`, `/pricing/`, Mindtech case study |
| `/guides/` **[draft]** | Visitor comparing information resources | Route visitors to practical, non-gated checklists and guides without promising rankings. | Relevant guide | All four available guides and `/contact/` |
| `/guides/technical-seo-checklist/` **[draft]** | Business troubleshooting crawl, indexing and performance | Prioritization, inspection, canonical/redirect checks, real user experience and source references. | `/seo-services/` | `/seo-audit-checklist/`, `/guides/`, `/contact/` |
| `/guides/google-maps-visibility/` **[draft]** | Business checking local visibility | Profile eligibility, accurate details, honest reviews and relevant factors; no guaranteed position. | `/local-seo-services/` | `/seo-audit-checklist/`, `/guides/`, `/contact/` |
| `/guides/seo-vs-google-ads/` **[draft]** | Buyer comparing organic and paid search | Balanced trade-offs, time horizons, costs, measurement and no implication of paid-ad management. | `/seo-services/` | `/pricing/`, `/guides/`, `/contact/` |

### Briefs for gated additions

| Page | Proposed section sequence | Proof / conversion requirement |
| --- | --- | --- |
| Technical SEO service | Who it helps → crawl/indexing/canonical checks → implementation scope → prioritization/reporting → limitations and FAQs | Confirm technical work offered and any verified example; link to SEO services, checklist and contact. |
| SEO audit service | When an audit helps → inputs/access → what is examined → what the customer receives → scope/price as agreed → next steps | No “free audit” or fixed turnaround unless confirmed; link to checklist, SEO services and contact. |
| Ecommerce SEO | Product/category search intent → technical/catalogue issues → content and measurement → dependencies → FAQs | Distinguish development from SEO; link to Penkkasavvu only as delivery evidence unless SEO outcomes are verified. |
| Kerala SEO | Coverage and remote delivery → locally relevant buyer needs → service scope → proof with client location disclosed → FAQ | Confirm ability and demand; no office or Google Business Profile claim without evidence. |
| Kochi / Thiruvananthapuram / Kozhikode SEO | Explain the actual city-specific buyer need → work applicable there → transparent delivery location → relevant evidence → FAQ | Each must earn its place with distinct verified material; no copy-and-swap pages or invented client testimonials. |
| Clinics / hotels / real estate SEO | Actual customer journey → industry-specific search and conversion concerns → relevant scope → accurate evidence → FAQs | Confirm expertise, permission and regulatory limitations. Avoid fabricated results and medical/legal advice. |
| Maps troubleshooting guide | Symptoms → profile eligibility and accuracy → relevance/distance/prominence → practical checks → next steps | Reference Google guidance; never guarantee ranking. Link to local SEO service. |
| SEO vs Google Ads guide | Decision criteria → benefits/limits of each → scenarios and measurement → combining channels → questions | Do not claim expertise in paid ads unless confirmed; use honest caveats and link to SEO service and pricing. |

## 4. Internal linking map

Arrows are recommended navigational or contextual links; not every pair must be forced onto every page. Links to the audit checklist apply once the draft is deployed. Proposed pages get links **only after publication**.

```text
Home → Services hub → SEO / Local SEO / Web / Maintenance
Home → Audit checklist → SEO services → Pricing → Contact
Home → Work hub → Relevant case study → Related service → Contact
SEO services ↔ Local SEO
SEO services ↔ Bengaluru SEO ↔ Mindtech case study
SEO services ↔ Hyderabad SEO → Mindtech case study (Bengaluru clearly disclosed)
Locations → Chennai web / Bengaluru SEO / Hyderabad SEO / Hyderabad web / Kochi web
Website design → Penkkasavvu delivery → Ecommerce website development
Website design → Maintenance → Pricing → Contact
Chennai website page → Service Joy delivery → Website design
SaaS ↔ MVP ↔ Custom software → Contact
About → Services / Work / Locations → Contact
```

**Link implementation rules**

1. Use crawlable `<a href>` links to the canonical trailing-slash paths already used on the site. A link that only exists in a click handler is not a substitute.
2. Use natural, descriptive anchor text (“SEO audit checklist”, “Bengaluru SEO case study”), not repeated exact-match keyword blocks. Make the label match the destination.
3. Keep primary navigation focused: Services, Work, Approach, Locations and the contact action; use the footer and contextual links to reach the guides hub and deeper pages.
4. Link every newly published indexable page from at least one relevant existing page, include it once in the generated sitemap, and provide a next step back to a relevant service or proof page.
5. Breadcrumbs should reflect a real, visible navigation hierarchy and match any BreadcrumbList data. Hierarchy can be communicated by links and breadcrumbs without renaming existing URLs.
6. Case-study links must accurately identify the client's geography, work and evidence. Do not force a remotely related case study to appear local.
7. Periodically crawl links and check redirects, canonical targets and orphans. Do not rely on a sitemap alone as navigation.

## 5. Execution sequence and acceptance criteria

### Phase 1 — foundation and existing pages

- Verify Search Console, indexing, sitemap, consent and the Google container in Tag Assistant. The presence of a script alone is not proof of working analytics.
- Review service, location, pricing and proof pages against the briefs; verify starting prices and all business claims. Publish the draft audit checklist after review.
- Test desktop/mobile, keyboard use, page rendering, links, case-study context and the contact email/fallback flow. Record actual performance data instead of assuming it.
- Baseline non-branded clicks/impressions and actual qualified enquiries. An opened email draft is not a submitted or qualified lead.

### Phase 2 — evidence-gated commercial expansion

- Use query data, customer questions, SERP review, delivery capacity and actual evidence to select at most one or two new services/cities to start. Confirm whether Kerala should be a priority and verify where the business is based.
- If justified, create technical SEO and/or audit service pages with a confirmed scope. Add a Kerala/Kochi page only if materially differentiated from existing pages.
- Add links from the most relevant existing hub and evidence pages; test the sitemap, canonical, title, H1 and CTA.

### Phase 3 — learning and support content

- Choose one guide or one industry page based on actual customer questions and confirmed expertise. Obtain approval for examples and author details.
- Compare like-for-like periods and track qualified enquiries separately from clicks. Record search sources, dates and sample sizes; refresh or consolidate pages if intent overlaps.
- Pursue only legitimate citations and relevant partnerships. Do not create ineligible business listings or buy spam links.

**Definition of ready for any new page:** a distinct audience and intent; evidence of demand or a real customer question; verified offer and claims; useful original content; title, meta description, one H1 and canonical; relevant internal inbound/outbound links; a functioning CTA; mobile/accessibility checks; inclusion in the regenerated sitemap; and an owner for review.

## 6. Inputs and references

**Inputs needed:** confirmation of business base and eligible service area; actual standalone services and deliverables; permissioned proof; access to Search Console and appropriate analytics; a privacy/consent approach; and customer/interview data. Until available, market selection remains hypothetical.

- Search Essentials: https://developers.google.com/search/docs/essentials
- Google guidance on crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Doorway abuse: https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse
- Business Profile eligibility and representation: https://support.google.com/business/answer/3038177
- Structured data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google removed FAQ rich-result documentation in 2026; FAQs remain useful to readers but should not be promised as a rich-result tactic: https://developers.google.com/search/updates
