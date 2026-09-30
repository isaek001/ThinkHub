import { memo } from 'react';
import Section from './Section.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import ProgramCard from './cards/ProgramCard.jsx';

function ProgramsSection({ programs }) {
  return (
    <Section
      id="programs"
      index="03"
      label="Programs"
      title="Programs & events"
      lead="Workshops and training that turn ideas into skills."
    >
      {programs.length > 0 ? (
        programs.map((p, i) => <ProgramCard key={`${p.title}-${i}`} {...p} index={i} />)
      ) : (
        <EmptyState>New programs coming soon.</EmptyState>
      )}
    </Section>
  );
}

export default memo(ProgramsSection);
