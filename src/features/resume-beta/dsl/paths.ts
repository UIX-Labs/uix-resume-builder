// ---------------------------------------------------------------------------
// Typed path builders for resume template DSL
//
// These functions produce plain strings at runtime (compatible with the
// existing `resolvePath` utility), but carry compile-time type information
// via branded types. This means renaming a field in the data model (e.g.
// `ExperienceItem.company`) will surface as a TypeScript error in every
// template that references that field.
// ---------------------------------------------------------------------------

import type { ResumeSectionMap, ObjectSection, StringSection } from '../models/resume-sections';

// ---------------------------------------------------------------------------
// Branded path type
// ---------------------------------------------------------------------------

declare const __brand: unique symbol;

/**
 * A string at runtime that carries phantom type `T` at compile time.
 * `T` represents the type of the value this path resolves to.
 */
export type FieldPath<T = unknown> = string & { readonly [__brand]: T };

// ---------------------------------------------------------------------------
// Helper types
// ---------------------------------------------------------------------------

export type SectionKey = keyof ResumeSectionMap;

/** Extract the item type from a section (e.g. ExperienceItem from ObjectSection<ExperienceItem>) */
export type ItemTypeOf<K extends SectionKey> = ResumeSectionMap[K] extends ObjectSection<infer T>
  ? T
  : ResumeSectionMap[K] extends StringSection
    ? string
    : never;

// ---------------------------------------------------------------------------
// Section-level paths (e.g. "experience.items", "experience.title")
// ---------------------------------------------------------------------------

export function sectionPath<K extends SectionKey>(key: K, prop: 'items'): FieldPath<ItemTypeOf<K>[]>;

export function sectionPath<K extends SectionKey>(key: K, prop: 'heading' | 'title'): FieldPath<string>;

export function sectionPath(key: string, prop: string): FieldPath {
  return `${key}.${prop}` as FieldPath;
}

// ---------------------------------------------------------------------------
// Item-level paths (relative — used inside itemTemplate)
// e.g. itemField('experience', 'company') → "company"
// ---------------------------------------------------------------------------

export function itemField<K extends SectionKey, F extends string & keyof ItemTypeOf<K>>(
  _section: K,
  field: F,
): FieldPath<ItemTypeOf<K>[F]> {
  return field as unknown as FieldPath<ItemTypeOf<K>[F]>;
}

// ---------------------------------------------------------------------------
// Nested item paths (2 levels deep)
// e.g. itemFieldNested('personalDetails', 'links', 'linkedin') → "links.linkedin"
// ---------------------------------------------------------------------------

export function itemFieldNested<
  K extends SectionKey,
  F1 extends string & keyof ItemTypeOf<K>,
  F2 extends string & keyof NonNullable<ItemTypeOf<K>[F1]>,
>(_section: K, f1: F1, f2: F2): FieldPath<NonNullable<ItemTypeOf<K>[F1]>[F2]> {
  return `${f1}.${f2}` as unknown as FieldPath<NonNullable<ItemTypeOf<K>[F1]>[F2]>;
}

// ---------------------------------------------------------------------------
// Deep item paths (3 levels deep)
// e.g. itemFieldDeep('personalDetails', 'links', 'linkedin', 'title') → "links.linkedin.title"
// ---------------------------------------------------------------------------

export function itemFieldDeep<
  K extends SectionKey,
  F1 extends string & keyof ItemTypeOf<K>,
  F2 extends string & keyof NonNullable<ItemTypeOf<K>[F1]>,
  F3 extends string & keyof NonNullable<NonNullable<ItemTypeOf<K>[F1]>[F2]>,
>(_section: K, f1: F1, f2: F2, f3: F3): FieldPath<NonNullable<NonNullable<ItemTypeOf<K>[F1]>[F2]>[F3]> {
  return `${f1}.${f2}.${f3}` as unknown as FieldPath<NonNullable<NonNullable<ItemTypeOf<K>[F1]>[F2]>[F3]>;
}

// ---------------------------------------------------------------------------
// Absolute paths (full path from root data object)
// e.g. absolutePath('personalDetails', 'fullName') → "personalDetails.items[0].fullName"
// ---------------------------------------------------------------------------

export function absolutePath<K extends SectionKey, F extends string & keyof ItemTypeOf<K>>(
  section: K,
  field: F,
): FieldPath<ItemTypeOf<K>[F]> {
  return `${section}.items[0].${field}` as unknown as FieldPath<ItemTypeOf<K>[F]>;
}

// ---------------------------------------------------------------------------
// Absolute nested paths (2 levels into an item from root)
// e.g. absolutePathNested('personalDetails', 'links', 'linkedin') →
//      "personalDetails.items[0].links.linkedin"
// ---------------------------------------------------------------------------

export function absolutePathNested<
  K extends SectionKey,
  F1 extends string & keyof ItemTypeOf<K>,
  F2 extends string & keyof NonNullable<ItemTypeOf<K>[F1]>,
>(section: K, f1: F1, f2: F2): FieldPath<NonNullable<ItemTypeOf<K>[F1]>[F2]> {
  return `${section}.items[0].${f1}.${f2}` as unknown as FieldPath<NonNullable<ItemTypeOf<K>[F1]>[F2]>;
}

// ---------------------------------------------------------------------------
// Absolute deep paths (3 levels into an item from root)
// e.g. absolutePathDeep('personalDetails', 'links', 'linkedin', 'title') →
//      "personalDetails.items[0].links.linkedin.title"
// ---------------------------------------------------------------------------

export function absolutePathDeep<
  K extends SectionKey,
  F1 extends string & keyof ItemTypeOf<K>,
  F2 extends string & keyof NonNullable<ItemTypeOf<K>[F1]>,
  F3 extends string & keyof NonNullable<NonNullable<ItemTypeOf<K>[F1]>[F2]>,
>(section: K, f1: F1, f2: F2, f3: F3): FieldPath<NonNullable<NonNullable<ItemTypeOf<K>[F1]>[F2]>[F3]> {
  return `${section}.items[0].${f1}.${f2}.${f3}` as unknown as FieldPath<
    NonNullable<NonNullable<ItemTypeOf<K>[F1]>[F2]>[F3]
  >;
}

// ---------------------------------------------------------------------------
// Raw path (escape hatch for paths not covered by the typed builders)
// Use sparingly — this bypasses compile-time checking.
// ---------------------------------------------------------------------------

export function rawPath<T = unknown>(path: string): FieldPath<T> {
  return path as FieldPath<T>;
}
