import { useGetAllResumes, useSaveResumeForm, type FormSchema } from '@entities/resume';
import { generateThumbnail, ResumeRenderer } from '@features/resume/renderer';
import aniketTemplate from '@features/resume/templates/standard';
import { TemplateForm } from '@features/template-form';
import { Button } from '@shared/ui/button';
import { useEffect, useRef } from 'react';
import { useFormPageBuilder } from '../models/ctx';
import { useFormDataStore } from '../models/store';
import { camelToHumanString } from '@shared/lib/string';
import { Resolution, usePDF } from 'react-to-pdf';
import { useParams } from 'next/navigation';
import { uploadThumbnail } from '@entities/resume/api/upload-resume';
import { useMutation } from '@tanstack/react-query';
import { useUserProfile } from '@shared/hooks/use-user';

export function FormPageBuilder({ formSchema, defaultValues }: { formSchema: FormSchema; defaultValues: any }) {
  const params = useParams();
  const resumeId = params?.id as string;

  const thumbnailGenerated = useRef(false);

  const { data: user } = useUserProfile();
  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();
  const { data: resumes, refetch: refetchResumes } = useGetAllResumes({ userId: user?.id as string });
  const { mutateAsync: uploadThumbnailMutation } = useMutation({
    mutationFn: uploadThumbnail,
  });

  const saveMutation = useSaveResumeForm();

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

  const handleDownloadPDF = () => {
    toPDF();
  };

  const { formData, setFormData } = useFormDataStore();

  useEffect(() => {
    useFormDataStore.setState({ formData: defaultValues ?? {} });
  }, [defaultValues]);

  async function generateAndSaveThumbnail() {
    if (!targetRef.current || !resumeId) {
      return;
    }

    try {
      const thumbnailDataUrl = await generateThumbnail(targetRef.current);

      if (!thumbnailDataUrl) {
        return;
      }

      await uploadThumbnailMutation({ resumeId, thumbnail: thumbnailDataUrl });

      thumbnailGenerated.current = true;
      refetchResumes();
    } catch (error) {
      console.error('Background thumbnail generation failed:', error);
    }
  }

  useEffect(() => {
    const curResume = resumes?.find((resume) => resume.id === resumeId);

    if (!curResume || curResume.publicThumbnail || thumbnailGenerated.current) {
      return;
    }

    generateAndSaveThumbnail();
  }, [resumeId, resumes]);

  async function handleNextStep() {
    handleSaveResume();
    setCurrentStep(navs[nextStepIndex]?.name ?? '');
  }

  async function handleSaveResume() {
    try {
      thumbnailGenerated.current = false;

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
        className="overflow-auto pt-4 pb-8 scroll-hidden h-[calc(100vh)] px-3"
        style={{
          minWidth: 794 + 48 + 6,
          maxWidth: 794 + 48 + 6,
        }}
      >
        <div
          className="bg-white border-[3px] border-blue-800 outline-[3px] 
                        outline-blue-400 rounded-[18px] overflow-auto w-full min-w-0 flex-1"
        >
          <div ref={targetRef} style={{ fontFamily: 'fangsong' }}>
            <ResumeRenderer template={aniketTemplate} data={{ ...formData }} />
          </div>

          <Button
            onClick={handleDownloadPDF}
            className="absolute z-[1000] top-8 left-[calc(16px+12px+794px-12px)] 
                      -translate-x-full border border-[#CBE7FF] bg-[#E9F4FF] 
                      font-semibold text-[#005FF2] hover:bg-blue-700 hover:text-white"
          >
            Save as PDF
          </Button>
        </div>
      </div>

      <div className="relative bg-white rounded-tl-[36px] rounded-bl-[36px] w-full max-h-[calc(100vh-32px)] mt-4 flex-col flex overflow-hidden px-1">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="overflow-auto py-5 px-5 gap-3 mt-4 scroll-hidden">
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

          <div className="mt-[20px] cursor-pointer z-100 relative ml-auto flex justify-end border-0">
            {navs[nextStepIndex]?.name && (
              // Secondary
              <Button
                className="mt-auto bg-[#E9F4FF] rounded-[8px] text-sm font-semibold 
                text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] mr-4"
                onClick={handleNextStep}
              >
                {`Next: ${camelToHumanString(navs[nextStepIndex]?.name)}`}
              </Button>
            )}
            <Button
              className="mt-auto bg-[#E9F4FF] rounded-[8px] text-sm font-semibold
               text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF]"
              onClick={handleSaveResume}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
