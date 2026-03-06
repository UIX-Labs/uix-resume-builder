const mohsinaTemplate4 = {
  name: 'Dark Two Column Professional',

  page: {
    background: 'white',
    className: 'text-black leading-relaxed',
    fontFamily: 'Montserrat, Poppins',
  },

  sections: [
    // Header Section
    {
      id: 'header',
      type: 'banner',
      break: false,
      className: 'flex flex-col bg-[#F9F9F9] -mx-6 px-6 -my-6 py-6 mb-6',

      fields: {
        container: {
          type: 'group',
          className: 'flex items-start justify-between gap-10 w-full',

          items: [
            {
              type: 'group',
              className: 'flex flex-col gap-2 flex-1 min-w-0',

              items: [
                {
                  type: 'text',
                  path: 'personalDetails.items[0].fullName',
                  fallback: 'Aman Gupta',
                  className: 'text-3xl font-bold text-black leading-[1] font-montserrat',
                },
                {
                  type: 'text',
                  path: 'personalDetails.items[0].jobTitle',
                  fallback: 'Product Designer',
                  className: 'text-xl font-medium text-[#005FF2] leading-[1] font-montserrat',
                },
                {
                  type: 'html',
                  path: 'personalDetails.items[0].description',
                  fallback: 'Over 5 years...',
                  className: 'text-xs leading-[20px] text-black mt-1 font-poppins',
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col gap-[2px] w-[148px] flex-shrink-0',
              items: [
                {
                  type: 'group',
                  className: 'flex flex-col ',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Location',
                      className: 'text-[10px] font-medium text-[#8B8B8B] leading-[16px] font-montserrat',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].address',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[10px] font-semibold text-black leading-[16px] font-poppins break-words',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex flex-col gap-0',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Email',
                      className: 'text-[10px] font-medium text-[#8B8B8B] leading-[16px] font-montserrat',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'yourmail@gmail.com',
                      className: 'text-[10px] font-semibold text-black leading-[16px] font-poppins break-words',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex flex-col',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Connect',
                      className: 'text-[10px] font-medium text-[#8B8B8B] leading-[16px] font-montserrat',
                    },
                    {
                      type: 'inline-group',
                      className:
                        'flex flex-wrap text-[10px] font-semibold text-black leading-[16px] font-poppins underline decoration-1 underline-offset-2 break-words',
                      separator: '/',
                      items: [
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.website.title',
                          href: 'personalDetails.items[0].links.website.link',
                          condition: 'personalDetails.items[0].links.website.link',
                          fallback: 'Portfolio',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.linkedin.title',
                          href: 'personalDetails.items[0].links.linkedin.link',
                          condition: 'personalDetails.items[0].links.linkedin.link',
                          fallback: 'LinkedIn',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.github.title',
                          href: 'personalDetails.items[0].links.github.link',
                          condition: 'personalDetails.items[0].links.github.link',
                          fallback: 'GitHub',
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

                {
                  type: 'group',
                  className: 'flex flex-col ',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Phone',
                      className: 'text-[10px] font-medium text-[#8B8B8B] leading-[16px] font-montserrat',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '9999444555',
                      className: 'text-[10px] font-semibold text-black leading-[16px] font-poppins',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    // Work Experience
    {
      id: 'experience',
      type: 'list-section',
      break: true,

      className: 'mt-6 w-full gap-0 flex flex-col',

      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-base font-normal leading-[16px] font-montserrat text-[#005FF2] mb-0 -mt-2',
      },

      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-0',

      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,

        rows: [
          {
            cells: [
              {
                type: 'inline-group',
                className: 'flex justify-between w-full items-start',
                items: [
                  {
                    type: 'inline-group',
                    className: 'flex items-baseline mt-0 ',
                    separator: ', ',
                    items: [
                      {
                        path: 'position',
                        fallback: 'Software Engineer',
                        className: 'text-base font-semibold leading-[13px] text-black font-poppins -mt-2',
                      },
                      {
                        path: 'company',
                        fallback: 'Oracle',
                        className: 'text-base pl-1  font-semibold font-poppins text-black ',
                      },
                    ],
                  },
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-xs font-medium leading-[14px] text-gray-500 font-montserrat text-right',
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
                break: true,
                className:
                  'text-xs mb-2 font-normal leading-[20px] text-black font-poppins whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
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

      break: true,
      className: 'mt-0',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-base font-normal leading-[16px] text-[#005FF2] font-montserrat mt-0 ',
      },

      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-0',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            cells: [
              {
                type: 'group',
                className: 'flex flex-col',

                items: [
                  {
                    type: 'inline-group',
                    className: 'flex justify-between w-full items-baseline',
                    items: [
                      {
                        type: 'inline-group',
                        separator: ', ',
                        className: 'flex items-baseline mt-2 ',
                        items: [
                          {
                            path: 'degree',
                            fallback: 'Masters of Design',
                            className: 'text-base leading-[14px] font-semibold text-black font-poppins ',
                          },
                          {
                            path: 'cgpa',
                            fallback: '8.0 CGPA',
                            className: 'text-base leading-[14px] font-semibold text-[#005FF2] font-poppins ml-1',
                          },
                        ],
                      },
                      {
                        type: 'duration',
                        path: 'duration',
                        className: 'text-xs font-medium leading-[16px] text-gray-500 font-montserrat',
                      },
                    ],
                  },
                  {
                    path: 'institution',
                    className: 'text-xs  leading-[18px] font-normal text-gray-500 font-poppins',
                  },
                ],
              },
            ],
          },
        ],
      },
    },

    // Projects Section - Left Column
    {
      id: 'projects',
      type: 'list-section',

      break: true,
      className: 'mt-0',

      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-medium leading-[13px] text-[#005FF2] font-montserrat mt-3',
      },

      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-0',

      itemTemplate: {
        className: 'flex flex-col gap-0',
        break: true,

        rows: [
          {
            cells: [
              {
                type: 'inline-group',
                className: 'flex justify-between w-full items-start mt-2',
                items: [
                  {
                    path: 'title',
                    fallback: 'Project Title',
                    className: 'text-base font-semibold leading-[16px] text-black font-poppins',
                  },
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-xs font-medium leading-[16px] text-gray-500 font-montserrat',
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
                break: true,
                className:
                  'text-xs font-normal leading-[20px] text-black font-poppins whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'achievements',
      type: 'inline-list-section',

      showBullet: true,
      break: true,
      breakable: true,

      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base font-medium leading-[13px] text-[#005FF2] font-montserrat mb-2 mt-4',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',

      containerClassName: 'flex flex-col w-full ',

      itemClassName: 'text-xs font-normal leading-[20px] text-black font-poppins break-words',
    },
    // Skills Section
    {
      id: 'skills',
      type: 'inline-list-section',
      break: true,
      heading: {
        path: 'skills.heading',
        fallback: 'Skills & Tools',
        className: 'text-base font-medium leading-[13px] text-[#005FF2] font-montserrat mb-2 mt-4',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      containerClassName: 'flex flex-wrap gap-x-3 gap-y-0 mt-2',
      itemClassName:
        'inline-flex items-center pt-[2.6px] pr-[10px] text-xs font-semibold leading-[18px] text-black font-poppins',
      itemSeparator: ' • ',
    },
    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      className: 'mt-8',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-medium leading-[13px] text-[#005FF2] font-montserrat mb-1 mt-4',
      },

      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-0',

      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,

        rows: [
          {
            cells: [
              {
                type: 'inline-group',
                className: 'flex justify-between w-full items-start -mb-2',
                items: [
                  {
                    path: 'title',
                    fallback: 'Certificate 1',
                    className: 'text-base font-semibold  text-black font-poppins',
                  },
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-xs font-medium leading-[16px] text-[#797979] font-montserrat',
                  },
                ],
              },
            ],
          },

          {
            cells: [
              {
                path: 'issuer',
                fallback: 'Company name',
                className:
                  'inline-flex -mt-4 items-baseline gap-2 text-xs font-normal text-black font-poppins before:content-["•"] before:text-black ',
              },
            ],
          },
        ],
      },
    },

    // Interests Section - Right Column
    {
      id: 'interests',
      type: 'inline-list-section',

      break: true,
      breakable: true,
      className: 'mt-8',

      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base font-medium leading-[13px] text-[#005FF2] font-montserrat mb-0 mt-4',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',

      containerClassName: 'flex flex-wrap gap-x-3 mt-1',

      itemClassName:
        'inline-flex items-center  pr-[10px]  text-xs font-semibold leading-[18px] text-black font-poppins',

      itemSeparator: ' • ',
    },
  ],
};

export default mohsinaTemplate4;
