---
name: implement-review-feedback
description: Implements feedback from code reviews in the .reviews folder. Use when the user wants to address review comments, fix review findings, implement suggested changes, or respond to code review feedback.
---

# Implement Review Feedback

Reads code review documents from `.reviews/` and implements the suggested fixes and improvements.

## Workflow

### Step 1: Find Current Review

Identify the review for the current branch:

```bash
git branch --show-current  # Get branch name
ls .reviews/               # Find matching review
```

Look for: `.reviews/{branch-name}-review.md`

### Step 2: Parse Review Findings

Read the review document and extract findings by severity:

| Priority | Icon | Action |
|----------|------|--------|
| 1st | 🔴 Critical | Must fix - security, breaking bugs |
| 2nd | 🟠 Major | Should fix - significant issues |
| 3rd | 🟡 Minor | Consider fixing - quality improvements |
| 4th | 💡 Suggestion | Optional - nice to have |

### Step 3: Verify Documentation

Before implementing, check for relevant context:

```
search_nodes → Find patterns in memory
query-docs → Get current best practices if needed
```

### Step 4: Implement Fixes by Priority

Work through findings in priority order:

#### For Each Finding:

1. **Locate the code** - Find file and line mentioned
2. **Understand the issue** - Read the finding description
3. **Implement fix** - Apply the appropriate change
4. **Add/update tests** - Ensure fix is tested
5. **Mark as addressed** - Track progress

### Step 5: Update Review Document

Add implementation notes to the review:

```markdown
---

## Implementation Response

**Addressed by**: AI Assistant
**Date**: {date}

### 🔴 Critical - Addressed

1. **Token stored in localStorage** (src/dev/auth/storage.ts:23)
   - ✅ Fixed: Migrated to httpOnly cookies
   - Commit: abc123

### 🟠 Major - Addressed

1. **No token expiration check** (src/dev/auth/validate.ts:45)
   - ✅ Fixed: Added expiration validation
   - Commit: def456

### 🟡 Minor - Addressed

1. **Magic number for timeout** (src/dev/auth/session.ts:12)
   - ✅ Fixed: Extracted to SESSION_TIMEOUT constant

### 💡 Suggestion - Deferred

1. **Refresh token rotation**
   - ⏳ Deferred: Created issue #XX for future work
```

### Step 6: Commit Changes

Commit fixes with reference to review:

```bash
git add .
git commit -m "fix: address code review feedback

- Fixed critical: token storage vulnerability
- Fixed major: token expiration validation
- Fixed minor: extracted magic numbers

Review: .reviews/{branch}-review.md"
```

### Step 7: Report Status

Summarize what was addressed:
- Count of fixes by severity
- Any deferred items
- New issues created

## Handling Deferred Items

If a finding is too complex or out of scope:

1. Create a GitHub issue:
   ```
   issue_write:
     title: "Review feedback: {description}"
     body: "From code review of {branch}\n\n{details}"
     labels: ["MAINT"] or appropriate label
   ```

2. Note in review document as "Deferred"

3. Include issue link in response

## Example

**User**: "Implement the review feedback"

**Response**:
```
Found review: .reviews/feat-user-auth-review.md

Implementing fixes by priority...

🔴 Critical (1 item):
✅ Token storage - Migrated to httpOnly cookies

🟠 Major (1 item):
✅ Token expiration - Added validation check

🟡 Minor (1 item):
✅ Magic number - Extracted to constant

💡 Suggestion (1 item):
⏳ Refresh token rotation - Deferred to issue #52

Committed: fix: address code review feedback
All critical and major issues resolved.
```

## Notes

- Always fix Critical and Major items
- Minor items should be addressed unless time-constrained
- Suggestions can be deferred with a tracking issue
- Update tests for all fixes
- Keep commits focused and atomic
