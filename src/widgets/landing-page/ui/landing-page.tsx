import Image from 'next/image';
import { AiFeaturesSection } from './ai-features-section';
import Header from './header-section';
import HeroSection from './hero-section';

function LandingPage() {
  return (
    <div className="relative w-full h-full">
      <Image src="images/landing-page-bg.svg" alt="Background" fill className="object-cover -z-10" priority />
      <Header />

      <div
        className="h-auto border-2 border-white rounded-[36px] m-4 mt-0 overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {' '}
        <HeroSection />
      </div>
      <AiFeaturesSection />
    </div>
  );
}

export default LandingPage;
