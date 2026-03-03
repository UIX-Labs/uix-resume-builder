'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useResumeForReview,
  useSubmitReviewSuggestions,
  useSaveDraftSuggestions,
} from '@/features/admin/hooks/use-admin-queries';
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

// Parse <li> bullets from HTML string
function parseBullets(html: string): string[] {
  const matches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  if (!matches) return [];
  return matches
    .map((m) =>
      m
        .replace(/<\/?li[^>]*>/gi, '')
        .replace(/<\/?[^>]+(>|$)/g, '')
        .trim(),
    )
    .filter(Boolean);
}

// Strip all HTML tags to get plain text
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

interface FieldEntry {
  fieldName: string;
  value: string;
  bulletIndex?: number;
  isBullet: boolean;
  totalBullets?: number; // total bullets in this field — used for "add bullet" button
}

// Extract text content sections from resume data for clickable selection
function extractTextSections(resumeData: any): Array<{
  sectionType: string;
  sectionLabel: string;
  items: Array<{
    itemId: string;
    fields: FieldEntry[];
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
      const fields: FieldEntry[] = [];

      for (const [fieldName, fieldValue] of Object.entries(item)) {
        if (
          typeof fieldValue === 'string' &&
          fieldValue.trim() &&
          ![
            'id',
            'createdAt',
            'updatedAt',
            'deleted_at',
            'personalDetailId',
            'educationId',
            'experienceId',
            'projectId',
            'certificationId',
            'publicationId',
            'interestId',
            'achievementId',
            'skillId',
            'resumeId',
            'rank',
          ].includes(fieldName) &&
          !fieldName.includes('Url') &&
          !fieldName.includes('Thumbnail')
        ) {
          // Check if this field contains <li> bullets
          if (fieldValue.includes('<li')) {
            const bullets = parseBullets(fieldValue);
            if (bullets.length > 0) {
              bullets.forEach((bullet, bulletIdx) => {
                fields.push({
                  fieldName,
                  value: bullet,
                  bulletIndex: bulletIdx,
                  isBullet: true,
                  totalBullets: bullets.length,
                });
              });
            } else {
              // Has <li> tags but couldn't parse — fall back to full field
              fields.push({ fieldName, value: stripHtml(fieldValue), isBullet: false });
            }
          } else {
            fields.push({ fieldName, value: fieldValue, isBullet: false });
          }
        }
        // Handle array fields (achievements, interests)
        if (fieldName === 'items' && Array.isArray(fieldValue)) {
          for (const textItem of fieldValue) {
            if (typeof textItem === 'string' && textItem.trim()) {
              fields.push({ fieldName: 'items', value: textItem, isBullet: false });
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

// Convert flat suggestions array to the nested format the backend expects
function formatSuggestionsForBackend(suggestions: ReviewSuggestionItem[]): Record<string, any> {
  const formatted: Record<string, any> = {};

  for (const s of suggestions) {
    if (!formatted[s.sectionType]) {
      formatted[s.sectionType] = { suggestedUpdates: [] };
    }

    let itemEntry = formatted[s.sectionType].suggestedUpdates.find((u: any) => u.itemId === s.itemId);
    if (!itemEntry) {
      itemEntry = { itemId: s.itemId, fields: {} };
      formatted[s.sectionType].suggestedUpdates.push(itemEntry);
    }

    if (!itemEntry.fields[s.fieldName]) {
      itemEntry.fields[s.fieldName] = {
        suggestedUpdates: [],
        fieldCounts: { spelling_error: 0, sentence_refinement: 0, new_summary: 0 },
      };
    }

    const update: Record<string, any> = { new: s.new, type: s.type };
    if (s.old) update.old = s.old;
    if (s.bulletIndex !== undefined) update.bulletIndex = s.bulletIndex;
    itemEntry.fields[s.fieldName].suggestedUpdates.push(update);

    if (s.type in itemEntry.fields[s.fieldName].fieldCounts) {
      itemEntry.fields[s.fieldName].fieldCounts[s.type]++;
    }
  }

  return formatted;
}

// Convert nested backend format back to flat suggestions array (for loading drafts)
function parseSuggestionsFromBackend(nested: Record<string, any>): ReviewSuggestionItem[] {
  const items: ReviewSuggestionItem[] = [];

  for (const [sectionType, sectionData] of Object.entries(nested)) {
    const updates = (sectionData as any)?.suggestedUpdates;
    if (!Array.isArray(updates)) continue;

    for (const itemUpdate of updates) {
      const itemId = itemUpdate.itemId;
      const fields = itemUpdate.fields || {};

      for (const [fieldName, fieldData] of Object.entries(fields)) {
        const suggestedUpdates = (fieldData as any)?.suggestedUpdates;
        if (!Array.isArray(suggestedUpdates)) continue;

        for (const upd of suggestedUpdates) {
          items.push({
            sectionType,
            itemId,
            fieldName,
            old: upd.old,
            new: upd.new,
            type: upd.type || 'sentence_refinement',
            bulletIndex: upd.bulletIndex,
          });
        }
      }
    }
  }

  return items;
}

export default function ReviewSuggestionPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const router = useRouter();
  const { data, isLoading } = useResumeForReview(resumeId);
  const submitMutation = useSubmitReviewSuggestions();
  const draftMutation = useSaveDraftSuggestions();

  const [suggestions, setSuggestions] = useState<ReviewSuggestionItem[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedFieldName, setSelectedFieldName] = useState('');
  const [selectedBulletIndex, setSelectedBulletIndex] = useState<number | undefined>(undefined);
  const [suggestedText, setSuggestedText] = useState('');
  const [suggestionType, setSuggestionType] = useState<string>('sentence_refinement');
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fieldRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Load existing draft on page load
  useEffect(() => {
    if (data && !draftLoaded) {
      if (data.existingSuggestions && data.suggestionsStatus === 'draft') {
        const restored = parseSuggestionsFromBackend(data.existingSuggestions);
        if (restored.length > 0) {
          setSuggestions(restored);
        }
      }
      setDraftLoaded(true);
    }
  }, [data, draftLoaded]);

  // Track unsaved changes
  useEffect(() => {
    if (draftLoaded) {
      setHasUnsavedChanges(true);
    }
  }, [suggestions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldMouseUp = useCallback(
    (sectionType: string, itemId: string, fieldName: string, fullValue: string, bulletIndex?: number) => {
      const selection = window.getSelection();
      const highlighted = selection?.toString().trim();

      setSelectedSection(sectionType);
      setSelectedItemId(itemId);
      setSelectedFieldName(fieldName);
      setSelectedBulletIndex(bulletIndex);

      if (highlighted && highlighted.length > 0 && highlighted !== fullValue) {
        // User highlighted specific text within the field
        setSelectedText(highlighted);
      } else {
        // User clicked without highlighting — use the full value
        setSelectedText(fullValue);
      }
      setSuggestedText('');
    },
    [],
  );

  const handleAddBullet = useCallback((sectionType: string, itemId: string, fieldName: string) => {
    setSelectedSection(sectionType);
    setSelectedItemId(itemId);
    setSelectedFieldName(fieldName);
    setSelectedBulletIndex(undefined);
    setSelectedText('');
    setSuggestedText('');
    setSuggestionType('new_summary');
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
      ...(selectedBulletIndex !== undefined && { bulletIndex: selectedBulletIndex }),
    };

    setSuggestions((prev) => [...prev, newSuggestion]);
    setSelectedText('');
    setSuggestedText('');
    setSelectedSection('');
    setSelectedItemId('');
    setSelectedFieldName('');
    setSelectedBulletIndex(undefined);
  };

  const handleRemoveSuggestion = (index: number) => {
    setSuggestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveDraft = async () => {
    if (suggestions.length === 0) return;
    const formatted = formatSuggestionsForBackend(suggestions);
    await draftMutation.mutateAsync({ resumeId, suggestions: formatted });
    setDraftSavedAt(new Date());
    setHasUnsavedChanges(false);
  };

  const handleSubmit = async () => {
    if (suggestions.length === 0) return;
    const formatted = formatSuggestionsForBackend(suggestions);
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

  // Helper to check if a field row is selected
  const isFieldSelected = (
    sectionType: string,
    itemId: string,
    fieldName: string,
    value: string,
    bulletIndex?: number,
  ) => {
    return (
      selectedItemId === itemId &&
      selectedFieldName === fieldName &&
      selectedSection === sectionType &&
      (bulletIndex !== undefined ? selectedBulletIndex === bulletIndex : true) &&
      (selectedText === value || selectedText.length > 0)
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Reviews
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Review Resume</h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-gray-500">
              {data.userName} ({data.userEmail})
            </p>
            {data.reviewer && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {data.reviewer}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {draftSavedAt && !hasUnsavedChanges && (
            <span className="text-xs text-green-600 font-medium">Draft saved {draftSavedAt.toLocaleTimeString()}</span>
          )}
          {hasUnsavedChanges && suggestions.length > 0 && (
            <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>
          )}
          {data.isReviewDone && (
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">Completed</span>
          )}
        </div>
      </div>

      {/* Split pane */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Resume Content */}
        <div className="lg:w-3/5 rounded-xl border border-gray-200 bg-white p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Content</h3>
          <p className="text-xs text-gray-400 mb-4">
            Click on any text to select it. Highlight specific text for partial selection.
          </p>

          {textSections.map((section) => (
            <div key={section.sectionType} className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 border-b pb-2">
                {section.sectionLabel}
              </h4>
              {section.items.map((item) => {
                // Group fields by fieldName to detect bullet groups
                const fieldGroups: Array<{ fieldName: string; entries: FieldEntry[] }> = [];
                let currentGroup: { fieldName: string; entries: FieldEntry[] } | null = null;

                for (const field of item.fields) {
                  if (currentGroup && currentGroup.fieldName === field.fieldName && field.isBullet) {
                    currentGroup.entries.push(field);
                  } else {
                    currentGroup = { fieldName: field.fieldName, entries: [field] };
                    fieldGroups.push(currentGroup);
                  }
                }

                return (
                  <div key={item.itemId} className="mb-3 pl-2">
                    {fieldGroups.map((group, groupIdx) => (
                      <div key={`${item.itemId}-${group.fieldName}-${groupIdx}`}>
                        <span className="text-[10px] font-medium text-gray-400 uppercase px-3">{group.fieldName}</span>
                        {group.entries.map((field, idx) => {
                          const fieldKey = `${item.itemId}-${field.fieldName}-${field.bulletIndex ?? idx}`;
                          const selected = isFieldSelected(
                            section.sectionType,
                            item.itemId,
                            field.fieldName,
                            field.value,
                            field.bulletIndex,
                          );

                          return (
                            <div
                              key={fieldKey}
                              ref={(el) => {
                                if (el) fieldRefs.current.set(fieldKey, el);
                              }}
                              onMouseUp={() =>
                                handleFieldMouseUp(
                                  section.sectionType,
                                  item.itemId,
                                  field.fieldName,
                                  field.value,
                                  field.bulletIndex,
                                )
                              }
                              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all mb-1 border cursor-text select-text ${
                                selected
                                  ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200'
                                  : 'border-transparent hover:border-blue-200 hover:bg-blue-50/50'
                              } ${field.isBullet ? 'pl-6 relative' : ''}`}
                            >
                              {field.isBullet && (
                                <span className="absolute left-3 top-2.5 text-gray-400 text-xs">&#8226;</span>
                              )}
                              <div className="text-gray-800 mt-0.5">{field.value}</div>
                            </div>
                          );
                        })}

                        {/* Add Bullet button — shown at the end of bullet groups */}
                        {group.entries[0]?.isBullet && (
                          <button
                            onClick={() => handleAddBullet(section.sectionType, item.itemId, group.fieldName)}
                            className="ml-3 mb-2 px-2 py-1 text-[11px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded font-medium inline-flex items-center gap-1 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add bullet
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
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
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Original Text
                  {selectedText && selectedBulletIndex !== undefined && (
                    <span className="ml-2 text-blue-500 font-normal">(bullet #{selectedBulletIndex + 1})</span>
                  )}
                </label>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 min-h-[60px]">
                  {selectedText ? (
                    <div>{selectedText}</div>
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
                    <option key={s.sectionType} value={s.sectionType}>
                      {s.sectionLabel}
                    </option>
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
              disabled={
                !suggestedText.trim() || (!selectedText && suggestionType !== 'new_summary') || !selectedSection
              }
              className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Add Suggestion
            </button>
          </div>

          {/* Suggestions List */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Suggestions ({suggestions.length})</h3>
            </div>

            {suggestions.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No suggestions added yet</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <div key={idx} className={`rounded-lg border p-3 ${getTypeStyle(s.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">{getTypeLabel(s.type)}</span>
                        {s.bulletIndex !== undefined && (
                          <span className="text-[10px] text-gray-500">bullet #{s.bulletIndex + 1}</span>
                        )}
                      </div>
                      <button onClick={() => handleRemoveSuggestion(idx)} className="text-gray-400 hover:text-red-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {s.old && (
                      <div className="mt-2">
                        <span className="text-[10px] text-gray-500">Old:</span>
                        <div className="text-xs text-gray-700 line-through">{s.old}</div>
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
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSaveDraft}
                  disabled={draftMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors border border-gray-200"
                >
                  {draftMutation.isPending ? 'Saving...' : 'Save Draft'}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {submitMutation.isPending
                    ? 'Submitting...'
                    : `Submit ${suggestions.length} Suggestion${suggestions.length !== 1 ? 's' : ''}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
