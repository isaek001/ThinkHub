import { Fragment, memo } from 'react';
import Reveal from '../ui/Reveal.jsx';
import { IMG } from '../../lib/images.js';

const ASIDE = ['Coworking', 'Recording studio', 'Art gallery', 'Workshops', 'Mentorship'];

const toWords = (text) => String(text || '').trim().split(/\s+/).filter(Boolean);

function Hero({ site }) {
  const words = toWords(site.heroTitle);

  return (
    <header className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal as="p" className="eyebrow" variant="fade" delay={40}>
            {site.tagline || 'Create. Collaborate. Chill.'}
          </Reveal>

          <Reveal as="h1" className="hero-title" variant="words">
            {words.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <span className="wm">
                  <span className="wi" style={{ '--d': `${160 + i * 55}ms` }}>
                    {word}
                  </span>
                </span>
                {i < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </Reveal>

          {site.heroText ? (
            <Reveal as="p" className="hero-sub" variant="fade" delay={140}>
              {site.heroText}
            </Reveal>
          ) : null}

          <Reveal className="hero-cta" delay={220}>
            <a className="btn" href="#programs">
              See our programs
            </a>
            <a className="btn ghost" href="#contact">
              Get in touch
            </a>
          </Reveal>

          <Reveal as="ul" className="hero-aside" variant="fade" delay={300}>
            {ASIDE.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </Reveal>
        </div>

        <Reveal as="figure" className="hero-media" variant="media" delay={120}>
          <img
            src={IMG.hero}
            alt="A glass-walled studio room inside Think Hub"
            width="2000"
            height="1333"
            fetchPriority="high"
          />
          <figcaption>Jos, Plateau State</figcaption>
        </Reveal>
      </div>
    </header>
  );
}

export default memo(Hero);
