import { lazy } from 'react';
import type { TemplateRegistryEntry, TemplateMetadata } from '../types/template';

const registry = new Map<string, TemplateRegistryEntry>();

export function registerTemplate(entry: TemplateRegistryEntry) {
  registry.set(entry.metadata.id, entry);
}

export function getTemplate(id: string): TemplateRegistryEntry | undefined {
  return registry.get(id);
}

export function getAllTemplates(): TemplateRegistryEntry[] {
  return Array.from(registry.values());
}

export function getTemplateMetadata(): TemplateMetadata[] {
  return Array.from(registry.values()).map((e) => e.metadata);
}

// ---------------------------------------------------------------------------
// Register built-in templates (lazy-loaded for code splitting)
// ---------------------------------------------------------------------------

registerTemplate({
  metadata: {
    id: 'aniket-classic',
    name: 'Aniket Modern Classic',
    description: 'Clean single-column layout with centered header and Lora serif typography.',
    previewImageUrl: '',
    category: 'professional',
    columnLayout: 'single',
  },
  component: lazy(() => import('./aniket-classic')),
});

registerTemplate({
  metadata: {
    id: 'enzo-professional',
    name: 'Enzo Professional',
    description: 'Two-column sidebar layout with warm accent colors and structured sections.',
    previewImageUrl: '',
    category: 'professional',
    columnLayout: 'sidebar-left',
  },
  component: lazy(() => import('./enzo')),
});

registerTemplate({
  metadata: {
    id: 'eren-modern',
    name: 'Eren Modern',
    description: 'Modern table-based layout with gradient header and badge-style skills.',
    previewImageUrl: '',
    category: 'modern',
    columnLayout: 'single',
  },
  component: lazy(() => import('./eren')),
});
