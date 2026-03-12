import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { initDsl } from '@features/resume-beta/dsl/init';
import { ResumeRenderer } from '@features/resume-beta/dsl/renderer';
import { getCleanDataForRenderer } from '@widgets/form-page-builder/lib/data-cleanup';
import mockData from './mock-data.json';

// Typed DSL templates only
import typedTemplate1 from '@features/resume-beta/templates/template1';
import typedEren1 from '@features/resume-beta/templates/eren-template1';
import typedTemplate3 from '@features/resume-beta/templates/template3';
import typedAniket from '@features/resume-beta/templates/aniket';
import typedTemplate8 from '@features/resume-beta/templates/template8';
import typedEnzo1 from '@features/resume-beta/templates/enzo-template1';
import typedEnzo2 from '@features/resume-beta/templates/enzo-template2';
import typedEnzo3 from '@features/resume-beta/templates/enzo-template3';

initDsl();

const TEMPLATES: Record<string, unknown> = {
  'Template 1': typedTemplate1,
  'Eren 1': typedEren1,
  'Template 3': typedTemplate3,
  Aniket: typedAniket,
  'Template 8': typedTemplate8,
  'Enzo 1': typedEnzo1,
  'Enzo 2': typedEnzo2,
  'Enzo 3': typedEnzo3,
};

const cleanedData = getCleanDataForRenderer(mockData as Record<string, unknown>, false);

interface StoryProps {
  templateName: string;
  isThumbnail: boolean;
  hasSuggestions: boolean;
  currentSection?: string;
}

function NewRendererStory({ templateName, isThumbnail, hasSuggestions, currentSection }: StoryProps) {
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
  title: 'Resume/New Renderer (DSL)',
  component: NewRendererStory,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    templateName: {
      control: 'select',
      options: Object.keys(TEMPLATES),
      description: 'Select a typed DSL template to preview',
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
export const Eren1: Story = { args: { templateName: 'Eren 1' } };
export const Template3: Story = { args: { templateName: 'Template 3' } };
export const Aniket: Story = { args: { templateName: 'Aniket' } };
export const Template8: Story = { args: { templateName: 'Template 8' } };
export const Enzo1: Story = { args: { templateName: 'Enzo 1' } };
export const Enzo2: Story = { args: { templateName: 'Enzo 2' } };
export const Enzo3: Story = { args: { templateName: 'Enzo 3' } };
