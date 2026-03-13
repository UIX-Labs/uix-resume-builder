// Flattened template structure with simplified list rendering
const mohsinaTemplate11 = {
  name: 'Aniket Modern Classic',
  page: {
    background: '#000000',
    className: 'text-yellow-500 leading-relaxed',
    fontFamily: 'Arial',
  },
  sections: [
    {
      //HEADER SECTION
      id: 'header',
      type: 'banner',
      className: 'flex flex-col justify-center ',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-center w-full',
          items: [
            {
              type: 'group',
              className: 'flex items-center gap-5',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  fallback: '/images/profileimg.jpeg',
                  className: 'w-20 h-20 rounded-full object-cover shrink-0',
                  alt: 'Profile image',
                },

                {
                  type: 'group',
                  className: 'flex flex-col items-stretch mr-15 ',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-[30px] font-bold leading-tight ',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-xs tracking-[2px] text-white font-normal uppercase ',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col justify-end items-start gap-y-2 w-40 shrink-0 py-2 mr-4',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Mail',
                      size: 11,
                      className: '',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'amanguppta@gmail.com',
                      className: 'text-[10px] font-bold text-white break-all leading-tight',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'MapPin',
                      size: 11,
                      className: 'mt-[2px]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].address',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[10px] font-bold text-white break-all leading-tight',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Phone',
                      size: 11,
                      className: 'mt-[2px]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '(914) 479-6342',
                      className: 'text-[10px] font-bold text-white break-all leading-tight',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-1',
                  condition: 'personalDetails.items[0].links',
                  items: [
                    {
                      type: 'icon',
                      name: 'Link',
                      size: 11,
                      className: 'mt-[2px]',
                    },
                    {
                      type: 'inline-group',
                      className:
                        'flex flex-wrap text-[10px] font-bold text-white leading-[16px] font-poppins underline decoration-1 underline-offset-2 break-all',
                      separator: ' / ',
                      items: [
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.website.title',
                          href: 'personalDetails.items[0].links.website.link',
                          condition: 'personalDetails.items[0].links.website.title',
                          fallback: 'Portfolio',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.linkedin.title',
                          href: 'personalDetails.items[0].links.linkedin.link',
                          condition: 'personalDetails.items[0].links.linkedin.title',
                          fallback: 'LinkedIn',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.github.title',
                          href: 'personalDetails.items[0].links.github.link',
                          condition: 'personalDetails.items[0].links.github.title',
                          fallback: 'Github',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.dribble.title',
                          href: 'personalDetails.items[0].links.dribble.link',
                          condition: 'personalDetails.items[0].links.dribble.link',
                          fallback: 'Dribble',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.behance.title',
                          href: 'personalDetails.items[0].links.behance.link',
                          condition: 'personalDetails.items[0].links.behance.link',
                          fallback: 'Behance',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.youtube.title',
                          href: 'personalDetails.items[0].links.youtube.link',
                          condition: 'personalDetails.items[0].links.youtube.link',
                          fallback: 'YouTube',
                        },
                      ],
                    },
                  ],
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
      column: 'left',
      className: 'flex flex-col mt-5',
      heading: {
        path: 'summary.heading',
        fallback: 'Summary',
        className: 'uppercase tracking-wide text-sm font-bold  ',
      },
      divider: {
        variant: 'line',
        className: 'bg-white w-full h-[1.5px] mt-0.5',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className: 'text-xs  text-white text-justify whitespace-pre-wrap mt-2.5',
      },
    },
    {
      id: 'education',
      type: 'list-section',
      column: 'left',
      break: false,
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'uppercase tracking-wide text-sm font-bold mt-5 gap-1 -mb-0.5',
        divider: {
          variant: 'line',
          className: 'bg-white w-full h-[1.5px] mt-0.5',
        },
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'flex flex-col mt-3',
        rows: [
          {
            className: 'flex flex-row justify-between items-start gap-4',
            cells: [
              {
                type: 'group',
                className: 'flex flex-col leading-tight flex-1 min-w-0 gap-0.5',
                items: [
                  {
                    path: 'degree',
                    className: 'text-sm font-bold text-white',
                  },
                  {
                    path: 'grade.value',
                    className: 'text-sm font-medium text-white',
                  },
                  {
                    path: 'institution',
                    className: 'font-normal tracking-[1px] uppercase text-white text-sm',
                  },
                ],
              },

              // RIGHT: Duration
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs tracking-[2px] leading-tight w-40 shrink-0 text-right mt-1',
              },
            ],
          },
        ],
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
        className: 'uppercase tracking-wide text-sm font-bold   gap-1 mt-2 mb-2.5',
        divider: { variant: 'line', className: 'bg-white w-full h-[1.5px]' },
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-col mt-3',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start text-sm gap-4 mb-1',
            cells: [
              {
                type: 'group',
                className: 'flex flex-col gap-0.5 flex-1 min-w-0 leading-tight',
                break: true,
                items: [
                  { path: 'position', className: 'font-semibold text-white text-sm' },
                  {
                    path: 'company',
                    className: 'font-normal tracking-[2px] uppercase text-white text-sm',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'font-normal text-xs tracking-[2px] w-40 shrink-0 text-right mt-1',
              },
            ],
          },
          {
            className: 'flex flex-col',
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className: 'text-xs text-white   break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
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
      className: 'flex flex-col',
      break: true,
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'uppercase tracking-wide text-sm font-bold   gap-1 mb-2 mt-1',
        divider: { variant: 'line', className: 'bg-white w-full h-[1.5px]' },
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-3',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-semibold text-white leading-tight',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs tracking-[2px] w-40 shrink-0 text-right mt-1',
              },
            ],
          },

          {
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className: 'text-xs text-white  break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'skills',
      break: true,
      type: 'inline-list-section',
      column: 'left',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'uppercase tracking-wide text-sm font-bold mt-5 gap-1 mb-2.5',
        divider: {
          variant: 'line',
          className: 'bg-white w-full h-[1.5px] mt-0.5',
        },
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-sm text-white ml-2 mr-2 gap-x-3',
      containerClassName: 'flex flex-row flex-wrap items-center mt-2',
      itemSeparator: ' | ',
    },
    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      breakable: true,
      column: 'left',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'uppercase tracking-wide text-sm font-bold   mt-5 gap-1 mb-2',
        divider: { variant: 'line', className: 'bg-white w-full h-[1.5px]' },
      },
      listPath: 'achievements.items[0].items',
      containerClassName: 'flex flex-col gap-0 mt-1',
      itemPrefix: '• ',
      badgeClassName: 'text-white text-xs text-justify whitespace-pre-wrap leading-tight',
    },
    //certifications
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'uppercase tracking-wide text-sm font-bold mt-2 gap-1 mb-2.5',
        divider: { variant: 'line', className: 'bg-white w-full h-[1.5px]' },
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-3 leading-none',
        break: true,
        // fields: [
        //   {
        //     path: "title",
        //     fallback: "Certification Title",
        //     className: "text-sm font-semibold text-neutral-900",
        //   },
        //   {
        //     path: "issuer",
        //     fallback: "Issuer",
        //     className: "text-xs text-neutral-700",
        //   },
        //   {
        //     type: "duration",
        //     path: "duration",
        //     className: "text-xs text-neutral-600 italic",
        //   },
        // ],
        rows: [
          {
            className: 'flex flex-row justify-between items-center',
            cells: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-sm text-white font-semibold ',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs tracking-[2px] w-32 shrink-0 text-right',
              },
            ],
          },
        ],
      },
    },
    // Interests Section (Badge Style)
    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'right',
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'uppercase tracking-wide text-sm font-bold   mt-5 gap-1 mb-2.5',
        divider: { variant: 'line', className: 'bg-white w-full h-[1.5px] mt-0.5' },
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      itemClassName: 'text-sm text-white mr-2',
      containerClassName: 'flex flex-row gap-x-3  flex-wrap items-center mt-2',
      itemSeparator: ' | ',
      itemSeparatorClassName: 'opacity-100 text-white',
    },

    // Achievements Section (Badge Style)

    // Certifications Section
  ],
};
export default mohsinaTemplate11;
