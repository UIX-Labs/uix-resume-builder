'use client';

import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import BuilderIntelligenceModal from '@widgets/dashboard/ui/builder-intelligence-modal';
import JDUploadMobileModal from '@widgets/dashboard/ui/jd-upload-mobile-modal';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { useCallback, useState } from 'react';

export default function HeroSection() {
  const isMobile = useIsMobile();

  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [showJDUpload, setShowJDUpload] = useState(false);
  const [isBuilderIntelligenceModalOpen, setIsBuilderIntelligenceModalOpen] = useState(false);

  const releaseOptions = useCallback(() => {
    setShowJDUpload(false);
    setIsBuilderIntelligenceModalOpen(false);
  }, []);

  const { isJDModalOpen, handleJDModal, handleJDSubmittingChange } = useJDModal({
    onRelease: releaseOptions,
  });

  const handleLinkedIn = () => {
    trackEvent('create_resume_click', { source: 'hero_section', method: 'linkedin_autofill' });
    setIsLinkedInModalOpen(true);
  };

  const handleJD = () => {
    if (isMobile) {
      handleJDModal(true);
    } else {
      setShowJDUpload(true);
      setIsBuilderIntelligenceModalOpen(true);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center pt-16 pb-10">
        <h1 className="text-5xl font-bold text-[#198447]">
          Your Resume, <span className="text-[#0059ED]">But Better</span>
        </h1>
        <p className="text-black mt-3 max-w-3xl text-lg">
          Choose from free and premium templates, customise with our intuitive drag-and-drop builder, and download your
          resume as a polished PDF in minutes.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleLinkedIn}
            type="button"
            className="bg-[#0059ED] text-white px-5 py-2.5 rounded text-sm font-medium cursor-pointer"
          >
            Autofill via LinkedIn
          </button>
          <button
            onClick={handleJD}
            type="button"
            className="border border-gray-300 text-[#0059ED] px-5 py-2.5 rounded text-sm font-medium bg-[#D5E5FF] cursor-pointer"
          >
            Upload My Resume
          </button>
        </div>
      </div>

      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />

      {isBuilderIntelligenceModalOpen && (
        <BuilderIntelligenceModal
          isOpen={isBuilderIntelligenceModalOpen}
          onClose={() => {
            setIsBuilderIntelligenceModalOpen(false);
            setShowJDUpload(false);
          }}
          showJDUpload={showJDUpload}
          showResumeUpload={false}
          onSubmittingChange={(isSubmitting) => {
            if (isSubmitting) {
              setIsBuilderIntelligenceModalOpen(false);
            }
          }}
        />
      )}

      <JDUploadMobileModal
        isOpen={isJDModalOpen}
        onClose={() => handleJDModal(false)}
        onSubmittingChange={handleJDSubmittingChange}
      />
    </div>
  );
}
