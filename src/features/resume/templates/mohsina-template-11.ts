// Flattened template structure with simplified list rendering
const mohsinaTemplate11 = {
  name: 'Aniket Modern Classic',
  page: {
    background: '#000000',
    className: 'text-yellow-500 leading-relaxed',
    fontFamily: 'Lora',
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
              className: 'flex items-center gap-5',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  fallback: '/images/profileimg.jpeg',
                  className: 'w-20 h-20 rounded-full object-cover',
                  alt: 'Profile image',
                },

                {
                  type: 'group',
                  className: 'flex flex-col items-stretch ',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-[30px] uppercase  font-normal tracking-[3px] text-black',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-xs tracking-[1px] font-normal uppercase text-gray-500',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col items-start gap-0 mb-2',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Mail',
                      size: 10,
                      className: ' text-[#005FF2]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'amanguppta@gmail.com',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'MapPin',
                      size: 10,
                      className: ' text-[#005FF2]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].location',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Linkedin',
                      size: 10,
                      className: ' text-[#005FF2]',
                    },

                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      fallback: 'Portfolio / linkedin',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Phone',
                      size: 10,
                      className: ' text-[#005FF2]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '(914) 479-6342',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Link',
                      size: 10,
                      className: ' text-[#005FF2]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.website.title',
                      href: 'personalDetails.items[0].links.website.link',
                      fallback: 'Portfolio',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Github',
                      size: 10,
                      className: ' text-[#005FF2]',
                    },

                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.github.title',
                      href: 'personalDetails.items[0].links.github.link',
                      fallback: 'Github',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Behance:',
                      className: 'text-[9px] text-[#005FF2]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.behance.title',
                      href: 'personalDetails.items[0].links.behance.link',
                      fallback: 'Behance',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    // Education Section
    {
      id: 'education',
      type: 'list-section',
      column: 'left',
      break: false,
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 -mb-0.5',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-[1.5px] mt-0.5',
        },
      },
      listPath: 'education.items',
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
                  {
                    path: 'institution',
                    className: 'font-semibold text-sm',
                  },
                  {
                    path: 'degree',
                    className: 'text-sm italic',
                  },
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
                    className: 'italic text-xs',
                  },
                  {
                    path: 'grade.value',
                    className: 'italic font-medium text-xs',
                  },
                ],
              },
            ],
          },
        ],
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
        className: 'uppercase tracking-wide text-sm font-bold text-black',
      },
      divider: {
        variant: 'line',
        className: 'bg-black w-full h-[1.5px] mt-0.5',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className: 'text-xs text-neutral-800 text-justify whitespace-pre-wrap mt-2.5',
      },
    },
    // Experience Section
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'uppercase tracking-wide text-sm font-bold text-black gap-1 mt-2 mb-2.5',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px]' },
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-col mt-3',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-center text-sm text-black mb-1',
            cells: [
              {
                type: 'inline-group',
                separator: ' | ',
                className: 'flex flex-row gap-1',
                break: true,
                items: [
                  { path: 'position', className: 'font-semibold' },
                  { path: 'company', className: 'font-semibold' },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'italic font-normal text-xs',
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
                className: 'text-xs text-neutral-800 break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
              },
            ],
          },

          // {
          //   cells: [
          //     {
          //       type: "html",
          //       path: "description",
          //       className:
          //         "text-xs text-black break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap",
          //     },
          //   ],
          // },
        ],
      },
    },
    // Skills Section
    // {
    //   listPath: 'skills.items',
    //   itemPath: 'name',
    //   itemClassName: 'text-xs text-neutral-800',
    //   containerClassName: 'flex flex-wrap gap-1 mt-3 text-xs',
    //   itemSeparator: ', ',
    // },

    {
      id: 'skills',
      break: true,
      type: 'inline-list-section',
      column: 'left',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 mb-2.5',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-[1.5px] mt-0.5',
        },
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-sm text-black mt-1',
      containerClassName: 'text-sm text-black leading-relaxed pr-2',
      itemSeparator: ', ',
    },

    // Projects Section
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      className: 'flex flex-col',
      break: true,
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'uppercase tracking-wide text-sm font-bold text-black gap-1 mb-2 mt-1',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px]' },
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-3',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-center',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-semibold text-neutral-900',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-neutral-600 italic',
              },
            ],
          },
          // {
          //   path: "title",
          //   fallback: "Project Title",
          //   className: "text-sm font-semibold text-neutral-900",
          // },
          // {
          //   type: "duration",
          //   path: "duration",
          //   className: "text-xs text-neutral-600 italic mb-1",
          // },

          {
            cells: [
              {
                path: 'techStack',
                className: 'text-xs text-neutral-600 italic mt-1',
              },
              {
                type: 'html',
                path: 'description',
                break: true,
                className: 'text-xs text-neutral-800 break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },
    // Interests Section (Badge Style)
    {
      id: 'interests',
      type: 'badge-section',
      column: 'right',
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 mb-2.5',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px]' },
      },
      listPath: 'interests.items[0].items',
      containerClassName: 'flex flex-row flex-wrap gap-2',
      badgeClassName:
        'flex flex-row gap-1 items-center justify-center w-fit px-2 py-0.5 bg-[#f2f2f2] rounded-md text-xs text-black font-normal whitespace-wrap ',
    },

    // Achievements Section (Badge Style)
    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      breakable: true,
      column: 'left',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 mb-2.5',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px]' },
      },
      listPath: 'achievements.items[0].items',
      containerClassName: 'flex flex-row flex-wrap gap-2',
      badgeClassName:
        'flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-[#f2f2f2] rounded-md text-xs text-black font-normal break-words',
    },
    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 mb-2.5',
        divider: { variant: 'line', className: 'bg-black w-full h-[1.5px]' },
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
                className: 'text-sm font-semibold text-neutral-900',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-neutral-600 italic',
              },
            ],
          },

          {
            cells: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-xs text-neutral-700',
              },
            ],
          },
        ],
      },
    },
  ],
};
export default mohsinaTemplate11;
