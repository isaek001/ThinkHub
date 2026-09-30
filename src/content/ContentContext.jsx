import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { api } from '../lib/api.js';
// Bundled into the build so the public site renders with no network call at all.
// server.js still overlays live edits by injecting window.__THINKHUB__ into
// index.html, so a Node host shows saved content without a rebuild; static hosts
// fall back to this copy.
import bundled from '../../data/content.json';

const EMPTY = { site: {}, stats: [], pillars: [], spaces: [], programs: [], team: [] };

const ContentContext = createContext(null);

/** Data inlined by server.js, or null in the Vite dev server. */
const bootstrap = () => (typeof window !== 'undefined' && window.__THINKHUB__) || null;

/** Real copy on hand, so a refresh that fails never blanks the page. */
const hasContent = (c) => Boolean(c?.site?.name || c?.stats?.length || c?.spaces?.length);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    const data = bootstrap() || bundled || null;
    return { ...EMPTY, ...(data || {}), loading: !data, error: null };
  });

  // Deliberately no fetch on mount: the public site paints straight from the
  // copy above. Only the admin panel calls this, right after saving.
  const reload = useCallback(async () => {
    try {
      const data = await api('content');
      if (hasContent(data)) setContent({ ...EMPTY, ...data, loading: false, error: null });
    } catch {
      /* No API on this host — the copy already on screen stays put. */
    }
  }, []);

  const value = useMemo(() => ({ ...content, reload }), [content, reload]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}
