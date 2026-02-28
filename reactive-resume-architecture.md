# Reactive Resume — Architecture Deep Dive

A comprehensive analysis of [Reactive Resume](https://github.com/amruthpillai/reactive-resume), the most popular open-source resume builder, covering its architectural decisions, rendering pipeline, and state management patterns.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | TanStack Start (React 19 + Vite 8) |
| State Management | Zustand 5 + Immer |
| Undo/Redo | Zundo (temporal middleware for Zustand) |
| Forms | React Hook Form + Zod |
| Server State | TanStack Query |
| API Layer | oRPC (type-safe RPC) |
| UI Components | Radix UI |
| Styling | Tailwind CSS 4 + @tailwindcss/typography |
| Rich Text | Tiptap |
| Database | PostgreSQL + Drizzle ORM |
| Auth | Better Auth |
| PDF Generation | Puppeteer (headless Chromium) |
| Animations | Motion (Framer Motion) |
| Server Runtime | Nitro |

---

## 1. Monorepo Structure

```
reactive-resume/
├── apps/
│   ├── client/          # Main builder SPA (TanStack Start)
│   │   ├── src/
│   │   │   ├── pages/       # Route pages (builder, dashboard, auth)
│   │   │   ├── stores/      # Zustand stores
│   │   │   └── components/  # UI components
│   │   └── ...
│   ├── artboard/        # Isolated resume renderer (iframe)
│   │   ├── src/
│   │   │   ├── pages/       # preview.tsx — main render endpoint
│   │   │   └── templates/   # All resume templates
│   │   └── ...
│   └── server/          # Backend API
│       ├── src/
│       │   ├── resume/
│       │   ├── auth/
│       │   └── printer/     # PDF generation service
│       └── ...
├── libs/
│   ├── schema/          # Shared resume data schema (Zod)
│   ├── utils/           # Shared utilities
│   └── dto/             # Data transfer objects
└── ...
```

Key design decision: the **artboard is a separate application** loaded in an iframe. This guarantees style isolation — resume templates never inherit styles from the builder UI.

---

## 2. Resume Data Schema

The resume is a single JSON document with this shape:

```typescript
interface ResumeData {
  basics: {
    name: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    customFields: CustomField[];
  };

  sections: {
    profiles: Section<ProfileItem>;
    experience: Section<ExperienceItem>;
    education: Section<EducationItem>;
    projects: Section<ProjectItem>;
    skills: Section<SkillItem>;
    languages: Section<LanguageItem>;
    volunteer: Section<VolunteerItem>;
    awards: Section<AwardItem>;
    publications: Section<PublicationItem>;
    references: Section<ReferenceItem>;
  };

  customSections: CustomSection[];   // User-created sections

  metadata: {
    template: string;                // e.g. "onyx", "azurill"
    layout: LayoutConfig;
    typography: TypographyConfig;
    design: DesignConfig;
    page: PageConfig;
    css: string;                     // User-injected custom CSS
  };
}

interface Section<T> {
  name: string;
  columns: number;                   // 1-4 column layout for items
  visible: boolean;
  items: T[];
}

interface LayoutConfig {
  sidebar_width: number;             // 10-50%
  main_columns: number;
  sidebar_columns: number;
}

interface PageConfig {
  format: "A4" | "Letter" | "free-form";
  margins: { top: number; right: number; bottom: number; left: number };
  break_gaps: number;                // Spacing between pages
}
```

Every section item has an `id`, allowing drag-and-drop reordering. Custom sections follow the same `Section<T>` shape, making them interchangeable with built-in sections.

---

## 3. State Management Architecture

Reactive Resume separates state into four layers:

```
┌─────────────────────────────────────────────────┐
│                  UI State (Zustand)              │
│  Resume data, editor prefs, sidebar visibility   │
├─────────────────────────────────────────────────┤
│               Server State (TanStack Query)      │
│  Data caching, mutations, optimistic updates     │
├─────────────────────────────────────────────────┤
│                Route State (TanStack Router)     │
│  URL parameters, navigation                      │
├─────────────────────────────────────────────────┤
│           Form State (React Hook Form + Zod)     │
│  Per-component validation, dirty tracking        │
└─────────────────────────────────────────────────┘
```

### Resume Store (Zustand + Immer)

The core `useResumeStore` holds:
- Full resume document
- Editor preferences (active section, sidebar state)
- Theme/design settings

Immer middleware enables mutable-syntax writes while maintaining immutability:

```typescript
const useResumeStore = create(
  immer((set) => ({
    resume: null,
    updateBasics: (field, value) =>
      set((state) => {
        state.resume.basics[field] = value;  // Mutable syntax, immutable result
      }),
  }))
);
```

### Server Sync (TanStack Query + oRPC)

```
User Edit
  → Zustand store update (immediate, optimistic)
  → Debounced TanStack Query mutation
  → oRPC type-safe API call
  → Drizzle ORM → PostgreSQL
  → Query cache invalidation
  → UI re-render from cache
```

oRPC provides a single type contract between frontend and backend — when the server schema changes, the client gets compile-time errors. No manual API client generation needed.

---

## 4. Undo/Redo (Zundo)

Reactive Resume uses [Zundo](https://github.com/charkour/zundo), a temporal middleware for Zustand:

```typescript
import { temporal } from 'zundo';

const useResumeStore = create(
  temporal(
    immer((set) => ({
      // state + actions
    })),
    {
      partialize: (state) => ({
        // Only track resume data changes, not UI state
        resume: state.resume,
      }),
    }
  )
);
```

**How it works**:
- Every state change creates a snapshot pushed to `pastStates[]`
- `undo()` pops from `pastStates` and pushes to `futureStates`
- `redo()` pops from `futureStates` and pushes to `pastStates`
- `partialize` option filters which state slices are tracked (avoids recording UI-only changes)

**Trade-off**: Stores **full state snapshots** per action. Simple API but O(n) memory per undo step, where n = size of the resume document. For small-to-medium resumes this is fine; for very large documents with frequent edits, memory usage grows quickly.

---

## 5. Artboard & Template Rendering

### Micro-Frontend Architecture

The artboard is a **separate React app** loaded inside an iframe:

```
┌──────────────────────────────────────────────┐
│  Builder App (client)                         │
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │  Editor Sidebar   │  │  iframe           │  │
│  │  (forms, panels)  │  │  ┌────────────┐  │  │
│  │                   │  │  │  Artboard   │  │  │
│  │  Form inputs      │  │  │  App        │  │  │
│  │  Section nav      │  │  │             │  │  │
│  │  Theme controls   │  │  │  Template   │  │  │
│  │                   │  │  │  renders    │  │  │
│  │                   │  │  │  here       │  │  │
│  └──────────────────┘  │  └────────────┘  │  │
│                         └──────────────────┘  │
└──────────────────────────────────────────────┘
```

Communication: `window.postMessage()` sends resume data from builder → artboard whenever state changes.

**Why iframe isolation?**
- Resume templates need their own CSS environment — builder styles must never leak in
- Templates can load arbitrary Google Fonts without affecting the builder
- Custom CSS injection (user-provided) is sandboxed

### Template Structure

Templates live in `apps/artboard/src/templates/` with Pokemon-themed names:

```
templates/
├── azurill.tsx
├── bronzor.tsx
├── chikorita.tsx
├── ditto.tsx
├── gengar.tsx
├── glalie.tsx
├── kakuna.tsx
├── lapras.tsx
├── leafish.tsx
├── onyx.tsx
├── pikachu.tsx
└── rhyhorn.tsx
```

Each template is a **monolithic React component** (~200-400 lines):

```typescript
// Simplified template structure
export const Onyx = ({ resume }: { resume: ResumeData }) => {
  const { basics, sections, metadata } = resume;
  const primaryColor = metadata.design.primary_color;

  return (
    <div className="p-8" style={{ fontFamily: metadata.typography.font }}>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{basics.name}</h1>
        <p className="text-lg text-gray-600">{basics.headline}</p>
        <div className="flex gap-4 mt-2">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
        </div>
      </header>

      {/* Sections rendered individually */}
      {sections.experience.visible && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b"
              style={{ borderColor: primaryColor }}>
            {sections.experience.name}
          </h2>
          <div className={`grid grid-cols-${sections.experience.columns}`}>
            {sections.experience.items.map(item => (
              <article key={item.id}>
                <h3>{item.company}</h3>
                <p className="prose"
                   dangerouslySetInnerHTML={{ __html: item.summary }} />
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ... repeat for each section type */}
    </div>
  );
};
```

**Registration**: An index file maps template IDs to components. Runtime lookup by `metadata.template`:

```typescript
const templates = {
  onyx: Onyx,
  azurill: Azurill,
  pikachu: Pikachu,
  // ...
};

const Template = templates[resume.metadata.template];
return <Template resume={resume} />;
```

**Customization levers**:
- CSS variables for colors (`--primary-color` from `metadata.design.primary_color`)
- Font family from `metadata.typography.font` (loaded via Google Fonts)
- Custom CSS string from `metadata.css` injected as a `<style>` tag
- Column count per section (`section.columns`)
- Icon toggle (`metadata.design.icons`)
- Skill level display variant (`circle | square | progress-bar`)

### Limitations

- **No shared primitives**: Each template re-implements all section rendering logic. Adding a template means ~300 lines of duplicated JSX.
- **No abstraction layer**: Templates are tightly coupled to the DOM. Can't reuse the same template definition for PDF export vs. interactive preview.
- **No render tree**: The template IS the renderer — no intermediate data structure for pagination, measurement, or transformation.

---

## 6. Page Breaks & Multi-Page Handling

### Approach: Manual Page Management

Reactive Resume does **NOT auto-paginate**. Users manually manage pages:

1. Each page has a fixed height (A4 = 297mm, Letter = 279.4mm)
2. Users click "Add New Page" in the Layout panel
3. Each page has its own main column + sidebar column
4. Sections are assigned to pages manually
5. Content exceeding a page's height simply overflows (no automatic pushing)

### Print CSS

For actual PDF output, they rely on CSS print rules:

```css
/* Applied during Puppeteer PDF generation */
@media print {
  @page {
    size: A4;
    margin: 0;
  }
}

/* Prevent elements from splitting across pages */
article, section > div {
  page-break-inside: avoid;
  break-inside: avoid;
}
```

### Overflow Handling

When content exceeds page height, the artboard shows a warning below the page with suggestions:
- Switch to free-form page format (no fixed height)
- Reduce font size (supports 0.1pt increments, e.g. 11pt → 10.5pt)
- Use multi-column layout for compact sections (skills, languages)
- Move sections to a second page

### Limitations

- No automatic content reflow across pages
- Users must manually restructure their resume when content overflows
- Two-column page layouts (main + sidebar) don't auto-balance
- The "free-form" format is essentially a single infinitely tall page — avoids the problem rather than solving it

---

## 7. PDF Generation (Printer Service)

The PDF pipeline uses a dedicated headless Chrome service:

```
┌──────────┐     ┌──────────────┐     ┌─────────────────┐
│  Client   │────▶│  Server API  │────▶│  Printer Service │
│  (browser)│     │  /printer/   │     │  (Puppeteer)     │
│           │◀────│  printResume │◀────│                  │
│  download │     │  AsPDF       │     │  Headless Chrome  │
└──────────┘     └──────────────┘     └─────────────────┘
```

**Flow**:
1. Client sends resume data to `POST /api/rpc/printer/printResumeAsPDF`
2. Server passes data to the Printer service (separate container, needs ≥512MB RAM)
3. Printer launches headless Chrome, navigates to the artboard preview URL with resume data
4. Waits for rendering to complete, then calls `page.pdf()` with configured page size + margins
5. Returns the PDF binary to the client

**Why headless Chrome?**
- Pixel-perfect rendering — the PDF matches exactly what the user sees in the preview
- Full CSS support including custom fonts, flexbox, grid
- Handles `@page` rules and print media queries natively

**Trade-offs**:
- Requires running a separate service with significant memory (512MB+)
- Cold starts are slow (~2-5 seconds for Chrome launch)
- Canvas elements can render blank in headless mode
- Multi-page PDFs sometimes have issues after the first page

---

## 8. Builder UI Architecture

### Layout

```
┌────────────────────────────────────────────────────┐
│ Toolbar (undo/redo, zoom, template picker, export) │
├──────────┬────────────────┬────────────────────────┤
│ Section  │  Form Editor   │  Live Preview          │
│ Nav      │                │  (iframe artboard)     │
│          │  Active section│                        │
│ - Basics │  form fields   │  ┌──────────────────┐  │
│ - Exp.   │                │  │  Resume Page 1   │  │
│ - Edu.   │  Rich text     │  │                  │  │
│ - Skills │  (Tiptap)      │  │                  │  │
│ - ...    │                │  └──────────────────┘  │
│          │  Drag-and-drop │                        │
│          │  reordering    │  ┌──────────────────┐  │
│          │                │  │  Resume Page 2   │  │
│ Layout   │                │  │                  │  │
│ Design   │                │  └──────────────────┘  │
│ Settings │                │                        │
├──────────┴────────────────┴────────────────────────┤
│ Status bar                                          │
└────────────────────────────────────────────────────┘
```

### Data Flow

```
User types in form field
  → React Hook Form captures input
  → Zod validates
  → Zustand store updated (with Immer)
  → Zundo captures snapshot (for undo/redo)
  → TanStack Query mutation (debounced)
  → postMessage to artboard iframe
  → Artboard re-renders template
  → oRPC API call to persist
  → PostgreSQL updated
```

### Key UI Patterns

1. **Split-panel design**: Resizable panels for editor and preview
2. **Section-based navigation**: Sidebar lists all resume sections; clicking one loads its form
3. **Inline editing**: Tiptap rich text editors for description fields (bold, italic, links, lists)
4. **Drag-and-drop**: Reorder sections and items within sections
5. **Real-time preview**: Every edit immediately reflects in the artboard iframe
6. **Theme controls**: Color picker, font selector, template switcher in toolbar

---

## 9. Auto-Save & Persistence

### Strategy

```typescript
// Simplified auto-save pattern
const debouncedSave = useDebouncedCallback(
  async (resumeData) => {
    await mutation.mutateAsync(resumeData);
  },
  1000  // 1 second debounce
);

// On every store change
useResumeStore.subscribe((state) => {
  debouncedSave(state.resume);
});
```

### Features

- **Debounced saves**: Waits 1s after last edit before persisting
- **Optimistic updates**: UI updates immediately; server catches up
- **Conflict resolution**: Last-write-wins (no CRDT/OT)
- **Cross-tab sync**: `broadcastQueryClient` from TanStack Query syncs cache across browser tabs
- **Offline resilience**: TanStack Query can persist mutations and retry when connection restores

---

## 10. Key Architectural Decisions & Trade-offs

### Good Decisions

1. **iframe isolation for artboard**: Guarantees style sandboxing. Templates can use any CSS without affecting the builder.
2. **Zustand over Redux**: Minimal boilerplate, hook-based API, great TypeScript support.
3. **Zod schema as source of truth**: Single schema validates forms, API payloads, and database writes.
4. **oRPC for API**: Type safety from database to UI without code generation.
5. **Headless Chrome for PDF**: Pixel-perfect output matching the preview exactly.
6. **Custom CSS support**: Power users can inject their own CSS for fine-tuned control.

### Trade-offs & Limitations

1. **Full state snapshots for undo/redo**: Zundo stores the entire resume per action. Works for small resumes but doesn't scale well for frequent edits on large documents. Patch-based approaches (Immer `produceWithPatches`) are more memory-efficient.
2. **Monolithic templates**: No shared rendering primitives. Each template duplicates section rendering logic. Adding a new template is ~300+ lines of copy-paste-modify.
3. **No automatic pagination**: Users manually manage page overflow. This is the biggest UX gap — most users expect content to flow to the next page automatically.
4. **iframe communication overhead**: `postMessage` adds latency between edits and preview updates. Direct in-process rendering would be faster.
5. **Puppeteer PDF dependency**: Requires a separate service with significant memory. Cold starts are slow. Client-side PDF generation (e.g., via `html2canvas` + `jsPDF` or server-side rendering) could reduce infrastructure costs.
6. **No collaborative editing**: Single-user, last-write-wins. The architecture doesn't support real-time multi-user editing.

---

## 11. Summary

Reactive Resume is a well-engineered project with clean separation of concerns (builder, artboard, server), modern tooling (Zustand, TanStack, oRPC), and solid developer experience. Its main architectural strengths are iframe-based style isolation and type-safe API communication.

Its main weaknesses are:
- Manual page management instead of automatic pagination
- Monolithic template components with no shared abstraction
- Full-snapshot undo/redo that doesn't scale
- Heavy PDF generation infrastructure (headless Chrome)

These are the areas where a next-generation builder can differentiate — particularly with automatic pagination via render tree measurement, shared template primitives via an abstract render tree, and patch-based undo/redo for efficient history management.
