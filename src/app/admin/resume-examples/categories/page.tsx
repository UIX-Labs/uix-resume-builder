'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import {
  useResumeExampleCategories,
  useCreateResumeExampleCategory,
  useUpdateResumeExampleCategory,
  useDeleteResumeExampleCategory,
} from '@/features/admin/hooks/use-admin-queries';
import type { AdminResumeExampleCategory } from '@/features/admin/types/admin.types';

const EMPTY_FORM = {
  slug: '',
  name: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  heroHeading: '',
  heroDescription: '',
  rank: 0,
};

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useResumeExampleCategories();
  const createMutation = useCreateResumeExampleCategory();
  const updateMutation = useUpdateResumeExampleCategory();
  const deleteMutation = useDeleteResumeExampleCategory();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (cat: AdminResumeExampleCategory) => {
    setEditingId(cat.id);
    setForm({
      slug: cat.slug,
      name: cat.name,
      metaTitle: cat.metaTitle,
      metaDescription: cat.metaDescription,
      metaKeywords: cat.metaKeywords?.join(', ') || '',
      heroHeading: cat.heroHeading || '',
      heroDescription: cat.heroDescription || '',
      rank: cat.rank,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      metaKeywords: form.metaKeywords ? form.metaKeywords.split(',').map((k) => k.trim()).filter(Boolean) : [],
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
    if (window.confirm('Delete this category?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const onChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const columns: Column<AdminResumeExampleCategory>[] = [
    { key: 'name', label: 'Name' },
    {
      key: 'slug',
      label: 'Slug',
      render: (row) => <span className="text-xs font-mono text-gray-500">{row.slug}</span>,
    },
    { key: 'rank', label: 'Rank', sortable: true },
    {
      key: 'metaTitle',
      label: 'Meta Title',
      render: (row) => <span className="text-xs text-gray-600 max-w-xs truncate block">{row.metaTitle}</span>,
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
          <h2 className="text-2xl font-bold text-gray-900">Resume Example Categories</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-semibold text-gray-900">{categories?.length || 0}</span> categories
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Category
        </button>
      </div>

      <DataTable
        columns={columns}
        data={categories || []}
        total={categories?.length || 0}
        isLoading={isLoading}
        emptyMessage="No categories found"
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Category' : 'Add New Category'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  value={form.slug}
                  onChange={(e) => onChange('slug', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., software-engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title *</label>
                <input
                  value={form.metaTitle}
                  onChange={(e) => onChange('metaTitle', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO title for this category page"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description *</label>
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => onChange('metaDescription', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO description for this category page"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                <input
                  value={form.metaKeywords}
                  onChange={(e) => onChange('metaKeywords', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="comma, separated, keywords"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Heading</label>
                <input
                  value={form.heroHeading}
                  onChange={(e) => onChange('heroHeading', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero section heading text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Description</label>
                <textarea
                  value={form.heroDescription}
                  onChange={(e) => onChange('heroDescription', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero section description text"
                />
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
                disabled={isPending || !form.name || !form.slug || !form.metaTitle || !form.metaDescription}
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
