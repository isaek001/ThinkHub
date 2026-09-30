import { memo } from 'react';
import Reveal from '../../ui/Reveal.jsx';
import { safeUrl } from '../../../lib/content';
import { programPhoto } from '../../../lib/images';

function ProgramCard({ title, dates, status, text, link, index = 0 }) {
  const href = safeUrl(link);

  return (
    <Reveal as="article" className="prog">
      <figure className="prog-fig">
        <img
          src={programPhoto(index)}
          alt={title}
          width="1400"
          height="933"
          loading="lazy"
        />
      </figure>

      <div className="prog-body">
        <p className="prog-meta">
          <span className="num">{String(index + 1).padStart(2, '0')}</span>
          {dates ? <span>{dates}</span> : null}
          {status ? <span className="status">{status}</span> : null}
        </p>

        <h3>{title}</h3>
        <p>{text}</p>

        {href ? (
          <a className="link" href={href} target="_blank" rel="noopener noreferrer">
            Learn more
            <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </div>
    </Reveal>
  );
}

export default memo(ProgramCard);
