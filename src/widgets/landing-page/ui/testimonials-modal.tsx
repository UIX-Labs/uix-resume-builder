'use client';

import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@shared/ui/dialog';
import { TestimonialsCarousel } from './testimonials-carousel';

interface TestimonialsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TestimonialsModal({ isOpen, onClose }: TestimonialsModalProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[900px] w-full p-0 border-none bg-transparent overflow-visible shadow-none">
                <div className="relative w-full p-1 rounded-[36px] bg-gradient-to-r from-[#257AFF] via-[#005FF2] to-[#257AFF]">
                    <div className="relative w-full bg-transparent rounded-[35px] overflow-hidden">
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border-2 border-white/30 hover:bg-black/70 hover:border-white/50 transition-colors cursor-pointer"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                        <TestimonialsCarousel roundedClassName="rounded-[35px]" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

