import { Dialog, DialogContent } from '@shared/ui/dialog';
import { Button } from '@shared/ui/components/button';
import { useRouter } from 'next/navigation';

interface WishlistSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistSuccessModal = ({ isOpen, onClose }: WishlistSuccessModalProps) => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    onClose();
    router.push('/dashboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-3xl  max-h-[80vh] overflow-y-auto rounded-[36px] !p-0 flex flex-col [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]_svg]:size-6 [&_[data-slot=dialog-close]_svg]:w-6 [&_[data-slot=dialog-close]_svg]:h-6"
        style={{
          backgroundImage: 'https://res.cloudinary.com/dkxocdrky/image/upload/v1765473849/waitlist-success_ucgu2m.svg',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex flex-col gap-6 px-8 py-12 text-center w-[60%] items-start">
          <h2 className="text-4xl font-bold text-white leading-tight text-left">You're on the Waitlist!</h2>

          <p className="text-base text-[#CCD4DF] leading-relaxed text-left">
            Thanks for joining! We'll review your request and notify you within 1–2 days if you're eligible for early
            access. Once approved, you'll be able to download your resume instantly.
          </p>

          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            className=" bg-transparent text-white rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            Back to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistSuccessModal;
