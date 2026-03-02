const mohsinaTemplate4 = {
  name: 'Dark Two Column Professional',

  page: {
    background: 'white',
    className: 'text-black leading-relaxed',
    fontFamily: 'Montserrat',
  },

  sections: [
    // Header Section - Name and Title on one line
    {
      id: 'header',
      type: 'banner',
      break: false,
      className: 'flex flex-col bg-[#F9F9F9] -mx-6 px-6 -my-6 py-6 mb-6',

      fields: {
        container: {
          type: 'group',
          className: 'flex justify-between items-start',

          items: [
            // LEFT SIDE (Name + Title + Description)
            {
              type: 'group',
              className: 'flex flex-col gap-2 max-w-[70%]',

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
                  className: 'text-sm leading-[20px] text-black mt-1 font-poppins',
                },
              ],
            },

            // RIGHT SIDE (Contacts)
            {
              type: 'group',
              className: 'flex flex-col gap-1 w-[115px] mt-6 mr-2',

              items: [
                {
                  path: 'personalDetails.items[0].address',
                  className:
                    'flex flex-col w-full text-sm font-semibold text-black before:content-["Location"] before:text-[10px] before:font-normal before:text-gray-400 before:mb-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  className:
                    'block w-full flex flex-col text-sm font-semibold text-black before:content-["Email"] before:text-[10px] before:font-normal before:text-gray-400 before:mb-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  className:
                    'block w-full flex flex-col text-sm font-semibold text-black before:content-["Connect"] before:text-[10px] before:font-normal before:text-gray-400 before:mb-0',
                },
                {
                  path: 'personalDetails.items[0].phone',
                  className:
                    'flex flex-col w-full text-sm font-semibold text-black before:content-["Phone"] before:text-[10px] before:font-normal before:text-gray-400 before:mb-0',
                },
              ],
            },
          ],
        },
      },
    },
    // Work Experience Section - Left Column
    {
      id: 'experience',
      type: 'list-section',
      break: true,

      className: 'mt-6 w-full gap-0 flex flex-col',

      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-base font-normal leading-[16px] text-[#005FF2] mb-0 -mt-2',
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
                    className: 'flex items-baseline mt-1 ',
                    separator: ', ',
                    items: [
                      {
                        path: 'position',
                        fallback: 'Software Engineer',
                        className: 'text-base font-bold leading-[13px] text-black  -mt-2',
                      },
                      {
                        path: 'company',
                        fallback: 'Oracle',
                        className: 'text-[14px] pl-1  font-bold text-black ',
                      },
                    ],
                  },
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-sm font-normal leading-[14px] text-[#797979] font-poppins text-right',
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
                  'text-sm mt-0 font-medium leading-tight text-black font-montserrat whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },
    // Education Section - Left Column
    {
      id: 'education',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-0',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-base font-normal leading-[16px] text-[#005FF2] font-montserrat mt-4',
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
                        className: 'flex items-baseline ',
                        items: [
                          {
                            path: 'degree',
                            fallback: 'Masters of Design',
                            className: 'text-base leading-[14px] font-bold text-black font-montserrat ',
                          },
                          {
                            path: 'cgpa',
                            fallback: '8.0 CGPA',
                            className: 'text-base leading-[14px] font-bold text-[#005FF2] font-montserrat ml-1',
                          },
                        ],
                      },
                      {
                        type: 'duration',
                        path: 'duration',
                        className: 'text-sm leading-[14px] font-medium text-[#797979] font-montserrat',
                      },
                    ],
                  },
                  {
                    path: 'institution',
                    className: 'text-sm  leading-14px font-normal text-black font-poppins',
                  },
                ],
              },
            ],
          },
        ],
      },
    },

    // Work Experience Section - Left Column

    // Projects Section - Left Column
    {
      id: 'projects',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-0',

      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-medium leading-[13px] text-[#005FF2] font-montserrat mt-4',
      },

      listPath: 'projects.items',
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
                    path: 'title',
                    fallback: 'Project Title',
                    className: 'text-base font-bold leading-[16px] text-black font-poppins',
                  },
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-sm font-medium leading-[16px] text-[#797979] font-montserrat',
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
                  'text-sm font-normal leading-tight text-black font-poppins whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'achievements',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      break: true,
      breakable: true,

      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-md font-medium leading-[13px] text-[#005FF2] font-montserrat mb-2 mt-4',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',

      containerClassName: 'flex flex-col gap-1.5 w-full leading-[16px]',

      itemClassName: 'text-sm font-normal leading-[16px] text-black font-poppins break-words',
    },
    // Skills Section - Right Column
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      breakable: true,

      heading: {
        path: 'skills.heading',
        fallback: 'Skills & Tools',
        className: 'text-base font-medium leading-[13px] text-[#005FF2] font-montserrat mb-2 mt-4',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      showBullet: false,
      itemSeparator: '',

      containerClassName: 'flex flex-wrap gap-x-4 gap-y-1 leading-none',
      itemClassName:
        'inline-flex items-baseline gap-1 text-sm leading-10px font-semibold text-black font-poppins before:content-["•"] before:text-black before:text-[9px]',
    },
    // Certifications Section - Left Column
    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-0',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-medium leading-[13px] text-[#005FF2] font-montserrat mb-0 mt-4',
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
                    className: 'text-base font-bold  text-black font-poppins',
                  },
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-sm font-medium leading-[16px] text-[#797979] font-montserrat',
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
                  'inline-flex -mt-4 items-baseline gap-2 text-sm font-normal text-black font-poppins before:content-["•"] before:text-black ',
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
      column: 'left',
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

      showBullet: false,
      itemSeparator: '',

      containerClassName: 'flex flex-wrap gap-x-4 gap-y-2',

      itemClassName:
        'inline-flex items-baseline gap-2 text-sm font-semibold leading-[14px] text-black font-poppins before:content-["•"] before:text-black',
    },
  ],
};

export default mohsinaTemplate4;
