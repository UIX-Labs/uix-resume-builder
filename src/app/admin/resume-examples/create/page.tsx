'use client';

import {
  useAdminTemplates,
  useCreateResumeExample,
  useResumeExampleCategories,
} from '@/features/admin/hooks/use-admin-queries';
import { getResumeData } from '@entities/resume/api/get-resume-data';
import { parsePdfResume } from '@entities/resume/api/pdf-parse';
import { Button } from '@shared/ui/button';
import { ArrowLeft, ArrowRight, Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { EMPTY_METADATA, EMPTY_PERSONAL_DETAILS, STEPS } from './_components/constants';
import { EditStep } from './_components/edit-step';
import { MetadataStep } from './_components/metadata-step';
import { PreviewStep } from './_components/preview-step';
import { UploadStep } from './_components/upload-step';

export default function AdminCreateResumeExamplePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<Record<string, any> | null>(null);
  const [metadata, setMetadata] = useState(EMPTY_METADATA);

  const [isParsing, setIsParsing] = useState(false);
  const createMutation = useCreateResumeExample();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useResumeExampleCategories();
  const { data: templates } = useAdminTemplates();

  const selectedTemplate = useMemo(
    () => templates?.find((t) => t.id === metadata.templateId),
    [templates, metadata.templateId],
  );

  const handlePdfUpload = useCallback(
    async (file: File) => {
      setIsParsing(true);
      try {
        // Step 1: Parse PDF using the same endpoint as dashboard upload
        const { resumeId } = await parsePdfResume(file);

        // Step 2: Fetch the full resume data (dates are properly formatted)
        const resumeResponse = await getResumeData(resumeId, true);

        // Step 3: Extract resume sections data (exclude metadata fields)
        const {
          id: _id,
          updatedAt: _updatedAt,
          template,
          publicThumbnail: _thumb,
          isAnalyzed: _analyzed,
          ...sections
        } = resumeResponse;

        setResumeData(sections);

        // Step 4: Derive metadata from parsed data
        const personalDetails = sections.personalDetails?.items?.[0] || {};
        const fullName = personalDetails.fullName || '';
        const jobTitle = personalDetails.jobTitle || '';
        const title = jobTitle ? `${jobTitle} Resume` : fullName ? `${fullName} Resume` : 'Resume Example';
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        const defaultTemplateId = template?.id || templates?.[0]?.id || '';

        setMetadata({
          title,
          slug,
          categoryIds: [],
          templateId: defaultTemplateId,
          role: jobTitle || '',
          experienceYears: '',
          primaryColor: '#2563EB',
          colorName: 'Blue',
          layout: 'two-column',
          metaTitle: `${title} Example | Pika Resume`,
          metaDescription: jobTitle
            ? `Download this professional ${jobTitle.toLowerCase()} resume example. Built with Pika Resume.`
            : '',
          isPublished: true,
          rank: 0,
        });

        toast.success('Resume parsed successfully!');
        setCurrentStep(1);
      } catch {
        toast.error('Failed to parse the resume PDF. Please try again.');
      } finally {
        setIsParsing(false);
      }
    },
    [templates],
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
      categoryIds: metadata.categoryIds,
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

  const handleTitleChange = useCallback((title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setMetadata((prev) => ({ ...prev, title, slug }));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/resume-examples')}>
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
      {currentStep === 0 && <UploadStep onUpload={handlePdfUpload} onSkip={handleSkipUpload} isParsing={isParsing} />}

      {currentStep === 1 && resumeData && <EditStep resumeData={resumeData} onChange={setResumeData} />}

      {currentStep === 2 && (
        <MetadataStep
          metadata={metadata}
          onChange={setMetadata}
          onTitleChange={handleTitleChange}
          categories={categories || []}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
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
          <Button variant="outline" onClick={() => setCurrentStep((s) => s - 1)}>
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
                metadata.categoryIds.length === 0 ||
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
