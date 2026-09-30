import { memo } from 'react';
import { TriangleAlert, RefreshCw } from 'lucide-react';
import { useContent } from '../content/ContentContext.jsx';
import { useDocumentMeta } from '../lib/useDocumentMeta.js';
import Button from '../components/ui/Button.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import Nav from '../components/site/Nav.jsx';
import Hero from '../components/site/Hero.jsx';
import Stats from '../components/site/Stats.jsx';
import AboutSection from '../components/site/AboutSection.jsx';
import SpacesSection from '../components/site/SpacesSection.jsx';
import ProgramsSection from '../components/site/ProgramsSection.jsx';
import TeamSection from '../components/site/TeamSection.jsx';
import ContactSection from '../components/site/ContactSection.jsx';
import Footer from '../components/site/Footer.jsx';

function LoadError({ message, onRetry }) {
  return (
    <div className="gate">
      <TriangleAlert size={30} aria-hidden="true" />
      <h2>Could not load the site</h2>
      <p>{message}</p>
      <Button variant="primary" className="btn" icon={RefreshCw} onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

function Home() {
  const { site, stats, pillars, spaces, programs, team, loading, error, reload } = useContent();

  useDocumentMeta({
    title: `${site.name || 'Think Hub'}${site.tagline ? ` | ${site.tagline}` : ''}`,
    description: site.heroText || '',
  });

  if (error) {
    return (
      <>
        <Nav name={site.name} />
        <LoadError message={error} onRetry={reload} />
      </>
    );
  }

  if (loading) {
    return (
      <div className="gate">
        <Spinner size={28} label="Loading the site" />
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <>
      <Nav name={site.name} />
      <main>
        <Hero site={site} />
        <Stats stats={stats} />
        <AboutSection about={site.about} mission={site.mission} pillars={pillars} />
        <SpacesSection spaces={spaces} />
        <ProgramsSection programs={programs} />
        <TeamSection team={team} />
        <ContactSection site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}

export default memo(Home);
