'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/shared/ui/components/button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@shared/lib/cn';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  icon?: LucideIcon;
}

export interface CTAButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

export interface ReusableMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  ctaButton?: CTAButton;
  onLogoClick?: () => void;
  logoSrc?: string;
  logoAlt?: string;
  brandName?: {
    primary: string;
    secondary: string;
  };
  menuSections?: {
    label: string;
    items: NavItem[];
  }[];
}

export const ReusableMobileSidebar = ({
  isOpen,
  onClose,
  navItems,
  ctaButton,
  onLogoClick,
  logoSrc = '/images/Pika-Resume.png',
  logoAlt = 'Pika Resume',
  brandName = { primary: 'Pika', secondary: 'Resume' },
  menuSections,
}: ReusableMobileSidebarProps) => {
  const pathname = usePathname();

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[280px] bg-white z-50 shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col min-h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <button className="flex items-center gap-2" onClick={handleLogoClick} type="button">
                  <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="font-bold text-[#005FF2] text-xl">{brandName.primary}</span>
                      <span className="font-normal text-[#21344F] text-xl">{brandName.secondary}</span>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-4">
                {menuSections && menuSections.length > 0 ? (
                  // Render sections with labels
                  <div className="space-y-6">
                    {menuSections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        {section.label && (
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                            {section.label}
                          </h3>
                        )}
                        <ul className="space-y-1.5">
                          {section.items.map((item, itemIndex) => {
                            const Icon = item.icon;
                            const isActive = item.isActive ?? item.label === pathname;

                            return (
                              <li key={`${sectionIndex}-${itemIndex}`}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    item.onClick();
                                    onClose();
                                  }}
                                  className={cn(
                                    'w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors flex items-center gap-3',
                                    isActive ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100',
                                  )}
                                >
                                  {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                                  <span>{item.label}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = item.isActive ?? false;

                      return (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => {
                              item.onClick();
                              onClose();
                            }}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors flex items-center gap-3',
                              isActive ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100',
                            )}
                          >
                            {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </nav>

              {ctaButton && (
                <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white">
                  <Button
                    variant={ctaButton.variant || 'default'}
                    size="lg"
                    onClick={() => {
                      ctaButton.onClick();
                      onClose();
                    }}
                    className={cn(
                      'w-full font-semibold py-4 rounded-xl shadow-sm',
                      ctaButton.className || 'bg-blue-900 hover:bg-blue-700 text-white',
                    )}
                  >
                    {ctaButton.label}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
