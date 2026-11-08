// Prerenders every route of index.html into its own static HTML file in public/,
// so search engines and AI crawlers get each page's full text without running
// JavaScript. Cloudflare Pages publishes public/.
//
//   node scripts/build.mjs
//
// index.html is the source: edit the templates or META in its script, then run
// the build and commit public/ with the change. Files in static/ are copied as-is.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'public');
const source = readFileSync(join(root, 'index.html'), 'utf8');
const EOL = source.includes('\r\n') ? '\r\n' : '\n';
const template = source.replace(/\r\n/g, '\n');

const start = template.indexOf('<script>');
const end = template.indexOf('</script>', start);
if (start < 0 || end < 0) throw new Error('index.html: inline <script> not found');
const code = template.slice(start + '<script>'.length, end);

// The page script wires up the DOM when it loads. An inert stand-in for the
// browser objects lets it run in Node, so the route templates can be called.
const inert = new Proxy(function () {}, {
  get: (_, key) => (key === Symbol.toPrimitive ? () => '' : key === Symbol.iterator ? undefined : inert),
  apply: () => inert,
  construct: () => inert,
  set: () => true,
});
const context = vm.createContext({
  document: inert,
  window: inert,
  history: inert,
  navigator: inert,
  IntersectionObserver: inert,
  location: { hash: '', pathname: '/', origin: 'https://dotmiracle.com' },
  setTimeout: () => 0,
  clearTimeout: () => {},
  requestAnimationFrame: () => 0,
  console,
});
vm.runInContext(code, context, { filename: 'index.html <script>' });
const site = vm.runInContext(
  '({ routes, notfound, META, NOT_FOUND_META, SITE_URL, LEGACY_ROUTES, servicePages, serviceQuestions })',
  context,
);

const { SITE_URL, META } = site;
const ORG_ID = `${SITE_URL}/#organization`;
const urlFor = (path) => (path === '/' ? '/' : `${path}/`);
const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (html) => String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

// Breadcrumb names and parents for structured data.
const NAMES = {
  '/services': 'Services',
  '/seo-services': 'SEO services',
  '/local-seo-services': 'Local SEO',
  '/website-design': 'Website design',
  '/website-maintenance': 'Website maintenance',
  '/website-design-company-chennai': 'Website design & SEO in Chennai',
  '/saas-development-company-chennai': 'SaaS development',
  '/work': 'Work',
  '/work/mindtech-solutions': 'Mindtech Solutions',
  '/about': 'About',
  '/locations': 'Locations',
  '/contact': 'Contact',
};
// Service pages are keyed by their path in index.html.
const serviceData = site.servicePages;
const parentOf = (path) => (serviceData[path] ? '/services' : path === '/work/mindtech-solutions' ? '/work' : null);

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'DotMiracle',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  slogan: 'Get found on Google. Win the enquiry.',
  description: META['/'].description,
  areaServed: ['India', 'Chennai'],
  knowsAbout: [
    'Search engine optimization',
    'Local SEO',
    'Google Business Profile optimization',
    'Website design and development',
    'WordPress development',
    'Website maintenance',
    'SaaS product development',
  ],
};

function structuredData(path) {
  const url = SITE_URL + urlFor(path);
  const graph = [organization];
  if (path === '/') {
    graph.push({ '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'DotMiracle', publisher: { '@id': ORG_ID } });
  } else {
    const trail = [path];
    for (let p = parentOf(path); p; p = parentOf(p)) trail.unshift(p);
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...trail.map((p) => ({ name: NAMES[p], path: p }))].map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: SITE_URL + urlFor(item.path),
      })),
    });
  }
  const service = serviceData[path];
  if (service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: META[path].title.split(' | ')[0],
      serviceType: service.crumb,
      description: META[path].description,
      provider: { '@id': ORG_ID },
      areaServed: service.area || 'India',
      url,
    });
    const questions = site.serviceQuestions[service.crumb] || [];
    if (questions.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: questions.map(([question, answer]) => ({
          '@type': 'Question',
          name: plain(question),
          acceptedAnswer: { '@type': 'Answer', text: plain(answer) },
        })),
      });
    }
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function head(path, meta, indexable) {
  const url = SITE_URL + urlFor(path);
  return [
    '<!-- seo:head - generated by scripts/build.mjs from META in the script below. Edit META, then run the build. -->',
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    indexable ? `<link rel="canonical" href="${url}">` : '<meta name="robots" content="noindex">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="DotMiracle">',
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    ...(indexable ? [`<meta property="og:url" content="${url}">`] : []),
    `<meta property="og:image" content="${SITE_URL}/og-image.png?v=2">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="DotMiracle: Get found on Google. Win the enquiry. SEO and websites, based in Chennai">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    ...(indexable ? [`<script type="application/ld+json">${structuredData(path)}</script>`] : []),
    '<!-- /seo:head -->',
  ].join('\n');
}

const HEAD = /<!-- seo:head[\s\S]*?<!-- \/seo:head -->/;
const MAIN = /<main id="main"[^>]*>[\s\S]*?<\/main>/;
if (!HEAD.test(template) || !MAIN.test(template)) throw new Error('index.html: seo:head markers or <main id="main"> not found');

function page(path, html, meta, { indexable = true, route = path } = {}) {
  return template
    .replace(HEAD, () => head(path, meta, indexable))
    .replace(MAIN, () => `<main id="main" class="page-ready" tabindex="-1" data-route="${route}">${html}</main>`);
}

function write(relative, content) {
  if (/href="#\//.test(content)) throw new Error(`${relative}: still contains a #/ link`);
  const file = join(OUT, relative);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content.replace(/\n/g, EOL));
  console.log(`wrote public/${relative}`);
}

// Start from an empty public/ so pages removed from the source don't linger.
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const name of readdirSync(join(root, 'static'))) {
  copyFileSync(join(root, 'static', name), join(OUT, name));
  console.log(`copied static/${name}`);
}

const paths = Object.keys(site.routes);
for (const path of paths) {
  if (!META[path]) throw new Error(`META has no entry for ${path}`);
  write(path === '/' ? 'index.html' : join(path.slice(1), 'index.html'), page(path, site.routes[path](), META[path]));
}
write('404.html', page('/404', site.notfound(), site.NOT_FOUND_META, { indexable: false, route: '*' }));
write('robots.txt', ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n'));
write(
  'sitemap.xml',
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) => `  <url><loc>${SITE_URL}${urlFor(path)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n'),
);
