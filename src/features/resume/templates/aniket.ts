const aniketTemplate1 = {
  name: "Aniket Modern Classic",

  page: {
    background: "#ffffff",
    className: "text-neutral-900 leading-relaxed",
    fontFamily: "Inter, sans-serif",
  },

  sections: [
    // Header Section
    {
      id: "header",
      type: "header",
      className: "flex flex-col gap-2",
      fields: {
        name: {
          path: "personalDetails.items[0].fullName",
          fallback: "Your Name",
          className: "tracking-wide text-3xl font-extrabold text-blue-600",
        },
        contact: {
          type: "inline-group",
          className:
            "flex flex-row flex-wrap justify-start gap-2 text-xs text-neutral-600",
          separator: " | ",
          items: [
            {
              path: "personalDetails.items[0].address",
              fallback: "City",
            },
            { path: "personalDetails.items[0].phone", fallback: "Phone" },
            {
              type: "link",
              path: "personalDetails.items[0].email",
              href: "mailto:{{value}}",
              fallback: "Email",
              className: "hover:text-blue-600",
            },
            {
              type: "link",
              path: "personalDetails.items[0].links.linkedin.title",
              href: "personalDetails.items[0].links.linkedin.link",
              className: "hover:text-blue-600",
            },
            {
              type: "link",
              path: "personalDetails.items[0].links.github.title",
              href: "personalDetails.items[0].links.github.link",
              className: "hover:text-blue-600",
            },
            {
              type: "link",
              path: "personalDetails.items[0].links.website.title",
              href: "personalDetails.items[0].links.website.link",
              className: "hover:text-blue-600",
            },
            {
              type: "link",
              path: "personalDetails.items[0].links.youtube.title",
              href: "personalDetails.items[0].links.youtube.link",
              className: "hover:text-blue-600",
            },
            {
              type: "link",
              path: "personalDetails.items[0].links.dribble.title",
              href: "personalDetails.items[0].links.dribble.link",
              className: "hover:text-blue-600",
            },
            {
              type: "link",
              path: "personalDetails.items[0].links.behance.title",
              href: "personalDetails.items[0].links.behance.link",
              className: "hover:text-blue-600",
            },
          ],
        },
      },
    },
    // Summary Section
    {
      id: "summary",
      type: "content-section",
      className: "flex flex-col gap-2 mt-5",
      heading: {
        path: "summary.heading",
        fallback: "Summary",
        className:
          "uppercase tracking-wide text-xs font-semibold text-blue-600",
      },
      divider: { variant: "line", className: "border-neutral-300" },
      content: {
        type: "html",
        path: "personalDetails.items[0].description",
        fallback: "Summary",
        className: "text-xs text-neutral-700 text-justify whitespace-pre-wrap",
      },
    },

    // Skills Section
    {
      id: "skills",
      type: "badge-section",
      heading: {
        path: "skills.heading",
        fallback: "Skills",
        className:
          "uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5",
        divider: { variant: "line", className: "border-neutral-300" },
      },
      listPath: "skills.items",
      itemPath: "name",
      badgeClassName:
        "px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs font-medium",
      containerClassName: "flex flex-wrap gap-1",
    },

    // Experience Section
    {
      id: "experience",
      type: "list-section",
      break: true,
      heading: {
        path: "experience.heading",
        fallback: "Experience",
        className:
          "uppercase tracking-wide text-xs font-semibold text-blue-600 mt-4 mb-2",
        divider: { variant: "line", className: "border-neutral-300" },
      },
      listPath: "experience.items",
      itemTemplate: {
        className: "flex flex-col mt-4",
        rows: [
          {
            className:
              "flex flex-row justify-between items-center leading-none",
            cells: [
              {
                path: "company",
                className: "text-neutral-900 text-sm font-semibold",
              },
              {
                type: "duration",
                path: "duration",
                className: "text-neutral-600 text-xs",
              },
            ],
          },
          {
            className:
              "flex flex-row justify-between items-center leading-none",
            cells: [
              {
                path: "position",
                className: "text-xs italic text-blue-600",
              },
              {
                path: "location",
                className: "text-xs italic text-neutral-600",
              },
            ],
          },
          {
            cells: [
              {
                type: "html",
                path: "description",
                className:
                  "text-xs text-neutral-700 text-justify mt-1 whitespace-pre-wrap",
              },
            ],
          },
        ],
      },
    },

    // Education Section
    {
      id: "education",
      type: "list-section",
      break: false,
      heading: {
        path: "education.heading",
        fallback: "Education",
        className:
          "uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5",
        divider: { variant: "line", className: "border-neutral-300" },
      },
      listPath: "education.items",
      itemTemplate: {
        className: "flex flex-col mt-2 leading-tight",
        rows: [
          {
            className: "flex flex-row justify-between items-center",
            cells: [
              {
                path: "institution",
                className: "text-blue-600 text-sm font-semibold",
              },
              {
                type: "duration",
                path: "duration",
                fallback: "Start Date",
                className: "text-xs text-neutral-700 text-justify italic",
              },
            ],
          },
          {
            className:
              "flex flex-row justify-between items-center leading-none",
            cells: [
              {
                type: "inline-group",
                className: "flex flex-row gap-1 items-center",
                separator: " ",
                items: [
                  {
                    path: "degree",
                    className: "text-xs font-semibold",
                  },
                  {
                    path: "fieldOfStudy",
                    fallback: "Field of Study",
                    className: "text-xs text-neutral-700 italic",
                  },
                ],
              },
              {
                path: "grade.value",
                className: "text-xs text-neutral-700",
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
      break: true,
      heading: {
        path: "projects.heading",
        fallback: "Projects",
        className:
          "uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5",
        divider: { variant: "line", className: "border-neutral-300" },
      },
      listPath: "projects.items",
      itemTemplate: {
        className: "flex flex-col gap-1 mt-4",
        break: true,
        fields: [
          {
            path: "title",
            fallback: "Project Title",
            className: "text-sm font-semibold text-neutral-900",
          },
          {
            type: "duration",
            path: "duration",
            fallback: "",
            className: "text-xs text-neutral-600 italic",
          },
          {
            type: "html",
            path: "description",
            fallback: "",
            break: true,
            className:
              "text-xs text-neutral-700 text-justify whitespace-pre-wrap",
          },
          {
            type: "link",
            path: "link.title",
            href: "link.link",
            fallback: "",
            className: "text-xs text-blue-600 hover:underline mt-1",
          },
        ],
      },
    },

    {
      id: "interests",
      type: "badge-section",
      column: "right",
      break: true,
      breakable: true,
      heading: {
        path: "interests.heading",
        fallback: "Interests",
        className:
          "uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5",
        divider: { variant: "line", className: "border-neutral-300" },
      },
      listPath: "interests.items[0].items",
      containerClassName: "flex flex-row flex-wrap gap-2 mt-2",
      badgeClassName:
        "flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs font-medium",
    },

    // Achievements Section
    {
      id: "achievements",
      type: "badge-section",
      break: true,
      breakable: true,
      heading: {
        path: "achievements.heading",
        fallback: "Achievements",
        className:
          "uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5",
        divider: { variant: "line", className: "border-neutral-300" },
      },
      listPath: "achievements.items[0].items",
      containerClassName: "flex flex-col gap-2",

      badgeClassName:
        "flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs mt-2 font-medium",
    },

    // Certifications Section
    {
      id: "certifications",
      type: "list-section",
      break: true,
      heading: {
        path: "certifications.heading",
        fallback: "Certifications",
        className:
          "uppercase tracking-wide text-xs font-semibold text-blue-600 mt-3 mb-1",
        divider: { variant: "line", className: "border-neutral-300" },
      },
      listPath: "certifications.items",
      itemTemplate: {
        className: "flex flex-col gap-1 leading-none",
        break: true,
        fields: [
          {
            path: "title",
            fallback: "Certification Title",
            className: "text-sm font-semibold text-neutral-900",
          },
          {
            path: "issuer",
            fallback: "Issuer",
            className: "text-xs text-neutral-700",
          },
          {
            type: "duration",
            path: "duration",
            className: "text-xs text-neutral-600 italic",
          },
          {
            type: "link",
            path: "link.title",
            href: "link.link",
            fallback: "",
            className: "text-xs text-blue-600 hover:underline mt-1",
          },
        ],
      },
    },
  ],
};

export default aniketTemplate1;
