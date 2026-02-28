'use client';

import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';
import { createResume, updateResumeTemplate } from '@entities/resume';
import type { Template } from '@entities/template-page/api/template-data';
import { useUserProfile } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { useMutation } from '@tanstack/react-query';
import JDUploadMobileModal from '@widgets/dashboard/ui/jd-upload-mobile-modal';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { mockTemplates } from '@widgets/filter-templates/mock-template';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { GetStartedModal } from './get-started-Modal';
import { TemplateCardFilter } from './template-card-filter';

export default function TemplateCardGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: user } = useUserProfile();

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof mockTemplates)[0] | null>(null); 

  const createResumeMutation = useMutation({ mutationFn: createResume });
  const updateTemplateMutation = useMutation({ mutationFn: updateResumeTemplate }); 

  const releaseOptions = () => {
    setIsGetStartedOpen(false);
    setIsLinkedInModalOpen(false);
  };

  const { isJDModalOpen, handleJDModal, handleJDSubmittingChange } = useJDModal({
    onRelease: releaseOptions,
  });

  const style = searchParams.get('style') || '';
  const column = searchParams.get('column') || '';
  const role = searchParams.get('role') || '';
  const color = searchParams.get('color') || '';

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchStyle = !style || template.style === style;
    const matchColumn = !column || template.layout === column;
    const matchRole = !role || template.profession.includes(role);
    const matchColor = !color || template.color === color;
    return matchStyle && matchColumn && matchRole && matchColor;
  });

  const handleScratch = async () => {
    setIsGetStartedOpen(false);
    if (!user?.isLoggedIn) getOrCreateGuestEmail();

    trackEvent('create_resume_click', {
      source: 'template_modal',
      method: 'from_scratch',
    });

    try {
      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const userName = user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Guest User';
      const title = `${userName}-Resume-${currentDate}`;

      const data = await createResumeMutation.mutateAsync({
        title,
        userInfo: { userId: user?.id ?? '' },
      });

     
      if (selectedTemplate) {
        await updateTemplateMutation.mutateAsync({
          resumeId: data.id,
          templateId: selectedTemplate.id,
        });
      }

      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  const handleUpload = () => {
    setIsGetStartedOpen(false);
    trackEvent('upload_resume_click', { source: 'template_modal' });
    router.push('/upload-resume');
  };

  const handleLinkedIn = () => {
    setIsGetStartedOpen(false);
    trackEvent('create_resume_click', { source: 'template_modal', method: 'linkedin_autofill' });
    setIsLinkedInModalOpen(true);
  };

  const handleJD = () => {
    setIsGetStartedOpen(false);
    handleJDModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <TemplateCardFilter
              key={template.id}
              template={template}
              onClick={() => {
                setSelectedTemplate(template); 
                setIsGetStartedOpen(true);
              }}
              onPreviewClick={() => setPreviewTemplate(template as unknown as Template)}
            />
          ))
        ) : (
          <div className="col-span-5 text-center text-gray-400 py-20">
            No templates found for selected filters.
          </div>
        )}
      </div>

      <PreviewModal
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onScratchClick={handleScratch}
        onUploadClick={handleUpload}
        onLinkedInClick={handleLinkedIn}
        onJDClick={handleJD}
      />

      <LinkedInModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
      />

      <JDUploadMobileModal
        isOpen={isJDModalOpen}
        onClose={() => handleJDModal(false)}
        onSubmittingChange={handleJDSubmittingChange}
      />
    </>
  );
}