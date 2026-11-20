type Source = { landing_page: string; channel: string };
const storageKey = 'dotmiracle_search_entry';
export function entrySource(): Source {
  const path = window.location.pathname || '/';
  try { const old = JSON.parse(sessionStorage.getItem(storageKey) || 'null'); if (old && typeof old.landing_page === 'string' && typeof old.channel === 'string') return old; } catch { /* Storage is optional. */ }
  const q = new URLSearchParams(window.location.search);
  let channel = 'Direct / unknown';
  if (q.get('utm_campaign') === 'gbp' && q.get('utm_source') === 'google' && q.get('utm_medium') === 'organic') channel = 'Google Business Profile';
  else if (/^(cpc|ppc|paid)$/i.test(q.get('utm_medium') || '')) channel = 'Paid';
  else if (document.referrer) { try { const host = new URL(document.referrer).hostname; if (host !== location.hostname) channel = /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com)$/.test(host) ? 'Search referral' : 'Referral'; } catch { /* Keep unknown when the source is unavailable. */ } }
  const source = { landing_page: /^[a-z0-9/-]{1,140}$/i.test(path) ? path : '/', channel };
  try { sessionStorage.setItem(storageKey, JSON.stringify(source)); } catch { /* Submission still works without storage. */ }
  return source;
}
export function conversionEvent(event: 'audit_form_open' | 'contact_form_open' | 'generate_lead', type: 'audit' | 'contact') {
  // A consent-managed analytics installation can consume these events later.
  // No remote script, form values, receipt IDs or third-party requests here.
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  (w.dataLayer ||= []).push({ event, form_type: type, ...entrySource(), conversion_page: window.location.pathname });
}
