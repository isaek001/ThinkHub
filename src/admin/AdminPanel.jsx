import { memo } from 'react';
import { TriangleAlert } from 'lucide-react';
import Spinner from '../components/ui/Spinner.jsx';
import SiteEditor from './SiteEditor.jsx';
import ListEditor from './ListEditor.jsx';
import Messages from './Messages.jsx';
import { SECTION_META } from '../lib/content';

/**
 * Renders exactly one panel for the active tab, so switching tabs does not
 * re-render the rest of the admin shell.
 */
const AdminPanel = memo(function AdminPanel({
  tab, loading, error, draft, siteFields, messages, token,
  setSiteField, setList, onMessageDeleted,
}) {
  if (loading) {
    return (
      <p className="note">
        <Spinner size={16} /> Loading content…
      </p>
    );
  }

  if (error) {
    return (
      <p className="note error">
        <TriangleAlert size={16} aria-hidden="true" /> {error}
      </p>
    );
  }

  if (!draft) return null;

  if (tab === 'site') {
    return <SiteEditor siteFields={siteFields} site={draft.site} onChange={setSiteField} />;
  }

  if (tab === 'messages') {
    return <Messages messages={messages} token={token} onDeleted={onMessageDeleted} />;
  }

  const meta = SECTION_META[tab];
  if (!meta) return null;

  return (
    <>
      <p className="note">{meta.help}</p>
      <ListEditor section={tab} fields={meta.fields} items={draft[tab] || []} onChange={(next) => setList(tab, next)} />
    </>
  );
});

export default AdminPanel;
