import { cn } from '@shared/lib/cn';
import { Button } from '../button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../dialog';
import type { SuggestionType } from '@entities/resume';
import { Checkbox } from '../checkbox';
import { useState } from 'react';

interface Suggestion {
  old?: string;
  new: string;
  type: SuggestionType;
}

interface AnalyzerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: Suggestion[];
  suggestionType: SuggestionType;
  onApply: (selectedSuggestions: Suggestion[]) => void;
}

export default function AnalyzerModal({
  open,
  onOpenChange,
  suggestions,
  suggestionType,
  onApply,
}: AnalyzerModalProps) {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  const typeLabels = {
    spelling_error: 'Spelling Errors',
    sentence_refinement: 'Weak Sentences',
    new_summary: 'New Points',
  };

  const typeColors = {
    spelling_error: 'text-[#D97706]',
    sentence_refinement: 'text-[#DC2626]',
    new_summary: 'text-[#10B981]',
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedIndices);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedIndices(newSelected);
  };

  const handleApply = () => {
    const selected = suggestions.filter((_, index) => selectedIndices.has(index));
    onApply(selected);
    onOpenChange(false);
    setSelectedIndices(new Set());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <span className={cn(typeColors[suggestionType], 'text-2xl font-semibold')}>
              {typeLabels[suggestionType]}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="relative p-4 border rounded-lg bg-white text-black  transition-colors">
              <div className="absolute -top-2 left-0 bg-white px-2 py-0.5 rounded-full border border-[#81C784]">
                <span className="text-xs font-semibold text-[#2E7D32]">Option {index + 1}</span>
              </div>

              <div className="flex flex-row items-start gap-3 mt-2">
                <Checkbox
                  checked={selectedIndices.has(index)}
                  onCheckedChange={(checked) => handleCheckboxChange(index, checked as boolean)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-900 flex-1" dangerouslySetInnerHTML={{ __html: suggestion.new }} />
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="bg-black text-white border border-white hover:bg-black hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={selectedIndices.size === 0}
            className="bg-[#02A44F] text-white border border-white"
          >
            Apply ({selectedIndices.size})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
