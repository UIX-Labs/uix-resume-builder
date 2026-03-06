export const mohsinaTemplate7 = {
  name: 'Mohsina Template 6',
  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Lato, Arial',
  },

  sections: [
    {
      //HEADER SECTION
      id: 'header',
      type: 'banner',
      className: 'flex flex-col justify-center  px-8 py-6',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-center w-full',
          items: [
            {
              type: 'group',
              className: 'flex items-center gap-4',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  condition: 'personalDetails.items[0].profilePicturePublicUrl',
                  className: 'w-20 h-20 rounded-full object-cover',
                  alt: 'Profile image',
                },

                {
                  type: 'group',
                  className: 'flex flex-col items-stretch gap-2',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-[34px] leading-[28px] font-normal tracking-[-0.3px] text-black',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className:
                        'text-sm leading-[11px] font-bold uppercase text-white tracking-[3px] bg-[#4C77FF] px-3 py-1.5 text-center tracking-widest',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col items-start gap-[4px]',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Mail',
                      size: 10,
                      className: 'text-white bg-[#4C77FF]  p-0.5',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'amanguppta@gmail.com',
                      className: 'text-[13px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'MapPin',
                      size: 10,
                      className: 'text-white bg-[#4C77FF]  p-0.5',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].location',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[13px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Linkedin',
                      size: 10,
                      className: 'text-white bg-[#4C77FF] p-0.5',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      fallback: 'Portfolio / linkedin',
                      className: 'text-[13px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Phone',
                      size: 10,
                      className: 'text-white bg-[#4C77FF]  p-0.5',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '(914) 479-6342',
                      className: 'text-[13px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Link',
                      size: 10,
                      className: 'text-white bg-[#4C77FF] p-0.5',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.website.title',
                      href: 'personalDetails.items[0].links.website.link',
                      fallback: 'Portfolio',
                      className: 'text-[13px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Github',
                      size: 10,
                      className: 'text-white bg-[#4C77FF]  p-0.5',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.github.title',
                      href: 'personalDetails.items[0].links.github.link',
                      fallback: 'Github',
                      className: 'text-[13px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Palette',
                      size: 10,
                      className: 'text-white bg-[#4C77FF]  p-0.5',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.behance.title',
                      href: 'personalDetails.items[0].links.behance.link',
                      fallback: 'Behance',
                      className: 'text-[13px] leading-[13px] text-black',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    //SUMMARY
    {
      id: 'summary',
      type: 'list-section',
      column: 'left',
      className: 'flex flex-col px-0 pt-0 mb-4',

      heading: {
        path: 'summary.heading',
        fallback: 'Professional Summary',
        className:
          'flex-row items-center gap-3 w-full text-xs font-bold leading-[15px] tracking-widest uppercase [&>p]:text-white [&>p]:bg-[#4C77FF] [&>p]:px-3 [&>p]:py-1 after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[1] mt-2 mb-2',
      },

      listPath: 'personalDetails.items',
      containerClassName: 'flex flex-col',

      itemTemplate: {
        className: 'flex',
        rows: [
          {
            className: 'flex w-full',
            cells: [
              {
                type: 'html',
                path: 'description',
                fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
                className: 'text-[13px] leading-[16px] text-[#323232] break-words whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      className: 'mb-4',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className:
          'flex-row items-center gap-3 w-full text-xs font-bold leading-[16px] tracking-widest uppercase [&>p]:text-white [&>p]:bg-[#4C77FF] [&>p]:px-3 [&>p]:py-1 after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[1] mt-2 mb-2',
      },

      listPath: 'education.items',

      containerClassName: 'flex flex-col gap-4',

      itemTemplate: {
        className: 'flex justify-between items-start w-full',

        rows: [
          {
            className: 'flex justify-between w-full',
            cells: [
              // LEFT SIDE (Degree + Institution)
              {
                type: 'group',
                className: 'flex flex-col gap-[2px]',
                items: [
                  {
                    type: 'group',
                    className: 'flex items-center gap-1',
                    items: [
                      {
                        path: 'degree',
                        className: 'text-base font-semibold font-lato text-[#101214] leading-[19px] ',
                      },
                      {
                        path: 'grade.value',
                        prefix: ', ',
                        className: 'text-base font-semibold font-lato text-[#101214] leading-[19px] ',
                      },
                    ],
                  },
                  {
                    path: 'institution',
                    className: 'text-[13px] font-normal text-[#323232] leading-[16px] font-[Arial]',
                  },
                ],
              },

              // RIGHT SIDE (Duration)
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-bold text-[#4C77FF] leading-[13px] whitespace-nowrap font-[Arial]',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-4',

      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className:
          'flex-row items-center w-full gap-3 text-[12px] font-bold leading-[15px] tracking-widest uppercase [&>p]:text-white [&>p]:bg-[#4C77FF] [&>p]:px-3 [&>p]:py-1 after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[1] mb-2 mt-2',
      },

      listPath: 'experience.items',

      containerClassName: 'flex flex-col gap-4',

      itemTemplate: {
        className: 'flex flex-col gap-1',

        rows: [
          {
            className: 'flex justify-between w-full',
            cells: [
              // LEFT SIDE
              {
                type: 'group',
                className: 'flex flex-col gap-2 flex-1',
                items: [
                  {
                    type: 'group',
                    className: 'flex flex-wrap gap-1',
                    items: [
                      {
                        path: 'position',
                        className: 'text-base font-semibold font-lato text-[#101214] leading-[13px]',
                      },
                      {
                        path: 'company',
                        prefix: ', ',
                        className: 'text-base font-semibold font-lato text-[#101214] leading-[13px]',
                      },
                    ],
                  },

                  {
                    type: 'html',
                    path: 'description',
                    breakable: true,
                    className:
                      'text-[13px] text-[#323232] font-lato leading-[16px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
                  },
                ],
              },

              // RIGHT SIDE (Duration)
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-bold text-[#4C77FF] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-4',

      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className:
          'flex-row items-center w-full gap-3 text-xs font-bold leading-[15px] tracking-widest uppercase [&>p]:text-white [&>p]:bg-[#4C77FF] [&>p]:px-3 [&>p]:py-1 after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[1] mb-2 mt-2',
      },

      listPath: 'projects.items',

      containerClassName: 'flex flex-col gap-4',

      itemTemplate: {
        className: 'flex flex-col gap-1',

        rows: [
          {
            className: 'flex justify-between w-full',
            cells: [
              // LEFT SIDE
              {
                type: 'group',
                className: 'flex flex-col gap-2 flex-1',
                items: [
                  {
                    path: 'title',
                    fallback: 'Project Title',
                    className: 'text-base font-semibold font-lato text-[#101214] leading-[18px]',
                  },

                  {
                    type: 'html',
                    path: 'description',
                    breakable: true,
                    className:
                      'text-[13px] text-[#323232] font-lato leading-[16px] -mt-1 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
                  },
                ],
              },

              // RIGHT SIDE (Duration)
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-bold text-[#4C77FF] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'achievements',
      type: 'badge-section',
      column: 'left',
      break: true,
      breakable: true,
      className: 'mb-4',

      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className:
          'flex-row items-center gap-3 w-full text-sm font-bold leading-[15px] tracking-widest uppercase [&>p]:text-white [&>p]:bg-[#4C77FF] [&>p]:px-3 [&>p]:py-1 after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[1] mt-2 mb-2',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',

      badgeClassName: 'block w-full text-[13px] gap-y-2 text-[#323232] leading-[16px] whitespace-pre-wrap ',
    },
    {
      id: 'skills',
      type: 'badge-section',
      column: 'right',
      break: true,
      breakable: true,
      className: 'mb-4',

      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className:
          'flex-row items-center w-full gap-3 text-xs font-bold leading-[15px] tracking-widest uppercase [&>p]:text-white [&>p]:bg-[#4C77FF] [&>p]:px-3 [&>p]:py-1 after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[1] mt-2 mb-2',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      containerClassName: 'flex flex-wrap gap-x-4 gap-y-1 ',

      badgeClassName:
        'flex items-center gap-3 text-[13px] font-semibold tracking-[0.1px] text-black before:content-[""] before:w-1.5 before:h-1.5 before:bg-[#4C77FF]',
    },
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-4',

      heading: {
        path: 'certifications.title',
        fallback: 'Certifications',
        className:
          'flex-row items-center w-full gap-3 text-xs font-bold leading-[15px] tracking-widest uppercase [&>p]:text-white [&>p]:bg-[#4C77FF] [&>p]:px-3 [&>p]:py-1 after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[1] mt-2 mb-3',
      },

      listPath: 'certifications.items',

      containerClassName: 'flex flex-col gap-4 ',

      itemTemplate: {
        className: 'flex flex-col ',

        rows: [
          {
            className: 'flex justify-between items-start w-full ',
            cells: [
              // LEFT SIDE
              {
                type: 'group',
                className: 'flex flex-col gap-2 flex-1',
                items: [
                  {
                    path: 'title',
                    fallback: 'Certification Title',
                    className: 'text-base font-semibold font-lato text-[#101214] leading-[13px]',
                  },
                  {
                    path: 'issuer',
                    fallback: 'Issuer',
                    className: 'text-[13px] font-normal font-lato text-[#323232] leading-[13px]',
                  },
                ],
              },

              // RIGHT SIDE (Duration)
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-bold text-[#4C77FF] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'interests',
      type: 'badge-section',
      column: 'right',
      break: true,
      breakable: true,
      className: 'mb-4',

      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className:
          'flex-row items-center w-full gap-3 text-xs font-bold leading-[15px] tracking-widest uppercase [&>p]:text-white [&>p]:bg-[#4C77FF] [&>p]:px-3 [&>p]:py-1 after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[1] mt-3 mb-2',
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      containerClassName: 'flex flex-wrap gap-x-4 gap-y-1 ',

      badgeClassName:
        'flex items-center gap-3 text-[13px] font-lato font-semibold tracking-[0.1px] text-black before:content-[""] before:w-1.5 before:h-1.5 before:bg-[#4C77FF]',
    },
  ],
};
