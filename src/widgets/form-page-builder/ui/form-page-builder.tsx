import type { FormSchema } from '@entities/resume';
import { ResumeRenderer } from '@features/resume/renderer';
import { aniketSampleData } from '@features/resume/sample-data-aniket';
import aniketTemplate from '@features/resume/templates/aniket';
import { TemplateForm } from '@features/template-form';
import { Button } from '@shared/ui/button';
import { useEffect } from 'react';
import { useFormPageBuilder } from '../models/ctx';
import { useFormDataStore } from '../models/store';
import { camelToHumanString } from '@shared/lib/string';
import { saveFormData } from '@entities/resume/api';
import { useMutation } from '@tanstack/react-query';

export function FormPageBuilder({ formSchema, defaultValues }: { formSchema: FormSchema; defaultValues: any }) {
  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();

  const formData = useFormDataStore((state) => state.formData);
  const setFormData = useFormDataStore((state) => state.setFormData);

  const saveMutation = useMutation({
    mutationFn: saveFormData,
  });

  useEffect(() => {
    useFormDataStore.setState({ formData: defaultValues ?? {} });
  }, [defaultValues]);

  async function handleNextStep() {
    await saveMutation.mutateAsync({ type: currentStep, data: formData[currentStep] });
    setCurrentStep(navs[nextStepIndex]?.name ?? '');
  }

  const nextStepIndex = navs.findIndex((item) => item.name === currentStep) + 1;

  console.log(formData, currentStep);

  return (
    <>
      <div
        className="overflow-auto pt-4 pb-8 scroll-hidden h-[calc(100vh)] px-6"
        style={{
          transformOrigin: 'top left',
          minWidth: '794px',
        }}
      >
        <div className="bg-white border-[3px] border-blue-800 outline-[3px] outline-blue-400 rounded-[18px] overflow-auto w-full min-w-0">
          <ResumeRenderer template={aniketTemplate} data={{ ...aniketSampleData, ...formData }} />
        </div>
      </div>

      <div className="relative flex bg-white rounded-tl-[36px] rounded-bl-[36px] w-full max-h-[calc(100vh-32px)] overflow-y-auto pt-5 px-5 gap-3 mt-4">
        <div
          className="absolute inset-0"
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

          {/* <div
            className="mt-6 mb-4"
            style={{
              background: 'linear-gradient(90deg, rgba(23, 23, 23, 0) 0%, #B8B8B8 51.09%)',
              height: '1px',
              width: '100%',
            }}
          /> */}

          <TemplateForm
            formSchema={formSchema ?? {}}
            currentStep={currentStep}
            values={formData ?? {}}
            onChange={(formData) => setFormData(formData)}
          />

          <div className="mt-[20px] cursor-pointer z-100 relative ml-auto flex">
            <Button
              className="mt-auto ml-auto bg-[#E9F4FF] w-[247px] h-[48px] rounded-[8px] text-sm font-semibold text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF]"
              onClick={handleNextStep}
            >
              Next: {camelToHumanString(navs[nextStepIndex]?.name ?? '')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
