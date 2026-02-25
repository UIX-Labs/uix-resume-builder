const MohsinaTemplate1 = {
  name: 'Mohsina Template 1',

  page: {
    width: '595px',

    height: '842px',

    background: '#ffffff',

    className: 'text-black leading-relaxed',

    fontFamily: 'Times New Roman',
  },

  sections: [
    // Header Section
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col gap-2 ',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',

          fallback: 'ETHAN smITH',

          className: 'text-2xl font-semibold tracking-tight text-black leading-none text-center',
        },
        contact: {
          type: 'inline-group',
          className: 'flex flex-row flex-wrap justify-center items-center gap-2 text-xs text-black ',
          separator: ' | ',
          items: [
            { path: 'personalDetails.items[0].phone', fallback: 'Phone' },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.linkedin.title',
              href: 'personalDetails.items[0].links.linkedin.link',
              className: 'hover:text-blue-600',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].email',
              href: 'mailto:{{value}}',
              fallback: 'Email',
              className: 'hover:text-blue-600',
            },
            { path: 'personalDetails.items[0].address', fallback: 'City' },
          ],
        },
      },
    },

    // Summary Section
    {
      id: 'summary',
      type: 'content-section',
      className: 'mt-4 block',
      heading: {
        path: 'summary.heading',
        fallback: 'SUMMARY',
        className: 'text-black text-sm font-bold uppercase leading-tight',
      },
      divider: {
        variant: 'line',
        className: 'bg-black w-full h-0.5px ',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Professional summary content goes here...',
        className:
          'block w-full text-black  text-sm font-normal text-justify leading-[1] break-words whitespace-pre-wrap w-full ',
      },
    },
    {
      id: 'education',
      type: 'list-section',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-sm font-semibold text-black uppercase  leading-normal mt-2',

        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px',
        },
      },

      listPath: 'education.items',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                type: 'group',
                className: 'flex flex-col leading-normal',
                items: [
                  {
                    path: 'institution',
                    className: 'text-sm font-bold text-black uppercase',
                  },
                  {
                    type: 'group',
                    className: 'flex flex-row items-baseline gap-2',
                    items: [
                      {
                        path: 'degree',
                        className: 'text-sm font-normal text-black',
                      },
                      {
                        path: 'grade.value',
                        className: 'text-sm font-normal text-black',
                      },
                    ],
                  },
                ],
              },

              // RIGHT: Date only
              {
                type: 'group',
                className: 'flex flex-col items-end text-right leading-normal',
                items: [
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-sm font-normal text-black italic',
                  },
                ],
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
        className: 'text-md font-bold text-black mt-0',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px ',
        },
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-col mt-0',
        rows: [
          {
            className: 'flex-row justify-between items-baseline',
            cells: [
              {
                type: 'inline-group',
                separator: ' | ',
                className: 'text-sm font-semibold text-black uppercase ',
                items: [{ path: 'company' }, { path: 'location' }],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm font-normal  text-black italic',
              },
            ],
          },
          {
            className: 'flex flex-row justify-start ',
            cells: [
              {
                path: 'position',
                className: 'text-sm font-semibold text-black ',
              },
            ],
          },
          {
            className: 'mt-0.5 mb-2',
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'block w-full text-sm text-black font-normal text-justify leading-[1] break-words [&_ul]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_li]:inline',
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
        fallback: 'PROJECTS',
        className: 'text-sm font-bold text-black uppercase leading-normal mt-2',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px ',
        },
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'flex flex-col mt-0',
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline ',
            cells: [
              {
                path: 'title',
                className: 'text-sm font-semibold text-black uppercase ',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm font-normal text-black italic ',
              },
            ],
          },
          {
            className: 'flex flex-row justify-start',
            cells: [
              {
                path: 'techStack',

                className: 'text-sm font-normal italic text-black  leading-tight tracking-wide',
              },
            ],
          },
          {
            className: 'mt-0.5 mb-1',
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'block w-full text-sm text-black font-normal text-justify leading-[1] break-words [&_ul]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_li]:inline',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      breakable: true,
      heading: {
        path: 'achievements.heading',
        fallback: 'ACHIEVEMENTS',
        className: 'text-sm font-semibold text-black uppercase leading-[1] mt-2',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px ',
        },
      },
      listPath: 'achievements.items[0].items',
      itemPrefix: '• ',
      badgeClassName: 'text-sm font-normal text-black text-justify w-[537px] leading-none',
      containerClassName: 'flex flex-col -gap-y-0.8',
    },
    // Skills Section
    {
      id: 'skills',
      type: 'inline-list-section',
      heading: {
        path: 'skills.heading',
        fallback: 'SKILLS',
        className: 'text-sm font-semibold text-black uppercase leading-normal mt-2',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px ',
        },
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'before:content-["•"] before:mr-1 flex items-center text-sm font-normal text-black ',
      itemSeparator: '',
      containerClassName: 'flex flex-row flex-wrap gap-x-2 gap-y-0.5 text-sm text-black',
    },
    // Interests Section
    {
      id: 'interests',
      type: 'badge-section',
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'INTERESTS',
        className: 'text-sm font-semibold text-black uppercase leading-normal mt-2',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px  ',
        },
      },
      listPath: 'interests.items[0].items',
      badgeClassName: 'before:content-["•"] before:mr-2 text-sm font-normal text-black ',
      itemSeparator: '',
      containerClassName: 'flex flex-row flex-wrap gap-x-2 gap-y-1 text-sm text-black mt-0 leading-[1] ',
    },
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'CERTIFICATIONS',
        className: 'text-sm font-semibold text-black uppercase leading-normal mt-2',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px ',
        },
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'flex flex-col mt-2 leading-[1]',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline',
            cells: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-sm font-semibold text-black uppercase',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm font-normal text-black italic text-right',
              },
            ],
          },
          {
            className: 'flex flex-row',
            cells: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-sm font-normal text-black ',
              },
            ],
          },
          {
            className: 'flex flex-row',
            cells: [
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                fallback: '',
                className: 'text-sm font-normal text-black  underline decoration-black/30 hover:decoration-black',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default MohsinaTemplate1;
