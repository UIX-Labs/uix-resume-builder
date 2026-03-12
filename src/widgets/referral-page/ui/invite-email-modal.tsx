'use client';

import { useSendReferralEmails } from '@entities/referral/api/referral';
import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/components/input';
import { Modal, ModalBody } from '@shared/ui/components/modal';
import { Trash2, UserPlus, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface EmailInvite {
  id: string;
  firstName: string;
  email: string;
}

interface InviteEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteEmailModal({ isOpen, onClose }: InviteEmailModalProps) {
  const [invites, setInvites] = useState<EmailInvite[]>([{ id: '1', firstName: '', email: '' }]);
  const lastRowRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(invites.length);

  const sendEmailsMutation = useSendReferralEmails();

  useEffect(() => {
    if (invites.length > prevCountRef.current && prevCountRef.current >= 1) {
      lastRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    prevCountRef.current = invites.length;
  }, [invites.length]);

  const handleAddMore = useCallback(() => {
    setInvites((prevInvites) => [...prevInvites, { id: Date.now().toString(), firstName: '', email: '' }]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setInvites((prevInvites) => {
      if (prevInvites.length > 1) {
        return prevInvites.filter((invite) => invite.id !== id);
      }
      return prevInvites;
    });
  }, []);

  const handleChange = useCallback((id: string, field: 'firstName' | 'email', value: string) => {
    setInvites((prevInvites) =>
      prevInvites.map((invite) => (invite.id === id ? { ...invite, [field]: value } : invite)),
    );
  }, []);

  const handleSendInvite = useCallback(() => {
    const hasEmptyFields = invites.some((invite) => !invite.firstName || !invite.email);
    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasInvalidEmail = invites.some((invite) => !emailRegex.test(invite.email));
    if (hasInvalidEmail) {
      toast.error('Please enter valid email addresses');
      return;
    }

    const recipients = invites.map((invite) => ({
      name: invite.firstName,
      email: invite.email,
    }));

    sendEmailsMutation.mutate(recipients, {
      onSuccess: () => {
        toast.success(`Invitation${invites.length > 1 ? 's' : ''} sent successfully!`);
        onClose();
        setInvites([{ id: '1', firstName: '', email: '' }]);
      },
      onError: (error) => {
        console.error('Failed to send invites:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to send invitations';
        toast.error(errorMessage);
      },
    });
  }, [invites, sendEmailsMutation, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn('w-[90%] sm:max-w-[1035px] overflow-visible', 'border-0 shadow-none bg-transparent h-auto')}
      showCloseButton={false}
      overlayClassName="backdrop-blur-sm"
    >
      <Button
        onClick={onClose}
        className="absolute -top-2 -right-2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 border-[3px] sm:border-[4px] border-white flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-0 p-0"
        aria-label="Close modal"
      >
        <X className="size-4 sm:size-5 text-white" strokeWidth={2.5} />
      </Button>

      <ModalBody className="relative px-0 sm:px-12 py-0 sm:py-8 rounded-2xl sm:rounded-[36px] bg-white md:bg-sidebar-nav-bg border border-modal-border sm:border-0 flex flex-col max-h-[85vh]">
        <div className="relative z-10 flex flex-col h-full min-h-0">
          <h2 className="text-lg sm:text-[40px] font-semibold leading-[1.33] sm:leading-[1.3] tracking-[-0.0144em] sm:tracking-[-0.0045em] rounded-2xl text-left sm:text-center text-dark-900 py-2 sm:py-0 sm:mb-6 px-2 sm:px-0 shrink-0 bg-form-bg-light sm:bg-transparent">
            Invite via Email
          </h2>

          <div className="flex-1 overflow-y-auto overflow-x-hidden mb-0 sm:mb-6 px-0 sm:px-2 min-h-0 max-h-[calc(85vh-180px)] sm:max-h-[calc(85vh-220px)]">
            <div className="flex flex-col items-center sm:items-center" ref={lastRowRef}>
              <div className="flex flex-col gap-0 sm:mb-4 sm:gap-6 w-full sm:w-auto">
                {invites.map((invite, index) => (
                  <div key={invite.id} className="relative">
                    <div
                      className={cn(
                        'flex items-start sm:items-end gap-3 sm:gap-4 pt-6 pb-8 sm:py-0 sm:px-0',
                        invites.length > 1 ? 'pl-5 pr-13' : 'px-13',
                      )}
                    >
                      {invites.length > 1 && (
                        <div className="md:hidden flex flex-col items-center gap-1.5 shrink-0 pt-0 sm:pb-0 sm:pt-0">
                          <div className="w-8 h-8 rounded-full bg-form-badge-bg flex items-center justify-center">
                            <span className="text-base font-semibold text-white">{index + 1}</span>
                          </div>
                          <Button
                            type="button"
                            onClick={() => handleRemove(invite.id)}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 shrink-0 flex items-center justify-center text-error-500 hover:text-error-600 hover:bg-red-50"
                            aria-label={`Remove invite ${index + 1}`}
                          >
                            <Trash2 className="size-4 sm:size-5" />
                          </Button>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="flex flex-col gap-2 w-full sm:w-auto min-w-0">
                          <label
                            htmlFor={`firstName-${invite.id}`}
                            className="text-sm font-semibold leading-[1.43] tracking-[-0.0014em] text-dark-900"
                          >
                            Name
                          </label>
                          <Input
                            id={`firstName-${invite.id}`}
                            type="text"
                            value={invite.firstName}
                            onChange={(e) => handleChange(invite.id, 'firstName', e.target.value)}
                            placeholder="First Name"
                            className={cn(
                              'w-full sm:w-[276px] h-10 rounded-lg',
                              'bg-form-bg-light border-form-border',
                              'text-sm sm:text-base font-semibold leading-[1.43] sm:leading-[1.375] tracking-[-0.0014em] sm:tracking-[-0.011em]',
                              'placeholder:text-form-placeholder',
                              'shadow-[0px_0px_0px_4px_var(--color-form-ring-light)]',
                              'focus-visible:border-blue-600 focus-visible:ring-blue-200',
                            )}
                          />
                        </div>

                        <div className="flex flex-col gap-2 w-full sm:w-auto min-w-0">
                          <label
                            htmlFor={`email-${invite.id}`}
                            className="text-sm font-semibold leading-[1.43] tracking-[-0.0014em] text-dark-900"
                          >
                            Email ID
                          </label>
                          <Input
                            id={`email-${invite.id}`}
                            type="email"
                            value={invite.email}
                            onChange={(e) => handleChange(invite.id, 'email', e.target.value)}
                            placeholder="Email ID"
                            className={cn(
                              'w-full sm:w-[276px] h-10 rounded-lg',
                              'bg-form-bg-light border-form-border',
                              'text-sm sm:text-base font-semibold leading-[1.43] sm:leading-[1.375] tracking-[-0.0014em] sm:tracking-[-0.011em]',
                              'placeholder:text-form-placeholder',
                              'shadow-[0px_0px_0px_4px_var(--color-form-ring-light)]',
                              'focus-visible:border-blue-600 focus-visible:ring-blue-200',
                            )}
                          />
                        </div>

                        {invites.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => handleRemove(invite.id)}
                            variant="ghost"
                            className="h-10 text-error-500 hover:text-error-600 hover:bg-red-50 px-0 hidden sm:hidden md:block"
                          >
                            <Trash2 />
                          </Button>
                        )}
                      </div>
                    </div>

                    {invites.length > 1 && index < invites.length - 1 && (
                      <div className="absolute left-4 right-4 bottom-0 h-px bg-gradient-to-r from-transparent via-dark-900/20 to-transparent sm:hidden" />
                    )}
                  </div>
                ))}
              </div>

              <Button
                type="button"
                onClick={handleAddMore}
                variant="ghost"
                className={cn(
                  'flex items-center gap-2 h-auto px-0 sm:py-2 -mt-1 md:mt-0 sm:mb-0',
                  'text-[13px] sm:text-sm font-semibold leading-[1.23] sm:leading-[1.43] tracking-[-0.0015em] sm:tracking-[-0.0014em]',
                  'text-blue-600 hover:text-blue-600 hover:bg-transparent',
                )}
              >
                <UserPlus className="size-5 sm:size-6 text-blue-600" />
                Add more friend
              </Button>
            </div>
          </div>

          <div className="flex justify-center shrink-0 px-4 sm:px-0 py-2 sm:py-0 bg-white sm:bg-transparent rounded-b-2xl">
            <Button
              type="button"
              onClick={handleSendInvite}
              disabled={sendEmailsMutation.isPending}
              className={cn(
                'w-auto sm:w-50 h-auto px-[52px] py-3 rounded-[12px]',
                'bg-blue-600 text-white border-0 sm:border-2 sm:border-white',
                'text-lg sm:text-2xl font-semibold leading-[1.33] sm:leading-[1.2] tracking-[-0.0144em] sm:tracking-[-0.03em]',
                'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)]',
                'hover:bg-blue-600 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
              )}
            >
              {sendEmailsMutation.isPending ? 'Sending...' : 'Send Invite'}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
