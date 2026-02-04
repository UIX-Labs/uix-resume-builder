import { Checkbox } from '@shared/ui/checkbox';
import { Button } from '@shared/ui/components/button';
import { Label } from '@shared/ui/label';
import { RadioGroupItem } from '@shared/ui/radio-group';
import { useId } from 'react';

interface HtmlContentProps {
  as?: 'span' | 'p';
  className?: string;
  content: string;
}

/**
 * Converts plain text with \n to HTML format
 */
export const processContentWithNewlines = (content: string): string => {
  if (!content) return '';

  // Check if content already contains HTML tags
  const hasHtmlTags = /<[^>]+>/.test(content);

  if (hasHtmlTags) {
    // If already has HTML, just replace \n with <br>
    return content.replace(/\n/g, '<br>');
  } else {
    // If plain text, wrap each line in <p> tags
    const lines = content.split('\n').filter((line) => line.trim());
    if (lines.length === 0) return '';
    if (lines.length === 1) return lines[0];
    return lines.map((line) => `<p>${line}</p>`).join('');
  }
};

const HtmlContent = ({ as = 'span', className, content }: HtmlContentProps) => {
  const Tag = as;
  const processedContent = processContentWithNewlines(content);
  // biome-ignore lint: suggestions include formatted HTML
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: processedContent }} />;
};

export const SuggestionCard = ({
  label,
  labelColor,
  borderColor,
  bgColor,
  children,
  htmlContent,
  checked,
  onChange,
  isGroup = false,
  labelBackgroundColor = 'white',
}: {
  label: string;
  labelColor?: string;
  borderColor?: string;
  bgColor: string;
  children?: React.ReactNode;
  htmlContent?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  isGroup?: boolean;
  labelBackgroundColor?: string;
}) => (
  <div className={`relative p-4 border rounded-lg text-black transition-colors`} style={{ backgroundColor: bgColor }}>
    <div
      className="absolute -top-2 left-0 px-2 py-0.5 rounded-full border"
      style={{
        borderColor,
        color: labelColor,
        background: labelBackgroundColor,
      }}
    >
      <span className="text-xs font-semibold">{label}</span>
    </div>

    {isGroup ? (
      <div className="flex flex-col gap-2 mt-2 w-full">{children}</div>
    ) : (
      <Button
        className="flex flex-row items-start gap-3 mt-2 px-4 pt-3 pb-6
 cursor-pointer bg-transparent hover:bg-transparent text-left max-w-full overflow-y-auto h-16"
        onClick={() => onChange?.(!checked)}
      >
        <Checkbox
          checked={checked}
          onCheckedChange={onChange}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 bg-white cursor-pointer"
        />
        <HtmlContent
          as="p"
          className="text-sm text-gray-900 flex-1 break-words whitespace-normal w-full"
          content={htmlContent ?? ''}
        />
      </Button>
    )}
  </div>
);

export const SuggestionItem = ({
  value,
  htmlContent,
  label,
  selected,
  variant = 'old',
}: {
  value: string;
  htmlContent: string;
  label?: string;
  selected: boolean;
  variant?: 'old' | 'new';
}) => {
  const inputId = useId();
  const baseClasses = 'relative flex w-full items-start gap-3 rounded-lg border border-transparent p-3  cursor-pointer';

  const variantClasses = variant === 'new' ? ' bg-white' : ' ';

  return (
    <Label htmlFor={inputId} className={`${baseClasses}${variantClasses}`} data-selected={selected}>
      {label && (
        <div className="absolute -top-3 left-0 bg-white px-2 py-0.5 rounded-full border border-[#81C784]">
          <span className="text-xs font-semibold text-[#2E7D32]">{label}</span>
        </div>
      )}
      <RadioGroupItem value={value} id={inputId} className="mt-1 bg-white" />
      <HtmlContent className="text-sm text-gray-900 flex-1" content={htmlContent} />
    </Label>
  );
};
