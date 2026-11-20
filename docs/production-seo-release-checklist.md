# SEO production release checklist

This checklist separates what can be checked from source from what requires the owner, live analytics or Cloudflare access. It does not promise indexing, ranking or enquiry growth.

## Changes prepared in this branch

- A practical SEO audit checklist, a guides hub and guides on technical checks, Google Maps visibility and SEO versus Google Ads.
- Contextual links between relevant services, guides and case studies, including attribution and location caveats.
- Visible service/guide breadcrumbs aligned with generated breadcrumb structured data; no-JavaScript fallback for reveal content.
- More cautious local coverage and Maps language. Existing real URLs and case-study claims remain intact; no new city offices or unverified service prices are asserted.
- `python3 scripts/check-seo.py` checks the generated sitemap, metadata, tag placement, crawlable internal links, reachability, breadcrumbs and 404 noindex. It does not replace browser, accessibility, analytics or real-world SEO tests.

## Before deployment

1. Have the owner review published claims, service scope, prices, city coverage, case-study permissions and guide content. Kerala as the business base, city demand, sector specialization and standalone audit/technical/ecommerce SEO offers remain unconfirmed.
2. Run `node scripts/build.mjs` and `python3 scripts/check-seo.py`, check `git diff --check`, and review the generated `public/` changes. The build regenerates `public/` from source and `static/`.
3. Open the preview on desktop and mobile; check navigation, menu keyboard operation, guide accordions if any, reduced motion, readable contrast and no-JavaScript rendering. Test the contact form's email draft, fallback and copy flow. A local static server does not replicate Cloudflare redirect and 404 behavior.
4. Confirm the publishing branch and Cloudflare configuration. The separate `wrangler.preview.jsonc` is opt-in and must not be assumed to be production configuration. Review the production and preview checks; do not equate a passing preview with successful production.
5. Agree the privacy/consent approach before enabling measurement. The user-supplied GTM snippet is present, but its presence and a passing build do not prove that the container initializes, that tags fire, or that consent requirements are met. Verify in Tag Assistant and the relevant Google properties; do not add PII to analytics events.

## After deployment

1. Confirm Cloudflare's production deployment completed for the merged commit, and check `https://dotmiracle.com/` and a representative service and guide URL. Check canonical tags, `robots.txt`, `sitemap.xml`, redirects and an unknown path returning the expected 404 on the actual host.
2. Use Google Tag Assistant to confirm the intended container and configured tags actually fire once; check consent behavior and browser network activity. Check the relevant analytics property before assuming data is recorded.
3. Confirm Search Console ownership, submit the sitemap if desired and use URL Inspection for representative pages. Submission and structured data do not guarantee indexing or search appearance.
4. Run accessibility and real-device checks, and measure performance using field data where available plus PageSpeed Insights. Record results and test conditions; no live performance results are asserted by this branch.
5. Establish non-branded query/landing-page baselines and track qualified enquiries separately from intent events. The current contact flow opens an email draft; clicks and draft opens are not proof of sent or qualified enquiries.
6. Validate expansion candidates with actual query data, customer feedback, commercial fit and distinct evidence before publishing service, industry or location pages. Do not create duplicate city pages or unverified Business Profiles.

## Owner and platform dependencies

Actual keyword demand, Search Console and analytics access, verified delivery areas, testimonial/author permissions, live form or inbox testing, Google Business Profile eligibility and Cloudflare deployment settings require owner or platform input. These tasks cannot be completed by static code changes alone.
