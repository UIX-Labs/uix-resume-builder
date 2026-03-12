const MohsinaTemplate1 = {
  name: 'Mohsina Template 1',

  page: {
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

          className: 'text-3xl font-semibold tracking-tight text-black leading-none text-center',
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
      className: 'mt-[14px] block',
      heading: {
        path: 'summary.heading',
        fallback: 'SUMMARY',
        className: 'text-black text-[16px] font-bold uppercase leading-tight ',
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
          'block w-full text-black mt-2 text-[16px] font-normal text-justify leading-[1] break-words whitespace-pre-wrap w-full ',
      },
    },
    {
      id: 'education',
      type: 'list-section',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-[16px] font-semibold text-black uppercase  leading-normal mt-2',

        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px',
        },
      },

      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-[11px] mt-2',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row justify-between items-start gap-4',
            cells: [
              {
                type: 'group',
                className: 'flex flex-col leading-normal w-[550px] break-words gap-1',
                items: [
                  {
                    path: 'institution',
                    className: 'text-[16px] font-bold text-black uppercase leading-tight',
                  },
                  {
                    type: 'group',
                    className: 'flex flex-row flex-wrap items-baseline gap-2 mt-0.5',
                    items: [
                      {
                        path: 'degree',
                        className: 'text-[16px] font-normal text-black leading-tight',
                      },
                      {
                        path: 'grade.value',
                        className: 'text-[16px] font-normal text-black leading-tight',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[16px] font-normal text-black italic text-right w-[150px] shrink-0',
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
      className: 'mt-[14px] ',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-md font-bold text-black uppercase',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px mb-2 ',
        },
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-[11px]   ',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row justify-between items-start gap-4',
            cells: [
              {
                path: 'company',
                className: 'text-[16px] font-semibold text-black uppercase w-[550px] break-words leading-tight',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[16px] font-normal text-black italic text-right w-[150px] shrink-0',
              },
            ],
          },
          {
            className: 'flex flex-row justify-start -mt-1',
            cells: [
              {
                path: 'position',
                className: 'text-[16px] font-semibold text-black w-[550px] break-words leading-tight',
              },
            ],
          },
          {
            className: 'mt-1',
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'block w-full text-[16px] text-black font-normal text-justify leading-tight break-words [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4',
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
      className: 'mt-[14px]',
      heading: {
        path: 'projects.heading',
        fallback: 'PROJECTS',
        className: 'text-[16px] font-bold text-black uppercase leading-normal',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px ',
        },
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-[11px] ',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row justify-between items-start gap-4 mt-2',
            cells: [
              {
                path: 'title',
                className: 'text-[16px] font-semibold text-black uppercase w-[550px] break-words leading-tight',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[16px] font-normal text-black italic text-right w-[150px] shrink-0',
              },
            ],
          },
          {
            className: 'flex flex-row justify-start mt-0.5',
            cells: [
              {
                path: 'techStack',
                className:
                  'text-[16px] font-normal italic text-black leading-tight tracking-wide w-[550px] break-words',
              },
            ],
          },
          {
            className: 'mt-1',
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'block w-full text-[16px] text-black font-normal text-justify leading-tight break-words [&_ul]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_li]:inline',
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
      className: 'mt-[14px]',
      heading: {
        path: 'achievements.heading',
        fallback: 'ACHIEVEMENTS',
        className: 'text-[16px] font-semibold text-black mt-2 uppercase leading-tight',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-[1px]',
        },
      },
      listPath: 'achievements.items[0].items',
      itemPrefix: '• ',
      badgeClassName:
        'text-[16px] font-normal text-black leading-tight text-justify block w-[550px] break-words mb-[11px] last:mb-0',
      containerClassName: 'flex flex-col mt-2',
    },
    // Skills Section
    {
      id: 'skills',
      type: 'inline-list-section',
      className: 'mt-[14px]',
      heading: {
        path: 'skills.heading',
        fallback: 'SKILLS',
        className: 'text-[16px] font-semibold text-black uppercase leading-normal mt-2',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px ',
        },
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'before:content-["•"] before:mr-1 flex items-center text-sm font-normal text-black',
      itemSeparator: '',
      containerClassName: 'flex flex-row flex-wrap gap-x-2 gap-y-1 text-[16px] text-black mt-2',
    },
    // Interests Section
    {
      id: 'interests',
      type: 'badge-section',
      break: true,
      breakable: true,
      className: 'mt-[14px]',
      heading: {
        path: 'interests.heading',
        fallback: 'INTERESTS',
        className: 'text-[16px] font-semibold text-black uppercase leading-normal',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px  ',
        },
      },
      listPath: 'interests.items[0].items',
      badgeClassName: 'before:content-["•"] before:mr-2 text-sm font-normal text-black ',
      itemSeparator: '',
      containerClassName: 'flex flex-row flex-wrap gap-x-2 gap-y-1 text-[16px] text-black mt-0 leading-[1] ',
    },
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      className: 'mt-[14px]',
      heading: {
        path: 'certifications.heading',
        fallback: 'CERTIFICATIONS',
        className: 'text-[16px] font-semibold text-black uppercase leading-normal',
        divider: {
          variant: 'line',
          className: 'bg-black w-full h-0.5px mb-2 ',
        },
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'flex flex-col mt-2 leading-[1]',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start gap-4  ',
            cells: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-[16px] font-semibold text-black uppercase w-[550px] break-words leading-tight',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[16px] font-normal text-black italic text-right w-[150px] shrink-0',
              },
            ],
          },
          {
            className: 'flex flex-row',
            cells: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-[16px] font-normal text-black ',
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
                className: 'text-[16px] font-normal text-black  underline decoration-black/30 hover:decoration-black',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default MohsinaTemplate1;
