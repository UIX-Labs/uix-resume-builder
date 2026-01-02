'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import { CheckCircle2, Flame } from 'lucide-react';

const users = [
  {
    name: 'Akshat Agrawal',
    role: 'Lead Product Designer',
    image: '/images/img.svg',
    interactions: [
      {
        id: 'akshat-1',
        original: 'Founding (Lead) Product Designer | 5 Years of B2B, B2C Exp.',
        roast: "Recruiters don't know if you founded a company, a design system, or just the Figma file.",
        suggestion:
          'Founding Product Designer with 5+ years of experience leading B2B & B2C product design from 0 to 1.',
      },
      {
        id: 'akshat-2',
        original: 'Designed products used by millions...',
        roast: 'Big flex. Weak delivery. This deserves its own spotlight.',
        suggestion: 'Products shipped reached 10M+ users on Animall, and 5M+ on Inpix & Josh.',
      },
    ],
  },
  {
    name: 'Shivam Sharma',
    role: 'Staff Engineer',
    image: '/images/img2.svg',
    interactions: [
      {
        id: 'shivam-1',
        original: 'Founding (Lead) Product Designer | 5 Years of B2B, B2C Exp.',
        roast: "Recruiters don't know if you founded a company, a design system, or just the Figma file.",
        suggestion:
          'Founding Product Designer with 5+ years of experience leading B2B & B2C product design from 0 to 1.',
      },
      {
        id: 'shivam-2',
        original: 'Designed products used by millions...',
        roast: 'Big flex. Weak delivery. This deserves its own spotlight.',
        suggestion: 'Products shipped reached 10M+ users on Animall, and 5M+ on Inpix & Josh.',
      },
    ],
  },
];

export const RoastRoastsSection = () => {
  // Track active state for each interaction card independently
  const [activeStates, setActiveStates] = useState<Record<string, 'roast' | 'suggestion'>>({});

  const toggleState = (id: string) => {
    setActiveStates((prev) => ({
      ...prev,
      [id]: prev[id] === 'suggestion' ? 'roast' : 'suggestion',
    }));
  };

  return (
    <div
      id="roast-roasts-section"
      className="relative w-full bg-black flex flex-col items-center overflow-hidden font-sans scroll-mt-24"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-600/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] px-4 flex flex-col md:flex-row md:justify-center md:gap-24 items-center mt-14 gap-10">
        {users.map((user, userIndex) => (
          <div key={userIndex} className="relative w-full flex flex-col items-center">
            {/* User Header */}
            <div className="flex items-center gap-2 mb-4 absolute z-20 self-start pl-2 -top-12 md:left-15">
              <Avatar className="w-18 h-18 border-2 border-white/20 shadow-lg">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-black font-bold text-sm">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="-mt-12">
                <div className="text-white font-bold text-xs leading-tight">{user.name}</div>
                <div className="text-white/60 text-xs">{user.role}</div>
              </div>
            </div>

            {/* Resume Container */}
            <div className="relative w-[90%] md:w-full max-w-[480px]">
              {/* Resume Background */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <Image src="/images/roast-resume.png" alt="Resume" fill className="object-contain object-top" />
                <div className="absolute inset-0" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 flex flex-col gap-16 py-6 px-6">
                {user.interactions.map((interaction, i) => {
                  const currentState = activeStates[interaction.id] || 'roast';
                  const isSuggestion = currentState === 'suggestion';
                  const isRightAligned = i % 2 === 0; // First item (0) is Right aligned (sticks out right), Second (1) is Left aligned (sticks out left)

                  return (
                    <div key={interaction.id} className="relative flex flex-col min-h-[180px]">
                      {/* Original Card (Left) */}
                      <div
                        className={cn(
                          'relative z-10 w-[85%] max-w-[260px]',
                          isRightAligned
                            ? 'ml-auto -translate-y-8 translate-x-4'
                            : 'mr-auto -translate-y-8 -translate-x-10',
                        )}
                      >
                        {/* Toggle Button Badge */}
                        <button
                          type="button"
                          onClick={() => toggleState(interaction.id)}
                          className={cn(
                            'absolute -top-2.5 right-0 text-[8px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 shadow-sm z-20 transition-all duration-300 hover:scale-105 active:scale-95',
                            isSuggestion
                              ? 'bg-[#FFDF10] text-black border-[#FFDF10]'
                              : 'bg-[#E6F4EA] text-[#137D3B] border-[#137D3B]/20',
                          )}
                        >
                          {isSuggestion ? (
                            <>
                              <span>🔥</span>
                              <span>Back to Roast</span>
                            </>
                          ) : (
                            <div className="flex items-center gap-1">
                              {/* Icon circle */}
                              <div className="relative w-4 h-4 rounded-full bg-white flex items-center justify-center">
                                <Image src="/images/pika.svg" alt="pika" fill className="object-contain p-[2px]" />
                              </div>

                              {/* Text */}
                              <span className="leading-none whitespace-nowrap">Check Pika Suggestion</span>
                            </div>
                          )}
                        </button>

                        <div className="bg-white rounded-lg p-3 shadow-md border border-gray-100">
                          <div className="text-[10px] font-bold text-gray-900 mb-1">Original</div>
                          <div className="text-gray-700 text-xs leading-relaxed font-medium">
                            {interaction.original}
                          </div>
                        </div>
                      </div>

                      {/* Interaction Card (Roast/Suggestion) */}
                      <div
                        className={cn(
                          'absolute z-20 w-[75%] max-w-[260px] transition-all duration-500',
                          isRightAligned ? 'top-10 right-0 translate-x-12' : 'top-10 md:top-6 left-0 translate-x-6',
                        )}
                      >
                        {isSuggestion ? (
                          <div className="bg-[#E6F4EA] text-[#0D3F1F] p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-[#E6F4EA] relative">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Image src="/images/pika.svg" width={18} height={18} alt="Pika" className="w-3.5 h-3.5" />
                              <span className="font-bold text-[10px] uppercase tracking-wide opacity-80">
                                Pika Suggestion
                              </span>
                            </div>
                            <p className="text-xs font-semibold leading-snug">{interaction.suggestion}</p>
                          </div>
                        ) : (
                          <div
                            key="roast"
                            className="bg-[#FFDF10] text-black p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-[#FFDF10] relative"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[10px] uppercase tracking-wide opacity-80">
                                🔥 Pika Roast
                              </span>
                            </div>
                            <p className="text-xs font-semibold leading-snug">{interaction.roast}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
