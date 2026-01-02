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

          let backgroundColor = '';

          if (
            attributes.color === 'yellow' ||
            attributes.color === '#FFD700' ||
            attributes.color.includes('spelling')
          ) {
            backgroundColor = 'rgba(255, 215, 0, 0.3)'; // Yellow for spelling errors
          } else if (
            attributes.color === 'rgba(255, 0, 0, 0.15)' ||
            attributes.color === 'rgba(255, 0, 0, 0.15)' ||
            attributes.color.includes('sentence')
          ) {
            backgroundColor = 'rgba(255, 0, 0, 0.15)'; // Light red for weak sentences
          } else {
            backgroundColor = attributes.color;
          }

          return {
            'data-error-type': attributes.color.includes('spelling') ? 'spelling' : 'sentence',
            style: `background-color: ${backgroundColor}; padding: 2px 0; border-radius: 2px;`,
          };
        },
      },

      priority: {
        default: 0,
        parseHTML: (element) => element.getAttribute('data-priority'),
        renderHTML: (attributes) => {
          return {
            'data-priority': attributes.priority || 0,
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
          // We use CSS text-decoration directly in the style attribute,
          // so we don't need TipTap's underline mark (which creates <u> tags)
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
