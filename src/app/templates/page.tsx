'use client';
import type { ResumeCreationAction, ResumeCreationActionType } from '@entities/dashboard/types/type';
import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';
import { useGetAllTemplates, type Template } from '@entities/template-page/api/template-data';
import { useTemplateFilters } from '@entities/template-page/hooks/use-template-filters';
import { filterTemplates } from '@entities/template-page/lib/filter-templates';
import { useUserProfile } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { Button } from '@shared/ui/components/button';
import { SidebarProvider } from '@shared/ui/sidebar';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import ResponsiveDashboardHeader from '@widgets/dashboard/ui/header';
import JDUploadMobileModal from '@widgets/dashboard/ui/jd-upload-mobile-modal';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import PageHeading from '@widgets/dashboard/ui/page-heading';
import ResumeCreationModal from '@widgets/dashboard/ui/resume-creation-modal';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import Header from '@widgets/landing-page/ui/header-section';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { TemplateCard, TemplateCardSkeleton } from '@widgets/templates-page/ui/template-card';
import { TemplateFilterBar } from '@widgets/templates-page/ui/template-filter-bar';
import { useRouter } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';

function TemplatesPageContent() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUserProfile();
  const { data: templates, isLoading: isTemplatesLoading } = useGetAllTemplates();
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { filters, setFilters, resetFilters, hasActiveFilters } = useTemplateFilters();

  // Resume Creation Modal State
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [creationTemplate, setCreationTemplate] = useState<Template | null>(null);
  const [activeAction, setActiveAction] = useState<ResumeCreationActionType>(null);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const isLoading = false;

  const lockOptions = (
    action: ResumeCreationAction.CREATE | ResumeCreationAction.UPLOAD | ResumeCreationAction.TAILORED_JD,
  ) => {
    setActiveAction(action);
    setOptionsLocked(true);
  };

  const releaseOptions = () => {
    setActiveAction(null);
    setOptionsLocked(false);
  };

  const { isJDModalOpen, handleJDModal, handleJDSubmittingChange } = useJDModal({
    onRelease: releaseOptions,
  });

  const handleTemplateClick = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleMobileUseTemplate = (template: Template) => {
    setCreationTemplate(template);
    setIsCreationModalOpen(true);
  };

  const filteredTemplates = useMemo(() => {
    if (!templates) return [];
    return filterTemplates(templates, filters);
  }, [templates, filters]);

  const isLoggedIn = user?.isLoggedIn;

  const loadingOverlay = isLoading && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-semibold text-gray-800">Creating Resume...</p>
        <p className="text-sm text-gray-600">Setting up your workspace</p>
      </div>
    </div>
  );

  const filterBar = templates && (
    <TemplateFilterBar
      filters={filters}
      onFilterChange={setFilters}
      onReset={resetFilters}
      hasActiveFilters={hasActiveFilters}
      templates={templates}
      resultCount={filteredTemplates.length}
    />
  );

  const filterBarDashboard = templates && (
    <TemplateFilterBar
      filters={filters}
      onFilterChange={setFilters}
      onReset={resetFilters}
      hasActiveFilters={hasActiveFilters}
      templates={templates}
      resultCount={filteredTemplates.length}
      align="start"
    />
  );

  const gridClasses = isLoggedIn
    ? 'flex items-start gap-x-[25px] gap-y-[44px] my-4 sm:my-6 justify-start flex-wrap px-4 sm:px-6'
    : 'flex items-start gap-x-[25px] gap-y-[44px] my-4 sm:my-6 mx-auto justify-center flex-wrap max-w-[1346px] px-4';

  const skeletonGrid = (
    <div className={gridClasses}>
      {Array.from({ length: 10 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no stable id
        <TemplateCardSkeleton key={i} />
      ))}
    </div>
  );

  const templateGrid = (
    <div className={gridClasses}>
      {filteredTemplates.map((template) => {
        const handleClick = () => {
          handleMobileUseTemplate(template);
        };

        const handlePreview = () => {
          handleTemplateClick(template);
        };

        const isNew = Date.now() - new Date(template.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000;

        return (
          <TemplateCard
            key={template.id}
            template={template}
            onClick={handleClick}
            onPreviewClick={handlePreview}
            isNew={isNew}
            isTrending={template.isTrending}
          />
        );
      })}
    </div>
  );

  const emptyState = hasActiveFilters && filteredTemplates.length === 0 && (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-64 h-48 mb-6 flex items-center justify-center">
        <svg className="w-48 h-48 text-gray-300" viewBox="0 0 200 200" fill="none" aria-hidden="true">
          <circle cx="100" cy="100" r="80" fill="#FEF3C7" />
          <circle cx="80" cy="90" r="30" stroke="#9CA3AF" strokeWidth="4" fill="none" />
          <line x1="102" y1="112" x2="130" y2="140" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 140 Q80 120 100 140 Q120 120 140 140" stroke="#9CA3AF" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        We <span className="text-red-500">couldn&apos;t</span> find that.
      </h3>
      <p className="text-gray-500 text-center">No results matched your search. Please change the filters.</p>
    </div>
  );

  const modals = (
    <>
      <PreviewModal template={previewTemplate} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
      <ResumeCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onJDModalOpen={() => handleJDModal(true)}
        onLinkedInClick={() => setIsLinkedInModalOpen(true)}
        onActionLock={lockOptions}
        onActionRelease={releaseOptions}
        activeAction={activeAction}
        optionsLocked={optionsLocked}
        template={creationTemplate}
      />
      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />
      <JDUploadMobileModal
        isOpen={isJDModalOpen}
        onClose={() => handleJDModal(false)}
        onSubmittingChange={handleJDSubmittingChange}
      />
    </>
  );

  // Public / SEO layout (not logged in)
  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen bg-white">
        {loadingOverlay}
        <Header />

        {/* Body container — Figma: W 1384, radius 36, fill #F5F8FA, stroke #D5E5FF inside 3px */}
        <div className="relative max-w-[1384px] mx-4 sm:mx-auto mt-0 rounded-[36px] border-[3px] border-[#D5E5FF] bg-[#F5F8FA] overflow-hidden pb-10">
          {/* Dot pattern background — per Figma "Dot bg" at 12% opacity */}
          <div className="dot-pattern-bg absolute inset-0 z-0" />

          <div className="relative z-10">
            {/* Hero + Filters — narrower container per Figma W 1112 */}
            <div className="max-w-[1112px] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Hero section */}
              <div className="text-center py-10 sm:py-14">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  Your Resume, <em className="not-italic font-bold text-blue-600">But Better</em>
                </h1>
                <p className="mt-3 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
                  Choose from free and premium templates, customise with our intuitive drag-and-drop builder, and
                  download your resume as a polished PDF in minutes.
                </p>
                <div className="flex flex-row items-center justify-center gap-3 mt-6">
                  <Button
                    onClick={() => {
                      setIsLinkedInModalOpen(true);
                      trackEvent('create_resume_click', { source: 'templates_hero', method: 'linkedin_autofill' });
                    }}
                    className="bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white px-3 sm:px-6 py-2 sm:py-3 
               h-10 sm:h-12 
               text-[12px] sm:text-base 
               rounded-xl cursor-pointer whitespace-nowrap"
                  >
                    Auto-fill via LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      trackEvent('create_resume_click', { source: 'templates_hero', method: 'upload_existing' });
                      router.push('/dashboard?action=upload');
                    }}
                    className="px-3 sm:px-6 py-2 sm:py-3 
               h-10 sm:h-12 
               text-[12px] sm:text-base 
               rounded-xl cursor-pointer whitespace-nowrap"
                  >
                    Upload Existing Resume
                  </Button>
                </div>
              </div>

              {/* Filter bar — Figma: mb ~44px gap to grid */}
              <div className="mb-10">{filterBar}</div>
            </div>

            {/* Template grid — wider container per Figma W 1346, 5 cards per row, gap 44 between rows */}
            {isTemplatesLoading ? skeletonGrid : filteredTemplates.length > 0 ? templateGrid : emptyState}
          </div>
        </div>
        {modals}
      </div>
    );
  }

  // Dashboard layout (logged in)
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-[#F5F8FA] relative">
        {loadingOverlay}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <ResponsiveDashboardHeader user={user} />

          <main className="flex flex-col md:flex-row bg-dashboard-bg mt-3 rounded-[36px] overflow-hidden pb-4">
            <div className="flex-1">
              <PageHeading title="TEMPLATES" />

              <WelcomeHeader
                userName={isUserLoading ? '...' : user ? `${user.firstName} ${user.lastName ?? ''}` : 'Guest User'}
              />

              {/* Filter bar */}
              <div className="mx-4 sm:mx-6 mt-4">{filterBarDashboard}</div>

              {/* Template grid or empty state */}
              {isTemplatesLoading ? skeletonGrid : filteredTemplates.length > 0 ? templateGrid : emptyState}
            </div>
          </main>
        </div>
      </div>
      {modals}
    </SidebarProvider>
  );
}

export default function GetAllResumesPage() {
  return (
    <Suspense>
      <TemplatesPageContent />
    </Suspense>
  );
}
