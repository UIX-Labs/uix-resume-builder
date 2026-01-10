# Testing Guide: Understanding Snapshot Testing

## What Are Snapshots?

Snapshots are **saved copies of your component's HTML output**. Think of them as "photographs" of what your templates render at a specific point in time.

## How Snapshot Testing Works

### 1. **First Run (Creating Snapshots)**
When you run tests for the first time, Vitest:
- Renders your component/template
- Captures the HTML output
- Saves it to a `.snap` file
- ✅ Test passes (nothing to compare against yet)

### 2. **Subsequent Runs (Comparing)**
On future test runs, Vitest:
- Renders your component again
- Compares the new output with the saved snapshot
- ✅ **If identical** → Test passes (nothing changed)
- ❌ **If different** → Test fails (shows you exactly what changed)

## Example: Understanding a Snapshot

Let's look at a real snapshot from your tests:

```html
<!-- This is what gets saved in the .snap file -->
<div>
  <div class="flex flex-col text-sm font-bold">
    <p data-item="heading">Skills</p>
  </div>
  <div class="flex flex-wrap gap-2">
    <span>
      <span class="px-2 py-1 bg-blue-600 text-white rounded">
        JavaScript/TypeScript
      </span>
    </span>
    <span>
      <span class="px-2 py-1 bg-blue-600 text-white rounded">
        React.js & Next.js
      </span>
    </span>
  </div>
</div>
```

This snapshot captures:
- The exact HTML structure
- All CSS classes
- All data attributes
- The text content

## How to Use Snapshots

### Scenario 1: Making Intentional Changes ✅

**Example:** You update a template's styling from `bg-blue-600` to `bg-green-600`

1. **Make your change** in the template file
2. **Run tests**: `pnpm test`
3. **Test fails** showing the difference:
   ```
   - Expected (old snapshot)
   + Received (new output)
   
   - class="px-2 py-1 bg-blue-600 text-white rounded"
   + class="px-2 py-1 bg-green-600 text-white rounded"
   ```
4. **Review the diff** - make sure the change is what you wanted
5. **Update the snapshot**: `pnpm test:update`
6. ✅ Tests pass again with the new snapshot

### Scenario 2: Catching Unintended Changes ❌

**Example:** You accidentally break a template's structure

1. **Make a change** that breaks something (e.g., remove a closing tag)
2. **Run tests**: `pnpm test`
3. **Test fails** showing:
   ```
   - Expected (old snapshot)
   + Received (new output)
   
   - </div>
   + (missing closing tag - HTML structure broken)
   ```
4. **Review the error** - realize you made a mistake
5. **Fix the bug** in your code
6. **Run tests again**: `pnpm test`
7. ✅ Tests pass (output matches snapshot again)

## Practical Workflow

### Daily Development

```bash
# 1. Run tests in watch mode while developing
pnpm test:watch

# 2. When you see a snapshot failure:
#    - Review the diff carefully
#    - If change is intentional → Update snapshot
#    - If change is a bug → Fix your code

# 3. Update snapshots for intentional changes
pnpm test:update
```

### Before Committing

```bash
# Run all tests to ensure everything passes
pnpm test

# If snapshots need updating, review each change:
pnpm test:update

# Review the git diff of .snap files to verify changes
git diff src/features/resume/__tests__/__snapshots__/
```

## Reading Snapshot Diffs

When a test fails, Vitest shows you a diff:

```
- Expected (from snapshot file)
+ Received (from current render)

- <div class="old-class">
+ <div class="new-class">
```

**What to look for:**
- ✅ **Intentional changes**: Updated classes, new elements, changed text
- ❌ **Unintended changes**: Missing elements, broken HTML, wrong data

## Best Practices

### ✅ DO:
- **Review snapshot diffs carefully** before updating
- **Update snapshots** when you intentionally change templates
- **Commit snapshot files** to version control (they're part of your tests)
- **Use descriptive test names** so snapshots are easy to identify

### ❌ DON'T:
- **Don't blindly update** all snapshots without reviewing
- **Don't ignore** snapshot failures - they're catching real issues
- **Don't edit snapshots manually** - always use `pnpm test:update`

## Example: Real-World Scenario

Let's say you're updating the "aniket" template:

```bash
# 1. You modify template1.ts to change header styling
# 2. Run tests
pnpm test

# 3. Test fails:
#    FAIL template-snapshots.test.tsx > renders aniket template correctly
#    - Expected: class="text-xl font-bold text-black"
#    + Received: class="text-xl font-bold text-blue-600"

# 4. Review: "Yes, I intentionally changed the color to blue"
# 5. Update snapshot
pnpm test:update

# 6. Verify the change
pnpm test
# ✅ All tests pass
```

## What Gets Tested

Your snapshot tests cover:

1. **Template Structure** (88 tests)
   - All templates have required fields
   - Valid section types
   - Proper configuration

2. **Section Renderers** (9 tests)
   - Header sections render correctly
   - List sections format properly
   - Badge sections display items
   - Content sections show text

3. **Full Templates** (66 tests)
   - Each of 22 templates renders completely
   - No errors thrown
   - Produces non-empty output

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm test` | Run all tests once |
| `pnpm test:watch` | Run tests in watch mode (auto-rerun on changes) |
| `pnpm test:update` | Update all snapshots after intentional changes |

## Troubleshooting

**Q: My snapshot test failed but the output looks correct. What do I do?**
A: Review the diff carefully. If the change is intentional and correct, run `pnpm test:update` to accept it.

**Q: I see a lot of snapshot changes. How do I know which ones are intentional?**
A: Review each diff. Look at what changed - classes, structure, content. If you made those changes intentionally, update the snapshot.

**Q: Can I see what a snapshot looks like without running tests?**
A: Yes! Open the `.snap` files in `src/features/resume/__tests__/__snapshots__/` - they're human-readable HTML.

**Q: What if I accidentally broke something and updated the snapshot?**
A: Use git to revert the snapshot file: `git checkout -- src/features/resume/__tests__/__snapshots__/filename.snap`

## Summary

**Snapshots = Saved HTML output**

- ✅ **Match** = Nothing changed, test passes
- ❌ **Don't match** = Something changed, review the diff
  - If intentional → Update snapshot
  - If bug → Fix your code

Snapshots are your **safety net** - they catch when templates break unexpectedly!
