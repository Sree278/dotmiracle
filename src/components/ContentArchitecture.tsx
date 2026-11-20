import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { publicPath } from '../../shared/search-pages.js';
import type { EditorialBrief, LibraryItem, Panel } from '../lib/studio';
import { ServiceArt } from './StudioArt';

export function DirectoryHub({ item, items, open }: { item: LibraryItem; items: LibraryItem[]; open: (p: Panel) => void }) {
  const kind = item.content[0]?.directory;
  const entries = items.filter(i => i.kind === kind);
  return <article className="search-page"><header className={`search-mast tone-${item.tone}`}><div className="shell"><nav className="search-crumbs" aria-label="Breadcrumb"><a href="/">DotMiracle</a><span>/</span><span aria-current="page">{item.title}</span></nav><div className="search-heading-row"><div><p className="eyebrow"><i/>STUDIO DIRECTORY · {item.category}</p><h1>{item.title}</h1><p className="search-standfirst">{item.summary}</p></div><div className="search-plate"><ServiceArt kind={item.artwork}/><span>DOTMIRACLE / DIRECTORY</span></div></div></div></header>
    <div className="shell py-8 md:py-12"><h2>{item.content[0]?.heading}</h2><p className="mb-6 max-w-3xl text-sm leading-relaxed text-[#5d655b]">{item.content[0]?.body}</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{entries.map(i => <a key={i.id} className={`detail-masthead tone-${i.tone} !items-start`} aria-label={`Explore ${i.title}`} href={publicPath(i)!}><div><p className="eyebrow">{i.category}</p><h3 className="my-2 text-2xl leading-tight" style={{ fontFamily: 'var(--serif)' }}>{i.title}</h3><p className="text-xs leading-relaxed text-[#52604c]">{i.summary}</p></div><ArrowUpRight size={16} className="shrink-0"/></a>)}</div>
    {item.content.slice(1).map(s => <section className="search-section mt-8" key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p><div className="reading-links">{s.links?.map(l => <a key={l.href} href={l.href}>{l.label}<ArrowUpRight size={13}/></a>)}</div></section>)}<div className="essential-actions"><button className="button button-green" onClick={() => open({ view: 'audit' })}>Get a free SEO audit <ArrowUpRight size={16}/></button><a href={kind === 'location' ? '/contact/?market=Kerala' : '/contact/'} className="notebook-link">Discuss a project <ArrowRight size={14}/></a></div></div></article>;
}

export function ContentDesk({ briefs, items }: { briefs: EditorialBrief[]; items: LibraryItem[] }) {
  const [market, setMarket] = useState('All markets');
  const visible = briefs.filter(b => market === 'All markets' || b.market === market);
  const pages = new Map(items.map(i => [publicPath(i), i]));
  const markets = [...new Set(briefs.map(b => b.market))];
  const link = (url: string) => <a href={url} className="underline underline-offset-2">{pages.get(url)?.title || url}</a>;
  function download() {
    const rows = [['Proposed window', 'Market', 'Candidate keyword', 'Search intent', 'Primary page', 'Owner', 'Evidence needed', 'Internal links', 'Next action', 'Review rule'], ...visible.map(b => [b.window, b.market, b.query, b.intent, b.page, b.owner, b.evidence, b.links.join(' | '), b.action, b.review])];
    const cell = (s: string) => '"' + (/^[=+@\-]/.test(s) ? "'" : '') + s.replace(/"/g, '""') + '"';
    const url = URL.createObjectURL(new Blob(['\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'dotmiracle-editorial-briefs.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  return <div className="mt-4"><div className="flex flex-wrap items-end justify-between gap-3"><label className="text-xs font-semibold">Plan by market<select value={market} onChange={e => setMarket(e.target.value)} className="ml-2 rounded-md border border-[#c9d2bd] bg-[#fffefa] p-2 text-sm"><option>All markets</option>{markets.map(m => <option key={m}>{m}</option>)}</select></label><button className="text-button" onClick={download}>Download briefs <Download size={14}/></button></div><p className="result-count mt-3" aria-live="polite">{visible.length} proposed {visible.length === 1 ? 'brief' : 'briefs'}</p>
    <div className="search-table-scroll !mt-2" tabIndex={0} role="region" aria-label="Editorial keyword and internal-link plan"><table><thead><tr><th scope="col">Audience &amp; intent</th><th scope="col">Primary page &amp; editorial brief</th></tr></thead><tbody>{visible.map(b => <tr key={b.page}><td className="w-[33%]"><strong>{b.market}</strong><br/>{b.intent}<br/><small>{b.window}</small></td><td><strong>{b.query}</strong><div className="my-1 flex items-baseline gap-1"><ArrowRight size={12} className="shrink-0"/>{link(b.page)}</div><details className="mt-2"><summary className="cursor-pointer font-medium">Read the brief</summary><dl className="mt-2 grid gap-2"><div><dt className="font-semibold">Responsible owner</dt><dd>{b.owner}</dd></div><div><dt className="font-semibold">Evidence to collect</dt><dd>{b.evidence}</dd></div><div><dt className="font-semibold">Supporting links</dt><dd className="flex flex-wrap gap-x-3 gap-y-1">{b.links.map(url => <span key={url}>{link(url)}</span>)}</dd></div><div><dt className="font-semibold">Conversion goal</dt><dd>{b.action}</dd></div><div><dt className="font-semibold">Review decision</dt><dd>{b.review}</dd></div></dl></details></td></tr>)}</tbody></table></div></div>;
}
