'use client';

import { useMemo } from 'react';
import { getCleanDataForRenderer } from '@/widgets/form-page-builder/lib/data-cleanup';
import { ResumeRenderer } from '@features/resume/renderer';
import { Eye, Check, Layout } from 'lucide-react';
import type { ExampleMetadata } from './constants';

export function PreviewStep({
  resumeData,
  template,
  templates,
  selectedTemplateId,
  onTemplateChange,
  metadata,
}: {
  resumeData: Record<string, any> | null;
  template: Record<string, any> | null | undefined;
  templates: any[];
  selectedTemplateId: string;
  onTemplateChange: (templateId: string) => void;
  metadata: ExampleMetadata;
  onSave: () => void;
  isSaving: boolean;
}) {
  const cleanedData = useMemo(
    () => (resumeData ? getCleanDataForRenderer(resumeData) : null),
    [resumeData],
  );

  if (!template) {
    return (
      <div className="text-center py-20 text-gray-500">
        <Eye className="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p>Please select a template in the Metadata step to preview the resume.</p>
      </div>
    );
  }

  if (!cleanedData) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No resume data to preview. Please go back and add data.</p>
      </div>
    );
  }

  const missingFields = [];
  if (!metadata.title) missingFields.push('Title');
  if (!metadata.slug) missingFields.push('Slug');
  if (!metadata.categoryId) missingFields.push('Category');
  if (!metadata.templateId) missingFields.push('Template');

  return (
    <div>
      {missingFields.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          Missing required fields: {missingFields.join(', ')}
        </div>
      )}

      <div className="flex gap-6 items-start">
        {/* Resume Preview */}
        <div className="flex-1 min-w-0 flex justify-center">
          <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden" style={{ width: '21cm' }}>
            <ResumeRenderer
              template={template}
              data={cleanedData}
              currentSection={undefined}
              hasSuggestions={false}
              isThumbnail={false}
            />
          </div>
        </div>

        {/* Template Selector - Right Side */}
        {templates.length > 0 && (
          <div className="w-48 shrink-0 border border-gray-200 rounded-lg bg-white p-3 sticky top-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((tmpl) => {
                const isSelected = tmpl.id === selectedTemplateId;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => onTemplateChange(tmpl.id)}
                    className={`relative rounded-lg border-2 overflow-hidden transition-all cursor-pointer aspect-[3/4] ${
                      isSelected
                        ? 'border-blue-500 shadow-md ring-1 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {tmpl.publicImage?.url ? (
                      // biome-ignore lint/performance/noImgElement: dynamic admin template thumbnails
                      <img
                        src={tmpl.publicImage.url}
                        alt={`Template ${tmpl.id.slice(0, 8)}`}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Layout className="w-5 h-5 text-gray-300" />
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                        <div className="bg-blue-500 rounded-full p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
