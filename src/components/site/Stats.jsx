import { memo, useLayoutEffect, useRef } from 'react';
import Reveal from '../ui/Reveal.jsx';

const NUMERIC = /^([^0-9+-]*)(\d+(?:\.\d+)?)(.*)$/;

const parse = (value) => {
  const match = NUMERIC.exec(String(value ?? '').trim());
  if (!match) return null;
  return {
    prefix: match[1],
    num: Number(match[2]),
    suffix: match[3],
    digits: match[2].replace('.', '').length,
  };
};

const prefersStill = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts a stat up from zero the first time it becomes visible. Non-numeric
 * values are rendered untouched, and reduced-motion users see the final number
 * immediately.
 */
function Count({ value }) {
  const ref = useRef(null);
  const parsed = parse(value);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !parse(value) || prefersStill() || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const target = parse(value).num;
    el.textContent = '0';

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1100;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  if (!parsed) return <b>{value}</b>;

  return (
    <b>
      {parsed.prefix}
      <span ref={ref} className="count" style={{ minWidth: `${parsed.digits}ch` }}>
        {String(parsed.num)}
      </span>
      {parsed.suffix}
    </b>
  );
}

function Stats({ stats }) {
  if (!stats?.length) return null;

  return (
    <div className="w">
      <Reveal as="dl" className="stats">
        {stats.map((s, i) => (
          <div className="stat" key={`${s.label}-${i}`}>
            <dt>
              <span>{s.label}</span>
            </dt>
            <dd>
              <Count value={s.value} />
            </dd>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

export default memo(Stats);
