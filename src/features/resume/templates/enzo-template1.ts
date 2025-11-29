const enzoTemplate1 = {
  name: 'Enzo Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed break-words whitespace-pre-wrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  sections: [
    {
      type: 'two-column-layout',
      className: 'flex flex-row min-h-[1122px]',
      leftColumn: {
        className: 'w-[270px] min-w-0 max-w-[270px] bg-[#E8DCC8] tracking-wide text-neutral-800 flex flex-col px-6 py-8',
        sections: [
          // Profile Picture Section
          {
            id: 'profile-picture',
            type: 'header',
            className: 'flex flex-col items-center mb-6',
            fields: {
              profileImage: {
                type: 'image',
                path: 'personalDetails.items[0].profilePicturePublicUrl',
                fallback: '',
                className: 'w-32 h-32 rounded-full object-cover bg-neutral-300',
                alt: 'Profile Picture',
              },
            },
          },

          // Contact Section
          {
            id: 'contact',
            type: 'header',
            className: 'mb-6',
            fields: {
              contact: {
                type: 'group',
                className: 'flex flex-col gap-3',
                items: [
                  // Heading
                  {
                    type: 'text',
                    path: '',
                    fallback: 'CONTACT',
                    className: 'text-sm font-bold text-[#C9A961] mb-1 tracking-wide uppercase',
                  },
                  // Phone
                  {
                    type: 'inline-group',
                    className: 'flex items-center gap-2',
                    items: [
                      {
                        type: 'icon',
                        name: 'Phone',
                        size: 14,
                        className: 'text-neutral-800 flex-shrink-0',
                      },
                      {
                        path: 'personalDetails.items[0].phone',
                        fallback: '',
                        className: 'text-xs text-neutral-800 break-all',
                      },
                    ],
                  },
                  // Email
                  {
                    type: 'inline-group',
                    className: 'flex items-center gap-2',
                    items: [
                      {
                        type: 'icon',
                        name: 'Mail',
                        size: 14,
                        className: 'text-neutral-800 flex-shrink-0',
                      },
                      {
                        path: 'personalDetails.items[0].email',
                        fallback: '',
                        className: 'text-xs text-neutral-800 break-all',
                      },
                    ],
                  },
                  // LinkedIn
                  {
                    type: 'inline-group',
                    className: 'flex items-center gap-2',
                    items: [
                      {
                        type: 'icon',
                        name: 'Linkedin',
                        size: 14,
                        className: 'text-neutral-800 flex-shrink-0',
                      },
                      {
                        path: 'personalDetails.items[0].links.linkedin.title',
                        fallback: '',
                        className: 'text-xs text-neutral-800 break-all',
                      },
                    ],
                  },
                ],
              },
            },
          },

          // Professional Profile Section
          {
            id: 'profile',
            type: 'content-section',
            className: 'flex flex-col gap-2 mb-6 pt-6 border-t border-[#C9A961]',
            heading: {
              path: 'summary.heading',
              fallback: 'PROFESSIONAL PROFILE',
              className: 'text-sm font-bold text-[#C9A961] mb-2 tracking-wide uppercase',
            },
            content: {
              type: 'html',
              path: 'personalDetails.items[0].description',
              fallback:
                'Graphic Design Specialist with 5+ years of experience in the management of the complete design process, from conceptualization to delivery.',
              className: 'text-xs text-neutral-800 leading-relaxed break-words whitespace-pre-wrap',
            },
          },

          // Skills Section
          {
            id: 'skills',
            break: false,
            type: 'inline-list-section',
            className: 'pt-6 border-t border-[#C9A961]',
            heading: {
              path: 'skills.heading',
              fallback: 'SKILLS',
              className: 'text-sm font-bold text-[#C9A961] mb-2 tracking-wide uppercase',
            },
            listPath: 'skills.items',
            itemPath: 'name',
            itemClassName: 'text-xs text-neutral-800',
            containerClassName: 'flex flex-wrap gap-1 mt-2 text-xs',
            itemSeparator: ', ',
          },
        ],
      },
      rightColumn: {
        className: 'flex-1 min-w-0 px-10 py-8 flex flex-col gap-6',
        sections: [
          // Header Section
          {
            id: 'header',
            type: 'header',
            className: 'flex flex-col mb-6',
            fields: {
              nameTitle: {
                className: 'flex flex-col gap-1',
              },
              name: {
                path: 'personalDetails.items[0].fullName',
                fallback: 'NELLY SMITH',
                className: 'text-4xl font-bold text-[#C9A961] tracking-wide uppercase',
              },
              title: {
                path: 'personalDetails.items[0].jobTitle',
                fallback: 'GRAPHIC DESIGNER',
                className: 'text-lg font-semibold text-neutral-800 tracking-wide uppercase',
              },
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
              className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-3',
            },
            listPath: 'experience.items',
            containerClassName: 'flex flex-col gap-5',
            itemTemplate: {
              className: 'flex flex-col gap-1',
              rows: [
                {
                  className: 'flex flex-row justify-between items-baseline gap-2',
                  cells: [
                    {
                      path: 'position',
                      className: 'text-sm font-bold text-neutral-900 break-words flex-1 min-w-0',
                    },
                    {
                      path: 'company',
                      className: 'text-xs font-normal text-neutral-600 italic break-words flex-shrink-0',
                    },
                  ],
                },
                {
                  className: 'flex flex-row gap-2 items-center text-xs text-neutral-600 flex-wrap',
                  cells: [
                    {
                      type: 'duration',
                      path: 'duration',
                      className: 'text-xs text-neutral-600',
                    },
                    {
                      path: 'location',
                      fallback: '',
                      prefix: '• ',
                      className: 'text-xs text-neutral-600 break-words',
                    },
                  ],
                },
                {
                  cells: [
                    {
                      type: 'html',
                      path: 'description',
                      className:
                        'text-xs text-neutral-700 leading-relaxed mt-2 break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 [&_*]:break-words',
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
            heading: {
              path: 'education.heading',
              fallback: 'EDUCATION',
              className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-3',
            },
            listPath: 'education.items',
            containerClassName: 'flex flex-col gap-4',
            itemTemplate: {
              className: 'flex flex-col gap-1',
              rows: [
                {
                  className: 'flex flex-row justify-between items-baseline gap-2',
                  cells: [
                    {
                      path: 'degree',
                      className: 'text-sm font-bold text-neutral-900 break-words flex-1 min-w-0',
                    },
                    {
                      type: 'duration',
                      path: 'duration',
                      className: 'text-xs text-neutral-600 flex-shrink-0',
                    },
                  ],
                },
                {
                  className: 'flex flex-row gap-2 items-center text-xs text-neutral-600 flex-wrap',
                  cells: [
                    {
                      path: 'institution',
                      className: 'text-xs text-neutral-600 break-words',
                    },
                    {
                      path: 'location',
                      fallback: '',
                      prefix: '• ',
                      className: 'text-xs text-neutral-600 break-words',
                    },
                  ],
                },
                {
                  cells: [
                    {
                      path: 'grade.value',
                      prefix: 'GPA: ',
                      className: 'text-xs text-neutral-700',
                    },
                  ],
                },
              ],
            },
          },

          // Certifications Section
          {
            id: 'certifications',
            type: 'list-section',
            heading: {
              path: 'certifications.heading',
              fallback: 'CERTIFICATIONS',
              className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-3',
            },
            listPath: 'certifications.items',
            containerClassName: 'flex flex-col gap-3',
            itemTemplate: {
              className: 'flex flex-col gap-0.5',
              fields: [
                {
                  path: 'title',
                  fallback: 'Certification Title',
                  className: 'text-sm font-bold text-neutral-900 break-words',
                },
                {
                  path: 'issuer',
                  fallback: 'Issuer',
                  className: 'text-xs text-neutral-600 break-words',
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

export default enzoTemplate1;
