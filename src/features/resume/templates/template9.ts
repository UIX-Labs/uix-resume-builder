const template9 = {
  name: 'Anmol Professional Two Column',

  page: {
    width: 794,
    height: 1122,
    padding: 24,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Roboto, sans-serif',
  },

  sections: [
    // Header Section
    {
      id: 'header',
      type: 'header',
      break: true,
      className: 'flex flex-col items-start justify-center gap-3 pb-2',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'ANMOL SAXENA',
          className: 'text-5xl font-extrabold text-black tracking-tight',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Software Architect | Backend Development',
          className: 'text-base font-semibold text-blue-500 mt-1',
        },
        contact: {
          type: 'contact-grid',
          className: 'flex flex-row flex-wrap items-center gap-4 mt-2 text-sm text-neutral-900 font-bold',
          items: [
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'MapPin', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  path: 'personalDetails.items[0].address',
                  fallback: '123 Main Street, Paris, France',
                  className: 'text-sm text-gray-700',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Mail', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  path: 'personalDetails.items[0].email',
                  fallback: 'anna@field.com',
                  className: 'text-sm text-gray-700',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Phone', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '+11 23434546',
                  className: 'text-sm text-gray-700',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Linkedin', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  fallback: 'annafield',
                  className: 'text-sm text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Github', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  fallback: 'github',
                  className: 'text-sm text-gray-700 hover:text-blue-600',
                },
              ],
            },
          ],
        },
      },
    },

    // Two-column layout wrapper
    {
      id: 'main-content',
      type: 'two-column-layout',
      className: 'flex flex-row gap-10',
      leftColumn: {
        className: 'flex flex-col gap-6',
        sections: [
          // Summary Section
          {
            id: 'summary',
            type: 'content-section',
            className: 'flex flex-col',
            heading: {
              path: 'summary.heading',
              fallback: 'SUMMARY',
              className: 'uppercase tracking-wide text-lg font-bold text-black',
            },
            divider: { variant: 'line', className: 'border-black border-t-3' },
            content: {
              type: 'html',
              path: 'personalDetails.items[0].description',
              fallback: 'I am a software engineer with 8 years of backend engineering and leadership experience...',
              className: 'text-sm text-neutral-900 text-justify mt-3',
            },
          },

          // Experience Section
          {
            id: 'experience',
            type: 'list-section',
            break: true,
            heading: {
              path: 'experience.heading',
              fallback: 'EXPERIENCE',
              className: 'uppercase tracking-wide text-lg font-bold text-black',
              divider: { variant: 'line', className: 'border-black border-t-3' },
            },
            listPath: 'experience.items',
            containerClassName: 'flex flex-col mt-2',
            itemTemplate: {
              className:
                'flex flex-col pb-5 mb-5 border-b-2 border-dashed border-neutral-300 last:border-0 last:pb-0 last:mb-0',
              fields: [
                {
                  path: 'position',
                  className: 'text-base font-bold text-neutral-900 mb-1',
                },
                {
                  path: 'company',
                  className: 'text-blue-500 text-sm font-bold',
                },
                {
                  type: 'icon-row',
                  className: 'flex flex-row items-center gap-4 mt-1',
                  items: [
                    {
                      type: 'icon-item',
                      icon: 'Calendar',
                      iconClassName: 'w-3.5 h-3.5 text-neutral-500',
                      fieldType: 'duration',
                      path: 'duration',
                      className: 'text-neutral-900 text-sm font-normal',
                    },
                    {
                      type: 'icon-item',
                      icon: 'MapPin',
                      iconClassName: 'w-3.5 h-3.5 text-neutral-500',
                      path: 'location',
                      className: 'text-sm text-neutral-900 font-normal',
                    },
                  ],
                },
                {
                  type: 'html',
                  path: 'description',
                  className: 'text-sm text-neutral-900 leading-relaxed mt-1 whitespace-pre-wrap',
                },
              ],
            },
          },

          // Projects Section
          {
            id: 'projects',
            type: 'list-section',
            heading: {
              path: 'projects.title',
              fallback: 'PROJECTS',
              className: 'uppercase tracking-wide text-lg font-bold text-black',
              divider: { variant: 'line', className: 'border-black border-t-3' },
            },
            listPath: 'projects.items',
            containerClassName: 'flex flex-col mt-2',
            itemTemplate: {
              className:
                'flex flex-col pb-5 mb-5 border-b-2 border-dashed border-neutral-300 last:border-0 last:pb-0 last:mb-0',
              fields: [
                {
                  type: 'link',
                  path: 'title',
                  href: 'link.link',
                  className: 'text-base font-bold text-neutral-900 mb-1 hover:underline',
                },
                {
                  type: 'icon-row',
                  className: 'flex flex-row items-center gap-4 mt-1',
                  items: [
                    {
                      type: 'icon-item',
                      icon: 'Calendar',
                      iconClassName: 'w-3.5 h-3.5 text-neutral-500',
                      fieldType: 'duration',
                      path: 'duration',
                      className: 'text-neutral-900 text-sm font-normal',
                    },
                  ],
                },
                {
                  type: 'html',
                  path: 'description',
                  className: 'text-sm text-neutral-900 leading-relaxed mt-1 whitespace-pre-wrap',
                },
              ],
            },
          },
        ],
      },
      rightColumn: {
        className: 'flex flex-col gap-6',
        sections: [
          // Key Achievements Section
          {
            id: 'achievements',
            type: 'badge-section',
            heading: {
              path: 'achievements.heading',
              fallback: 'KEY ACHIEVEMENTS',
              className: 'uppercase tracking-wide text-lg font-bold text-black',
              divider: { variant: 'line', className: 'border-black border-t-2' },
            },
            listPath: 'achievements.items[0].items',
            icon: 'Crown',
            iconClassName: 'w-5 h-5 text-blue-500 flex-shrink-0 mt-1 fill-blue-500',
            containerClassName: 'flex flex-col mt-4 gap-0',
            itemClassName:
              'flex flex-row items-start gap-3 pb-4 mb-4 border-b-2 border-dashed border-gray-400 last:border-0 last:pb-0 last:mb-0',
            badgeClassName: 'text-sm text-neutral-700 leading-relaxed flex-1',
          },

          // Education Section
          {
            id: 'education',
            type: 'list-section',
            className: 'flex flex-col gap-2',
            heading: {
              path: 'education.heading',
              fallback: 'EDUCATION',
              className: 'uppercase tracking-wide text-lg font-bold text-black',
              divider: { variant: 'line', className: 'border-black border-t-3' },
            },
            listPath: 'education.items',
            containerClassName: 'flex flex-col mt-2',
            itemTemplate: {
              className:
                'flex flex-col pb-5 mb-5 border-b-2 border-dashed border-neutral-300 last:border-0 last:pb-0 last:mb-0',
              fields: [
                {
                  path: 'degree',
                  className: 'text-base font-bold text-neutral-900 mb-1',
                },
                {
                  path: 'institution',
                  className: 'text-blue-500 text-sm font-bold',
                },
                {
                  type: 'icon-row',
                  className: 'flex flex-row items-center gap-4 mt-1',
                  items: [
                    {
                      type: 'icon-item',
                      icon: 'Calendar',
                      iconClassName: 'w-3.5 h-3.5 text-neutral-500',
                      fieldType: 'duration',
                      path: 'duration',
                      className: 'text-neutral-900 text-sm font-normal',
                    },
                    {
                      type: 'icon-item',
                      icon: 'MapPin',
                      iconClassName: 'w-3.5 h-3.5 text-neutral-500',
                      path: 'location',
                      fallback: '',
                      className: 'text-sm text-neutral-900 font-normal',
                    },
                  ],
                },
                {
                  type: 'html',
                  path: 'description',
                  className: 'text-sm text-neutral-900 leading-relaxed mt-1',
                },
              ],
            },
          },

          // Skills Section (with underline style)
          {
            id: 'skills',
            type: 'underline-list-section',
            heading: {
              path: 'skills.heading',
              fallback: 'SKILLS',
              className: 'uppercase tracking-wide text-lg font-bold text-black',
              divider: { variant: 'line', className: 'border-black border-t-3' },
            },
            listPath: 'skills.items',
            itemPath: 'name',
            containerClassName: 'flex flex-wrap gap-x-6 gap-y-3 mt-3',
            itemClassName: 'text-sm font-semibold text-neutral-900 break-words',
            underlineClassName: 'border-neutral-400 border-t-2 w-full',
          },

          // Interests Section (Badge Style)
          {
            id: 'interests',
            type: 'badge-section',
            heading: {
              path: 'interests.title',
              fallback: 'INTERESTS',
              className: 'uppercase tracking-wide text-lg font-bold text-black',
              divider: { variant: 'line', className: 'border-black border-t-3' },
            },
            listPath: 'interests.items[0].items',
            containerClassName: 'flex flex-wrap gap-2 mt-3',
            badgeClassName: 'text-sm text-neutral-900 bg-blue-50 px-3 py-1 rounded-full',
          },

          // Certifications Section
          {
            id: 'certifications',
            type: 'list-section',
            heading: {
              path: 'certifications.heading',
              fallback: 'CERTIFICATIONS',
              className: 'uppercase tracking-wide text-lg font-bold text-black',
              divider: { variant: 'line', className: 'border-black border-t-3' },
            },
            listPath: 'certifications.items',
            containerClassName: 'flex flex-col mt-3 gap-4',
            itemTemplate: {
              className: 'flex flex-col',
              fields: [
                {
                  path: 'title',
                  className: 'text-sm font-bold text-neutral-900',
                },
                {
                  path: 'issuer',
                  className: 'text-sm text-neutral-900',
                },
                {
                  type: 'duration',
                  path: 'duration',
                  className: 'text-sm text-neutral-500',
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

export default template9;
