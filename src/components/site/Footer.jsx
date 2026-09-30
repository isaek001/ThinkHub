import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { activeSocials } from '../../lib/content';

function Footer({ site }) {
  const socials = activeSocials(site);

  return (
    <footer className="site-footer">
      <div className="w footer">
        <div className="footer-col">
          <span className="logo">
            <img src="/logo.png" alt={site.name || 'Think Hub'} width="1202" height="702" />
          </span>
          <p>{site.tagline}</p>
        </div>

        {socials.length > 0 && (
          <nav className="socials" aria-label="Social links">
            {socials.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            ))}
          </nav>
        )}

        <div className="footer-note">
          <span>
            © {new Date().getFullYear()} {site.name}
            {site.address ? ` · ${site.address}` : ''}
          </span>
          <span>
            Photography via{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
