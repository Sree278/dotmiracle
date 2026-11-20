import { renderToString } from 'react-dom/server';
import CanopyStudio from '../src/components/CanopyStudio';
import type { LibraryItem } from '../src/lib/studio';
export function renderSite(items: LibraryItem[], path = '/') { return renderToString(<CanopyStudio initialItems={items} initialPath={path}/>); }
