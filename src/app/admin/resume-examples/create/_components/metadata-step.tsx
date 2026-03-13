'use client';

import { useState } from 'react';
import { ShadcnInput } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { Checkbox } from '@shared/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { ChevronDown, X } from 'lucide-react';
import { LabeledInput } from './shared';
import type { ExampleMetadata } from './constants';

export function MetadataStep({
  metadata,
  onChange,
  onTitleChange,
  categories,
  categoriesLoading,
  categoriesError,
}: {
  metadata: ExampleMetadata;
  onChange: (data: ExampleMetadata) => void;
  onTitleChange: (title: string) => void;
  categories: any[];
  categoriesLoading?: boolean;
  categoriesError?: Error | null;
}) {
  const set = (field: string, value: any) => onChange({ ...metadata, [field]: value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <LabeledInput label="Title *" value={metadata.title} onChange={onTitleChange} placeholder="e.g., Senior Software Engineer Resume" />
      <LabeledInput label="Slug *" value={metadata.slug} onChange={(v) => set('slug', v)} placeholder="auto-generated-from-title" mono />
      <div className="space-y-1">
        <Label>Categories *</Label>
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
          className="w-full flex items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none min-h-[38px] text-left"
        >
          {selectedNames.length === 0 ? (
            <span className="text-muted-foreground">Select categories...</span>
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
          <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
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
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggle(c.id)}
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
