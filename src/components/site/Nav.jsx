import { memo, useCallback, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  ['#about', 'About'],
  ['#spaces', 'Spaces'],
  ['#programs', 'Programs'],
  ['#team', 'Team'],
  ['#contact', 'Contact'],
];

const Logo = memo(function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Think Hub — home">
      <img src="/logo.png" alt="Think Hub" width="1202" height="702" />
    </a>
  );
});

function Nav({ name }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Logo />
        <button
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={toggle}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <ul id="site-menu" className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={close}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <span className="nav-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
    </nav>
  );
}

export default memo(Nav);
