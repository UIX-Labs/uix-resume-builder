import { X } from 'lucide-react';
import { Button } from '@shared/ui/components/button';

interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ isOpen, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[rgba(196,202,213,0.25)] backdrop-blur-sm z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-5">
        <div className="relative w-full max-w-[336px]">
          <Button
            onClick={onCancel}
            className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#0C1118] border-4 border-white flex items-center justify-center z-10 hover:bg-[#0C1118]"
          >
            <X size={16} className="text-white" />
          </Button>

          <div className="bg-white rounded-2xl border border-[#F4F4F4] shadow-[0px_6px_14px_0px_rgba(0,0,0,0.05)] p-4">
            <div className="flex flex-col items-center pt-12 pb-4">
              <h2 className="text-2xl font-semibold text-[#171717] text-center mb-2">Delete Resume</h2>
              <p className="text-lg text-[#72847F] text-center max-w-[285px]">
                This will permanently remove the selected resume
              </p>
            </div>

            <div className="flex items-center gap-2 mt-8">
              <Button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-[#E9F4FF] border border-[#CBE7FF] text-[#005FF2] font-semibold text-lg rounded-xl py-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] hover:bg-[#d9e9ff] transition-colors"
              >
                No
              </Button>
              <Button
                onClick={onConfirm}
                className="flex-1 bg-[#005FF2] text-[#F2F2F2] font-semibold text-lg rounded-xl py-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] hover:bg-[#0047b3] transition-colors"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
