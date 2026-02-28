/**
 * Template registry — maps human-readable template keys to their local imports.
 *
 * Usage:
 *   import { templateRegistry, type TemplateName } from './template-registry';
 *   const tmpl = templateRegistry['mohsina-template1'];
 */

import aniket from '@features/resume/templates/aniket';
import enzoTemplate1 from '@features/resume/templates/enzo-template1';
import enzoTemplate2 from '@features/resume/templates/enzo-template2';
import enzoTemplate3 from '@features/resume/templates/enzo-template3';
import erenTemplate3 from '@features/resume/templates/eren-templete-3';
import erenTemplate1 from '@features/resume/templates/eren-templete1';
import erenTemplate2 from '@features/resume/templates/eren-templete2';
//import mohsinaTemplate1 from '@features/resume/templates/mohsina-template1';
import mohsinaTemplate2 from '@features/resume/templates/mohsina-template2';
import standard from '@features/resume/templates/standard';
import standard2 from '@features/resume/templates/standard2';
import template7 from '@features/resume/templates/template-7';
import template1 from '@features/resume/templates/template1';
import template10 from '@features/resume/templates/template10';
import template11 from '@features/resume/templates/template11';
import template12 from '@features/resume/templates/template12';
import template13 from '@features/resume/templates/template13';
import template2 from '@features/resume/templates/template2';
import template3 from '@features/resume/templates/template3';
import template4 from '@features/resume/templates/template4';
import template5 from '@features/resume/templates/template5';
import template6 from '@features/resume/templates/template6';
import template8 from '@features/resume/templates/template8';
import template9 from '@features/resume/templates/template9';

export const templateRegistry: Record<string, any> = {
  aniket,
  standard,
  standard2,
  template1,
  template2,
  template3,
  template4,
  template5,
  template6,
  template7,
  template8,
  template9,
  template10,
  template11,
  template12,
  template13,
  'eren-template1': erenTemplate1,
  'eren-template2': erenTemplate2,
  'eren-template3': erenTemplate3,
  'enzo-template1': enzoTemplate1,
  'enzo-template2': enzoTemplate2,
  'enzo-template3': enzoTemplate3,
  'mohsina-template2': mohsinaTemplate2,
  // 'mohsina-template1': mohsinaTemplate1,
};

/** Union type of all valid template keys */
export type TemplateName = keyof typeof templateRegistry;

/** Get all available template names */
export const getTemplateNames = (): string[] => Object.keys(templateRegistry);
