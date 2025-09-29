'use client';

import { type ResumeDataKey, useResumeData, useTemplateFormSchema } from '@entities/resume';
import { camelToHumanString } from '@shared/lib/string';
import { FormPageBuilder, Sidebar } from '@widgets/form-page-builder';
import { FormPageBuilderProvider } from '@widgets/form-page-builder/models/ctx';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function FormPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: resumeData } = useResumeData(id);
  const { data: schema } = useTemplateFormSchema();

  const [currentStep, setCurrentStep] = useState<ResumeDataKey>('personalDetails');

  const navs = useMemo(
    () =>
      Object.keys(resumeData ?? ({} as Record<string, any>))
        .map((key) => {
          if (['templateId', 'id', 'publicThumbnailUrl', 'privateThumbnailUrl'].includes(key)) return null;

          return {
            label: camelToHumanString(key),
            name: key as ResumeDataKey,
          };
        })
        .filter((item): item is { label: string; name: ResumeDataKey; completion: number } => item !== null),
    [resumeData],
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
          {schema && <FormPageBuilder formSchema={schema} defaultValues={resumeData ?? {}} />}
        </div>
      </div>
    </FormPageBuilderProvider>
  );
}
