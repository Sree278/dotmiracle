import { useRef, useState } from 'react';
import { Copy } from 'lucide-react';

/** Prepare an owner-authorised profile update; never imply a live Google integration. */
export function ProfileHandoff({ description }: { description: string }) {
  const [model, setModel] = useState('');
  const [notice, setNotice] = useState('');
  const input = useRef<HTMLInputElement>(null), copy = useRef<HTMLTextAreaElement>(null);
  const eligible = model === 'storefront' || model === 'visits';
  const base = typeof document === 'undefined' ? '' : new URL(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || location.href).origin;
  const tagged = `${base}/locations/kerala/?utm_source=google&utm_medium=organic&utm_campaign=gbp`;
  async function copyField(field: HTMLInputElement | HTMLTextAreaElement | null, label: string) {
    if (!field) return;
    try { await navigator.clipboard.writeText(field.value); setNotice(`${label} copied.`); }
    catch { field.focus(); field.select(); setNotice(`${label} selected. Use your device’s Copy command.`); }
  }
  return <div className="detail-checklist" id="profile-handoff"><p className="eyebrow">BUSINESS PROFILE · OWNER HANDOFF</p><h3 className="mb-2 font-semibold">Prepare the details for your profile</h3><label className="block text-sm" htmlFor="profile-model">How does the studio meet customers?</label><select className="my-2 block w-full rounded-md border border-[#c9d2bd] bg-[#fffefa] px-3 py-2 text-sm" id="profile-model" value={model} onChange={e => { setModel(e.target.value); setNotice(''); }}><option value="">Choose the actual operating model</option><option value="online">Entirely online</option><option value="storefront">Customers visit a staffed business location</option><option value="visits">We visit customers in person</option></select>
    {model === 'online' && <p className="text-sm leading-relaxed">An online-only studio is not eligible for a Business Profile. Build local relevance through the regional service page and useful partnerships, not a virtual office.</p>}
    {eligible && <div className="mt-3 text-sm"><p className="mb-3 leading-relaxed">{model === 'visits' ? 'Use only areas you genuinely visit. Hide the address if customers are not served there.' : 'Confirm the real address, public hours, signage, and customer access before displaying a location.'} The verified owner must approve these details and make the update in Google.</p><label className="block text-xs font-semibold" htmlFor="profile-site">Website link with enquiry attribution</label><input ref={input} id="profile-site" readOnly value={tagged} className="mt-1 w-full rounded-md border border-[#c9d2bd] bg-[#fffefa] p-2 text-xs"/><button type="button" className="text-button my-2" onClick={() => copyField(input.current, 'Website link')}><Copy size={13}/> Copy website link</button><label htmlFor="profile-description" className="mt-2 block text-xs font-semibold">Proposed description · confirm it matches the business</label><textarea id="profile-description" readOnly ref={copy} value={description} rows={4} className="mt-1 w-full rounded-md border border-[#c9d2bd] bg-[#fffefa] p-2 text-sm"/><button type="button" className="text-button mt-2" onClick={() => copyField(copy.current, 'Description')}><Copy size={13}/> Copy description</button><p className="mt-1 text-xs" aria-live="polite">{notice}</p></div>}
  </div>;
}
