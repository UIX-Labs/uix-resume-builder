'use client';

import { memo, Suspense, useRef } from 'react';
import { cn } from '@shared/lib/utils';
import { useResumeStore } from '../stores/resume-store';
import { useUIStore } from '../stores/ui-store';
import { usePreviewScale } from '../hooks/use-preview-scale';
import { getTemplate } from '../templates/registry';
import { DEFAULT_THEME } from '../types/template';
import { SuggestionProvider } from './suggestion-context';
import { X } from 'lucide-react';

function PageSkeleton() {
  return (
    <div className="animate-pulse" style={{ width: '21cm', minHeight: '29.7cm' }}>
      <div className="bg-gray-100 w-full h-full rounded" />
    </div>
  );
}

/**
 * Full-screen modal overlay for previewing the resume on mobile.
 */
export const MobilePreviewModal = memo(function MobilePreviewModal() {
  const isOpen = useUIStore((s) => s.isPreviewModalOpen);
  const setIsOpen = useUIStore((s) => s.setIsPreviewModalOpen);
  const data = useResumeStore((s) => s.data);
  const templateId = useResumeStore((s) => s.templateId);
  const theme = useResumeStore((s) => s.theme);
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = usePreviewScale(containerRef);

  const entry = getTemplate(templateId);
  const Template = entry?.component;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-gray-100 flex flex-col transition-transform duration-300',
        isOpen ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
        <h2 className="text-base font-semibold">Preview</h2>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-lg hover:bg-gray-100"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Preview content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 flex justify-center"
      >
        {data && Template ? (
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
            <SuggestionProvider>
              <Suspense fallback={<PageSkeleton />}>
                <Template data={data} theme={theme ?? DEFAULT_THEME} />
              </Suspense>
            </SuggestionProvider>
          </div>
        ) : (
          <PageSkeleton />
        )}
      </div>
    </div>
  );
});
