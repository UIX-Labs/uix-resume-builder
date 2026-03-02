'use client';

import type { ResumeExampleDetail, ResumeExampleListItem } from '@entities/resume-example/types';
import { useExampleDetail } from '@entities/resume-example/hooks/use-example-detail';
import { useCloneExample } from '@entities/resume-example/hooks/use-clone-example';
import { ResumeRenderer } from '@features/resume/renderer';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/lib/cn';
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from '@shared/ui/dialog';
import { Button } from '@shared/ui/components/button';
import { X, Loader2 } from 'lucide-react';
import { useRef } from 'react';
import { SimilarResumes } from './similar-resumes';

interface ExamplePreviewModalProps {
  exampleSlug: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectSimilar: (example: ResumeExampleListItem) => void;
}

export function ExamplePreviewModal({ exampleSlug, isOpen, onClose, onSelectSimilar }: ExamplePreviewModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { data: detail, isLoading } = useExampleDetail(isOpen ? exampleSlug : null);
  const cloneMutation = useCloneExample();

  const scale = typeof window !== 'undefined' ? (window.innerWidth * 0.95) / 794 : 0.4;

  const handleClone = () => {
    if (!detail) return;
    cloneMutation.mutate(detail.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            'p-4 bg-transparent border-0 shadow-none overflow-visible flex flex-col fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200',
            'w-[95vw] md:max-w-[80vw] max-h-[90vh]',
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
                <div className="flex-1 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                  <div style={isMobile ? { zoom: scale, width: '794px' } : {}}>
                    <ResumeRenderer
                      template={detail.template?.json}
                      data={detail.resumeData}
                      currentSection={undefined}
                      hasSuggestions={false}
                      isThumbnail={false}
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[340px] p-4 lg:p-6 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{detail.title}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-500">{detail.role}</span>
                    {detail.experienceYears !== null && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span className="text-sm text-gray-500">
                          {detail.experienceYears === 0 ? 'No experience' : `${detail.experienceYears} years exp.`}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{
                        backgroundColor: detail.primaryColor || '#2563EB',
                      }}
                    />
                    <span className="text-sm text-gray-500">
                      {detail.colorName} | {detail.layout === 'single-column' ? 'Single Column' : 'Two Column'}
                    </span>
                  </div>

                  <Button
                    onClick={handleClone}
                    disabled={cloneMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl mb-4"
                  >
                    {cloneMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </span>
                    ) : (
                      'Start building your own resume'
                    )}
                  </Button>

                  {/* Similar resumes */}
                  {detail.similar?.length > 0 && (
                    <SimilarResumes examples={detail.similar} onSelect={onSelectSimilar} />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-20 text-gray-500">Example not found</div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
