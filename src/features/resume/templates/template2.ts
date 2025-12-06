const andrewTemplate = {
  name: 'Andrew Professional',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Inter',
  },

  sections: [
    // Header Section
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col gap-3 mb-4',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: "Andrew O'Sullivan",
          className: 'text-4xl font-bold text-black mb-4',
        },
        contact: {
          type: 'contact-grid',
          className: 'grid grid-cols-2 gap-y-2 gap-x-16 text-sm text-gray-700',
          items: [
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'MapPin', size: 14, className: 'text-black' },
                { path: 'personalDetails.items[0].address', fallback: 'Address', className: 'text-sm text-gray-700' },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Mail', size: 14, className: 'text-black' },
                { path: 'personalDetails.items[0].email', fallback: 'Email', className: 'text-sm text-gray-700' },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Phone', size: 14, className: 'text-black' },
                { path: 'personalDetails.items[0].phone', fallback: 'Phone', className: 'text-sm text-gray-700' },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Linkedin', size: 14, className: 'text-black' },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  fallback: 'LinkedIn',
                  className: 'text-sm text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Github', size: 14, className: 'text-black' },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  fallback: 'GitHub',
                  className: 'text-sm text-gray-700 hover:text-blue-600',
                },
              ],
            },
          ],
        },
      },
    },

    // Summary Section
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col gap-2 mt-4',
      heading: {
        path: 'summary.heading',
        fallback: 'Summary',
        className: 'text-lg font-bold text-black',
      },
      divider: { variant: 'line', className: 'bg-black w-full h-[1px] mt-0.5' },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className:
          'text-sm text-neutral-700 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 text-justify break-words whitespace-pre-wrap mt-2',
      },
    },

    // Experience Section
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Professional Experience',
        className: 'text-lg font-bold text-black mt-4',
        divider: { variant: 'line', className: 'bg-black w-full h-[1px] mt-0.5' },
      },
      
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-row gap-4 items-start w-full mt-4',
        rows: [
          {
            className: 'flex flex-col w-[180px] leading-none',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-black font-normal',
              },
              {
                path: 'location',
                className: 'text-sm text-gray-700 break-words',
              },
            ],
          },
          {
            className: 'flex flex-col flex-1',
            cells: [
              {
                path: 'position',
                className: 'text-sm font-bold text-black',
              },
              {
                path: 'company',
                className: 'text-sm text-gray-700 italic',
              },
              {
                type: 'html',
                path: 'description',
                className:
                  'text-sm text-gray-700 leading-relaxed break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
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
      break: true,
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-lg font-bold text-black mt-4',
        divider: { variant: 'line', className: 'bg-black w-full h-[1px] mt-0.5' },
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'flex flex-row gap-4 items-start w-full mt-4',
        rows: [
          {
            className: 'flex flex-col w-[180px]',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-black font-normal',
              },
            ],
          },
          {
            className: 'flex flex-col flex-1',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-bold text-black',
              },
              {
                type: 'html',
                path: 'description',
                className:
                  'text-sm text-gray-700 leading-relaxed break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
              },
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                fallback: '',
                className: 'text-sm text-blue-600 hover:underline mt-1',
              },
            ],
          },
        ],
      },
    },

    // Education Section
    {
      id: 'education',
      type: 'list-section',
      break: false,
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-lg font-bold text-black mt-4',
        divider: { variant: 'line', className: 'bg-black w-full h-[1px] mt-0.5' },
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'flex flex-row gap-4 items-start w-full mt-4',
        rows: [
          {
            className: 'flex flex-col w-[180px] shrink-0',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-black font-normal',
              },
              {
                path: 'location',
                fallback: '',
                className: 'text-sm text-gray-700',
              },
            ],
          },
          {
            className: 'flex flex-col flex-1 leading-none',
            cells: [
              {
                path: 'degree',
                className: 'text-sm font-bold text-black',
              },
              {
                path: 'institution',
                className: 'text-sm text-gray-700 italic',
              },
            ],
          },
        ],
      },
    },

    // Skills Section
    {
      id: 'skills',
      type: 'list-section',
      break: true,
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-lg font-bold text-black mt-4',
        divider: { variant: 'line', className: 'bg-black w-full h-[1px] mt-0.5' },
      },
      listPath: 'skills.items',
      containerClassName: 'grid grid-cols-2 gap-x-8 gap-y-3 mt-4',
      itemTemplate: {
        className: 'flex flex-row justify-between gap-4',
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline w-full',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-col leading-none',
                items: [
                  { path: 'name', className: 'text-sm font-semibold text-black' },
                  { path: 'category', className: 'text-xs text-gray-600' },
                ],
              },
              {
                type: 'skillLevel',
                path: 'level',
                className: 'flex',
              },
            ],
          },
        ],
      },
    },

    // Interests Section
    {
      id: 'interests',
      type: 'inline-list-section',
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-lg font-bold text-black mt-4',
        divider: { variant: 'line', className: 'bg-black w-full h-[1px] mt-0.5' },
      },
      listPath: 'interests.items[0].items',
      itemClassName: 'text-sm text-black',
      itemPath: '',
      containerClassName: 'text-sm text-black leading-relaxed mt-2',
      itemSeparator: ', ',
    },

    // Achievements Section
    {
      id: 'achievements',
      type: 'badge-section',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-lg font-bold text-black mt-4',
        divider: { variant: 'line', className: 'bg-black w-full h-[1px] mt-0.5' },
      },
      listPath: 'achievements.items[0].items',
      badgeClassName: 'text-sm text-black',
      containerClassName: 'flex flex-col gap-1 mt-2',
    },

    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-lg font-bold text-black mt-4',
        divider: { variant: 'line', className: 'bg-black w-full h-[1px] mt-0.5' },
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'flex flex-row gap-4 items-start w-full mt-4',
        rows: [
          {
            className: 'w-[180px]',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-black font-normal',
              },
            ],
          },
          {
            className: 'flex flex-col flex-1',
            cells: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-sm font-bold text-black',
              },
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-sm text-gray-700 italic',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default andrewTemplate;
