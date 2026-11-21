import CanopyStudio from './components/CanopyStudio'
import { marketForRoute, normalisePath } from '../shared/search-pages.js'
import './styles/option-b.css'
import './styles/dotmiracle-brand.css'
import './styles/dotmiracle-fixes.css'

function App() {
  const path = normalisePath(window.location.pathname)
  // Cloudflare redirects these aliases (static/_redirects); a local preview shows the same canonical page.
  const aliases: Record<string, string> = { '/locations/trivandrum/': '/locations/thiruvananthapuram/', '/locations/kozhikode/': '/locations/calicut/', '/services/seo-audit/': '/services/seo-audits/', '/industries/hotels-resorts/': '/industries/homestays-resorts/' }
  const canonicalPath = aliases[path] || path
  const selected = canonicalPath === '/contact/' ? new URLSearchParams(window.location.search).get('market') : null
  const enquiryMarket = selected && ['Kerala', 'Across India', 'International'].includes(selected) ? selected : marketForRoute(canonicalPath)
  return <>{canonicalPath === '/' && <link rel="preload" as="image" type="image/webp" href="/images/kerala-gilt.webp" imageSrcSet="/images/kerala-gilt-750.webp 750w, /images/kerala-gilt.webp 1440w" imageSizes="(max-width: 800px) 92vw, 42vw" fetchPriority="high"/>}<CanopyStudio initialPath={canonicalPath} enquiryMarket={enquiryMarket} /></>
}

export default App
