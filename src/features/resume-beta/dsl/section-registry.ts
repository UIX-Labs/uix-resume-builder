// ---------------------------------------------------------------------------
// Section Registry
//
// Extensible registry for section renderers. New section types can be added
// by creating a renderer file and calling `SectionRegistry.register(...)`.
// No central dispatcher needs to be modified.
// ---------------------------------------------------------------------------

import type React from 'react';
import type { CleanedResumeDataCompat } from './cleaned-data';
import { isSectionHidden } from '../lib/section-utils';

// ---------------------------------------------------------------------------
// Context passed to every section renderer
// ---------------------------------------------------------------------------

export interface SectionRenderContext {
  data: CleanedResumeDataCompat;
  currentSection?: string;
  hasSuggestions?: boolean;
  isThumbnail?: boolean;
  skipImageFallbacks?: boolean;
  hasNextSection?: boolean;
  /** Recursive render — used by two-column-layout to render nested sections */
  renderSection: (section: unknown, ctx: SectionRenderContext) => React.ReactNode;
}

// ---------------------------------------------------------------------------
// Section renderer interface
// ---------------------------------------------------------------------------

export interface SectionRenderer<TConfig = unknown> {
  /** Must match the `type` discriminant on the section config */
  type: string;

  /** Render the section to React nodes */
  render(config: TConfig, ctx: SectionRenderContext): React.ReactNode;

  /**
   * Optional visibility check. Return false to skip rendering this section
   * (e.g. when the data is empty or the section is hidden).
   */
  willRender?(config: TConfig, ctx: SectionRenderContext): boolean;
}

// ---------------------------------------------------------------------------
// Registry implementation
// ---------------------------------------------------------------------------

class SectionRegistryImpl {
  private renderers = new Map<string, SectionRenderer>();

  register(renderer: SectionRenderer): void {
    this.renderers.set(renderer.type, renderer);
  }

  get(type: string): SectionRenderer | undefined {
    return this.renderers.get(type);
  }

  renderSection(section: { type: string }, ctx: SectionRenderContext): React.ReactNode {
    if (isSectionHidden(section as Record<string, unknown>, ctx.data as Record<string, unknown>)) {
      return null;
    }

    const renderer = this.renderers.get(section.type);
    if (!renderer) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[SectionRegistry] No renderer registered for section type: "${section.type}"`);
      }
      return null;
    }
    return renderer.render(section, ctx);
  }

  willSectionRender(section: { type: string }, ctx: SectionRenderContext): boolean {
    if (isSectionHidden(section as Record<string, unknown>, ctx.data as Record<string, unknown>)) {
      return false;
    }

    const renderer = this.renderers.get(section.type);
    if (!renderer?.willRender) return true;
    return renderer.willRender(section, ctx);
  }

  /** Check if a renderer is registered for the given type */
  has(type: string): boolean {
    return this.renderers.has(type);
  }

  /** Get all registered section types (useful for debugging) */
  registeredTypes(): string[] {
    return Array.from(this.renderers.keys());
  }
}

export const SectionRegistry = new SectionRegistryImpl();
