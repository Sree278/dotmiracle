import { useId } from 'react';

/** The DotMiracle mark: an outlined D, a solid inner D and the lime dot. */
export function DotMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 42 42" fill="none" aria-hidden="true">
    <path d="M9 8h12.5a13 13 0 1 1 0 26H9V8Z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M15 14h6.5a7 7 0 1 1 0 14H15V14Z" fill="currentColor"/>
    <circle cx="31.5" cy="10.5" r="4.5" fill="#d8f66a" stroke="#17221f" strokeWidth="1.4"/>
  </svg>;
}

export function Wordmark() {
  return <span className="wordmark dm-wordmark"><DotMark className="brand-mark"/><span className="brand-type"><span className="brand-name">dotmiracle<i aria-hidden="true"/></span><span className="brand-subtitle">SEO STUDIO</span></span></span>;
}

export function ServiceArt({ kind, className = '' }: { kind: string; className?: string }) {
  const id = useId().replace(/:/g, '');
  const hatch = `url(#h${id})`;
  return <svg viewBox="0 0 100 88" fill="none" className={`service-art ${className}`} aria-hidden="true">
    <defs><pattern id={`h${id}`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(27)"><path d="M0 0v4" stroke="currentColor" strokeWidth=".7" opacity=".5"/></pattern></defs>
    <g stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      {kind === 'local' ? <>
        <path d="m8 52 24-9 25 10 28-10 7 27-30 11-28-9-24 8Z" fill="var(--art-paper, #f4f5e9)"/>
        <path d="m32 43 2 29 28 9-5-28Z" fill={hatch}/><path d="m13 59 11-5 9 4 12-2 10 8 17-4 15-2M14 70l12-7 8 2 9 4m25 2 13-5M23 48l2 14m48-13 5 9M59 60l2 13" strokeWidth="1"/>
        <path d="M27 25c0-13 9-21 21-21s20 10 20 21c0 15-17 31-21 36-5-6-20-22-20-36Z" fill="var(--art-paper, #f4f5e9)"/>
        <path d="M43 7c-8 3-12 9-12 18 0 12 11 25 15 31-8-9-17-20-17-30 0-9 4-15 14-19Z" fill={hatch} strokeWidth=".6"/>
        <ellipse cx="47" cy="24" rx="8.5" ry="9"/><path d="M51 17c-8-2-13 5-9 12" strokeWidth=".8"/>
        <path d="m16 22 3-2m-1 9 4-1M71 10l4-4m-3 11 4-1M5 83l17-6m45 7 24-8" strokeWidth="1"/>
      </> : kind === 'technical' ? <>
        <path d="m9 17 61-5 3 47-61 6Z" fill="var(--art-paper, #faf4e7)"/>
        <path d="m9 17 61-5 .8 8-61 6Z" fill={hatch}/><path d="m13 19 .4 2m4-2.3.3 1.8m4-2.2.2 1.8M15 30l29-2M16 34l21-2" strokeWidth="1"/>
        <path d="m28 39-7 6 8 5m12-12 7 5-7 7m-6-12-3 15"/>
        <path d="m12 66 4 3 41-4m-40-2 1-4" strokeWidth="1"/>
        <circle cx="66" cy="50" r="17.5" fill="var(--art-paper, #faf4e7)"/><circle cx="66" cy="50" r="13.5"/>
        <path d="M55 52c-2-8 5-14 12-13m-10 17 4-4m-3 6 6-6" strokeWidth=".9"/>
        <path d="m77 63 5 5-4 4-5-6m7 1 13 12c3 3-1 7-4 5L76 71Z" fill={hatch}/>
        <path d="m77 12 4-4m-3 12 7-2M8 75l24-2m-17 6 22-2" strokeWidth="1"/>
      </> : kind === 'content' ? <>
        <path d="m16 23 40-6 9 56-41 7Z" fill={hatch}/><path d="m20 18 40-6 9 56-41 7Z" fill="var(--art-paper, #faf0e7)"/>
        <path d="m26 25 28-4m-27 10 22-4m-22 11 24-4m-23 10 18-3m-17 10 17-3m-16 10 13-2" strokeWidth="1.1"/>
        <path d="M46 58C42 41 56 17 85 5c-1 22-17 45-36 51Z" fill="var(--art-paper, #faf0e7)"/>
        <path d="M40 72C48 57 61 32 82 9M46 56l14-9 12-5M51 45l-1-10m5 3 1-12m1 13 13-7m-7-3 12-6M68 22l1-7"/>
        <path d="M60 19c-7 8-12 19-13 29m17-27c-6 7-11 16-13 22M31 81l39-7m-30 10 18-4" strokeWidth=".8"/>
      </> : kind === 'global' ? <>
        <g transform="rotate(-19 48 36)"><circle cx="48" cy="36" r="26" fill="var(--art-paper, #eef3f1)"/><ellipse cx="48" cy="36" rx="13" ry="26"/><path d="M22 36h52M26 22c12 9 32 9 44 0M26 50c13-9 31-9 44 0M48 10v52" strokeWidth="1.1"/>
        <path d="m35 16 8 1-2 7-5 3 2 5-5 2-5-6m12 9 8-2 7 7-4 11-4 6-4-8-6-6Zm14-20 7 3-2 6 7 4-5 6-9-3-3-7Z" fill={hatch} strokeWidth="1.15"/></g>
        <path d="M32 7 29 3M65 61l4 5m-1-54c18 13 17 34 5 48-9 10-21 14-35 11l-1-4c12 3 25-1 33-10 11-14 11-30-5-42Z" fill={hatch}/>
        <path d="m48 71-1 7-13 3 1 3 36-1 .5-3-15-3-2-7M33 84l40-1M14 20l3-4m-7 13 4-2M84 50l4-2"/><path d="M21 87h57m-48-4 7-2" strokeWidth=".8"/>
      </> : kind === 'commerce' ? <>
        <path d="m15 32 62-3-4 42-55 5Z" fill="var(--art-paper, #f2f1e7)"/><path d="m11 29 9-17 51-3 11 18-2 8c-5 4-11 3-14-3-3 7-10 8-15 2-3 7-10 8-15 1-5 7-12 6-15 1-5 5-10 2-10-7Z" fill={hatch}/><path d="m30 12-8 21m20-22-5 21m16-22v21m11-20 3 18M24 46l20-2 1 18-20 2Zm29-4 13-1-1 29-13 1Z"/><path d="m12 78 67-6m-60 9 46-5m-29-36 4-5m-10 11 8-11" strokeWidth="1"/>
      </> : <>
        <path d="m15 13 54-5 7 64-56 6Z" fill="var(--art-paper, #f4eee6)"/><path d="m23 20 35-4m-34 11 21-2m-18 38 39-4M28 59l-1-17m10 17-2-25m11 24-2-19m12 17-3-29"/><path d="m23 48 13-12 10 5 17-22m-10 2 10-2-1 10"/>
        <path d="m63 60 9-4 14 23-8 5Z" fill={hatch}/><path d="m63 60-2-12 11 8m-11-8 2 7 4-2M22 82l39-4"/></>}
    </g>
  </svg>;
}

export function BotanicalDetail() {
  return <svg className="botanical-detail" viewBox="0 0 240 260" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.05" strokeLinecap="round">
    <path d="M32 259C62 176 108 89 192 12M58 196c-32-36-33-67-28-92 33 20 49 45 42 67M82 151c-18-34-13-62-4-79 20 23 29 44 21 56M116 101c-14-29-5-54 8-73 12 27 17 43 6 57M153 57c-3-22 12-44 34-55 0 26-10 39-24 49"/>
    <path d="M47 222c20-45 71-58 108-54-25 41-65 53-108 54Zm31-62c20-39 57-52 95-52-14 30-52 50-95 52Zm29-48c21-37 56-47 90-45-24 33-54 42-90 45Zm40-52c17-29 47-33 74-34-14 22-44 36-74 34Z"/>
    <path d="m56 211 88-38m-58-21 76-39m-49-8 74-33m-34-18 55-24M62 183 34 119m51 23-6-56m37 11 9-58m29 15 28-45"/>
    <path d="m65 207 11-20m6 12 11-21m7 14 9-19m-23 25 20 4m-40 4 17 5m14-15 29-3m-27-52 5-16m6 10 8-15m-27 24 19 2m2-12 15 1m-63 9-13-8m12 3 1-15m53-33 15 2m-10-7 5-13" strokeWidth=".65"/>
  </g></svg>;
}
