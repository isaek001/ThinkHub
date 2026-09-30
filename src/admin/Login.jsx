import { memo, useState } from 'react';
import { Lock, TriangleAlert } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import { api } from '../lib/api';

function Login({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await api('admin/login', { method: 'POST', body: { password } });
      setPassword('');
      onSuccess(token);
    } catch (err) {
      setError(err.message || 'Cannot reach server');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div id="login">
      <h1>
        <Lock size={22} aria-hidden="true" /> ThinkHub Admin
      </h1>
      <form onSubmit={submit}>
        <label className="sr" htmlFor="pw">
          Admin password
        </label>
        <input
          id="pw"
          type="password"
          placeholder="Admin password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="msg" role="alert" aria-live="assertive">
          {error ? <TriangleAlert size={14} aria-hidden="true" /> : null}
          {error}
        </p>
        <Button variant="add" type="submit" loading={busy}>
          {busy ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}

export default memo(Login);
