import { memo } from 'react';

const AdminTabs = memo(function AdminTabs({ tabs, active, messageCount, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((t) => (
        <button
          type="button"
          role="tab"
          key={t.key}
          aria-selected={active === t.key}
          className={active === t.key ? 'on' : ''}
          onClick={() => onChange(t.key)}
        >
          {t.label}
          {t.key === 'messages' && messageCount > 0 ? ` (${messageCount})` : ''}
        </button>
      ))}
    </div>
  );
});

export default AdminTabs;
