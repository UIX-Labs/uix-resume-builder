const mohsinaSimple = {
  name: 'Mohsina Simple',

  page: {
    width: 794,
    height: 1122,
    background: '#ffffff',
    safeBottomPaddingPx: 100,
    className:
      "leading-relaxed break-words whitespace-pre-wrap !p-0 relative before:absolute before:inset-y-0 before:right-0 before:w-[375.765px] before:bg-[rgba(222,29,62,0.02)] before:[clip-path:polygon(0_0,100%_0,100%_100%,25%_100%)] before:content-[''] before:-z-10 after:absolute after:top-0 after:left-0 after:w-[418.805px] after:h-[101.27px] after:bg-[rgba(51,51,51,0.04)] after:[clip-path:polygon(0_0,100%_0,100%_25%,0_100%)] after:content-[''] after:-z-10 z-0",
    fontFamily: 'Poppins',
  },

  columns: {
    spacing: '0px',
    left: {
      width: 'calc(100% - 375.765px)',
      className:
        "flex flex-col gap-2 pl-8 pt-10 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[101.27px] before:bg-[rgba(51,51,51,0.04)] before:[clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)] before:content-[''] before:-z-10",
    },
    right: {
      width: '375.765px',
      className: 'flex flex-col items-end pr-8 justify-start gap-[12px] pt-10 [&>div]:w-[240px] [&>div]:shrink-0 ',
    },
  },

  sections: [
    // --- HEADER LEFT (Photo, Name, Summary) ---
    // --- HEADER LEFT (Photo, Name, Summary) ---
    {
      id: 'header',
      type: 'header',
      column: 'left',
      className: 'flex flex-col pt-8  pr-4 mb-',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-col',
          items: [
            {
              type: 'text',
              path: 'personalDetails.items[0].fullName',
              fallback: 'John Doe',
              className:
                "text-[24px] font-semibold text-[#333] leading-[25px] tracking-[-1.5px] pt-2 mb-[12px] relative before:absolute before:top-0 before:left-0 before:bg-[#DE1D3E] before:w-[89.944px] before:h-[2.249px] before:content-['']",
            },
            {
              id: 'summary',
              type: 'html',
              path: 'personalDetails.items[0].description',
              fallback:
                'Strategic thinker with hands-on skills. Passionate about fostering engineering excellence, building inclusive teams, and aligning technology with business goals.',
              className: 'text-[12px] text-[#616161] leading-[18px]',
            },
          ],
        },
      },
    },
    // --- CONTACT INFO LEFT ---
    {
      id: 'contact',
      type: 'header',
      column: 'left',
      className: 'flex flex-col  pr-4  mt-[12px]',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-col',
          items: [
            // Connect Heading
            {
              type: 'group',
              className: 'mb-[10px]',
              items: [
                {
                  type: 'text',
                  fallback: 'Connect',
                  className:
                    'text-[16px] font-semibold text-[#333] leading-none mb-1 block relative after:absolute after:bottom-[-5px] after:left-0 after:bg-[#DE1D3E] after:w-[40%] after:h-[0.5px]',
                },
              ],
            },
            // The items
            {
              type: 'group',
              className: 'flex flex-col gap-2 w-full',
              items: [
                // EMAIL
                {
                  type: 'group',
                  className: 'flex flex-col',
                  condition: 'personalDetails.items[0].email',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Email',
                      className: 'text-[12px] font-medium text-black leading-tight mb-1',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: '@gmail.com',
                      className: 'text-[10px] text-gray-500 leading-tight break-all',
                    },
                  ],
                },
                // LINKS
                {
                  type: 'group',
                  className: 'flex flex-col',
                  condition: 'personalDetails.items[0].links',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Links',
                      className: 'text-[12px] font-medium text-black leading-tight mb-1',
                    },
                    {
                      type: 'inline-group',
                      className: 'flex flex-wrap text-[10px] text-gray-500 leading-tight items-center gap-y-1',
                      separator: ' | ',
                      separatorClassName: 'text-[#DE1D3E] mx-1',
                      items: [
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.github.title',
                          href: 'personalDetails.items[0].links.github.link',
                          condition: 'personalDetails.items[0].links.github.title',
                          fallback: 'Github',
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
                          path: 'personalDetails.items[0].links.website.title',
                          href: 'personalDetails.items[0].links.website.link',
                          condition: 'personalDetails.items[0].links.website.title',
                          fallback: 'Portfolio',
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
                          path: 'personalDetails.items[0].links.dribble.title',
                          href: 'personalDetails.items[0].links.dribble.link',
                          condition: 'personalDetails.items[0].links.dribble.link',
                          fallback: 'Dribble',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.youtube.title',
                          href: 'personalDetails.items[0].links.youtube.link',
                          condition: 'personalDetails.items[0].links.youtube.title',
                          fallback: 'Youtube',
                        },
                      ],
                    },
                  ],
                },
                // CONTACT
                {
                  type: 'group',
                  className: 'flex flex-col',
                  condition: 'personalDetails.items[0].phone',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Contact',
                      className: 'text-[12px] font-medium text-black leading-tight mb-1',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '+6017 633 3259',
                      className: 'text-[10px] text-gray-500 leading-tight',
                    },
                  ],
                },
                // LOCATION
                {
                  type: 'group',
                  className: 'flex flex-col',
                  condition: 'personalDetails.items[0].address',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Location',
                      className: 'text-[12px] font-medium text-black leading-tight mb-1',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].address',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[10px] text-gray-500 leading-tight',
                    },
                  ],
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
      className: 'pl-6 pr-4 pt-5 mt-[12px]',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className:
          'text-[16px] font-semibold text-[#333] leading-none mb-4 block relative after:absolute after:bottom-[-5px] after:left-0 after:bg-[#DE1D3E] after:w-[40%] after:h-[0.5px]',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-[12px] mt-[12px]',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          // Row 1: Position and Duration
          {
            className: 'flex flex-row justify-between items-start gap-4',
            cells: [
              {
                path: 'position',
                className: 'text-[14px] font-medium text-[#333] leading-[20px] w-[200px] break-words',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#989697] font-medium leading-[21px] shrink-0',
              },
            ],
          },
          // Row 2: Company Name
          {
            className: 'flex flex-row items-center  w-[200px] -mt-1',
            cells: [
              {
                path: 'company',
                className: 'text-[12px] font-semibold text-[#DE1D3E] leading-[20px] break-words',
              },
            ],
          },
          // Row 3: Description
          {
            className: 'mt-[8px]',
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className:
                  'text-[12px] text-[#333] leading-[18px] whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // --- BODY RIGHT ---
    // User Photo (Right Column Top)
    {
      id: 'photo',
      type: 'header',
      column: 'right',
      className: 'flex justify-center items-center w-full',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-col items-center justify-center',
          items: [
            {
              type: 'image',
              path: 'personalDetails.items[0].profilePicturePublicUrl',
              className: 'w-[207.87px] h-[207.87px] object-cover shrink-0 relative z-10',
              alt: 'Profile image',
              fallback: 'Profile image',
              condition: 'personalDetails.items[0].profilePicturePublicUrl',
            },
          ],
        },
      },
    },

    // --- BODY RIGHT (Education, Skills) ---
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mt-[10px]',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className:
          'text-[16px] font-semibold text-[#333] leading-none mb-3 block relative after:absolute after:bottom-[-5px] after:left-0 after:bg-[#DE1D3E] after:w-[40%] after:h-[0.5px]',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-[12px] mt-[12px]',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          // Row 1: Degree and Duration
          {
            className: 'flex flex-row justify-between items-start gap-4',
            cells: [
              {
                path: 'degree',
                className: 'text-[14px] font-medium text-[#333] leading-tight break-words shrink',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#989697] font-medium leading-tight shrink-0 text-right',
              },
            ],
          },
          // Row 2: Institute
          {
            className: 'flex flex-row items-center mt-0',
            cells: [
              {
                path: 'institution',
                className: 'text-[12px] font-semibold text-[#989697] leading-tight',
              },
            ],
          },
          // Row 3: CGPA
          {
            className: 'flex flex-row items-center mt-0',
            cells: [
              {
                path: 'grade.value',
                prefix: 'CGPA: ',
                className: 'text-[12px] font-semibold text-[#DE1D3E] leading-tight',
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
      column: 'left',
      break: true,
      className: 'pl-6 pr-4 pt-5 mt-[12px]',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className:
          'text-[16px] font-semibold text-[#333] leading-none mb-4 block relative after:absolute after:bottom-[-5px] after:left-0 after:bg-[#DE1D3E] after:w-[40%] after:h-[1px]',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-[12px] mt-[12px]',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          // Row 1: Title and Duration
          {
            className: 'flex flex-row justify-between items-start gap-4',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-[14px] font-medium text-[#333] leading-tight',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#989697] font-medium leading-tight shrink-0',
              },
            ],
          },

          // Row 3: Description
          {
            className: 'mt-[8px]',
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className:
                  'text-[12px] text-[#333] leading-[18px] whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // Skills Section - Right Column
    {
      id: 'skills',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mt-[10px]',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className:
          'text-[16px] font-semibold text-[#333] leading-none mb-3 block relative after:absolute after:bottom-[-5px] after:left-0 after:bg-[#DE1D3E] after:w-[40%] after:h-[0.5px]',
      },
      listPath: 'skills.items',
      containerClassName: 'flex flex-col mt-[12px]',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            cells: [
              {
                path: 'name',
                className: 'text-[12px] text-[#333] font-normal leading-[18px]',
              },
            ],
          },
        ],
      },
    },

    // Interests Section - Right Column
    {
      id: 'interests',
      break: true,
      breakable: true,
      type: 'inline-list-section',
      column: 'right',
      className: 'mt-[10px]',
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className:
          'text-[16px] font-semibold text-[#333] leading-none mb-3 block relative after:absolute after:bottom-[-5px] after:left-0 after:bg-[#DE1D3E] after:w-[40%] after:h-[0.5px]',
      },
      listPath: 'interests.items[0].items',
      itemClassName: 'text-[12px] text-gray-500 leading-[20px] inline',
      containerClassName:
        'block mt-[12px] [&>span]:inline [&>span>span:nth-child(2)]:text-[#DE1D3E] [&>span>span:nth-child(2)]:mx-1',
      itemSeparator: '|',
    },

    // Certifications Section - Right Column
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mt-[10px]',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className:
          'text-[16px] font-semibold text-[#333] leading-none mb-3 block relative after:absolute after:bottom-[-5px] after:left-0 after:bg-[#DE1D3E] after:w-[50%] after:h-[0.5px]',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-[12px] mt-[12px]',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start gap-4',
            cells: [
              {
                path: 'title',
                className: 'text-[14px] font-medium text-[#333] leading-tight break-words shrink',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#989697] font-medium leading-tight shrink-0 text-right',
              },
            ],
          },
          {
            className: 'flex flex-row items-center mt-[4px]',
            cells: [
              {
                path: 'issuer',
                className: 'text-[12px] text-[#de1d3e] font-medium leading-tight',
              },
            ],
          },
        ],
      },
    },

    // Achievements Section - Left Column
    {
      id: 'achievements',
      break: true,
      breakable: true,
      type: 'inline-list-section',
      column: 'left',
      showBullet: true,
      className: 'pl-6 pr-4 pt-5 mt-[12px]',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className:
          'text-[16px] font-semibold text-[#333] leading-none mb-4 block relative after:absolute after:bottom-[-5px] after:left-0 after:bg-[#DE1D3E] after:w-[40%] after:h-[1px]',
      },
      listPath: 'achievements.items[0].items',
      itemClassName: 'text-[12px] text-[#333] leading-[18px]',
      containerClassName: 'flex flex-col gap-1 mt-[12px] text-[12px] text-[#333] leading-[18px]',
    },
  ],
};

export default mohsinaSimple;
