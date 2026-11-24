import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, ArrowUpRight, Compass, Leaf, LoaderCircle, Menu, Minus, Plus, RotateCw, X } from 'lucide-react';
import { panelFromURL } from '../lib/studio';
import type { LibraryItem, Panel } from '../lib/studio';
import { Wordmark } from './StudioArt';
import { ItemDetail, LibraryList, NoteCard, PrivacyView, ServiceCard } from './LibraryViews';
import EnquiryForm from './EnquiryForm';
import StudioDialog from './StudioDialog';
import SearchPage, { MarketLinks, PublishedCases } from './SearchPage';
import PageQuestions from './PageQuestions';
import MarketNavigation from './MarketNavigation';
import SignalArt from './SignalArt';
import QuickAudit from './QuickAudit';
import { ClientVoices, TestimonialForm } from './ClientVoices';
import { contactPath, homeTitle, pageTitle, publicPath } from '../../shared/search-pages.js';
import StudioEssentials from './StudioEssentials';
import { entrySource } from '../lib/attribution';
import '../styles/studio.css';
import '../styles/refinements.css';

function LoadingCards({ notes = false }: { notes?: boolean }) { return <div className={notes ? 'notes-grid' : 'services-grid'} role="status" aria-label="Loading studio content">{Array.from({ length: notes ? 3 : 4 }, (_, i) => <div className="content-skeleton" key={i}><span/><i/><i/></div>)}</div>; }
function LoadError({ retry }: { retry: () => void }) { return <div className="load-error" role="alert"><p>We couldn’t load this part of the studio.</p><button className="text-button" onClick={retry}>Try again <RotateCw size={14}/></button></div>; }

export default function CanopyStudio({ initialItems, initialPath = '/', enquiryMarket = 'Kerala & beyond' }: { initialItems?: LibraryItem[]; initialPath?: string; enquiryMarket?: string } = {}) {
  const [items] = useState<LibraryItem[]>(() => {
    if (initialItems) return initialItems;
    if (typeof document === 'undefined') return [];
    try { const snapshot = JSON.parse(document.getElementById('studio-library')?.textContent || '[]'); return Array.isArray(snapshot) ? snapshot : []; } catch { return []; }
  });
  // Every page carries its own copy of the library (scripts/pre-render.mjs), so there is nothing to fetch.
  const loading = false;
  const loadError = items.length === 0;
  const [panel, setPanel] = useState<Panel | null>(panelFromURL);
  const [auditWebsite, setAuditWebsite] = useState('');
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const load = useCallback(() => { window.location.reload(); }, []);
  useEffect(() => { entrySource(); }, []);
  useEffect(() => { const sync = () => { setPanel(panelFromURL()); setMenu(false); }; window.addEventListener('popstate', sync); return () => window.removeEventListener('popstate', sync); }, []);
  useEffect(() => {
    if (!menu) return;
    const outside = (e: PointerEvent) => { if (!menuRef.current?.contains(e.target as Node) && !menuButton.current?.contains(e.target as Node)) setMenu(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } };
    window.addEventListener('pointerdown', outside); window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('pointerdown', outside); window.removeEventListener('keydown', esc); };
  }, [menu]);
  const open = useCallback((next: Panel, website = '') => {
    setAuditWebsite(next.view === 'audit' ? website : '');
    if ((next.view === 'service' || next.view === 'note') && next.slug) { window.location.assign(publicPath({ kind: next.view, slug: next.slug })!); return; }
    const url = new URL(window.location.href);
    url.searchParams.set('view', next.view);
    if (next.slug) url.searchParams.set('item', next.slug); else url.searchParams.delete('item');
    if (next.service) url.searchParams.set('interest', next.service); else url.searchParams.delete('interest');
    if (new URLSearchParams(window.location.search).has('view')) window.history.replaceState(window.history.state, '', url);
    else window.history.pushState({ ...window.history.state, canopyOverlay: true }, '', url);
    setPanel(next); setMenu(false);
  }, []);
  const close = useCallback(() => {
    if (window.history.state?.canopyOverlay) { window.history.back(); }
    else { const url = new URL(window.location.href); url.searchParams.delete('view'); url.searchParams.delete('item'); url.searchParams.delete('interest'); window.history.replaceState(null, '', url); setPanel(null); }
  }, []);
  const services = items.filter(i => i.kind === 'service' && i.featured);
  const notes = items.filter(i => i.kind === 'note' && i.featured);
  const featuredProject = items.find(i => i.kind === 'case-study' && i.slug === 'mindtech-solutions' && i.case_origin === 'client');
  const steps = items.filter(i => i.kind === 'approach');
  const homeQuestions = items.find(i => i.kind === 'home')?.content[0]?.faq || [];
  const activeStep = step === null ? steps[0]?.slug : step;
  const current = panel ? items.find(i => i.slug === panel.slug && i.kind === panel.view) : undefined;
  const page = items.find(i => publicPath(i) === initialPath);
  const home = initialPath === '/';
  useEffect(() => { if (home && current) { const dest = publicPath(current); if (dest) window.location.replace(dest); } }, [home, current]);
  useEffect(() => { const label = panel?.view === 'audit' ? 'Free SEO audit' : panel?.view === 'contact' ? 'Let’s talk' : panel?.view === 'services' ? 'SEO service directory' : panel?.view === 'notes' ? 'Field notes' : panel?.view === 'privacy' ? 'Privacy' : current?.title; document.title = label ? `${label} | DotMiracle` : page ? pageTitle(page) : home ? homeTitle : 'Page not found | DotMiracle'; }, [panel, current, page, home]);
  const navState = (path: string) => initialPath === path ? 'page' as const : path !== '/' && initialPath.startsWith(path) ? 'location' as const : undefined;
  const navigation = (mobile = false) => <nav aria-label={mobile ? 'Mobile navigation' : 'Main navigation'}>{mobile && <a href="/" aria-current={navState('/')} onClick={() => setMenu(false)}>Home</a>}<a href="/#case-studies" onClick={() => setMenu(false)}>Our work</a><a href="/services/" aria-current={navState('/services/')} onClick={() => setMenu(false)}>Services</a><a href="/locations/" aria-current={navState('/locations/')} onClick={() => setMenu(false)}>Locations</a><a href="/about/" aria-current={navState('/about/')} onClick={() => setMenu(false)}>About</a>{mobile && <a href={contactPath(page)} aria-current={navState('/contact/')} onClick={() => setMenu(false)}>Contact</a>}</nav>;
  return <div className="canopy-site" id="top" data-template="portfolio-studio"><a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="shell header-inner"><a className="brand-link" href="/" aria-label="DotMiracle home"><Wordmark/></a><div className="desktop-nav">{navigation()}</div><div className="header-actions"><a className="button button-green header-cta" href={page?.slug === 'contact' ? '#enquiry' : contactPath(page)} aria-label="Contact the studio" aria-current={navState('/contact/')}>Contact <ArrowUpRight size={16}/></a><button className="menu-toggle" ref={menuButton} aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(s => !s)}>{menu ? <X size={23}/> : <Menu size={23}/>}</button></div></div>{menu && <div className="mobile-menu" id="mobile-menu" ref={menuRef}>{navigation(true)}<a className="text-button" href="/contact/?brief=audit#enquiry" onClick={() => setMenu(false)}>Get a free SEO audit <ArrowUpRight size={15}/></a></div>}</header>
    <main id="main">
      {!home ? page ? page.kind === 'studio' ? <StudioEssentials item={page} items={items} market={enquiryMarket} open={open}/> : <SearchPage item={page} items={items} open={open}/> : <div className="shell search-missing">{loading ? <p role="status">Opening the studio library…</p> : loadError ? <LoadError retry={load}/> : <><h1>We can’t find that page.</h1><p>The address may be mistyped, or the page may have moved. Try one of these instead:</p><div className="reading-links"><a href="/">Home<ArrowUpRight size={13}/></a><a href="/services/">SEO services<ArrowUpRight size={13}/></a><a href="/locations/">Locations<ArrowUpRight size={13}/></a><a href="/contact/">Contact<ArrowUpRight size={13}/></a></div></>}</div> : <>
      <section className="hero" aria-labelledby="hero-title"><div className="shell hero-topline"><span>INDEPENDENT SEARCH STUDIO</span><span>CHENNAI <b>●</b> ACROSS INDIA</span></div><div className="shell hero-layout"><div className="hero-copy"><div className="location-tag"><span/> AN INDEPENDENT SEO STUDIO</div><h1 id="hero-title">Good work deserves<br/><em>to be found.</em><span className="hero-spark" aria-hidden="true">✳</span></h1><p className="hero-description">We help growing businesses across India make their websites easier to find, understand and choose. Here’s a look at the thinking behind the work.</p><QuickAudit start={website => open({ view: 'audit' }, website)}/><a className="hero-work-link" href="/#case-studies">Explore case studies <ArrowUpRight size={16}/></a></div><SignalArt project={featuredProject}/></div><div className="shell hero-footline"><span>CHENNAI BASED / WORKING ACROSS INDIA</span><span>THE WORK, BELOW ↓</span></div></section>
      <PublishedCases items={items}/>
      <section className="services-section section-anchor" id="services" aria-labelledby="services-title"><div className="shell"><div className="section-heading"><div><p className="eyebrow"><i/>WHAT WE DO</p><h2 id="services-title">What can we help with?</h2></div><a className="section-link" href="/services/">View all services <ArrowUpRight size={16}/></a></div>{loading ? <LoadingCards/> : loadError ? <LoadError retry={load}/> : <div className="services-grid">{services.map(item => <ServiceCard key={item.id} item={item} open={open}/>)}</div>}</div></section>
      <section className="editorial-intro"><div className="shell editorial-intro-grid"><p className="eyebrow"><i/>01 / THE IDEA</p><div><h2>Visibility is good.<br/><em>Being chosen is better.</em></h2><p>Being found is only the beginning. We connect search, useful content and a considered website experience to help the right people find you—and feel confident getting in touch.</p><a href="/about/" className="editorial-link">Meet our approach <ArrowUpRight size={16}/></a></div></div></section>
      <MarketNavigation items={items}/>
      {!!items.length && <MarketLinks items={items}/>}
      <section className="approach-section section-anchor" id="approach" aria-labelledby="approach-title"><div className="shell approach-layout"><div className="approach-intro"><p className="eyebrow"><i/>OUR APPROACH</p><h2 id="approach-title">Good growth takes<br/><em>groundwork.</em></h2><p>No shortcuts. No one-size-fits-all playbooks. Just a considered process, built around your business and the people you want to reach.</p><div className="approach-signature"><span/><Leaf size={19}/><span/></div></div><div className="steps-list">{loading ? <div className="text-loading"><LoaderCircle className="spin" size={18}/> Loading our process…</div> : loadError ? <LoadError retry={load}/> : steps.map((item, index) => <div className={`process-step ${activeStep === item.slug ? 'step-open' : ''}`} key={item.id}><button aria-expanded={activeStep === item.slug} aria-controls={`step-${item.id}`} onClick={() => setStep(activeStep === item.slug ? '' : item.slug)}><span className="step-number">0{index + 1}</span><strong>{item.title}</strong>{activeStep === item.slug ? <Minus size={17}/> : <Plus size={17}/>}</button><div id={`step-${item.id}`} hidden={activeStep !== item.slug}><p>{item.summary}</p><span className="step-output"><Compass size={13}/>{item.category}</span></div></div>)}</div></div></section>
      <section className="notes-section section-anchor" id="field-notes" aria-labelledby="notes-title"><div className="shell"><div className="section-heading"><div><p className="eyebrow"><i/>FROM THE STUDIO</p><h2 id="notes-title">Field notes</h2></div><a className="section-link" href="/field-notes/">All field notes <ArrowUpRight size={16}/></a></div>{loading ? <LoadingCards notes/> : loadError ? <LoadError retry={load}/> : <div className="notes-grid">{notes.map((item, i) => <NoteCard key={item.id} item={item} index={i} open={open}/>)}</div>}</div></section>
      <ClientVoices items={items} open={open}/>
      {!!homeQuestions.length && <div className="shell search-page mb-9 mt-2"><PageQuestions questions={homeQuestions}/></div>}
      <section className="studio-section section-anchor" id="studio" aria-labelledby="studio-title"><div className="shell studio-layout"><div className="studio-copy"><p className="eyebrow"><i/>THE STUDIO</p><h2 id="studio-title">From Chennai.<br/><em>For wherever you’re going.</em></h2><p>DotMiracle is an independent SEO studio based in Chennai, working with businesses across India. We connect search work to the appointment, booking, order, or wholesale enquiry a business actually needs.</p><a className="button button-cream" href="/contact/">Talk to us <ArrowUpRight size={17}/></a><a className="studio-profile-link" href="/about/">About DotMiracle <ArrowRight size={14}/></a></div><div className="studio-console" aria-hidden="true"><div className="studio-console-head"><span>DOTMIRACLE / INDEPENDENT STUDIO</span><span>●</span></div><div className="studio-console-mark">✳</div><div className="studio-console-foot"><strong>Good work.<br/>Clear direction.</strong><span>MADE FOR WHAT’S NEXT ↗</span></div></div></div></section>
      </>}
    </main><footer className="site-footer"><div className="shell"><div className="footer-main"><a className="brand-link" href="/" aria-label="DotMiracle home"><Wordmark/></a><p>Rooted in Chennai. Open to the world.</p><nav className="footer-route-links" aria-label="Studio links"><a href="/about/">About</a><a href="/services/">Services</a><a href="/industries/">Industries</a><a href="/field-notes/">Field notes</a><a href="/contact/">Contact</a></nav><a className="back-to-top" href="#top">Back to top <ArrowUp size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} DotMiracle</span><span className="footer-location"><span className="status-dot"/> Chennai, India</span><button onClick={() => open({ view: 'privacy' })}>Privacy note</button></div></div></footer>
    {panel && <StudioDialog key={`${panel.view}-${panel.slug || ''}`} onClose={close} wide={panel.view === 'notes' || panel.view === 'services'}>{panel.view === 'testimonial' ? <TestimonialForm close={close}/> : panel.view === 'audit' || panel.view === 'contact' ? <EnquiryForm mode={panel.view} service={panel.service} initialWebsite={panel.view === 'audit' ? auditWebsite : ''} initialMarket={enquiryMarket} close={close}/> : panel.view === 'privacy' ? <PrivacyView/> : loading ? <div className="dialog-loading"><LoaderCircle className="spin"/><h2 id="dialog-title">Opening the library…</h2></div> : loadError ? <div className="dialog-loading"><h2 id="dialog-title">A little interruption.</h2><LoadError retry={load}/></div> : panel.view === 'services' || panel.view === 'notes' ? <LibraryList kind={panel.view === 'services' ? 'service' : 'note'} items={items} open={open}/> : current ? <ItemDetail item={current} open={open}/> : <div className="dialog-loading"><h2 id="dialog-title">Page not found.</h2><p>This entry is not in our studio library.</p><button className="button button-green" onClick={() => open({ view: panel.view === 'note' ? 'notes' : 'services' })}>Browse the library <ArrowRight size={16}/></button></div>}</StudioDialog>}
  </div>;
}
