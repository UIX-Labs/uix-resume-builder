# Snapshot Testing: Step-by-Step Example

Let me walk you through a real example of how snapshot testing works.

## Step 1: Understanding What Gets Saved

When you run `pnpm test`, Vitest creates snapshot files like this:

**File:** `src/features/resume/__tests__/__snapshots__/section-renderers.test.tsx.snap`

```html
exports[`Section Renderer Snapshots > Header Section Renderer > renders header section with personal details 1`] = `
<div>
  <div class="flex flex-col gap-2" data-section="header">
    <p class="text-xl font-bold">John Doe</p>
    <div class="flex flex-row flex-wrap gap-2 text-xs">
      <span>+1 (555) 123-4567</span>
      <span> | </span>
      <a href="mailto:john.doe@email.com">john.doe@email.com</a>
    </div>
  </div>
</div>
`;
```

This is the **baseline** - what your component rendered correctly.

## Step 2: Making a Change

Let's say you modify `template1.ts` to change the header color:

**Before:**
```typescript
name: {
  className: 'text-xl font-bold text-black',  // Black text
}
```

**After:**
```typescript
name: {
  className: 'text-xl font-bold text-blue-600',  // Blue text
}
```

## Step 3: Running Tests

```bash
pnpm test
```

## Step 4: Test Failure (Expected!)

The test fails and shows you a diff:

```
FAIL src/features/resume/__tests__/template-snapshots.test.tsx
  ✕ renders template1 template correctly

  - Expected (from snapshot)
  + Received (from current render)

  - <p class="text-xl font-bold text-black">John Doe</p>
  + <p class="text-xl font-bold text-blue-600">John Doe</p>
```

## Step 5: Decision Time

**Question:** Is this change intentional?

### Option A: Yes, I meant to change it to blue ✅

```bash
# Update the snapshot to accept the new blue color
pnpm test:update

# Verify it works
pnpm test
# ✅ All tests pass
```

### Option B: No, this is a bug! ❌

```bash
# Fix the bug in your template
# Change it back to text-black

# Run tests again
pnpm test
# ✅ Tests pass (matches original snapshot)
```

## Step 6: Reviewing Changes

After updating snapshots, you can see what changed:

```bash
# See what snapshots changed
git diff src/features/resume/__tests__/__snapshots__/

# Review each change to make sure it's correct
```

## Real Example: What Happens When You Break Something

Let's say you accidentally remove a closing `</div>` tag:

**Your code:**
```typescript
<div className="flex flex-col">
  <p>Hello</p>
  // Missing </div> here!
```

**Test output:**
```
FAIL Section Renderer Snapshots > Header Section Renderer

- Expected (from snapshot)
+ Received (from current render)

- </div>
+ (HTML structure is broken - missing closing tag)
```

**Action:** Fix the bug, run tests again, they pass!

## Visual Comparison

Think of snapshots like this:

```
┌─────────────────────────────────┐
│   SNAPSHOT (Saved Baseline)     │
│                                 │
│   <div class="old">             │
│     <p>Content</p>              │
│   </div>                        │
└─────────────────────────────────┘
           ⬇️ Compare ⬇️
┌─────────────────────────────────┐
│   CURRENT OUTPUT (New Render)   │
│                                 │
│   <div class="new">             │
│     <p>Content</p>              │
│   </div>                        │
└─────────────────────────────────┘

Result: ❌ Different! Test fails.
```

## Quick Commands Cheat Sheet

```bash
# See what tests are failing
pnpm test

# Watch mode - auto-rerun on file changes
pnpm test:watch

# Accept all changes (use carefully!)
pnpm test:update

# Run specific test file
pnpm test templates.test.ts

# Run tests matching a pattern
pnpm test template-snapshots
```

## Common Scenarios

### Scenario 1: You Updated a Template's Styling
```bash
# 1. Made changes to template
# 2. Run tests
pnpm test
# 3. See failures
# 4. Review diffs - looks good!
pnpm test:update
# 5. Commit both template changes AND snapshot updates
```

### Scenario 2: You Broke Something
```bash
# 1. Made changes
# 2. Run tests
pnpm test
# 3. See failures
# 4. Review diffs - oh no, I broke the HTML structure!
# 5. Fix the bug
# 6. Run tests again
pnpm test
# 7. ✅ Passes (matches original snapshot)
```

### Scenario 3: You Want to See What Changed
```bash
# After updating snapshots, see the diff
git diff src/features/resume/__tests__/__snapshots__/

# Or view a specific snapshot file
cat src/features/resume/__tests__/__snapshots__/template-snapshots.test.tsx.snap
```

## Key Takeaways

1. **Snapshots = Saved HTML output** of your templates
2. **Tests compare** current output vs saved snapshot
3. **If different** → Review the diff carefully
4. **If intentional** → Update snapshot with `pnpm test:update`
5. **If bug** → Fix your code, snapshot stays the same

## Pro Tip

When reviewing snapshot diffs, ask yourself:
- ✅ "Did I mean to make this change?" → Update snapshot
- ❌ "Is this a mistake?" → Fix your code

Snapshots are your **regression detector** - they catch when things break unexpectedly!
