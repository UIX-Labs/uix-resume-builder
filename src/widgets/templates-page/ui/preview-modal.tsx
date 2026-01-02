'use client';

import { useRef, useEffect, useState } from 'react';
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from '@shared/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ResumeRenderer } from '@features/resume/renderer';
import { type Template } from '@entities/template-page/api/template-data';
import mockData from '../../../../mock-data.json';
import { CloseIcon } from '../../../shared/icons/close-icon';

interface PreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  resumeData?: any; // Optional resume data, defaults to mockData if not provided
}

export function PreviewModal({ template, isOpen, onClose, resumeData }: PreviewModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-sm" />
        <DialogPrimitive.Content className="max-w-[60vw] h-full p-4 mt-6 bg-transparent border-0 shadow-none overflow-visible flex flex-col fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
          <DialogTitle className="sr-only">Resume Preview</DialogTitle>
          <div
            onClick={onClose}
            className="absolute top-2 right-2 z-[100] cursor-pointer bg-white rounded-full p-0 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <CloseIcon className="h-10 w-10" />
          </div>
          <div ref={containerRef} className="h-full overflow-y-auto relative pt-0 pb-0 bg-white">
            <div
              className="flex flex-col items-center [&>div]:border-b-2 [&>div]:border-gray-300 [&>div:last-child]:border-b-0"
              style={{
                transformOrigin: 'top center',
                width: '100%',
              }}
            >
              <ResumeRenderer
                template={template.json}
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
