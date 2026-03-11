const mohsinaTemplate5 = {
  name: 'Dark Two Column Professional',

  page: {
    background: 'white',
    className: 'text-black leading-relaxed',
    fontFamily: 'Arial',
  },

  sections: [
    // Header Section - Name and Title on one line
    // Header Section - Title first, then Name, contacts on right
    {
      id: 'header',
      type: 'banner',
      className: 'flex flex-col px-2 py-4 bg-white',

      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-start w-full',

          items: [
            // LEFT SIDE
            {
              type: 'group',
              className: 'flex flex-row items-center gap-4',

              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  condition: 'personalDetails.items[0].profilePicturePublicUrl',
                  className: 'w-[99px] h-[99px] rounded-full object-cover border border-[#005FF2] flex-shrink-0',
                },

                {
                  type: 'group',
                  className: 'flex flex-col gap-1',

                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'Aman Gupta',
                      className: 'text-3xl font-bold text-[#005FF2] leading-none font-arial max-w-[300px] break-words',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'WEB DESIGNER',
                      className:
                        'text-[13px] uppercase tracking-[2px] leading-[18px] text-black font-arial max-w-[300px] break-words',
                    },
                  ],
                },
              ],
            },

            // RIGHT SIDE
            {
              type: 'group',
              className: 'flex flex-col gap-0.5 items-start text-left w-40 flex-shrink-0',

              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  items: [
                    { type: 'icon', name: 'Mail', size: 12, className: 'text-[#005FF2]' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      className: 'text-[8px] uppercase tracking-[1px] leading-[18px] text-black font-arial',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  items: [
                    { type: 'icon', name: 'Phone', size: 12, className: 'text-[#005FF2]' },
                    {
                      path: 'personalDetails.items[0].phone',
                      className: 'text-[8px] uppercase tracking-[1px] leading-[18px] text-black font-arial',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  items: [
                    { type: 'icon', name: 'Linkedin', size: 12, className: 'text-[#005FF2]' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      className: 'text-[8px] uppercase tracking-[1px] leading-[18px] text-black font-arial',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  items: [
                    { type: 'icon', name: 'Github', size: 12, className: 'text-[#005FF2]' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.github.title',
                      href: 'personalDetails.items[0].links.github.link',
                      className: 'text-[8px] uppercase tracking-[1px] leading-[18px] text-black font-arial',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  items: [
                    { type: 'icon', name: 'Globe', size: 12, className: 'text-[#005FF2]' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.portfolio.title',
                      href: 'personalDetails.items[0].links.portfolio.url',
                      className: 'text-[8px] uppercase tracking-[1px] leading-[18px] text-black font-arial',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  items: [
                    { type: 'icon', name: 'MapPin', size: 12, className: 'text-[#005FF2]' },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].address',
                      className: 'text-[8px] uppercase tracking-[1px] leading-[18px] text-black font-arial',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  items: [
                    { type: 'icon', name: 'Palette', size: 12, className: 'text-[#005FF2]' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.behance.title',
                      href: 'personalDetails.items[0].links.behance.link',
                      className: 'text-[8px] uppercase tracking-[1px] leading-[18px] text-black font-arial',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  items: [
                    { type: 'icon', name: 'Dribble', size: 12, className: 'text-[#005FF2]' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.dribble.title',
                      href: 'personalDetails.items[0].links.dribble.link',
                      className: 'text-[8px] uppercase tracking-[1px] leading-[18px] text-black font-arial',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },

    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col mt-0',

      heading: {
        path: 'summary.heading',
        fallback: 'Summary',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2.5px] leading-[18px] font-arial',
      },

      divider: {
        variant: 'line',
        className: 'border-b border-black mt-1 mb-2',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback:
          'UX/UI specialist focused on designing clean and functional projects across all platforms and devices in response to specific briefs and problems.',
        className: 'text-[13px] text-black leading-[18px] font-arial whitespace-pre-wrap w-full',
      },
    },

    {
      id: 'education',
      type: 'list-section',
      break: false,

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2.5px] leading-[18px] font-arial mt-2',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'education.items',

      itemTemplate: {
        className: 'flex flex-col gap-8',

        rows: [
          {
            className: 'flex justify-between items-center g',

            cells: [
              {
                type: 'group',
                className: 'flex flex-col flex-1 min-w-0 leading-tight gap-0.5',
                items: [
                  {
                    path: 'degree',
                    className: 'text-[13px] font-bold text-black uppercase tracking-[1px] font-arial',
                  },
                  {
                    path: 'grade.value',
                    className: 'text-[13px] font-bold text-black uppercase tracking-[1px] font-arial',
                  },
                  {
                    path: 'institution',
                    className:
                      'text-[10px] font-normal text-black uppercase tracking-[1px] leading-tight font-arial mb-2',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className:
                  'text-[10px] font-bold text-[#005FF2] uppercase tracking-[2px] leading-[18px] font-arial w-40 shrink-0 text-right mt-0.5',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'experience',
      type: 'list-section',
      break: true,

      heading: {
        path: 'experience.heading',
        fallback: 'Work Experience',
        className: 'uppercase text-sm font-bold text-[#005ff2] tracking-[2.5px] leading-[18px] font-arial ',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'experience.items',

      itemTemplate: {
        className: 'flex flex-col mt-3',

        rows: [
          {
            className: 'flex justify-between items-start',
            cells: [
              {
                type: 'group',
                className: 'flex flex-col flex-1 min-w-0 leading-tight gap-1',
                items: [
                  {
                    path: 'position',
                    className: 'text-[13px] font-bold text-black font-arial',
                  },
                  {
                    path: 'company',
                    className: 'text-[13px] font-normal text-black uppercase tracking-[2px] font-arial',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className:
                  'text-[10px] font-bold text-[#005FF2] uppercase tracking-[2px] font-arial w-40 shrink-0 text-right mt-0.5',
              },
            ],
          },
          {
            className: 'mt-0',
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-[13px] text-black  leading-[18px] font-arial break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'projects',
      type: 'list-section',
      break: true,

      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2.5px] leading-[18px] font-arial -mt-1',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'projects.items',

      itemTemplate: {
        className: 'flex flex-col mt-3',

        rows: [
          {
            className: 'flex justify-between items-center',

            cells: [
              {
                type: 'group',
                className: 'flex flex-row justify-between items-start w-full gap-4',
                items: [
                  {
                    path: 'title',
                    fallback: 'Project Title',
                    className: 'text-[13px] font-bold text-black leading-[18px] font-arial flex-1 min-w-0',
                  },
                  {
                    type: 'duration',
                    path: 'duration',
                    fallback: '',
                    className:
                      'text-[10px] font-bold text-[#005FF2] uppercase tracking-[2px] leading-[18px] w-40 shrink-0 text-right mt-0.5 font-arial',
                  },
                ],
              },
            ],
          },
          {
            className: 'mt-0',
            cells: [
              {
                type: 'html',
                path: 'description',
                fallback: '',
                break: true,
                className:
                  'text-[13px] text-black leading-[18px]mt-1 font-arial break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'skills',
      type: 'inline-list-section',
      break: true,
      breakable: true,

      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'uppercase text-[14px] font-bold text-[#005FF2] tracking-[2.5px] leading-[18px] font-arial mt-2',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'skills.items',
      itemPath: 'name',

      showBullet: false,
      itemSeparator: ' | ',

      containerClassName: 'flex flex-wrap leading-[18px] font-arial',

      itemClassName: 'text-[13px] font-bold text-black leading-[18px] m-2  font-arial',
    },

    {
      id: 'achievements',
      type: 'inline-list-section',
      break: true,
      breakable: true,

      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2.5px] leading-[18px] font-arial mt-2',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',

      showBullet: true,

      containerClassName: 'flex flex-col gap-0 w-full',

      itemClassName: 'text-[13px] font-normal text-black leading-[18px] font-arial break-words',
    },
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      className: 'mt-0',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certification',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2.5px] leading-[18px] font-arial mt-2',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-3',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          // First Row → Title + Duration
          {
            className: 'flex justify-between items-center',
            cells: [
              {
                path: 'title',
                fallback: 'Certificate Name',
                className: 'text-[13px] font-bold text-black leading-[18px] font-arial',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-bold text-[#005FF2] uppercase tracking-[2px] leading-[18px] font-arial',
              },
            ],
          },

          // Second Row → Issuer
          {
            className: 'mt-0',
            cells: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-[13px] font-normal text-black  tracking-[2px] leading-[18px] font-arial',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'interests',
      type: 'inline-list-section',
      break: true,
      breakable: true,
      className: 'mt-6',

      heading: {
        path: 'interests.heading',
        fallback: 'Interest',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2.5px] leading-[18px] font-arial mt-2',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      showBullet: false,

      itemSeparator: '  |  ',

      containerClassName: 'flex flex-wrap mt-1 leading-[18px] font-arial',

      itemClassName: 'text-[13px] m-2 font-bold text-black leading-[18px] font-arial',
    },
  ],
};

export default mohsinaTemplate5;
