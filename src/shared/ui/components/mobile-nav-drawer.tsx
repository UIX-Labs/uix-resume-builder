'use client';

import { Button } from '@/shared/ui/components/button';
import { cn } from '@shared/lib/cn';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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

export interface MobileNavDrawerProps {
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

export const MobileNavDrawer = ({
  isOpen,
  onClose,
  navItems,
  ctaButton,
  onLogoClick,
  logoSrc = '/images/Pika-Resume.png',
  logoAlt = 'Pika Resume',
  brandName = { primary: 'Pika', secondary: 'Resume' },
  menuSections,
}: MobileNavDrawerProps) => {
  const pathname = usePathname();

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
      onClose();
    }
  };

  const renderNavItem = (item: NavItem, key: string | number) => {
    const Icon = item.icon;
    const isActive = item.isActive ?? item.label === pathname;

    return (
      <li key={key} className="relative">
        {isActive && (
          <div className="absolute -left-[33px] top-1/2 -translate-y-1/2 w-[10px] h-[33px] bg-sidebar-brand-primary rounded-r-[12px]" />
        )}
        <Button
          variant="ghost"
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className={cn(
            'w-full justify-start h-auto p-0 hover:bg-transparent transition-colors !px-0',
            isActive ? 'text-sidebar-nav-active font-semibold' : 'text-sidebar-nav-inactive font-normal',
          )}
        >
          {Icon && <Icon className="size-6 flex-shrink-0" />}
          <span className="text-base leading-[1.25em] tracking-[-0.00125em]">{item.label}</span>
        </Button>
      </li>
    );
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
            className="fixed right-0 top-0 h-full w-[269px] bg-white z-50 shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col min-h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-transparent p-0"
                  onClick={handleLogoClick}
                >
                  <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="font-bold text-sidebar-brand-primary text-xl">{brandName.primary}</span>
                      <span className="font-normal text-sidebar-brand-secondary text-xl">{brandName.secondary}</span>
                    </div>
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 mt-2 mx-4 mb-4 flex flex-col">
                <div className="bg-sidebar-nav-bg rounded-[36px] px-[33px] py-9 relative flex-1">
                  {menuSections && menuSections.length > 0 ? (
                    <div className="space-y-8">
                      {menuSections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                          {section.label && (
                            <h3 className="text-xs font-normal text-sidebar-section-label mb-4 tracking-[-0.00167em] leading-[1.667em]">
                              {section.label}
                            </h3>
                          )}
                          <ul className="space-y-4">
                            {section.items.map((item, itemIndex) =>
                              renderNavItem(item, `${sectionIndex}-${itemIndex}`),
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-4">{navItems.map((item, index) => renderNavItem(item, index))}</ul>
                  )}
                </div>
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
