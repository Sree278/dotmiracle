export interface EditorialBrief {
  window: string; market: string; query: string; intent: string; page: string;
  owner: string; evidence: string; links: string[]; action: string; review: string;
}
export interface ContentSection {
  heading: string; body: string; kicker?: string; nav?: string;
  anchor?: string; profileDraft?: string;
  accent?: string; offerMode?: 'audit' | 'contact';
  faq?: { question: string; answer: string }[];
  search?: { title?: string; description?: string; auditFocus?: string };
  bullets?: string[]; columns?: string[]; rows?: string[][];
  links?: { label: string; href: string }[];
  directory?: 'service' | 'location' | 'industry';
  briefs?: EditorialBrief[];
}
export interface LibraryItem {
  id: number;
  kind: 'service' | 'note' | 'approach' | 'location' | 'industry' | 'plan' | 'proof' | 'case-study' | 'home' | 'hub' | 'testimonial' | 'studio';
  slug: string;
  title: string;
  summary: string;
  category: string;
  artwork: string;
  tone: string;
  sort_order: number;
  featured: boolean;
  case_origin?: 'client' | 'external';
  content: ContentSection[];
  deliverables: string[];
  read_time: number;
}
export type PanelView = 'services' | 'notes' | 'service' | 'note' | 'audit' | 'contact' | 'privacy' | 'testimonial';
export interface Panel { view: PanelView; slug?: string; service?: string }
export function panelFromURL(): Panel | null {
  if (typeof window === 'undefined') return null;
  const p = new URLSearchParams(window.location.search);
  const view = p.get('view');
  if (window.location.pathname !== '/' && (view === 'service' || view === 'note')) return null;
  if (!view || !['services', 'notes', 'service', 'note', 'audit', 'contact', 'privacy', 'testimonial'].includes(view)) return null;
  return { view: view as PanelView, slug: p.get('item') || undefined, service: p.get('interest') || undefined };
}
