import { memo } from 'react';
import { LONG_FIELDS, fieldLabel } from '../../lib/content';

/** Labelled input, switched to a textarea for long-form fields. */
function Field({ field, value, onChange, id }) {
  const long = LONG_FIELDS.has(field);
  const common = { id, value: value ?? '', onChange: (e) => onChange(e.target.value) };

  return (
    <div className="field">
      <label htmlFor={id}>{fieldLabel(field)}</label>
      {long ? <textarea {...common} rows={3} /> : <input {...common} type="text" />}
    </div>
  );
}

export default memo(Field);
