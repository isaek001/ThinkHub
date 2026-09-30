import { memo } from 'react';
import Reveal from '../../ui/Reveal.jsx';

function PillarCard({ title, text, index }) {
  return (
    <Reveal as="article" className="pillar" delay={index * 90}>
      <span className="num">{String(index + 1).padStart(2, '0')}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </Reveal>
  );
}

export default memo(PillarCard);
