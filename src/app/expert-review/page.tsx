'use client';

import Header from '@widgets/landing-page/ui/header-section';
import FooterSection from '@widgets/landing-page/ui/footer-section';
import { HeroSection } from '@widgets/expert-review/ui/hero-section';
import { HowItWorksSection } from '@widgets/expert-review/ui/how-it-works-section';
import { ExpertsSection } from '@widgets/expert-review/ui/experts-section';
import { WhatYouGetSection } from '@widgets/expert-review/ui/what-you-get-section';
import { TrustSection } from '@widgets/expert-review/ui/trust-section';
import { UploadSection } from '@widgets/expert-review/ui/upload-section';
import { FAQSection } from '@widgets/expert-review/ui/faq-section';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ExpertReviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const expertReview = searchParams.get('expertReview');
    if (expertReview === 'open') {
      // Auto-scroll to upload section after auth redirect
      setTimeout(() => {
        const el = document.getElementById('expert-review-upload');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);

      // Clean up the URL param
      const params = new URLSearchParams(searchParams.toString());
      params.delete('expertReview');
      const newSearch = params.toString();
      router.replace(`/expert-review${newSearch ? `?${newSearch}` : ''}`, { scroll: false });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <ExpertsSection />
      <WhatYouGetSection />
      <TrustSection />
      <UploadSection />
      <FAQSection />
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
