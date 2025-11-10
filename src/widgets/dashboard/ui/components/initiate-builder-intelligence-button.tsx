'use client';

import { Sparkles } from 'lucide-react';
import { Button } from '@shared/ui/components/button';

interface InitiateBuilderIntelligenceButtonProps {
  onClick: () => void;
}

export function InitiateBuilderIntelligenceButton({ onClick }: InitiateBuilderIntelligenceButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-[#02A44F] hover:bg-[#028a42] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
    >
      <Sparkles className="h-5 w-5" />
      Initiate Builder Intelligence
    </Button>
  );
}

