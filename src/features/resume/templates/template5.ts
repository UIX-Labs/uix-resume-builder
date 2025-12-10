// Flattened template structure with standard two-column layout

const template5 = {
  name: "Divyam Modern Professional",

  page: {
    background: "#ffffff",
    className: "text-neutral-900 leading-relaxed",
    padding: 0,
    fontFamily: 'Merriweather, "PT Serif", Georgia, serif',
  },

  columns: {
    spacing: "0px",
    left: {
      width: "300px",
      className: "bg-[#C9D6EC] text-white p-10",
    },
    right: {
      width: "calc(100% - 300px)",
      className: "p-10 gap-3",
    },
  },

  sections: [
    // Name Section (Header) - Left Column
    {
      id: "header",
      type: "header",
      column: "left",
      className: "flex flex-col text-center gap-2",
      fields: {
        name: {
          path: "personalDetails.items[0].fullName",
          fallback: "Divyam Malik",
          className: "text-3xl font-bold text-[#1a1a1a]",
        },
        title: {
          path: "personalDetails.items[0].jobTitle",
          fallback: "Technical Lead, Sopra Steria",
          className: "text-lg font-normal text-[#1a1a1a]",
        },
      },
    },

    // Contact Information - Left Column
    {
      id: "header",
      type: "header",
      column: "left",
      className:
        "flex flex-col gap-1.5 p-4 border border-[#5b7fc7] rounded-sm mt-6",
      fields: {
        contact: {
          type: "contact-grid",
          className: "flex flex-col gap-1.5",
          items: [
            // Address
            {
              type: "inline-group-with-icon",
              className: "flex items-start gap-3",
              items: [
                {
                  type: "icon",
                  name: "MapPin",
                  size: 18,
                  className: "text-[#5b7fc7] mt-0.5",
                },
                {
                  path: "personalDetails.items[0].address",
                  fallback: "Noida",
                  className: "text-sm text-[#1a1a1a] font-normal",
                },
              ],
            },
            // Phone
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-3",
              items: [
                {
                  type: "icon",
                  name: "Phone",
                  size: 18,
                  className: "text-[#5b7fc7]",
                },
                {
                  path: "personalDetails.items[0].phone",
                  fallback: "+918527886118",
                  className: "text-sm text-[#1a1a1a] font-normal underline",
                },
              ],
            },
            // Email
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-3",
              items: [
                {
                  type: "icon",
                  name: "Mail",
                  size: 18,
                  className: "text-[#5b7fc7]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].email",
                  href: "mailto:{{value}}",
                  fallback: "divyam.malik@gmail.com",
                  className:
                    "text-sm text-[#1a1a1a] font-normal underline break-all whitespace-normal",
                },
              ],
            },
            // LinkedIn
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Linkedin",
                  size: 20,
                  className: "text-[#5b7fc7]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].links.linkedin.title",
                  href: "personalDetails.items[0].links.linkedin.link",
                  fallback: "Divyam Malik",
                  className: "text-sm text-[#1a1a1a] font-normal underline",
                },
              ],
            },
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Github",
                  size: 20,
                  className: "text-[#5b7fc7]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].links.github.title",
                  href: "personalDetails.items[0].links.github.link",
                  fallback: "GitHub",
                  className: "text-sm text-[#1a1a1a] font-normal underline mt-1",
                },
              ],
            },
          ],
        },
      },
    },

    // Skills Section - Left Column
    {
      id: "skills",
      type: "list-section",
      column: "left",
      break: true,
      className: "mt-6",
      heading: {
        path: "skills.heading",
        fallback: "Skills",
        className: "text-base font-bold text-[#5b7fc7] mt-4",
        divider: {
          variant: "line",
          className: "bg-[#5b7fc7] w-full h-[1px] mt-1 mb-2",
        },
      },
      listPath: "skills.items",
      containerClassName: "flex flex-col gap-2 mt-2",
      itemTemplate: {
        className: "flex flex-col leading-none",
        fields: [
          {
            path: "name",
            className: "text-sm font-regular text-[#1a1a1a] mb-1",
          },
          {
            path: "level",
            className: "text-xs text-[#1a1a1a] font-normal mb-2",
          },
        ],
      },
    },

    // Certifications Section - Left Column
    {
      id: "certifications",
      type: "list-section",
      column: "left",
      break: true,
      className: "mt-6",
      heading: {
        path: "certifications.title",
        fallback: "Certifications",
        className: "capitalize text-base font-bold text-[#5b7fc7] mt-4",
        divider: {
          variant: "line",
          className: "bg-[#5b7fc7] w-full h-[1px] mt-1 mb-2",
        },
      },
      listPath: "certifications.items",
      containerClassName: "flex flex-col gap-3 mt-2",
      itemTemplate: {
        className: "flex flex-col",
        fields: [
          {
            path: "title",
            fallback: "Certification Title",
            className: "text-sm font-bold text-[#1a1a1a]",
          },
          {
            path: "issuer",
            fallback: "Issuer",
            className: "text-sm text-[#1a1a1a] font-normal mb-3",
          },
          {
            type: "duration",
            path: "duration",
            className: "text-sm text-[#1a1a1a]",
          },
        ],
      },
    },

    // Interests Section - Left Column
    {
      id: "interests",
      type: "badge-section",
      column: "left",
      break: false,
      className: "mt-6",
      heading: {
        path: "interests.title",
        fallback: "Interests",
        className: "capitalize text-base font-bold text-[#5b7fc7] mt-4",
        divider: {
          variant: "line",
          className: "bg-[#5b7fc7] w-full h-[1px] mt-1",
        },
      },
      listPath: "interests.items[0].items",
      itemPath: "",
      badgeClassName: "text-sm text-[#1a1a1a] leading-none",
      containerClassName: "flex flex-col gap-2 mt-2",
    },

    // Experience Section - Right Column
    {
      id: "experience",
      type: "list-section",
      column: "right",
      break: true,
      heading: {
        path: "experience.heading",
        fallback: "Experience",
        className: "text-base font-semibold text-[rgb(56,76,65)]",
        divider: {
          variant: "line",
          className: "bg-gray-800 w-full h-[1px] mt-1",
        },
      },
      listPath: "experience.items",
      containerClassName: "flex flex-col gap-6 mt-2",
      itemTemplate: {
        className: "flex flex-col leading-none",
        rows: [
          {
            className: "flex flex-row justify-between items-baseline mt-2",
            cells: [
              {
                path: "company",
                className:
                  "text-sm font-bold text-[rgb(0,0,0)] leading-none max-w-[65%] min-w-0 break-words",
              },
              {
                type: "duration",
                path: "duration",
                className:
                  "text-sm font-bold text-[rgb(0,0,0)] leading-none whitespace-nowrap",
              },
            ],
          },
          {
            cells: [
              {
                path: "position",
                className: "text-sm font-normal text-[rgb(0,0,0)]",
              },
            ],
          },
          {
            cells: [
              {
                type: "html",
                path: "description",
                className:
                  "text-sm text-[rgb(0,0,0)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words mt-1 whitespace-pre-wrap",
              },
            ],
          },
        ],
      },
    },

    // Projects Section - Right Column
    {
      id: "projects",
      type: "list-section",
      column: "right",
      break: true,
      className: "mt-6",
      heading: {
        path: "projects.title",
        fallback: "Projects",
        className:
          "capitalize text-base font-semibold text-[rgb(56,76,65)] mb-2",
        divider: {
          variant: "line",
          className: "bg-gray-800 w-full h-[1px] mt-1",
        },
      },
      listPath: "projects.items",
      containerClassName: "flex flex-col gap-6 mt-2",
      itemTemplate: {
        className: "flex flex-col",
        rows: [
          {
            className: "flex flex-row justify-between items-baseline",
            cells: [
              {
                path: "title",
                href: "link.link",
                fallback: "Project Title",
                className:
                  "text-sm font-bold text-[rgb(0,0,0)] hover:underline",
              },
              {
                type: "duration",
                path: "duration",
                className:
                  "text-sm font-bold text-[rgb(0,0,0)] whitespace-nowrap",
              },
            ],
          },
          {
            cells: [
              {
                type: "html",
                path: "description",
                className:
                  "text-sm text-[rgb(0,0,0)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words mt-1 whitespace-pre-wrap",
              },
            ],
          },
        ],
      },
    },

    // Education Section - Right Column
    {
      id: "education",
      type: "list-section",
      column: "right",
      break: true,
      className: "mt-6",
      heading: {
        path: "education.heading",
        fallback: "Education",
        className: "text-base font-semibold text-[rgb(56,76,65)] mb-2",
        divider: {
          variant: "line",
          className: "bg-gray-800 w-full h-[1px] mt-1",
        },
      },
      listPath: "education.items",
      containerClassName: "flex flex-col gap-6 mt-2",
      itemTemplate: {
        className: "flex flex-col",
        rows: [
          {
            className: "flex flex-row justify-between items-start",
            cells: [
              {
                path: "institution",
                className:
                  "text-sm font-bold text-[rgb(0,0,0)] break-words whitespace-normal max-w-[55%]",
              },
              {
                type: "inline-group",
                className: "flex flex-col items-end text-right",
                items: [
                  {
                    type: "duration",
                    path: "duration",
                    className:
                      "text-sm font-bold text-[rgb(0,0,0)] whitespace-nowrap",
                  },
                  {
                    path: "degree",
                    className:
                      "text-sm font-normal text-[rgb(0,0,0)] text-right",
                  },
                ],
              },
            ],
          },
        ],
      },
    },

    // Achievements Section - Right Column
    {
      id: "achievements",
      type: "badge-section",
      column: "right",
      break: true,
      className: "mt-6",
      heading: {
        path: "achievements.title",
        fallback: "Achievements",
        className: "capitalize text-base font-semibold text-[rgb(56,76,65)]",
        divider: {
          variant: "line",
          className: "bg-gray-800 w-full h-[1px] mt-1",
        },
      },
      listPath: "achievements.items[0].items",
      itemPath: "",
      badgeClassName: "text-sm text-black",
      containerClassName: "flex flex-col gap-2 mt-2",
      itemPrefix: "• ",
    },
  ],
};

export default template5;
