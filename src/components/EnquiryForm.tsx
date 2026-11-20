import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { LockKeyhole, MoveUpRight, Sprout } from 'lucide-react';
import { conversionEvent, entrySource } from '../lib/attribution';
import { validWebsite } from '../lib/website';
import { openEmail } from '../lib/email';
import type { EmailBrief } from '../lib/email';
import { CONTACT_EMAIL } from '../../shared/search-pages.js';
import EmailReady from './EmailReady';

interface Fields { name: string; email: string; website: string; market: string; goals: string; fax: string }
const empty: Fields = { name: '', email: '', website: '', market: 'Kerala & beyond', goals: '', fax: '' };
export default function EnquiryForm({ mode, service, initialMarket = empty.market, initialWebsite = '', close, inline = false, onStatus }: { mode: 'audit' | 'contact'; service?: string; initialMarket?: string; initialWebsite?: string; close: () => void; inline?: boolean; onStatus?: (status: 'idle' | 'pending' | 'received') => void }) {
  const [fields, setFields] = useState<Fields>(() => ({ ...empty, market: initialMarket, website: initialWebsite }));
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [error, setError] = useState('');
  const [brief, setBrief] = useState<EmailBrief | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const isAudit = mode === 'audit';
  const countedOpen = useRef('');
  const headingId = inline ? 'enquiry-form-title' : 'dialog-title';
  const confirmation = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (!inline && countedOpen.current !== mode) { conversionEvent(isAudit ? 'audit_form_open' : 'contact_form_open', mode); countedOpen.current = mode; } }, [isAudit, mode, inline]);
  useEffect(() => { setErrors({}); setError(''); }, [mode]);
  useEffect(() => { if (brief) confirmation.current?.focus({ preventScroll: false }); }, [brief]);
  const recordInteraction = () => { if (inline && countedOpen.current !== mode) { conversionEvent(isAudit ? 'audit_form_open' : 'contact_form_open', mode); countedOpen.current = mode; } };
  const update = (key: keyof Fields, value: string) => {
    setFields(p => ({ ...p, [key]: value }));
    if (errors[key]) setErrors(p => ({ ...p, [key]: undefined }));
    setError('');
  };
  function validate() {
    const next: Partial<Fields> = {};
    if (fields.name.trim().length < 2) next.name = 'Please enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) next.email = 'Please enter a valid email address.';
    if (isAudit && !fields.website.trim()) next.website = 'Add the website you would like us to review.';
    if (fields.website.trim() && !validWebsite(fields.website)) next.website = 'Enter a valid website, such as yourbusiness.com.';
    if (!fields.market) next.market = 'Choose the area you want to reach.';
    return next;
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    const invalid = validate();
    setErrors(invalid);
    if (Object.keys(invalid).length) { form.current?.querySelector<HTMLElement>(`[name="${Object.keys(invalid)[0]}"]`)?.focus(); return; }
    if (fields.fax) return; // Hidden field: only automated form-fillers complete it.
    const source = entrySource();
    const name = fields.name.trim(), site = fields.website.trim();
    const subject = isAudit ? `Free SEO audit request: ${site.replace(/^https?:\/\//i, '').replace(/\/$/, '')}` : `Project enquiry${service ? `: ${service}` : ''} from ${name}`;
    const body = [
      isAudit ? 'Free SEO audit request' : 'Project enquiry',
      '',
      `Name: ${name}`,
      `Email: ${fields.email.trim()}`,
      `Website: ${site || 'Not provided'}`,
      `Where would you like to grow? ${fields.market}`,
      ...(service ? [`Service of interest: ${service}`] : []),
      '',
      isAudit ? 'Anything we should know?' : 'About my plans',
      fields.goals.trim() || 'No additional message.',
      '',
      `First page visited: ${source.landing_page}`,
      `How I found you: ${source.channel}`,
      `Sent from: ${window.location.pathname}`,
    ].join('\n');
    const next = { subject, body };
    setBrief(next); setError('');
    onStatus?.('received');
    conversionEvent('generate_lead', mode);
    openEmail(next);
  }
  if (brief) return <EmailReady brief={brief} headingId={headingId} headingRef={confirmation} eyebrow="YOUR EMAIL IS READY" title="Press Send to reach us." close={close} fileName={isAudit ? 'dotmiracle-audit-request.txt' : 'dotmiracle-enquiry.txt'}><p>Thank you, {fields.name.trim().split(' ')[0]}. Your email app should now show a message to <strong>{CONTACT_EMAIL}</strong> with your {isAudit ? 'audit request' : 'enquiry'} filled in. Check it and press Send. We’ll reply to <strong>{fields.email.trim()}</strong>.</p></EmailReady>;
  const issue = (key: keyof Fields) => errors[key] ? <span id={`err-${key}`} className="field-error">{errors[key]}</span> : null;
  return <div className="enquiry-view"><p className="eyebrow"><i/>{isAudit ? 'A FRESH PERSPECTIVE' : 'START A CONVERSATION'}</p><h2 id={headingId}>{inline ? 'Your project details' : isAudit ? 'Your free SEO audit.' : 'Let’s talk growth.'}</h2><p className="dialog-intro">{isAudit ? 'Share one public page. We’ll review who it serves, check the path to enquiry, and identify the next fix to prioritise. No login details or ongoing commitment needed.' : 'Tell us who you want to reach and what a useful enquiry looks like. A website is optional for a project discussion.'}</p>{service && <div className="interest-tag"><Sprout size={15}/> Service of interest: <strong>{service}</strong></div>}
    <form noValidate onSubmit={submit} onFocusCapture={recordInteraction} ref={form} className="enquiry-form" aria-labelledby={headingId}>
      <div className="input-pair"><label>Your name <b>*</b><input name="name" autoComplete="name" placeholder="Full name" maxLength={100} value={fields.name} onChange={e => update('name', e.target.value)} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined}/>{issue('name')}</label><label>Email address <b>*</b><input name="email" type="email" autoComplete="email" placeholder="you@business.com" maxLength={254} value={fields.email} onChange={e => update('email', e.target.value)} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined}/>{issue('email')}</label></div>
      <label>Your website {isAudit ? <b>*</b> : <em>(optional)</em>}<input name="website" type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" maxLength={500} value={fields.website} onChange={e => update('website', e.target.value)} aria-required={isAudit} aria-invalid={!!errors.website} aria-describedby={errors.website ? 'err-website' : undefined}/>{issue('website')}</label>
      <label>Where would you like to grow?<select name="market" value={fields.market} onChange={e => update('market', e.target.value)}><option>Kerala &amp; beyond</option><option>Kerala</option><option>Across India</option><option>International</option><option>Still exploring</option></select>{issue('market')}</label>
      <label>{isAudit ? 'Anything we should know?' : 'Tell us about your plans'} <em>(optional)</em><textarea name="goals" rows={3} maxLength={2000} placeholder="Your goals, challenges, or a little about your business…" value={fields.goals} onChange={e => update('goals', e.target.value)}/>{issue('goals')}</label>
      <div className="form-trap" aria-hidden="true"><label>Fax number<input name="fax" tabIndex={-1} autoComplete="off" value={fields.fax} onChange={e => update('fax', e.target.value)}/></label></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="button button-green form-submit">{isAudit ? 'Email my audit request' : 'Email my enquiry'} <MoveUpRight size={17}/></button><p className="privacy-footnote"><LockKeyhole size={12}/> Opens your email app with your answers filled in. Your details are only used to reply.</p>
    </form></div>;
}
