'use client';

import { data as formSchemaData } from '@entities/resume/api/schema-data';
import { TemplateForm } from '@features/template-form';
import { camelToHumanString } from '@shared/lib/string';
import { Button } from '@shared/ui/button';
import { useBuilderActions, useBuilderMeta, useBuilderState } from '../../models/builder-context';

export function FormPanel() {
  const { currentStep, formData, resumeId, navs } = useBuilderState();
  const {
    setFormData,
    handleSaveResume,
    handleNextStep,
    handleOpenAnalyzerModal,
    handleToggleHideSection,
  } = useBuilderActions();
  const { getFormattedSaveTime, nextStepIndex } = useBuilderMeta();

  return (
    <div className="relative bg-white rounded-tl-[36px] rounded-bl-[36px] flex-1 max-h-[calc(100vh-32px)] mt-4 flex-col flex overflow-hidden px-1">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="sticky top-0 z-10 bg-white py-5 px-5 flex justify-end">
        <Button
          className="bg-[#E9F4FF] rounded-xl text-sm font-semibold px-6 text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] cursor-pointer"
          onClick={handleSaveResume}
        >
          Save
        </Button>
      </div>

      <div className="overflow-auto px-5 py-5 scroll-hidden flex-1 relative">
        <TemplateForm
          formSchema={formSchemaData ?? {}}
          currentStep={currentStep}
          values={formData ?? {}}
          onChange={(data) => setFormData(data)}
          onOpenAnalyzerModal={handleOpenAnalyzerModal}
          onToggleHideSection={handleToggleHideSection}
        />
      </div>

      <div className="sticky bottom-0 z-10 bg-white px-5 py-4 border-t border-gray-100 flex items-center gap-4">
        <div className="flex-1 flex justify-start">
          {getFormattedSaveTime() && (
            <p className="text-sm text-gray-500">{getFormattedSaveTime()}</p>
          )}
        </div>

        {navs[nextStepIndex]?.name && (
          <Button
            className="bg-[#E9F4FF] rounded-xl text-sm font-semibold px-6 text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] cursor-pointer"
            onClick={handleNextStep}
          >
            {`Next : ${camelToHumanString(navs[nextStepIndex]?.name)}`}
          </Button>
        )}
      </div>
    </div>
  );
}
