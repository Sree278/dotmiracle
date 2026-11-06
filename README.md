# DotMiracle

The DotMiracle website: a static site served by Cloudflare Pages at https://dotmiracle.com.

## How the site is built

`index.html` is the single source. Its inline script holds every page template, the route table (`routes`) and `META`, which gives each page its title and description. Pages live at real paths such as `/seo-company-chennai/`. Old `#/` links are rewritten to their new paths in the browser, so links shared before the move still work.

`scripts/build.mjs` prerenders every route into its own HTML file, so search engines and AI crawlers get each page's full text without running JavaScript:

```sh
node scripts/build.mjs
```

The build needs Node 18 or later and has no dependencies. It rewrites the home page content and head tags in `index.html`, writes `<route>/index.html` for every other route, and regenerates `404.html` and `sitemap.xml`. Run it after every change to `index.html`, and commit the generated files with the change.

## Adding a page

1. Add a template and an entry to `routes` in the script.
2. Add the page's title and description to `META`.
3. Link to it with a real path, such as `href="/new-page/"`.
4. Run the build.

## Hosting notes (Cloudflare Pages)

- `404.html` at the root turns off Pages' single-page-app fallback, so unknown paths return a real 404 instead of the home page.
- `www.dotmiracle.com` returns error 522. Add it as a custom domain on the Pages project, then redirect it to `https://dotmiracle.com` with a Bulk Redirect, as in Cloudflare's [Redirecting www to domain apex](https://developers.cloudflare.com/pages/how-to/www-redirect/) guide.
- After deploying, submit `https://dotmiracle.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Contact details and form

Fill in `CONTACT` (email, phone, WhatsApp) near the top of the script and run the build to show those links on the contact page. Empty values stay hidden.

The contact form is intentionally disabled: the site is static and does not receive submissions. To enable enquiries:

1. Choose a form service and configure it with the intended recipient address. Never commit service secrets or credentials to this repository.
2. Update the form to use the provider's documented submission method, remove the disabled fieldset and preview-only message, and handle both success and failure accurately. Do not show a success message unless submission succeeds.
3. Add an appropriate privacy notice and test a real submission, including spam protection and delivery to the inbox, before publishing.

See `docs/customer-journey-hypotheses.md` for the scenario validation plan.
