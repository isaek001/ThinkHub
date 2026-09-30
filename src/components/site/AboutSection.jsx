import { memo } from 'react';
import Section from './Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import PillarCard from './cards/PillarCard.jsx';
import { IMG } from '../../lib/images.js';

function AboutSection({ about, mission, pillars }) {
  return (
    <Section id="about" index="01" label="About" title="About us">
      <div className="split">
        <Reveal className="split-copy">
          {about ? <p className="lead">{about}</p> : null}
          {mission ? <p className="lead">{mission}</p> : null}
        </Reveal>

        <Reveal className="split-art" delay={120}>
          <figure>
            <img
              src={IMG.about}
              alt="Two members of the Think Hub community working together at a desk"
              width="1400"
              height="1050"
              loading="lazy"
            />
            <figcaption>The hub is open to anyone with something to make.</figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="pillar-grid">
        {pillars.map((p, i) => (
          <PillarCard key={`${p.title}-${i}`} title={p.title} text={p.text} index={i} />
        ))}
      </div>
    </Section>
  );
}

export default memo(AboutSection);
