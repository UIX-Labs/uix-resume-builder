import { useSaveResumeForm, type FormSchema } from '@entities/resume';
import { ResumeRenderer } from '@features/resume/renderer';
import aniketTemplate from '@features/resume/templates/standard';
import { TemplateForm } from '@features/template-form';
import { Button } from '@shared/ui/button';
import { useEffect } from 'react';
import { useFormPageBuilder } from '../models/ctx';
import { useFormDataStore } from '../models/store';
import { camelToHumanString } from '@shared/lib/string';
import { Resolution, usePDF } from 'react-to-pdf';

export function FormPageBuilder({ formSchema, defaultValues }: { formSchema: FormSchema; defaultValues: any }) {
  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();

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

  async function handleNextStep() {
    await saveMutation.mutateAsync({
      type: currentStep,
      data: formData[currentStep],
    });

    setCurrentStep(navs[nextStepIndex]?.name ?? '');
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
              onClick={handleNextStep}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
