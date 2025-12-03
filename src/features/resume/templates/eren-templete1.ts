// Enji Kusnadi style template adapted to the app resume structure

const enjiTemplate = {
  name: 'Enji Kusnadi',

  page: {
    // The actual resume page in the app is already inside a gradient shell,
    // so keep the sheet itself clean and white.
    background: '#ffffff',
    className: 'text-[11px] text-slate-900 leading-relaxed',
    fontFamily: 'Inter',
    padding: 0,
  },

  sections: [
    /**
     * HEADER
     * Centered name + role with compact contact line
     * Uses the gradient blob SVG as background
     */
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col items-center text-center gap-1 pb-6 pt-8 bg-no-repeat bg-cover bg-center',
      style: {
        background: 'linear-gradient(to right, #E9D5FF, #DBEAFE, #F0F9FF)',
      },
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Enji Kusnadi',
          className: 'text-[28px] font-extrabold tracking-wide text-slate-900',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Front-End Developer · UI/UX Designer',
          className: 'text-[10px] font-medium text-slate-600 leading-none tracking-normal',
        },
        contact: {
          type: 'inline-group',
          className: 'flex items-center gap-2 mt-2',
          separator: '',
          items: [
            // Top line: Location and Email
            {
              type: 'inline-group',
              className: 'flex items-center gap-3 text-[9px] text-black',
              separator: '',
              items: [
                {
                  type: 'container',
                  className: 'inline-flex items-center gap-1',
                  children: [
                    {
                      type: 'icon',
                      name: 'MapPin',
                      size: 8,
                      className: 'text-black',
                    },
                    {
                      type: 'text',
                      pathWithFallback: {
                        path: 'personalDetails.items[0].address',
                        fallback: 'Bandung',
                      },
                      className: 'text-[9px] text-black',
                    },
                  ],
                },
                {
                  type: 'container',
                  className: 'inline-flex items-center gap-1',
                  children: [
                    {
                      type: 'icon',
                      name: 'Mail',
                      size: 8,
                      className: 'text-black',
                    },
                    {
                      type: 'link',
                      pathWithFallback: {
                        path: 'personalDetails.items[0].email',
                        fallback: 'mail@enji.dev',
                      },
                      hrefPathWithFallback: {
                        path: 'personalDetails.items[0].email',
                        fallback: 'mailto:mail@enji.dev',
                      },
                      className: 'text-[9px] text-black',
                    },
                  ],
                },
              ],
            },
            // Badge row: LinkedIn and GitHub
            {
              type: 'inline-group',
              className: 'flex flex-wrap items-center justify-center gap-2',
              separator: '',
              items: [
                {
                  type: 'badge',
                  pathWithFallback: {
                    path: 'personalDetails.items[0].links.linkedin.title',
                    fallback: '/enjidev',
                  },
                  hrefPathWithFallback: {
                    path: 'personalDetails.items[0].links.linkedin.link',
                    fallback: 'https://linkedin.com/in/enjidev',
                  },
                  icon: {
                    type: 'icon',
                    name: 'Linkedin',
                    size: 8,
                    className: 'text-blue-900',
                  },
                  badgeClassName: 'bg-[#F1F8FF] text-blue-900 border border-[#0A66C2]',
                },
                {
                  type: 'badge',
                  pathWithFallback: {
                    path: 'personalDetails.items[0].links.github.title',
                    fallback: '/enjidev',
                  },
                  hrefPathWithFallback: {
                    path: 'personalDetails.items[0].links.github.link',
                    fallback: 'https://github.com/enjidev',
                  },
                  icon: {
                    type: 'icon',
                    name: 'Github',
                    size: 8,
                    className: 'text-gray-900',
                  },
                  badgeClassName: 'bg-[#F2F2F2] text-gray-900 border border-[#222222]',
                },
              ],
            },
          ],
        },
      },
    },

    /**
     * EDUCATION
     */
    {
      id: 'education',
      type: 'list-section',
      break: true,
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-[10px] font-semibold tracking-wide text-slate-500 uppercase w-32',
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'space-y-0.5',
        rows: [
          {
            className: 'flex items-baseline justify-between gap-4',
            cells: [
              {
                type: 'inline-group',
                separator: ' — ',
                items: [
                  {
                    path: 'institution',
                    fallback: 'STMIK Indonesia Mandiri',
                    className: 'font-semibold text-slate-900',
                  },
                  {
                    path: 'fieldOfStudy',
                    fallback: 'Teknik Informatika (S1)',
                    className: 'text-slate-700',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                fallback: 'Oct 2018 - Present',
                className: 'text-[9px] text-slate-500 whitespace-nowrap ml-4',
              },
            ],
          },
        ],
      },
      className: 'flex justify-between items-start gap-8 pb-4 border-b border-slate-200 px-16 pt-8',
      containerClassName: 'space-y-3',
    },

    /**
     * EXPERIENCE
     */
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-[10px] font-semibold tracking-wide text-slate-500 uppercase w-32',
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'space-y-1.5',
        rows: [
          {
            className: 'flex items-baseline justify-between gap-4',
            cells: [
              {
                type: 'inline-group',
                separator: ' — ',
                items: [
                  {
                    path: 'company',
                    className: 'font-semibold text-slate-900',
                  },
                  { path: 'position', className: 'text-slate-700' },
                ],
                className: 'flex items-center gap-1',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-slate-500 whitespace-nowrap ml-4',
              },
            ],
          },
          {
            className: 'text-[9px] text-slate-500',
            cells: [
              {
                path: 'techStack',
                fallback: '',
                className: 'italic',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className: 'text-[9px] text-slate-700 leading-relaxed',
              },
            ],
          },
        ],
      },
      className: 'flex justify-between items-start gap-8 pt-6 pb-4 border-b border-slate-200 px-16',
      containerClassName: 'space-y-3',
    },

    /**
     * PROJECTS
     */
    {
      id: 'projects',
      type: 'list-section',
      break: true,
      heading: {
        path: 'projects.heading',
        fallback: 'Featured Project',
        className: 'text-[10px] font-semibold tracking-wide text-slate-500 uppercase w-32',
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'space-y-1',
        fields: [
          {
            path: 'title',
            fallback: 'SPKJS',
            className: 'text-[11px] font-semibold text-slate-900',
          },
          {
            path: 'techStack',
            fallback: '',
            className: 'text-[9px] text-slate-500 italic',
          },
          {
            type: 'html',
            path: 'description',
            className: 'text-[9px] text-slate-700 leading-relaxed',
          },
          {
            type: 'link',
            path: 'link.title',
            href: 'link.link',
            className: 'text-[9px] text-blue-600 hover:underline mt-1',
          },
        ],
      },
      className: 'flex justify-between items-start gap-8 pt-6 pb-4 border-b border-slate-200 px-16',
      containerClassName: 'space-y-3',
    },

    /**
     * SKILLS & TOOLS
     */
    {
      id: 'skills',
      break: true,
      type: 'badge-section',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills & Tools',
        className: 'text-[10px] font-semibold tracking-wide text-slate-500 uppercase w-32',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      badgeClassName:
        'px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[9px] text-slate-700 font-medium',
      containerClassName: 'gap-1.5',
      className: 'flex justify-between items-start gap-8 pt-6 pb-4 border-b border-slate-200 px-16',
    },

    /**
     * CERTIFICATIONS
     */
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-[10px] font-semibold tracking-wide text-slate-500 uppercase w-32',
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'space-y-0.5',
        fields: [
          {
            path: 'title',
            fallback: 'Certification Title',
            className: 'text-[11px] font-semibold text-slate-900',
          },
          {
            path: 'issuer',
            fallback: 'Issuer',
            className: 'text-[9px] text-slate-600',
          },
          {
            type: 'duration',
            path: 'duration',
            className: 'text-[9px] text-slate-500',
          },
          {
            type: 'link',
            path: 'link.title',
            href: 'link.link',
            className: 'text-[9px] text-blue-600 hover:underline',
          },
        ],
      },
      className: 'flex justify-between items-start gap-8 pt-6 pb-4 border-b border-slate-200 px-16',
      containerClassName: 'space-y-3',
    },

    /**
     * INTERESTS
     */
    {
      id: 'interests',
      type: 'badge-section',
      break: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-[10px] font-semibold tracking-wide text-slate-500 uppercase w-32',
      },
      listPath: 'interests.items[0].items',
      badgeClassName:
        'px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[9px] text-slate-700 font-medium',
      containerClassName: 'gap-1.5',
      className: 'flex justify-between items-start gap-8 pt-6 pb-4 border-b border-slate-200 px-16',
    },

    /**
     * ACHIEVEMENTS
     */
    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-[10px] font-semibold tracking-wide text-slate-500 uppercase w-32',
      },
      listPath: 'achievements.items[0].items',
      badgeClassName:
        'px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[9px] text-slate-700 font-medium',
      containerClassName: 'gap-1.5',
      className: 'flex justify-between items-start gap-8 pt-6 pb-4 border-b border-slate-200 px-16 pb-8',
    },
  ],
};

export default enjiTemplate;
