import { useEffect } from 'react';

function upsertMeta(selector, attr, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps the document head in sync with the live content. The server already
 * writes these tags for crawlers; this makes client-side navigation consistent.
 */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      upsertMeta('meta[property="og:title"]', 'property', title);
    }
    if (description) {
      upsertMeta('meta[name="description"]', 'name', description);
      upsertMeta('meta[property="og:description"]', 'property', description);
    }
  }, [title, description]);
}

/** Keeps the admin portal out of search indexes. */
export function useNoIndex() {
  useEffect(() => {
    let el = document.head.querySelector('meta[name="robots"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex, nofollow');
  }, []);
}
