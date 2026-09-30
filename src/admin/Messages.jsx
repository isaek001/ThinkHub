import { memo, useState } from 'react';
import { Inbox, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { api } from '../lib/api';

const stamp = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString();
};

const MessageCard = memo(function MessageCard({ message, busy, onDelete }) {
  return (
    <Card className="m">
      <small>
        {message.name} · {message.email} · {stamp(message.at)}
      </small>
      <p className="body">{message.message}</p>
      <div className="m-ops">
        <Button variant="danger" icon={Trash2} loading={busy} onClick={() => onDelete(message.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
});

function Messages({ messages, token, onDeleted }) {
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');

  async function remove(id) {
    if (!window.confirm('Delete this message? This cannot be undone.')) return;
    setBusyId(id);
    setError('');
    try {
      await api(`admin/messages/${id}`, { method: 'DELETE', token });
      onDeleted(id);
    } catch (err) {
      setError(err.message || 'Could not delete');
    } finally {
      setBusyId(null);
    }
  }

  if (messages.length === 0) {
    return <EmptyState icon={Inbox}>No messages yet.</EmptyState>;
  }

  return (
    <>
      {error ? <p className="note error">{error}</p> : null}
      {messages.map((m) => (
        <MessageCard key={m.id} message={m} busy={busyId === m.id} onDelete={remove} />
      ))}
    </>
  );
}

export default memo(Messages);
