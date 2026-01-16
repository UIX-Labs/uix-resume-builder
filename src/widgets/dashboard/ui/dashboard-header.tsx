'use client';

import { useRouter } from 'next/navigation';
import { HomeIcon } from 'lucide-react';
import { Button } from '@shared/ui';
import { type User } from '@shared/hooks/use-user';

interface DashboardHeaderProps {
  user?: User | null;
  className?: string;
}

export default function DashboardHeader({ user, className = '' }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <header className={`flex justify-end items-center bg-[rgba(245,248,250,1)] p-4 rounded-3xl ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center bg-blue-200 rounded-full overflow-hidden h-[53px] w-[53px]">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push('/')}
            className="border-none bg-transparent hover:bg-transparent cursor-pointer"
          >
            <HomeIcon className="w-full h-full" />
          </Button>
        </div>

        {user && (
          <>
            <div className="flex items-center justify-center bg-blue-200 rounded-full overflow-hidden h-[53px] w-[53px]">
              <span className="text-xl font-bold text-gray-600">{user.firstName?.charAt(0)}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-black leading-[1.375em] tracking-[-1.125%] text-base font-normal">
                {`${user.firstName} ${user.lastName ?? ''}`}
              </span>

              <span className="text-[13px] font-normal leading-[1.385em] text-[rgb(149,157,168)]">
                {user.email}
              </span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}