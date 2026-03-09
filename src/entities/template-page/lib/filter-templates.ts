import type { Template } from '../api/template-data';
import type { TemplateFilters } from '../types/template-filters';

export function filterTemplates(templates: Template[], filters: TemplateFilters): Template[] {
  return templates.filter((template) => {
    if (filters.styles && filters.styles.length > 0) {
      const templateStyles = (template.style || []).map((s) => s.toLowerCase());
      const hasMatch = filters.styles.some((fs) => templateStyles.includes(fs.toLowerCase()));
      if (!hasMatch) return false;
    }

    if (filters.layoutType && filters.layoutType.length > 0) {
      if (!filters.layoutType.includes(template.layoutType)) return false;
    }

    if (filters.role && filters.role.length > 0) {
      const hasMatch = template.roles?.some((r) => filters.role?.includes(r.name));
      if (!hasMatch) return false;
    }

    if (filters.primaryColor) {
      const hasMatch = template.colorVariations?.some(
        (cv) => cv.primaryColor.toLowerCase() === filters.primaryColor?.toLowerCase(),
      );
      if (!hasMatch) return false;
    }

    return true;
  });
}
