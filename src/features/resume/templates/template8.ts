const template8 = {
  name: 'Vivek Kumar Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 40,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Playfair Display, serif',
  },

  body: {
    id: 'body',
    type: 'container',
    className: 'flex flex-col gap-4',
    children: [
      // Header Section
      {
        type: 'list',
        id: 'personalDetails',
        pathWithFallback: { path: 'data.personalDetails.items' },
        className: 'flex flex-col gap-2 text-center',
        presentation: [
          {
            id: 'header-section',
            type: 'container',
            className: 'flex flex-col items-center',
            break: true,
            children: [
              // Name with Small Caps Style
              {
                id: 'name-text',
                type: 'text',
                pathWithFallback: {
                  path: 'data.fullName',
                  fallback: 'VIVEK KUMAR',
                },
                className: 'text-4xl font-base tracking-[0.1em] uppercase mb-2',
              },
              // Contact Information Row
              {
                id: 'contact-section',
                type: 'container',
                className: 'flex flex-row flex-wrap items-center justify-center gap-4 text-sm font-[600]',
                children: [
                  {
                    id: 'phone-container',
                    type: 'container',
                    className: 'flex flex-row items-center gap-1',
                    children: [
                      {
                        type: 'icon',
                        name: 'Phone',
                        className: 'w-3 h-3',
                      },
                      {
                        id: 'phone-text',
                        type: 'text',
                        pathWithFallback: { path: 'data.phone', fallback: '+91 8595481430' },
                        className: 'text-sm',
                      },
                    ],
                  },
                  {
                    id: 'email-container',
                    type: 'container',
                    className: 'flex flex-row items-center gap-1',
                    children: [
                      {
                        type: 'icon',
                        name: 'Mail',
                        className: 'w-3 h-3',
                      },
                      {
                        id: 'email-text',
                        type: 'text',
                        pathWithFallback: { path: 'data.email', fallback: 'vivekabhiraj456@gmail.com' },
                        className: 'text-sm underline',
                      },
                    ],
                  },
                  {
                    id: 'linkedin-container',
                    type: 'container',
                    className: 'flex flex-row items-center gap-1',
                    children: [
                      {
                        type: 'icon',
                        name: 'Linkedin',
                        className: 'w-3 h-3',
                      },
                      {
                        id: 'linkedin-link',
                        type: 'link',
                        pathWithFallback: {
                          path: 'data.links.linkedin.title',
                          fallback: '',
                        },
                        hrefPathWithFallback: {
                          path: 'data.links.linkedin.link',
                          fallback: 'https://linkedin.com',
                        },
                        className: 'text-sm underline',
                      },
                    ],
                  },
                  {
                    id: 'github-container',
                    type: 'container',
                    className: 'flex flex-row items-center gap-1',
                    children: [
                      {
                        type: 'icon',
                        name: 'Github',
                        className: 'w-3 h-3',
                      },
                      {
                        id: 'github-link',
                        type: 'link',
                        pathWithFallback: {
                          path: 'data.links.github.title',
                          fallback: 'Github',
                        },
                        hrefPathWithFallback: {
                          path: 'data.links.github.link',
                          fallback: 'https://github.com',
                        },
                        className: 'text-sm underline',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Education Section
      {
        id: 'education-section',
        type: 'container',
        className: 'flex flex-col',
        children: [
          {
            id: 'education-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.education.heading',
              fallback: 'Education',
            },
            className: 'text-base font-bold border-b border-neutral-900 pb-0.5',
          },
          {
            id: 'education',
            type: 'list',
            pathWithFallback: { path: 'data.education.items' },
            className: 'flex flex-col gap-2 mt-2',
            presentation: [
              {
                type: 'container',
                id: 'education-item',
                className: 'flex flex-col gap-0.5',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        id: 'education-school',
                        type: 'text',
                        pathWithFallback: { path: 'data.institution' },
                        className: 'text-sm font-bold',
                      },
                      {
                        id: 'education-grade',
                        type: 'text',
                        pathWithFallback: { path: 'data.grade.value' },
                        className: 'text-sm font-bold',
                      },
                    ],
                  },
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        id: 'education-degree',
                        type: 'text',
                        pathWithFallback: { path: 'data.degree' },
                        className: 'text-sm',
                      },
                      {
                        id: 'education-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-sm italic',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Work Experience Section
      {
        id: 'experience-section',
        type: 'container',
        className: 'flex flex-col',
        break: true,
        children: [
          {
            id: 'experience-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.experience.heading',
              fallback: 'Work Experience',
            },
            className: 'text-base font-bold border-b border-neutral-900 pb-0.5',
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
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        id: 'experience-company',
                        type: 'text',
                        pathWithFallback: { path: 'data.company' },
                        className: 'text-sm font-bold',
                      },
                      {
                        id: 'experience-location',
                        type: 'text',
                        pathWithFallback: { path: 'data.location' },
                        className: 'text-sm font-bold',
                      },
                    ],
                  },
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        id: 'experience-role',
                        type: 'text',
                        pathWithFallback: { path: 'data.position' },
                        className: 'text-sm italic',
                      },
                      {
                        id: 'experience-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-sm italic',
                      },
                    ],
                  },
                  {
                    id: 'experience-bullets',
                    type: 'html',
                    pathWithFallback: { path: 'data.description' },
                    className:
                      'text-sm [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold whitespace-pre-wrap',
                  },
                ],
              },
            ],
          },
        ],
      },

      // Projects Section
      {
        id: 'projects-section',
        type: 'container',
        className: 'flex flex-col',
        children: [
          {
            id: 'projects-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.projects.heading',
              fallback: 'Projects',
            },
            className: 'text-base font-bold border-b border-neutral-900 pb-0.5',
          },
          {
            id: 'projects',
            type: 'list',
            pathWithFallback: { path: 'data.projects.items' },
            className: 'flex flex-col gap-3 mt-2',
            presentation: [
              {
                type: 'container',
                id: 'project-item',
                className: 'flex flex-col gap-1',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        type: 'container',
                        className: 'flex flex-row items-center gap-2',
                        children: [
                          {
                            id: 'project-name',
                            type: 'text',
                            pathWithFallback: { path: 'data.title' },
                            className: 'text-sm font-bold',
                          },
                          {
                            id: 'project-link',
                            type: 'link',
                            pathWithFallback: {
                              path: 'data.link.tile',
                              fallback: 'Demo',
                            },
                            hrefPathWithFallback: {
                              path: 'data.link.link',
                              fallback: '',
                            },
                            className: 'text-sm underline hover:text-blue-600',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'project-description',
                    type: 'html',
                    pathWithFallback: { path: 'data.description' },
                    className:
                      'text-sm [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold whitespace-pre-wrap',
                  },
                ],
              },
            ],
          },
        ],
      },

      // Technical Skills Section
      {
        id: 'skills-section',
        type: 'container',
        className: 'flex flex-col',
        children: [
          {
            id: 'skills-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.skills.title',
              fallback: 'Technical Skills',
            },
            className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize',
          },
          {
            id: 'skills-list',
            type: 'list',
            pathWithFallback: { path: 'data.skills.items' },
            className: 'flex flex-row gap-1 mt-2',
            seperator: ',',
            presentation: [
              {
                type: 'container',
                className: 'flex flex-row gap-2',
                children: [
                  {
                    type: 'container',
                    id: 'skill-item',
                    className: 'flex flex-row justify-between items-center',
                    children: [
                      {
                        type: 'container',
                        className: 'flex flex-col',
                        children: [
                          {
                            id: 'skill-name',
                            type: 'text',
                            pathWithFallback: { path: 'data.name' },
                            className: 'text-sm text-black',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Algorithmic Competitions/Achievements Section
      {
        id: 'competitions-section',
        type: 'container',
        className: 'flex flex-col gap-2',
        children: [
          {
            id: 'competitions-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.achievements.title',
              fallback: 'Algorithmic Competitions/Achievements',
            },
            className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize',
          },
          {
            id: 'competitions-list',
            type: 'list',
            pathWithFallback: { path: 'data.achievements.items' },
            className: 'flex flex-col gap-0.5',
            presentation: [
              {
                type: 'list',
                pathWithFallback: { path: 'data.items' },
                className: 'flex flex-col gap-0.5 ml-2',
                presentation: [
                  {
                    type: 'container',
                    className: 'flex flex-row gap-1',
                    children: [
                      {
                        type: 'text',
                        pathWithFallback: { path: '' },
                        className: 'text-sm',
                        prefix: '• ',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Certifications Section
      {
        id: 'certifications-section',
        type: 'container',
        className: 'flex flex-col',
        children: [
          {
            id: 'certifications-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.certifications.title',
              fallback: 'Certifications',
            },
            className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize',
          },
          {
            type: 'list',
            id: 'certifications-list',
            pathWithFallback: { path: 'data.certifications.items' },
            className: 'flex flex-col gap-2 mt-2',
            presentation: [
              {
                type: 'container',
                className: 'flex flex-col gap-0.5',
                children: [
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.title',
                      fallback: 'Certification Title',
                    },
                    className: 'text-sm font-bold',
                  },
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.issuer',
                      fallback: 'Issuer',
                    },
                    className: 'text-sm',
                  },
                  {
                    type: 'duration',
                    pathWithFallback: { path: 'data.duration' },
                    className: 'text-sm italic',
                  },
                  {
                    type: 'link',
                    pathWithFallback: { path: 'data.link.title', fallback: '' },
                    hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                    className: 'text-sm underline hover:text-blue-600',
                  },
                ],
              },
            ],
          },
        ],
      },

      // Interests Section
      {
        id: 'interests-section',
        type: 'container',
        className: 'flex flex-col',
        children: [
          {
            id: 'interests-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.interests.title',
              fallback: 'Interests',
            },
            className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize',
          },
          {
            id: 'interests-list',
            type: 'list',
            pathWithFallback: { path: 'data.interests.items' },
            className: 'flex flex-wrap gap-1 mt-2',
            presentation: [
              {
                type: 'list',
                className: 'text-sm text-black leading-relaxed space-x-1',
                pathWithFallback: { path: 'data.items' },
                seperator: ',',
                presentation: [
                  {
                    type: 'text',
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

export default template8;