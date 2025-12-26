// Flattened template structure matching standard format

const aniketTemplate2 = {
  name: "Aniket Modern Classic",

  page: {
    background: "#ffffff",
    className: "text-neutral-900 leading-relaxed",
    fontFamily: "Inter",
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
          className:
            "text-xl font-bold text-black border-b-2 border-neutral-400 pb-1",
        },
        contact: {
          type: "inline-group",
          className:
            "flex flex-row flex-wrap justify-start gap-2 text-sm text-black",
          separator: " | ",
          items: [
            { path: "personalDetails.items[0].phone", fallback: "Phone" },
            {
              type: "link",
              path: "personalDetails.items[0].email",
              href: "mailto:{{value}}",
              fallback: "Email",
              className: "hover:text-blue-600",
            },
            { path: "personalDetails.items[0].address", fallback: "City" },
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
      className: "flex flex-col mt-1",
      heading: {
        path: "summary.heading",
        fallback: "Summary",
        className: "text-lg font-bold text-black mt-4",
      },
      divider: {
        variant: "line",
        className: "bg-neutral-400 w-full h-[2px] mt-0.5",
      },
      content: {
        type: "html",
        path: "personalDetails.items[0].description",
        fallback: "Summary",
        className:
          "text-sm text-neutral-700 text-justify [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap mt-2",
      },
    },

    // Skills Section
    {
      id: "skills",
      type: "inline-list-section",
      heading: {
        path: "skills.heading",
        fallback: "Skills",
        className: "text-lg font-bold text-black mt-4",
        divider: {
          variant: "line",
          className: "bg-neutral-400 w-full h-[2px] mt-0.5",
        },
      },
      listPath: "skills.items",
      itemPath: "name",
      itemClassName: "text-sm text-black",
      containerClassName: "text-sm text-black leading-relaxed mt-2",
      itemSeparator: ", ",
    },

    // Experience Section
    {
      id: "experience",
      type: "list-section",
      break: true,
      heading: {
        path: "experience.heading",
        fallback: "Experience",
        className: "text-lg font-bold text-black mt-1",
        divider: {
          variant: "line",
          className: "bg-neutral-400 w-full h-[2px] mt-0.5 mb-1.5",
        },
      },
      listPath: "experience.items",
      itemTemplate: {
        className: "flex flex-col gap-1 mt-3",
        rows: [
          {
            className:
              "flex flex-row flex-wrap justify-start gap-2 text-sm text-black",
            cells: [
              {
                type: "inline-group",
                separator: " | ",
                items: [
                  { path: "company", className: "font-semibold" },
                  { path: "location", className: "font-semibold" },
                ],
              },
            ],
          },
          {
            className:
              "flex flex-row flex-wrap justify-start gap-2 text-sm text-black",
            cells: [
              {
                type: "inline-group",
                separator: " | ",
                items: [
                  { path: "position", className: "font-semibold" },
                  {
                    type: "duration",
                    path: "duration",
                    className: "font-semibold",
                  },
                ],
              },
            ],
          },
          {
            cells: [
              {
                type: "html",
                path: "description",
                className:
                  "text-sm text-black break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap",
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
      heading: {
        path: "education.heading",
        fallback: "Education",
        className: "text-lg font-bold text-black mt-4",
        divider: {
          variant: "line",
          className: "bg-neutral-400 w-full h-[2px] mt-0.5",
        },
      },
      listPath: "education.items",
      itemTemplate: {
        className: "flex flex-col gap-1 mt-3 leading-none",
        break: true,
        rows: [
          {
            className:
              "flex flex-row flex-wrap justify-start gap-2 text-sm text-black",
            cells: [
              {
                type: "inline-group",
                separator: " | ",
                items: [
                  { path: "institution", className: "font-semibold" },
                  {
                    path: "location",
                    fallback: "",
                    className: "font-semibold",
                  },
                  { path: "degree", className: "font-semibold" },
                ],
              },
            ],
          },
          {
            className:
              "flex flex-row flex-wrap justify-start gap-2 text-sm text-black",
            cells: [
              {
                type: "duration",
                path: "duration",
                className: "font-semibold",
              },
            ],
          },
          {
            cells: [
              {
                path: "grade.value",
                className: "text-sm text-black",
              },
            ],
          },
        ],
      },
    },

    // Interests Section
    {
      id: "interests",
      type: "badge-section",
      break: true,
      breakable: true,
      heading: {
        path: "interests.heading",
        fallback: "Interests",
        className: "text-lg font-bold text-black mt-4",
        divider: {
          variant: "line",
          className: "bg-neutral-400 w-full h-[2px] mt-0.5",
        },
      },
      listPath: "interests.items[0].items",
      badgeClassName: "text-sm text-black",
      containerClassName: "text-sm text-black leading-relaxed mt-2",
      itemSeparator: ", ",
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
        className: "text-lg font-bold text-black mt-4",
        divider: {
          variant: "line",
          className: "bg-neutral-400 w-full h-[2px] mt-0.5",
        },
      },
      listPath: "achievements.items[0].items",
      itemPrefix: "• ",
      badgeClassName: "text-sm text-black",
      containerClassName: "flex flex-col gap-1 mt-2",
    },

    // Certifications Section
    {
      id: "certifications",
      type: "list-section",
      break: true,
      heading: {
        path: "certifications.heading",
        fallback: "Certifications",
        className: "text-lg font-bold text-black mt-4",
        divider: {
          variant: "line",
          className: "bg-neutral-400 w-full h-[2px] mt-0.5 mb-1.5",
        },
      },
      listPath: "certifications.items",
      itemTemplate: {
        className: "flex flex-col mt-3",
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
            className: "text-sm text-neutral-700",
          },
          {
            type: "duration",
            path: "duration",
            className: "text-sm text-neutral-600 italic",
          },
          {
            type: "link",
            path: "link.title",
            href: "link.link",
            fallback: "",
            className: "text-sm text-blue-600 hover:underline mt-1",
          },
        ],
      },
    },
  ],
};

export default aniketTemplate2;
