export const data = {
  personalDetails: {
    label: 'Personal Details',

    subTitle: 'Users who added phone number and email received 64% more positive feedback from recruiters.',

    profilePicturePublicUrl: {
      name: 'profilePicturePublicUrl',
      type: 'profilePicture',
      label: 'Profile Picture',
      fluid: true,
    },

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
      fluid: true,
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
      fluid: true,
    },
    jobTitle: {
      name: 'jobTitle',
      type: 'text',
      label: 'Job Title',
      placeholder: 'Enter your job title',
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

    links: {
      name: 'links',
      label: 'Links',
      type: 'links',
      fluid: true,
    },
  },

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
      fluid: true,
      label: 'School',
    },

    degree: {
      name: 'degree',
      type: 'text',
      placeholder: 'Enter your degree',
      required: true,
      label: 'Degree',
    },

    duration: {
      name: 'duration',
      type: 'duration',
      placeholder: 'Enter your duration',
      required: true,
      label: 'Duration',
      fluid: true,
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
      type: 'data',
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

  interests: {
    label: 'Interests',
    subTitle: 'Show your relevant interests',
    itemsType: 'strings',
  },

  achievements: {
    label: 'Achievements',
    subTitle: 'Show your relevant achievements',
    itemsType: 'strings',
  },

  certifications: {
    label: 'Certifications',
    subTitle: 'Show your relevant certifications',
    itemsType: 'draggable',

    duration: {
      name: 'duration',
      type: 'duration',
      placeholder: 'Enter your duration',
      label: 'Duration',
      required: true,
      fluid: true,
    },

    issuer: {
      name: 'issuer',
      type: 'text',
      placeholder: 'Enter your issuer',
      label: 'Issuer',
    },

    link: {
      name: 'link',
      type: 'url',
      placeholder: 'Enter your link',
      label: 'Link',
      required: true,
      fluid: true,
    },

    title: {
      name: 'title',
      type: 'text',
      placeholder: 'Enter your title',
      label: 'Title',
      required: true,
      fluid: true,
    },
  },
};
