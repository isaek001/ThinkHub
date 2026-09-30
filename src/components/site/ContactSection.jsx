import { memo } from 'react';
import Section from './Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import ContactForm from './ContactForm.jsx';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.3261879649854!2d8.89246197403863!3d9.906767390193906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1053730053c9582f%3A0x54ab661f53a94883!2sThink%20Hub!5e0!3m2!1sen!2sng!4v1790756473025!5m2!1sen!2sng';

function ContactSection({ site }) {
  return (
    <Section
      id="contact"
      index="05"
      label="Contact"
      title="Get in touch"
    >
      <div className="contact">
        <Reveal className="map-wrap">
          <div className="map">
            <iframe
              src={MAP_SRC}
              title="Think Hub location on Google Maps"
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="map-cap">
            <span>Find us</span>
            {site?.address || 'Jos, Plateau State, Nigeria'}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

export default memo(ContactSection);
