import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, LockKeyhole, Quote } from 'lucide-react';
import type { LibraryItem, Panel } from '../lib/studio';
import { openEmail } from '../lib/email';
import type { EmailBrief } from '../lib/email';
import { CONTACT_EMAIL } from '../../shared/search-pages.js';
import EmailReady from './EmailReady';

export function ClientVoices({ items, open }: { items: LibraryItem[]; open: (p: Panel) => void }) {
  const quotes = items.filter(i => i.kind === 'testimonial' && i.featured);
  // Show the section only once a client has approved a quote: an empty section reads as "no clients".
  if (!quotes.length) return null;
  return <section id="testimonials" className="shell section-anchor mb-8 border-y border-[#d9ddcf] py-7" aria-labelledby="voices-title"><p className="eyebrow"><i/>CLIENT VOICES</p><div className="section-heading !mb-3"><h2 id="voices-title" className="!text-3xl">Client testimonials</h2><button type="button" className="section-link" onClick={() => open({ view: 'testimonial' })}>Share project feedback <ArrowUpRight size={14}/></button></div>{quotes.length ? <div className="grid gap-4 md:grid-cols-2">{quotes.map(q => <figure key={q.id} className="rounded-lg border border-[#d6dfcb] bg-[#f1f4e9] p-5"><Quote size={17} aria-hidden="true"/><blockquote className="my-3 whitespace-pre-line break-words text-sm leading-relaxed">{q.summary}</blockquote><figcaption className="text-xs font-semibold">{q.title}</figcaption></figure>)}</div> : <p className="max-w-3xl text-sm leading-relaxed text-[#5d655b]">No client quotes have been approved for publication yet. We confirm the project and the author’s permission before sharing feedback. Meanwhile, you can read the <a className="underline underline-offset-2" href="/#case-studies">attributed case studies</a>.</p>}</section>;
}

export function TestimonialForm({ close }: { close: () => void }) {
  const [brief, setBrief] = useState<EmailBrief | null>(null);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('fax')) return; // Hidden field: only automated form-fillers complete it.
    const value = (key: string) => String(data.get(key) || '').trim();
    const next = { subject: `Client feedback for DotMiracle from ${value('credit')}`, body: [
      'Client feedback',
      '',
      `Name (private): ${value('name')}`,
      `Verification email (private): ${value('email')}`,
      `Project (private): ${value('project')}`,
      '',
      'Testimonial, for publication:',
      value('quote'),
      '',
      `Public attribution: ${value('credit')}`,
      '',
      'I am the author of this feedback about a real DotMiracle project and permit DotMiracle to publish this exact quote and public attribution after verification.',
    ].join('\n') };
    setBrief(next);
    openEmail(next);
  }
  if (brief) return <EmailReady brief={brief} headingId="dialog-title" eyebrow="YOUR EMAIL IS READY" title="Thank you for your feedback." close={close} fileName="dotmiracle-feedback.txt"><p>Your email app should now show a message to <strong>{CONTACT_EMAIL}</strong> with your feedback filled in. Press Send. Nothing is published automatically: we check the project and your permission first.</p></EmailReady>;
  return <div><p className="eyebrow"><i/>CLIENT FEEDBACK</p><h2 id="dialog-title">In your own words.</h2><p className="dialog-intro">Worked with DotMiracle? Describe what the experience was like. The studio checks the engagement and your permission before publishing a quote.</p><form className="enquiry-form" onSubmit={submit}><div className="input-pair"><label>Your name · private<input name="name" autoComplete="name" required minLength={2} maxLength={100}/></label><label>Verification email · private<input name="email" type="email" autoComplete="email" required maxLength={254}/></label></div><label>Which project was this? · private<input name="project" required minLength={3} maxLength={160} placeholder="Project or service we can verify"/></label><label>Your testimonial · for publication<textarea name="quote" rows={3} required minLength={20} maxLength={1000} placeholder="What did the work involve, and what was useful?"/></label><label>Public attribution<input name="credit" required minLength={2} maxLength={100} placeholder="Name or role and business, as you want them shown"/></label><label className="!flex items-start gap-2"><input type="checkbox" name="consent" required className="!mt-0.5 !h-4 !min-h-0 !w-4 shrink-0"/><span className="text-xs font-normal">I am the author of this feedback about a real DotMiracle project and permit DotMiracle to publish this exact quote and public attribution after verification.</span></label><div className="form-trap" aria-hidden="true"><label>Fax<input name="fax" tabIndex={-1} autoComplete="off"/></label></div><button className="button button-green">Email my feedback <ArrowUpRight size={15}/></button><p className="privacy-footnote"><LockKeyhole size={12}/> Opens your email app. Your email and private project details are never part of the public quote.</p></form></div>;
}
