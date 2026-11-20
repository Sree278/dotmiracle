import type { ReactNode, MouseEvent } from 'react';
import type { Panel } from '../lib/studio';
import { publicPath } from '../../shared/search-pages.js';
export default function PanelLink({ panel, open, className, children, label }: { panel: Panel; open: (panel: Panel) => void; className: string; children: ReactNode; label?: string }) {
  if ((panel.view === 'service' || panel.view === 'note') && panel.slug) {
    return <a className={className} href={publicPath({ kind: panel.view, slug: panel.slug })!} aria-label={label}>{children}</a>;
  }
  const parameters = new URLSearchParams({ view: panel.view });
  if (panel.slug) parameters.set('item', panel.slug);
  if (panel.service) parameters.set('interest', panel.service);
  function navigate(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    e.preventDefault(); open(panel);
  }
  return <a className={className} href={`/?${parameters}`} aria-label={label} onClick={navigate}>{children}</a>;
}
