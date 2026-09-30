import { memo } from 'react';
import { Loader2 } from 'lucide-react';

function Spinner({ size = 18, label, className = '' }) {
  return (
    <>
      <Loader2 size={size} className={`spin ${className}`.trim()} aria-hidden="true" />
      {label ? <span className="sr">{label}</span> : null}
    </>
  );
}

export default memo(Spinner);
