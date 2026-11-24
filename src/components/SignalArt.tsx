import { ArrowUpRight } from 'lucide-react';
import type { LibraryItem } from '../lib/studio';
import { publicPath } from '../../shared/search-pages.js';

/** An editorial project cover, rather than a simulated screenshot or dashboard. */
export default function SignalArt({ project }: { project?: LibraryItem }) {
  if (!project) return null;
  return <a className="featured-project" href={publicPath(project)!} aria-label={`Read the ${project.title} case study`}>
    <div className="featured-project-top"><span>SELECTED CLIENT PROJECT</span><ArrowUpRight size={20} aria-hidden="true"/></div>
    <div className="featured-project-art" aria-hidden="true"><div className="project-art-line line-one"/><div className="project-art-line line-two"/><div className="project-art-line line-three"/><span className="project-art-cross">✳</span><span className="project-art-name">M<span>.</span></span><span className="project-art-caption">WEBSITE / SEARCH / ENQUIRY</span></div>
    <div className="featured-project-bottom"><div><span className="project-label">BENGALURU · MEP &amp; FIT-OUT</span><h2>Mindtech Solutions</h2><p>A website rebuild, a stronger search foundation and a clearer path to enquiry.</p></div><span className="project-link">Explore the project <ArrowUpRight size={16} aria-hidden="true"/></span></div>
  </a>;
}
