'use client';

import { Dialog, DialogContent } from '@shared/ui/dialog';
import { cn } from '@shared/lib/cn';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  bio: string;
}

interface MemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  allMembers?: TeamMember[];
  onNavigate?: (member: TeamMember) => void;
}

export function MemberDetailModal({ isOpen, onClose, member, allMembers = [], onNavigate }: MemberDetailModalProps) {
  if (!member) return null;

  const currentIndex = allMembers.findIndex((m) => m.id === member.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allMembers.length - 1;

  const handlePrevious = () => {
    if (hasPrev && onNavigate) {
      onNavigate(allMembers[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext && onNavigate) {
      onNavigate(allMembers[currentIndex + 1]);
    }
  };

  // Mock data for work history and style tags
  const workHistory = [
    { company: 'Google', logo: '/images/google-logo.svg' },
    { company: 'Microsoft', logo: '/images/microsoft-logo.svg' },
    { company: 'Apple', logo: '/images/apple-logo.svg' },
  ];

  const styleTags = [
    { emoji: '❤️', label: 'Kind' },
    { emoji: '💡', label: 'Insightful' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[95vw] max-w-[1035px] h-auto max-h-[90vh] p-0 border-none shadow-none overflow-y-auto rounded-[20px] md:rounded-[40px]"
        showCloseButton={false}
      >
        <div className="relative w-full bg-gradient-to-r from-transparent to-black/50 p-1 md:p-2 glass-card rounded-[20px] md:rounded-[40px] overflow-hidden border-none">
          <div className="h-full w-full relative flex flex-col md:flex-row justify-between rounded-[20px] md:rounded-[40px] overflow-hidden bg-white p-2 md:p-3">
            <div className="w-full md:w-[483px] h-[300px] sm:h-[350px] md:h-[494px] rounded-[20px] md:rounded-[40px] overflow-hidden bg-[#0D0D0D] flex-shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                width={483}
                height={494}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            {/* <div> */}
            <div className="flex-1 flex pt-4 md:pt-12 pr-4 md:pr-[52px] pl-4 md:pl-[28px]">
              {/* Top content section */}
              <div className="flex flex-col gap-4 md:gap-[29px]">
                {/* Name, Role, and LinkedIn */}
                <div className="flex flex-col gap-3 md:gap-[23px]">
                  <div className="flex items-center">
                    <div className="">
                      <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold leading-[1.3em] tracking-[-0.0059em] text-black mb-0">
                        {member.name}
                      </h2>
                      <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-[1.3em] tracking-[-0.0144em] text-black mt-0">
                        {member.role}
                      </p>
                    </div>
                    {/* LinkedIn Icon */}
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 ml-3 md:ml-4">
                      <Image
                        src="/images/linkedin.svg"
                        alt="LinkedIn"
                        width={32}
                        height={32}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="">
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-[1.43em] tracking-[-0.0036em] text-black">
                      {member.bio}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 w-full md:w-[180px]">
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-[1.43em] tracking-[-0.0036em] text-black">
                      {member.name}'s Work History
                    </p>
                    <div className="flex gap-2">
                      {workHistory.slice(0, 3).map((work, index) => (
                        <div
                          key={index}
                          className="w-[36px] h-[36px] md:w-[49px] md:h-[49px] rounded overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={work.logo}
                            alt={work.company}
                            width={49}
                            height={49}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full md:w-[171px]">
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-[1.43em] tracking-[-0.0036em] text-black">
                      {member.name}'s Style
                    </p>
                    <div className="flex flex-wrap gap-[7px]">
                      {styleTags.map((tag, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-2 md:px-3 py-1 bg-[#E9ECF1] rounded-[25px]"
                        >
                          <span className="text-[10px] md:text-[12px] font-bold leading-[1.3em]">{tag.emoji}</span>
                          <span className="text-[10px] md:text-[12px] font-bold leading-[1.3em] text-[#0C1118]">
                            {tag.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden hidden md:block">
              <Image src="/images/star-decoration.svg" alt="" width={120} height={120} />
            </div>
            {/* </div> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
