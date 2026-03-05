'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResumeRenderer } from '@/features/resume/renderer';
import { getCleanDataForRenderer } from '@/widgets/form-page-builder/lib/data-cleanup';
import aniketTemplate from '@/features/resume/templates/standard';
import {
  useResumeForReview,
  useSubmitReviewSuggestions,
  useSaveDraftSuggestions,
} from '@/features/admin/hooks/use-admin-queries';
import type { ReviewSuggestionItem } from '@/features/admin/types/admin.types';
import { TiptapTextArea } from '@shared/ui';

// ---------------------------------------------------------------------------
// Suggestion types — kept in sync with SuggestionType enum used by Pika Intelligence
// (spelling_error, sentence_refinement, new_summary)
// ---------------------------------------------------------------------------
const SUGGESTION_TYPES = [
  { value: 'spelling_error', label: 'Spelling', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { value: 'sentence_refinement', label: 'Weak Sentence', color: 'bg-red-50 text-red-700 border-red-200' },
  { value: 'new_summary', label: 'New Point', color: 'bg-green-50 text-green-700 border-green-200' },
] as const;

function getTypeStyle(type: string) {
  return SUGGESTION_TYPES.find((t) => t.value === type)?.color || 'bg-gray-50 text-gray-700 border-gray-200';
}

function getTypeLabel(type: string) {
  return SUGGESTION_TYPES.find((t) => t.value === type)?.label || type;
}

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------

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

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

// ---------------------------------------------------------------------------
// FieldEntry + extractTextSections — used to map selected text → section/item/field
// ---------------------------------------------------------------------------

interface FieldEntry {
  fieldName: string;
  value: string;
  rawHtml: string; // original HTML (before stripping)
  bulletIndex?: number;
  isBullet: boolean;
  totalBullets?: number;
}

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
          if (fieldValue.includes('<li')) {
            const bullets = parseBullets(fieldValue);
            if (bullets.length > 0) {
              bullets.forEach((bullet, bulletIdx) => {
                fields.push({
                  fieldName,
                  value: stripHtml(bullet),
                  rawHtml: bullet,
                  bulletIndex: bulletIdx,
                  isBullet: true,
                  totalBullets: bullets.length,
                });
              });
            } else {
              fields.push({ fieldName, value: stripHtml(fieldValue), rawHtml: fieldValue, isBullet: false });
            }
          } else {
            fields.push({ fieldName, value: stripHtml(fieldValue), rawHtml: fieldValue, isBullet: false });
          }
        }
        if (fieldName === 'items' && Array.isArray(fieldValue)) {
          for (const textItem of fieldValue) {
            if (typeof textItem === 'string' && textItem.trim()) {
              fields.push({ fieldName: 'items', value: textItem, rawHtml: textItem, isBullet: false });
            }
          }
        }
      }

      return { itemId: item.itemId || item.id, fields };
    });

    if (items.some((i: any) => i.fields.length > 0)) {
      sections.push({ sectionType: key, sectionLabel: label, items });
    }
  }

  return sections;
}

// ---------------------------------------------------------------------------
// Section-ID → data-key map (template data-section attr → resume data key)
// ---------------------------------------------------------------------------
const sectionToDataKeyMap: Record<string, string> = {
  header: 'personalDetails',
  personaldetails: 'personalDetails',
  'header-section': 'personalDetails',
  summary: 'personalDetails',
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  projects: 'projects',
  certifications: 'certifications',
  interests: 'interests',
  achievements: 'achievements',
  publications: 'publications',
};

// ---------------------------------------------------------------------------
// Backend format converters
// ---------------------------------------------------------------------------

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

// ═══════════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════════

export default function ReviewSuggestionPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const router = useRouter();
  const { data, isLoading } = useResumeForReview(resumeId);
  const submitMutation = useSubmitReviewSuggestions();
  const draftMutation = useSaveDraftSuggestions();

  // ── Suggestions state ──────────────────────────────────────────────────
  const [suggestions, setSuggestions] = useState<ReviewSuggestionItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // ── Selection state ────────────────────────────────────────────────────
  const [selectedText, setSelectedText] = useState('');
  const [selectedHtml, setSelectedHtml] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedFieldName, setSelectedFieldName] = useState('');
  const [selectedBulletIndex, setSelectedBulletIndex] = useState<number | undefined>(undefined);

  // ── Form state ─────────────────────────────────────────────────────────
  const [suggestedText, setSuggestedText] = useState('');
  const [suggestionType, setSuggestionType] = useState<string>('sentence_refinement');
  const [tiptapKey, setTiptapKey] = useState(0);

  // ── Draft state ────────────────────────────────────────────────────────
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // ── Refs ───────────────────────────────────────────────────────────────
  const resumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [resumeScale, setResumeScale] = useState(1);

  // ── Measure container and compute zoom ─────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const A4_WIDTH_PX = 793.7;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width;
      if (width && width > 0) {
        setResumeScale(Math.min(1, width / A4_WIDTH_PX));
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Load existing draft ────────────────────────────────────────────────
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

  // ── Track unsaved changes ──────────────────────────────────────────────
  useEffect(() => {
    if (draftLoaded) setHasUnsavedChanges(true);
  }, [suggestions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Template + data ────────────────────────────────────────────────────
  const template = useMemo(() => data?.resume?.template?.json || aniketTemplate, [data?.resume?.template?.json]);

  const cleanedData = useMemo(
    () => (data?.resume ? getCleanDataForRenderer(data.resume as Record<string, unknown>, false) : {}),
    [data?.resume],
  );

  // Merge current suggestions into renderer data so they get highlighted
  const dataWithSuggestions = useMemo(() => {
    if (suggestions.length === 0) return cleanedData;

    const formatted = formatSuggestionsForBackend(suggestions);
    const merged = { ...cleanedData } as Record<string, any>;

    for (const [sectionKey, sectionSuggestions] of Object.entries(formatted)) {
      if (merged[sectionKey] && typeof merged[sectionKey] === 'object') {
        merged[sectionKey] = {
          ...merged[sectionKey],
          suggestedUpdates: (sectionSuggestions as any).suggestedUpdates,
        };
      }
    }

    return merged;
  }, [cleanedData, suggestions]);

  // Text sections for mapping selected text → section/item/field
  const textSections = useMemo(() => (data?.resume ? extractTextSections(data.resume) : []), [data?.resume]);

  // ── Clear form ─────────────────────────────────────────────────────────
  const clearForm = useCallback(() => {
    setSelectedText('');
    setSelectedHtml('');
    setSelectedSection('');
    setSelectedItemId('');
    setSelectedFieldName('');
    setSelectedBulletIndex(undefined);
    setSuggestedText('');
    setEditingIndex(null);
    setTiptapKey((k) => k + 1);
  }, []);

  // ── Handle text selection on rendered resume ───────────────────────────
  const handleResumeMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedStr = selection.toString().trim();
    if (!selectedStr) return;

    // Capture HTML from the selection
    const range = selection.getRangeAt(0);
    const fragment = range.cloneContents();
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(fragment);
    const selectionHtml = tempDiv.innerHTML;

    // Walk up from anchor node to find data-section
    let node: Node | null = selection.anchorNode;
    let sectionId = '';
    while (node && node !== resumeRef.current) {
      if (node instanceof HTMLElement) {
        const ds = node.getAttribute('data-section');
        if (ds) {
          sectionId = ds;
          break;
        }
      }
      node = node.parentNode;
    }

    if (!sectionId) return;

    const dataKey = sectionToDataKeyMap[sectionId.toLowerCase()] || sectionId;
    const section = textSections.find((s) => s.sectionType === dataKey);
    if (!section) return;

    // Search for matching field
    let foundItem: string | null = null;
    let foundField: string | null = null;
    let foundBulletIndex: number | undefined = undefined;
    let foundRawHtml = '';

    const normalizedSelection = selectedStr.toLowerCase().replace(/\s+/g, ' ');

    for (const item of section.items) {
      for (const field of item.fields) {
        const normalizedField = field.value.toLowerCase().replace(/\s+/g, ' ');
        if (normalizedField.includes(normalizedSelection) || normalizedSelection.includes(normalizedField)) {
          foundItem = item.itemId;
          foundField = field.fieldName;
          foundBulletIndex = field.bulletIndex;
          foundRawHtml = field.rawHtml;
          break;
        }
      }
      if (foundItem) break;
    }

    setEditingIndex(null);
    setSelectedSection(dataKey);
    setSelectedItemId(foundItem || section.items[0]?.itemId || '');
    setSelectedFieldName(foundField || '');
    setSelectedBulletIndex(foundBulletIndex);
    setSelectedText(selectedStr);
    setSelectedHtml(selectionHtml || foundRawHtml || selectedStr);
    setSuggestedText('');
    setTiptapKey((k) => k + 1);
  }, [textSections]);

  // ── Handle click on highlighted suggestion in resume ───────────────────
  useEffect(() => {
    const container = resumeRef.current;
    if (!container || suggestions.length === 0) return;

    const handleClick = (e: MouseEvent) => {
      let el = e.target as HTMLElement | null;
      while (el && el !== container) {
        const attr = el.getAttribute('data-suggestion');
        if (attr) {
          const [sId, itemId, fieldName] = attr.split('|');
          const dataKey = sectionToDataKeyMap[sId.toLowerCase()] || sId;

          // Find the first matching suggestion
          const idx = suggestions.findIndex(
            (s) => s.sectionType === dataKey && s.itemId === itemId && s.fieldName === fieldName,
          );

          if (idx !== -1) {
            const s = suggestions[idx];
            setSelectedSection(s.sectionType);
            setSelectedItemId(s.itemId);
            setSelectedFieldName(s.fieldName);
            setSelectedBulletIndex(s.bulletIndex);
            setSelectedText(s.old || '');
            setSelectedHtml(s.old || '');
            setSuggestedText(s.new);
            setSuggestionType(s.type);
            setEditingIndex(idx);
            setTiptapKey((k) => k + 1);
            e.preventDefault();
            e.stopPropagation();
          }
          break;
        }
        el = el.parentElement;
      }
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [suggestions]);

  // ── Add or update suggestion ───────────────────────────────────────────
  const handleAddOrUpdateSuggestion = () => {
    if (!suggestedText.trim()) return;

    const suggestion: ReviewSuggestionItem = {
      sectionType: selectedSection,
      itemId: selectedItemId,
      fieldName: selectedFieldName,
      ...(suggestionType !== 'new_summary' && selectedText && { old: selectedText }),
      new: suggestedText,
      type: suggestionType as ReviewSuggestionItem['type'],
      ...(selectedBulletIndex !== undefined && { bulletIndex: selectedBulletIndex }),
    };

    if (editingIndex !== null) {
      setSuggestions((prev) => prev.map((s, i) => (i === editingIndex ? suggestion : s)));
    } else {
      setSuggestions((prev) => [...prev, suggestion]);
    }

    clearForm();
  };

  const handleRemoveSuggestion = (index: number) => {
    setSuggestions((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) clearForm();
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

  // ── Loading / error states ─────────────────────────────────────────────
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

  // ═════════════════════════════════════════════════════════════════════════
  // Render
  // ═════════════════════════════════════════════════════════════════════════

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

      <p className="text-xs text-gray-400 mb-4">
        Highlight text on the resume to select it, then add your suggestion in the panel on the right. Click a
        highlighted suggestion to edit it.
      </p>

      {/* Split pane — single page scroll */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Rendered Resume — uses CSS zoom so layout size adjusts naturally */}
        <div ref={containerRef} className="flex-1 min-w-0">
          {/* biome-ignore lint/a11y/noStaticElementInteractions: text selection + suggestion click */}
          <div
            ref={resumeRef}
            onMouseUp={handleResumeMouseUp}
            className="select-text cursor-text origin-top-left"
            style={{ zoom: resumeScale < 1 ? resumeScale : undefined }}
          >
            <ResumeRenderer
              template={template}
              data={dataWithSuggestions}
              hasSuggestions={suggestions.length > 0}
              isThumbnail={false}
            />
          </div>
        </div>

        {/* Right: Suggestion Panel (sticky, scrolls within viewport) */}
        <div className="w-full lg:w-[380px] lg:shrink-0 space-y-4 lg:sticky lg:top-[24px] lg:max-h-[calc(100vh-48px)] lg:overflow-y-auto">
          {/* Suggestion Builder */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingIndex !== null ? 'Edit Suggestion' : 'Add Suggestion'}
              </h3>
              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Cancel edit
                </button>
              )}
            </div>

            {/* Suggestion Type */}
            <div className="mb-4">
              <span className="block text-xs font-medium text-gray-500 mb-2">Type</span>
              <div className="flex flex-wrap gap-2">
                {SUGGESTION_TYPES.map((t) => (
                  <button
                    type="button"
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

            {/* Original text — rendered with HTML styling */}
            {suggestionType !== 'new_summary' && (
              <div className="mb-4">
                <span className="block text-xs font-medium text-gray-500 mb-1">
                  Original Text
                  {selectedText && selectedBulletIndex !== undefined && (
                    <span className="ml-2 text-blue-500 font-normal">(bullet #{selectedBulletIndex + 1})</span>
                  )}
                </span>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 min-h-[60px] prose prose-sm max-w-none">
                  {selectedHtml ? (
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: renders the selected resume HTML
                    <div dangerouslySetInnerHTML={{ __html: selectedHtml }} />
                  ) : (
                    <span className="text-gray-400 italic not-prose">Highlight text on the resume to select</span>
                  )}
                </div>
              </div>
            )}

            {/* Section selector for new_summary */}
            {suggestionType === 'new_summary' && !selectedSection && (
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Select Section
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
                </label>
              </div>
            )}

            {/* Suggested text — TipTap rich-text editor */}
            <div className="mb-4">
              <span className="block text-xs font-medium text-gray-500 mb-1">Suggested Text</span>
              <TiptapTextArea
                key={tiptapKey}
                defaultValue={suggestedText}
                onChange={(_text, html) => setSuggestedText(html)}
                placeholder="Type your suggested improvement..."
                showToolbar={true}
                minHeight="100px"
                maxHeight="200px"
              />
            </div>

            <button
              type="button"
              onClick={handleAddOrUpdateSuggestion}
              disabled={
                !suggestedText.trim() || (!selectedText && suggestionType !== 'new_summary') || !selectedSection
              }
              className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {editingIndex !== null ? 'Update Suggestion' : 'Add Suggestion'}
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
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list
                  <div
                    key={idx}
                    className={`rounded-lg border p-3 transition-all ${getTypeStyle(s.type)} ${
                      editingIndex === idx ? 'ring-2 ring-blue-400' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">{getTypeLabel(s.type)}</span>
                        {s.bulletIndex !== undefined && (
                          <span className="text-[10px] text-gray-500">bullet #{s.bulletIndex + 1}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSuggestion(idx)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {s.old && (
                      <div className="mt-2">
                        <span className="text-[10px] text-gray-500">Old:</span>
                        <div className="text-xs text-gray-700 line-through">{stripHtml(s.old)}</div>
                      </div>
                    )}
                    <div className="mt-1">
                      <span className="text-[10px] text-gray-500">New:</span>
                      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: renders suggestion HTML */}
                      <div
                        className="text-xs text-gray-900 font-medium prose prose-xs max-w-none"
                        dangerouslySetInnerHTML={{ __html: s.new }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={draftMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors border border-gray-200"
                >
                  {draftMutation.isPending ? 'Saving...' : 'Save Draft'}
                </button>
                <button
                  type="button"
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
