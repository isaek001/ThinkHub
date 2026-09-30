import { memo } from 'react';

function EmptyState({ icon: Icon, children }) {
  return (
    <p className="empty-state">
      {Icon ? <Icon size={22} aria-hidden="true" /> : null}
      {children}
    </p>
  );
}

export default memo(EmptyState);
