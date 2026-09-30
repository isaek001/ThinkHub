import { memo } from 'react';

/**
 * Surface used by the public site cards and every admin panel.
 * `as` lets it become a semantic element when needed.
 */
function Card({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

export default memo(Card);
