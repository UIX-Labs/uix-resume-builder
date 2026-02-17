import { Button } from '@shared/ui/button';
import { MobileTemplateButton } from '@shared/ui/components/mobile-template-button';
import { Download, Eye } from 'lucide-react';

interface MobileFooterProps {
  onDownloadPDF: () => void;
  onPreview: () => void;
  isGeneratingPDF: boolean;
  children?: React.ReactNode;
}

export function MobileFooter({ onDownloadPDF, onPreview, isGeneratingPDF, children }: MobileFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-3 flex items-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <Button
        type="button"
        onClick={onDownloadPDF}
        disabled={isGeneratingPDF}
        className="flex-1 h-12 text-[15px] font-semibold rounded-xl bg-[#005FF2] hover:bg-[#0047B8] text-white flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        PDF
      </Button>
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
