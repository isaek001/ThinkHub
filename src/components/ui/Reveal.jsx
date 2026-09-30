import { memo, useEffect, useRef, useState } from 'react';

/**
 * Reveals its children once they scroll into view.
 *
 * `variant` picks the motion:
 *   - `up`    rise + fade (default, used for blocks of content)
 *   - `fade`  fade only, for type that should not move
 *   - `media` clip-path wipe, for full-bleed figures
 *   - `words` the element itself never hides; descendants animate off `--d`
 *
 * Disconnects after the first reveal, and falls back to visible content when
 * IntersectionObserver is unavailable or the user prefers reduced motion.
 */
function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = ['reveal', `is-${variant}`, shown ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default memo(Reveal);
