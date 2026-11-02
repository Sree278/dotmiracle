# DotMiracle

A standalone static site, ready to host on GitHub Pages. The site uses hash-based navigation so its pages work on a GitHub Pages project URL as well as on a custom domain.

## Publish on GitHub Pages

1. Merge the site changes into the branch you want to publish.
2. In the repository's **Settings → Pages**, choose **Deploy from a branch**.
3. Select the publishing branch and **/ (root)**, then save. GitHub will provide the site URL once deployment completes.

The contact form is a preview only; it does not send submissions. Connect and test a real form endpoint before relying on it.

## Contact form

The contact form is intentionally disabled: GitHub Pages is static and does not receive submissions. To enable enquiries:

1. Choose a form service and configure it with the intended recipient address. Never commit service secrets or credentials to this public repository.
2. Update the form to use the provider's documented submission method, remove the disabled fieldset and preview-only message, and handle both success and failure accurately. Do not show a success message unless submission succeeds.
3. Add an appropriate privacy notice and test a real submission, including spam protection and delivery to the inbox, before publishing.

The site currently uses hash-based routes, so individual services do not yet have separate search-indexable URLs. See `docs/customer-journey-hypotheses.md` for the scenario validation plan.

