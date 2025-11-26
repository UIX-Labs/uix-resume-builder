// Flattened template structure with simplified list rendering

const aniketTemplate = {
  name: 'Aniket Modern Classic',

  page: {
    background: '#ffffff',
    className: 'text-black leading-relaxed',
    fontFamily: 'Inter',
  },

  sections: [
    // Header Section
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col items-center text-center gap-2',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Your Name',
          className: 'tracking-wide text-xl uppercase font-extrabold text-black',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          className: 'tracking-wide text-sm text-black',
        },
        contact: {
          type: 'inline-group',
          className: 'flex flex-row flex-wrap justify-center gap-0.5 mt-1 text-xs text-black',
          separator: ' | ',
          items: [
            { path: 'personalDetails.items[0].address', fallback: 'Address' },
            { path: 'personalDetails.items[0].phone', fallback: 'Phone' },
            {
              type: 'link',
              path: 'personalDetails.items[0].email',
              href: 'mailto:{{value}}',
              fallback: 'Email',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.linkedin.title',
              href: 'personalDetails.items[0].links.linkedin.link',
              fallback: 'LinkedIn',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.github.title',
              href: 'personalDetails.items[0].links.github.link',
              fallback: 'GitHub',
            },
          ],
        },
      },
    },

    // Education Section
    {
      id: 'education',
      type: 'list-section',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'uppercase tracking-wide text-sm font-semibold text-black mt-4 gap-1',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px] mt-0.5' },
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-2',
        rows: [
          {
            className: 'flex flex-row items-center text-sm',
            cells: [
              {
                 type: 'inline-group',
                separator: ' | ',
                items:[
                   {
                path: 'degree',
                className: 'font-semibold',
              },
              {
                type: 'duration',
                path: 'duration',
                fallback: 'Start Date',
                className: 'italic font-medium text-xs ml-auto',
              },
                ]
              }
             
            ],
          },
          {
            className: 'flex flex-row justify-between items-center text-xs',
            cells: [
              {
                path: 'institution',
                className: 'text-black italic',
              },
              {
                path: 'grade.value',
                className: 'italic font-medium',
              },
            ],
          },
        ],
      },
    },

    // Summary Section
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col mt-4',
      heading: {
        path: 'summary.heading',
        fallback: 'Summary',
        className: 'uppercase tracking-wide text-sm font-semibold text-black',
      },
      divider: { variant: 'line', className: 'bg-black w-full h-[1.5px] mt-0.5' },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className: 'text-xs text-neutral-800 text-justify whitespace-pre-wrap mt-3',
      },
    },

    // Experience Section
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'uppercase tracking-wide text-sm font-semibold text-black mt-4 gap-1',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px]' },
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-2',
        rows: [
          {
            className: 'flex flex-row justify-between items-center text-sm text-black mb-1',
            cells: [
              {
                type: 'inline-group',
                separator: ' | ',
                items: [
                  { path: 'position', className: 'font-semibold' },
                  { path: 'company', className: 'font-semibold' },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'italic font-semibold',
              },
            ],
          },
          {
            className: 'flex flex-col',
            cells: [
              {
                type: 'html',
                path: 'description',
                className: 'text-xs text-neutral-800 text-justify whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    // Skills Section
    {
      id: 'skills',
      break: false,
      type: 'inline-list-section',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'uppercase tracking-wide text-sm font-semibold text-black mt-4 gap-1',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px] mt-0.5' },
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-xs text-neutral-800',
      containerClassName: 'flex flex-wrap gap-1 mt-3 text-xs',
      itemSeparator: ', ',
    },

    // Projects Section
    {
      id: 'projects',
      type: 'list-section',
      className: 'flex flex-col mt-4',
      break: false,
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'uppercase tracking-wide text-sm font-semibold text-black mt-4 gap-1',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px]' },
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-2',
        fields: [
          { path: 'title', fallback: 'Project Title', className: 'text-sm font-semibold text-neutral-900' },
          { type: 'duration', path: 'duration', className: 'text-xs text-neutral-600 italic mb-1' },
          { path: 'techStack', className: 'text-xs text-neutral-600 italic mb-1' },
          {
            type: 'html',
            path: 'description',
            className: 'text-xs text-neutral-800 text-justify whitespace-pre-wrap',
          },
        ],
      },
    },

    // Interests Section (Badge Style)
    {
      id: 'interests',
      type: 'badge-section',
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'uppercase tracking-wide text-sm font-semibold text-black mt-4 gap-1',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px]' },
      },
      listPath: 'interests.items[0].items',
      badgeClassName:
        'flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-black rounded-md text-xs text-white font-semibold whitespace-nowrap',
    },

    // Achievements Section (Badge Style)
    {
      id: 'achievements',
      type: 'badge-section',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'uppercase tracking-wide text-sm font-semibold text-black mt-4 gap-1',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px] mt-0.5' },
      },
      listPath: 'achievements.items[0].items',
      badgeClassName:
        'flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-black rounded-md text-xs text-white font-semibold whitespace-nowrap',
    },

    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'uppercase tracking-wide text-sm font-semibold text-black mt-4 gap-1',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px] mt-0.5' },
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-2',
        fields: [
          { path: 'title', fallback: 'Certification Title', className: 'text-sm font-semibold text-neutral-900' },
          { path: 'issuer', fallback: 'Issuer', className: 'text-xs text-neutral-700' },
          { type: 'duration', path: 'duration', className: 'text-xs text-neutral-600 italic' },
        ],
      },
    },
  ],
};

export default aniketTemplate;
