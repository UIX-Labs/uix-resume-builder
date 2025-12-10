const enzoTemplate3 = {
  name: 'Kate Creative',

  page: {
    width: 794,
    height: 1122,
    background: '#ffffff',
    className: 'leading-relaxed break-words whitespace-pre-wrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '50%',
      className: 'flex flex-col gap-2',
    },
    right: {
      width: '50%',
      className: 'pl-4 flex flex-col gap-3'
    },
  },

  sections: [
    // --- HEADER BANNER ---
    {
      id: 'header',
      type: 'banner',
      className: 'flex flex-col justify-center bg-[#F0F8FF] px-8 py-8',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-start w-full',
          items: [
            // Name, Image and Summary
            {
              type: 'group',
              className: 'flex flex-col gap-3 pt-1 max-w-[60%]',
              items: [
                {
                  type: 'group',
                  className: 'flex flex-row items-center gap-4',
                  items: [
                    {
                      type: 'image',
                      path: 'personalDetails.items[0].profilePicturePublicUrl',
                      fallback: '/images/profile.svg',
                      className: 'w-24 h-24 rounded-full object-cover bg-white flex-shrink-0',
                    },
                    {
                      type: 'group',
                      className: 'flex flex-col gap-1',
                      items: [
                        {
                          type: 'text',
                          path: 'personalDetails.items[0].fullName',
                          fallback: 'Bhavya Saggi',
                          className: 'text-3xl font-bold leading-none',
                        },
                        {
                          type: 'text',
                          path: 'personalDetails.items[0].jobTitle',
                          fallback: 'Product Designer',
                          className: 'text-base text-blue-600 font-medium',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'html',
                  path: 'personalDetails.items[0].description',
                  fallback:
                    'Strategic thinker with hands-on skills. Passionate about fostering engineering excellence, building inclusive teams, and aligning technology with business goals.',
                  className: 'text-xs leading-relaxed',
                },
              ],
            },
            // Contact Info
            {
              id:'header',
              type: 'group',
              className: 'flex flex-col gap-3 items-end',
              items: [
                // Email
                {
                  type: 'group',
                  className: 'flex flex-col gap-0.5 items-end',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Email',
                      className: 'text-[10px] font-medium uppercase tracking-wide text-right text-slate-700',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].email',
                      fallback: 'bhavya.saggi@gmail.com',
                      className: 'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                    },
                  ],
                },
                // LinkedIn
                {
                  type: 'group',
                  className: 'flex flex-col gap-0.5 items-end',
                  items: [
                    {
                      type: 'text',
                      fallback: 'LinkedIn',
                      className: 'text-[10px] font-medium uppercase tracking-wide text-right text-slate-700',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.link',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      fallback: 'LinkedIn',
                      className: 'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                    },
                  ],
                },
                // GitHub
                {
                  type: 'group',
                  className: 'flex flex-col gap-0.5 items-end',
                  items: [
                    {
                      type: 'text',
                      fallback: 'GitHub',
                      className: 'text-[10px] font-medium uppercase tracking-wide text-right text-slate-700',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.github.link',
                      href: 'personalDetails.items[0].links.github.link',
                      fallback: 'GitHub',
                      className: 'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                    },
                  ],
                },
                // Phone
                {
                  type: 'group',
                  className: 'flex flex-col gap-0.5 items-end',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Phone',
                      className: 'text-[10px] font-medium uppercase tracking-wide text-right text-slate-700',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '+91 9953439451',
                      className: 'text-xs font-bold underline decoration-slate-300 underline-offset-2 text-slate-700',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },

    // --- BODY LEFT (Experience) ---
    {
      id: 'experience',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'pl-6 pt-8',
      heading: {
        path: 'experience.heading',
        fallback: 'Work experience',
        className: 'text-base font-bold text-[#3B82F6] pt-4',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-6',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        rows: [
          {
            cells: [
              {
                path: 'position',
                className: 'text-sm font-bold pt-4',
              },
            ],
          },
          {
            className: 'flex flex-row flex-wrap gap-2 items-center text-xs mb-1',
            cells: [
              {
                path: 'company',
                className: 'font-medium',
              },
              {
                type: 'duration',
                path: 'duration',
                className: '',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-xs leading-relaxed whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // --- BODY RIGHT (Education, Skills) ---
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      className: '',
      heading: {
        path: 'education.heading',
        fallback: 'Education & Learning',
        className: 'text-base font-bold text-[#3B82F6] pt-4',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            cells: [
              {
                path: 'degree',
                className: 'text-sm font-bold',
              },
            ],
          },
          {
            cells: [
              {
                path: 'fieldOfStudy',
                fallback: '',
                className: 'text-xs italic',
              },
            ],
          },
          {
            cells: [
              {
                path: 'institution',
                className: 'text-xs',
              },
            ],
          },
          {
            className: 'flex flex-row items-center',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs italic',
              },
            ],
          },
          {
            className: 'flex flex-row items-center',
            cells: [
              {
                path: 'grade.value',
                prefix: 'CGPA - ',
                className: 'text-xs italic',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      className: '',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            cells: [
              {
                path: 'title',
                className: 'text-xs font-bold',
              },
            ],
          },
          {
            cells: [
              {
                path: 'issuer',
                className: 'text-xs italic',
              },
            ],
          },
        ],
      },
    },

    // Projects Section - Right Column
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      className: '',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-4',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        rows: [
          {
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-bold',
              },
            ],
          },
          {
            className: 'flex flex-row gap-2 items-center',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs italic',
              },
              {
                path: 'techStack',
                fallback: '',
                prefix: '• ',
                className: 'text-xs italic',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className: 'text-xs leading-relaxed whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // Skills Section - Right Column
    {
      id: 'skills',
      break: false,
      type: 'inline-list-section',
      column: 'right',
      className: '',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-xs',
      containerClassName: 'text-xs leading-relaxed',
      itemSeparator: ', ',
    },

    // Interests Section - Right Column
    {
      id: 'interests',
      break: false,
      type: 'inline-list-section',
      column: 'right',
      className: '',
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: 'interests.items[0].items',
      itemClassName: 'text-xs',
      containerClassName: 'text-xs leading-relaxed',
      itemSeparator: ', ',
    },

    // Achievements Section - Right Column
    {
      id: 'achievements',
      break: false,
      type: 'inline-list-section',
      column: 'right',
      className: '',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: 'achievements.items[0].items',
      itemClassName: 'text-xs',
      containerClassName: 'text-xs leading-relaxed',
      itemSeparator: ', ',
    },
  ],
};

export default enzoTemplate3;
