'use client';

import { ShadcnInput } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { Checkbox } from '@shared/ui/checkbox';
import { LabeledInput } from './shared';
import type { ExampleMetadata } from './constants';

export function MetadataStep({
  metadata,
  onChange,
  onTitleChange,
  categories,
  templates,
  categoriesLoading,
  categoriesError,
  templatesLoading,
  templatesError,
}: {
  metadata: ExampleMetadata;
  onChange: (data: ExampleMetadata) => void;
  onTitleChange: (title: string) => void;
  categories: any[];
  templates: any[];
  categoriesLoading?: boolean;
  categoriesError?: Error | null;
  templatesLoading?: boolean;
  templatesError?: Error | null;
}) {
  const set = (field: string, value: any) => onChange({ ...metadata, [field]: value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <LabeledInput label="Title *" value={metadata.title} onChange={onTitleChange} placeholder="e.g., Senior Software Engineer Resume" />
      <LabeledInput label="Slug *" value={metadata.slug} onChange={(v) => set('slug', v)} placeholder="auto-generated-from-title" mono />
      <div className="space-y-1">
        <Label htmlFor="metadata-category">Category *</Label>
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
          <select
            id="metadata-category"
            value={metadata.categoryId}
            onChange={(e) => set('categoryId', e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          >
            <option value="">Select category...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="metadata-template">Template *</Label>
        {templatesError ? (
          <p className="text-sm text-red-600 p-2.5 bg-red-50 rounded-lg border border-red-200">
            Failed to load templates.
          </p>
        ) : templatesLoading ? (
          <p className="text-sm text-gray-500 p-2.5 bg-gray-50 rounded-lg border border-gray-200 animate-pulse">
            Loading templates...
          </p>
        ) : (
          <select
            id="metadata-template"
            value={metadata.templateId}
            onChange={(e) => set('templateId', e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          >
            <option value="">Select template...</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.id.slice(0, 8)}... (Rank: {t.rank})
              </option>
            ))}
          </select>
        )}
      </div>
      <LabeledInput label="Role" value={metadata.role} onChange={(v) => set('role', v)} placeholder="e.g., Software Engineer" />
      <LabeledInput label="Experience Years" value={metadata.experienceYears} onChange={(v) => set('experienceYears', v)} type="number" placeholder="e.g., 5" />
      <div className="space-y-1">
        <Label htmlFor="metadata-primary-color">Primary Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={metadata.primaryColor}
            onChange={(e) => set('primaryColor', e.target.value)}
            className="w-10 h-10 rounded border border-input cursor-pointer"
          />
          <ShadcnInput
            id="metadata-primary-color"
            value={metadata.primaryColor}
            onChange={(e) => set('primaryColor', e.target.value)}
            className="flex-1 font-mono"
          />
        </div>
      </div>
      <LabeledInput label="Color Name" value={metadata.colorName} onChange={(v) => set('colorName', v)} placeholder="e.g., Blue" />
      <div className="space-y-1">
        <Label htmlFor="metadata-layout">Layout</Label>
        <select
          id="metadata-layout"
          value={metadata.layout}
          onChange={(e) => set('layout', e.target.value)}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
        >
          <option value="two-column">Two Column</option>
          <option value="single-column">Single Column</option>
        </select>
      </div>
      <LabeledInput label="Rank" value={metadata.rank.toString()} onChange={(v) => set('rank', v)} type="number" />
      <LabeledInput label="Meta Title" value={metadata.metaTitle} onChange={(v) => set('metaTitle', v)} placeholder="SEO title" />
      <LabeledInput label="Meta Description" value={metadata.metaDescription} onChange={(v) => set('metaDescription', v)} placeholder="SEO description" />
      <div className="flex items-center gap-2 pt-4">
        <Checkbox
          id="isPublished"
          checked={metadata.isPublished}
          onCheckedChange={(checked) => set('isPublished', !!checked)}
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>
    </div>
  );
}
