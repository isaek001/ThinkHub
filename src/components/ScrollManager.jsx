import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll position on route change and honours #hash links, so deep
 * links such as /#programs land on the right section.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
}
