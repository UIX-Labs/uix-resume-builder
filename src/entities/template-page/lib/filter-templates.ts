import type { Template } from '../api/template-data';
import type { TemplateFilters } from '../types/template-filters';

export function filterTemplates(templates: Template[], filters: TemplateFilters): Template[] {
  return templates.filter((template) => {
    if (filters.styles && filters.styles.length > 0) {
      const templateStyles = (template.style || []).map((s) => s.toLowerCase());
      const hasMatch = filters.styles.some((fs) => templateStyles.includes(fs.toLowerCase()));
      if (!hasMatch) return false;
    }

    if (filters.layoutType) {
      if (template.layoutType !== filters.layoutType) return false;
    }

    if (filters.role) {
      const hasRole = template.roles?.some((r) => r.name === filters.role);
      if (!hasRole) return false;
    }

    if (filters.primaryColor) {
      const hasColor = template.colorVariations?.some(
        (cv) => cv.primaryColor.toLowerCase() === filters.primaryColor?.toLowerCase(),
      );
      if (!hasColor) return false;
    }

    return true;
  });
}
