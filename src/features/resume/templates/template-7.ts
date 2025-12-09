const template7 = {
  name: "Simran Professional",

  page: {
    background: "#ffffff",
    className: "text-neutral-900 leading-relaxed",
    fontFamily:
      '"Lato", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },

  sections: [
    // Header Section with Profile Photo and Name
    {
      id: "header",
      type: "header",
      className: "pt-6 pr-8 flex flex-row gap-6 item-start mb-2",
      break: true,
      fields: {
        profilePhoto: {
          type: "image",
          path: "personalDetails.items[0].profilePicturePublicUrl",
          fallback: "https://avatar.iran.liara.run/public",
          className:
            "w-32 h-32 rounded-full bg-gray-200 shrink-0 overflow-hidden object-cover",
        },
        nameTitleBlock: {
          type: "group",
          className: "flex flex-col flex-1",
          items: [
            {
              type: "text",
              path: "personalDetails.items[0].fullName",
              fallback: "John Doe",
              className: "text-3xl font-bold text-[#4178B4] leading-tight",
            },
            {
              type: "text",
              path: "personalDetails.items[0].jobTitle",
              fallback: "Mobile Developer",
              className: "text-base font-medium text-gray-700 mt-1",
            },
            {
              type: "html",
              path: "personalDetails.items[0].description",
              fallback:
                "Mobile Developer experienced in building and maintaining scalable cross-platform applications using React Native for both iOS (Swift) and Android (Kotlin).",
              className:
                "text-sm text-gray-700 leading-relaxed mt-2 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap",
            },
          ],
        },
      },
    },

    // Contact Information Bar
    {
      id: "contact-bar",
      type: "header",
      className:
        "border-b border-t border-black py-3 pl-14 -mx-6 bg-gray-50 mt-2",
      fields: {
        contact: {
          type: "contact-grid",
          className:
            "flex flex-row gap-4 items-center justify-start flex-wrap text-sm",
          items: [
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Mail",
                  size: 16,
                  className: "text-[#4178B4]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].email",
                  href: "mailto:{{value}}",
                  fallback: "simran.smjp@gmail.com",
                  className: "text-sm text-gray-800",
                },
              ],
            },
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Phone",
                  size: 16,
                  className: "text-[#4178B4]",
                },
                {
                  path: "personalDetails.items[0].phone",
                  fallback: "7042403591",
                  className: "text-sm text-gray-800",
                },
              ],
            },
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "MapPin",
                  size: 16,
                  className: "text-[#4178B4]",
                },
                {
                  path: "personalDetails.items[0].address",
                  fallback: "Gurugram, India",
                  className: "text-sm text-gray-800",
                },
              ],
            },
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Linkedin",
                  size: 16,
                  className: "text-[#4178B4]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].links.linkedin.title",
                  href: "personalDetails.items[0].links.linkedin.link",
                  fallback: "linkedin.com/in/simran-malhotra-65760053",
                  className: "text-sm text-gray-800 hover:text-blue-600",
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
                  size: 16,
                  className: "text-[#4178B4]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].links.github.title",
                  href: "personalDetails.items[0].links.github.link",
                  fallback: "github.com/username",
                  className: "text-sm text-gray-800 hover:text-blue-600",
                },
              ],
            },
          ],
        },
      },
    },

    // Skills Section
    {
      id: "skills",
      type: "badge-section",
      className: "px-8 pb-6 pt-3",
      heading: {
        path: "skills.heading",
        fallback: "SKILLS",
        className: "text-xl font-bold text-[#4178B4] tracking-wider mt-4",
      },
      listPath: "skills.items",
      itemPath: "name",
      badgeClassName: "px-2 py-1 bg-[#8CAADB] text-white text-sm rounded",
      containerClassName: "flex flex-wrap gap-2.5 mt-3",
    },

    // Work Experience Section
    {
      id: "experience",
      type: "list-section",
      className: "px-8 pb-4",
      break: true,
      heading: {
        path: "experience.heading",
        fallback: "WORK EXPERIENCE",
        className: "text-xl font-bold text-[#4178B4] mb-2 tracking-wide mt-4",
      },
      listPath: "experience.items",
      itemTemplate: {
        className: "flex flex-col mt-2 leading-none",
        rows: [
          {
            className: "flex flex-col",
            cells: [
              {
                path: "company",
                className: "text-base font-medium text-gray-900",
              },
              {
                path: "position",
                className: "text-sm font-medium text-gray-900",
              },
            ],
          },
          {
            className: "flex flex-row justify-between items-start",
            cells: [
              {
                type: "duration",
                path: "duration",
                className: "text-sm text-gray-500 italic",
              },
              { path: "location", className: "text-sm text-gray-500 italic" },
            ],
          },
          {
            cells: [
              {
                type: "html",
                path: "description",
                className:
                  "text-sm text-gray-800 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap",
              },
            ],
          },
        ],
      },
    },

    // Projects Section
    {
      id: "projects",
      type: "list-section",
      className: "px-8 pb-4",
      heading: {
        path: "projects.heading",
        fallback: "PROJECTS",
        className:
          "text-xl uppercase font-bold text-[#4178B4] mb-2 tracking-wide mt-4",
      },
      listPath: "projects.items",
      itemTemplate: {
        className: "flex flex-col mt-2",
        fields: [
          {
            path: "title",
            href: "link.link",
            fallback: "",
            className: "text-base font-medium text-gray-900",
          },
          {
            type: "duration",
            path: "duration",
            className: "text-sm text-gray-500 italic",
          },
          {
            type: "html",
            path: "description",
            className:
              "text-sm text-gray-800 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap",
          },
        ],
      },
    },

    // Interests Section
    {
      id: "interests",
      type: "badge-section",
      className: "px-8 pb-4",
      heading: {
        path: "interests.heading",
        fallback: "INTERESTS",
        className:
          "uppercase text-xl font-bold text-[#4178B4] tracking-wide mt-4",
      },
      listPath: "interests.items[0].items",
      itemPath: "",
      itemClassName: "text-sm text-black",
      containerClassName: "text-sm grid grid-cols-2 gap-x-4 gap-y-1 mt-2",
      itemPrefix: "• ",
    },

    // Achievements Section
    {
      id: "achievements",
      type: "badge-section",
      className: "px-8 pb-4",
      heading: {
        path: "achievements.heading",
        fallback: "ACHIEVEMENTS",
        className:
          "uppercase text-xl font-bold text-[#4178B4] tracking-wide mt-4 mb-2",
      },
      listPath: "achievements.items[0].items",
      itemPath: "",
      itemPrefix: "• ",
      itemClassName: "text-sm text-black",
      containerClassName: "text-sm flex flex-col gap-2",
    },

    // Certifications Section
    {
      id: "certifications",
      type: "list-section",
      className: "px-8 pb-4",
      heading: {
        path: "certifications.heading",
        fallback: "CERTIFICATIONS",
        className:
          "uppercase text-xl font-bold text-[#4178B4] tracking-wide mt-4",
      },
      listPath: "certifications.items",
      containerClassName: "grid grid-cols-2 gap-4 mt-2",
      itemTemplate: {
        className: "flex flex-col",
        fields: [
          {
            path: "title",
            fallback: "Certification Title",
            className: "text-base font-medium text-gray-900",
          },
          {
            path: "issuer",
            fallback: "Issuer",
            className: "text-sm text-gray-700",
          },
          {
            type: "duration",
            path: "duration",
            className: "text-sm text-gray-500 italic",
          },
        ],
      },
    },

    // Education Section
    {
      id: "education",
      type: "list-section",
      className: "px-8 pb-4",
      heading: {
        path: "education.heading",
        fallback: "EDUCATION",
        className: "text-xl font-bold text-[#4178B4] tracking-wide mt-4",
      },
      listPath: "education.items",
      itemTemplate: {
        className: "flex flex-col mt-2",
        rows: [
          {
            className: "flex flex-col leading-none",
            cells: [
              {
                path: "degree",
                className: "text-base font-medium text-gray-900",
              },
              { path: "institution", className: "text-sm text-gray-900" },
              { path: "grade.value", className: "text-sm text-gray-700" },
            ],
          },
          {
            className: "flex flex-row justify-between items-start",
            cells: [
              {
                type: "duration",
                path: "duration",
                className: "text-sm text-gray-500 italic",
              },
              { path: "location", className: "text-sm text-gray-500 italic" },
            ],
          },
        ],
      },
    },
  ],
};

export default template7;