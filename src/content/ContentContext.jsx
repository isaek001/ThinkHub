import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

const EMPTY = { site: {}, stats: [], pillars: [], spaces: [], programs: [], team: [] };

const ContentContext = createContext(null);

/** Data inlined by server.js, or null in the Vite dev server. */
const bootstrap = () => (typeof window !== 'undefined' && window.__THINKHUB__) || null;

export function ContentProvider({ children }) {
  const initial = useMemo(() => {
    const b = bootstrap();
    if (b) return { ...EMPTY, ...b, loading: false, error: null };
    return { ...EMPTY, loading: true, error: null };
  }, []);

  const [content, setContent] = useState(initial);

  const reload = useCallback(async () => {
    setContent((c) => ({ ...c, loading: true, error: null }));
    try {
      const data = await api('content');
      setContent({ ...EMPTY, ...data, loading: false, error: null });
    } catch (err) {
      setContent((c) => ({ ...c, loading: false, error: err.message }));
    }
  }, []);

  useEffect(() => {
    if (initial.loading) reload();
  }, [initial.loading, reload]);

  const value = useMemo(() => ({ ...content, reload }), [content, reload]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}
