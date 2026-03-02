'use client';

import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';
import { createResume, updateResumeTemplate, useParsePdfResume } from '@entities/resume';
import { type Template } from '@entities/template-page/api/template-data';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { NewProgressBar } from '@shared/ui/components/new-progress-bar';
import { useMutation } from '@tanstack/react-query';
import BuilderIntelligenceModal from '@widgets/dashboard/ui/builder-intelligence-modal';
import JDUploadMobileModal from '@widgets/dashboard/ui/jd-upload-mobile-modal';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { GetStartedModal } from './get-started-Modal';
import { TemplateCardFilter } from './template-card-filter';

interface TemplateCardGridProps {
  data: any;
  isLoading: boolean;
  offset: number;
  setOffset: (offset: number | ((prev: number) => number)) => void;
  limit: number;
}

export default function TemplateCardGrid({ data, isLoading, offset, setOffset, limit }: TemplateCardGridProps) {
  const router = useRouter();
  const user = useCachedUser();
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [showScanningOverlay, setShowScanningOverlay] = useState(false);
  const [activeAction, setActiveAction] = useState<'create' | 'upload' | 'tailoredResume' | 'tailoredJD' | null>(null);
  const [showJDUpload, setShowJDUpload] = useState(false);
  const [isBuilderIntelligenceModalOpen, setIsBuilderIntelligenceModalOpen] = useState(false);

  const createResumeMutation = useMutation({ mutationFn: createResume });
  const updateTemplateMutation = useMutation({ mutationFn: updateResumeTemplate });
  const { mutate: parsePdfResume } = useParsePdfResume();

  const lockOptions = useCallback((action: typeof activeAction) => {
    setActiveAction(action);
  }, []);

  const releaseOptions = useCallback(() => {
    setActiveAction(null);
    setShowScanningOverlay(false);
  }, []);

  const { isJDModalOpen, handleJDModal, handleJDSubmittingChange } = useJDModal({
    onRelease: releaseOptions,
  });

 const templates = Array.isArray(data) ? data : data?.data || [];
const total = data?.total ?? templates.length;
  const hasMore = offset + limit < total;

  const handleScratch = async () => {
    setIsGetStartedOpen(false);
    if (!user?.isLoggedIn) getOrCreateGuestEmail();
     console.log('userId:', user?.id); 
    lockOptions('create');
    setShowScanningOverlay(true);

    trackEvent('create_resume_click', { source: 'template_modal', method: 'from_scratch' });

    try {
      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const userName = user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Guest User';
      const title = `${userName}-Resume-${currentDate}`;

      const newResume = await createResumeMutation.mutateAsync({
        title,
        userInfo: { userId: user?.id ?? '' },
      });

      if (selectedTemplate) {
        await updateTemplateMutation.mutateAsync({
          resumeId: newResume.id,
          templateId: selectedTemplate.id,
        });
      }

      router.push(`/resume/${newResume.id}`);
    } catch (error) {
      console.error('Failed:', error);
      releaseOptions();
    }
  };

  const handleUpload = () => {
    setIsGetStartedOpen(false);
    trackEvent('upload_resume_click', { source: 'template_modal' });
    if (!user?.isLoggedIn) getOrCreateGuestEmail();
    setTimeout(() => fileInputRef.current?.click(), 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    lockOptions('upload');
    setShowScanningOverlay(true);

    parsePdfResume(file, {
      onSuccess: (data: any) => {
        trackEvent('resume_uploaded', { source: 'template_modal', resumeId: data.resumeId });
        setTimeout(() => {
          setShowScanningOverlay(false);
          router.push(`/resume/${data.resumeId}`);
        }, 300);
      },
      onError: (error: any) => {
        console.error('Upload failed:', error);
        releaseOptions();
      },
    });
  };

  const handleLinkedIn = () => {
    setIsGetStartedOpen(false);
    trackEvent('create_resume_click', { source: 'template_modal', method: 'linkedin_autofill' });
    setIsLinkedInModalOpen(true);
  };

  const handleJD = () => {
    setIsGetStartedOpen(false);
    lockOptions('tailoredJD');
    if (isMobile) {
      handleJDModal(true);
    } else {
      setShowJDUpload(true);
      setIsBuilderIntelligenceModalOpen(true);
    }
  };

  const showProgressBar = showScanningOverlay && (activeAction === 'upload' || activeAction === 'tailoredJD');
  const showSpinnerOverlay = showScanningOverlay && activeAction === 'create';

  return (
    <>
      <NewProgressBar
        isVisible={showProgressBar}
        estimatedTime={30000}
        targetProgress={95}
        onComplete={() => {}}
      />

      <NewProgressBar
        isVisible={showSpinnerOverlay}
        showSpinner={true}
        spinnerTitle="Creating Resume..."
        spinnerSubtitle="Setting up your workspace"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {isLoading ? (
          <div className="col-span-5 text-center py-20">Loading...</div>
        ) : templates.length > 0 ? (
          templates.map((template: Template) => (
            <TemplateCardFilter
              key={template.id}
              template={template}
              onClick={() => {
                setSelectedTemplate(template);
                setIsGetStartedOpen(true);
              }}
              onPreviewClick={() => setPreviewTemplate(template)}
            />
          ))
        ) : (
          <div className="col-span-5 text-center text-gray-400 py-20">
            No templates found.
          </div>
        )}

        {/* Pagination */}
        {!isLoading && total > 0 && (
          <div className="col-span-5 flex justify-center items-center gap-4 mt-8">
            <button
              type="button"
              disabled={offset === 0}
              onClick={() => setOffset((prev) => Math.max(0, prev - limit))}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              {offset + 1}–{Math.min(offset + limit, total)} of {total}
            </span>

            <button
              type="button"
              disabled={!hasMore}
              onClick={() => setOffset((prev) => prev + limit)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <PreviewModal
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onScratchClick={handleScratch}
        onUploadClick={handleUpload}
        onLinkedInClick={handleLinkedIn}
        onJDClick={handleJD}
      />

      <LinkedInModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
      />

      {isBuilderIntelligenceModalOpen && (
        <BuilderIntelligenceModal
          isOpen={isBuilderIntelligenceModalOpen}
          onClose={() => {
            setIsBuilderIntelligenceModalOpen(false);
            setShowJDUpload(false);
            releaseOptions();
          }}
          showJDUpload={showJDUpload}
          showResumeUpload={false}
          onSubmittingChange={(isSubmitting) => {
            if (isSubmitting) {
              setShowScanningOverlay(true);
              setIsBuilderIntelligenceModalOpen(false);
              return;
            }
            setShowScanningOverlay(false);
          }}
        />
      )}

      <JDUploadMobileModal
        isOpen={isJDModalOpen}
        onClose={() => handleJDModal(false)}
        onSubmittingChange={handleJDSubmittingChange}
      />
    </>
  );
}