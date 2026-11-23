import { useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { ArrowRight, Copy, Download, Mail, MoveUpRight } from 'lucide-react';
import { briefText, gmailLink, mailtoLink, saveBrief } from '../lib/email';
import type { EmailBrief } from '../lib/email';

/** Shown after a form opens the visitor's email app: other ways to send the same brief. */
export default function EmailReady({ brief, headingId, headingRef, eyebrow, title, children, close, fileName }: { brief: EmailBrief; headingId: string; headingRef?: RefObject<HTMLHeadingElement | null>; eyebrow: string; title: string; children: ReactNode; close: () => void; fileName: string }) {
  const [notice, setNotice] = useState('');
  const field = useRef<HTMLTextAreaElement>(null);
  const text = briefText(brief);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setNotice('Copied. Paste it into a new email to us.'); }
    catch { field.current?.focus(); field.current?.select(); setNotice('Selected. Use your device’s Copy command.'); }
  }
  // data-clarity-mask: Microsoft Clarity (loaded through Tag Manager) must never record the visitor's name, email or brief.
  return <div className="receipt-view email-ready" aria-live="polite" data-clarity-mask="True"><span className="receipt-check"><Mail size={27}/></span><p className="eyebrow"><i/>{eyebrow}</p><h2 id={headingId} ref={headingRef} tabIndex={-1}>{title}</h2>{children}
    <div className="receipt-slip"><span>EMAIL APP DIDN’T OPEN?</span><strong>Send it another way.</strong><div className="email-ready-options"><a className="text-button" href={mailtoLink(brief)}>Open my email app again <MoveUpRight size={14}/></a><a className="text-button" href={gmailLink(brief)} target="_blank" rel="noopener noreferrer">Open it in Gmail <MoveUpRight size={14}/></a><button type="button" className="text-button" onClick={copy}>Copy the brief <Copy size={14}/></button></div><label className="sr-only" htmlFor={`${headingId}-brief`}>Your brief</label><textarea id={`${headingId}-brief`} ref={field} className="email-ready-text" readOnly rows={6} value={text}/><small aria-live="polite">{notice}</small></div>
    <div className="receipt-actions"><button className="button button-green" onClick={close}>Back to the studio <ArrowRight size={16}/></button><button className="text-button" onClick={() => saveBrief(brief, fileName)}>Save a copy <Download size={15}/></button></div></div>;
}
