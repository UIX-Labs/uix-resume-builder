const annaFieldTemplate = {
  name: 'Anna Field Modern',

  page: {
    width: 794,
    height: 1122,
    padding: 40,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Arial',
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
        className: 'flex flex-col gap-4',
        presentation: [
          {
            id: 'header-section',
            type: 'container',
            className: 'flex flex-col gap-4',
            break: true,
            children: [
              // Name and Title
              {
                type: 'container',
                className: 'flex flex-row items-baseline gap-2 mb-3',
                children: [
                  {
                    id: 'name-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.fullName',
                      fallback: 'Anna Field',
                    },
                    className: 'text-2xl font-bold text-[rgb(17,9,128)]',
                  },
                ],
              },
              // Contact Information
              {
                id: 'contact-section',
                type: 'container',
                className: 'flex flex-row gap-x-6 text-sm text-gray-700 flex-wrap',
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
                        className: 'text-[rgb(17,9,128)]',
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.address', fallback: '123 Main Street, Paris, France' },
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
                        className: 'text-[rgb(17,9,128)]',
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.email', fallback: 'anna@field.com' },
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
                        className: 'text-[rgb(17,9,128)]',
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.phone', fallback: '+11 23434546' },
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
                        className: 'text-[rgb(17,9,128)]',
                      },
                      {
                        type: 'link',
                        pathWithFallback: {
                          path: 'data.links.linkedin.title',
                          fallback: 'annafield',
                        },
                        hrefPathWithFallback: {
                          path: 'data.links.linkedin.link',
                          fallback: 'https://linkedin.com/in/annafield',
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
        className: 'flex flex-col gap-3',
        children: [
          {
            id: 'profile-header',
            type: 'container',
            className: 'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center',
            children: [
              {
                id: 'profile-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.personDetails.title',
                  fallback: 'Profile',
                },
                className: 'text-lg font-bold text-[rgb(17,9,128)]',
              },
            ],
          },
          {
            type: 'list',
            id: 'professionalSummary',
            pathWithFallback: { path: 'data.personalDetails.items' },
            className: 'px-2',
            presentation: [
              {
                id: 'summary-text',
                type: 'html',
                pathWithFallback: {
                  path: 'data.description',
                  fallback: 'Summary',
                },
                className:
                  'text-sm text-gray-700 text-justify leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-all',
              },
            ],
          },
        ],
      },

      // Work Experience
      {
        id: 'experience-section',
        type: 'container',
        className: 'flex flex-col gap-3',
        break: true,
        children: [
          {
            id: 'experience-header',
            type: 'container',
            className: 'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center',
            children: [
              {
                id: 'experience-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.experience.heading',
                  fallback: 'Work Experience',
                },
                className: 'text-lg font-bold text-[rgb(17,9,128)]',
              },
            ],
          },
          {
            id: 'experience',
            type: 'list',
            pathWithFallback: { path: 'data.experience.items' },
            className: 'flex flex-col gap-6 px-2',
            presentation: [
              {
                type: 'container',
                id: 'experience-item',
                className: 'flex flex-col gap-3',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        type: 'container',
                        className: 'flex flex-col flex-1',
                        children: [
                          {
                            id: 'experience-position',
                            type: 'text',
                            pathWithFallback: { path: 'data.position' },
                            className: 'text-base font-bold text-black',
                          },
                          {
                            id: 'experience-company',
                            type: 'text',
                            pathWithFallback: { path: 'data.company' },
                            className: 'text-sm text-gray-600 italic',
                          },
                        ],
                      },
                      // Right column: Date + Location
                      {
                        type: 'container',
                        className: 'flex flex-col items-end text-right w-[160px] shrink-0',
                        children: [
                          {
                            id: 'experience-period',
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-black',
                          },
                          {
                            id: 'experience-location',
                            type: 'text',
                            pathWithFallback: { path: 'data.location' },
                            className: 'text-sm text-gray-600',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'experience-bullets',
                    type: 'html',
                    pathWithFallback: { path: 'data.description' },
                    className:
                      'text-sm text-gray-700 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-all w-[520px]',
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
            id: 'education-header',
            type: 'container',
            className: 'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center',
            children: [
              {
                id: 'education-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.education.heading',
                  fallback: 'Education',
                },
                className: 'text-lg font-bold text-[rgb(17,9,128)]',
              },
            ],
          },
          {
            id: 'education',
            type: 'list',
            pathWithFallback: { path: 'data.education.items' },
            className: 'flex flex-col gap-4 px-2',
            presentation: [
              {
                type: 'container',
                id: 'education-item',
                className: 'flex flex-row justify-between items-start',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-col flex-1',
                    children: [
                      {
                        id: 'education-degree',
                        type: 'text',
                        pathWithFallback: { path: 'data.degree' },
                        className: 'text-base font-bold text-black',
                      },
                      {
                        id: 'education-school',
                        type: 'text',
                        pathWithFallback: { path: 'data.institution' },
                        className: 'text-sm text-gray-600 italic',
                      },
                    ],
                  },
                  {
                    type: 'container',
                    className: 'text-right',
                    children: [
                      {
                        id: 'education-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
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

      // Skills
      {
        id: 'skills-section',
        type: 'container',
        className: 'flex flex-col gap-3',
        children: [
          {
            id: 'skills-header',
            type: 'container',
            className: 'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center',
            children: [
              {
                id: 'skills-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.skills.heading',
                  fallback: 'Skills',
                },
                className: 'text-lg font-bold text-[rgb(17,9,128)]',
              },
            ],
          },
          {
            id: 'skills-list',
            type: 'list',
            pathWithFallback: { path: 'data.skills.items' },
            className: 'flex flex-wrap gap-1',
            presentation: [
              {
                type: 'text',
                pathWithFallback: { path: 'data.name' },
                className: 'text-sm text-black',
                suffix: ', ',
              },
            ],
          },
        ],
      },

      // Interests
      {
        id: 'interests-section',
        type: 'container',
        className: 'flex flex-col gap-3',
        children: [
          {
            id: 'interests-header',
            type: 'container',
            className: 'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center',
            children: [
              {
                id: 'interests-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.interests.title',
                  fallback: 'Interests',
                },
                className: 'first-letter:uppercase text-lg font-bold text-[rgb(17,9,128)]',
              },
            ],
          },
          {
            id: 'interests-list',
            type: 'list',
            pathWithFallback: { path: 'data.interests.items' },
            className: 'px-2',
            presentation: [
              {
                type: 'list',
                className: 'flex flex-wrap gap-1',
                pathWithFallback: { path: 'data.items' },
                presentation: [
                  {
                    type: 'text',
                    className: 'text-sm text-gray-700',
                    suffix: ', ',
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
        className: 'flex flex-col gap-3',
        children: [
          {
            id: 'achievements-header',
            type: 'container',
            className: 'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center',
            children: [
              {
                id: 'achievements-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.achievements.title',
                  fallback: 'Achievements',
                },
                className: 'first-letter:uppercase text-lg font-bold text-[rgb(17,9,128)]',
              },
            ],
          },
          {
            id: 'achievements-list',
            type: 'list',
            pathWithFallback: { path: 'data.achievements.items' },
            className: 'px-2',
            presentation: [
              {
                type: 'list',
                className: 'flex flex-wrap gap-1',
                pathWithFallback: { path: 'data.items' },
                presentation: [
                  {
                    type: 'text',
                    className: 'text-sm text-gray-700',
                    suffix: ', ',
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
        className: 'flex flex-col gap-3',
        children: [
          {
            id: 'certifications-header',
            type: 'container',
            className: 'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center',
            children: [
              {
                id: 'certifications-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.certifications.title',
                  fallback: 'Certifications',
                },
                className: 'first-letter:uppercase text-lg font-bold text-[rgb(17,9,128)]',
              },
            ],
          },
          {
            type: 'list',
            id: 'certifications-list',
            pathWithFallback: { path: 'data.certifications.items' },
            className: 'flex flex-col gap-4 px-2',
            presentation: [
              {
                type: 'container',
                className: 'flex flex-row justify-between items-start',
                children: [
                  // Left: Title and Issuer
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
                        className: 'text-sm text-gray-600 italic',
                      },
                    ],
                  },
                  // Right: Date
                  {
                    type: 'duration',
                    pathWithFallback: { path: 'data.duration' },
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
};

export default annaFieldTemplate;
