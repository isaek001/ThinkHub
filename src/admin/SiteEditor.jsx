import { memo } from 'react';
import Card from '../components/ui/Card.jsx';
import Field from '../components/ui/Field.jsx';

/** Editor for the flat `site` object. */
function SiteEditor({ siteFields, site, onChange }) {
  return (
    <Card>
      {siteFields.map((f) => (
        <Field key={f} id={`site-${f}`} field={f} value={site?.[f]} onChange={(v) => onChange(f, v)} />
      ))}
    </Card>
  );
}

export default memo(SiteEditor);
