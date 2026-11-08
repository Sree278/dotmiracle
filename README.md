# DotMiracle

The DotMiracle website: a static site served by Cloudflare Pages at https://dotmiracle.com.

## How the site is built

`index.html` is the single source. Its inline script holds every page template, the route table (`routes`) and `META`, which gives each page its title and description. Pages live at real paths such as `/seo-services/`. Old `#/` links are rewritten to their new paths in the browser, so links shared before the move still work.

`scripts/build.mjs` prerenders every route into its own HTML file in `public/`, so search engines and AI crawlers get each page's full text without running JavaScript:

```sh
node scripts/build.mjs
```

The build needs Node 18 or later and has no dependencies. It empties `public/`, then writes `index.html` and `<route>/index.html` for every route, `404.html`, `robots.txt` and `sitemap.xml`, and copies the files in `static/` (favicon, social preview image). Run it after every change to `index.html` or `static/`, and commit `public/` with the change.

## Adding a page

1. Add a template and an entry to `routes` in the script. A service page only needs an entry in `servicePages`, keyed by its path, plus `serviceFit` and `serviceQuestions` entries under its `crumb`; `routes`, the sitemap and the structured data pick it up from there.
2. Add the page's title and description to `META`.
3. Link to it with a real path, such as `href="/new-page/"`.
4. Run the build.

## Retired addresses

`static/_redirects` holds the 301 redirects that Cloudflare Pages applies for URLs that have moved, such as `/seo-company-chennai/`. When you retire a page, add its old path there (with and without the trailing slash) and in `LEGACY_ROUTES` in the script.

## Hosting notes (Cloudflare Pages)

- The Pages project must publish `public/`. In the Cloudflare dashboard, open Workers & Pages → dotmiraclecom → Settings → Build, and set **Build output directory** to `public`. Leave **Build command** empty, since `public/` is committed; `node scripts/build.mjs` also works on a build image with Node 18 or later.
- `public/404.html` turns off Pages' single-page-app fallback, so unknown paths return a real 404 instead of the home page.
- `www.dotmiracle.com` returns error 522. Add it as a custom domain on the Pages project, then redirect it to `https://dotmiracle.com` with a Bulk Redirect, as in Cloudflare's [Redirecting www to domain apex](https://developers.cloudflare.com/pages/how-to/www-redirect/) guide.
- After deploying, submit `https://dotmiracle.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Contact details and form

Fill in `CONTACT` (email, phone, WhatsApp) near the top of the script and run the build to show those links on the contact page. Empty values stay hidden.

The contact form sends enquiries through [Web3Forms](https://web3forms.com/) (free plan: 250 submissions a month). It stays a disabled preview until `FORM.accessKey` near the top of the script holds an access key:

1. Get a free access key at web3forms.com with the inbox that should receive enquiries.
2. Paste it into `FORM.accessKey` and run the build. Web3Forms documents the key as public, so it is safe to commit; never commit real secrets or credentials to this repository.
3. Send a real test enquiry and confirm it reaches the inbox before relying on the form.

The form shows a success message only when Web3Forms confirms the submission, includes Web3Forms' `botcheck` honeypot, and the contact page tells visitors their details are used only to reply.

The questions that appear for each service live in `BRIEFS` in the script. Each answer arrives in the enquiry email under its label, and the subject names the service, business and city. Service pages link to `/contact/?service=<key>` so the right questions open straight away.

## Design system

Styling is class-based only — inline `style` attributes are banned, and the build fails if one appears in a generated page. Design tokens, spacing utilities and the `.wm-*` brand-wordmark classes (Google, WhatsApp, WordPress, Shopify, WooCommerce rendered in their real brand colors by `brandize()` in the script) are documented in `docs/design-system.md`.

See `docs/customer-journey-hypotheses.md` for the scenario validation plan.
