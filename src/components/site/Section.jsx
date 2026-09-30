import { memo } from 'react';
import Reveal from '../ui/Reveal.jsx';

/**
 * Page section. The label/number/title/lead render as an editorial masthead
 * (number + section name on its own rule, headline left, summary right) and
 * `children` follows underneath. The masthead reveals in sequence: label fades
 * in, its rule draws across, then the headline rises.
 */
function Section({ id, index, label, title, lead, alt, children, className = '' }) {
  const hasHead = Boolean(index || label || title || lead);

  return (
    <section id={id} className={`sec${alt ? ' alt' : ''}${className ? ` ${className}` : ''}`}>
      <div className="w">
        {hasHead && (
          <div className="sec-head">
            {index || label ? (
              <Reveal as="p" className="sec-label" variant="fade">
                {index ? <b>{index}</b> : null}
                {label}
              </Reveal>
            ) : null}
            {title ? (
              <Reveal as="h2" delay={70}>
                {title}
              </Reveal>
            ) : null}
            {lead ? (
              <Reveal as="p" className="lead" variant="fade" delay={150}>
                {lead}
              </Reveal>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default memo(Section);
