import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Compass, Leaf } from 'lucide-react';
import type { LibraryItem, Panel } from '../lib/studio';
import { contactPath, pageHeading, publicPath, pageSection } from '../../shared/search-pages.js';
import { ProfileHandoff } from './SearchSupport';
import PageQuestions from './PageQuestions';
import { ContentDesk, DirectoryHub } from './ContentArchitecture';
import { ServiceArt } from './StudioArt';
import '../styles/search-pages.css';

export function MarketLinks({ items }: { items: LibraryItem[] }) {
  return <nav className="shell market-links" id="markets" aria-label="Services, regions, and industries"><div className="market-group basis-full"><a className="eyebrow" href="/services/">SERVICE DIRECTORY <ArrowUpRight size={12}/></a>{items.filter(i => i.kind === 'service' && !i.featured).map(i => <a key={i.id} href={publicPath(i)!}>{i.title}<ArrowUpRight size={12}/></a>)}</div><div className="market-group"><a className="eyebrow" href="/locations/">LOCATION DIRECTORY <ArrowUpRight size={12}/></a>{items.filter(i => i.kind === 'location').map(i => <a key={i.id} href={publicPath(i)!}>{i.category}<ArrowUpRight size={12}/></a>)}</div><div className="market-group"><a className="eyebrow" href="/industries/">INDUSTRY DIRECTORY <ArrowUpRight size={12}/></a>{items.filter(i => i.kind === 'industry').map(i => <a key={i.id} href={publicPath(i)!}>{i.category}<ArrowUpRight size={12}/></a>)}</div></nav>;
}

export function PublishedCases({ items }: { items: LibraryItem[] }) {
  const studies = items.filter(i => i.kind === 'case-study');
  if (!studies.length) return null;
  return <section className="shell section-anchor border-t border-[#d9ddcf] py-9 md:py-12" id="case-studies" aria-labelledby="studies-title"><div className="section-heading"><div><p className="eyebrow"><i/>PUBLISHED RESULTS</p><h2 id="studies-title">SEO case studies</h2></div></div><p className="mb-5 max-w-2xl text-sm leading-relaxed text-[#5d655b]">Two agencies’ published results, with the baseline, comparison period, and original source. These are external studies, not DotMiracle client projects.</p><div className="grid gap-4 md:grid-cols-2">{studies.map(i => <a key={i.id} href={publicPath(i)!} className={`detail-masthead tone-${i.tone}`}><div><p className="eyebrow">{i.category}</p><h3 className="my-2 text-2xl leading-tight" style={{ fontFamily: 'var(--serif)' }}>{i.title}</h3><span className="note-read">Read the before and after <ArrowRight size={14}/></span></div><ServiceArt kind={i.artwork}/></a>)}</div></section>;
}

export default function SearchPage({ item, items, open }: { item: LibraryItem; items: LibraryItem[]; open: (p: Panel) => void }) {
  if (item.kind === 'hub') return <DirectoryHub item={item} items={items} open={open}/>;
  const editorial = ['note', 'case-study'].includes(item.kind);
  const { label: sectionLabel, href: sectionLink } = pageSection(item);
  // Recommend explicitly linked topics, never pages that merely share an illustration.
  const linksOf = (i: LibraryItem) => i.content.flatMap(s => (s.links || []).map(l => l.href.split('#')[0]));
  const entries = new Map(items.map(i => [publicPath(i), i]));
  const related = [...new Set([...linksOf(item).map(p => entries.get(p)), ...items.filter(i => linksOf(i).includes(publicPath(item)!))])].filter((i): i is LibraryItem => !!i && i.id !== item.id && !!publicPath(i) && !['plan', 'proof', 'hub'].includes(i.kind)).slice(0, 3);
  const audit = () => open({ view: 'audit', service: editorial ? undefined : item.title });
  return <article className="search-page">
    <div className={`search-mast tone-${item.tone}`}><div className="shell"><nav className="search-crumbs" aria-label="Breadcrumb"><a href="/">DotMiracle</a><span>/</span><a href={sectionLink}>{sectionLabel}</a><span>/</span><span aria-current="page">{item.title}</span></nav><div className="search-heading-row"><div><p className="eyebrow"><i/>{item.category} · {editorial ? 'STUDIO EDITION' : 'SEO STUDIO / KERALA'}</p><h1>{pageHeading(item)}</h1><p className="search-standfirst">{item.summary}</p>{editorial ? <div className="search-byline"><Leaf size={14}/> <a href="/#studio" className="underline underline-offset-2">By DotMiracle</a> <span>·</span> {item.read_time} min read</div> : <div className="search-actions"><button className="button button-green" onClick={audit}>Get a free SEO audit <ArrowUpRight size={16}/></button><a href="#scope">See the scope <ArrowDownRight size={14}/></a></div>}</div><div className="search-plate"><ServiceArt kind={item.artwork}/><span>DOTMIRACLE / FIELD SERIES</span></div></div></div></div>
    <div className="shell search-reading"><div className="search-main-copy">
      {item.content.map((s, n) => <section className="search-section" id={`section-${n + 1}`} key={s.heading}>{s.kicker && <p className="eyebrow"><i/>{s.kicker}</p>}<h2 id={s.anchor}>{s.heading}</h2><p>{s.body}</p>{s.bullets?.length ? <ul className="search-bullets">{s.bullets.map(t => <li key={t}>{t}</li>)}</ul> : null}{s.briefs?.length ? <ContentDesk briefs={s.briefs} items={items}/> : null}{s.rows?.length ? <div className="search-table-scroll" tabIndex={0} role="region" aria-label={s.heading}><table><thead><tr>{s.columns?.map(t => <th key={t} scope="col">{t}</th>)}</tr></thead><tbody>{s.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody></table></div> : null}{s.links?.length ? <div className="reading-links">{s.links.map(l => <a key={l.href} href={l.href} download={l.href.startsWith('/resources/') ? true : undefined} {...(l.href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{l.label}<ArrowUpRight size={13}/></a>)}</div> : null}{s.profileDraft && <ProfileHandoff description={s.profileDraft}/>}</section>)}
      <div className="search-scope" id="scope"><p className="eyebrow"><i/>{editorial ? 'TAKE THIS WITH YOU' : 'SCOPE OF WORK'}</p><h2>{editorial ? 'The practical checklist' : 'What you’ll take away'}</h2><ul>{item.deliverables.map(d => <li key={d}><Check size={15}/>{d}</li>)}</ul></div>
      {!!item.content[0]?.faq?.length && <div className="mt-7"><PageQuestions questions={item.content[0].faq}/></div>}
      <div className="search-bottom-cta"><p className="eyebrow"><i/>YOUR NEXT STEP</p><h2>Start with one useful audit.</h2><p>{item.content[0]?.search?.auditFocus || 'Share a public website and the market you want to reach. The first review focuses on one important page, its search intent, and a short list of priorities.'} No passwords or analytics access needed.</p><div className="flex flex-wrap items-baseline gap-x-5 gap-y-2"><button className="button button-green" onClick={audit}>Get a free SEO audit <ArrowUpRight size={15}/></button><a className="notebook-link scope-project-link" href={contactPath(item)}>Talk to us <ArrowRight size={14}/></a></div></div>
    </div><div className="search-aside"><div className="search-contents"><p className="eyebrow"><Compass size={13}/>IN THIS BRIEF</p><nav aria-label="On this page">{item.content.map((s, i) => <a href={`#section-${i + 1}`} key={i}><small>{String(i + 1).padStart(2, '0')}</small><span>{s.nav || s.heading}</span></a>)}</nav></div><div className="search-related"><p className="eyebrow">CONTINUE EXPLORING</p>{related.map(i => <a key={i.id} href={publicPath(i)!}>{i.title}<ArrowUpRight size={14}/></a>)}</div></div></div>
  </article>;
}
