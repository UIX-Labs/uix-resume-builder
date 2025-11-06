import { Mark, mergeAttributes } from '@tiptap/core';

export interface ErrorHighlightOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    errorHighlight: {
      setErrorHighlight: (color: string) => ReturnType;
      unsetErrorHighlight: () => ReturnType;
    };
  }
}

export const ErrorHighlight = Mark.create<ErrorHighlightOptions>({
  name: 'errorHighlight',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-error-color'),
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }

          return {
            'data-error-color': attributes.color,
            style: `text-decoration: underline; text-decoration-color: ${attributes.color}; text-decoration-thickness: 2px; text-underline-offset: 2px;`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-error-color]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setErrorHighlight:
        (color: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { color });
        },
      unsetErrorHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
