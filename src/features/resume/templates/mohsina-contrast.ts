const mohsinaContrast = {
  name: 'contrast',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: 'black',
    className: 'text-white leading-relaxed',
    fontFamily: 'Inter',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '385px',
      className: 'text-white pl-8 pr-4 pb-11 pt-6 flex flex-col bg-black gap-[26px]',
    },
    right: {
      width: 'calc(100% - 385px)',
      className: 'p-8 flex flex-col bg-black pb-12 pl-10 text-white gap-[26px]',
    },
  },

  sections: [
    {
      id: 'header',
      type: 'banner',
      className: 'mb-4 w-full z-10 pt-10 px-8',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-center w-full gap-4',
          items: [
            // Left: Name and Title
            {
              type: 'group',
              className: 'flex flex-col w-120',
              items: [
                {
                  type: 'text',
                  path: 'personalDetails.items[0].fullName',
                  fallback: 'RICK TANG',
                  className: 'text-[34px] font-bold text-white uppercase leading-tight',
                },
                {
                  type: 'text',
                  path: 'personalDetails.items[0].jobTitle',
                  fallback: 'Digital Marketing Specialist',
                  className: 'text-[22px] font-bold text-[#E6753E] uppercase tracking-widest leading-tight',
                },
              ],
            },
            // Right: Image in a specific orange circular box
            {
              type: 'group',
              className:
                'flex w-[98.605px] h-[98.605px] p-[9.328px] items-center justify-center flex-shrink-0 bg-[#E6753E] rounded-full overflow-hidden',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  fallback: '/images/profileimg.jpeg',
                  className: 'w-[80px] h-[80px] object-cover shrink-0 rounded-full',
                  alt: 'Profile image',
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
      column: 'left',
      break: true,
      heading: {
        path: 'professionalSummary.heading',
        fallback: 'Summary',
        className: 'text-base text-[#E6753E] font-bold leading-[21px] mb-2',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback:
          'Digital Marketing Specialist with 6+ years of experience in online marketing, branding, and business strategy across music, media, and entertainment industries.',
        className: 'text-[13px] font-normal text-[#75787B] leading-[21px]',
      },
    },
    {
      id: 'experience',
      type: 'list-section',
      column: 'left',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-base text-[#E6753E] font-bold leading-[21px] mb-2',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-4',
      itemTemplate: {
        className: 'flex flex-col gap-0',
        break: true,
        fields: [
          {
            path: 'position',
            fallback: 'Senior UX Designer',
            className: 'text-[18px] font-normal text-white tracking-widest leading-[20px] block',
          },
          {
            path: 'company',
            fallback: 'ORACLE',
            className: 'text-[18px] font-bold text-white tracking-widest leading-none block mt-1',
          },
          {
            type: 'duration',
            path: 'duration',
            fallback: 'Jan 2022 - Dec 2022',
            className: 'text-xs font-medium text-white tracking-widest leading-none block mt-1 ',
          },
          {
            type: 'html',
            path: 'description',
            break: true,
            className: 'text-[13px] font-normal text-[#75787B] leading-normal mt-2',
          },
        ],
      },
    },
    {
      id: 'projects',
      type: 'list-section',
      column: 'left',
      break: true,
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base text-[#E6753E] font-bold leading-[21px] mb-2',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-5',
      itemTemplate: {
        className: 'flex flex-col gap-0',
        break: true,
        fields: [
          {
            path: 'title',
            fallback: 'Project Title',
            className: 'text-[18px] font-bold text-white tracking-widest leading-none',
          },
          {
            type: 'duration',
            path: 'duration',
            fallback: 'Jan 2022 - Dec 2022',
            className: 'text-xs font-medium text-white tracking-widest leading-none',
          },
          {
            type: 'html',
            path: 'description',
            break: true,
            className: 'text-[13px] font-normal text-[#75787B] leading-normal mt-2',
          },
        ],
      },
    },
    {
      id: 'achievements',
      type: 'inline-list-section',
      column: 'left',
      showBullet: true,
      break: true,
      breakable: true,
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base text-[#E6753E] font-bold leading-[21px] mb-[7px]',
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemClassName: 'text-[13px] font-normal text-[#75787B] leading-[21px]',
    },
    {
      id: 'contact',
      type: 'header',
      column: 'right',
      className: '',
      fields: {
        contact: {
          type: 'group',
          items: [
            {
              type: 'text',
              fallback: 'Contact',
              className: 'block text-base text-[#E6753E] font-bold leading-[21px] mb-2 ',
            },
            {
              type: 'container',
              className: 'mb-1',
              children: [
                {
                  path: 'personalDetails.items[0].address',
                  fallback: 'San Francisco, California',
                  className: 'text-[14px] text-[#75787B] break-words whitespace-normal ',
                },
              ],
            },
            {
              type: 'container',
              className: 'mb-1',
              children: [
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '(315) 802-8179',
                  className: 'text-[14px] text-[#75787B] break-words whitespace-normal ',
                },
              ],
            },
            {
              type: 'container',
              className: 'mb-1',
              children: [
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: 'ricktang@gmail.com',
                  className: 'text-[14px] text-[#75787B] break-words whitespace-normal',
                },
              ],
            },
            {
              type: 'container',
              children: [
                {
                  type: 'inline-group',
                  separator: '/ ',
                  className: 'text-[14px] text-[#75787B] flex flex-wrap gap-y-1',
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
                      fallback: 'Dribbble',
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
      },
    },
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-base text-[#E6753E] font-bold leading-[21px] mb-[8px]',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-2',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,
        fields: [
          {
            path: 'degree',
            fallback: 'Bachelor of Design',
            className: 'text-[18px] font-bold text-white tracking-widest leading-tight',
          },
          {
            className: '',
            type: 'inline-group',
            separator: ' | ',
            items: [
              {
                path: 'grade.value',
                fallback: '9.0 CGPA',
                className: 'text-xs font-bold text-[#E6753E] tracking-widest leading-tight ',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs font-normal text-white tracking-widest leading-tight',
              },
            ],
          },
          {
            path: 'institution',
            fallback: 'National Institute of Design',
            className: 'text-[13px] font-normal text-[#75787B] leading-normal mt-1',
          },
        ],
      },
    },
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certification',
        className: 'text-base text-[#E6753E] font-bold leading-[21px] mb-[8px]',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-[4px]',
      itemTemplate: {
        className: 'flex flex-col gap-0',
        break: true,
        fields: [
          {
            path: 'title',
            fallback: 'Certification Title',
            className: 'text-[18px] font-bold text-white tracking-widest leading-tight',
          },
          {
            type: 'duration',
            path: 'duration',
            className: 'text-xs font-normal text-[#75787B] tracking-widest leading-tight',
          },
        ],
      },
    },
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-base text-[#E6753E] font-bold leading-[21px] mb-2',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      showBullet: true,
      itemClassName: 'text-[13px] font-normal text-[#75787B] leading-[18px]',
    },
    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base text-[#E6753E] font-bold leading-[21px] mb-2',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      itemClassName: 'text-[13px] font-normal text-[#75787B] leading-[18px]',
    },
  ],
};

export default mohsinaContrast;
