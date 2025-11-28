'use client';
import React, { useState } from 'react';
import { Button } from '@/shared/ui/components/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCachedUser } from '@shared/hooks/use-user';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { MobileTextView } from './mobile-text-view';

function Header() {
  const router = useRouter();
  const user = useCachedUser();
  const isMobile = useIsMobile();
  const [showMobileView, setShowMobileView] = useState(false);

  const handleNavigate = () => {
    router.push(user ? '/dashboard' : '/auth');
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setShowMobileView(true);
    }
  };

  return (
    
    <>
      <header className="w-full flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-lg md:text-2xl font-[900] text-[rgb(11,10,9)]">Resume Builder</span>

          <div className="flex items-center gap-1 px-2 py-1 bg-[rgb(2,164,79)] text-white rounded-full text-xs font-bold">
            <span>AI Powered</span>

            <Image src="/images/auto_awesome.svg" alt="AI" width={14} height={14} className="inline-block" />
          </div>
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-7">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="text-blue-900 hover:text-gray-900 font-semibold text-lg cursor-pointer"
          >
            Home
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNavigate}
            className="text-blue-900 hover:text-gray-900 font-semibold text-lg cursor-pointer"
          >
            {user ? 'Dashboard' : 'Sign In'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/about-us')}
            className="text-blue-900 hover:text-gray-900 font-semibold text-lg cursor-pointer"
          >
            About Us
          </Button>

          <Button
            variant="default"
            size="default"
            onClick={handleNavigate}
            className="bg-blue-900 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow-sm cursor-pointer"
          >
            Create My Resume
          </Button>
        </div>

        {/* Mobile Menu Button - Hidden on Desktop */}
        <button
          type="button"
          onClick={handleMenuClick}
          className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Text View */}
      {isMobile && <MobileTextView isOpen={showMobileView} onClose={() => setShowMobileView(false)} />}
    </>
  
  );
}

export default Header;
