import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/button';
import Image from 'next/image';

interface MobileTemplateButtonProps {
  onClick?: () => void;
  className?: string;
}

export function MobileTemplateButton({ onClick, className }: MobileTemplateButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full h-12 flex flex-col items-center justify-center gap-1',
        'text-gray-600 hover:text-gray-900',
        'bg-white hover:bg-gray-50',
        'rounded-xl py-2',
        className,
      )}
    >
      <Image
        src="/images/Vector.png"
        alt="change template"
        width={28}
        height={28}
        className="brightness-0 saturate-100 opacity-60 hover:opacity-100 transition-opacity"
      />
      <span className="text-xs font-medium">Template</span>
    </Button>
  );
}
