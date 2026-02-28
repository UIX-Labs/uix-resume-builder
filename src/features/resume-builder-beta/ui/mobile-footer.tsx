'use client';

import { memo } from 'react';
import { Button } from '@shared/ui/button';
import { useResumeBuilderContext } from './provider';
import { usePdfDownload } from '../hooks/use-pdf-download';
import { useUIStore } from '../stores/ui-store';
import { Eye, Download, LayoutTemplate } from 'lucide-react';

/**
 * Sticky bottom bar on mobile with Preview, Templates, and Download actions.
 */
export const MobileFooter = memo(function MobileFooter() {
  const { meta } = useResumeBuilderContext();
  const { downloadPdf, isGenerating } = usePdfDownload(meta.previewRef);
  const setIsPreviewModalOpen = useUIStore((s) => s.setIsPreviewModalOpen);
  const setIsTemplatePickerOpen = useUIStore((s) => s.setIsTemplatePickerOpen);

  return (
    <div className="flex items-center justify-around px-4 py-3 border-t bg-white sticky bottom-0 z-50">
      <button
        type="button"
        onClick={() => setIsPreviewModalOpen(true)}
        className="flex flex-col items-center gap-1 text-gray-600"
      >
        <Eye className="w-5 h-5" />
        <span className="text-xs">Preview</span>
      </button>
      <button
        type="button"
        onClick={() => setIsTemplatePickerOpen(true)}
        className="flex flex-col items-center gap-1 text-gray-600"
      >
        <LayoutTemplate className="w-5 h-5" />
        <span className="text-xs">Templates</span>
      </button>
      <Button
        size="sm"
        onClick={downloadPdf}
        disabled={isGenerating}
        className="flex items-center gap-1.5"
      >
        <Download className="w-4 h-4" />
        {isGenerating ? 'Generating...' : 'Download'}
      </Button>
    </div>
  );
});
