import { sleep } from '@/shared/lib/sleep';

import type { FormSchema, ResumeData } from '../types';
import { fetch } from '@shared/api';

const data = {
  personalDetails: {
    label: 'Personal Details',
    subTitle: 'Users who added phone number and email received 64% more positive feedback from recruiters.',
    heading: {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      placeholder: 'Enter your heading',
      required: true,
    },

    fullName: {
      name: 'fullName',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name',
      required: true,
    },
    title: {
      name: 'title',
      type: 'text',
      label: 'Title',
      placeholder: 'Enter your title',
      required: true,
    },
    email: {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
    },
    phone: {
      name: 'phone',
      type: 'tel',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      required: true,
    },
    address: {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Enter your address',
      required: true,
    },
    linkedin: {
      name: 'linkedin',
      type: 'url',
      label: 'LinkedIn',
      placeholder: 'Enter your LinkedIn profile URL',
      fluid: true,
      required: true,
    },
    github: {
      name: 'github',
      type: 'url',
      label: 'GitHub',
      placeholder: 'Enter your GitHub profile URL',
      fluid: true,
      required: true,
    },
    description: {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter your description',
      required: true,
      fluid: true,
    },
  },
  // professionalSummary: {
  //   label: 'Professional Summary',
  //   subTitle:
  //     'Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.',
  //   heading: {
  //     name: 'heading',
  //     type: 'text',
  //     placeholder: 'Enter your heading',
  //     label: 'Heading',
  //     required: true,
  //     fluid: true,
  //   },
  //   summary: {
  //     name: 'summary',
  //     type: 'textarea',
  //     placeholder: 'Enter your summary',
  //     label: 'Summary',
  //     required: true,
  //     fluid: true,
  //   },
  // },
  experience: {
    label: 'Experience',
    subTitle:
      'Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).',
    title: {
      name: 'title',
      type: 'text',
      placeholder: 'Enter your heading',
      label: 'Title',
      required: true,
      fluid: true,
    },

    itemsType: 'draggable',

    collapsedState: {
      titleKey: 'company',
      subTitleKey: 'startDate',
    },

    duration: {
      name: 'duration',
      type: 'duration',
      placeholder: 'Enter your duration',
      label: 'Duration',
      fluid: true,
      required: true,
    },

    company: {
      name: 'company',
      type: 'text',
      placeholder: 'Enter your company',
      required: true,
      label: 'Company',
    },

    position: {
      name: 'position',
      type: 'text',
      placeholder: 'Enter your position',
      required: true,
      label: 'Position',
    },

    location: {
      name: 'location',
      type: 'text',
      placeholder: 'Enter your location',
      required: true,
      label: 'Location',
    },

    startDate: {
      name: 'startDate',
      type: 'text',
      placeholder: 'Enter your start date',
      required: true,
      label: 'Start Date',
    },

    description: {
      name: 'description',
      type: 'textarea',
      placeholder: 'Enter your description',
      required: true,
      label: 'Description',
      fluid: true,
    },
  },

  skills: {
    label: 'Skills',
    description: 'Enter your skills',
    itemsType: 'draggable',

    collapsedState: {
      titleKey: 'name',
      subTitleKey: 'level',
    },

    category: {
      name: 'category',
      type: 'text',
      placeholder: 'Enter your category',
      required: true,
      fluid: true,
      label: 'Category',
    },

    level: {
      name: 'level',
      type: 'dropdown',
      placeholder: 'Select your level',
      required: true,
      label: 'Level',
      options: ['Beginner', 'Intermediate', 'Expert'],
    },

    name: {
      name: 'name',
      type: 'text',
      placeholder: 'Enter your skill name',
      required: true,
      label: 'Name',
    },
  },
  education: {
    label: 'Education',
    subTitle:
      'A varied education on your resume sums up the value that your learnings and background will bring to job.',
    heading: {
      name: 'heading',
      type: 'text',
      placeholder: 'Enter your heading',
      label: 'Heading',
      required: true,
      fluid: true,
    },

    itemsType: 'draggable',

    fluid: true,

    collapsedState: {
      titleKey: 'degree',
      subTitleKey: 'institution',
    },

    institution: {
      name: 'institution',
      type: 'text',
      placeholder: 'Enter your school',
      required: true,
      label: 'School',
    },

    degree: {
      name: 'degree',
      type: 'text',
      placeholder: 'Enter your degree',
      required: true,
      label: 'Degree',
    },

    startDate: {
      name: 'startDate',
      type: 'text',
      placeholder: 'Enter your start date',
      required: true,
      label: 'Start Date',
    },

    fieldOfStudy: {
      name: 'fieldOfStudy',
      type: 'text',
      placeholder: 'Enter your field of study',
      required: true,
      label: 'Field of Study',
    },

    grade: {
      name: 'grade',
      type: 'text',
      placeholder: 'Enter your grade',
      required: true,
      label: 'Grade',
    },
  },

  projects: {
    label: 'Projects',
    subTitle: 'Show your relevant projects',

    collapsedState: {
      titleKey: 'title',
      subTitleKey: 'duration',
    },

    itemsType: 'draggable',

    duration: {
      name: 'duration',
      type: 'duration',
      placeholder: 'Enter your duration',
      label: 'Duration',
      required: true,
    },

    link: {
      name: 'link',
      type: 'url',
      placeholder: 'Enter your link',
      label: 'Link',
      required: true,
      fluid: true,
    },

    techStack: {
      name: 'techStack',
      type: 'chips',
      placeholder: 'Enter your tech stack',
      label: 'Tech Stack',
      required: true,
      fluid: true,
    },

    description: {
      name: 'description',
      type: 'textarea',
      placeholder: 'Enter your description',
      label: 'Description',
      required: true,
      fluid: true,
    },

    title: {
      name: 'title',
      type: 'text',
      placeholder: 'Enter your title',
      label: 'Title',
      fluid: true,
      required: true,
    },
  },
};

export async function getResumeData(id: string): Promise<ResumeData> {
  const data = await fetch<ResumeData>(`resume/${id}`);

  return data;
}

export async function getResumeSchema(): Promise<FormSchema> {
  return data;
}

export async function getResumeTemplate(id: string): Promise<JSON> {
  const data = await fetch(`template/${id}`);

  return data.json();
}

export async function saveFormData<T extends keyof ResumeData>({
  type,
  data,
}: {
  type: T;
  data: ResumeData[T];
}): Promise<any> {
  let url = 'personal-details';

  if (type === 'education') {
    url = 'education';
  } else if (type === 'experience') {
    url = 'experience';
  } else if (type === 'skills') {
    url = 'skills';
  } else if (type === 'projects') {
    url = 'projects';
  }

  const res = await fetch(`${url}/${data.id}`, {
    options: {
      method: 'PUT',
      body: JSON.stringify(data),
    },
  });

  return res;
}

export async function createResume(): Promise<any> {
  const res = await fetch<{
    createdAt: string;
    deleted_at: string | null;
    id: string;
    templateId: string;
    title: string;
    updatedAt: string;
    userId: string;
  }>('resume/create', {
    options: {
      method: 'POST',
      body: JSON.stringify({
        title: 'Frontend Engineer Resume',
        userInfo: {
          userId: '60fdfb6c-21d6-4717-98ac-425e6a592cb8',
        },
        templateId: '25c2fb78-b90c-4f77-bbda-7c9198bfe091',
      }),
    },
  });

  return res;
}
