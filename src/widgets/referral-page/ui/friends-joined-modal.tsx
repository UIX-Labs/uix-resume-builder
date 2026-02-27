'use client';

import { X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Button } from '@shared/ui/button';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/lib/utils';

interface Friend {
  name: string;
  email: string;
}

interface FriendsJoinedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  friends: Friend[];
}

export function FriendsJoinedModal({ open, onOpenChange, friends }: FriendsJoinedModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isMobile) return;
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    },
    [onOpenChange, isMobile],
  );

  useEffect(() => {
    if (!open) return;

    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (isMobile) {
        document.body.style.overflow = '';
      }
    };
  }, [open, handleClickOutside, isMobile]);

  const friendsList = useMemo(
    () =>
      friends.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-sm text-sidebar-section-label">No friends joined yet</p>
        </div>
      ) : (
        friends.map((friend, index) => (
          <div key={index} className="flex flex-col gap-0.5">
            <span className="text-base font-normal leading-[1.375] tracking-[-0.011em] text-dark-900">
              {friend.name}
            </span>
            <span className="text-xs font-normal leading-[1.5] text-sidebar-section-label">{friend.email}</span>
          </div>
        ))
      ),
    [friends],
  );

  if (!open) return null;

  return (
    <>
      {isMobile && <div className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0 duration-200" />}

      <div
        ref={modalRef}
        className={cn(
          'z-50 w-67.5 bg-background-white rounded-[16px] border border-modal-border shadow-[0_6px_14px_0_rgba(0,0,0,0.05)] animate-in fade-in-0 duration-200 flex flex-col',
          isMobile
            ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 slide-in-from-bottom-4 max-h-120'
            : 'absolute -top-63 -right-6 zoom-in-95 min-h-53',
        )}
      >
        {/* Custom Header with gradient background */}
        <div className="relative bg-modal-header-bg h-10 rounded-t-[16px] flex items-center px-4 flex-shrink-0">
          <h3 className="text-lg font-semibold leading-[1.33] tracking-[-0.014em] text-dark-900">Friends Joined</h3>
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1.5 w-7 h-7 rounded-full bg-black hover:bg-black/90 transition-colors"
            aria-label="Close"
          >
            <X className="w-[10.89px] h-[10.89px] text-white" />
          </Button>
        </div>

        <div className="px-4 pb-4 pt-3 flex flex-col gap-3 overflow-y-auto max-h-110">{friendsList}</div>
      </div>
    </>
  );
}
