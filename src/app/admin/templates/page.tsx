'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { useAdminTemplates, useToggleTemplate, useCreateTemplate } from '@/features/admin/hooks/use-admin-queries';
import type { AdminTemplate } from '@/features/admin/types/admin.types';

export default function AdminTemplatesPage() {
  const { data: templates, isLoading } = useAdminTemplates();
  const toggleMutation = useToggleTemplate();
  const createMutation = useCreateTemplate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCreate = async () => {
    const formData = new FormData();
    if (jsonInput) formData.append('json', jsonInput);
    if (imageFile) formData.append('file', imageFile);
    await createMutation.mutateAsync(formData);
    setShowCreateModal(false);
    setJsonInput('');
    setImageFile(null);
  };

  const columns: Column<AdminTemplate>[] = [
    {
      key: 'preview',
      label: 'Preview',
      render: (row) => (
        <div className="w-12 h-16 rounded border border-gray-200 overflow-hidden bg-gray-100">
          {row.publicImage?.url ? (
            <img src={row.publicImage.url} alt="Template" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">N/A</div>
          )}
        </div>
      ),
    },
    {
      key: 'id',
      label: 'ID',
      render: (row) => <span className="text-xs font-mono text-gray-500">{row.id.slice(0, 8)}...</span>,
    },
    { key: 'rank', label: 'Rank', sortable: true },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (
        <button
          onClick={() => toggleMutation.mutate(row.id)}
          disabled={toggleMutation.isPending}
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
            row.isActive
              ? 'bg-green-50 text-green-700 hover:bg-green-100'
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          {row.isActive ? 'Active' : 'Disabled'}
        </button>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Templates</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Template
        </button>
      </div>

      <DataTable
        columns={columns}
        data={templates || []}
        total={templates?.length || 0}
        isLoading={isLoading}
        emptyMessage="No templates found"
      />

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Template</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template JSON</label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm h-40 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder='{"sections": [...]}'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={createMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {createMutation.isPending ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
