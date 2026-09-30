import { memo } from 'react';

/**
 * Responsive grid of cards. Renders nothing when there is nothing to show, so
 * sections do not need their own empty check.
 */
function CardGrid({ items, renderItem, className = '' }) {
  if (!items?.length) return null;
  return <div className={`grid ${className}`.trim()}>{items.map(renderItem)}</div>;
}

export default memo(CardGrid);
