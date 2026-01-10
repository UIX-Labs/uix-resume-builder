import { describe, it, expect } from 'vitest';

// Import all templates
import aniketTemplate from '@features/resume/templates/aniket';
import standardTemplate from '@features/resume/templates/standard';
import standard2Template from '@features/resume/templates/standard2';
import template1 from '@features/resume/templates/template1';
import template2 from '@features/resume/templates/template2';
import template3 from '@features/resume/templates/template3';
import template4 from '@features/resume/templates/template4';
import template5 from '@features/resume/templates/template5';
import template6 from '@features/resume/templates/template6';
import template7 from '@features/resume/templates/template-7';
import template8 from '@features/resume/templates/template8';
import template9 from '@features/resume/templates/template9';
import template10 from '@features/resume/templates/template10';
import template11 from '@features/resume/templates/template11';
import template12 from '@features/resume/templates/template12';
import template13 from '@features/resume/templates/template13';
import erenTemplate1 from '@features/resume/templates/eren-templete1';
import erenTemplate2 from '@features/resume/templates/eren-templete2';
import erenTemplate3 from '@features/resume/templates/eren-templete-3';
import enzoTemplate1 from '@features/resume/templates/enzo-template1';
import enzoTemplate2 from '@features/resume/templates/enzo-template2';
import enzoTemplate3 from '@features/resume/templates/enzo-template3';

// Array of all templates with their names for parameterized testing
const allTemplates = [
  { name: 'aniket', template: aniketTemplate },
  { name: 'standard', template: standardTemplate },
  { name: 'standard2', template: standard2Template },
  { name: 'template1', template: template1 },
  { name: 'template2', template: template2 },
  { name: 'template3', template: template3 },
  { name: 'template4', template: template4 },
  { name: 'template5', template: template5 },
  { name: 'template6', template: template6 },
  { name: 'template7', template: template7 },
  { name: 'template8', template: template8 },
  { name: 'template9', template: template9 },
  { name: 'template10', template: template10 },
  { name: 'template11', template: template11 },
  { name: 'template12', template: template12 },
  { name: 'template13', template: template13 },
  { name: 'eren-template1', template: erenTemplate1 },
  { name: 'eren-template2', template: erenTemplate2 },
  { name: 'eren-template3', template: erenTemplate3 },
  { name: 'enzo-template1', template: enzoTemplate1 },
  { name: 'enzo-template2', template: enzoTemplate2 },
  { name: 'enzo-template3', template: enzoTemplate3 },
];

describe('Template Structure Validation', () => {
  it.each(allTemplates)('$name has valid structure', ({ template }) => {
    // Check required top-level properties
    expect(template).toHaveProperty('name');
    expect(template).toHaveProperty('page');
    expect(template).toHaveProperty('sections');

    // Validate name is a non-empty string
    expect(typeof template.name).toBe('string');
    expect(template.name.length).toBeGreaterThan(0);

    // Validate page structure
    expect(template.page).toBeTypeOf('object');
    expect(template.page).toHaveProperty('background');
    expect(template.page).toHaveProperty('className');
    expect(template.page).toHaveProperty('fontFamily');

    // Validate sections is an array
    expect(Array.isArray(template.sections)).toBe(true);
    expect(template.sections.length).toBeGreaterThan(0);

    // Validate each section has required properties
    template.sections.forEach((section: any, index: number) => {
      expect(section, `Section ${index} is missing required properties`).toHaveProperty('type');
      expect(typeof section.type).toBe('string');
      expect(section.type.length).toBeGreaterThan(0);
    });
  });

  it.each(allTemplates)('$name has valid page configuration', ({ template }) => {
    const { page } = template;

    // Validate background is a string (color value)
    expect(typeof page.background).toBe('string');

    // Validate className is a string
    expect(typeof page.className).toBe('string');

    // Validate fontFamily is a string
    expect(typeof page.fontFamily).toBe('string');
  });

  it.each(allTemplates)('$name sections have valid types', ({ template }) => {
    const validSectionTypes = [
      'header',
      'banner',
      'list-section',
      'content-section',
      'inline-list-section',
      'badge-section',
      'table-section',
      'two-column-layout',
    ];

    template.sections.forEach((section: any, index: number) => {
      expect(
        validSectionTypes.includes(section.type),
        `Section ${index} has invalid type: ${section.type}`,
      ).toBe(true);
    });
  });

  it.each(allTemplates)('$name has at least one header section', ({ template }) => {
    // Helper function to recursively check for header/banner sections
    const hasHeaderRecursive = (sections: any[]): boolean => {
      return sections.some((section: any) => {
        if (section.type === 'header' || section.type === 'banner') {
          return true;
        }
        // Check nested sections in two-column-layout
        if (section.type === 'two-column-layout') {
          const leftHasHeader =
            section.leftColumn?.sections?.some(
              (s: any) => s.type === 'header' || s.type === 'banner',
            ) || false;
          const rightHasHeader =
            section.rightColumn?.sections?.some(
              (s: any) => s.type === 'header' || s.type === 'banner',
            ) || false;
          return leftHasHeader || rightHasHeader;
        }
        return false;
      });
    };

    const hasHeader = hasHeaderRecursive(template.sections);
    expect(hasHeader, 'Template should have at least one header or banner section').toBe(true);
  });
});
