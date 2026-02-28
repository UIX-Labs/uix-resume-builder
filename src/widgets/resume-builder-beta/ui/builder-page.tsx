'use client';

import { useIsMobile } from '@shared/hooks/use-mobile';
import { ResumeBuilder } from '@features/resume-builder-beta/ui/resume-builder';
import { useResizablePanel } from '@features/resume-builder-beta/hooks/use-resizable-panel';

interface BuilderPageProps {
  resumeId: string;
}

/**
 * Widget layer — composes feature-level compound components.
 * Zero business logic — just layout composition.
 */
export function BuilderPage({ resumeId }: BuilderPageProps) {
  const isMobile = useIsMobile();
  const { width, startResizing, containerRef } = useResizablePanel(50, 30, 70);

  if (isMobile) {
    return (
      <ResumeBuilder.Provider resumeId={resumeId}>
        <div className="flex flex-col h-screen bg-gray-50">
          <ResumeBuilder.Toolbar />
          <div className="flex-1 overflow-y-auto">
            <ResumeBuilder.MobileSectionList />
          </div>
          <ResumeBuilder.MobileFooter />
          <ResumeBuilder.MobileFormSheet />
          <ResumeBuilder.MobilePreviewModal />
        </div>
      </ResumeBuilder.Provider>
    );
  }

  return (
    <ResumeBuilder.Provider resumeId={resumeId}>
      <div className="flex flex-col h-screen bg-gray-50">
        <ResumeBuilder.Toolbar />
        <div ref={containerRef} className="flex flex-1 overflow-hidden pl-4 gap-0">
          <ResumeBuilder.Sidebar />
          <div style={{ width: `${width}%` }} className="flex flex-col border-r">
            <ResumeBuilder.Editor />
          </div>
          <button
            type="button"
            onMouseDown={startResizing}
            className="w-1 cursor-col-resize bg-gray-200 hover:bg-blue-400 transition-colors shrink-0"
            aria-label="Resize panels"
          />
          <div style={{ width: `${100 - width}%` }} className="flex flex-col">
            <ResumeBuilder.Preview />
          </div>
        </div>
      </div>
    </ResumeBuilder.Provider>
  );
}
