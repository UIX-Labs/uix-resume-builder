import { AITailorSection } from './ai-tailored-section';
import { Header } from './header-section';
import { HeroSection } from './hero-section';
import { TemplateCarousel } from './template-carousel';
import Testimonials from './testimonials-section';
import Image from 'next/image';
import React from 'react';

export function LandingPage() {
  return (
    <div className="relative w-full h-full">
      <Image src="images/landing-page-bg.svg" alt="Background" fill className="object-cover -z-10" priority />
      <Header />

      <div
        className="h-[724px] border-2 border-white rounded-[36px] m-4 mt-0 overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <HeroSection />
      </div>

      <div>
        <TemplateCarousel />
        <Testimonials />
        <AITailorSection />
      </div>
    </div>
  );
}
