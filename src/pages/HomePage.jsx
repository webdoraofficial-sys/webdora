import React from 'react';
import { Hero27 } from '../components/hero-27';
import { ServicesSection } from '../components/services-section';
import { Showcase7 } from '../components/showcase-7';
import { Pricing7 } from '../components/pricing-7';
import { Waitlist1 } from '../components/waitlist-1';

export function HomePage({ onCtaClick, onSelectPlan }) {
  return (
    <div className="w-full">
      {/* 1. Hero 27: 3D Satin Ribbon + Brand Statement */}
      <Hero27
        onPrimaryCta={onCtaClick}
        onSecondaryCta={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Webdora Services / Capabilities */}
      <ServicesSection onCtaClick={onCtaClick} />

      {/* 3. Showcase 7: Project Index with 'View All Projects' link to /work */}
      <Showcase7 onCtaClick={onCtaClick} showViewAllLink={true} />

      {/* 4. Pricing 7: Transparent Development Packages */}
      <Pricing7 onSelectPlan={onSelectPlan} />

      {/* 5. Waitlist 1: Interactive Inquiry Form + Tech Stack Marquee */}
      <Waitlist1 />
    </div>
  );
}

export default HomePage;
