---
name: execute-workplan
description: Executes a pending workplan by priority. Use when the user wants to execute a plan, work on a pending task, start implementation, or continue working on planned issues.
---

# Execute Workplan

Selects and executes a workplan from `.workplans/Pending/` based on priority.

## Priority Order

| Priority | Label |
|----------|-------|
| P0 | `CONT` |
| P1 | `CRITICAL` |
| P2 | `BUG` |
| P3 | `MAINT` |
| P4 | `DOC` |
| P5 | `FEAT` |

Select highest priority. If tied, pick oldest.

## Workflow

### Step 1: Find Workplan

Scan `.workplans/Pending/` and select by priority:

```bash
ls .workplans/Pending/*.md
```

### Step 2: Move to Inprogress

```bash
mv .workplans/Pending/issue-{number}-*.md .workplans/Inprogress/
```

### Step 3: Set GitHub Issue to INPROGRESS

```
issue_write:
  owner: {owner}
  repo: {repo}
  issue_number: {number}
  labels: [...existing, "INPROGRESS"]
```

Remove `PLANCREATED` label if present.

### Step 4: Verify Documentation

Before executing, ensure docs are current:

**Check memory:**
```
search_nodes → Find relevant knowledge
open_nodes → Get stored details
```

**Fetch fresh docs if needed:**
```
resolve-library-id → Get Context7 ID
query-docs → Get current documentation
```

**Update memory** with any new knowledge fetched.

### Step 5: Execute Workflow

1. Ensure correct branch (create `impl/issue-{number}-{slug}` if on main)
2. Read and follow plan steps
3. Create/modify files in `src/dev/`
4. Create tests in `src/test/`
5. Run tests to verify

### Step 6: Move to Done

```bash
mv .workplans/Inprogress/issue-{number}-*.md .workplans/Done/
```

### Step 7: Write Summary Report

Create a summary report in `.workplanReports/`:

```
.workplanReports/issue-{number}-{slug}-report.md
```

**Report format:**

```markdown
# Workplan Report: Issue #{number}

**Title**: {title}
**Priority**: {label}
**Completed**: {date}
**Branch**: {branch_name}

## Summary
[What was accomplished]

## Files Changed
- `src/dev/...`
- `src/test/...`

## Tests
- [Test results summary]

## Notes
- [Any relevant observations]
```

### Step 8: Archive Original Workplan

Move workplan to archive:

```bash
mv .workplans/Done/issue-{number}-*.md .workplanReports/originalWorkplans/
```

### Step 9: Commit Changes

```bash
git add .
git commit -m "feat(#{number}): complete {short_description}

- Implemented {summary}
- Added tests
- Closes #{number}"
```

### Step 10: Create Pull Request

```bash
git push -u origin HEAD
gh pr create --title "feat(#{number}): {title}" --body "$(cat <<'EOF'
## Summary
{summary_of_changes}

## Test Plan
- {test_details}

Closes #{number}
EOF
)"
```

### Step 11: Set GitHub Issue to Complete

```
issue_write:
  owner: {owner}
  repo: {repo}
  issue_number: {number}
  state: "closed"
  state_reason: "completed"
```

---

## Handling Large/Interrupted Work

If the issue is too large or you are interrupted:

1. **Commit current progress:**
   ```bash
   git add .
   git commit -m "wip(#{number}): partial progress on {description}"
   ```

2. **Create continuation issue:**
   ```
   issue_write:
     owner: {owner}
     repo: {repo}
     title: "CONT: {original_title} (continued from #{number})"
     body: "Continuation of #{number}\n\n## Remaining Work\n{remaining_steps}"
     labels: ["CONT"]
   ```

3. **Update original issue** with reference to continuation

4. **Leave workplan in Inprogress** with notes on what remains

---

## Output

Report at each stage:
- Plan selected and priority
- Branch name
- Current step executing
- Files created/modified
- Test status
- PR link when created

## Example

```
Selected: issue-42-fix-authentication-timeout.md (P2: BUG)

→ Moved to Inprogress
→ GitHub #42 labeled INPROGRESS

Executing plan...
- Modified: src/dev/auth/session.ts
- Created: src/test/auth/session.test.ts
- Tests: 5/5 passing

→ Moved to Done
→ Report: .workplanReports/issue-42-fix-authentication-timeout-report.md
→ Archived: .workplanReports/originalWorkplans/issue-42-fix-authentication-timeout.md
→ Committed: feat(#42): fix authentication timeout
→ PR created: https://github.com/owner/repo/pull/43
→ Issue #42 closed as completed
```
