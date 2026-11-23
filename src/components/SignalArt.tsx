import { ArrowUpRight, Crosshair, FileText, Globe2, MapPin, ScanSearch } from 'lucide-react';

/** An abstract service map, not a dashboard or a performance claim. */
export default function SignalArt() {
  return <div className="hero-bento" aria-hidden="true">
    <div className="bento-topline"><span>DOTMIRACLE / SEARCH STUDIO</span><span>CHENNAI · INDIA</span></div>
    <div className="bento-map"><div className="bento-map-copy"><span>THE WORK, CONNECTED</span><strong>Better search.<br/>Clearer next steps.</strong><span>STRATEGY / CONTENT / EXPERIENCE</span></div><div className="bento-crosshair"><div className="bento-ring outer"/><div className="bento-ring inner"/><Crosshair strokeWidth={1} size={42}/><span className="bento-signal-dot"/></div><ArrowUpRight className="bento-map-arrow" size={20}/></div>
    <div className="bento-tiles"><div><MapPin/><span>01 / LOCAL</span><strong>Local SEO</strong></div><div><ScanSearch/><span>02 / FOUNDATION</span><strong>Technical SEO</strong></div><div><FileText/><span>03 / CONTENT</span><strong>Content strategy</strong></div><div><Globe2/><span>04 / EXPANSION</span><strong>International SEO</strong></div></div>
    <div className="bento-bottomline"><span>FOUR CONNECTED CAPABILITIES</span><span>MADE FOR GROWING BUSINESSES ↗</span></div>
  </div>;
}
