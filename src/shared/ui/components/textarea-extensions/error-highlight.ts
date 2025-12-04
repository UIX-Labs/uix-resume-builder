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

          // Map error types to background colors
          let backgroundColor = '';
          if (attributes.color === 'yellow' || attributes.color === '#FFD700' || attributes.color.includes('spelling')) {
            backgroundColor = 'rgba(255, 215, 0, 0.3)'; // Yellow for spelling errors
          } else if (attributes.color === 'red' || attributes.color === '#FF0000' || attributes.color.includes('sentence')) {
            backgroundColor = 'rgba(255, 0, 0, 0.15)' // Light red for weak sentences
          } else {
            backgroundColor = attributes.color;
          }

          return {
            'data-error-color': attributes.color,
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
        getAttrs: (node) => {
          if (typeof node === 'string') return false;
          return {
            color: node.getAttribute('data-error-color'),
            priority: node.getAttribute('data-priority') || 0,
          };
        },
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
          // Determine priority: spelling errors (yellow) have higher priority
          const priority = color.includes('spelling') || color === 'yellow' || color === '#FFD700' ? 1 : 0;

          return commands.setMark(this.name, { color, priority });
        },
      unsetErrorHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  // Add priority to the mark to ensure spelling errors override sentence errors
  priority: 100,
});
