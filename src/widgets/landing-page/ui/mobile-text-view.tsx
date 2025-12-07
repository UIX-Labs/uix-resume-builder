'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/components/button';
import { ArrowLeft, Monitor } from 'lucide-react';

export interface MobileTextViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileTextView = ({ isOpen, onClose }: MobileTextViewProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto"
    >
      <div className="p-6 min-h-screen flex flex-col">
        <button onClick={onClose} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Build Your Professional Resume</h1>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6 flex items-start gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2 text-black">View on Desktop</h2>
            <p className="text-base leading-relaxed text-black">
              For the best experience building your resume, please visit this website on a desktop or laptop computer. 
              Our resume builder offers full functionality and advanced features on larger screens.
            </p>
          </div>
        </div>

        <Button onClick={onClose} className="w-full mt-auto py-6 bg-blue-900 text-white text-xl font-semibold rounded-xl hover:bg-blue-700">
          Got it!
        </Button>
      </div>
    </motion.div>
  );
};