'use client';

import { cn } from '@shared/lib/utils';
import { Dialog, DialogContent } from '@shared/ui/dialog';
import { X } from 'lucide-react';
import type React from 'react';
import { Button } from './button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  showCloseButton?: boolean;
  closeButtonVariant?: 'default' | 'custom';
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = 'w-full max-w-md',
  showCloseButton = true,
  closeButtonVariant = 'default',
  className = '',
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(width, 'p-0 rounded-3xl overflow-hidden flex flex-col', className)}
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
    <div className={`flex items-center justify-between px-6 py-4 border-b ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return (
    <div
      className={`px-4 sm:px-6 pb-4 sm:pb-6
 ${className}`}
    >
      {children}
    </div>
  );
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return <div className={`px-6 py-4 border-t ${className}`}>{children}</div>;
}
