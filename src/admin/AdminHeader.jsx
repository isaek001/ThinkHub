import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Eye, LogOut, RotateCcw, Save } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const AdminHeader = memo(function AdminHeader({ dirty, saving, showSave, onSave, onDiscard, onSignOut }) {
  return (
    <header>
      <h1>ThinkHub Admin</h1>
      <div className="hb">
        <Link className="gh" to="/" target="_blank">
          <Eye size={16} aria-hidden="true" /> View site
        </Link>
        <Button variant="header" icon={LogOut} onClick={onSignOut}>
          Sign out
        </Button>
        {showSave && (
          <>
            {dirty && (
              <Button variant="header" icon={RotateCcw} onClick={onDiscard} title="Discard unsaved changes">
                Discard
              </Button>
            )}
            <Button variant="inverse" icon={Save} loading={saving} disabled={!dirty} onClick={onSave}>
              {saving ? 'Saving...' : 'Save changes'}
            </Button>
          </>
        )}
      </div>
    </header>
  );
});

export default AdminHeader;
