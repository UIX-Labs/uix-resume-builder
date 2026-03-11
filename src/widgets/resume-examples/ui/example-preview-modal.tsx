'use client';

import { ResumeCreationAction, type ResumeCreationActionType } from '@entities/dashboard/types/type';
import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';
import { useExampleDetail } from '@entities/resume-example/hooks/use-example-detail';
import { useGetAllTemplates, type Template } from '@entities/template-page/api/template-data';
import { ResumeRenderer } from '@features/resume/renderer';
import { getCleanDataForRenderer } from '@/widgets/form-page-builder/lib/data-cleanup';
import ResumeCreationModal from '@widgets/dashboard/ui/resume-creation-modal';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import JDUploadMobileModal from '@widgets/dashboard/ui/jd-upload-mobile-modal';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/lib/cn';
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from '@shared/ui/dialog';
import { Button } from '@shared/ui/components/button';
import { Badge } from '@shared/ui/badge';
import { Separator } from '@shared/ui/separator';
import { X, Loader2, Check, Sparkles, Briefcase, Clock, Layout } from 'lucide-react';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

interface ExamplePreviewModalProps {
  exampleSlug: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSimilarClick?: (slug: string) => void;
}

export function ExamplePreviewModal({ exampleSlug, isOpen, onClose, onSimilarClick }: ExamplePreviewModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { data: detail, isLoading } = useExampleDetail(isOpen ? exampleSlug : null);
  const { data: allTemplates } = useGetAllTemplates();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // ─── Resume Creation Modal State (same pattern as /templates page) ───
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ResumeCreationActionType>(null);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const lockOptions = useCallback(
    (action: ResumeCreationAction.CREATE | ResumeCreationAction.UPLOAD | ResumeCreationAction.TAILORED_JD) => {
      setActiveAction(action);
      setOptionsLocked(true);
    },
    [],
  );

  const releaseOptions = useCallback(() => {
    setActiveAction(null);
    setOptionsLocked(false);
  }, []);

  const { isJDModalOpen, handleJDModal, handleJDSubmittingChange } = useJDModal({
    onRelease: releaseOptions,
  });

  // Reset template selection when a different example is opened
  useEffect(() => {
    setSelectedTemplateId(null);
  }, [exampleSlug]);

  const cleanedData = useMemo(
    () => (detail?.resumeData ? getCleanDataForRenderer(detail.resumeData) : null),
    [detail?.resumeData],
  );

  // Derive the active template JSON for the renderer
  const activeTemplate = useMemo(() => {
    if (selectedTemplateId && allTemplates) {
      const found = allTemplates.find((t) => t.id === selectedTemplateId);
      if (found) return found.json;
    }
    return detail?.template?.json ?? null;
  }, [selectedTemplateId, allTemplates, detail?.template?.json]);

  // Derive the full Template object for ResumeCreationModal
  const activeTemplateObject = useMemo<Template | null>(() => {
    const targetId = selectedTemplateId || detail?.template?.id;
    if (targetId && allTemplates) {
      return allTemplates.find((t) => t.id === targetId) ?? null;
    }
    return null;
  }, [selectedTemplateId, detail?.template?.id, allTemplates]);

  const scale = typeof window !== 'undefined' ? (window.innerWidth * 0.95) / 794 : 0.4;

  const handleUseTemplate = () => {
    setIsCreationModalOpen(true);
  };

  const handleSimilarClick = (slug: string) => {
    onSimilarClick?.(slug);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogPortal>
          <DialogOverlay className="backdrop-blur-sm" />
          <DialogPrimitive.Content
            className={cn(
              'p-4 bg-transparent border-0 shadow-none overflow-visible flex flex-col fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200',
              'w-[95vw] md:max-w-[85vw] max-h-[90vh]',
            )}
          >
            <DialogTitle className="sr-only">Resume Example Preview</DialogTitle>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2 right-4 z-[100] cursor-pointer bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div ref={containerRef} className="overflow-y-auto bg-white rounded-2xl shadow-2xl max-h-[85vh]">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : detail ? (
                <div className="flex flex-col lg:flex-row">
                  {/* Resume preview */}
                  <div className="flex-1 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
                    <div style={isMobile ? { zoom: scale, width: '794px' } : {}}>
                      <ResumeRenderer
                        template={activeTemplate}
                        data={cleanedData}
                        currentSection={undefined}
                        hasSuggestions={false}
                        isThumbnail={false}
                      />
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="w-full lg:w-[380px] flex flex-col overflow-y-auto max-h-[85vh]">
                    <div className="p-5 lg:p-6 flex flex-col gap-5">
                      {/* Category badge */}
                      {detail.category?.name && (
                        <Badge variant="secondary" className="text-xs">
                          {detail.category.name}
                        </Badge>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 leading-tight">{detail.title}</h2>

                      {/* Meta description */}
                      {detail.metaDescription && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                          {detail.metaDescription}
                        </p>
                      )}

                      {/* Metadata chips */}
                      <div className="flex flex-wrap gap-2">
                        {detail.role && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
                            <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs text-gray-600">{detail.role}</span>
                          </div>
                        )}
                        {detail.experienceYears !== null && detail.experienceYears !== undefined && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs text-gray-600">
                              {detail.experienceYears === 0 ? 'Entry level' : `${detail.experienceYears}yr exp`}
                            </span>
                          </div>
                        )}
                        {detail.colorName && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
                            <div
                              className="w-3 h-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: detail.primaryColor || '#2563EB' }}
                            />
                            <span className="text-xs text-gray-600">{detail.colorName}</span>
                          </div>
                        )}
                        {detail.layout && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
                            <Layout className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs text-gray-600">
                              {detail.layout === 'single-column' ? 'Single Column' : 'Two Column'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* CTA button — opens ResumeCreationModal */}
                      <Button
                        onClick={handleUseTemplate}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Use This Template
                        </span>
                      </Button>

                      <Separator />

                      {/* Template selector */}
                      {allTemplates && allTemplates.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">Try a different template</h3>
                          <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto pr-1">
                            {allTemplates.map((tmpl) => {
                              const isSelected = selectedTemplateId
                                ? tmpl.id === selectedTemplateId
                                : tmpl.id === detail.template?.id;
                              return (
                                <button
                                  key={tmpl.id}
                                  type="button"
                                  onClick={() => setSelectedTemplateId(tmpl.id)}
                                  className={cn(
                                    'relative rounded-lg border-2 overflow-hidden transition-all cursor-pointer group',
                                    'aspect-[3/4]',
                                    isSelected
                                      ? 'border-blue-500 shadow-sm ring-1 ring-blue-200'
                                      : 'border-gray-200 hover:border-gray-300',
                                  )}
                                >
                                  {tmpl.publicImageUrl ? (
                                    // biome-ignore lint/performance/noImgElement: dynamic template thumbnails
                                    <img
                                      src={tmpl.publicImageUrl}
                                      alt="Template preview"
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

                      {/* Similar examples */}
                      {detail.similar && detail.similar.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Similar examples</h3>
                            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                              {detail.similar.map((item) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => handleSimilarClick(item.slug)}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-left group"
                                >
                                  <div className="w-10 h-14 rounded border border-gray-200 overflow-hidden bg-gray-100 flex-shrink-0">
                                    {item.publicThumbnail?.url ? (
                                      // biome-ignore lint/performance/noImgElement: dynamic thumbnail
                                      <img
                                        src={item.publicThumbnail.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover object-top"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Layout className="w-4 h-4 text-gray-300" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                      {item.title}
                                    </p>
                                    {item.role && (
                                      <p className="text-xs text-gray-500 truncate">{item.role}</p>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-20 text-gray-500">Example not found</div>
              )}
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      {/* Resume Creation Flow Modals — same pattern as /templates page */}
      <ResumeCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onJDModalOpen={() => handleJDModal(true)}
        onLinkedInClick={() => setIsLinkedInModalOpen(true)}
        onActionLock={lockOptions}
        onActionRelease={releaseOptions}
        activeAction={activeAction}
        optionsLocked={optionsLocked}
        template={activeTemplateObject}
      />
      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />
      <JDUploadMobileModal
        isOpen={isJDModalOpen}
        onClose={() => handleJDModal(false)}
        onSubmittingChange={handleJDSubmittingChange}
      />
    </>
  );
}
