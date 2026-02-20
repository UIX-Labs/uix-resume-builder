import { Button } from '@shared/ui/button';
import { MobileTemplateButton } from '@shared/ui/components/mobile-template-button';
import { MobileDownloadButton } from '@shared/ui/components/mobile-download-button';
import { Eye } from 'lucide-react';

interface MobileFooterProps {
  onDownloadPDF: () => void;
  onPreview: () => void;
  isGeneratingPDF: boolean;
  downloadsLeft?: number;
  downloadsAllowed?: number;
  isLoggedIn?: boolean;
  children?: React.ReactNode;
}

export function MobileFooter({
  onDownloadPDF,
  onPreview,
  isGeneratingPDF,
  downloadsLeft = 3,
  downloadsAllowed = 3,
  isLoggedIn = false,
  children,
}: MobileFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-3 flex items-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <MobileDownloadButton
        onClick={onDownloadPDF}
        downloadsLeft={downloadsLeft}
        downloadsAllowed={downloadsAllowed}
        isGenerating={isGeneratingPDF}
        isLoggedIn={isLoggedIn}
      />
      {children ? <div className="flex-1 flex items-center justify-center">{children}</div> : <MobileTemplateButton />}
      <Button
        type="button"
        onClick={onPreview}
        className="flex-1 flex flex-col items-center justify-center gap-1 h-12 text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-xl py-2"
      >
        <Eye className="size-7" /> <span className="text-xs font-medium">Preview</span>
      </Button>
    </div>
  );
}
