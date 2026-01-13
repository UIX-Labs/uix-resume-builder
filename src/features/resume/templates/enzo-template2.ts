const enzoTemplate2 = {
  name: 'Kate Modern Professional',

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
      className: 'pl-4 flex flex-col gap-3',
    },
  },

  sections: [
    // --- HEADER LEFT (Photo, Name, Summary) ---
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
            // Name and Summary
            {
              type: 'group',
              className: 'flex flex-col gap-1 pt-1 max-w-[60%]',
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
              className: 'flex flex-col gap-3 items-end pt-1',
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
        break: true,
        rows: [
          {
            cells: [
              {
                path: 'position',
                className: 'text-xs font-bold pt-4',
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
                break: true,
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
                className: 'text-xs font-bold',
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
                className: 'text-xs font-bold',
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

    // Skills Section - Right Column
    {
      id: 'skills',
      break: true,
      breakable: true,
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
      break: true,
      breakable: true,
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
      break: true,
      breakable: true,
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

export default enzoTemplate2;
