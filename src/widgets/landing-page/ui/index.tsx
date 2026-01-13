import { AITailorSection } from './ai-tailored-section';
import FooterSection from './footer-section';
import Header from './header-section';
import HeroSection from './hero-section';
import JDSection from './jd-section';
import { TemplateCarousel } from './template-carousel';
import Testimonials from './testimonials-section';
import { TopAnnouncementStrip } from './top-announcement-strip';

export function LandingPage() {
  return (
    <div className="relative w-full h-full">
      <Header />
      <div className="mb-3.5 md:mb-5">
        <TopAnnouncementStrip />
      </div>

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
        <JDSection />
      </div>

      {/* <div className="min-h-0 lg:h-[1065px] pb-4 lg:pb-0">
        <AITailorSection />
      </div> */}

      <div
        className="border border-white rounded-[36px] mx-4 overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <FooterSection />
      </div>
    </div>
  );
}
