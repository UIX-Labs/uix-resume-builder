const aniketTemplate = {
  name: 'Aniket Modern Classic',

  page: {
    width: 794,
    height: 1122,
    padding: 32,
    background: '#ffffff',
    className: 'text-black leading-relaxed',
    fontFamily: 'fangsong',
  },

  body: {
    id: 'body',
    type: 'container',
    className: 'flex flex-col',
    children: [
      // Header Section
      {
        type: 'list',
        id: 'personalDetails',
        pathWithFallback: { path: 'data.personalDetails.items' },
        className: 'flex flex-col gap-2',
        presentation: [
          {
            id: 'header-section',
            type: 'container',
            className: 'flex flex-col items-center justify-center text-center',
            break: true,
            children: [
              {
                id: 'name-text',
                type: 'text',
                pathWithFallback: {
                  path: 'data.fullName',
                  fallback: 'Your Name',
                },
                className: 'tracking-wide text-xl uppercase font-extrabold text-black',
              },
              {
                id: 'title-text',
                type: 'text',
                pathWithFallback: {
                  path: 'data.title',
                },
                className: 'tracking-wide text-sm text-black',
              },
              {
                id: 'contact-section',
                type: 'container',
                className: 'flex flex-row flex-wrap justify-center gap-0.5 mt-1 text-xs text-black',
                children: [
                  {
                    id: 'address-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.address',
                      fallback: 'City',
                    },
                  },
                  { type: 'seperator', variant: 'pipe' },
                  {
                    id: 'phone-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.phone',
                      fallback: 'Phone',
                    },
                  },
                  { type: 'seperator', variant: 'pipe' },
                  {
                    id: 'email-link',
                    type: 'link',
                    pathWithFallback: {
                      path: 'data.email',
                      fallback: 'Email',
                    },
                    href: 'mailto:aniket@gmail.com',
                  },
                  { type: 'seperator', variant: 'pipe' },
                  {
                    id: 'linkedin-text',
                    type: 'link',
                    hrefPathWithFallback: {
                      path: 'data.links.linkedin.link',
                      fallback: 'https://linkedin.com',
                    },
                    pathWithFallback: {
                      path: 'data.links.linkedin.title',
                      fallback: 'LinkedIn',
                    },
                    className: 'text-neutral-900',
                  },
                  { type: 'seperator', variant: 'pipe' },
                  {
                    id: 'github-text',
                    type: 'link',
                    hrefPathWithFallback: {
                      path: 'data.links.github.link',
                      fallback: 'https://github.com',
                    },
                    pathWithFallback: {
                      path: 'data.links.github.title',
                      fallback: 'GitHub',
                    },
                    className: 'text-neutral-900',
                  },
                ],
              },
            ],
          },
        ],
      },
      // Education
      {
        id: 'education-section',
        type: 'container',
        className: 'flex flex-col mt-4',
        children: [
          {
            id: 'education-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.education.heading',
              fallback: 'Education',
            },
            className: 'uppercase tracking-wide text-sm font-semibold text-black',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'bg-black w-full h-[1.5px] ml-[1.5ch] mt-0.5',
          },
          {
            id: 'education',
            type: 'list',
            pathWithFallback: { path: 'data.education.items' },
            className: 'flex flex-col mt-3 gap-3',
            presentation: [
              {
                type: 'container',
                id: 'education-item',
                className: 'flex flex-col',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-row items-center text-sm whitespace-pre',
                    children: [
                      {
                        id: 'education-degree',
                        type: 'text',
                        pathWithFallback: { path: 'data.degree' },
                        className: 'font-semibold',
                        suffix: ', ',
                      },
                      {
                        type: 'text',
                        pathWithFallback: {
                          path: 'data.fieldOfStudy',
                          fallback: 'Field of Study',
                        },
                        className: 'text-black italic',
                      },
                      {
                        type: 'duration',
                        className: 'italic font-semibold text-sm ml-auto',
                        pathWithFallback: {
                          path: 'data.duration',
                          fallback: 'Start Date',
                        },
                      },
                    ],
                  },
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-center text-xs',
                    children: [
                      {
                        id: 'education-school',
                        type: 'text',
                        pathWithFallback: { path: 'data.institution' },
                        className: 'text-black italic',
                      },
                      {
                        id: 'education-grade',
                        type: 'text',
                        pathWithFallback: { path: 'data.grade.value' },
                        className: 'italic font-medium',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // Summary
      {
        id: 'summary-section',
        type: 'container',
        className: 'flex flex-col mt-4',
        children: [
          {
            id: 'summary-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.summary.heading',
              fallback: 'Summary',
            },
            className: 'uppercase tracking-wide text-sm font-semibold text-black',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'bg-black w-full h-[1.5px] ml-[1.5ch] mt-0.5',
          },
          {
            type: 'list',
            id: 'professionalSummary',
            pathWithFallback: { path: 'data.personalDetails.items' },
            className: 'flex flex-col mt-3',
            presentation: [
              {
                id: 'summary-text',
                type: 'html',
                pathWithFallback: {
                  path: 'data.description',
                  fallback: 'Summary',
                },
                className: 'text-xs text-neutral-800 text-justify',
              },
            ],
          },
        ],
      },
      // Experience
      {
        id: 'experience-section',
        type: 'container',
        className: 'flex flex-col gap-2 mt-4',
        break: true,
        children: [
          {
            id: 'experience-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.experience.heading',
              fallback: 'Experience',
            },
            className: 'uppercase tracking-wide text-sm font-semibold text-black',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'bg-black w-full h-[1.5px] ml-[1.5ch] mt-0.5',
          },
          {
            id: 'experience',
            type: 'list',
            pathWithFallback: { path: 'data.experience.items' },
            className: 'flex flex-col gap-3 mt-2',
            presentation: [
              {
                type: 'container',
                id: 'experience-item',
                className: 'flex flex-col gap-1',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-center text-sm text-black mb-3',
                    children: [
                      {
                        type: 'container',
                        className: 'flex flex-row justify-between items-center gap-1',
                        children: [
                          {
                            id: 'experience-role',
                            type: 'text',
                            pathWithFallback: { path: 'data.position' },
                            className: 'black font-semibold',
                          },
                          {
                            type: 'seperator',
                            variant: 'pipe',
                          },
                          {
                            id: 'experience-company',
                            type: 'text',
                            pathWithFallback: { path: 'data.company' },
                            className: 'font-semibold',
                          },
                        ],
                      },
                      {
                        id: 'experience-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'italic font-semibold',
                      },
                    ],
                  },
                  {
                    id: 'experience-bullets',
                    type: 'html',
                    pathWithFallback: { path: 'data.description' },
                    className: 'text-xs text-neutral-800 text-justify ml-[1.6ch]',
                  },
                ],
              },
            ],
          },
        ],
      },
      // Skills
      {
        id: 'skills-section',
        type: 'container',
        className: 'flex flex-col gap-2 mt-4',
        children: [
          {
            id: 'skills-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.skills.heading',
              fallback: 'Skills',
            },
            className: 'uppercase tracking-wide text-sm font-semibold text-black',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'bg-black w-full h-[1.5px] ml-[1.5ch] mt-0.5',
          },
          {
            id: 'skills-list',
            type: 'list',
            pathWithFallback: { path: 'data.skills.items' },
            className: 'flex flex-col gap-1 mt-2',
            groupBy: 'category',
            presentation: [
              {
                type: 'container',
                className: 'flex gap-1 items-center text-xs',
                children: [
                  {
                    type: 'text',
                    pathWithFallback: { path: 'data.label' },
                    suffix: ': ',
                    className: 'font-semibold',
                  },
                  {
                    type: 'list',
                    pathWithFallback: { path: 'data.items' },
                    className: 'flex gap-1',
                    presentation: [
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.name' },
                        suffix: ', ',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // Projects
      {
        id: 'projects-section',
        type: 'container',
        className: 'flex flex-col gap-2 mt-4',
        children: [
          {
            id: 'projects-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.projects.title',
              fallback: 'Projects',
            },
            className: 'uppercase tracking-wide text-sm font-semibold text-black',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'bg-black w-full h-[1.5px] ml-[1.5ch] mt-0.5',
          },
          {
            type: 'list',
            id: 'projects-list',
            pathWithFallback: { path: 'data.projects.items' },
            className: 'flex flex-col gap-3 mt-2',
            presentation: [
              {
                type: 'container',
                className: 'flex flex-col gap-1',
                children: [
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.title',
                      fallback: 'Project Title',
                    },
                    className: 'text-sm font-semibold text-neutral-900',
                  },
                  {
                    type: 'duration',
                    pathWithFallback: {
                      path: 'data.duration',
                      fallback: '',
                    },
                    className: 'text-xs text-neutral-600 italic',
                  },
                  {
                    type: 'html',
                    pathWithFallback: {
                      path: 'data.description',
                      fallback: '',
                    },
                    className: 'text-xs text-neutral-800 text-justify',
                  },
                  {
                    type: 'link',
                    pathWithFallback: { path: 'data.link.title', fallback: '' },
                    hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                    className: 'text-xs text-blue-600 hover:underline mt-1',
                  },
                ],
              },
            ],
          },
        ],
      },
      // Interests
      {
        id: 'interests-section',
        type: 'container',
        className: 'flex flex-col gap-2 mt-4',
        children: [
          {
            id: 'interests-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.interests.title',
              fallback: 'Interests',
            },
            className: 'uppercase tracking-wide text-sm font-semibold text-black',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'bg-black w-full h-[1.5px] ml-[1.5ch] mt-0.5',
          },
          {
            id: 'interests-list',
            type: 'list',
            pathWithFallback: { path: 'data.interests.items' },
            className: 'flex gap-1 mt-2',
            presentation: [
              {
                type: 'container',
                className: 'flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-black rounded-md',
                children: [
                  {
                    type: 'text',
                    className: 'text-xs text-white font-semibold whitespace-nowrap',
                  },
                ],
              },
            ],
          },
        ],
      },
      // Achievements
      {
        id: 'achievements-section',
        type: 'container',
        className: 'flex flex-col gap-2 mt-4',
        children: [
          {
            id: 'achievements-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.achievements.title',
              fallback: 'Achievements',
            },
            className: 'uppercase tracking-wide text-sm font-semibold text-black',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'bg-black w-full h-[1.5px] ml-[1.5ch] mt-0.5',
          },
          {
            id: 'achievements-list',
            type: 'list',
            pathWithFallback: { path: 'data.achievements.items' },
            className: 'flex gap-1 mt-2',
            presentation: [
              {
                type: 'container',
                className: 'flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-black rounded-md',
                children: [
                  {
                    type: 'text',
                    className: 'text-xs text-white font-semibold whitespace-nowrap',
                  },
                ],
              },
            ],
          },
        ],
      },
      // Certifications
      {
        id: 'certifications-section',
        type: 'container',
        className: 'flex flex-col gap-2 mt-4',
        children: [
          {
            id: 'certifications-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.certifications.title',
              fallback: 'Certifications',
            },
            className: 'uppercase tracking-wide text-sm font-semibold text-black',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'bg-black w-full h-[1.5px] ml-[1.5ch] mt-0.5',
          },
          {
            type: 'list',
            id: 'certifications-list',
            pathWithFallback: { path: 'data.certifications.items' },
            className: 'flex flex-col gap-3 mt-2',
            presentation: [
              {
                type: 'container',
                className: 'flex flex-col gap-1',
                children: [
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.title',
                      fallback: 'Certification Title',
                    },
                    className: 'text-sm font-semibold text-neutral-900',
                  },
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.issuer',
                      fallback: 'Issuer',
                    },
                    className: 'text-xs text-neutral-700',
                  },
                  {
                    type: 'duration',
                    pathWithFallback: { path: 'data.duration' },
                    className: 'text-xs text-neutral-600 italic',
                  },
                  {
                    type: 'link',
                    pathWithFallback: { path: 'data.link.title', fallback: '' },
                    hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                    className: 'text-xs text-blue-600 hover:underline mt-1',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default aniketTemplate;
