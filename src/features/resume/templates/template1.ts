const aniketTemplate2 = {
  name: 'Aniket Modern Classic',

  page: {
    width: 794,
    height: 1122,
    padding: 32,
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
        className: 'flex flex-col gap-2',
        presentation: [
          {
            id: 'header-section',
            type: 'container',
            className: 'flex flex-col w-full',
            break: true,
            children: [
              {
                id: 'name-text',
                type: 'text',
                pathWithFallback: {
                  path: 'data.fullName',
                  fallback: 'Your Name',
                },
                className: 'text-xl font-bold text-black border-b-2 border-neutral-400 pb-1',
              },

              {
                id: 'contact-section',
                type: 'container',
                className: 'flex flex-row flex-wrap justify-start gap-2 text-sm text-black',
                children: [
                  {
                    id: 'phone-text',
                    type: 'text',
                    pathWithFallback: { path: 'data.phone', fallback: 'Phone' },
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
                    className: 'hover:text-blue-600',
                  },
                  { type: 'seperator', variant: 'pipe' },
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
                    id: 'linkedin-text',
                    type: 'link',
                    pathWithFallback: {
                      path: 'data.links.linkedin.title',
                      fallback: 'LinkedIn',
                    },
                    hrefPathWithFallback: {
                      path: 'data.links.linkedin.link',
                      fallback: 'https://linkedin.com',
                    },
                    className: 'hover:text-blue-600',
                  },
                ],
              },
            ],
          },
        ],
      },

      // Summary
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
            className: 'text-lg font-bold text-black border-b-2 border-neutral-400 pb-1',
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
                  'text-sm text-neutral-700 text-justify [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
              },
            ],
          },
        ],
      },

      // Skills
      {
        id: 'skills',
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
            className: 'text-lg font-bold text-black border-b-2 border-neutral-400 pb-1',
          },
          {
            id: 'skills-list',
            type: 'list',
            pathWithFallback: { path: 'data.skills.items' },
            className: 'text-sm text-black leading-relaxed space-x-1',
            seperator: ',',
            presentation: [
              {
                type: 'text',
                pathWithFallback: { path: 'data.name' },
              },
            ],
          },
        ],
      },

      // Experience
      {
        id: 'experience-section',
        type: 'container',
        className: 'flex flex-col gap-2',
        break: true,
        children: [
          {
            id: 'experience-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.experience.heading',
              fallback: 'Experience',
            },
            className: 'text-lg font-bold text-black border-b-2 border-neutral-400 pb-1',
          },

          {
            id: 'experience',
            type: 'list',
            pathWithFallback: { path: 'data.experience.items' },
            className: 'flex flex-col gap-4',
            presentation: [
              {
                type: 'container',
                id: 'experience-item',
                className: 'flex flex-col gap-1',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-row flex-wrap justify-start gap-2 mt-2 text-sm text-black',
                    children: [
                      {
                        id: 'experience-company',
                        type: 'text',
                        pathWithFallback: { path: 'data.company' },
                        className: 'text-neutral-900 text-sm font-semibold',
                      },
                      { type: 'seperator', variant: 'pipe' },
                      {
                        id: 'experience-location',
                        type: 'text',
                        pathWithFallback: { path: 'data.location' },
                        className: 'text-neutral-900 text-sm font-semibold',
                      },
                    ],
                  },
                  // Second line: Role + Duration
                  {
                    type: 'container',
                    className: 'flex flex-row flex-wrap justify-start gap-2 text-sm text-black',
                    children: [
                      {
                        id: 'experience-role',
                        type: 'text',
                        pathWithFallback: { path: 'data.position' },
                        className: 'text-neutral-900 text-sm font-semibold',
                      },
                      { type: 'seperator', variant: 'pipe' },
                      {
                        id: 'experience-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-neutral-900 text-sm font-semibold',
                      },
                    ],
                  },
                  {
                    id: 'experience-bullets',
                    type: 'html',
                    pathWithFallback: { path: 'data.description' },
                    className: 'text-sm text-black break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
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
        className: 'flex flex-col gap-2',
        children: [
          {
            id: 'education-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.education.heading',
              fallback: 'Education',
            },
            className: 'text-lg font-bold text-black border-b-2 border-neutral-400 pb-1',
          },

          {
            id: 'education',
            type: 'list',
            pathWithFallback: { path: 'data.education.items' },
            className: 'flex flex-col gap-3',
            presentation: [
              {
                type: 'container',
                id: 'education-item',
                className: 'flex flex-col gap-1',
                children: [
                  {
                    type: 'container',
                    className: 'flex flex-row flex-wrap justify-start gap-2 text-sm text-black',
                    children: [
                      {
                        id: 'education-school',
                        type: 'text',
                        pathWithFallback: { path: 'data.institution' },
                        className: 'text-sm font-semibold',
                      },
                      { type: 'seperator', variant: 'pipe' },
                      {
                        id: 'education-location',
                        type: 'text',
                        pathWithFallback: { path: 'data.location', fallback: '' },
                        className: 'text-sm font-semibold',
                      },
                      {
                        id: 'education-degree',
                        type: 'text',
                        pathWithFallback: { path: 'data.degree' },
                        className: 'text-sm font-semibold',
                      },
                    ],
                  },
                  // Second line: Degree + Field + Period
                  {
                    type: 'container',
                    className: 'flex flex-row flex-wrap justify-start gap-2 text-sm text-black',
                    children: [
                      {
                        id: 'education-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-sm font-semibold',
                      },
                    ],
                  },
                  {
                    id: 'education-grade',
                    type: 'text',
                    pathWithFallback: { path: 'data.grade.value' },
                    className: 'text-sm text-black',
                  },
                ],
              },
            ],
          },
        ],
      },

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
                    // className: 'text-sm text-black',
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
        className: 'flex flex-col gap-2 mt-4',
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
                    className: 'text-sm text-neutral-700',
                  },
                  {
                    type: 'duration',
                    pathWithFallback: { path: 'data.duration' },
                    className: 'text-sm text-neutral-600 italic',
                  },
                  {
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
};

export default aniketTemplate2;
