import React, { useEffect, useState } from 'react';
import { initLenis } from './lib/lenis';
import { CustomCursor } from './components/CustomCursor';
import { MouseGlow } from './components/MouseGlow';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { SkillsGrid } from './components/SkillsGrid';
import { Services } from './components/Services';
import { WhyMe } from './components/WhyMe';
import { Achievements } from './components/Achievements';
import { MediaChannels } from './components/MediaChannels';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { RecruiterProvider, RecruiterToggle } from './components/RecruiterToggle';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = initLenis();
    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <RecruiterProvider>
      <div className="relative min-h-screen bg-[#08080a] text-[#f4f4f6] selection:bg-[#e2c392] selection:text-[#08080a]">
        {/* Preloader */}
        {loading && <Preloader onComplete={() => setLoading(false)} />}

        {/* Custom Interactive Cursor */}
        <CustomCursor />

        {/* Subtle Background Interaction */}
        <MouseGlow />

        {/* Sticky Navigation Header */}
        <Navbar onNavClick={scrollToSection} />

        {/* Recruiter Role Toggle — floats below navbar */}
        <RecruiterToggle />

        {/* Main Content Layout */}
        <main className="relative">
          <Hero
            onConnectClick={() => scrollToSection('contact')}
            onWorkClick={() => scrollToSection('work')}
          />
          <About />
          <Marquee />
          <Projects />
          <Journey />
          <SkillsGrid />
          <Services />
          <WhyMe />
          <Achievements />
          <MediaChannels />
          <Testimonials />
          <Contact />
          <FinalCTA onConnectClick={() => scrollToSection('contact')} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating AI Chat Widget */}
        <AIChat />
      </div>
    </RecruiterProvider>
  );
};

export default App;
