'use client';

import { ResumeRenderer } from '../dsl/renderer';
import { useBuilderMeta, useBuilderState } from '../models/builder-context';

export function HiddenRenderers() {
  const { selectedTemplate, isGeneratingPDF, hasSuggestions } = useBuilderState();
  const { thumbnailRef, pdfSourceRef, cleanedDataForThumbnail, cleanedDataForPreview } = useBuilderMeta();

  if (!selectedTemplate) return null;

  return (
    <div
      className="absolute -left-[9999px] top-0 w-[794px] h-0 overflow-hidden pointer-events-none invisible -z-10"
      aria-hidden="true"
    >
      <div ref={thumbnailRef}>
        <ResumeRenderer
          template={selectedTemplate}
          data={cleanedDataForThumbnail}
          currentSection={undefined}
          hasSuggestions={false}
          isThumbnail={true}
          skipImageFallbacks={isGeneratingPDF}
        />
      </div>
      <div ref={pdfSourceRef}>
        <ResumeRenderer
          template={selectedTemplate}
          data={cleanedDataForPreview}
          currentSection={undefined}
          hasSuggestions={false}
          isThumbnail={false}
          skipImageFallbacks={isGeneratingPDF}
        />
      </div>
    </div>
  );
}
