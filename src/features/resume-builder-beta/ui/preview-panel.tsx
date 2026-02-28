'use client';

import { memo, Suspense, useRef } from 'react';
import { useResumeStore } from '../stores/resume-store';
import { usePreviewScale } from '../hooks/use-preview-scale';
import { useResumeBuilderContext } from './provider';
import { getTemplate } from '../templates/registry';
import { DEFAULT_THEME } from '../types/template';
import { SuggestionProvider } from './suggestion-context';

function PageSkeleton() {
  return (
    <div className="animate-pulse" style={{ width: '21cm', minHeight: '29.7cm' }}>
      <div className="bg-gray-100 w-full h-full rounded" />
    </div>
  );
}

export const ResumeBuilderPreview = memo(function ResumeBuilderPreview() {
  const data = useResumeStore((s) => s.data);
  const templateId = useResumeStore((s) => s.templateId);
  const theme = useResumeStore((s) => s.theme);
  const { meta } = useResumeBuilderContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const scale = usePreviewScale(containerRef);

  const entry = getTemplate(templateId);
  const Template = entry?.component;

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <PageSkeleton />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto bg-gray-100 p-4 flex justify-center"
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        <div ref={meta.previewRef}>
          <SuggestionProvider>
            <Suspense fallback={<PageSkeleton />}>
              {Template ? (
                <Template data={data} theme={theme ?? DEFAULT_THEME} />
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Template &quot;{templateId}&quot; not found
                </div>
              )}
            </Suspense>
          </SuggestionProvider>
        </div>
      </div>
    </div>
  );
});
