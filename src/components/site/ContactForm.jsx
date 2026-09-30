import { memo, useState } from 'react';
import Button from '../ui/Button.jsx';
import { Send, Check, TriangleAlert } from 'lucide-react';
import { api } from '../../lib/api.js';

const EMPTY = { name: '', email: '', message: '', website: '' };

const STATUS_ICON = { ok: Check, error: TriangleAlert };

function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', text: 'Sending…' });
    try {
      await api('contact', { method: 'POST', body: form });
      setForm(EMPTY);
      setStatus({ state: 'ok', text: 'Thanks — we will get back to you shortly.' });
    } catch (err) {
      setStatus({ state: 'error', text: err.message || 'Something went wrong' });
    }
  }

  const StatusIcon = STATUS_ICON[status.state];

  return (
    <form id="cf" onSubmit={onSubmit} noValidate={false}>
      <div className="field-row">
        <div>
          <label htmlFor="cf-name">Your name</label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            value={form.name}
            onChange={set('name')}
          />
        </div>
        <div>
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            value={form.email}
            onChange={set('email')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message">How can we help?</label>
        <textarea
          id="cf-message"
          name="message"
          required
          maxLength={2000}
          value={form.message}
          onChange={set('message')}
        />
      </div>

      <input
        className="hp"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.website}
        onChange={set('website')}
      />

      <div>
        <Button variant="primary" className="btn" type="submit" loading={status.state === 'sending'} icon={Send}>
          {status.state === 'sending' ? 'Sending…' : 'Send message'}
        </Button>

        <p className={`form-msg ${status.state}`} role="status" aria-live="polite">
          {StatusIcon ? <StatusIcon size={15} aria-hidden="true" /> : null}
          {status.text}
        </p>
      </div>
    </form>
  );
}

export default memo(ContactForm);
