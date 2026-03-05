'use client';

import { DataTable, type Column } from '@/features/admin/components/data-table';
import {
  useAdminTemplates,
  useCreateRole,
  useCreateTemplate,
  useDeleteRole,
  useRoles,
  useUpdateTemplate,
  useUpdateTemplateMetadata,
  useUpdateTemplateStatus,
} from '@/features/admin/hooks/use-admin-queries';
import type {
  AdminTemplate,
  ColorVariation,
  Role,
  TemplateLayoutType,
  TemplateStatus,
  UpdateTemplateMetadataPayload,
} from '@/features/admin/types/admin.types';
import { useCallback, useState } from 'react';

// ─── Status Config ──────────────────────────────────────────────
const STATUS_CONFIG: Record<TemplateStatus, { label: string; bgClass: string; textClass: string }> = {
  active: { label: 'Active', bgClass: 'bg-green-50 hover:bg-green-100', textClass: 'text-green-700' },
  disabled: { label: 'Disabled', bgClass: 'bg-red-50 hover:bg-red-100', textClass: 'text-red-700' },
  draft: { label: 'Draft', bgClass: 'bg-yellow-50 hover:bg-yellow-100', textClass: 'text-yellow-700' },
};

const STATUS_ORDER: TemplateStatus[] = ['active', 'disabled', 'draft'];

const LAYOUT_OPTIONS: { value: TemplateLayoutType; label: string }[] = [
  { value: 'single_column', label: 'Single Column' },
  { value: 'double_column', label: 'Double Column' },
  { value: 'custom', label: 'Custom' },
];

// ─── Edit/Create Modal ──────────────────────────────────────────
interface TemplateFormData {
  jsonInput: string;
  imageFile: File | null;
  status: TemplateStatus;
  layoutType: TemplateLayoutType;
  hasProfilePhoto: boolean;
  colorVariations: ColorVariation[];
  selectedRoleIds: string[];
  rank: number;
}

const defaultFormData: TemplateFormData = {
  jsonInput: '',
  imageFile: null,
  status: 'draft',
  layoutType: 'single_column',
  hasProfilePhoto: false,
  colorVariations: [],
  selectedRoleIds: [],
  rank: 999999,
};

function TemplateFormModal({
  template,
  roles,
  onClose,
  onSave,
  isSaving,
}: {
  template: AdminTemplate | null; // null = create mode
  roles: Role[];
  onClose: () => void;
  onSave: (data: TemplateFormData) => void;
  isSaving: boolean;
}) {
  const isEdit = !!template;
  const [form, setForm] = useState<TemplateFormData>(
    template
      ? {
          jsonInput: template.json ? JSON.stringify(template.json, null, 2) : '',
          imageFile: null,
          status: template.status,
          layoutType: template.layoutType,
          hasProfilePhoto: template.hasProfilePhoto,
          colorVariations: template.colorVariations || [],
          selectedRoleIds: template.roles?.map((r) => r.id) || [],
          rank: template.rank,
        }
      : defaultFormData,
  );
  const [newRoleName, setNewRoleName] = useState('');
  const createRoleMutation = useCreateRole();

  const addColorVariation = () => {
    if (form.colorVariations.length >= 5) return;
    setForm((prev) => ({
      ...prev,
      colorVariations: [...prev.colorVariations, { name: '', primaryColor: '#000000' }],
    }));
  };

  const removeColorVariation = (index: number) => {
    setForm((prev) => ({
      ...prev,
      colorVariations: prev.colorVariations.filter((_, i) => i !== index),
    }));
  };

  const updateColorVariation = (index: number, field: keyof ColorVariation, value: string) => {
    setForm((prev) => ({
      ...prev,
      colorVariations: prev.colorVariations.map((cv, i) => (i === index ? { ...cv, [field]: value } : cv)),
    }));
  };

  const toggleRole = (roleId: string) => {
    setForm((prev) => ({
      ...prev,
      selectedRoleIds: prev.selectedRoleIds.includes(roleId)
        ? prev.selectedRoleIds.filter((id) => id !== roleId)
        : [...prev.selectedRoleIds, roleId],
    }));
  };

  const handleCreateRole = async () => {
    if (!newRoleName.trim()) return;
    try {
      const newRole = await createRoleMutation.mutateAsync({ name: newRoleName.trim() });
      setForm((prev) => ({ ...prev, selectedRoleIds: [...prev.selectedRoleIds, newRole.id] }));
      setNewRoleName('');
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-lg font-semibold mb-6">{isEdit ? 'Edit Template' : 'Add New Template'}</h3>

        <div className="space-y-6">
          {/* Status */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Status</span>
            <div className="flex gap-2">
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    form.status === s
                      ? `${STATUS_CONFIG[s].bgClass} ${STATUS_CONFIG[s].textClass} border-current`
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Layout Type */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Layout Type</span>
            <div className="flex gap-2">
              {LAYOUT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, layoutType: opt.value }))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    form.layoutType === opt.value
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Photo Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">With Profile Photo</span>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, hasProfilePhoto: !prev.hasProfilePhoto }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.hasProfilePhoto ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.hasProfilePhoto ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Rank */}
          <div>
            <label htmlFor="template-rank" className="block text-sm font-medium text-gray-700 mb-1">
              Rank
            </label>
            <input
              id="template-rank"
              type="number"
              value={form.rank}
              onChange={(e) => setForm((prev) => ({ ...prev, rank: parseInt(e.target.value) || 0 }))}
              className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Color Variations */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Color Variations ({form.colorVariations.length}/5)
              </span>
              {form.colorVariations.length < 5 && (
                <button
                  type="button"
                  onClick={addColorVariation}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Color
                </button>
              )}
            </div>
            {form.colorVariations.length === 0 && (
              <p className="text-sm text-gray-400 italic">No color variations added yet.</p>
            )}
            <div className="space-y-2">
              {form.colorVariations.map((cv, index) => (
                <div key={`color-${cv.primaryColor}-${cv.name}`} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={cv.primaryColor}
                    onChange={(e) => updateColorVariation(index, 'primaryColor', e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={cv.name}
                    onChange={(e) => updateColorVariation(index, 'name', e.target.value)}
                    placeholder="Color name (e.g. Ocean Blue)"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-400 font-mono w-16">{cv.primaryColor}</span>
                  <button
                    type="button"
                    onClick={() => removeColorVariation(index)}
                    className="text-red-400 hover:text-red-600 text-sm px-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Roles */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Roles</span>
            <div className="flex flex-wrap gap-2 mb-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => toggleRole(role.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    form.selectedRoleIds.includes(role.id)
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {role.name}
                </button>
              ))}
              {roles.length === 0 && <p className="text-sm text-gray-400 italic">No roles created yet.</p>}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateRole()}
                placeholder="New role name..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleCreateRole}
                disabled={createRoleMutation.isPending || !newRoleName.trim()}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                {createRoleMutation.isPending ? '...' : 'Add'}
              </button>
            </div>
          </div>

          {/* Template JSON */}
          <div>
            <label htmlFor="template-json" className="block text-sm font-medium text-gray-700 mb-1">
              Template JSON
            </label>
            <textarea
              id="template-json"
              value={form.jsonInput}
              onChange={(e) => setForm((prev) => ({ ...prev, jsonInput: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm h-40 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='{"sections": [...]}'
            />
          </div>

          {/* Template Image */}
          <div>
            <label htmlFor="template-image" className="block text-sm font-medium text-gray-700 mb-1">
              Template Image
            </label>
            {isEdit && template?.publicImage?.url && !form.imageFile && (
              <div className="mb-2 flex items-center gap-2">
                <div className="w-12 h-16 rounded border border-gray-200 overflow-hidden bg-gray-100">
                  {/* biome-ignore lint/performance/noImgElement: dynamic image source */}
                  <img src={template.publicImage.url} alt="Current" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-gray-400">Current image</span>
              </div>
            )}
            <input
              id="template-image"
              type="file"
              accept="image/*"
              onChange={(e) => setForm((prev) => ({ ...prev, imageFile: e.target.files?.[0] || null }))}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Template'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Roles Management Section ────────────────────────────────────
function RolesManagement({ roles, isLoading }: { roles: Role[]; isLoading: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const createRoleMutation = useCreateRole();
  const deleteRoleMutation = useDeleteRole();

  const handleCreate = async () => {
    if (!newRoleName.trim()) return;
    await createRoleMutation.mutateAsync({ name: newRoleName.trim(), description: newRoleDesc.trim() || undefined });
    setNewRoleName('');
    setNewRoleDesc('');
  };

  return (
    <div className="mb-6 border border-gray-200 rounded-xl bg-white">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
      >
        <span>Manage Roles ({roles.length})</span>
        <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {isLoading ? (
            <p className="text-sm text-gray-400 py-2">Loading roles...</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mt-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-full px-3 py-1"
                  >
                    <span className="text-sm text-gray-700">{role.name}</span>
                    {role.description && <span className="text-xs text-gray-400 ml-1">({role.description})</span>}
                    <button
                      type="button"
                      onClick={() => deleteRoleMutation.mutate(role.id)}
                      disabled={deleteRoleMutation.isPending}
                      className="text-red-400 hover:text-red-600 text-sm ml-1"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {roles.length === 0 && <p className="text-sm text-gray-400 italic">No roles yet.</p>}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Role name"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Description (optional)"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={createRoleMutation.isPending || !newRoleName.trim()}
                  className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {createRoleMutation.isPending ? '...' : 'Add Role'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function AdminTemplatesPage() {
  const { data: templates, isLoading } = useAdminTemplates();
  const { data: roles = [], isLoading: rolesLoading } = useRoles();
  const statusMutation = useUpdateTemplateStatus();
  const metadataMutation = useUpdateTemplateMetadata();
  const createMutation = useCreateTemplate();
  const updateTemplateMutation = useUpdateTemplate();

  const [editingTemplate, setEditingTemplate] = useState<AdminTemplate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const cycleStatus = useCallback(
    (template: AdminTemplate) => {
      const currentIndex = STATUS_ORDER.indexOf(template.status);
      const nextStatus = STATUS_ORDER[(currentIndex + 1) % STATUS_ORDER.length];
      statusMutation.mutate({ id: template.id, status: nextStatus });
    },
    [statusMutation],
  );

  const handleSave = async (formData: TemplateFormData) => {
    if (editingTemplate) {
      // Update mode: update JSON/image via PUT, then metadata via PATCH
      if (formData.jsonInput || formData.imageFile) {
        const fd = new FormData();
        if (formData.jsonInput) fd.append('json', formData.jsonInput);
        if (formData.imageFile) fd.append('file', formData.imageFile);
        await updateTemplateMutation.mutateAsync({ id: editingTemplate.id, formData: fd });
      }

      const metadataPayload: UpdateTemplateMetadataPayload = {
        status: formData.status,
        colorVariations: formData.colorVariations,
        layoutType: formData.layoutType,
        hasProfilePhoto: formData.hasProfilePhoto,
        roleIds: formData.selectedRoleIds,
        rank: formData.rank,
      };
      await metadataMutation.mutateAsync({ id: editingTemplate.id, data: metadataPayload });
      setEditingTemplate(null);
    } else {
      // Create mode
      const fd = new FormData();
      if (formData.jsonInput) fd.append('json', formData.jsonInput);
      if (formData.imageFile) fd.append('file', formData.imageFile);
      const created = await createMutation.mutateAsync(fd);

      // After creation, update metadata
      if (created?.id) {
        const metadataPayload: UpdateTemplateMetadataPayload = {
          status: formData.status,
          colorVariations: formData.colorVariations,
          layoutType: formData.layoutType,
          hasProfilePhoto: formData.hasProfilePhoto,
          roleIds: formData.selectedRoleIds,
          rank: formData.rank,
        };
        await metadataMutation.mutateAsync({ id: created.id, data: metadataPayload });
      }
      setShowCreateModal(false);
    }
  };

  const isSaving = createMutation.isPending || updateTemplateMutation.isPending || metadataMutation.isPending;

  const columns: Column<AdminTemplate>[] = [
    {
      key: 'preview',
      label: 'Preview',
      render: (row) => (
        <div className="w-12 h-16 rounded border border-gray-200 overflow-hidden bg-gray-100">
          {row.publicImage?.url ? (
            // biome-ignore lint/performance/noImgElement: dynamic image source
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
      key: 'layoutType',
      label: 'Layout',
      render: (row) => {
        const label = LAYOUT_OPTIONS.find((o) => o.value === row.layoutType)?.label || row.layoutType;
        return <span className="text-xs text-gray-600">{label}</span>;
      },
    },
    {
      key: 'hasProfilePhoto',
      label: 'Photo',
      render: (row) => (
        <span className={`text-xs font-medium ${row.hasProfilePhoto ? 'text-green-600' : 'text-gray-400'}`}>
          {row.hasProfilePhoto ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'colorVariations',
      label: 'Colors',
      render: (row) => (
        <div className="flex items-center gap-1">
          {(row.colorVariations || []).slice(0, 5).map((cv, i) => (
            <div
              key={`${row.id}-color-${i}`}
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: cv.primaryColor }}
              title={cv.name}
            />
          ))}
          {(!row.colorVariations || row.colorVariations.length === 0) && (
            <span className="text-xs text-gray-400">None</span>
          )}
        </div>
      ),
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {(row.roles || []).map((role) => (
            <span
              key={role.id}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200"
            >
              {role.name}
            </span>
          ))}
          {(!row.roles || row.roles.length === 0) && <span className="text-xs text-gray-400">None</span>}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const config = STATUS_CONFIG[row.status] || STATUS_CONFIG.draft;
        return (
          <button
            type="button"
            onClick={() => cycleStatus(row)}
            disabled={statusMutation.isPending}
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${config.bgClass} ${config.textClass}`}
          >
            {config.label}
          </button>
        );
      },
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <button
          type="button"
          onClick={() => setEditingTemplate(row)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Templates</h2>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Template
        </button>
      </div>

      <RolesManagement roles={roles} isLoading={rolesLoading} />

      <DataTable
        columns={columns}
        data={templates || []}
        total={templates?.length || 0}
        isLoading={isLoading}
        emptyMessage="No templates found"
      />

      {/* Edit Modal */}
      {editingTemplate && (
        <TemplateFormModal
          template={editingTemplate}
          roles={roles}
          onClose={() => setEditingTemplate(null)}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <TemplateFormModal
          template={null}
          roles={roles}
          onClose={() => setShowCreateModal(false)}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
