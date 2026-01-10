import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ResumeRenderer } from '@features/resume/renderer';
import { mockResumeData } from './fixtures/mock-data';

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

// Array of all templates for parameterized testing
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

describe('Full Template Rendering Snapshots', () => {
  // Use parameterized tests to generate snapshots for all templates
  it.each(allTemplates)('renders $name template correctly', ({ template }) => {
    // Render the template with mock data
    // Using isThumbnail=true to avoid pagination complexity in snapshots
    const { container } = render(
      <ResumeRenderer template={template} data={mockResumeData} isThumbnail={true} skipImageFallbacks={true} />,
    );

    // Create snapshot of the rendered output
    expect(container).toMatchSnapshot();
  });

  // Test that templates render without errors
  it.each(allTemplates)('$name template renders without throwing errors', ({ template }) => {
    expect(() => {
      render(<ResumeRenderer template={template} data={mockResumeData} isThumbnail={true} skipImageFallbacks={true} />);
    }).not.toThrow();
  });

  // Test that templates produce non-empty output
  it.each(allTemplates)('$name template produces non-empty output', ({ template }) => {
    const { container } = render(
      <ResumeRenderer template={template} data={mockResumeData} isThumbnail={true} skipImageFallbacks={true} />,
    );

    // Check that container has content
    expect(container.innerHTML.trim().length).toBeGreaterThan(0);
  });
});
