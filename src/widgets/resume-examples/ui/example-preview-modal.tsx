'use client';

import { ResumeCreationAction, type ResumeCreationActionType } from '@entities/dashboard/types/type';
import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';
import { useExampleDetail } from '@entities/resume-example/hooks/use-example-detail';
import type { ResumeExampleListItem } from '@entities/resume-example/types';
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
import { CloseIcon } from '@/shared/icons/close-icon';
import {
  Check,
  Sparkles,
  Briefcase,
  Clock,
  Layout,
  AlertCircle,
  Palette,
} from 'lucide-react';
import { useMemo, useState, useEffect, useCallback } from 'react';

/* ─────────────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────────────── */
const HIDE_SCROLLBAR = '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';

/* ─────────────────────────────────────────────────────
   Skeleton
   ───────────────────────────────────────────────────── */
function ModalSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row h-[85vh] lg:h-[82vh] animate-pulse">
      <div className="flex-1 bg-[#f8f9fb] p-8 flex items-start justify-center">
        <div className="w-full max-w-[560px] aspect-[794/1123] rounded-lg bg-white shadow-md" />
      </div>
      <div className="w-full lg:w-[380px] p-6 space-y-5 border-l border-gray-100">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
          <div className="h-5 w-20 bg-gray-100 rounded-full" />
        </div>
        <div className="h-7 w-4/5 bg-gray-100 rounded" />
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-gray-50 rounded" />
          <div className="h-3.5 w-2/3 bg-gray-50 rounded" />
        </div>
        <div className="h-11 w-full bg-blue-50 rounded-xl mt-1" />
        <div className="h-px bg-gray-100 mt-4" />
        <div className="grid grid-cols-4 gap-2 pt-2">
          {Array.from({ length: 8 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <div key={i} className="aspect-[3/4] bg-gray-50 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Template thumbnail (grid item)
   ───────────────────────────────────────────────────── */
function TemplateThumbnail({
  imageUrl,
  isSelected,
  isDefault,
  onClick,
}: {
  imageUrl: string;
  isSelected: boolean;
  isDefault: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer',
        'border border-gray-200 bg-gray-50',
        'transition-shadow duration-150',
        'hover:shadow-md',
        // Outline for selection — does NOT affect layout (unlike border/ring)
        isSelected
          ? 'outline-[2.5px] outline-blue-500 outline-offset-[1.5px] shadow-md'
          : 'outline-0',
      )}
    >
      {imageUrl ? (
        // biome-ignore lint/performance/noImgElement: dynamic images
        <img src={imageUrl} alt="Template" className="w-full h-full object-cover object-top" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Layout className="w-4 h-4 text-gray-300" />
        </div>
      )}

      {/* Selected check badge */}
      {isSelected && (
        <div className="absolute bottom-1 right-1">
          <div className="bg-blue-500 rounded-full p-[3px] shadow">
            <Check className="w-2 h-2 text-white" strokeWidth={3} />
          </div>
        </div>
      )}

      {/* Default label — only when not the currently selected one */}
      {isDefault && !isSelected && (
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <span className="text-[6px] font-bold uppercase tracking-wider bg-gray-700/80 text-white px-1.5 py-px rounded-b-sm">
            Default
          </span>
        </div>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────
   Similar example row
   ───────────────────────────────────────────────────── */
function SimilarRow({ example, onClick }: { example: ResumeExampleListItem; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 w-full p-2 rounded-xl text-left cursor-pointer',
        'hover:bg-gray-50 transition-colors duration-150',
        'group/row',
      )}
    >
      {/* Mini thumbnail */}
      <div className="w-10 h-13 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
        {example.publicThumbnail?.url || example.templateImageUrl ? (
          // biome-ignore lint/performance/noImgElement: dynamic image
          <img
            src={example.publicThumbnail?.url || example.templateImageUrl!}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: example.primaryColor || '#2563EB' }}
          >
            <span className="text-white text-[8px] font-bold">{example.title.charAt(0)}</span>
          </div>
        )}
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-gray-800 line-clamp-1 group-hover/row:text-blue-600 transition-colors">
          {example.title}
        </p>
        {example.role && (
          <p className="text-[11px] text-gray-400 line-clamp-1">{example.role}</p>
        )}
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────── */

interface ExamplePreviewModalProps {
  exampleSlug: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExamplePreviewModal({ exampleSlug, isOpen, onClose }: ExamplePreviewModalProps) {
  const isMobile = useIsMobile();

  /* ── In-modal navigation ── */
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const currentSlug = activeSlug ?? exampleSlug;

  const { data: detail, isLoading, error, refetch } = useExampleDetail(isOpen ? currentSlug : null);
  const { data: allTemplates } = useGetAllTemplates();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  /* ── Resume-creation flow ── */
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
  const { isJDModalOpen, handleJDModal, handleJDSubmittingChange } = useJDModal({ onRelease: releaseOptions });

  /* ── Resets ── */
  useEffect(() => {
    setActiveSlug(null);
    setSelectedTemplateId(null);
  }, [exampleSlug]);

  useEffect(() => {
    setSelectedTemplateId(null);
  }, [activeSlug]);

  /* ── Derived data ── */
  const cleanedData = useMemo(
    () => (detail?.resumeData ? getCleanDataForRenderer(detail.resumeData) : null),
    [detail?.resumeData],
  );

  const activeTemplate = useMemo(() => {
    if (selectedTemplateId && allTemplates) {
      const found = allTemplates.find((t) => t.id === selectedTemplateId);
      if (found) return found.json;
    }
    return detail?.template?.json ?? null;
  }, [selectedTemplateId, allTemplates, detail?.template?.json]);

  const activeTemplateObject = useMemo<Template | null>(() => {
    const targetId = selectedTemplateId || detail?.template?.id;
    if (targetId && allTemplates) return allTemplates.find((t) => t.id === targetId) ?? null;
    return null;
  }, [selectedTemplateId, detail?.template?.id, allTemplates]);

  const sortedTemplates = useMemo(() => {
    if (!allTemplates) return [];
    const defaultId = detail?.template?.id;
    return [...allTemplates].sort((a, b) => {
      if (a.id === defaultId) return -1;
      if (b.id === defaultId) return 1;
      return 0;
    });
  }, [allTemplates, detail?.template?.id]);

  const mobileScale = typeof window !== 'undefined' ? (window.innerWidth * 0.92) / 794 : 0.4;

  const handleUseTemplate = useCallback(() => setIsCreationModalOpen(true), []);
  const handleSimilarClick = useCallback((slug: string) => setActiveSlug(slug), []);

  /* ── Metadata line ── */
  const metaParts: string[] = useMemo(() => {
    const parts: string[] = [];
    if (detail?.role) parts.push(detail.role);
    if (detail?.experienceYears !== null && detail?.experienceYears !== undefined) {
      parts.push(detail.experienceYears === 0 ? 'Entry level' : `${detail.experienceYears}yr exp`);
    }
    if (detail?.layout) {
      parts.push(detail.layout === 'single-column' ? 'Single Column' : 'Two Column');
    }
    return parts;
  }, [detail?.role, detail?.experienceYears, detail?.layout]);

  /* ── Render ── */
  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogPortal>
          <DialogOverlay className="backdrop-blur-md bg-black/45" />

          <DialogPrimitive.Content
            className={cn(
              'fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
              'bg-transparent border-0 shadow-none overflow-visible outline-none',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'duration-200',
              'w-[95vw] md:w-[92vw] lg:max-w-[1100px]',
            )}
          >
            <DialogTitle className="sr-only">Resume Example Preview</DialogTitle>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-3 -right-3 z-[100] cursor-pointer transition-transform duration-150 hover:scale-110"
            >
              <CloseIcon className="w-10 h-10 md:w-11 md:h-11 drop-shadow-md" />
            </button>

            {/* ── Modal Card ── */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[88vh]">
              {error ? (
                /* ─── Error ─── */
                <div className="flex flex-col items-center justify-center py-24 px-6">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <AlertCircle className="w-7 h-7 text-red-400" />
                  </div>
                  <p className="text-gray-900 font-semibold text-lg mb-1">Something went wrong</p>
                  <p className="text-sm text-gray-400 mb-5">We couldn&apos;t load this example.</p>
                  <Button variant="outline" onClick={() => refetch()} className="rounded-xl cursor-pointer">
                    Try again
                  </Button>
                </div>
              ) : isLoading ? (
                <ModalSkeleton />
              ) : detail ? (
                /* ─── Content ─── */
                <div className="flex flex-col lg:flex-row max-h-[88vh]">

                  {/* ═══════════ Left: Resume ═══════════ */}
                  <div
                    className={cn(
                      'flex-1 relative overflow-y-auto',
                      HIDE_SCROLLBAR,
                      'bg-[#f8f9fb] p-5 lg:p-8',
                    )}
                  >
                    <div
                      className="relative mx-auto bg-white overflow-hidden rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]"
                      style={{
                        zoom: isMobile ? mobileScale : 0.7,
                        width: '794px',
                        transformOrigin: 'top center',
                      }}
                    >
                      <ResumeRenderer
                        template={activeTemplate}
                        data={cleanedData}
                        currentSection={undefined}
                        hasSuggestions={false}
                        isThumbnail={false}
                      />
                    </div>
                  </div>

                  {/* ═══════════ Right: Sidebar ═══════════ */}
                  <div
                    className={cn(
                      'w-full lg:w-[380px] flex-shrink-0 flex flex-col',
                      'border-t lg:border-t-0 lg:border-l border-gray-100',
                      'max-h-[88vh] bg-white',
                    )}
                  >
                    <div className={cn('flex-1 overflow-y-auto', HIDE_SCROLLBAR)}>

                      {/* ── Info ── */}
                      <div className="px-6 pt-6 pb-5 space-y-3">
                        {/* Category badges */}
                        {(detail.categories?.length > 0 || detail.category?.name) && (
                          <div className="flex flex-wrap gap-1.5">
                            {(detail.categories?.length > 0
                              ? detail.categories
                              : detail.category?.name
                                ? [detail.category]
                                : []
                            ).map((cat) => (
                              <span
                                key={cat.slug}
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100"
                              >
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 leading-snug">
                          {detail.title}
                        </h2>

                        {/* Inline metadata */}
                        {metaParts.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap text-[12px] text-gray-400">
                            {metaParts.map((part, i) => (
                              <span key={part} className="flex items-center gap-1.5">
                                {i > 0 && <span className="text-gray-200">·</span>}
                                {part}
                              </span>
                            ))}
                            {detail.colorName && (
                              <>
                                <span className="text-gray-200">·</span>
                                <span className="flex items-center gap-1">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full ring-1 ring-gray-200 inline-block"
                                    style={{ backgroundColor: detail.primaryColor || '#2563EB' }}
                                  />
                                  {detail.colorName}
                                </span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Description */}
                        {detail.metaDescription && (
                          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">
                            {detail.metaDescription}
                          </p>
                        )}

                        {/* CTA */}
                        <Button
                          onClick={handleUseTemplate}
                          className={cn(
                            'w-full h-11 rounded-xl cursor-pointer font-semibold text-sm mt-1',
                            'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white',
                            'shadow-[0_4px_14px_rgba(0,95,242,0.25)]',
                            'transition-all duration-150 active:scale-[0.98]',
                          )}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Use This Template
                        </Button>
                      </div>

                      {/* ── Templates section ── */}
                      {sortedTemplates.length > 0 && (
                        <div className="mx-5 rounded-xl bg-gray-50/70 border border-gray-100 p-4 mb-4">
                          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Change Template
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {sortedTemplates.map((tmpl) => {
                              const isDefault = tmpl.id === detail.template?.id;
                              const isSelected = selectedTemplateId
                                ? tmpl.id === selectedTemplateId
                                : isDefault;
                              return (
                                <TemplateThumbnail
                                  key={tmpl.id}
                                  imageUrl={tmpl.publicImageUrl}
                                  isSelected={isSelected}
                                  isDefault={isDefault}
                                  onClick={() => setSelectedTemplateId(tmpl.id)}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* ── Similar examples section ── */}
                      {detail.similar && detail.similar.length > 0 && (
                        <div className="mx-5 rounded-xl bg-gray-50/70 border border-gray-100 p-4 mb-5">
                          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Similar Examples
                          </p>
                          <div className="space-y-0.5">
                            {detail.similar.map((s) => (
                              <SimilarRow
                                key={s.id}
                                example={s}
                                onClick={() => handleSimilarClick(s.slug)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* ─── Not found ─── */
                <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <AlertCircle className="w-7 h-7 text-gray-300" />
                  </div>
                  <p className="font-semibold text-gray-800">Example not found</p>
                  <p className="text-sm mt-1 text-gray-400">This resume example may have been removed.</p>
                </div>
              )}
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      {/* Resume Creation Flow */}
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
