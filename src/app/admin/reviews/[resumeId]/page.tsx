'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useResumeForReview, useSubmitReviewSuggestions } from '@/features/admin/hooks/use-admin-queries';
import type { ReviewSuggestionItem } from '@/features/admin/types/admin.types';

const SUGGESTION_TYPES = [
  { value: 'sentence_refinement', label: 'Weak Sentence', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { value: 'new_summary', label: 'New Point', color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'spelling_error', label: 'Spelling', color: 'bg-red-50 text-red-700 border-red-200' },
  { value: 'adhoc', label: 'Adhoc', color: 'bg-purple-50 text-purple-700 border-purple-200' },
] as const;

function getTypeStyle(type: string) {
  return SUGGESTION_TYPES.find((t) => t.value === type)?.color || 'bg-gray-50 text-gray-700 border-gray-200';
}

function getTypeLabel(type: string) {
  return SUGGESTION_TYPES.find((t) => t.value === type)?.label || type;
}

// Extract text content sections from resume data for clickable selection
function extractTextSections(resumeData: any): Array<{
  sectionType: string;
  sectionLabel: string;
  items: Array<{
    itemId: string;
    fields: Array<{
      fieldName: string;
      value: string;
    }>;
  }>;
}> {
  const sections: ReturnType<typeof extractTextSections> = [];

  const sectionMap: Record<string, string> = {
    personalDetails: 'Personal Details',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications',
    achievements: 'Achievements',
    interests: 'Interests',
    publications: 'Publications',
  };

  for (const [key, label] of Object.entries(sectionMap)) {
    const sectionData = resumeData?.[key];
    if (!sectionData?.items?.length) continue;

    const items = sectionData.items.map((item: any) => {
      const fields: { fieldName: string; value: string }[] = [];

      // Extract all text fields from the item
      for (const [fieldName, fieldValue] of Object.entries(item)) {
        if (
          typeof fieldValue === 'string' &&
          fieldValue.trim() &&
          !['id', 'createdAt', 'updatedAt', 'deleted_at', 'personalDetailId', 'educationId', 'experienceId', 'projectId', 'certificationId', 'publicationId', 'interestId', 'achievementId', 'skillId', 'resumeId', 'rank'].includes(fieldName) &&
          !fieldName.includes('Url') &&
          !fieldName.includes('Thumbnail')
        ) {
          fields.push({ fieldName, value: fieldValue });
        }
        // Handle array fields (achievements, interests)
        if (fieldName === 'items' && Array.isArray(fieldValue)) {
          for (const textItem of fieldValue) {
            if (typeof textItem === 'string' && textItem.trim()) {
              fields.push({ fieldName: 'items', value: textItem });
            }
          }
        }
      }

      return { itemId: item.id, fields };
    });

    if (items.some((i: any) => i.fields.length > 0)) {
      sections.push({ sectionType: key, sectionLabel: label, items });
    }
  }

  return sections;
}

export default function ReviewSuggestionPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const router = useRouter();
  const { data, isLoading } = useResumeForReview(resumeId);
  const submitMutation = useSubmitReviewSuggestions();

  const [suggestions, setSuggestions] = useState<ReviewSuggestionItem[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedFieldName, setSelectedFieldName] = useState('');
  const [suggestedText, setSuggestedText] = useState('');
  const [suggestionType, setSuggestionType] = useState<string>('sentence_refinement');

  const handleTextClick = useCallback((sectionType: string, itemId: string, fieldName: string, value: string) => {
    setSelectedText(value);
    setSelectedSection(sectionType);
    setSelectedItemId(itemId);
    setSelectedFieldName(fieldName);
    setSuggestedText('');
  }, []);

  const handleAddSuggestion = () => {
    if (!suggestedText.trim()) return;

    const newSuggestion: ReviewSuggestionItem = {
      sectionType: selectedSection,
      itemId: selectedItemId,
      fieldName: selectedFieldName,
      ...(suggestionType !== 'new_summary' && { old: selectedText }),
      new: suggestedText,
      type: suggestionType as ReviewSuggestionItem['type'],
    };

    setSuggestions((prev) => [...prev, newSuggestion]);
    setSelectedText('');
    setSuggestedText('');
    setSelectedSection('');
    setSelectedItemId('');
    setSelectedFieldName('');
  };

  const handleRemoveSuggestion = (index: number) => {
    setSuggestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (suggestions.length === 0) return;

    // Convert flat suggestions to the nested AI analyzer format
    const formatted: Record<string, any> = {};

    for (const s of suggestions) {
      if (!formatted[s.sectionType]) {
        formatted[s.sectionType] = { suggestedUpdates: [] };
      }

      let itemEntry = formatted[s.sectionType].suggestedUpdates.find(
        (u: any) => u.itemId === s.itemId,
      );
      if (!itemEntry) {
        itemEntry = { itemId: s.itemId, fields: {} };
        formatted[s.sectionType].suggestedUpdates.push(itemEntry);
      }

      if (!itemEntry.fields[s.fieldName]) {
        itemEntry.fields[s.fieldName] = { suggestedUpdates: [], fieldCounts: { spelling_error: 0, sentence_refinement: 0, new_summary: 0 } };
      }

      const update: Record<string, string> = { new: s.new, type: s.type };
      if (s.old) update.old = s.old;
      itemEntry.fields[s.fieldName].suggestedUpdates.push(update);

      if (s.type in itemEntry.fields[s.fieldName].fieldCounts) {
        itemEntry.fields[s.fieldName].fieldCounts[s.type]++;
      }
    }

    await submitMutation.mutateAsync({ resumeId, suggestions: formatted });
    router.push('/admin/reviews');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-12 text-gray-500">Resume not found</div>;
  }

  const textSections = extractTextSections(data.resume);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Reviews
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Review Resume</h2>
          <p className="text-sm text-gray-500">{data.userName} ({data.userEmail})</p>
        </div>
        {data.isReviewDone && (
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">Completed</span>
        )}
      </div>

      {/* Split pane */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Resume Content */}
        <div className="lg:w-3/5 rounded-xl border border-gray-200 bg-white p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Content</h3>
          <p className="text-xs text-gray-400 mb-4">Click on any text to select it for suggestions</p>

          {textSections.map((section) => (
            <div key={section.sectionType} className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 border-b pb-2">
                {section.sectionLabel}
              </h4>
              {section.items.map((item) => (
                <div key={item.itemId} className="mb-3 pl-2">
                  {item.fields.map((field, idx) => (
                    <button
                      key={`${item.itemId}-${field.fieldName}-${idx}`}
                      onClick={() => handleTextClick(section.sectionType, item.itemId, field.fieldName, field.value)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all mb-1 border ${
                        selectedText === field.value && selectedItemId === item.itemId && selectedFieldName === field.fieldName
                          ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-transparent hover:border-blue-200 hover:bg-blue-50/50'
                      }`}
                    >
                      <span className="text-[10px] font-medium text-gray-400 uppercase">{field.fieldName}</span>
                      <div
                        className="text-gray-800 mt-0.5"
                        dangerouslySetInnerHTML={{ __html: field.value }}
                      />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right: Suggestion Panel */}
        <div className="lg:w-2/5 space-y-4">
          {/* Suggestion Builder */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Suggestion</h3>

            {/* Suggestion Type */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {SUGGESTION_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSuggestionType(t.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      suggestionType === t.value
                        ? `${t.color} ring-2 ring-offset-1`
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Original text */}
            {suggestionType !== 'new_summary' && (
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Original Text</label>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 min-h-[60px]">
                  {selectedText ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedText }} />
                  ) : (
                    <span className="text-gray-400 italic">Click on text in the resume to select</span>
                  )}
                </div>
              </div>
            )}

            {/* Section selector for new_summary */}
            {suggestionType === 'new_summary' && !selectedSection && (
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Select Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(e.target.value);
                    // Pick first item of section
                    const section = textSections.find((s) => s.sectionType === e.target.value);
                    if (section?.items[0]) {
                      setSelectedItemId(section.items[0].itemId);
                      setSelectedFieldName('description');
                    }
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">Select a section...</option>
                  {textSections.map((s) => (
                    <option key={s.sectionType} value={s.sectionType}>{s.sectionLabel}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Suggested text */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1">Suggested Text</label>
              <textarea
                value={suggestedText}
                onChange={(e) => setSuggestedText(e.target.value)}
                placeholder="Type your suggested improvement..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={handleAddSuggestion}
              disabled={!suggestedText.trim() || (!selectedText && suggestionType !== 'new_summary') || !selectedSection}
              className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Add Suggestion
            </button>
          </div>

          {/* Suggestions List */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Suggestions ({suggestions.length})
              </h3>
            </div>

            {suggestions.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No suggestions added yet</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <div key={idx} className={`rounded-lg border p-3 ${getTypeStyle(s.type)}`}>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold">{getTypeLabel(s.type)}</span>
                      <button
                        onClick={() => handleRemoveSuggestion(idx)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {s.old && (
                      <div className="mt-2">
                        <span className="text-[10px] text-gray-500">Old:</span>
                        <div className="text-xs text-gray-700 line-through" dangerouslySetInnerHTML={{ __html: s.old }} />
                      </div>
                    )}
                    <div className="mt-1">
                      <span className="text-[10px] text-gray-500">New:</span>
                      <div className="text-xs text-gray-900 font-medium">{s.new}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {suggestions.length > 0 && (
              <button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="w-full mt-4 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {submitMutation.isPending ? 'Submitting...' : `Submit ${suggestions.length} Suggestion${suggestions.length !== 1 ? 's' : ''}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
