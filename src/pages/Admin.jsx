import { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiError, api } from '../lib/api';
import { getToken, setToken } from '../lib/session';
import { useNoIndex } from '../lib/useDocumentMeta.js';
import { SECTION_META, SITE_HELP } from '../lib/content';
import { useContent } from '../content/ContentContext.jsx';
import Login from '../admin/Login.jsx';
import AdminHeader from '../admin/AdminHeader.jsx';
import AdminTabs from '../admin/AdminTabs.jsx';
import AdminPanel from '../admin/AdminPanel.jsx';
import Toast from '../components/ui/Toast.jsx';

const LIST_SECTIONS = Object.keys(SECTION_META);
const EDITABLE = ['site', ...LIST_SECTIONS];

const TABS = [
  { key: 'site', label: 'Site details' },
  ...LIST_SECTIONS.map((key) => ({ key, ...SECTION_META[key] })),
  { key: 'messages', label: 'Messages' },
];

const snapshot = (draft) => (draft ? JSON.stringify(EDITABLE.map((k) => draft[k] ?? null)) : null);

export default function Admin() {
  useNoIndex();
  const { reload: reloadPublic } = useContent();

  const [auth, setAuth] = useState(() => getToken());
  const [draft, setDraft] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [messages, setMessages] = useState([]);
  const [siteFields, setSiteFields] = useState([]);
  const [tab, setTab] = useState('site');
  const [loading, setLoading] = useState(() => Boolean(getToken()));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const signOut = useCallback(() => {
    setToken('');
    setAuth('');
    setDraft(null);
    setBaseline(null);
    setMessages([]);
  }, []);

  const load = useCallback(
    async (token) => {
      setLoading(true);
      setError('');
      try {
        const data = await api('admin/content', { token });
        const next = Object.fromEntries(EDITABLE.map((k) => [k, data[k]]));
        setDraft(next);
        setBaseline(snapshot(next));
        setMessages(data.messages || []);
        setSiteFields(data.siteFields || []);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) return signOut();
        setError(err.message || 'Could not load content');
      } finally {
        setLoading(false);
      }
    },
    [signOut],
  );

  useEffect(() => {
    if (auth) load(auth);
  }, [auth, load]);

  const dirty = useMemo(() => draft !== null && baseline !== null && snapshot(draft) !== baseline, [draft, baseline]);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return undefined;
    const onBeforeUnload = (e) => e.preventDefault();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  const notify = useCallback((text, tone = 'ok') => setToast({ text, tone }), []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await api('admin/content', { method: 'PUT', body: Object.fromEntries(EDITABLE.map((k) => [k, draft[k]])), token: auth });
      setBaseline(snapshot(draft));
      notify('Saved. Your site is updated.');
      reloadPublic();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return signOut();
      notify(err.message || 'Save failed', 'err');
    } finally {
      setSaving(false);
    }
  }, [auth, draft, notify, reloadPublic, signOut]);

  const setSiteField = useCallback((key, value) => {
    setDraft((d) => ({ ...d, site: { ...d.site, [key]: value } }));
  }, []);

  const setList = useCallback((key, value) => {
    setDraft((d) => ({ ...d, [key]: value }));
  }, []);

  const onMessageDeleted = useCallback((id) => {
    setMessages((list) => list.filter((m) => m.id !== id));
  }, []);

  const discard = useCallback(() => {
    if (baseline) setDraft(JSON.parse(baseline));
  }, [baseline]);

  if (!auth) {
    return <Login onSuccess={(token) => { setToken(token); setAuth(token); }} />;
  }

  return (
    <div id="ui">
      <AdminHeader
        dirty={dirty}
        saving={saving}
        showSave={tab !== 'messages'}
        onSave={save}
        onDiscard={discard}
        onSignOut={signOut}
      />
      <AdminTabs tabs={TABS} active={tab} messageCount={messages.length} onChange={setTab} />

      <main>
        {tab === 'site' && !loading && !error && <p className="note">{SITE_HELP}</p>}
        <AdminPanel
          tab={tab}
          loading={loading}
          error={error}
          draft={draft}
          siteFields={siteFields}
          messages={messages}
          token={auth}
          setSiteField={setSiteField}
          setList={setList}
          onMessageDeleted={onMessageDeleted}
        />
      </main>

      <Toast message={toast?.text} tone={toast?.tone} onDismiss={() => setToast(null)} />
    </div>
  );
}
