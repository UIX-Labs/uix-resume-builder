'use client';

import { useState } from 'react';
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

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
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
    setShowModal(true);
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
            onClick={() => openEdit(row)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-xs text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const isPending = createMutation.isPending || updateMutation.isPending;

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
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Example
        </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => onChange('title', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Senior Software Engineer Resume"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  value={form.slug}
                  onChange={(e) => onChange('slug', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., senior-software-engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => onChange('categoryId', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category...</option>
                  {categories?.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template *</label>
                <select
                  value={form.templateId}
                  onChange={(e) => onChange('templateId', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select template...</option>
                  {templates?.map((t) => (
                    <option key={t.id} value={t.id}>{t.id.slice(0, 8)}... (Rank: {t.rank})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  value={form.role}
                  onChange={(e) => onChange('role', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Years</label>
                <input
                  type="number"
                  value={form.experienceYears}
                  onChange={(e) => onChange('experienceYears', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                <input
                  value={form.primaryColor}
                  onChange={(e) => onChange('primaryColor', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., #3B82F6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color Name</label>
                <input
                  value={form.colorName}
                  onChange={(e) => onChange('colorName', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
                <select
                  value={form.layout}
                  onChange={(e) => onChange('layout', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="two-column">Two Column</option>
                  <option value="single-column">Single Column</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
                <input
                  type="number"
                  value={form.rank}
                  onChange={(e) => onChange('rank', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input
                  value={form.metaTitle}
                  onChange={(e) => onChange('metaTitle', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <input
                  value={form.metaDescription}
                  onChange={(e) => onChange('metaDescription', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO description"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => onChange('isPublished', e.target.checked)}
                  className="rounded border-gray-300"
                  id="isPublished"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-700">Published</label>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume Data (JSON) *</label>
                <textarea
                  value={form.resumeData}
                  onChange={(e) => onChange('resumeData', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm h-48 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder='{"personalDetails": {...}, "experience": [...], ...}'
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowModal(false); setEditingId(null); }}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending || !form.title || !form.slug || !form.categoryId || !form.templateId}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
