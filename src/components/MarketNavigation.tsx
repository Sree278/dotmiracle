import { ArrowUpRight, Globe2, MapPin, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { LibraryItem } from '../lib/studio';
import { publicPath } from '../../shared/search-pages.js';

function MarketLink({ item, label, icon: Icon }: { item?: LibraryItem; label: string; icon: LucideIcon }) {
  const href = item && publicPath(item);
  if (!href) return null;
  return <a href={href} className="flex min-h-11 min-w-0 flex-col items-start gap-1.5 rounded-sm px-1 py-1 text-[12px] font-medium leading-snug text-[#41523c] hover:text-[#965435] sm:flex-row sm:items-center sm:gap-2 md:justify-center md:gap-3 md:border-l md:border-[#ced6c3] md:px-4 md:text-[13px]"><Icon size={18} strokeWidth={1.4} aria-hidden="true" className="shrink-0"/><span>{label}</span><ArrowUpRight size={13} aria-hidden="true" className="hidden shrink-0 sm:block"/></a>;
}

/** Reuse published, canonical landing pages; no extra campaign URLs or duplicate pages. */
export default function MarketNavigation({ items }: { items: LibraryItem[] }) {
  const regional = items.find(i => i.kind === 'location' && i.slug === 'kerala');
  const national = items.find(i => i.kind === 'service' && i.slug === 'ecommerce-seo');
  const international = items.find(i => i.kind === 'service' && i.slug === 'international-seo');
  if (!regional && !national && !international) return null;
  return <nav className="values-strip" aria-label="Explore SEO by target market"><div className="shell grid items-center gap-x-2 py-2.5 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-x-4"><p className="eyebrow !mb-0 pt-1 md:pr-4 md:pt-0"><i/>EXPLORE BY MARKET</p><div className="grid grid-cols-3 gap-x-2 md:contents"><MarketLink item={regional} label="Local SEO in Kerala" icon={MapPin}/><MarketLink item={national} label="Ecommerce across India" icon={Store}/><MarketLink item={international} label="International SEO" icon={Globe2}/></div></div></nav>;
}
