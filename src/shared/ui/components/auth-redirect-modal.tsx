import { Button } from '@shared/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@shared/ui/dialog';
import { useRouter } from 'next/navigation';

interface AuthRedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
  title?: string;
  description?: string;
}

export function AuthRedirectModal({
  isOpen,
  onClose,
  redirectUrl = '/auth',
  title = 'Login Required',
  description = 'You need to login before this action.',
}: AuthRedirectModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    if (redirectUrl.startsWith('http')) {
      window.location.href = redirectUrl;
    } else {
      router.push(redirectUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
