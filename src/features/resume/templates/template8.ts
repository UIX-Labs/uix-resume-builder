const template8 = {
  name: 'Vivek Kumar Professional',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Playfair Display, serif',
  },

  sections: [
    // Header Section
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col items-center text-center gap-2',
      break: true,
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'VIVEK KUMAR',
          className: 'text-4xl font-base tracking-[0.1em] uppercase mb-2',
        },
        contact: {
          type: 'contact-grid',
          className: 'flex flex-row flex-wrap items-center justify-center gap-4 text-sm font-[600]',
          items: [
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Phone', size: 12, className: 'w-3 h-3' },
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '+91 8595481430',
                  className: 'text-sm',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Mail', size: 12, className: 'w-3 h-3' },
                {
                  path: 'personalDetails.items[0].email',
                  fallback: 'vivekabhiraj456@gmail.com',
                  className: 'text-sm underline',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Linkedin', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  fallback: '',
                  className: 'text-sm underline',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Github', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  fallback: '',
                  className: 'text-sm underline',
                },
              ],
            },
          ],
        },
      },
    },

    // Professional Summary Section
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col mt-4',
      heading: {
        path: 'summary.heading',
        fallback: 'Professional Summary',
        className: 'text-base font-bold border-b border-neutral-900 mb-1.5 mt-5',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Professional Summary',
        className:
          'text-sm text-neutral-900 leading-relaxed  [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold whitespace-pre-wrap',
      },
    },

    // Education Section
    {
      id: 'education',
      type: 'list-section',
      className: 'flex flex-col mt-4',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 mt-4',
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'flex flex-col gap-0.5 mt-2 leading-none',
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              { path: 'institution', className: 'text-sm font-bold' },
              { path: 'grade.value', className: 'text-sm font-bold' },
            ],
          },
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              { path: 'degree', className: 'text-sm' },
              { type: 'duration', path: 'duration', className: 'text-sm italic' },
            ],
          },
        ],
      },
    },

    // Work Experience Section
    {
      id: 'experience',
      type: 'list-section',
      className: 'flex flex-col mt-4',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Work Experience',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 mt-4 mb-1',
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 leading-none mt-2',
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              { path: 'company', className: 'text-sm font-bold' },
              { path: 'location', className: 'text-sm font-bold' },
            ],
          },
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              { path: 'position', className: 'text-sm' },
              { type: 'duration', path: 'duration', className: 'text-sm italic' },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-sm [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    // Projects Section
    {
      id: 'projects',
      type: 'list-section',
      className: 'flex flex-col mt-4',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 mt-4 mb-1',
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'flex flex-col mt-1.5',
        fields: [
          {
            type: 'inline-group',
            className: 'flex flex-row items-center gap-2',
            items: [
              { path: 'title', className: 'text-sm font-bold' },
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                fallback: '',
                className: 'text-sm underline hover:text-blue-600',
              },
            ],
          },
          {
            type: 'html',
            path: 'description',
            className: 'text-sm [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold whitespace-pre-wrap',
          },
        ],
      },
    },

    // Technical Skills Section
    {
      id: 'skills',
      type: 'inline-list-section',
      heading: {
        path: 'skills.heading',
        fallback: 'Technical Skills',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize mt-4 mb-1.5',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-sm text-black',
      containerClassName: 'text-sm text-black leading-relaxed pr-2',
      itemSeparator: ', ',
    },

    // Achievements Section
    {
      id: 'achievements',
      type: 'badge-section',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize mt-4 mb-1',
      },
      listPath: 'achievements.items[0].items',
      badgeClassName: 'text-sm text-black',
      containerClassName: 'flex flex-wrap gap-1',
      itemSeparator: ', ',
    },

    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      break:true,
      className: 'flex flex-col mt-4',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize mt-4',
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'flex flex-col gap-0.5 mt-2 leading-none',
        fields: [
          { path: 'title', fallback: 'Certification Title', className: 'text-sm font-bold' },
          { path: 'issuer', fallback: 'Issuer', className: 'text-sm' },
          { type: 'duration', path: 'duration', className: 'text-sm italic' },
          {
            type: 'link',
            path: 'link.title',
            href: 'link.link',
            fallback: '',
            className: 'text-sm underline hover:text-blue-600',
          },
        ],
      },
    },

    // Interests Section
    {
      id: 'interests',
      type: 'badge-section',
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize mt-4 mb-1',
      },
      listPath: 'interests.items[0].items',
      badgeClassName: 'text-sm text-black',
      containerClassName: 'flex flex-wrap gap-1',
      itemSeparator: ', ',
    },
  ],
};

export default template8;