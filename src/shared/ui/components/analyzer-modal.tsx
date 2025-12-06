import { SuggestionCard, SuggestionItem } from '@widgets/builder-intelligence/suggestion-card';
import { Button } from '../button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../dialog';
import type { SuggestionType } from '@entities/resume';
import { useEffect, useMemo, useState } from 'react';
import { RadioGroup } from '@shared/ui/radio-group';

import { trackEvent } from '@/shared/lib/analytics/percept';

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
  resumeId: string;
}

export default function AnalyzerModal({
  open,
  onOpenChange,
  suggestions,
  suggestionType,
  onApply,
  resumeId,
}: AnalyzerModalProps) {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<Record<number, 'old' | 'new'>>({});

  const typeLabels = {
    spelling_error: 'Spelling Errors',
    sentence_refinement: 'Weak Sentences',
    new_summary: 'New Points',
  };

  const isNewPoints = suggestionType === 'new_summary';

  useEffect(() => {
    if (!open) {
      setSelectedIndices(new Set());
      setSelectedOptions({});
      return;
    }

    setSelectedIndices(new Set());
    const initialOptions = suggestions.reduce<Record<number, 'old' | 'new'>>((acc, _, index) => {
      acc[index] = 'old';
      return acc;
    }, {});
    setSelectedOptions(initialOptions);
  }, [open, suggestions, suggestionType]);

  const selectedNewCount = useMemo(
    () =>
      suggestions.reduce((count, _, index) => {
        return selectedOptions[index] === 'new' ? count + 1 : count;
      }, 0),
    [selectedOptions, suggestions],
  );

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedIndices);
    if (checked) newSelected.add(index);
    else newSelected.delete(index);
    setSelectedIndices(newSelected);

    trackEvent('builder_intelligence_suggestion_selected', {
      resumeId,
      suggestionType,
      state: checked ? 'checked' : 'unchecked',
      index
    });
  };

  const handleOptionChange = (index: number, value: 'old' | 'new') => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: value,
    }));

    trackEvent('builder_intelligence_suggestion_selected', {
      resumeId,
      suggestionType,
      state: value,
      index
    });
  };

  const handleApply = () => {
    if (isNewPoints) {
      const selected = suggestions.filter((_, index) => selectedIndices.has(index));
      if (selected.length === 0) return;
      onApply(selected);
    } else {
      const selected = suggestions.filter((_, index) => (selectedOptions[index] ?? 'old') === 'new');
      if (selected.length === 0) return;
      onApply(selected);
    }

    onOpenChange(false);
    setSelectedIndices(new Set());
    setSelectedOptions({});
  };

  const applyDisabled = isNewPoints ? selectedIndices.size === 0 : selectedNewCount === 0;
  const applyCount = isNewPoints ? selectedIndices.size : selectedNewCount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-3xl max-h-[80vh] overflow-y-auto rounded-[36px]"
        style={{
          backgroundImage: 'url(/images/background.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <span className="flex items-center gap-2 text-2xl font-semibold text-white">
              <img src="/images/auto_awesome.svg" alt="Stars" className="w-6 h-6" />
              {typeLabels[suggestionType]}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {isNewPoints ? (
            suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                label={`Option ${index + 1}`}
                labelColor="#2E7D32"
                borderColor="#81C784"
                bgColor="white"
                checked={selectedIndices.has(index)}
                onChange={(checked) => handleCheckboxChange(index, checked as boolean)}
                htmlContent={suggestion.new}
              />
            ))
          ) : (
            <SuggestionCard label="Original" labelColor="white" bgColor="#FFD8D8" isGroup labelBackgroundColor="red">
              {suggestions.map((suggestion, index) => {
                const selectedValue = selectedOptions[index] ?? 'old';

                return (
                  <RadioGroup
                    key={index}
                    value={selectedValue}
                    onValueChange={(value) => handleOptionChange(index, value as 'old' | 'new')}
                    className="flex flex-col gap-3"
                  >
                    <SuggestionItem value="old" htmlContent={suggestion.old ?? ''} selected={selectedValue === 'old'} />
                    <SuggestionItem
                      value="new"
                      htmlContent={suggestion.new ?? ''}
                      label="Alternate"
                      selected={selectedValue === 'new'}
                      variant="new"
                    />
                  </RadioGroup>
                );
              })}
            </SuggestionCard>
          )}
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
            disabled={applyDisabled}
            className="bg-[#02A44F] text-white border border-white"
          >
            Apply ({applyCount})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
