'use client';

import { cn } from '@shared/lib/cn';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Underline as UnderlineIcon, Link as LinkIcon } from 'lucide-react';
import * as React from 'react';

interface TiptapTextAreaProps {
  defaultValue?: string;
  onChange?: (value: string, html: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minHeight?: string;
  maxHeight?: string;
  'aria-invalid'?: boolean;
  id?: string;
  showToolbar?: boolean;
}

interface FormatButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

const FormatButton: React.FC<FormatButtonProps> = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}) => (
  <button
    type="button"
    onClick={onClick}
    onMouseDown={(e) => {
      // Prevent losing focus when clicking toolbar buttons
      e.preventDefault();
    }}
    disabled={disabled}
    title={title}
    className={cn(
      'inline-flex items-center justify-center w-[18px] h-[18px] rounded-sm text-xs transition-colors',
      'hover:bg-muted focus:outline-none focus:ring-1 focus:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50 text-gray-1000',
      isActive && 'bg-muted ',
    )}
  >
    {children}
  </button>
);

const TiptapTextArea = React.forwardRef<HTMLDivElement, TiptapTextAreaProps>(
  (
    {
      defaultValue = '',
      onChange,
      onBlur,
      placeholder = 'Enter text...',
      className,
      disabled = false,
      minHeight = '238px',
      maxHeight = '238px',
      'aria-invalid': ariaInvalid,
      id,
      showToolbar = true,
      ...props
    },
    ref,
  ) => {
    const [isToolbarVisible, setIsToolbarVisible] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: false,
          bulletList: {
            keepMarks: true,
            keepAttributes: true,
            HTMLAttributes: {
              style: 'list-style-type: disc;',
            },
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: true,
            HTMLAttributes: {
              style: 'list-style-type: decimal;',
            },
          },
          hardBreak: {
            keepMarks: false,
          },
        }),
        Placeholder.configure({
          placeholder,
        }),
        Underline,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-primary underline underline-offset-4',
          },
        }),
      ],
      content: defaultValue,
      immediatelyRender: false,
      editable: !disabled,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        const value = editor.getText();
        onChange?.(value, html);
      },
      onFocus: () => {
        setIsToolbarVisible(true);
      },
      onBlur: () => {
        // Delay hiding to allow toolbar clicks
        setTimeout(() => {
          setIsToolbarVisible(false);
        }, 150);
        onBlur?.();
      },
    });

    // Update editor editable state when disabled prop changes
    React.useEffect(() => {
      if (editor) {
        editor.setEditable(!disabled);
      }
    }, [disabled, editor]);

    const setLink = React.useCallback(() => {
      if (!editor) return;

      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      // update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    return (
      <div className="relative" ref={containerRef}>
        <div
          ref={ref}
          data-slot="textarea"
          className={cn(
            'placeholder:text-[#CFD4DB] selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-2xl border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            className,
          )}
          style={{
            minHeight,
            maxHeight,
          }}
          aria-invalid={ariaInvalid}
          id={id}
          {...props}
        >
          <EditorContent
            editor={editor}
            className={cn(
              'prose prose-sm max-w-none w-full overflow-y-auto px-3 py-2',
              'prose-p:text-sm prose-p:leading-relaxed prose-p:mt-0 prose-p:mb-2',
              'prose-ul:text-sm prose-ul:mt-0 prose-ul:mb-2 prose-ul:list-disc prose-ul:pl-6',
              'prose-ol:text-sm prose-ol:mt-0 prose-ol:mb-2 prose-ol:list-decimal prose-ol:pl-6',
              'prose-li:mt-0 prose-li:mb-1 prose-li:marker:text-gray-600',
              'prose-strong:font-semibold',
              'prose-em:italic  ml-2',
              'prose-a:text-primary prose-a:underline prose-a:underline-offset-4',
              '[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-full',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none',
              '[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0',
              '[&_ul]:list-disc [&_ol]:list-decimal [&_li]:list-item',
              '[&_ul]:ml-0 [&_ol]:ml-0 [&_li]:ml-0',
            )}
          />
        </div>

        {showToolbar && editor && isToolbarVisible && (
          <div
            className={cn(
              'absolute bottom-2 left-2 z-50',
              'flex items-center gap-1 p-2',
              'bg-background border border-gray-200 rounded-lg shadow-lg',
              'backdrop-blur-sm bg-background/95',
              'transition-all duration-200 ease-in-out',
              'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2',
            )}
          >
            <FormatButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              disabled={disabled}
              title="Bold (Ctrl+B)"
            >
              <Bold size={14} />
            </FormatButton>

            <FormatButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              disabled={disabled}
              title="Italic (Ctrl+I)"
            >
              <Italic size={14} />
            </FormatButton>

            <FormatButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              disabled={disabled}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon size={14} />
            </FormatButton>

            <FormatButton
              onClick={setLink}
              isActive={editor.isActive('link')}
              disabled={disabled}
              title="Add Link (Ctrl+K)"
            >
              <LinkIcon size={14} />
            </FormatButton>

            <div className="w-px h-4 bg-border mx-1" />

            <FormatButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              disabled={disabled}
              title="Bullet List"
            >
              <List size={14} />
            </FormatButton>

            <FormatButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              disabled={disabled}
              title="Numbered List"
            >
              <ListOrdered size={14} />
            </FormatButton>
          </div>
        )}
      </div>
    );
  },
);

TiptapTextArea.displayName = 'TiptapTextArea';

export { TiptapTextArea };
