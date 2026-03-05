'use client';

import type { Template } from '@entities/template-page/api/template-data';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GetStartedModal } from './get-started-Modal';
import NotFoundFilter from './Not-found-filter';
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

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const templates = Array.isArray(data) ? data : data?.data || [];
  // const total = data?.total ?? templates.length;
  // const hasMore = offset + limit < total;

  // FROM SCRATCH
  const handleScratch = () => {
    setIsGetStartedOpen(false);

    trackEvent('create_resume_click', {
      source: 'template_modal',
      method: 'from_scratch',
    });

    router.push('/dashboard?action=from_scratch');
  };

  // UPLOAD RESUME
  const handleUpload = () => {
    setIsGetStartedOpen(false);

    trackEvent('create_resume_click', {
      source: 'template_modal',
      method: 'upload_existing',
    });

    router.push('/dashboard?action=upload');
  };

  // LINKEDIN
  const handleLinkedIn = () => {
    setIsGetStartedOpen(false);

    trackEvent('create_resume_click', {
      source: 'template_modal',
      method: 'linkedin_autofill',
    });

    setIsLinkedInModalOpen(true);
  };

  // JD MATCH
  const handleJD = () => {
    setIsGetStartedOpen(false);

    trackEvent('create_resume_click', {
      source: 'template_modal',
      method: 'upload_resume_jd',
    });

    router.push('/dashboard?action=tailored_jd');
  };

  return (
    <>
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
          <div className="col-span-5">
            {' '}
            <NotFoundFilter />{' '}
          </div>
        )}

        {/* {!isLoading && total > 0 && (
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
    )} */}
      </div>

      <PreviewModal template={previewTemplate} isOpen={!!previewTemplate} onClose={() => setPreviewTemplate(null)} />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onScratchClick={handleScratch}
        onUploadClick={handleUpload}
        onLinkedInClick={handleLinkedIn}
        onJDClick={handleJD}
      />

      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />
    </>
  );
}
