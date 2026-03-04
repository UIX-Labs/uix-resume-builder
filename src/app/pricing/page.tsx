'use client';

import FooterSection from '@widgets/landing-page/ui/footer-section';
import Header from '@widgets/landing-page/ui/header-section';
import { ExpertReviewAddon } from '@widgets/pricing-page/ui/expert-review-addon';
import { FeatureComparison } from '@widgets/pricing-page/ui/feature-comparison';
import { PricingCTA } from '@widgets/pricing-page/ui/pricing-cta';
import { PricingFAQ } from '@widgets/pricing-page/ui/pricing-faq';
import { PricingHero } from '@widgets/pricing-page/ui/pricing-hero';

export default function PricingPage() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      <Header />
      <PricingHero />
      <FeatureComparison />
      <ExpertReviewAddon />
      <PricingFAQ />
      <div
        className="border border-white rounded-[36px] mx-4 overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <PricingCTA />
        <FooterSection />
      </div>
    </div>
  );
}
