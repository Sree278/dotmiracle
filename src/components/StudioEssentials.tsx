import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, CheckCheck, ClipboardList, Compass, Globe2, Leaf, LockKeyhole, MapPin } from 'lucide-react';
import type { LibraryItem, Panel } from '../lib/studio';
import EnquiryForm from './EnquiryForm';
import '../styles/studio-essentials.css';

type Props = { item: LibraryItem; items: LibraryItem[]; market: string; open: (p: Panel) => void };
function Crumbs({ label }: { label: string }) {
  return <nav className="search-crumbs essential-crumbs" aria-label="Breadcrumb"><a href="/">DotMiracle</a><span aria-hidden="true">/</span><span aria-current="page">{label}</span></nav>;
}
function PageHeading({ item }: { item: LibraryItem }) {
  const accent = item.content[0]?.accent;
  return <h1>{accent && item.title.endsWith(accent) ? <>{item.title.slice(0, -accent.length).trimEnd()}<br/><em>{accent}</em></> : item.title}</h1>;
}
function AboutPage({ item }: Pick<Props, 'item'>) {
  return <article className="essential-page"><div className="essential-intro"><div className="shell"><Crumbs label="About"/><div className="about-intro-grid"><div><p className="eyebrow"><i/>ABOUT DOTMIRACLE · CHENNAI, INDIA</p><PageHeading item={item}/><p className="essential-deck">{item.summary}</p><div className="essential-actions"><a className="button button-green" href="/services/">Explore our services <ArrowUpRight size={16}/></a></div></div><figure className="studio-postcard"><div className="plate-legend"><span>DOTMIRACLE FIELD SERIES</span><span>PLATE 01</span></div><img src="/images/kerala-backwaters.webp" alt="A Kerala houseboat on the backwaters, illustrated in forest-green ink." width="1536" height="846"/><figcaption><span><MapPin size={12}/> Kerala, India</span><span>A market we serve</span></figcaption></figure></div></div></div>
    <div className="shell about-body"><p className="eyebrow"><i/>OUR WORKING PRINCIPLES</p><div className="essential-section-head"><h2>{item.content[0]?.heading}</h2><p>{item.content[0]?.body}</p></div><div className="principle-grid">{item.content.slice(1).map((s, n) => <section className="principle-note" key={s.heading}><div className="principle-folio"><span>0{n + 1} / {s.kicker}</span>{n === 0 ? <Compass size={20}/> : n === 1 ? <CheckCheck size={20}/> : <Globe2 size={20}/>}</div><h3>{s.heading}</h3><p>{s.body}</p><div className="principle-links">{s.links?.map(l => <a className="notebook-link" key={l.href} href={l.href}>{l.label}<ArrowUpRight size={13}/></a>)}</div></section>)}</div><div className="about-next"><div><p className="eyebrow"><i/>YOUR NEXT STEP</p><h2>Bring us one page and one goal.</h2><p>Start small, or discuss a wider engagement. We’ll agree on the scope before any ongoing work.</p></div><a href="/contact/" className="button button-green">Talk to us <ArrowUpRight size={16}/></a></div></div></article>;
}
function ContactPage({ item, items, market, open }: Props) {
  const query = typeof window === 'undefined' ? new URLSearchParams() : new URLSearchParams(window.location.search);
  const [mode, setMode] = useState<'audit' | 'contact'>(() => query.get('brief') === 'audit' ? 'audit' : 'contact');
  const [status, setStatus] = useState<'idle' | 'pending' | 'received'>('idle');
  const interest = items.find(i => ['service', 'industry', 'location'].includes(i.kind) && i.slug === query.get('interest'));
  function selectMode(next: 'audit' | 'contact') {
    if (status !== 'idle') return;
    setMode(next);
    const url = new URL(window.location.href);
    if (next === 'audit') url.searchParams.set('brief', 'audit'); else url.searchParams.delete('brief');
    window.history.replaceState(window.history.state, '', url);
  }
  return <article className="essential-page contact-page"><div className="shell"><Crumbs label="Contact"/><div className="enquiry-desk"><div className="desk-intro"><p className="eyebrow"><i/>CONTACT THE STUDIO</p><PageHeading item={item}/><p className="essential-deck">{item.summary}</p><div className="desk-origin"><span className="status-dot"/> Chennai, India <span aria-hidden="true">/</span> Remote collaboration</div><div className="desk-next"><p className="eyebrow"><i/>WHAT HAPPENS NEXT</p><ol>{item.deliverables.map((d, i) => <li key={d}><span>0{i + 1}</span>{d}</li>)}</ol></div><div className="desk-trust"><Leaf size={18}/><div><strong>{item.content[0]?.heading}</strong><p>{item.content[0]?.body}</p><a href="/about/" className="notebook-link">Meet the studio <ArrowRight size={13}/></a></div></div></div>
    <div className="desk-sheet" id="enquiry"><div className="sheet-heading"><span><ClipboardList size={14}/> THE ENQUIRY DESK</span><span>DOTMIRACLE / IN</span></div>{status !== 'received' && <fieldset className="offer-choices" disabled={status === 'pending'}><legend>Choose your starting point</legend><div>{item.content.filter(s => s.offerMode).map(s => <label className={`offer-choice ${s.offerMode === mode ? 'is-selected' : ''}`} key={s.offerMode}><input type="radio" name="enquiry-kind" value={s.offerMode} checked={s.offerMode === mode} onChange={() => selectMode(s.offerMode!)}/><span className="offer-choice-top"><span>{s.kicker}</span><i aria-hidden="true">{s.offerMode === mode && <Check size={10}/>}</i></span><strong>{s.heading}</strong><small>{s.body}</small></label>)}</div></fieldset>}
    <EnquiryForm mode={mode} initialMarket={market} service={interest?.title} inline onStatus={setStatus} close={() => window.location.assign('/')}/>{status !== 'received' && <button type="button" className="desk-privacy" onClick={() => open({ view: 'privacy' })}><LockKeyhole size={12}/> Read our privacy note</button>}</div></div><div className="desk-browse"><span>Still exploring?</span>{item.content[0]?.links?.map(l => <a href={l.href} className="notebook-link" key={l.href}>{l.label}<ArrowUpRight size={13}/></a>)}</div></div></article>;
}
export default function StudioEssentials(props: Props) { return props.item.slug === 'about' ? <AboutPage item={props.item}/> : <ContactPage {...props}/>; }
