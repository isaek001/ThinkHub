import { memo } from 'react';
import Section from './Section.jsx';
import SpaceCard from './cards/SpaceCard.jsx';

function SpacesSection({ spaces }) {
  return (
    <Section
      id="spaces"
      index="02"
      label="Spaces"
      title="What's inside the hub"
      lead="Everything a young creative or a growing business needs, under one roof."
    >
      <div className="space-grid">
        {spaces.map((s, i) => (
          <SpaceCard key={`${s.title}-${i}`} space={s} index={i} />
        ))}
      </div>
    </Section>
  );
}

export default memo(SpacesSection);
