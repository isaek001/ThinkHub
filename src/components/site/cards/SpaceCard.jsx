import { memo } from 'react';
import Reveal from '../../ui/Reveal.jsx';
import { ContentIcon } from '../../../lib/icons';
import { spacePhoto } from '../../../lib/images';

function SpaceCard({ space, index }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <Reveal as="article" className="space" delay={(index % 3) * 90}>
      <figure className="space-fig">
        <img
          src={spacePhoto(space, index)}
          alt={space.title}
          width="1400"
          height="933"
          loading="lazy"
        />
      </figure>
      <div className="space-cap">
        <span className="num">{num}</span>
        <h3>
          <ContentIcon value={space.icon} size={17} />
          {space.title}
        </h3>
        <p>{space.text}</p>
      </div>
    </Reveal>
  );
}

export default memo(SpaceCard);
