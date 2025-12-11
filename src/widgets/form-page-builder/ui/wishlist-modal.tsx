import { Dialog, DialogContent } from "@shared/ui/dialog";
import { Button } from "@shared/ui/components/button";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  joinCommunity,
  type JoinCommunityResponse,
} from "@entities/download-pdf/api";
import { trackEvent } from "@shared/lib/analytics/Mixpanel";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinSuccess?: (response: JoinCommunityResponse) => void;
}

const WishlistModal = ({
  isOpen,
  onClose,
  onJoinSuccess,
}: WishlistModalProps) => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinWaitlist = async () => {
    setIsJoining(true);
    trackEvent('join_waitlist_click');
    try {
      const response = await joinCommunity();
      onClose();
      onJoinSuccess?.(response);
    } catch (error) {
      console.error("Failed to join waitlist:", error);
      toast.success("Successfully joined the waitlist!");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-3xl  max-h-[80vh] overflow-y-auto rounded-[36px] !p-0 flex flex-col [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]_svg]:size-6 [&_[data-slot=dialog-close]_svg]:w-6 [&_[data-slot=dialog-close]_svg]:h-6"
        style={{
          backgroundImage: "url(/images/waitlist.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col gap-6 px-8 py-12 text-center w-[60%] items-start">
          <h2 className="text-4xl font-bold text-white leading-tight text-left">
            We're handpicking our first 1k members
          </h2>

          <p className="text-sm text-[#CCD4DF] leading-relaxed text-left">
            Resume download is currently available only for our early members.
            Join the early access now to unlock your resume download.
          </p>

          <Button
            onClick={handleJoinWaitlist}
            disabled={isJoining}
            className=" bg-[rgb(0,95,242)] text-white rounded-xl text-sm font-semibold shadow-sm transition-all hover:bg-[rgb(0,81,217)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Lock className="w-5 h-5" />
            {isJoining ? "Joining..." : "Join Early Access"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistModal;
