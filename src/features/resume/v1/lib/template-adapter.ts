/**
 * Resume Engine — Template adapter
 *
 * Converts engine TemplateConfig to legacy ResumeTemplate shape so existing
 * SingleColumnRenderer / TwoColumnRenderer work without duplication.
 * No layout logic here; pure shape mapping.
 */

import type { ResumeTemplate, TemplateColumnsConfig, TemplatePageConfig } from '@features/resume/v1/types';
import type { TemplateConfig, TwoColumnLayoutConfig } from '../types/engine';

/** Type guard: template has engine config shape (id + layout). */
export function isTemplateConfig(template: ResumeTemplate | TemplateConfig): template is TemplateConfig {
  return typeof (template as TemplateConfig).id === 'string' && typeof (template as TemplateConfig).layout === 'object';
}

/** Returns true when template is engine config with isPremium: true. Renderer does not care; builder can lock preview / watermark. */
export function isPremiumTemplate(template: ResumeTemplate | TemplateConfig): boolean {
  return isTemplateConfig(template) && (template as TemplateConfig).isPremium === true;
}

/**
 * Converts engine TemplateConfig to legacy ResumeTemplate.
 * Used by ResumeRenderer to feed existing column renderers.
 */
export function templateConfigToResumeTemplate(config: TemplateConfig): ResumeTemplate {
  const padding = config.page.paddingPx ?? 24;

  const page: TemplatePageConfig = {
    padding,
    background: config.page.background,
    fontFamily: config.page.fontFamily,
    className: config.page.className,
  };

  const columns: TemplateColumnsConfig | undefined =
    config.layout.kind === 'two-column'
      ? {
          spacing: (config.layout as TwoColumnLayoutConfig).spacing,
          left: (config.layout as TwoColumnLayoutConfig).left,
          right: (config.layout as TwoColumnLayoutConfig).right,
        }
      : undefined;

  return {
    name: config.name,
    page,
    columns,
    sections: config.sections as ResumeTemplate['sections'],
  };
}
