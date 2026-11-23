// One route definition for public links, the HTML build and the sitemap.
// Every public URL is lowercase, uses hyphens and ends with a slash.
export const SITE_NAME = 'DotMiracle';
export const SITE_URL = 'https://dotmiracle.com';
export const CONTACT_EMAIL = 'hello@dotmiracle.com';
const sections = { service: 'services', location: 'locations', industry: 'industries', note: 'field-notes', 'case-study': 'case-studies' };
export function publicPath(item) {
  if (item.kind === 'studio' && ['about', 'contact'].includes(item.slug)) return `/${item.slug}/`;
  if (item.kind === 'hub' && ['services', 'locations', 'industries', 'field-notes'].includes(item.slug)) return `/${item.slug}/`;
  // The growth plan and the evidence page are not published.
  return sections[item.kind] && /^[a-z0-9-]+$/.test(item.slug) ? `/${sections[item.kind]}/${item.slug}/` : null;
}
/** Turn any path into the trailing-slash form used by publicPath. */
export function normalisePath(path) {
  const clean = String(path || '/').replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/{2,}/g, '/');
  return clean.endsWith('/') ? clean : clean + '/';
}
export function pageHeading(item) {
  if (item.kind !== 'service') return item.title;
  const name = item.slug === 'content-strategy' ? 'SEO content strategy' : item.title;
  return item.slug === 'international-seo' ? `${name} for Kerala businesses` : `${name} in Kerala`;
}
export const homeTitle = 'SEO Services for Businesses Across India | DotMiracle';
export const homeDescription = 'DotMiracle helps businesses across India get found with local SEO, technical SEO, audits and content strategy. Based in Chennai.';
export function marketForRoute(path) {
  if (path === '/locations/' || path.startsWith('/locations/')) return 'Kerala';
  if (path === '/industries/ecommerce/') return 'Across India';
  return ['/industries/exporters/', '/services/international-seo/'].includes(path) ? 'International' : 'Kerala & beyond';
}
export function contactPath(item) {
  if (!item || !['service', 'industry', 'location'].includes(item.kind)) return '/contact/';
  const query = new URLSearchParams({ interest: item.slug });
  const market = marketForRoute(publicPath(item) || '/');
  if (market !== 'Kerala & beyond') query.set('market', market);
  return '/contact/?' + query.toString();
}
export const pageTitle = (item) => `${(item.content?.[0]?.search?.title || pageHeading(item)).replace(/\s*\|\s*(Canopy|DotMiracle)\s*$/i, '')} | ${SITE_NAME}`;
export const pageDescription = (item) => item.content?.[0]?.search?.description || item.summary;
export function pageSection(item) {
  if (item.kind === 'case-study') return { label: 'Published case studies', href: '/#case-studies' };
  if (item.kind === 'service') return { label: 'SEO services', href: '/services/' };
  if (item.kind === 'location') return { label: 'Locations we serve', href: '/locations/' };
  if (item.kind === 'industry') return { label: 'Industry expertise', href: '/industries/' };
  if (item.kind === 'note') return { label: 'Field notes', href: '/field-notes/' };
  return { label: 'Studio notebook', href: '/#studio' };
}
