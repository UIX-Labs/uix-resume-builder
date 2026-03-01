'use client';

import { useCallback, useState } from 'react';
import type { ResumeDataKey } from '@entities/resume';
import { data as formSchemaData } from '@entities/resume/api/schema-data';
import { MobileForm } from '@features/template-form/ui/mobile-form';
import { MobileFooter } from '@widgets/form-page-builder/ui/mobile-footer';
import { MobileSectionList } from '@widgets/form-page-builder/ui/mobile-section-list';
import { MobileTemplateButton } from '@shared/ui/components/mobile-template-button';
import { TemplatesDialog } from '@widgets/templates-page/ui/templates-dialog';
import Header from '@widgets/landing-page/ui/header-section';
import { useQueryClient } from '@tanstack/react-query';
import { useBuilderActions, useBuilderState } from '../../models/builder-context';
import { HiddenRenderers } from '../hidden-renderers';
import { ModalsContainer } from '../modal/modals-container';

export function MobileBuilder() {
  const { currentStep, formData, resumeId, navs, isGeneratingPDF, selectedTemplateId, user } = useBuilderState();
  const {
    setCurrentStep,
    setFormData,
    handleSaveResume,
    handleDownloadPDF,
    handleTemplateSelect,
    handleOpenAnalyzerModal,
    handleToggleHideSection,
    setIsPreviewModalOpen,
  } = useBuilderActions();

  const queryClient = useQueryClient();

  // Mobile-specific local navigation state
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  const handleMobileStepClick = useCallback(
    (step: ResumeDataKey) => {
      setCurrentStep(step);
      setIsMobileFormOpen(true);
    },
    [setCurrentStep],
  );

  const handleMobileFormClose = useCallback(() => {
    setIsMobileFormOpen(false);
  }, []);

  const handleMobileSave = useCallback(() => {
    handleSaveResume();
  }, [handleSaveResume]);

  const handleMobileNext = useCallback(() => {
    const currentIndex = navs.findIndex((nav) => nav.name === currentStep);
    if (currentIndex < navs.length - 1) {
      setCurrentStep(navs[currentIndex + 1].name as ResumeDataKey);
    } else {
      setIsMobileFormOpen(false);
    }
  }, [currentStep, navs, setCurrentStep]);

  const handleMobileBack = useCallback(() => {
    const currentIndex = navs.findIndex((nav) => nav.name === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(navs[currentIndex - 1].name as ResumeDataKey);
    }
  }, [currentStep, navs, setCurrentStep]);

  const handleMobileBackToResume = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['resume', resumeId] });
    window.history.back();
  }, [queryClient, resumeId]);

  const currentMobileIndex = navs.findIndex((nav) => nav.name === currentStep);
  const hasNext = currentMobileIndex < navs.length - 1;
  const hasPrevious = currentMobileIndex > 0;

  return (
    <>
      <HiddenRenderers />

      <div className="flex flex-col min-h-screen bg-white overflow-hidden">
        <Header />

        <MobileSectionList
          navs={navs}
          formData={formData ?? {}}
          formSchema={formSchemaData ?? {}}
          onSectionClick={handleMobileStepClick}
          onBackClick={handleMobileBackToResume}
          onToggleHideSection={handleToggleHideSection}
        />

        <MobileFooter
          onDownloadPDF={handleDownloadPDF}
          onPreview={() => setIsPreviewModalOpen(true)}
          isGeneratingPDF={isGeneratingPDF}
          downloadsLeft={user?.downloadsLeft ?? 3}
          downloadsAllowed={user?.downloadsAllowed ?? 3}
          isLoggedIn={!!user}
        >
          <TemplatesDialog onTemplateSelect={handleTemplateSelect} currentTemplateId={selectedTemplateId}>
            <MobileTemplateButton />
          </TemplatesDialog>
        </MobileFooter>

        <MobileForm
          formSchema={formSchemaData ?? {}}
          values={formData ?? {}}
          onChange={(data) => setFormData(data)}
          currentStep={currentStep}
          isOpen={isMobileFormOpen}
          onClose={handleMobileFormClose}
          onNext={handleMobileNext}
          onBack={handleMobileBack}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onOpenAnalyzerModal={handleOpenAnalyzerModal}
          onSave={handleMobileSave}
        />
      </div>

      <ModalsContainer />
    </>
  );
}
