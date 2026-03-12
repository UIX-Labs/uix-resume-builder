'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCleanDataForRenderer } from '@/widgets/form-page-builder/lib/data-cleanup';
import { ResumeRenderer } from '@features/resume/renderer';
import {
  useResumeExampleCategories,
  useAdminTemplates,
  useUpdateResumeExample,
  useResumeExampleById,
} from '@/features/admin/hooks/use-admin-queries';
import { parsePdfResume } from '@entities/resume/api/pdf-parse';
import { getResumeData } from '@entities/resume/api/get-resume-data';
import { toast } from 'sonner';
import {
  Loader2,
  Upload,
  ArrowLeft,
  ArrowRight,
  Eye,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  Layout,
  X,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';

// ─── Constants ──────────────────────────────────────────────────────────────

const STEPS = ['Edit Resume Data', 'Metadata', 'Preview & Save'] as const;

const EMPTY_METADATA = {
  title: '',
  slug: '',
  categoryIds: [] as string[],
  templateId: '',
  role: '',
  experienceYears: '',
  primaryColor: '#2563EB',
  colorName: 'Blue',
  layout: 'two-column',
  metaTitle: '',
  metaDescription: '',
  isPublished: true,
  rank: 0,
};

// ─── Main Page Component ────────────────────────────────────────────────────

export default function AdminEditResumeExamplePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<Record<string, any> | null>(null);
  const [metadata, setMetadata] = useState(EMPTY_METADATA);
  const [initialized, setInitialized] = useState(false);

  const [isReparsing, setIsReparsing] = useState(false);
  const { data: example, isLoading: exampleLoading, error: exampleError } = useResumeExampleById(id);
  const updateMutation = useUpdateResumeExample();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useResumeExampleCategories();
  const { data: templates, isLoading: templatesLoading, error: templatesError } = useAdminTemplates();

  // Pre-populate form when example data loads
  useEffect(() => {
    if (example && !initialized) {
      setResumeData(example.resumeData || {});
      setMetadata({
        title: example.title || '',
        slug: example.slug || '',
        categoryIds: (example.categories || []).map((c: any) => c.id),
        templateId: example.templateId || '',
        role: example.role || '',
        experienceYears: example.experienceYears?.toString() || '',
        primaryColor: example.primaryColor || '#2563EB',
        colorName: example.colorName || 'Blue',
        layout: example.layout || 'two-column',
        metaTitle: example.metaTitle || '',
        metaDescription: example.metaDescription || '',
        isPublished: example.isPublished ?? true,
        rank: example.rank || 0,
      });
      setInitialized(true);
    }
  }, [example, initialized]);

  const selectedTemplate = useMemo(
    () => templates?.find((t) => t.id === metadata.templateId),
    [templates, metadata.templateId],
  );

  // ─── Re-parse PDF handler (uses same endpoint as dashboard) ─────────
  const handleReparse = useCallback(
    async (file: File) => {
      setIsReparsing(true);
      try {
        // Step 1: Parse PDF using dashboard endpoint
        const { resumeId } = await parsePdfResume(file);
        // Step 2: Fetch full resume data with properly formatted dates
        const resumeResponse = await getResumeData(resumeId, true);
        const { id: _id, updatedAt: _updatedAt, template: _template, publicThumbnail: _thumb, isAnalyzed: _analyzed, ...sections } = resumeResponse;
        setResumeData(sections);
        toast.success('Resume re-parsed successfully! Review the data below.');
      } catch {
        toast.error('Failed to parse the resume PDF.');
      } finally {
        setIsReparsing(false);
      }
    },
    [],
  );

  // ─── Save Handler ──────────────────────────────────────────────────
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
      await updateMutation.mutateAsync({ id, data: payload });
      toast.success('Resume example updated successfully!');
      router.push('/admin/resume-examples');
    } catch {
      toast.error('Failed to update resume example.');
    }
  }, [resumeData, metadata, updateMutation, router, id]);

  // ─── Metadata auto-slug ────────────────────────────────────────────
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

  if (exampleLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Loading resume example...</span>
      </div>
    );
  }

  if (exampleError || !example) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => router.push('/admin/resume-examples')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resume Example Not Found</h2>
            <p className="text-sm text-red-500">
              {exampleError?.message || 'The resume example could not be loaded.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => router.push('/admin/resume-examples')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Resume Example</h2>
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
              onClick={() => setCurrentStep(i)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                i === currentStep
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 cursor-pointer'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              <span className="hidden sm:inline">{step}</span>
            </button>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-3" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && resumeData && (
        <div className="space-y-4">
          {/* Re-parse option */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Re-parse from PDF</p>
                <p className="text-xs text-gray-500">Upload a new PDF to replace the resume data</p>
              </div>
              <label className="cursor-pointer">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  {isReparsing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload PDF
                    </>
                  )}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleReparse(file);
                      e.target.value = '';
                    }
                  }}
                  className="hidden"
                  disabled={isReparsing}
                />
              </label>
            </div>
          </div>
          <EditStep resumeData={resumeData} onChange={setResumeData} />
        </div>
      )}

      {currentStep === 1 && (
        <MetadataStep
          metadata={metadata}
          onChange={setMetadata}
          onTitleChange={handleTitleChange}
          categories={categories || []}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
        />
      )}

      {currentStep === 2 && (
        <PreviewStep
          resumeData={resumeData}
          template={selectedTemplate?.json}
          templates={templates || []}
          selectedTemplateId={metadata.templateId}
          onTemplateChange={(templateId) => setMetadata((prev) => ({ ...prev, templateId }))}
          metadata={metadata}
          onSave={handleSave}
          isSaving={updateMutation.isPending}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => currentStep > 0 ? setCurrentStep((s) => s - 1) : router.push('/admin/resume-examples')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentStep === 0 ? 'Back to List' : 'Previous'}
        </button>

        {currentStep < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s + 1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            disabled={
              updateMutation.isPending ||
              !metadata.title ||
              !metadata.slug ||
              metadata.categoryIds.length === 0 ||
              !metadata.templateId
            }
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Resume Example
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Step 1: Edit Resume Data ───────────────────────────────────────────────

function EditStep({
  resumeData,
  onChange,
}: {
  resumeData: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateSection = (section: string, items: any[]) => {
    onChange({ ...resumeData, [section]: { ...resumeData[section], items } });
  };

  const personalDetails = resumeData.personalDetails?.items?.[0] || {};

  const updatePersonalDetails = (field: string, value: any) => {
    const updated = { ...personalDetails, [field]: value };
    onChange({
      ...resumeData,
      personalDetails: { ...resumeData.personalDetails, items: [updated] },
    });
  };

  return (
    <div className="space-y-4">
      {/* Personal Details */}
      <SectionWrapper title="Personal Details" section="personalDetails" collapsed={collapsed} onToggle={toggleCollapse}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" value={personalDetails.fullName || ''} onChange={(v) => updatePersonalDetails('fullName', v)} />
          <Input label="Job Title" value={personalDetails.jobTitle || ''} onChange={(v) => updatePersonalDetails('jobTitle', v)} />
          <Input label="Email" value={personalDetails.email || ''} onChange={(v) => updatePersonalDetails('email', v)} type="email" />
          <Input label="Phone" value={personalDetails.phone || ''} onChange={(v) => updatePersonalDetails('phone', v)} />
          <Input label="Address" value={personalDetails.address || ''} onChange={(v) => updatePersonalDetails('address', v)} />
          <Input label="City" value={personalDetails.city || ''} onChange={(v) => updatePersonalDetails('city', v)} />
          <Input label="State" value={personalDetails.state || ''} onChange={(v) => updatePersonalDetails('state', v)} />
          <Input label="Country" value={personalDetails.country || ''} onChange={(v) => updatePersonalDetails('country', v)} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
          <textarea
            value={personalDetails.description || ''}
            onChange={(e) => updatePersonalDetails('description', e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief professional summary..."
          />
        </div>
      </SectionWrapper>

      {/* Experience */}
      <SectionWrapper title="Experience" section="experience" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.experience?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.experience?.items || []}
          onChange={(items) => updateSection('experience', items)}
          renderItem={(item, index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Company" value={item.company || ''} onChange={(v) => updateItem({ ...item, company: v })} />
              <Input label="Position" value={item.position || ''} onChange={(v) => updateItem({ ...item, position: v })} />
              <Input label="Location" value={item.location || ''} onChange={(v) => updateItem({ ...item, location: v })} />
              <Input label="Link" value={item.link || ''} onChange={(v) => updateItem({ ...item, link: v })} />
              <Input label="Start Date" value={item.duration?.startDate || item.startDate || ''} onChange={(v) => updateItem({ ...item, duration: { ...item.duration, startDate: v } })} placeholder="e.g., Jan 2020" />
              <Input label="End Date" value={item.duration?.endDate || item.endDate || ''} onChange={(v) => updateItem({ ...item, duration: { ...item.duration, endDate: v } })} placeholder="e.g., Dec 2023 or Present" />
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem({ ...item, description: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job responsibilities and achievements..."
                />
              </div>
            </div>
          )}
          emptyItem={{ company: '', position: '', location: '', description: '', link: '', duration: { startDate: '', endDate: '', ongoing: false } }}
        />
      </SectionWrapper>

      {/* Education */}
      <SectionWrapper title="Education" section="education" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.education?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.education?.items || []}
          onChange={(items) => updateSection('education', items)}
          renderItem={(item, index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Institution" value={item.institution || ''} onChange={(v) => updateItem({ ...item, institution: v })} />
              <Input label="Degree" value={item.degree || ''} onChange={(v) => updateItem({ ...item, degree: v })} />
              <Input label="Field of Study" value={item.fieldOfStudy || item.fieldofStudy || ''} onChange={(v) => updateItem({ ...item, fieldOfStudy: v })} />
              <Input label="Location" value={item.location || ''} onChange={(v) => updateItem({ ...item, location: v })} />
              <Input label="Start Date" value={item.duration?.startDate || item.startDate || ''} onChange={(v) => updateItem({ ...item, duration: { ...item.duration, startDate: v } })} />
              <Input label="End Date" value={item.duration?.endDate || item.endDate || ''} onChange={(v) => updateItem({ ...item, duration: { ...item.duration, endDate: v } })} />
              <Input label="Grade" value={item.grade || ''} onChange={(v) => updateItem({ ...item, grade: v })} />
            </div>
          )}
          emptyItem={{ institution: '', degree: '', fieldOfStudy: '', location: '', duration: { startDate: '', endDate: '', ongoing: false }, grade: '' }}
        />
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper title="Skills" section="skills" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.skills?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.skills?.items || []}
          onChange={(items) => updateSection('skills', items)}
          renderItem={(item, index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input label="Skill Name" value={item.name || ''} onChange={(v) => updateItem({ ...item, name: v })} />
              <Input label="Category" value={item.category || ''} onChange={(v) => updateItem({ ...item, category: v })} placeholder="e.g., Programming" />
              <Input label="Level" value={item.level || ''} onChange={(v) => updateItem({ ...item, level: v })} placeholder="e.g., Advanced" />
            </div>
          )}
          emptyItem={{ name: '', category: '', level: '' }}
          compact
        />
      </SectionWrapper>

      {/* Projects */}
      <SectionWrapper title="Projects" section="projects" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.projects?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.projects?.items || []}
          onChange={(items) => updateSection('projects', items)}
          renderItem={(item, index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Title" value={item.title || ''} onChange={(v) => updateItem({ ...item, title: v })} />
              <Input label="Link" value={item.link || ''} onChange={(v) => updateItem({ ...item, link: v })} />
              <Input label="Start Date" value={item.duration?.startDate || item.startDate || ''} onChange={(v) => updateItem({ ...item, duration: { ...item.duration, startDate: v } })} />
              <Input label="End Date" value={item.duration?.endDate || item.endDate || ''} onChange={(v) => updateItem({ ...item, duration: { ...item.duration, endDate: v } })} />
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem({ ...item, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-full">
                <Input label="Tech Stack (comma-separated)" value={(item.techStack || []).join(', ')} onChange={(v) => updateItem({ ...item, techStack: v.split(',').map((s: string) => s.trim()).filter(Boolean) })} />
              </div>
            </div>
          )}
          emptyItem={{ title: '', description: '', techStack: [], link: '', duration: { startDate: '', endDate: '', ongoing: false } }}
        />
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper title="Certifications" section="certifications" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.certifications?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.certifications?.items || []}
          onChange={(items) => updateSection('certifications', items)}
          renderItem={(item, index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Title" value={item.title || ''} onChange={(v) => updateItem({ ...item, title: v })} />
              <Input label="Issuer" value={item.issuer || ''} onChange={(v) => updateItem({ ...item, issuer: v })} />
              <Input label="Start Date" value={item.duration?.startDate || item.startDate || ''} onChange={(v) => updateItem({ ...item, duration: { ...item.duration, startDate: v } })} />
              <Input label="End Date" value={item.duration?.endDate || item.endDate || ''} onChange={(v) => updateItem({ ...item, duration: { ...item.duration, endDate: v } })} />
              <Input label="Link" value={item.link || ''} onChange={(v) => updateItem({ ...item, link: v })} />
            </div>
          )}
          emptyItem={{ title: '', issuer: '', link: '', duration: { startDate: '', endDate: '', ongoing: false } }}
        />
      </SectionWrapper>

      {/* Achievements */}
      <SectionWrapper title="Achievements" section="achievements" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.achievements?.items?.length || 0}>
        <StringListEditor
          items={resumeData.achievements?.items || []}
          onChange={(items) => updateSection('achievements', items)}
          placeholder="Enter an achievement..."
        />
      </SectionWrapper>

      {/* Interests */}
      <SectionWrapper title="Interests" section="interests" collapsed={collapsed} onToggle={toggleCollapse}>
        <StringListEditor
          items={
            resumeData.interests?.items?.[0]?.items
              ? resumeData.interests.items[0].items
              : resumeData.interests?.items || []
          }
          onChange={(items) =>
            onChange({
              ...resumeData,
              interests: { items: [{ items }] },
            })
          }
          placeholder="Enter an interest..."
        />
      </SectionWrapper>
    </div>
  );
}

// ─── Step 2: Metadata ───────────────────────────────────────────────────────

function MetadataStep({
  metadata,
  onChange,
  onTitleChange,
  categories,
  categoriesLoading,
  categoriesError,
}: {
  metadata: typeof EMPTY_METADATA;
  onChange: (data: typeof EMPTY_METADATA) => void;
  onTitleChange: (title: string) => void;
  categories: any[];
  categoriesLoading?: boolean;
  categoriesError?: Error | null;
}) {
  const set = (field: string, value: any) => onChange({ ...metadata, [field]: value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input label="Title *" value={metadata.title} onChange={onTitleChange} placeholder="e.g., Senior Software Engineer Resume" />
      <Input label="Slug *" value={metadata.slug} onChange={(v) => set('slug', v)} placeholder="auto-generated-from-title" mono />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categories *</label>
        {categoriesError ? (
          <p className="text-sm text-red-600 p-2.5 bg-red-50 rounded-lg border border-red-200">
            Failed to load categories. Check that the backend is running and you are logged in with an admin account.
          </p>
        ) : categoriesLoading ? (
          <p className="text-sm text-gray-500 p-2.5 bg-gray-50 rounded-lg border border-gray-200 animate-pulse">
            Loading categories...
          </p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-amber-700 p-2.5 bg-amber-50 rounded-lg border border-amber-200">
            No categories found.{' '}
            <a href="/admin/resume-examples/categories" className="underline font-medium hover:text-amber-900">
              Create one first
            </a>
          </p>
        ) : (
          <CategoryMultiSelect
            categories={categories}
            selectedIds={metadata.categoryIds}
            onChange={(ids) => set('categoryIds', ids)}
          />
        )}
      </div>
      <Input label="Role" value={metadata.role} onChange={(v) => set('role', v)} placeholder="e.g., Software Engineer" />
      <Input label="Experience Years" value={metadata.experienceYears} onChange={(v) => set('experienceYears', v)} type="number" placeholder="e.g., 5" />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={metadata.primaryColor}
            onChange={(e) => set('primaryColor', e.target.value)}
            className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            value={metadata.primaryColor}
            onChange={(e) => set('primaryColor', e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <Input label="Color Name" value={metadata.colorName} onChange={(v) => set('colorName', v)} placeholder="e.g., Blue" />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
        <select
          value={metadata.layout}
          onChange={(e) => set('layout', e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="two-column">Two Column</option>
          <option value="single-column">Single Column</option>
        </select>
      </div>
      <Input label="Rank" value={metadata.rank.toString()} onChange={(v) => set('rank', v)} type="number" />
      <Input label="Meta Title" value={metadata.metaTitle} onChange={(v) => set('metaTitle', v)} placeholder="SEO title" />
      <Input label="Meta Description" value={metadata.metaDescription} onChange={(v) => set('metaDescription', v)} placeholder="SEO description" />
      <div className="flex items-center gap-2 pt-4">
        <input
          type="checkbox"
          checked={metadata.isPublished}
          onChange={(e) => set('isPublished', e.target.checked)}
          className="rounded border-gray-300"
          id="isPublished"
        />
        <label htmlFor="isPublished" className="text-sm text-gray-700">
          Published
        </label>
      </div>
    </div>
  );
}

// ─── Step 3: Preview & Save ─────────────────────────────────────────────────

function PreviewStep({
  resumeData,
  template,
  templates,
  selectedTemplateId,
  onTemplateChange,
  metadata,
  onSave,
  isSaving,
}: {
  resumeData: Record<string, any> | null;
  template: Record<string, any> | null | undefined;
  templates: any[];
  selectedTemplateId: string;
  onTemplateChange: (templateId: string) => void;
  metadata: typeof EMPTY_METADATA;
  onSave: () => void;
  isSaving: boolean;
}) {
  const cleanedData = useMemo(
    () => (resumeData ? getCleanDataForRenderer(resumeData) : null),
    [resumeData],
  );

  // Filter out draft templates — only show active ones
  const activeTemplates = useMemo(
    () => templates.filter((t) => t.status !== 'draft'),
    [templates],
  );

  if (!template) {
    return (
      <div className="text-center py-20 text-gray-500">
        <Eye className="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p>Please select a template in the Metadata step to preview the resume.</p>
      </div>
    );
  }

  if (!cleanedData) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No resume data to preview. Please go back and add data.</p>
      </div>
    );
  }

  const missingFields = [];
  if (!metadata.title) missingFields.push('Title');
  if (!metadata.slug) missingFields.push('Slug');
  if (metadata.categoryIds.length === 0) missingFields.push('Category');
  if (!metadata.templateId) missingFields.push('Template');

  return (
    <div>
      {missingFields.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          Missing required fields: {missingFields.join(', ')}
        </div>
      )}

      {/* Template Selector */}
      {activeTemplates.length > 0 && (
        <div className="mb-6 border border-gray-200 rounded-lg bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Selected Template</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {activeTemplates.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => onTemplateChange(tmpl.id)}
                  className={`relative rounded-lg border-2 overflow-hidden transition-all cursor-pointer aspect-[3/4] ${
                    isSelected
                      ? 'border-blue-500 shadow-md ring-1 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tmpl.publicImage?.url ? (
                    // biome-ignore lint/performance/noImgElement: dynamic admin template thumbnails
                    <img
                      src={tmpl.publicImage.url}
                      alt={`Template ${tmpl.id.slice(0, 8)}`}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Layout className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                      <div className="bg-blue-500 rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden" style={{ width: '21cm' }}>
          <ResumeRenderer
            template={template}
            data={cleanedData}
            currentSection={undefined}
            hasSuggestions={false}
            isThumbnail={false}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Shared Components ─────────────────────────────────────────────────────

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  mono,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${mono ? 'font-mono' : ''}`}
      />
    </div>
  );
}

function SectionWrapper({
  title,
  section,
  collapsed,
  onToggle,
  count,
  children,
}: {
  title: string;
  section: string;
  collapsed: Record<string, boolean>;
  onToggle: (section: string) => void;
  count?: number;
  children: React.ReactNode;
}) {
  const isCollapsed = collapsed[section];

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <button
        type="button"
        onClick={() => onToggle(section)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {count !== undefined && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{count}</span>
          )}
        </div>
        {isCollapsed ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronUp className="w-4 h-4 text-gray-400" />}
      </button>
      {!isCollapsed && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function RepeatableSection({
  items,
  onChange,
  renderItem,
  emptyItem,
  compact,
}: {
  items: any[];
  onChange: (items: any[]) => void;
  renderItem: (item: any, index: number, updateItem: (updated: any) => void) => React.ReactNode;
  emptyItem: Record<string, any>;
  compact?: boolean;
}) {
  const addItem = () => {
    onChange([...items, { ...emptyItem, rank: items.length }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updated: any) => {
    const newItems = [...items];
    newItems[index] = updated;
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className={`relative ${compact ? 'p-3' : 'p-4'} bg-gray-50 rounded-lg border border-gray-100`}>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {renderItem(item, index, (updated) => updateItem(index, updated))}
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </button>
    </div>
  );
}

function StringListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const flatItems = items.map((item: any) => (typeof item === 'string' ? item : item?.name || item?.title || ''));

  const addItem = () => onChange([...flatItems, '']);

  const removeItem = (index: number) => onChange(flatItems.filter((_: any, i: number) => i !== index));

  const updateItem = (index: number, value: string) => {
    const updated = [...flatItems];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {flatItems.map((item: string, index: number) => (
        <div key={index} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </button>
    </div>
  );
}

// ─── Multi-selector dropdown for categories ─────────────────────────

function CategoryMultiSelect({
  categories,
  selectedIds,
  onChange,
}: {
  categories: { id: string; name: string }[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const selectedNames = categories
    .filter((c) => selectedIds.includes(c.id))
    .map((c) => c.name);

  const toggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    onChange(next);
  };

  const remove = (id: string) => {
    onChange(selectedIds.filter((i) => i !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between gap-2 rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[42px] text-left"
        >
          {selectedNames.length === 0 ? (
            <span className="text-gray-400">Select categories...</span>
          ) : (
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedNames.map((name, i) => (
                <span
                  key={selectedIds[i]}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                >
                  {name}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(selectedIds[i]);
                    }}
                  />
                </span>
              ))}
            </div>
          )}
          <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-1" align="start">
        <div className="max-h-[200px] overflow-y-auto">
          {categories.map((c) => {
            const isChecked = selectedIds.includes(c.id);
            return (
              <label
                key={c.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(c.id)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{c.name}</span>
              </label>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
