'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { FilterBar } from '@/features/admin/components/filter-bar';
import {
  useResumeExamples,
  useResumeExampleCategories,
  useAdminTemplates,
  useCreateResumeExample,
  useUpdateResumeExample,
  useDeleteResumeExample,
  useToggleResumeExamplePublish,
  useParseResumeForExample,
} from '@/features/admin/hooks/use-admin-queries';
import type { AdminQueryParams, AdminResumeExample } from '@/features/admin/types/admin.types';

const EMPTY_FORM = {
  title: '',
  slug: '',
  categoryId: '',
  templateId: '',
  resumeData: '{}',
  role: '',
  experienceYears: '',
  primaryColor: '',
  colorName: '',
  layout: 'two-column',
  metaTitle: '',
  metaDescription: '',
  isPublished: true,
  rank: 0,
};

export default function AdminResumeExamplesPage() {
  const [params, setParams] = useState<AdminQueryParams>({ page: 1, limit: 20, sortOrder: 'ASC' });
  const { data, isLoading } = useResumeExamples(params);
  const { data: categories } = useResumeExampleCategories();
  const { data: templates } = useAdminTemplates();
  const createMutation = useCreateResumeExample();
  const updateMutation = useUpdateResumeExample();
  const deleteMutation = useDeleteResumeExample();
  const togglePublishMutation = useToggleResumeExamplePublish();
  const parseMutation = useParseResumeForExample();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isParsed, setIsParsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsParsed(false);
    setShowModal(true);
  };

  const openEdit = (example: AdminResumeExample) => {
    setEditingId(example.id);
    setForm({
      title: example.title,
      slug: example.slug,
      categoryId: example.categoryId,
      templateId: example.templateId,
      resumeData: '{}',
      role: example.role || '',
      experienceYears: example.experienceYears?.toString() || '',
      primaryColor: example.primaryColor || '',
      colorName: example.colorName || '',
      layout: example.layout || 'two-column',
      metaTitle: example.metaTitle || '',
      metaDescription: example.metaDescription || '',
      isPublished: example.isPublished,
      rank: example.rank,
    });
    setIsParsed(false);
    setShowModal(true);
  };

  const handlePdfUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await parseMutation.mutateAsync(formData);

      // Auto-match category by suggested slug
      let matchedCategoryId = '';
      if (result.suggestedCategorySlug && categories) {
        const matched = categories.find((c) => c.slug === result.suggestedCategorySlug);
        if (matched) matchedCategoryId = matched.id;
      }

      // Auto-select first template
      const defaultTemplateId = templates?.[0]?.id || '';

      setForm({
        title: result.title,
        slug: result.slug,
        categoryId: matchedCategoryId,
        templateId: defaultTemplateId,
        resumeData: JSON.stringify(result.resumeData, null, 2),
        role: result.role,
        experienceYears: result.experienceYears?.toString() || '',
        primaryColor: result.primaryColor || '',
        colorName: result.colorName || '',
        layout: result.layout || 'two-column',
        metaTitle: result.metaTitle || '',
        metaDescription: result.metaDescription || '',
        isPublished: true,
        rank: result.rank || 0,
      });
      setIsParsed(true);
      setEditingId(null);
      setShowModal(true);
    } catch {
      alert('Failed to parse the resume PDF. Please try again.');
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePdfUpload(file);
      // Reset file input so the same file can be re-selected
      e.target.value = '';
    }
  };

  const handleModalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePdfUpload(file);
      e.target.value = '';
    }
  };

  const handleSubmit = async () => {
    let parsedResumeData: Record<string, any> = {};
    try {
      parsedResumeData = JSON.parse(form.resumeData);
    } catch {
      alert('Invalid JSON in Resume Data');
      return;
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      categoryId: form.categoryId,
      templateId: form.templateId,
      ...(Object.keys(parsedResumeData).length > 0 ? { resumeData: parsedResumeData } : {}),
      role: form.role || undefined,
      experienceYears: form.experienceYears ? Number(form.experienceYears) : undefined,
      primaryColor: form.primaryColor || undefined,
      colorName: form.colorName || undefined,
      layout: form.layout,
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
      isPublished: form.isPublished,
      rank: Number(form.rank) || 0,
    };

    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setShowModal(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
    setIsParsed(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this resume example?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const onChange = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const columns: Column<AdminResumeExample>[] = [
    {
      key: 'thumbnail',
      label: 'Preview',
      render: (row) => (
        <div className="w-12 h-16 rounded border border-gray-200 overflow-hidden bg-gray-100">
          {row.publicThumbnail?.url ? (
            // biome-ignore lint/performance/noImgElement: dynamic image source
            <img src={row.publicThumbnail.url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">N/A</div>
          )}
        </div>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (row) => (
        <div>
          <div className="font-medium text-sm">{row.title}</div>
          <div className="text-xs text-gray-500 font-mono">{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (row) => <span className="text-xs text-gray-600">{row.categoryName || '—'}</span>,
    },
    {
      key: 'role',
      label: 'Role',
      render: (row) => <span className="text-xs text-gray-600">{row.role || '—'}</span>,
    },
    {
      key: 'layout',
      label: 'Layout',
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
          {row.layout}
        </span>
      ),
    },
    { key: 'rank', label: 'Rank', sortable: true },
    {
      key: 'isPublished',
      label: 'Status',
      render: (row) => (
        <button
          type="button"
          onClick={() => togglePublishMutation.mutate(row.id)}
          disabled={togglePublishMutation.isPending}
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
            row.isPublished
              ? 'bg-green-50 text-green-700 hover:bg-green-100'
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          {row.isPublished ? 'Published' : 'Draft'}
        </button>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => openEdit(row)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="text-xs text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resume Examples</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-semibold text-gray-900">{data?.total || 0}</span> examples
            {' · '}
            <Link href="/admin/resume-examples/categories" className="text-blue-600 hover:text-blue-800 font-medium">
              Manage Categories
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
          <button
            type="button"
            onClick={handleFileSelect}
            disabled={parseMutation.isPending}
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
          >
            {parseMutation.isPending ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Parsing Resume...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload Resume PDF
              </>
            )}
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Manually
          </button>
        </div>
      </div>

      <FilterBar onFilterChange={handleFilterChange} showStatusFilter />

      <DataTable
        columns={columns}
        data={data?.data || []}
        total={data?.total || 0}
        page={params.page}
        limit={params.limit}
        isLoading={isLoading}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
        onSort={(sortBy, sortOrder) => setParams((p) => ({ ...p, sortBy, sortOrder }))}
        emptyMessage="No resume examples found"
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Resume Example' : 'Add New Resume Example'}
            </h3>

            {/* PDF Upload zone inside modal (only when creating) */}
            {!editingId && (
              <div className="mb-5">
                {isParsed ? (
                  <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Resume parsed successfully — fields auto-filled below
                    </div>
                    <label className="text-xs text-green-600 hover:text-green-800 font-medium cursor-pointer">
                      Re-upload
                      <input type="file" accept=".pdf" onChange={handleModalFileChange} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                    {parseMutation.isPending ? (
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="animate-spin h-8 w-8 text-blue-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span className="text-sm text-blue-600 font-medium">
                          Parsing resume... this may take up to 60 seconds
                        </span>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="h-8 w-8 text-gray-400 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                        <span className="text-sm text-gray-600 font-medium">
                          Upload a resume PDF to auto-fill fields
                        </span>
                        <span className="text-xs text-gray-400 mt-1">or fill the form manually below</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleModalFileChange}
                      className="hidden"
                      disabled={parseMutation.isPending}
                    />
                  </label>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                  <input
                    value={form.title}
                    onChange={(e) => onChange('title', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Senior Software Engineer Resume"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug *
                  <input
                    value={form.slug}
                    onChange={(e) => onChange('slug', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., senior-software-engineer"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                  <select
                    value={form.categoryId}
                    onChange={(e) => onChange('categoryId', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category...</option>
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template *
                  <select
                    value={form.templateId}
                    onChange={(e) => onChange('templateId', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select template...</option>
                    {templates?.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id.slice(0, 8)}... (Rank: {t.rank})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                  <input
                    value={form.role}
                    onChange={(e) => onChange('role', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Software Engineer"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Years
                  <input
                    type="number"
                    value={form.experienceYears}
                    onChange={(e) => onChange('experienceYears', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                  <input
                    value={form.primaryColor}
                    onChange={(e) => onChange('primaryColor', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., #3B82F6"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color Name
                  <input
                    value={form.colorName}
                    onChange={(e) => onChange('colorName', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Blue"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Layout
                  <select
                    value={form.layout}
                    onChange={(e) => onChange('layout', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="two-column">Two Column</option>
                    <option value="single-column">Single Column</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rank
                  <input
                    type="number"
                    value={form.rank}
                    onChange={(e) => onChange('rank', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                  <input
                    value={form.metaTitle}
                    onChange={(e) => onChange('metaTitle', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SEO title"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                  <input
                    value={form.metaDescription}
                    onChange={(e) => onChange('metaDescription', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SEO description"
                  />
                </label>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => onChange('isPublished', e.target.checked)}
                  className="rounded border-gray-300"
                  id="isPublished"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-700">
                  Published
                </label>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume Data (JSON) *
                  <textarea
                    value={form.resumeData}
                    onChange={(e) => onChange('resumeData', e.target.value)}
                    className={`w-full rounded-lg border p-3 text-sm h-48 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isParsed ? 'border-green-300 bg-green-50/30' : 'border-gray-300'
                    }`}
                    placeholder='{"personalDetails": {...}, "experience": [...], ...}'
                  />
                </label>
                {isParsed && <p className="text-xs text-green-600 mt-1">Auto-generated from uploaded resume PDF</p>}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setIsParsed(false);
                }}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={
                  isSaving ||
                  parseMutation.isPending ||
                  !form.title ||
                  !form.slug ||
                  !form.categoryId ||
                  !form.templateId
                }
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
