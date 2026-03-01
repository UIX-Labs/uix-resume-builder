'use client';

import { ResumeRenderer } from '@features/resume/renderer';
import { PreviewButton } from '@shared/ui/components/preview-button';
import { DownloadButton } from '@shared/ui/components/download-button';
import { TemplatesDialog } from '@widgets/templates-page/ui/templates-dialog';
import TemplateButton from '@widgets/form-page-builder/ui/change-template-button';
import { useBuilderActions, useBuilderMeta, useBuilderState } from '../../models/builder-context';

export function PreviewPanel() {
  const {
    selectedTemplate,
    selectedTemplateId,
    isGeneratingPDF,
    hasSuggestions,
    currentStep,
    user,
    friendsBonus,
  } = useBuilderState();
  const {
    handleDownloadPDF,
    handleTemplateSelect,
    setIsPreviewModalOpen,
  } = useBuilderActions();
  const {
    scrollContainerRef,
    previewWrapperRef,
    targetRef,
    leftWidth,
    previewScale,
    cleanedDataForPreview,
  } = useBuilderMeta();

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-auto pt-4 pb-8 scroll-hidden h-[calc(100vh)] px-3 relative"
      style={{
        width: `${leftWidth}%`,
        minWidth: '30%',
        maxWidth: '70%',
        flexShrink: 0,
      }}
    >
      <div className="absolute top-0 right-3 z-10">
        <PreviewButton onClick={() => setIsPreviewModalOpen(true)} />
      </div>

      <div className="min-w-0 flex-1 flex justify-center relative" ref={previewWrapperRef}>
        <div
          ref={targetRef}
          style={{
            transform: `scale(${previewScale})`,
            transformOrigin: 'top center',
          }}
        >
          {selectedTemplate ? (
            <ResumeRenderer
              template={selectedTemplate}
              data={cleanedDataForPreview}
              currentSection={isGeneratingPDF ? undefined : currentStep}
              hasSuggestions={isGeneratingPDF ? false : hasSuggestions}
              isThumbnail={false}
              skipImageFallbacks={isGeneratingPDF}
            />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[800px]">
              <div className="text-gray-500">Loading template...</div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 flex justify-end items-center gap-3 pr-8 pb-4 pointer-events-none">
        <TemplatesDialog onTemplateSelect={handleTemplateSelect} currentTemplateId={selectedTemplateId}>
          <div
            className="
              pointer-events-auto
              border border-[#CBE7FF]
              bg-[#E9F4FF]
              px-4 py-2
              rounded-xl
              shadow-lg
              flex items-center gap-1.5
              cursor-pointer
              font-semibold
              text-[#005FF2]
              hover:bg-[#E9F4FF] hover:text-white
              transition-colors
            "
          >
            <TemplateButton />
          </div>
        </TemplatesDialog>
        <DownloadButton
          onClick={handleDownloadPDF}
          downloadsLeft={user?.downloadsLeft ?? 3}
          downloadsAllowed={user?.downloadsAllowed ?? 3}
          isGenerating={isGeneratingPDF}
          isLoggedIn={!!user}
          friendsBonus={friendsBonus}
        />
      </div>
    </div>
  );
}
