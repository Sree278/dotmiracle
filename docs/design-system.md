# DotMiracle design system

The whole system lives in `index.html`: design tokens and component styles in the single `<style>` block, and the `brandize()` renderer in the inline script. This document is the reference for using it. `docs/` is not published; nothing here ships to the site.

**The one rule: no inline styles.** Markup composes classes; `scripts/build.mjs` fails the build if a ` style="` attribute appears in any generated page.

## 1. DotMiracle brand tokens

Defined on `:root` at the top of the stylesheet. The palette is deliberate and unchanged — do not add colors casually.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#17221f` | Primary dark: dark sections, body headings, buttons |
| `--ink-2` / `--ink-3` | `#22312c` / `#31403a` | Raised dark surfaces |
| `--paper` | `#f4f2eb` | Page background |
| `--paper-2` | `#e9e7dd` | Tinted panels, notes |
| `--white` | `#fbfaf6` | Cards on paper |
| `--lime` | `#d8f66a` | The accent: emphasis `<em>`, primary CTAs, highlights |
| `--coral` | `#f07d5d` | Secondary accent: kicker sparks, case-note border |
| `--muted` | `#68756e` | Secondary text |
| `--line` / `--line-light` | rgba inks | Hairlines on light / dark |

Typography: `--sans` (Inter stack) for everything, `--serif` (Georgia stack) only inside `<em>` display accents. Motion: `--ease`; shadow: `--shadow`; width: `--max`.

## 2. Spacing utilities

A small scale (`--space-2` 17px, `--space-3` 20px, `--space-4` 25px, `--space-6` 42px, `--space-8` 72px) behind utilities that replaced the old inline styles:

- `.mt-2 .mt-3 .mt-4 .mt-6 .mt-8` — margin-top steps (e.g. `.mt-8` separates an `extra` split from the detail grid)
- `.pt-3` — reduced section top padding
- `.text-compact` — 15px body text
- `.link-plain` — card-as-link without link styling (work page proof card)
- `.honeypot` — hides the form bot-check field

Need a new offset? Add a step or utility to the design-system block in the stylesheet — never an inline style.

## 3. Third-party brand colors (`.wm-*` wordmarks)

Real brand colors for other companies' names, as color-only spans — weight, size and spacing always inherit from the surrounding text.

| Class | Brand | Light surfaces | Dark surfaces |
|---|---|---|---|
| `.wm-google` | Google (per-letter) | `#4285f4 #ea4335 #f9ab00 #34a853` | Google dark-theme tints `#8ab4f8 #f28b82 #fdd663 #81c995` |
| `.wm-whatsapp` | WhatsApp | `#1daa61` | `#25d366` |
| `.wm-wordpress` | WordPress | `#21759b` | `#9ec6dd` |
| `.wm-shopify` | Shopify | `#008060` | `#7ad1b1` |
| `.wm-woo` | WooCommerce | `#873eff` | `#c9a8ff` |

The dark variants switch automatically: dark containers (`.hero`, `.page-hero`, `.case-hero`, `.section-dark`, `.dark-panel`, `.cta-band`, `.site-footer`) override the `--brand-*` custom properties, so the same markup holds contrast everywhere.

### How names get marked up

You do not write `.wm-*` spans by hand in page copy. `brandize()` in the script wraps every route template and converts the plain words `Google`, `WhatsApp`, `WordPress`, `Shopify` and `WooCommerce` in **visible text only** — it never touches tags, attributes, or the inside of `select`/`option`/`textarea`/`script`/`style`. Write copy as plain words; the renderer does the rest, identically at build time (`scripts/build.mjs` prerenders through the same functions) and during in-browser navigation.

The one hand-written instance is the footer statement, because the footer is static shell markup outside the routed `<main>`.

Adding a brand: append a `[regex, markup]` pair to `WORDMARKS`, add the `--brand-*` token (light + dark values) and the `.wm-*` rule, and note it in the table above. Use the company's published brand color, and a lighter tint for dark surfaces.

## 4. Component inventory

Existing classes to compose before inventing new ones: `.btn` (`-dark/-lime/-outline/-light-outline`), `.kicker` (+ `.kicker-light`), `.display`, `.subhead`, `.body-lg`, `.section` / `.section-sm` / `.section-dark`, `.page-hero`, `.case-hero` + `.case-stat-row`, `.split`, `.detail-grid` / `.detail-card`, `.fit-panel`, `.service-proof`, `.service-menu` / `.service-row`, `.journey-grid` / `.journey-card` / `.journey-help`, `.proof-card`, `.questions` / `.question-list`, `.dark-panel`, `.cta-band`, `.city-list` / `.city-chip`, `.locations-main` / `.location-card`, `.form-grid` / `.field`, `.fineprint`, `.case-note`, `.reveal` (+ `.delay-1..3`).
