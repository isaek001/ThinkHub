import { memo, useCallback } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Field from '../components/ui/Field.jsx';
import IconPicker from './IconPicker.jsx';

/** One editable row: reorder / remove controls plus the item's fields. */
const ItemCard = memo(function ItemCard({ item, index, total, section, fields, onChange, onMove, onRemove }) {
  const display = item.title || item.name || item.label;

  return (
    <div className="card item">
      <div className="top">
        <b>
          #{index + 1}
          {display ? <em>{display}</em> : null}
        </b>
        <span className="ops">
          <Button variant="quiet" icon={ArrowUp} disabled={index === 0} title="Move up" aria-label={`Move item ${index + 1} up`} onClick={() => onMove(index, -1)} />
          <Button variant="quiet" icon={ArrowDown} disabled={index === total - 1} title="Move down" aria-label={`Move item ${index + 1} down`} onClick={() => onMove(index, 1)} />
          <Button variant="danger" icon={Trash2} title="Remove" aria-label={`Remove item ${index + 1}`} onClick={() => onRemove(index)} />
        </span>
      </div>

      {fields.map((f) =>
        f === 'icon' ? (
          <IconPicker key={f} value={item[f]} onChange={(v) => onChange(index, f, v)} />
        ) : (
          <Field key={f} id={`${section}-${index}-${f}`} field={f} value={item[f]} onChange={(v) => onChange(index, f, v)} />
        ),
      )}
    </div>
  );
});

function ListEditor({ section, items, fields, onChange }) {
  const update = useCallback(
    (i, key, value) => onChange(items.map((item, idx) => (idx === i ? { ...item, [key]: value } : item))),
    [items, onChange],
  );

  const move = useCallback(
    (i, delta) => {
      const target = i + delta;
      if (target < 0 || target >= items.length) return;
      const next = [...items];
      [next[i], next[target]] = [next[target], next[i]];
      onChange(next);
    },
    [items, onChange],
  );

  const remove = useCallback(
    (i) => {
      if (window.confirm('Remove this item? (Save to apply)')) onChange(items.filter((_, idx) => idx !== i));
    },
    [items, onChange],
  );

  const add = useCallback(() => onChange([...items, Object.fromEntries(fields.map((f) => [f, '']))]), [items, fields, onChange]);

  return (
    <>
      {items.map((item, i) => (
        <ItemCard
          key={i}
          item={item}
          index={i}
          total={items.length}
          section={section}
          fields={fields}
          onChange={update}
          onMove={move}
          onRemove={remove}
        />
      ))}
      <Button variant="add" className="add" icon={Plus} onClick={add}>
        Add item
      </Button>
    </>
  );
}

export default memo(ListEditor);
