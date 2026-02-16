'use client';

import type { FormSchema, ResumeData, ResumeDataKey } from '@entities/resume';
import { cn } from '@shared/lib/cn';
import { Button } from '@shared/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';
import { TemplateForm } from './index';

interface MobileFormProps {
  formSchema: FormSchema | {};
  values: Omit<ResumeData, 'templateId'>;
  onChange: (data: Omit<ResumeData, 'templateId'>) => void;
  currentStep: ResumeDataKey;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onBack?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onOpenAnalyzerModal?: (itemId: string, fieldName: string, suggestionType: any) => void;
  onSave?: () => void;
}

export function MobileForm({
  formSchema,
  values,
  onChange,
  currentStep,
  isOpen,
  onClose,
  onNext,
  onBack,
  hasNext,
  hasPrevious,
  onOpenAnalyzerModal,
  onSave,
}: MobileFormProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const currentData = values[currentStep];
  const currentSchema = formSchema?.[currentStep];

  if (!currentSchema || !currentData || typeof currentData === 'string' || !('items' in currentData)) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-white transition-transform duration-300 flex flex-col',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <div className="sticky top-0 bg-[#F5F8FA] shadow-sm z-10">
        <div className="flex items-center gap-3 px-4 py-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="flex-shrink-0 -ml-2 rounded-full h-10 w-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Button>
          <div className="flex-1">
            <h2 className="text-base font-medium text-[#6B7280]">Back to Resume</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden w-full bg-[#F5F8FA] px-4 py-6">
        <div
          className="relative rounded-[36px] shadow-sm px-4 py-6 bg-white"
          style={{
            backgroundImage: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div className="pb-4">
            <h1 className="text-xl font-bold text-[#111827]">{currentSchema?.label}</h1>
            {currentSchema?.subTitle && <p className="text-xs text-[#6B7280] mt-1 w-full">{currentSchema?.subTitle}</p>}
          </div>
          <TemplateForm
            formSchema={formSchema}
            values={values}
            onChange={onChange}
            currentStep={currentStep}
            onOpenAnalyzerModal={onOpenAnalyzerModal}
            isMobile
          />
        </div>
      </div>

      <div className="sticky bottom-0 bg-[#F5F8FA] shadow-sm px-4 py-2 rounded-xl">
        <Button
          type="button"
          onClick={onSave}
          className="w-full h-12 text-base font-semibold rounded-xl border border-[#CBE7FF] bg-[#E9F4FF] hover:bg-[#2563EB] text-[#005FF2]"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
