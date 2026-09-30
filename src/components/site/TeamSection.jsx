import { memo } from 'react';
import Section from './Section.jsx';

function TeamSection({ team }) {
  if (!team?.length) return null;

  return (
    <Section
      id="team"
      alt
      index="04"
      label="Team"
      title="Meet the team"
      lead="The people who keep Think Hub creating."
    >
      <div className="roster">
        {team.map((person, i) => (
          <div className="roster-row" key={`${person.name}-${i}`}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{person.name}</h3>
            <p>{person.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default memo(TeamSection);
