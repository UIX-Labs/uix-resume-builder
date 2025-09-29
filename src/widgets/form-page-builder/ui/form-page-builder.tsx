import type { FormSchema } from '@entities/resume';
import { ResumeRenderer, generateThumbnail } from '@features/resume/renderer';
import aniketTemplate from '@features/resume/templates/standard';
import { TemplateForm } from '@features/template-form';
import { Button } from '@shared/ui/button';
import { useEffect, useRef, useCallback } from 'react';
import { useFormPageBuilder } from '../models/ctx';
import { useFormDataStore } from '../models/store';
import { camelToHumanString } from '@shared/lib/string';
import { saveFormData } from '@entities/resume/api';
import { useMutation } from '@tanstack/react-query';
import { Resolution, usePDF } from 'react-to-pdf';
import { useParams } from 'next/navigation';
import { uploadThumbnail } from '@entities/resume/api/upload-resume';

export function FormPageBuilder({ formSchema, defaultValues }: { formSchema: FormSchema; defaultValues: any }) {
  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();
  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf',
    resolution: Resolution.EXTREME,
    overrides: {
      pdf: {
        unit: 'px',
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  const params = useParams();
  const resumeId = params?.id as string;

  const handleDownloadPDF = () => {
    toPDF();
  };

  const formData = useFormDataStore((state) => state.formData);
  const setFormData = useFormDataStore((state) => state.setFormData);

  const saveMutation = useMutation({
    mutationFn: saveFormData,
  });

  useEffect(() => {
    useFormDataStore.setState({ formData: defaultValues ?? {} });
  }, [defaultValues]);

  const hasGeneratedThumbnail = useRef(false);

  async function generateAndSaveThumbnail() {
    if (!targetRef.current || !resumeId) {
      return;
    }

    try {
      const thumbnailDataUrl = await generateThumbnail(targetRef.current);
      console.log(thumbnailDataUrl)
      if (thumbnailDataUrl) {
        await uploadThumbnail({ resumeId, thumbnail: thumbnailDataUrl });
      } 
    } catch (error) {
      console.error('Background thumbnail generation failed:', error);
    }
  }

  useEffect(() => {
    if (!hasGeneratedThumbnail.current) {
      hasGeneratedThumbnail.current = true;
      setTimeout(() => {
        generateAndSaveThumbnail();
      }, 500);
    }
  }, [resumeId]);

  async function handleNextStep() {
      await saveMutation.mutateAsync({
        type: currentStep,
        data: formData[currentStep],
      });
      setCurrentStep(navs[nextStepIndex]?.name ?? '');
  }

  async function handleSaveResume() {
    try {
      await saveMutation.mutateAsync({
        type: currentStep,
        data: formData[currentStep],
      });

      await generateAndSaveThumbnail();
    } catch (error) {
      console.error('Failed to save resume:', error);
    }
  }

  const nextStepIndex = navs.findIndex((item) => item.name === currentStep) + 1;

  return (
    <>
      <div
        className="overflow-auto pt-4 pb-8 scroll-hidden h-[calc(100vh)] px-6"
        style={{
          minWidth: 794 + 48 + 6,
          maxWidth: 794 + 48 + 6,
        }}
      >
        <div className="bg-white border-[3px] border-blue-800 outline-[3px] outline-blue-400 rounded-[18px] overflow-auto w-full min-w-0 flex-1">
          <div ref={targetRef} style={{ fontFamily: 'fangsong' }}>
            <ResumeRenderer template={aniketTemplate} data={{ ...formData }} />
          </div>

          <Button
            onClick={handleDownloadPDF}
            className="absolute z-[1000] top-8 left-[calc(16px+12px+794px-12px)] -translate-x-full border border-[#CBE7FF] bg-[#E9F4FF] font-semibold text-[#005FF2] hover:bg-blue-700 hover:text-white"
          >
            Save as PDF
          </Button>
        </div>
      </div>

      <div className="relative flex bg-white rounded-tl-[36px] rounded-bl-[36px] max-h-[calc(100vh-32px)] overflow-y-auto pt-5 px-5 gap-3 mt-4 w-full">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="flex-1 h-full max-h-[calc(100vh-32px)] overflow-y-auto pb-5">
          {/* <div className="flex justify-end items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/images/circle-alert.svg" alt="circle-alert" width={16} height={16} />
              <span className="text-[13px] font-regular text-[#E12121]">Sign In to save progress</span>
            </div>
            <Button className="border border-[#CBE7FF] bg-[#E9F4FF] text-[18px] font-semibold text-[#005FF2] h-12">
              Sign In
            </Button>
          </div> */}

          <div
            className="mt-6 mb-4"
            style={{
              background: 'linear-gradient(90deg, rgba(23, 23, 23, 0) 0%, #B8B8B8 51.09%)',
              height: '1px',
              width: '100%',
            }}
          />

          <TemplateForm
            formSchema={formSchema ?? {}}
            currentStep={currentStep}
            values={formData ?? {}}
            onChange={(formData) => setFormData(formData)}
          />

          <div className="mt-[20px] cursor-pointer z-100 relative ml-auto flex">
            <Button
              className="mt-auto ml-auto bg-[#E9F4FF] w-[247px] h-[48px] rounded-[8px] text-sm font-semibold text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF]"
              disabled={saveMutation.isPending}
              onClick={navs[nextStepIndex] ? handleNextStep : handleSaveResume}
            >
              {saveMutation.isPending
                ? 'Saving...'
                : navs[nextStepIndex]?.name
                  ? `Next: ${camelToHumanString(navs[nextStepIndex]?.name)}`
                  : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
