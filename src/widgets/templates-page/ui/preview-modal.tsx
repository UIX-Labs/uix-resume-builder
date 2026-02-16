'use client';

import type { Template } from '@entities/template-page/api/template-data';
import { ResumeRenderer } from '@features/resume/renderer';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/lib/cn';
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from '@shared/ui/dialog';
import { useRef } from 'react';
import mockData from '../../../../mock-data.json';
import { CloseIcon } from '../../../shared/icons/close-icon';
import template1 from '@features/resume/templates/template1';

interface PreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  resumeData?: any;
}

export function PreviewModal({ template, isOpen, onClose, resumeData }: PreviewModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleClose = () => {
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  const activeTemplate = template || {
    id: 'default-template-1',
    json: template1,
    publicImageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            'h-full p-4 bg-transparent border-0 shadow-none overflow-visible flex flex-col fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200',
            'w-[95vw] md:max-w-[60vw] mt-6',
          )}
        >
          <DialogTitle className="sr-only">Resume Preview</DialogTitle>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2 right-4 md:right-5 md:top-1 z-[100] cursor-pointer bg-white rounded-full p-0 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <CloseIcon className="h-6 w-6 md:h-10 md:w-10" />
          </button>
          <div ref={containerRef} className="h-full overflow-y-auto relative pt-0 pb-0">
            <div
              className="flex flex-col items-center [&>div]:border-b-2 [&>div]:border-gray-300 [&>div:last-child]:border-b-0"
              style={{
                transformOrigin: 'top center',
                width: '100%',
                transform: isMobile ? 'scale(0.4)' : 'none',
              }}
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
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
