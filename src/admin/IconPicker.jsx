import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search, Shapes } from 'lucide-react';
import { SPACE_ICON_GROUPS, resolveIcon } from '../lib/icons';

export default function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef(null);
  const Current = resolveIcon(value);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SPACE_ICON_GROUPS;
    return SPACE_ICON_GROUPS.map((g) => ({ ...g, names: g.names.filter((n) => n.toLowerCase().includes(q)) })).filter(
      (g) => g.names.length > 0,
    );
  }, [query]);

  return (
    <div className="field" ref={wrapRef}>
      <label>Icon</label>
      <button type="button" className="icon-trigger" aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen((v) => !v)}>
        {Current ? <Current size={20} /> : <Shapes size={20} />}
        <span>{value || 'Choose an icon'}</span>
        <ChevronDown size={16} className="chev" />
      </button>

      {open && (
        <div className="icon-panel" role="dialog" aria-label="Choose an icon">
          <div className="icon-search">
            <Search size={15} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search icons" aria-label="Search icons" />
          </div>
          <div className="icon-scroll">
            {groups.length === 0 && <p className="icon-empty">No icons match “{query}”.</p>}
            {groups.map((g) => (
              <div key={g.label}>
                <h4>{g.label}</h4>
                <div className="icon-grid">
                  {g.names.map((name) => {
                    const Icon = resolveIcon(name);
                    if (!Icon) return null;
                    const selected = name === value;
                    return (
                      <button
                        type="button"
                        key={name}
                        className={selected ? 'icon-cell on' : 'icon-cell'}
                        title={name}
                        onClick={() => {
                          onChange(name);
                          setOpen(false);
                          setQuery('');
                        }}
                      >
                        <Icon size={19} />
                        {selected && <Check size={11} className="tick" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
