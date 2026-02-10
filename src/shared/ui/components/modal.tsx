'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@shared/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from '@shared/ui/dialog';
import { X } from 'lucide-react';
import type React from 'react';
import { Button } from './button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeButtonVariant?: 'default' | 'custom';
  className?: string;
  overlayClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeButtonVariant = 'default',
  className = '',
  overlayClassName = '',
}: ModalProps) {
  if (overlayClassName) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogPortal>
          <DialogOverlay className={cn('backdrop-blur-[2px]', overlayClassName)} />
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className={cn(
              'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] grid w-full md:max-w-[calc(100%-16rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 outline-none sm:max-w-lg',
              'p-0 rounded-3xl overflow-hidden flex flex-col',
              className,
            )}
          >
            <div className="flex flex-col h-full">
              {title && (
                <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4">
                  <DialogTitle className="text-lg font-semibold text-[#111827]">{title}</DialogTitle>
                  {showCloseButton && closeButtonVariant === 'custom' && (
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  )}
                </DialogHeader>
              )}
              <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
            {showCloseButton && closeButtonVariant === 'default' && (
              <DialogPrimitive.Close
                data-slot="dialog-close"
                className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn('w-full max-w-md p-0 rounded-3xl overflow-hidden flex flex-col', className)}
        showCloseButton={closeButtonVariant === 'default'}
      >
        {/* Header */}
        {(title || (showCloseButton && closeButtonVariant === 'custom')) && (
          <div className="flex items-center justify-between px-6 py-4 border-b">
            {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
            {showCloseButton && closeButtonVariant === 'custom' && (
              <Button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
        {/* Content */}
        {children}
      </DialogContent>
    </Dialog>
  );
}

export interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export function ModalHeader({ title, onClose, showCloseButton = true, className = '' }: ModalHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between px-6 py-4 border-b', className)}>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {showCloseButton && onClose && (
        <Button
          type="button"
          onClick={onClose}
          size="icon"
          className="w-8 h-8 rounded-full bg-black text-white hover:bg-gray-800"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return <div className={cn('px-4 sm:px-6 pb-4 sm:pb-6', className)}>{children}</div>;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return <div className={cn('px-6 py-4 border-t', className)}>{children}</div>;
}
