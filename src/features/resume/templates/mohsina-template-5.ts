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
      break: false,
      className: 'flex justify-between bg-white -mx-6 px-6 -my-6 py-6 mb-6',

      fields: {
        container: {
          type: 'group',
          className: 'flex justify-between items-start w-full',

          items: [
            // LEFT SECTION (Photo + Name + Title)
            {
              type: 'group',
              className: 'flex items-center gap-[15px]',

              items: [
                // PROFILE IMAGE
                {
                  type: 'image',
                  path: 'personalDetails.items[0].photo',
                  fallback: '',
                  className: 'w-[75px] h-[75px] aspect-square object-cover rounded-full border border-[#005FF2]',
                },

                // NAME + TITLE CONTAINER
                {
                  type: 'group',
                  className: 'flex flex-col items-start gap-[5px]',

                  items: [
                    // NAME
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'Aman Gupta',
                      className: 'text-[22px] font-bold text-[#005FF2] leading-[20px] font-arial',
                    },

                    // TITLE
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'WEB DESIGNER',
                      className:
                        'text-[10px] font-normal text-black uppercase tracking-[2px] leading-[18px] font-arial',
                    },
                  ],
                },
              ],
            },

            // RIGHT SIDE (CONTACT BOX)
            {
              type: 'group',
              className: 'flex flex-col gap-1',

              items: [
                {
                  path: 'personalDetails.items[0].address',
                  className: 'text-[8px] text-black uppercase tracking-[1px] leading-[16px] font-arial',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  className: 'text-[8px] text-black uppercase tracking-[1px] leading-[16px] font-arial',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].phone',
                  className: 'text-[8px] text-black uppercase tracking-[1px] leading-[16px] font-arial',
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
      className: 'flex flex-col mt-5',

      heading: {
        path: 'summary.heading',
        fallback: 'Summary',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2px] leading-[18px] font-arial',
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
        className: 'text-[13px] text-black leading-[16px] font-arial whitespace-pre-wrap w-full',
      },
    },

    {
      id: 'education',
      type: 'list-section',
      break: false,

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2px] leading-[18px] font-arial mt-5',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'education.items',

      itemTemplate: {
        className: 'flex flex-col gap-y-1',

        rows: [
          {
            className: 'flex justify-between items-center',

            cells: [
              {
                type: 'inline-group',
                separator: ', ',
                className: 'flex items-center  -mt-2',

                items: [
                  {
                    path: 'degree',
                    className: 'text-sm font-bold text-black uppercase tracking-[1px] leading-[16px] font-arial',
                  },
                  {
                    path: 'grade.value',
                    className: 'text-sm font-bold text-black uppercase tracking-[1px] leading-[16px] font-arial',
                  },
                ],
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-bold text-[#005FF2] uppercase tracking-[2px] leading-[18px] font-arial',
              },
            ],
          },

          {
            className: '-mt-2 mb-4',

            cells: [
              {
                path: 'institution',
                className: 'text-sm font-normal text-black uppercase tracking-[1px] leading-[16px] font-arial',
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
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2px] leading-[18px] font-arial -mt-3',
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
            className: 'flex justify-between items-center ',

            cells: [
              {
                path: 'position',
                className: 'text-sm font-bold text-black leading-[16px] font-arial',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-bold text-[#005FF2] uppercase tracking-[2px] leading-[18px] font-arial',
              },
            ],
          },

          {
            className: '-mt-1',
            cells: [
              {
                path: 'company',
                className: 'text-sm font-normal text-black uppercase tracking-[2px] leading-[16px] font-arial',
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
                  'text-sm text-black leading-[16px] font-arial break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc',
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
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2px] leading-[18px] font-arial mt-4',
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
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-bold text-black leading-[18px] font-arial',
              },
              {
                type: 'duration',
                path: 'duration',
                fallback: '',
                className: 'text-[10px] font-bold text-[#005FF2] uppercase tracking-[2px] leading-[18px] font-arial',
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
                  'text-sm text-black leading-[18px] font-arial break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc',
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
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2px] leading-[18px] font-arial mt-4',
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

      itemClassName: 'text-sm font-bold text-black leading-[18px] m-2 font-arial',
    },

    {
      id: 'achievements',
      type: 'inline-list-section',
      break: true,
      breakable: true,

      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2px] leading-[18px] font-arial mt-4',
        divider: {
          variant: 'line',
          className: 'border-b border-black mt-1 mb-3',
        },
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',

      showBullet: true,

      containerClassName: 'flex flex-col gap-2 w-full',

      itemClassName: 'text-sm font-normal text-black leading-[12px] font-arial break-words',
    },
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      className: 'mt-0',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certification',
        className: 'uppercase text-[10px] font-bold text-[#005FF2] tracking-[2px] leading-[18px] font-arial mt-4',
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
          {
            className: 'flex justify-between items-center',

            cells: [
              {
                path: 'title',
                fallback: 'Certificate Name',
                className: 'text-sm font-bold text-black leading-[18px] font-arial',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-bold text-[#005FF2] uppercase tracking-[2px] leading-[18px] font-arial',
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
        className: 'uppercase text-sm font-bold text-[#005FF2] tracking-[2px] leading-[18px] font-arial mt-4',
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

      itemClassName: 'text-sm m-2 font-bold text-black leading-[18px] font-arial',
    },
  ],
};

export default mohsinaTemplate5;
