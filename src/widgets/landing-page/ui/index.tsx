import { AiFeaturesSection } from './ai-features-section';
import FaqSection from './faq-section';
import FooterSection from './footer-section';
import { PaidToolsSection } from './free-tools-section';
import Header from './header-section';
import HeroSection from './hero-section';
import { HowItWorksSection } from './how-it-works-section';
// WIP - PricingSection hidden temporarily
// import { PricingSection } from './pricing-section';
import { ReferralBanner } from './referral-banner';
// WIP - ResumeExamplesSection hidden temporarily
// import { ResumeExamplesSection } from './resume-examples-section';
import { TemplateCarousel } from './template-carousel';
import Testimonials from './testimonials-section';
import { TopAnnouncementStrip } from './top-announcement-strip';

export function LandingPage() {
  return (
    <div className="relative w-full h-full">
      <Header />
      <div className="mb-2 md:mb-1">
        <TopAnnouncementStrip />
      </div>

      <div
        className="h-auto border-2 border-white rounded-[36px] m-4 mt-0 overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <HeroSection />
      </div>

      <HowItWorksSection />

      <AiFeaturesSection />

      <div>
        <TemplateCarousel />
        <Testimonials />
      </div>

      <PaidToolsSection />

      {/* WIP - ResumeExamplesSection hidden temporarily */}
      {/* <ResumeExamplesSection /> */}

      {/* WIP - PricingSection hidden temporarily */}
      {/* <PricingSection /> */}

      <ReferralBanner />

      <div
        className="border border-white rounded-[36px] mx-4 overflow-hidden mt-6 mb-6"
        style={{
          background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <FaqSection />
      </div>

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
