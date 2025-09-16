import React from 'react';
import { Button } from '@/shared/ui/components/button';
import Image from 'next/image';

function Header() {
  return (
    <header className="w-full flex items-center justify-between px-12 py-4">
      <div className="flex items-center gap-4">
        <span
          className="text-2xl font-[900] text-[rgb(11, 10, 9)
]"
        >
          Resume Builder
        </span>

        <div className="flex items-center gap-1 px-2 py-1 bg-[rgb(2,164,79)] text-white rounded-full text-xs font-bold">
          <span>AI Powered</span>

          <Image src="/images/auto_awesome.svg" alt="AI" width={14} height={14} className="inline-block" />
        </div>
      </div>

      <div className="flex items-center gap-7">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-900 hover:text-gray-900 font-semibold text-lg cursor-pointer"
        >
          Sign In
        </Button>

        <Button
          variant="default"
          size="default"
          className="bg-blue-900 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow-sm cursor-pointer"
        >
          Create My Resume
        </Button>
      </div>
    </header>
  );
}

export default Header;
