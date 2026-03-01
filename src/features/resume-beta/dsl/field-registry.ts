// ---------------------------------------------------------------------------
// Field Registry
//
// Extensible registry for field renderers. Mirrors the section registry
// pattern — new field types can be added without modifying central code.
// ---------------------------------------------------------------------------

import type { SuggestedUpdates } from '@entities/resume';
import type React from 'react';

// ---------------------------------------------------------------------------
// Context passed to every field renderer
// ---------------------------------------------------------------------------

export interface FieldRenderContext {
  data: Record<string, unknown>;
  itemId?: string;
  suggestedUpdates?: SuggestedUpdates;
  isThumbnail?: boolean;
  skipImageFallbacks?: boolean;
  sectionId?: string;
}

// ---------------------------------------------------------------------------
// Field renderer interface
// ---------------------------------------------------------------------------

export interface FieldRenderer<TConfig = unknown> {
  /** Must match the `type` discriminant on the field config */
  type: string;

  /** Render the field to React nodes */
  render(config: TConfig, ctx: FieldRenderContext): React.ReactNode;
}

// ---------------------------------------------------------------------------
// Registry implementation
// ---------------------------------------------------------------------------

class FieldRegistryImpl {
  private renderers = new Map<string, FieldRenderer>();

  register(renderer: FieldRenderer): void {
    this.renderers.set(renderer.type, renderer);
  }

  get(type: string): FieldRenderer | undefined {
    return this.renderers.get(type);
  }

  renderField(field: { type?: string; [key: string]: unknown }, ctx: FieldRenderContext): React.ReactNode {
    const type = field.type || 'implicit';
    const renderer = this.renderers.get(type);

    if (!renderer) {
      // Fall back to implicit (text) renderer for unknown types
      const implicitRenderer = this.renderers.get('implicit');
      if (implicitRenderer) {
        return implicitRenderer.render(field, ctx);
      }
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[FieldRegistry] No renderer registered for field type: "${type}"`);
      }
      return null;
    }

    return renderer.render(field, ctx);
  }

  /** Check if a renderer is registered for the given type */
  has(type: string): boolean {
    return this.renderers.has(type);
  }

  /** Get all registered field types (useful for debugging) */
  registeredTypes(): string[] {
    return Array.from(this.renderers.keys());
  }
}

export const FieldRegistry = new FieldRegistryImpl();
