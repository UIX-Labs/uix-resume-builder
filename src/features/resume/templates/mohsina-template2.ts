const mohsinaTemplate2 = {
  name: 'Mohsina Modern Professional',

  page: {
    background: '#ffffff',
    className: 'leading-relaxed break-words whitespace-pre-wrap',
    fontFamily: 'Roboto',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '50%',
      className: 'flex flex-col gap-2',
    },
    right: {
      width: '50%',
      className: 'pl-5 flex flex-col gap-2',
    },
  },

  sections: [
    // --- HEADER LEFT (Photo, Name, Summary) ---
    // --- HEADER BANNER ---
    {
      id: 'header',
      type: 'banner',
      className: 'flex flex-col justify-center px-8 py-8 border-b-2 border-black mb-2',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-start w-full -mb-4',

          items: [
            // Name and Summary
            {
              type: 'group',
              className: 'flex flex-col gap-1 pt-1 max-w-[60%] font-roboto',
              items: [
                {
                  type: 'text',
                  path: 'personalDetails.items[0].fullName',
                  fallback: 'Bhavya Saggi',
                  className: 'text-xl font-bold leading-none',
                },
                {
                  type: 'text',
                  path: 'personalDetails.items[0].jobTitle',
                  fallback: 'Product Designer',
                  className: 'text-black text-xs text-base  font-medium',
                },
                {
                  id: 'summary',
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
              id: 'header',
              type: 'group',
              className: 'flex flex-col gap-2 items-end pt-10',
              items: [
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: 'ninapatel@gmail.com',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '+91 432 2222 322',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  path: 'personalDetails.items[0].address',
                  fallback: '123 Main St, Anytown, USA',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.website.title',
                  href: 'personalDetails.items[0].links.website.link',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.youtube.title',
                  href: 'personalDetails.items[0].links.youtube.link',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.dribble.title',
                  href: 'personalDetails.items[0].links.dribble.link',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.behance.title',
                  href: 'personalDetails.items[0].links.behance.link',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
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
      className: 'pl-6 pt-0',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-base font-base font-bold text-black pt-0',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-4',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,
        rows: [
          {
            className: 'flex items-center flex-wrap gap-2 -mb-2',
            cells: [
              {
                path: 'position',
                className: 'text-xs font-bold',
              },
              {
                type: 'text',
                fallback: '|',
                className: 'text-xs font-semibold',
              },
              {
                path: 'company',
                className: 'text-xs font-semibold',
              },
            ],
          },
          {
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs font-semibold ',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className:
                  'text-xs leading-relaxed whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'projects',
      type: 'list-section',
      column: 'left',
      break: true,
      className: '',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-bold font-roboto text-black',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          {
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-xs font-semibold',
              },
            ],
          },
          {
            className: 'flex flex-row gap-0 mb-1 -mt-1 items-center',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs font-semibold ',
              },
            ],
          },
          {
            className: 'flex flex-row gap-2 items-center',
            cells: [
              {
                path: 'techStack',
                fallback: '',
                className: 'text-xs',
                itemSeparator: ', ',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className:
                  'text-xs leading-relaxed whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },
    // --- BODY LEFT (Achievements) ---
    {
      id: 'achievements',
      break: true,
      breakable: true,
      type: 'badge-section',
      column: 'left',

      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base font-bold text-black',
      },

      listPath: 'achievements.items[0].items',

      itemPrefix: '• ',
      itemPath: '',

      containerClassName: 'flex flex-col gap-0 mt-1 !text-xs leading-relaxed',

      itemClassName: 'break-inside-avoid mb-1 ',
    },
    // Skills Section - Right Column
    {
      id: 'skills',
      break: true,
      breakable: true,
      type: 'badge-section',
      column: 'right',

      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-base font-semibold text-black',
      },

      listPath: 'skills.items',
      itemPath: 'name',
      itemPrefix: '• ',
      containerClassName: 'columns-2 gap-0 mt-1',
      badgeClassName: 'block text-xs text-black break-inside-avoid mb-1 mt-1 leading-tight',
    },
    // --- BODY RIGHT (Education, Skills) ---
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      className: ' ',
      heading: {
        path: 'education.heading',
        fallback: 'Education & Learning',
        className: 'text-base font-bold text-black pt-0',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col',
      itemTemplate: {
        className: 'flex flex-col mb-0',
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
            className: 'flex flex-row items-center -mt-1',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs font-semibold',
              },
            ],
          },
          {
            cells: [
              {
                path: 'institution',
                className: 'text-sm mt-6',
              },
            ],
          },
          {
            className: 'flex flex-row items-center -mt-2',
            cells: [
              {
                type: 'inline-group',
                items: [
                  {
                    type: 'text',
                    fallback: 'GPA - ',
                    className: 'text-sm font-normal ',
                  },
                  {
                    path: 'grade.value',
                    className: 'text-sm font-bold',
                  },
                ],
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
        className: 'text-base font-bold text-black',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
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
            className: 'flex flex-row gap-0 mb-0 -mt-1 items-center',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs font-semibold',
              },
            ],
          },
          {
            cells: [
              {
                path: 'issuer',
                className: 'text-xs font-normal -mt-2',
              },
            ],
          },
        ],
      },
    },

    // Interests Section - Right Column

    {
      id: 'interests',
      type: 'badge-section',
      break: true,
      breakable: true,
      column: 'right',

      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base font-bold text-black mt-0',
      },

      listPath: 'interests.items[0].items',
      itemPrefix: '• ',
      containerClassName: 'columns-2 gap-6 mt-2',
      badgeClassName: 'block text-xs text-black break-inside-avoid mb-1 leading-tight',
    },
  ],
};

export default mohsinaTemplate2;
