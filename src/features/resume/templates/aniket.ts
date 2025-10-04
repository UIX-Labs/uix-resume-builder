const aniketTemplate1 = {
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
            className: 'flex flex-col items-start justify-center text-center',
            break: true,
            children: [
              {
                id: 'name-text',
                type: 'text',
                pathWithFallback: {
                  path: 'data.fullName',
                  fallback: 'Your Name',
                },
                className: 'tracking-wide text-3xl font-extrabold text-blue-600',
              },
              {
                id: 'contact-section',
                type: 'container',
                className: 'flex flex-row flex-wrap justify-start gap-2 mt-2 text-xs text-neutral-600',
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
                    pathWithFallback: { path: 'data.phone', fallback: 'Phone' },
                  },
                  { type: 'seperator', variant: 'pipe' },
                  {
                    id: 'email-link',
                    type: 'link',
                    pathWithFallback: { path: 'data.email', fallback: 'Email' },
                    href: 'mailto:aniket@gmail.com',
                    className: 'hover:text-blue-600',
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
                    href: 'https://www.linkedin.com/in/aniket98/',
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
            className: 'uppercase tracking-wide text-xs font-semibold text-blue-600',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'border-neutral-300',
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
                className: 'text-xs text-neutral-700 text-justify',
              },
            ],
          },
        ],
      },

      // Skills
      {
        id: 'skills',
        type: 'container',
        className: 'flex flex-col gap-2',
        children: [
          {
            id: 'skills-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.skills.heading',
              fallback: 'Skills',
            },
            className: 'uppercase tracking-wide text-xs font-semibold text-blue-600',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'border-neutral-300',
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
                className: 'px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs font-medium',
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
            className: 'uppercase tracking-wide text-xs font-semibold text-blue-600',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'border-neutral-300',
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
                    className: 'flex flex-row justify-between items-center',
                    children: [
                      {
                        id: 'experience-company',
                        type: 'text',
                        pathWithFallback: { path: 'data.company' },
                        className: 'text-neutral-900 text-sm font-semibold',
                      },
                      {
                        id: 'experience-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-neutral-600 text-xs',
                      },
                    ],
                  },
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-center',
                    children: [
                      {
                        id: 'experience-role',
                        type: 'text',
                        pathWithFallback: { path: 'data.position' },
                        className: 'text-xs italic text-blue-600',
                      },
                      {
                        id: 'experience-location',
                        type: 'text',
                        pathWithFallback: { path: 'data.location' },
                        className: 'text-xs italic text-neutral-600',
                      },
                    ],
                  },
                  {
                    id: 'experience-bullets',
                    type: 'html',
                    pathWithFallback: { path: 'data.description' },
                    className: 'text-xs text-neutral-700 text-justify',
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
            className: 'uppercase tracking-wide text-xs font-semibold text-blue-600',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'border-neutral-300',
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
                    className: 'flex flex-row justify-between items-center',
                    children: [
                      {
                        id: 'education-school',
                        type: 'text',
                        pathWithFallback: { path: 'data.institution' },
                        className: 'text-blue-600 text-sm font-semibold',
                      },
                      {
                        id: 'education-period',
                        type: 'duration',
                        pathWithFallback: {
                          path: 'data.duration',
                          fallback: 'Start Date',
                        },
                        className: 'text-xs text-neutral-700 text-justify italic',
                      },
                    ],
                  },
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-center',
                    children: [
                      {
                        type: 'container',
                        className: 'flex flex-row justify-between items-center gap-1',
                        children: [
                          {
                            id: 'education-degree',
                            type: 'text',
                            pathWithFallback: { path: 'data.degree' },
                            className: 'text-xs font-semibold',
                          },
                          {
                            type: 'text',
                            pathWithFallback: {
                              path: 'data.fieldOfStudy',
                              fallback: 'Field of Study',
                            },
                            className: 'text-xs text-neutral-700 italic',
                          },
                        ],
                      },

                      {
                        id: 'education-grade',
                        type: 'text',
                        pathWithFallback: { path: 'data.grade' },
                        className: 'text-xs text-neutral-700',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: 'projects-section',
        type: 'container',
        className: 'flex flex-col gap-2',
        children: [
          {
            id: 'projects-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.projects.title',
              fallback: 'Projects',
            },
            className: 'uppercase tracking-wide text-xs font-semibold text-blue-600',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'border-neutral-300',
          },
          {
            type: 'list',
            id: 'projects-list',
            pathWithFallback: { path: 'data.projects.items' },
            className: 'flex flex-col gap-4',
            presentation: [
              {
                type: 'container',
                className: 'flex flex-col gap-1',
                children: [
                  // Project Title
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.title',
                      fallback: 'Project Title',
                    },
                    className: 'text-sm font-semibold text-neutral-900',
                  },

                  // Duration (Start - End)
                  {
                    type: 'duration',
                    pathWithFallback: {
                      path: 'data.duration',
                      fallback: '',
                    },
                    className: 'text-xs text-neutral-600 italic',
                  },

                  // Description
                  {
                    type: 'html',
                    pathWithFallback: {
                      path: 'data.description',
                      fallback: '',
                    },
                    className: 'text-xs text-neutral-700 text-justify',
                  },

                  // Project Link
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
            className: 'uppercase tracking-wide text-xs font-semibold text-blue-600',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'border-neutral-300',
          },
          {
            id: 'interests-list',
            type: 'list',
            pathWithFallback: { path: 'data.interests.items' },
            className: 'flex gap-1',
            presentation: [
              {
                type: 'list',
                className: 'flex gap-1',
                pathWithFallback: { path: 'data.items' },
                presentation: [
                  {
                    type: 'container',
                    className: 'flex flex-wrap gap-1',
                    children: [
                      {
                        type: 'text',
                        className: 'px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs font-medium',
                      },
                    ],
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
            className: 'uppercase tracking-wide text-xs font-semibold text-blue-600',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'border-neutral-300',
          },
          {
            id: 'achievements-list',
            type: 'list',
            pathWithFallback: { path: 'data.achievements.items' },
            className: 'flex gap-1',
            presentation: [
              {
                type: 'list',
                className: 'flex gap-1',
                pathWithFallback: { path: 'data.items' },
                presentation: [
                  {
                    type: 'container',
                    className: 'flex flex-wrap gap-1',
                    children: [
                      {
                        type: 'text',
                        className: 'px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs font-medium',
                      },
                    ],
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
            className: 'uppercase tracking-wide text-xs font-semibold text-blue-600',
          },
          {
            type: 'seperator',
            variant: 'line',
            className: 'border-neutral-300',
          },
          {
            type: 'list',
            id: 'certifications-list',
            className: 'flex flex-col gap-4 px-2',
            pathWithFallback: { path: 'data.certifications.items' },
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

export default aniketTemplate1;
