import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResumeRenderer } from '@features/resume/renderer';
import { getCleanDataForRenderer } from '@widgets/form-page-builder/lib/data-cleanup';
import mockData from './mock-data.json';

// All templates
import template1 from '@features/resume/templates/template1';
import standard from '@features/resume/templates/standard';
import standard2 from '@features/resume/templates/standard2';
import aniket from '@features/resume/templates/aniket';
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
import enzoTemplate1 from '@features/resume/templates/enzo-template1';
import enzoTemplate2 from '@features/resume/templates/enzo-template2';
import enzoTemplate3 from '@features/resume/templates/enzo-template3';
import erenTemplate1 from '@features/resume/templates/eren-templete1';
import erenTemplate2 from '@features/resume/templates/eren-templete2';
import erenTemplate3 from '@features/resume/templates/eren-templete-3';

const TEMPLATES: Record<string, unknown> = {
  'Template 1': template1,
  Standard: standard,
  'Standard 2': standard2,
  Aniket: aniket,
  'Template 2': template2,
  'Template 3': template3,
  'Template 4': template4,
  'Template 5': template5,
  'Template 6': template6,
  'Template 7': template7,
  'Template 8': template8,
  'Template 9': template9,
  'Template 10': template10,
  'Template 11': template11,
  'Template 12': template12,
  'Template 13': template13,
  'Enzo 1': enzoTemplate1,
  'Enzo 2': enzoTemplate2,
  'Enzo 3': enzoTemplate3,
  'Eren 1': erenTemplate1,
  'Eren 2': erenTemplate2,
  'Eren 3': erenTemplate3,
};

const cleanedData = getCleanDataForRenderer(mockData as Record<string, unknown>, false);

interface StoryProps {
  templateName: string;
  isThumbnail: boolean;
  hasSuggestions: boolean;
  currentSection?: string;
}

function OldRendererStory({ templateName, isThumbnail, hasSuggestions, currentSection }: StoryProps) {
  const template = TEMPLATES[templateName];
  if (!template) return <div>Template &quot;{templateName}&quot; not found</div>;

  return (
    <div style={{ background: '#f5f5f5', padding: '24px' }}>
      <ResumeRenderer
        template={template as any}
        data={cleanedData as any}
        isThumbnail={isThumbnail}
        hasSuggestions={hasSuggestions}
        currentSection={currentSection}
      />
    </div>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Resume/Old Renderer',
  component: OldRendererStory,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    templateName: {
      control: 'select',
      options: Object.keys(TEMPLATES),
      description: 'Select a template to preview',
    },
    isThumbnail: { control: 'boolean' },
    hasSuggestions: { control: 'boolean' },
    currentSection: {
      control: 'select',
      options: [
        '',
        'personalDetails',
        'experience',
        'education',
        'skills',
        'projects',
        'certifications',
        'interests',
        'achievements',
      ],
    },
  },
  args: {
    templateName: 'Template 1',
    isThumbnail: false,
    hasSuggestions: false,
    currentSection: '',
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Template1: Story = { args: { templateName: 'Template 1' } };
export const Standard_: Story = { args: { templateName: 'Standard' } };
export const Standard2: Story = { args: { templateName: 'Standard 2' } };
export const Aniket: Story = { args: { templateName: 'Aniket' } };
export const Template2: Story = { args: { templateName: 'Template 2' } };
export const Template3: Story = { args: { templateName: 'Template 3' } };
export const Template4: Story = { args: { templateName: 'Template 4' } };
export const Template5: Story = { args: { templateName: 'Template 5' } };
export const Template6: Story = { args: { templateName: 'Template 6' } };
export const Template7: Story = { args: { templateName: 'Template 7' } };
export const Template8: Story = { args: { templateName: 'Template 8' } };
export const Template9: Story = { args: { templateName: 'Template 9' } };
export const Template10: Story = { args: { templateName: 'Template 10' } };
export const Template11: Story = { args: { templateName: 'Template 11' } };
export const Template12: Story = { args: { templateName: 'Template 12' } };
export const Template13: Story = { args: { templateName: 'Template 13' } };
export const Enzo1: Story = { args: { templateName: 'Enzo 1' } };
export const Enzo2: Story = { args: { templateName: 'Enzo 2' } };
export const Enzo3: Story = { args: { templateName: 'Enzo 3' } };
export const Eren1: Story = { args: { templateName: 'Eren 1' } };
export const Eren2: Story = { args: { templateName: 'Eren 2' } };
export const Eren3: Story = { args: { templateName: 'Eren 3' } };
