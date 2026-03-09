'use client';

import type { Template } from '@entities/template-page/api/template-data';
import { ResumeRenderer } from '@features/resume/renderer';
import template1 from '@features/resume/templates/template1';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/lib/cn';
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from '@shared/ui/dialog';
import Image from 'next/image';
import { useRef } from 'react';
import mockData from '../../../../mock-data.json';
import { CloseIcon } from '../../../shared/icons/close-icon';

interface PreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  resumeData?: any;
}

export function PreviewModal({ template, isOpen, onClose, resumeData }: PreviewModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scale = typeof window !== 'undefined' ? (window.innerWidth * 0.95) / 794 : 0.4;

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const activeTemplate = template || {
    id: 'default-template-1',
    json: template1,
    publicImageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const showImage = !resumeData && activeTemplate.publicImageUrl;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            'p-4 bg-transparent border-0 shadow-none overflow-visible flex flex-col items-center fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200',
            'w-[95vw] md:max-w-[60vw] max-h-[90vh]',
          )}
        >
          <DialogTitle className="sr-only">Resume Preview</DialogTitle>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-4 md:right-5 md:top-1 z-[100] cursor-pointer bg-white rounded-full p-0 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <CloseIcon className="h-6 w-6 md:h-10 md:w-10" />
          </button>

          {showImage ? (
            <div className="relative w-full h-full overflow-y-auto flex justify-center">
              <Image
                src={activeTemplate.publicImageUrl}
                alt={`Template ${activeTemplate.id} preview`}
                width={794}
                height={1123}
                className="object-contain rounded-lg shadow-2xl"
                unoptimized
              />
            </div>
          ) : (
            <div ref={containerRef} className="h-full overflow-y-auto">
              <div
                key={activeTemplate.id}
                style={
                  isMobile
                    ? {
                        zoom: scale,
                        width: '794px',
                      }
                    : {}
                }
              >
                <ResumeRenderer
                  template={activeTemplate.json}
                  data={resumeData || mockData}
                  currentSection={undefined}
                  hasSuggestions={false}
                  isThumbnail={false}
                />
              </div>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
