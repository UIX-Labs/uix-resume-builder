'use client';

import { type ResumeDataKey, useResumeEmptyData, useTemplateFormData, useTemplateFormSchema } from '@entities/resume';
import { camelToHumanString } from '@shared/lib/string';
import { FormPageBuilder, Sidebar } from '@widgets/form-page-builder';
import { FormPageBuilderProvider } from '@widgets/form-page-builder/models/ctx';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function FormPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: resumeEmptyData } = useResumeEmptyData();
  const { data: resumeData } = useTemplateFormData(id);
  const { data: schema } = useTemplateFormSchema();

  const [currentStep, setCurrentStep] = useState<ResumeDataKey>('personalDetails');

  const navs = useMemo(
    () =>
      Object.keys(resumeEmptyData ?? ({} as ResumeDataKey[])).map((key) => {
        return {
          label: camelToHumanString(key),
          name: key,
        };
      }),
    [resumeEmptyData],
  );

  useEffect(() => {
    if (!schema) return;

    const firstKey = Object.keys(schema)[0];

    setCurrentStep(firstKey as ResumeDataKey);
  }, [schema]);

  return (
    <FormPageBuilderProvider value={{ currentStep, setCurrentStep, navs }}>
      <div className="flex pl-4 ">
        <Sidebar />

        <div className="relative flex w-full">
          <FormPageBuilder formSchema={schema ?? {}} defaultValues={resumeData ?? {}} />
        </div>
      </div>
    </FormPageBuilderProvider>
  );
}
