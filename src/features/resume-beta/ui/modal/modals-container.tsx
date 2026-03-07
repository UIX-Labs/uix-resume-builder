'use client';

import dynamic from 'next/dynamic';
import { FeedbackModal } from '@features/feedback-form/ui/feedback-modal';
import { ReferralModal } from '@features/referral-flow/ui/referral-modal';
import { AuthRedirectModal } from '@shared/ui/components/auth-redirect-modal';
import { useBuilderActions, useBuilderMeta, useBuilderState } from '../../models/builder-context';

const AnalyzerModal = dynamic(() => import('@shared/ui/components/analyzer-modal'), {
  ssr: false,
});

const PreviewModal = dynamic(
  () => import('@widgets/templates-page/ui/preview-modal').then((m) => ({ default: m.PreviewModal })),
  { ssr: false },
);

export function ModalsContainer() {
  const { selectedTemplate, selectedTemplateId, resumeId } = useBuilderState();
  const { handleApplySuggestions, setIsPreviewModalOpen } = useBuilderActions();
  const meta = useBuilderMeta();

  return (
    <>
      {meta.analyzerModalData && (
        <AnalyzerModal
          open={meta.analyzerModalOpen}
          onOpenChange={meta.setAnalyzerModalOpen}
          suggestions={meta.analyzerModalData.suggestions}
          suggestionType={meta.analyzerModalData.suggestionType}
          onApply={handleApplySuggestions}
          resumeId={resumeId}
        />
      )}

      <FeedbackModal open={meta.isFeedbackModalOpen} onOpenChange={meta.setIsFeedbackModalOpen} />

      {selectedTemplate && (
        <PreviewModal
          template={{
            id: selectedTemplateId ?? '',
            json: selectedTemplate,
            publicImageUrl: '',
            createdAt: '',
            updatedAt: '',
          }}
          isOpen={meta.isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          resumeData={meta.cleanedDataForModal}
        />
      )}

      <AuthRedirectModal
        isOpen={meta.isAuthModalOpen}
        onClose={() => meta.setIsAuthModalOpen(false)}
        redirectUrl={meta.authRedirectUrl}
        title="Login Required"
        description="You need to login to download PDF."
      />

      <ReferralModal
        isOpen={meta.isReferralModalOpen}
        onClose={() => meta.setIsReferralModalOpen(false)}
        referralLink={meta.referralUrl}
      />
    </>
  );
}
