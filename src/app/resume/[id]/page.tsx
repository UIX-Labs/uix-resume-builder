'use client';

import { type ResumeDataKey } from '@entities/resume';
import { FormPageBuilder, Sidebar } from '@widgets/form-page-builder';
import { FormPageBuilderProvider } from '@widgets/form-page-builder/models/ctx';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function FormPage() {
  const params = useParams();
  const id = params.id as string;

  const [currentStep, setCurrentStep] = useState<ResumeDataKey>('personalDetails');

  const navs = useMemo(
    () => [
      {
        label: 'Personal Details',
        name: 'personalDetails',
      },
      {
        label: 'Experience',
        name: 'experience',
      },
      {
        label: 'Education',
        name: 'education',
      },
      {
        label: 'Skills',
        name: 'skills',
      },
      {
        label: 'Projects',
        name: 'projects',
      },
      {
        label: 'Certifications',
        name: 'certifications',
      },
      {
        label: 'Interests',
        name: 'interests',
      },
      {
        label: 'Achievements',
        name: 'achievements',
      },
    ],
    [],
  );

  return (
    <FormPageBuilderProvider value={{ currentStep, setCurrentStep, navs }}>
      <div className="flex pl-4 ">
        <Sidebar />

        <div className="relative flex w-full">
          <FormPageBuilder />
        </div>
      </div>
    </FormPageBuilderProvider>
  );
}
