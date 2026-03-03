'use client';

/**
 * DummyTemplateRenderer
 *
 * A standalone component that renders any local template with dummy data.
 * Just pass a template name (string key from the registry) or a raw template
 * object and it will render a full resume preview.
 *
 * Usage:
 *
 *   // By template name
 *   <DummyTemplateRenderer templateName="mohsina-template1" />
 *
 *   // By raw template object
 *   <DummyTemplateRenderer template={myCustomTemplate} />
 *
 *   // With custom data override
 *   <DummyTemplateRenderer templateName="enzo-template1" data={myData} />
 *
 *   // Scaled-down thumbnail mode
 *   <DummyTemplateRenderer templateName="template4" scale={0.5} />
 */

import { dummyResumeData } from '@features/resume/data/dummy-resume-data';
import { templateRegistry } from '@features/resume/data/template-registry';
import { ResumeRenderer } from '@features/resume/renderer';
import { cn } from '@shared/lib/cn';
import { useMemo } from 'react';

export interface DummyTemplateRendererProps {
  /** Key from the template registry (e.g. "mohsina-template1", "template4") */
  templateName?: string;

  /** Or pass a raw template object directly — takes precedence over templateName */
  template?: any;

  /** Optional data override — defaults to dummyResumeData */
  data?: any;

  /** CSS scale factor for the rendered preview (default 1) */
  scale?: number;

  /** Extra className on the outer wrapper */
  className?: string;

  /** Whether to render as a thumbnail (hides interactive elements) */
  isThumbnail?: boolean;
}

export function DummyTemplateRenderer({
  templateName,
  template: templateProp,
  data,
  scale = 1,
  className,
  isThumbnail = false,
}: DummyTemplateRendererProps) {
  const resolvedTemplate = useMemo(() => {
    if (templateProp) return templateProp;
    if (templateName && templateRegistry[templateName]) {
      return templateRegistry[templateName];
    }
    return null;
  }, [templateProp, templateName]);

  const resolvedData = data ?? dummyResumeData;

  if (!resolvedTemplate) {
    const availableKeys = Object.keys(templateRegistry).join(', ');
    return (
      <div className="p-6 text-center text-red-500 text-sm border border-red-200 rounded-lg bg-red-50">
        <p className="font-semibold mb-1">Template not found</p>
        {templateName && (
          <p>
            No template registered for key: <code className="bg-red-100 px-1 rounded">{templateName}</code>
          </p>
        )}
        <p className="mt-2 text-xs text-red-400">Available templates: {availableKeys}</p>
      </div>
    );
  }

  return (
    <div
      className={cn('flex flex-col items-center', className)}
      style={{
        transformOrigin: 'top center',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
    >
      <ResumeRenderer
        template={resolvedTemplate}
        data={resolvedData}
        currentSection={undefined}
        hasSuggestions={false}
        isThumbnail={isThumbnail}
      />
    </div>
  );
}

export default DummyTemplateRenderer;
