import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, Globe2 } from 'lucide-react';
import { validWebsite } from '../lib/website';

/** A local-only handoff: no enquiry is sent until the visitor confirms the full brief. */
export default function QuickAudit({ start }: { start: (website: string) => void }) {
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const field = useRef<HTMLInputElement>(null);
  function continueReview(e: FormEvent) {
    e.preventDefault();
    const value = website.trim();
    if (value && !validWebsite(value)) { setError('Enter a website such as yourbusiness.com, or leave it blank for now.'); field.current?.focus(); return; }
    setError(''); start(value);
  }
  return <form className="quick-audit" onSubmit={continueReview} noValidate aria-label="Start a free SEO audit">
    <div className="quick-audit-entry"><label className="quick-audit-field" htmlFor="audit-start-url"><Globe2 size={17} strokeWidth={1.5} aria-hidden="true"/><span className="sr-only">Your website, optional at this step</span><input ref={field} id="audit-start-url" name="review_url" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} maxLength={500} placeholder="Your website URL" value={website} onChange={e => { setWebsite(e.target.value); setError(''); }} aria-invalid={!!error} aria-describedby={error ? 'audit-start-error' : 'audit-start-scope'}/></label><button type="submit" className="button hero-primary">Get a free SEO audit <ArrowUpRight size={16} aria-hidden="true"/></button></div>
    {error && <p id="audit-start-error" className="quick-audit-error" role="alert">{error}</p>}<p className="hero-scope" id="audit-start-scope">One page reviewed. One clear priority. No account needed.</p>
  </form>;
}
