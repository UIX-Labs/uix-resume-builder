'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  useResumeExampleCategories,
  useAdminTemplates,
  useCreateResumeExample,
  useParseResumeForExample,
} from '@/features/admin/hooks/use-admin-queries';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '@shared/ui/button';

import { STEPS, EMPTY_METADATA, EMPTY_PERSONAL_DETAILS } from './_components/constants';
import { UploadStep } from './_components/upload-step';
import { EditStep } from './_components/edit-step';
import { MetadataStep } from './_components/metadata-step';
import { PreviewStep } from './_components/preview-step';

export default function AdminCreateResumeExamplePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<Record<string, any> | null>(null);
  const [metadata, setMetadata] = useState(EMPTY_METADATA);

  const parseMutation = useParseResumeForExample();
  const createMutation = useCreateResumeExample();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useResumeExampleCategories();
  const { data: templates, isLoading: templatesLoading, error: templatesError } = useAdminTemplates();

  const selectedTemplate = useMemo(
    () => templates?.find((t) => t.id === metadata.templateId),
    [templates, metadata.templateId],
  );

  const handlePdfUpload = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const result = await parseMutation.mutateAsync(formData);

        let matchedCategoryId = '';
        if (result.suggestedCategorySlug && categories) {
          const matched = categories.find((c) => c.slug === result.suggestedCategorySlug);
          if (matched) matchedCategoryId = matched.id;
        }

        const defaultTemplateId = templates?.[0]?.id || '';

        setResumeData(result.resumeData);
        setMetadata({
          title: result.title,
          slug: result.slug,
          categoryId: matchedCategoryId,
          templateId: defaultTemplateId,
          role: result.role,
          experienceYears: result.experienceYears?.toString() || '',
          primaryColor: result.primaryColor || '#2563EB',
          colorName: result.colorName || 'Blue',
          layout: result.layout || 'two-column',
          metaTitle: result.metaTitle || '',
          metaDescription: result.metaDescription || '',
          isPublished: true,
          rank: result.rank || 0,
        });

        toast.success('Resume parsed successfully!');
        setCurrentStep(1);
      } catch {
        toast.error('Failed to parse the resume PDF. Please try again.');
      }
    },
    [parseMutation, categories, templates],
  );

  const handleSkipUpload = useCallback(() => {
    setResumeData({
      personalDetails: { items: [{ ...EMPTY_PERSONAL_DETAILS }] },
      experience: { items: [] },
      education: { items: [] },
      projects: { items: [] },
      skills: { items: [] },
      certifications: { items: [] },
      achievements: { items: [] },
      interests: { items: [{ items: [] }] },
    });
    setCurrentStep(1);
  }, []);

  const handleSave = useCallback(async () => {
    if (!resumeData) return;

    const payload = {
      title: metadata.title,
      slug: metadata.slug,
      categoryId: metadata.categoryId,
      templateId: metadata.templateId,
      resumeData,
      role: metadata.role || undefined,
      experienceYears: metadata.experienceYears ? Number(metadata.experienceYears) : undefined,
      primaryColor: metadata.primaryColor || undefined,
      colorName: metadata.colorName || undefined,
      layout: metadata.layout,
      metaTitle: metadata.metaTitle || undefined,
      metaDescription: metadata.metaDescription || undefined,
      isPublished: metadata.isPublished,
      rank: Number(metadata.rank) || 0,
    };

    try {
      await createMutation.mutateAsync(payload);
      toast.success('Resume example created successfully!');
      router.push('/admin/resume-examples');
    } catch {
      toast.error('Failed to create resume example.');
    }
  }, [resumeData, metadata, createMutation, router]);

  const handleTitleChange = useCallback(
    (title: string) => {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setMetadata((prev) => ({ ...prev, title, slug }));
    },
    [],
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/admin/resume-examples')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Resume Example</h2>
          <p className="text-sm text-gray-500">
            Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep]}
          </p>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center mb-8">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <button
              type="button"
              onClick={() => i < currentStep && setCurrentStep(i)}
              disabled={i > currentStep}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                i === currentStep
                  ? 'text-blue-600'
                  : i < currentStep
                    ? 'text-green-600 hover:text-green-700 cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === currentStep
                    ? 'bg-blue-600 text-white'
                    : i < currentStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < currentStep ? '✓' : i + 1}
              </div>
              <span className="hidden sm:inline">{step}</span>
            </button>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-3" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && (
        <UploadStep
          onUpload={handlePdfUpload}
          onSkip={handleSkipUpload}
          isParsing={parseMutation.isPending}
        />
      )}

      {currentStep === 1 && resumeData && (
        <EditStep resumeData={resumeData} onChange={setResumeData} />
      )}

      {currentStep === 2 && (
        <MetadataStep
          metadata={metadata}
          onChange={setMetadata}
          onTitleChange={handleTitleChange}
          categories={categories || []}
          templates={templates || []}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
          templatesLoading={templatesLoading}
          templatesError={templatesError}
        />
      )}

      {currentStep === 3 && (
        <PreviewStep
          resumeData={resumeData}
          template={selectedTemplate?.json}
          templates={templates || []}
          selectedTemplateId={metadata.templateId}
          onTemplateChange={(templateId) => setMetadata((prev) => ({ ...prev, templateId }))}
          metadata={metadata}
          onSave={handleSave}
          isSaving={createMutation.isPending}
        />
      )}

      {/* Navigation */}
      {currentStep > 0 && (
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((s) => s - 1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button onClick={() => setCurrentStep((s) => s + 1)}>
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              disabled={
                createMutation.isPending ||
                !metadata.title ||
                !metadata.slug ||
                !metadata.categoryId ||
                !metadata.templateId
              }
              className="bg-green-600 hover:bg-green-700"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Resume Example
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
