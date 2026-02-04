// Flattened template structure matching standard format

const aniketTemplate2 = {
  name: 'Aniket Modern Classic',

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
      className: 'flex flex-col gap-2',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Your Name',
          className: 'text-xl font-bold text-black border-b-2 border-neutral-400 pb-1',
        },
        contact: {
          type: 'inline-group',
          className: 'flex flex-row flex-wrap justify-start gap-2 text-xs text-black',
          separator: ' | ',
          items: [
            { path: 'personalDetails.items[0].phone', fallback: 'Phone' },
            {
              type: 'link',
              path: 'personalDetails.items[0].email',
              href: 'mailto:{{value}}',
              fallback: 'Email',
              className: 'hover:text-blue-600',
            },
            { path: 'personalDetails.items[0].address', fallback: 'City' },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.linkedin.title',
              href: 'personalDetails.items[0].links.linkedin.link',
              className: 'hover:text-blue-600',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.github.title',
              href: 'personalDetails.items[0].links.github.link',
              className: 'hover:text-blue-600',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.website.title',
              href: 'personalDetails.items[0].links.website.link',
              className: 'hover:text-blue-600',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.youtube.title',
              href: 'personalDetails.items[0].links.youtube.link',
              className: 'hover:text-blue-600',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.dribble.title',
              href: 'personalDetails.items[0].links.dribble.link',
              className: 'hover:text-blue-600',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.behance.title',
              href: 'personalDetails.items[0].links.behance.link',
              className: 'hover:text-blue-600',
            },
          ],
        },
      },
    },

    // Summary Section
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col mt-1',
      heading: {
        path: 'summary.heading',
        fallback: 'Summary',
        className: 'text-xs font-bold text-black mt-3',
      },
      divider: {
        variant: 'line',
        className: 'bg-neutral-400 w-full h-[2px] mt-0.5',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className:
          'text-xs text-neutral-700 text-justify [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap mt-2',
      },
    },

    // Skills Section
    {
      id: 'skills',
      type: 'inline-list-section',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-xs font-bold text-black mt-4',
        divider: {
          variant: 'line',
          className: 'bg-neutral-400 w-full h-[2px] mt-0.5',
        },
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-xs text-black',
      containerClassName: 'text-xs text-black leading-relaxed mt-2',
      itemSeparator: ', ',
    },

    // Experience Section
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-xs font-bold text-black mt-1',
        divider: {
          variant: 'line',
          className: 'bg-neutral-400 w-full h-[2px] mt-0.5 mb-1.5',
        },
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-3',
        rows: [
          {
            className: 'flex flex-row flex-wrap justify-start gap-2 text-xs text-black',
            cells: [
              {
                type: 'inline-group',
                separator: ' | ',
                items: [
                  { path: 'company', className: 'font-semibold' },
                  { path: 'location', className: 'font-semibold' },
                ],
              },
            ],
          },
          {
            className: 'flex flex-row flex-wrap justify-start gap-2 text-xs text-black',
            cells: [
              {
                type: 'inline-group',
                separator: ' | ',
                items: [
                  { path: 'position', className: 'font-semibold' },
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-xs text-neutral-600 italic',
                  },
                ],
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className: 'text-xs text-black break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
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
        fallback: 'Education',
        className: 'text-xs font-bold text-black mt-4',
        divider: {
          variant: 'line',
          className: 'bg-neutral-400 w-full h-[2px] mt-0.5',
        },
      },
      listPath: 'education.items',
      // itemTemplate: {
      //   className: "flex flex-col gap-1 leading-none",
      //   break: true,
      //   rows: [
      //     {
      //       className:
      //         "flex flex-row flex-wrap justify-start gap-2 mt-4 text-xs text-black",
      //       cells: [
      //         {
      //           type: "inline-group",
      //           separator: " | ",
      //           items: [
      //             { path: "institution", className: "font-semibold" },
      //             {
      //               path: "location",
      //               fallback: "",
      //               className: "font-semibold",
      //             },
      //             { path: "degree", className: "font-semibold" },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       className:
      //         "flex flex-row flex-wrap justify-start gap-2 text-xs text-black",
      //       cells: [
      //         {
      //           type: "duration",
      //           path: "duration",
      //           className: "text-xs text-neutral-600 italic",
      //         },
      //       ],
      //     },
      //     {
      //       cells: [
      //         {
      //           path: "grade.value",
      //           className: "text-xs text-black",
      //         },
      //       ],
      //     },
      //   ],
      // },

      itemTemplate: {
        className: 'flex flex-col mt-3',
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              // LEFT: Institution + Degree (tight stack)
              {
                type: 'group',
                className: 'flex flex-col leading-tight',
                items: [
                  { path: 'institution', className: 'text-xs font-semibold' },

                  { path: 'degree', className: 'text-xs font-normal' },
                ],
              },

              // RIGHT: Date + Grade
              {
                type: 'group',
                className: 'flex flex-col items-end text-right leading-tight',
                items: [
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-xs text-neutral-600 italic',
                  },
                  {
                    path: 'grade.value',
                    className: 'text-xs text-black',
                  },
                ],
              },
            ],
          },
        ],
      },
    },

    // Interests Section
    {
      id: 'interests',
      type: 'badge-section',
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-xs font-bold text-black mt-4',
        divider: {
          variant: 'line',
          className: 'bg-neutral-400 w-full h-[2px] mt-0.5',
        },
      },
      listPath: 'interests.items[0].items',
      badgeClassName: 'text-xs text-black',
      containerClassName: 'text-xs text-black leading-relaxed mt-2',
      itemSeparator: ', ',
    },

    // Achievements Section
    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      breakable: true,
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-xs font-bold text-black mt-4',
        divider: {
          variant: 'line',
          className: 'bg-neutral-400 w-full h-[2px] mt-0.5',
        },
      },
      listPath: 'achievements.items[0].items',
      itemPrefix: '• ',
      badgeClassName: 'text-xs text-black',
      containerClassName: 'flex flex-col gap-1 mt-1.5 leading-none',
    },

    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-xs font-bold text-black mt-1',
        divider: {
          variant: 'line',
          className: 'bg-neutral-400 w-full h-[2px] mt-0.5 mb-2',
        },
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'flex flex-col mt-3 leading-tight',
        break: true,
        rows: [
          // Row 1: Title (left) + Date (right)
          {
            className: 'flex flex-row justify-between items-center',
            cells: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-xs font-semibold text-neutral-900',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-neutral-600 italic',
              },
            ],
          },

          // Row 2: Issuer
          {
            className: 'flex flex-row',
            cells: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-xs text-neutral-700',
              },
            ],
          },

          // Row 3: Link (optional)
          {
            className: 'flex flex-row',
            cells: [
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                fallback: '',
                className: 'text-xs text-blue-600 hover:underline',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default aniketTemplate2;
