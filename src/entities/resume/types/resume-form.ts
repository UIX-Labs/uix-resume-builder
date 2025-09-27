import { ResumeDataKey } from './resume-data';

type FieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'duration' | 'dropdown' | 'chips' | 'tags' | 'data';

interface BaseField {
  name: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required?: boolean;
  fluid?: boolean;
  options?: string[];
}

interface CollapsedState {
  titleKey: string;
  subTitleKey: string;
}

export interface FormSchema extends Record<ResumeDataKey, any> {
  personalDetails: {
    label: string;
    subTitle: string;
    heading: BaseField;
    fullName: BaseField;
    title: BaseField;
    email: BaseField;
    phone: BaseField;
    address: BaseField;
    linkedin: BaseField;
    github: BaseField;
    description: BaseField;
  };

  experience: {
    label: string;
    subTitle: string;
    title: BaseField;
    itemsType: 'draggable';
    collapsedState: CollapsedState;
    duration: BaseField;
    company: BaseField;
    position: BaseField;
    location: BaseField;
    startDate: BaseField;
    description: BaseField;
  };

  skills: {
    label: string;
    description: string;
    itemsType: 'draggable';
    collapsedState: CollapsedState;
    category: BaseField;
    level: BaseField & { options: string[] };
    name: BaseField;
  };

  education: {
    label: string;
    subTitle: string;
    heading: BaseField;
    itemsType: 'draggable';
    fluid: true;
    collapsedState: CollapsedState;
    institution: BaseField;
    degree: BaseField;
    startDate: BaseField;
    fieldOfStudy: BaseField;
    grade: BaseField;
  };

  projects: {
    label: string;
    subTitle: string;
    collapsedState: CollapsedState;
    itemsType: 'draggable';
    duration: BaseField;
    link: BaseField;
    techStack: BaseField;
    description: BaseField;
    title: BaseField;
  };

  interests: {
    label: string;
    subTitle: string;
    items: BaseField;
  };

  achievements: {
    label: string;
    subTitle: string;
    items: BaseField;
  };

  certifications: {
    label: string;
    subTitle: string;
    itemsType: 'draggable';
    duration: BaseField;
    issuer: BaseField;
    link: BaseField;
    title: BaseField;
  };
}
