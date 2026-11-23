import { ClipboardCheck, FileText, Globe2, MapPin, ScanSearch, ShoppingBag } from 'lucide-react';

/** The DotMiracle mark: an outlined D, a solid inner D and the lime dot. */
export function DotMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 42 42" fill="none" aria-hidden="true">
    <path d="M9 8h12.5a13 13 0 1 1 0 26H9V8Z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M15 14h6.5a7 7 0 1 1 0 14H15V14Z" fill="currentColor"/>
    <circle cx="31.5" cy="10.5" r="4.5" fill="#2449ef" stroke="#171a1c" strokeWidth="1.4"/>
  </svg>;
}

export function Wordmark() {
  return <span className="wordmark dm-wordmark"><DotMark className="brand-mark"/><span className="brand-type"><span className="brand-name">dotmiracle<i aria-hidden="true"/></span><span className="brand-subtitle">SEO STUDIO</span></span></span>;
}

export function ServiceArt({ kind, className = '' }: { kind: string; className?: string }) {
  const icon = { local: MapPin, technical: ScanSearch, content: FileText, global: Globe2, commerce: ShoppingBag, audit: ClipboardCheck }[kind] || ScanSearch;
  const Icon = icon;
  return <Icon className={`service-art ${className}`} aria-hidden="true" strokeWidth={1.4}/>;
}

export function BotanicalDetail() {
  return <svg className="botanical-detail" viewBox="0 0 240 260" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.05" strokeLinecap="round">
    <path d="M32 259C62 176 108 89 192 12M58 196c-32-36-33-67-28-92 33 20 49 45 42 67M82 151c-18-34-13-62-4-79 20 23 29 44 21 56M116 101c-14-29-5-54 8-73 12 27 17 43 6 57M153 57c-3-22 12-44 34-55 0 26-10 39-24 49"/>
    <path d="M47 222c20-45 71-58 108-54-25 41-65 53-108 54Zm31-62c20-39 57-52 95-52-14 30-52 50-95 52Zm29-48c21-37 56-47 90-45-24 33-54 42-90 45Zm40-52c17-29 47-33 74-34-14 22-44 36-74 34Z"/>
    <path d="m56 211 88-38m-58-21 76-39m-49-8 74-33m-34-18 55-24M62 183 34 119m51 23-6-56m37 11 9-58m29 15 28-45"/>
    <path d="m65 207 11-20m6 12 11-21m7 14 9-19m-23 25 20 4m-40 4 17 5m14-15 29-3m-27-52 5-16m6 10 8-15m-27 24 19 2m2-12 15 1m-63 9-13-8m12 3 1-15m53-33 15 2m-10-7 5-13" strokeWidth=".65"/>
  </g></svg>;
}
