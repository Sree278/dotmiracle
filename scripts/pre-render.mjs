// Publish every page in content/library.json as its own HTML document in public/.
// Run by `npm run build` after `vite build`. The build stops if a page breaks the SEO rules.
import { build } from 'esbuild';
import { readFile, writeFile, mkdir, rm, access } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, publicPath, homeTitle, homeDescription, pageTitle, pageHeading, pageDescription, pageSection } from '../shared/search-pages.js';

const cwd = process.cwd();
const OUT = 'public';
const base = SITE_URL;
const TITLE_MAX = 60, DESCRIPTION_MAX = 155;
const tmp = resolve(cwd, '.build-tmp');
try {
  const library = JSON.parse(await readFile('content/library.json', 'utf8'));
  // The growth plan and the evidence page are not published, and nothing may link to them.
  const items = library.filter(i => !['plan', 'proof'].includes(i.kind));
  if (!items.length) throw new Error('content/library.json has no entries');
  await mkdir(tmp, { recursive: true });
  const output = resolve(tmp, 'render.mjs');
  await build({ entryPoints: ['server/render-site.tsx'], bundle: true, outfile: output, format: 'esm', platform: 'node', packages: 'external', jsx: 'automatic', loader: { '.css': 'empty' }, logLevel: 'warning' });
  const { renderSite } = await import(pathToFileURL(output).href);
  const template = await readFile(`${OUT}/index.html`, 'utf8');
  const pathList = [null, ...items.filter(i => publicPath(i))];
  const json = data => JSON.stringify(data).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const urls = new Set(pathList.map(item => item ? publicPath(item) : '/'));
  if (urls.size !== pathList.length) throw new Error('Duplicate published URL');
  // Other pages only need their titles, summaries and links: the current page carries its full text.
  const outline = i => ({ ...i, content: i.content.filter(s => s.links?.length).map(s => ({ heading: s.heading, body: '', links: s.links })), deliverables: [] });
  const report = { checked_at: new Date().toISOString(), pages: [] };
  const titles = new Set(), descriptions = new Set(), edges = new Map(), anchors = new Map(), fragmentLinks = [], problems = [];
  const orgId = base + '/#organisation';
  const organisation = { '@type': 'Organization', '@id': orgId, name: SITE_NAME, url: base + '/', logo: base + '/images/dotmiracle-logo-512.png', email: CONTACT_EMAIL, areaServed: ['Chennai', 'Kerala', 'India', 'Worldwide'], contactPoint: { '@type': 'ContactPoint', contactType: 'Project enquiries', email: CONTACT_EMAIL, url: base + '/contact/' }, knowsAbout: items.filter(i => i.kind === 'service').map(i => i.title) };
  for (const item of pathList) {
    const path = item ? publicPath(item) : '/';
    const canonical = base + path;
    const title = item ? pageTitle(item) : homeTitle;
    const description = item ? pageDescription(item) : homeDescription;
    const story = item && ['note', 'case-study'].includes(item.kind);
    const schema = [{ ...organisation }, { '@type': 'WebSite', '@id': base + '/#website', name: SITE_NAME, url: base + '/', publisher: { '@id': orgId } }, { '@type': 'WebPage', '@id': canonical + '#webpage', url: canonical, name: title, description, inLanguage: 'en-IN', isPartOf: { '@id': base + '/#website' }, ...(item ? { mainEntity: { '@id': canonical + '#subject' }, breadcrumb: { '@id': canonical + '#breadcrumbs' } } : { about: { '@id': orgId } }) }];
    if (item?.kind === 'studio') {
      schema[2]['@type'] = item.slug === 'about' ? 'AboutPage' : 'ContactPage';
      schema[2].mainEntity = { '@id': orgId };
      schema.push({ '@type': 'BreadcrumbList', '@id': canonical + '#breadcrumbs', itemListElement: [{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: base + '/' }, { '@type': 'ListItem', position: 2, name: item.category, item: canonical }] });
    } else if (item) {
      const section = pageSection(item);
      const hub = item.kind === 'hub';
      schema.push({ '@type': 'BreadcrumbList', '@id': canonical + '#breadcrumbs', itemListElement: [{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: base + '/' }, ...(!hub ? [{ '@type': 'ListItem', position: 2, name: section.label, item: base + section.href }] : []), { '@type': 'ListItem', position: hub ? 2 : 3, name: item.title, item: canonical }] });
      if (hub) schema[2]['@type'] = 'CollectionPage';
      schema.push(hub ? { '@type': 'ItemList', '@id': canonical + '#subject', name: item.title, itemListElement: items.filter(i => i.kind === item.content[0]?.directory).map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.title, url: base + publicPath(i) })) } : story ? { '@type': 'Article', '@id': canonical + '#subject', headline: item.title, description, author: { '@id': orgId }, publisher: { '@id': orgId }, mainEntityOfPage: { '@id': canonical + '#webpage' }, image: base + '/images/kerala-backwaters.webp', articleSection: item.category, inLanguage: 'en-IN' } : { '@type': 'Service', '@id': canonical + '#subject', name: pageHeading(item), description, serviceType: item.title, provider: { '@id': orgId }, areaServed: item.kind === 'location' ? item.slug === 'kochi' ? 'Kochi, Kerala' : 'Kerala, India' : ['Kerala', 'India', 'Worldwide'], url: canonical });
      const subject = schema.at(-1);
      if (item.kind === 'location') subject.areaServed = { '@type': item.slug === 'kerala' ? 'State' : 'City', name: item.slug === 'kerala' ? 'Kerala' : item.category, containedInPlace: item.slug === 'kerala' ? { '@type': 'Country', name: 'India' } : { '@type': 'State', name: 'Kerala' } };
      if (item.kind === 'industry') subject.audience = { '@type': 'BusinessAudience', audienceType: item.category };
      const citations = [...new Set(item.content.flatMap(s => (s.links || []).map(l => l.href)).filter(l => l.startsWith('https://')))];
      if (story && citations.length) subject.citation = citations;
    }
    const faq = (item || items.find(i => i.kind === 'home'))?.content[0]?.faq || [];
    if (faq.length) {
      // Describe the FAQ shown on this page; FAQPage markup only for questions visible here.
      schema[2]['@type'] = ['WebPage', 'FAQPage'];
      if (item) schema[2].about = { '@id': canonical + '#subject' };
      schema[2].mainEntity = faq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }));
    }
    const markup = renderSite(items, path);
    anchors.set(path, new Set([...markup.matchAll(/\sid="([^"]+)"/g)].map(m => m[1])));
    for (const [, href] of markup.matchAll(/<a\s[^>]*href="([^"]*#[^"]+)"/g)) {
      if (href.startsWith('/') || href.startsWith('#')) { const target = new URL(href.replace(/&amp;/g, '&'), 'https://build.invalid' + path); fragmentLinks.push([path, target.pathname, decodeURIComponent(target.hash.slice(1))]); }
    }
    const h1 = (markup.match(/<h1(?:\s|>)/g) || []).length;
    if (h1 !== 1) problems.push(`${path}: ${h1} H1 headings (needs exactly one)`);
    if (titles.has(title)) problems.push(`${path}: duplicate title "${title}"`);
    if (descriptions.has(description)) problems.push(`${path}: duplicate description`);
    if (title.length > TITLE_MAX) problems.push(`${path}: title is ${title.length} characters (max ${TITLE_MAX}): "${title}"`);
    if (!title.endsWith(`| ${SITE_NAME}`)) problems.push(`${path}: title must end with "| ${SITE_NAME}"`);
    if (!description || description.length > DESCRIPTION_MAX) problems.push(`${path}: description is ${description?.length || 0} characters (max ${DESCRIPTION_MAX})`);
    titles.add(title); descriptions.add(description);
    const links = [...markup.matchAll(/<a\s[^>]*href="(\/[^"?#]*)[^"]*"/g)].map(m => m[1]);
    for (const link of links) {
      if (/^\/resources\/[a-z0-9-]+\.csv$/.test(link)) { await access(resolve(cwd, OUT + link)); continue; }
      if (!urls.has(link)) problems.push(`${path}: broken internal link → ${link}`);
    }
    edges.set(path, links.filter(l => urls.has(l)));
    const snapshot = items.map(i => (!item && ['approach', 'home'].includes(i.kind)) || item?.id === i.id ? i : outline(i));
    const html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`)
      .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`)
      .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}" />`)
      .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${story ? 'article' : 'website'}" />`)
      .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${base}/images/og-kerala-backwaters.jpg" />\n<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />`)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': schema })}</script>`)
      .replace('</head>', `<link rel="canonical" href="${esc(canonical)}" />\n<meta property="og:url" content="${esc(canonical)}" />\n<meta name="twitter:card" content="summary_large_image" />\n</head>`)
      .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>\n<script id="studio-library" type="application/json">${json(snapshot)}</script>`);
    const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
    if (/canopy/i.test(text) || /Canopy/.test(html.match(/<head>[\s\S]*<\/head>/)?.[0] || '')) problems.push(`${path}: still mentions Canopy`);
    const file = path === '/' ? `${OUT}/index.html` : `${OUT}${path}index.html`;
    await mkdir(dirname(file), { recursive: true }); await writeFile(file, html);
    report.pages.push({ path, title, kind: item?.kind || 'homepage', h1_count: h1, canonical, schema_types: schema.flatMap(s => s['@type']), visible_faq_count: faq.length });
  }
  const reached = new Set(); const visit = path => { if (reached.has(path)) return; reached.add(path); for (const link of edges.get(path) || []) visit(link); }; visit('/');
  for (const path of urls) if (!reached.has(path)) problems.push(`${path}: no link reaches this page from the homepage`);
  for (const [from, path, id] of fragmentLinks) if (urls.has(path) && !anchors.get(path)?.has(id)) problems.push(`${from}: link to a missing section ${path}#${id}`);
  const depth = new Map([['/', 0]]), queue = ['/'];
  for (let n = 0; n < queue.length; n++) for (const to of edges.get(queue[n]) || []) if (!depth.has(to)) { depth.set(to, depth.get(queue[n]) + 1); queue.push(to); }
  for (const row of report.pages) {
    row.click_depth = depth.get(row.path);
    if (['service', 'location', 'industry'].includes(row.kind)) {
      const parent = pageSection({ kind: row.kind }).href;
      if (!edges.get(parent)?.includes(row.path) || !edges.get(row.path)?.includes(parent)) problems.push(`${row.path}: missing link to or from ${parent}`);
    }
  }
  // Every redirect must land on a published page, and no published page may be redirected away.
  const redirects = (await readFile(`${OUT}/_redirects`, 'utf8').catch(() => '')).split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#')).map(l => l.split(/\s+/));
  for (const [from, to, status] of redirects) {
    if (!urls.has(to)) problems.push(`_redirects: ${from} goes to ${to}, which is not a published page`);
    if (urls.has(from)) problems.push(`_redirects: ${from} is a published page and must not redirect`);
    if (status !== '301') problems.push(`_redirects: ${from} should use 301`);
  }
  if (problems.length) throw new Error('\n  - ' + problems.join('\n  - '));
  await writeFile(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].map(p => `<url><loc>${base}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
  // A real 404: Cloudflare Pages serves this for unknown URLs, with status 404.
  const missing = template.replace(/<title>[\s\S]*?<\/title>/, `<title>Page not found | ${SITE_NAME}</title>`)
    .replace(/<meta name="description"[^>]*>\s*/, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, '')
    .replace('</head>', '<meta name="robots" content="noindex,follow" />\n</head>')
    .replace('<div id="root"></div>', () => `<div id="root">${renderSite(items, '/not-published/')}</div>\n<script id="studio-library" type="application/json">${json(items.map(outline))}</script>`);
  await writeFile(`${OUT}/404.html`, missing);
  console.log(`Built ${urls.size} pages in ${OUT}/: one H1 each, unique titles (${TITLE_MAX} characters or fewer) and descriptions (${DESCRIPTION_MAX} or fewer), canonical tags, structured data, every page linked from the homepage (deepest: ${Math.max(...depth.values())} clicks), sitemap.xml, robots.txt and 404.html.`);
} catch (error) {
  console.error('The pages were not built:', error.message);
  process.exitCode = 1;
} finally { await rm(tmp, { recursive: true, force: true }); }
