const andrewTemplate = {
  name: 'Andrew Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 40,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Inter, sans-serif',
  },

  body: {
    id: 'body',
    type: 'container',
    className: 'flex flex-col gap-6',
    children: [
      // Header Section
      {
        type: 'list',
        id: 'personalDetails',
        pathWithFallback: { path: 'data.personalDetails.items' },
        className: 'flex flex-col gap-3',
        presentation: [
          {
            id: 'header-section',
            type: 'container',
            className: 'flex flex-col gap-3',
            break: true,
            children: [
              // Name and Title row
              {
                type: 'container',
                className: 'flex flex-row items-baseline justify-between mb-4',
                children: [
                  {
                    id: 'name-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.fullName',
                      fallback: "Andrew O'Sullivan",
                    },
                    className: 'text-4xl font-bold text-black',
                  },
                ],
              },
              // Contact Information
              {
                id: 'contact-section',
                type: 'container',
                className: 'grid grid-cols-2 gap-y-2 gap-x-16 text-sm text-gray-700',
                children: [
                  // Location
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'MapPin',
                        size: 14,
                        className: 'text-black',
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.address', fallback: 'Address' },
                        className: 'text-sm text-gray-700',
                      },
                    ],
                  },
                  // Email
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'Mail',
                        size: 14,
                        className: 'text-black',
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.email', fallback: 'andrew@sulli.com' },
                        className: 'text-sm text-gray-700',
                      },
                    ],
                  },
                  // Phone
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'Phone',
                        size: 14,
                        className: 'text-black',
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.phone', fallback: '+01 11111155' },
                        className: 'text-sm text-gray-700',
                      },
                    ],
                  },
                  // LinkedIn
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'Linkedin',
                        size: 14,
                        className: 'text-black',
                      },
                      {
                        type: 'link',
                        pathWithFallback: {
                          path: 'data.links.linkedin.title',
                          fallback: 'andrewosulivian',
                        },
                        hrefPathWithFallback: {
                          path: 'data.links.linkedin.link',
                          fallback: 'https://linkedin.com/in/andrewosulivian',
                        },
                        className: 'text-sm text-gray-700 hover:text-blue-600',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Profile Section
      {
        type: 'container',
        className: 'flex flex-col gap-2',
        children: [
          {
            id: 'summary-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.personDetails.title',
              fallback: 'Summary',
            },
            className: 'text-lg font-bold text-black border-b border-black pb-1',
          },

          {
            type: 'list',
            id: 'professionalSummary',
            pathWithFallback: { path: 'data.personalDetails.items' },
            className: 'flex flex-col',
            presentation: [
              {
                id: 'summary-text',
                type: 'html',
                pathWithFallback: {
                  path: 'data.description',
                  fallback: 'Summary',
                },
                className:
                  'text-sm text-neutral-700 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 text-justify break-words whitespace-pre-wrap',
              },
            ],
          },
        ],
      },

      // Professional Experience
      {
        id: 'experience-section',
        type: 'container',
        className: 'flex flex-col gap-3',
        break: true,
        children: [
          {
            id: 'experience-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.experience.heading',
              fallback: 'Professional Experience',
            },
            className: 'text-lg font-bold text-black border-b border-black pb-1',
          },
          {
            id: 'experience',
            type: 'list',
            pathWithFallback: { path: 'data.experience.items' },
            className: 'flex flex-col gap-5',
            presentation: [
              {
                type: 'container',
                id: 'experience-item',
                className: 'flex flex-col',
                children: [
                  // Top row: Date + Location | Position + Company
                  {
                    type: 'container',
                    className: 'flex flex-row gap-4 items-start w-full',
                    children: [
                      // Left column: Date + Location
                      {
                        type: 'container',
                        className: 'flex flex-col w-[180px]',
                        children: [
                          {
                            id: 'experience-period',
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-black font-normal',
                          },
                          {
                            id: 'experience-location',
                            type: 'text',
                            pathWithFallback: { path: 'data.location' },
                            className: 'text-sm text-gray-700 break-words',
                          },
                        ],
                      },
                      // Right column: Position + Company
                      {
                        type: 'container',
                        className: 'flex flex-col flex-1',
                        children: [
                          {
                            id: 'experience-position',
                            type: 'text',
                            pathWithFallback: { path: 'data.position' },
                            className: 'text-sm font-bold text-black',
                          },
                          {
                            id: 'experience-company',
                            type: 'text',
                            pathWithFallback: { path: 'data.company' },
                            className: 'text-sm text-gray-700 italic',
                          },
                          {
                            id: 'experience-bullets',
                            type: 'html',
                            pathWithFallback: { path: 'data.description' },
                            className:
                              'text-sm text-gray-700 leading-relaxed break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
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

      // Projects
      {
        id: 'projects-section',
        type: 'container',
        className: 'flex flex-col gap-3',
        children: [
          {
            id: 'projects-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.projects.title',
              fallback: 'Projects',
            },
            className: 'capitalize text-lg font-bold text-black border-b border-black pb-1',
          },
          {
            id: 'projects',
            type: 'list',
            pathWithFallback: { path: 'data.projects.items' },
            className: 'flex flex-col gap-5',
            presentation: [
              {
                type: 'container',
                id: 'project-item',
                className: 'flex flex-col gap-3',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-row gap-4 items-start w-full',
                    children: [
                      // Left column: Date
                      {
                        type: 'container',
                        className: 'flex flex-col w-[180px]',
                        children: [
                          {
                            id: 'project-period',
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-black font-normal',
                          },
                        ],
                      },
                      // Right column: Title + Description + Link
                      {
                        type: 'container',
                        className: 'flex flex-col flex-1',
                        children: [
                          {
                            id: 'project-title',
                            type: 'text',
                            pathWithFallback: { path: 'data.title' },
                            className: 'text-sm font-bold text-black',
                          },
                          {
                            id: 'project-description',
                            type: 'html',
                            pathWithFallback: { path: 'data.description' },
                            className:
                              'text-sm text-gray-700 leading-relaxed break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
                          },
                          {
                            id: 'project-link',
                            type: 'link',
                            pathWithFallback: { path: 'data.link.title', fallback: '' },
                            hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                            className: 'text-sm text-blue-600 hover:underline mt-1',
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

      // Education
      {
        id: 'education-section',
        type: 'container',
        className: 'flex flex-col gap-3',
        children: [
          {
            id: 'education-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.education.heading',
              fallback: 'Education',
            },
            className: 'text-lg font-bold text-black border-b border-black pb-1',
          },
          {
            id: 'education',
            type: 'list',
            pathWithFallback: { path: 'data.education.items' },
            className: 'flex flex-col gap-4',
            presentation: [
              {
                type: 'container',
                id: 'education-item',
                className: 'flex flex-row gap-4 items-start w-full',
                children: [
                  // Left column: Date + Location
                  {
                    type: 'container',
                    className: 'flex flex-col w-[180px] shrink-0',
                    children: [
                      {
                        id: 'education-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-sm text-black font-normal',
                      },
                      {
                        id: 'education-location',
                        type: 'text',
                        pathWithFallback: { path: 'data.location', fallback: '' },
                        className: 'text-sm text-gray-700',
                      },
                    ],
                  },
                  {
                    type: 'container',
                    className: 'flex flex-col flex-1',
                    children: [
                      {
                        id: 'education-degree',
                        type: 'text',
                        pathWithFallback: { path: 'data.degree' },
                        className: 'text-sm font-bold text-black',
                      },
                      {
                        id: 'education-school',
                        type: 'text',
                        pathWithFallback: { path: 'data.institution' },
                        className: 'text-sm text-gray-700 italic',
                      },
                    ],
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
        className: 'flex flex-col gap-3',
        children: [
          {
            id: 'skills-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.skills.heading',
              fallback: 'Skills',
            },
            className: 'text-lg font-bold text-black border-b border-black pb-1',
          },
          {
            id: 'skills-list',
            type: 'list',
            pathWithFallback: { path: 'data.skills.items' },
            className: 'grid grid-cols-2 gap-x-8 gap-y-2',
            presentation: [
              {
                type: 'container',
                id: 'skill-item',
                className: 'flex flex-row justify-between items-center',
                children: [
                  // Skill name and category
                  {
                    type: 'container',
                    className: 'flex flex-col',
                    children: [
                      {
                        id: 'skill-name',
                        type: 'text',
                        pathWithFallback: { path: 'data.name' },
                        className: 'text-sm font-semibold text-black',
                      },
                      {
                        id: 'skill-category',
                        type: 'text',
                        pathWithFallback: { path: 'data.category' },
                        className: 'text-xs text-gray-600',
                      },
                    ],
                  },
                  {
                    id: 'skill-level-dots',
                    type: 'skillLevel',
                    pathWithFallback: { path: 'data.level' },
                    className: 'flex gap-1',
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
        className: 'flex flex-col gap-2',
        children: [
          {
            id: 'interests-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.interests.title',
              fallback: 'Interests',
            },
            className: 'capitalize text-lg font-bold text-black border-b-2 border-neutral-400 pb-1',
          },
          {
            id: 'interests-list',
            type: 'list',
            pathWithFallback: { path: 'data.interests.items' },
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

      {
        id: 'achievements-section',
        type: 'container',
        className: 'flex flex-col gap-2',
        children: [
          {
            id: 'achievements-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.achievements.title',
              fallback: 'Achievements',
            },
            className: 'capitalize text-lg font-bold text-black border-b-2 border-neutral-400 pb-1',
          },
          {
            id: 'achievements-list',
            type: 'list',
            pathWithFallback: { path: 'data.achievements.items' },
            presentation: [
              {
                type: 'list',
                className: 'flex flex-col gap-1',
                pathWithFallback: { path: 'data.items' },
                presentation: [
                  {
                    type: 'text',
                    className: 'text-sm text-black',
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: 'certifications-section',
        type: 'container',
        className: 'flex flex-col gap-2',
        children: [
          {
            id: 'certifications-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.certifications.title',
              fallback: 'Certifications',
            },
            className: 'capitalize text-lg font-bold text-black border-b-2 border-neutral-400 pb-1',
          },
          {
            type: 'list',
            id: 'certifications-list',
            pathWithFallback: { path: 'data.certifications.items' },
            className: 'flex flex-col gap-4',
            presentation: [
              {
                type: 'container',
                className: 'flex flex-row gap-4 items-start w-full',
                children: [
                  {
                    type: 'duration',
                    pathWithFallback: { path: 'data.duration' },
                    className: 'text-sm text-black font-normal w-[180px]',
                  },
                  {
                    type: 'container',
                    className: 'flex flex-col flex-1',
                    children: [
                      {
                        type: 'text',
                        pathWithFallback: {
                          path: 'data.title',
                          fallback: 'Certification Title',
                        },
                        className: 'text-sm font-bold text-black',
                      },
                      {
                        type: 'text',
                        pathWithFallback: {
                          path: 'data.issuer',
                          fallback: 'Issuer',
                        },
                        className: 'text-sm text-gray-700 italic',
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
};

export default andrewTemplate;
