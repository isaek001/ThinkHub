import { memo, useEffect, useState } from 'react';

/** Transient status message. Auto-dismisses after `duration` ms. */
function Toast({ message, tone = 'ok', duration = 2400, onDismiss }) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    setVisible(Boolean(message));
    if (!message) return undefined;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onDismiss]);

  if (!visible || !message) return null;
  return (
    <div className={`toast ${tone}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default memo(Toast);
