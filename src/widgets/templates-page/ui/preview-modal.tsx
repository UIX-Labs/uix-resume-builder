'use client';

import { useRef, useEffect, useState } from 'react';
import { Dialog, DialogOverlay, DialogPortal } from '@shared/ui/dialog';
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
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current || !isOpen) return;

    const updateScale = () => {
      const containerWidth = containerRef.current?.clientWidth || 0;
      // Resume width is 21cm ≈ 794px at 96dpi
      const resumeWidth = 794;
      if (containerWidth > 0) {
        const calculatedScale = containerWidth / resumeWidth;
        // Apply zoom out factor to fit width while keeping it zoomed out
        setScale(calculatedScale * 0.7);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isOpen]);

  if (!template) return null;

  return (

    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-sm bg-red" />
        <DialogPrimitive.Content 
          className="max-w-[60vw] max-h-[95vh] h-full p-0 bg-white border-none overflow-hidden flex flex-col fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
          onCloseAutoFocus={(event) => {
            document.body.style.pointerEvents = '';
          }}
        >
          <div onClick={onClose} className="fixed -top-0 right-0 z-[100] cursor-pointer">
            <CloseIcon className="h-10 w-10" />
          </div>
        {/* Main Content */}
        <div ref={containerRef} className="h-full overflow-y-auto relative pb-0 mb-0">    
         <div 
            ref={previewRef} 
            className="w-full bg-white flex justify-center [&_div.mb-5]:!mb-0 [&>*]:!mb-0"
            style={{       
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                marginBottom: 0,
                paddingBottom: 0,
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

