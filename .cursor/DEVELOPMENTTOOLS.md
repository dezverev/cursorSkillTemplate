# Development Tools

> Auto-generated documentation of available MCP servers, tools, skills, and agents.
> Last updated: 2026-01-30

---

## MCP Servers & Tools

### cursor-ide-browser

Browser automation for frontend/webapp development and testing. Navigate, interact, and verify UI changes directly in the browser.

**Important**: Lock/unlock workflow requires `browser_navigate` first, then `browser_lock` before interactions.

| Tool | Description |
|------|-------------|
| `browser_click` | Perform click on a web page (single/double, buttons, modifiers) |
| `browser_console_messages` | Get console messages from the page |
| `browser_drag` | Drag elements on the page |
| `browser_fill` | Clear and replace input field content atomically |
| `browser_fill_form` | Fill multiple form fields at once |
| `browser_get_attribute` | Get an attribute value from an element |
| `browser_get_bounding_box` | Get element position and dimensions |
| `browser_get_input_value` | Get current value of an input element |
| `browser_handle_dialog` | Handle native dialogs (alert/confirm/prompt) |
| `browser_highlight` | Highlight elements on the page |
| `browser_hover` | Hover over an element |
| `browser_is_checked` | Check if checkbox/radio is checked |
| `browser_is_enabled` | Check if element is enabled |
| `browser_is_visible` | Check if element is visible |
| `browser_lock` | Lock browser to prevent user interaction during automation |
| `browser_navigate` | Navigate to a URL (reuse tab or open new) |
| `browser_navigate_back` | Go back in browser history |
| `browser_navigate_forward` | Go forward in browser history |
| `browser_network_requests` | Get network requests from the page |
| `browser_press_key` | Press keyboard keys |
| `browser_reload` | Reload the current page |
| `browser_resize` | Resize the browser viewport |
| `browser_scroll` | Scroll the page or element |
| `browser_search` | Search for text on the page |
| `browser_select_option` | Select option from dropdown |
| `browser_snapshot` | Capture accessibility snapshot (better than screenshot for actions) |
| `browser_tabs` | List, create, close, or select browser tabs |
| `browser_take_screenshot` | Take visual screenshot of the page |
| `browser_type` | Type text into editable element (appends by default) |
| `browser_unlock` | Release browser lock when done |
| `browser_wait_for` | Wait for element or condition |

---

### user-context7

Fetch up-to-date documentation and code examples for any library. Use before implementing features with external libraries.

| Tool | Description |
|------|-------------|
| `resolve-library-id` | Resolve package name to Context7-compatible library ID |
| `query-docs` | Retrieve documentation and examples for a library |

---

### user-memory

Persistent knowledge graph for storing and retrieving context across sessions.

| Tool | Description |
|------|-------------|
| `create_entities` | Create new entities in the knowledge graph |
| `add_observations` | Add observations to existing entities |
| `create_relations` | Create relations between entities |
| `search_nodes` | Search for nodes by query |
| `open_nodes` | Open specific nodes by name |
| `read_graph` | Read the entire knowledge graph |
| `delete_entities` | Delete entities and their relations |
| `delete_observations` | Delete specific observations from entities |
| `delete_relations` | Delete relations from the graph |

---

### user-sequential-thinking

Dynamic problem-solving through structured thinking steps. Supports revision, branching, and hypothesis verification.

| Tool | Description |
|------|-------------|
| `sequentialthinking` | Break down complex problems with adaptive thinking steps |

---

## Agent Skills

### code-review

**Description**: Conducts professional code reviews of branch changes and documents findings.

**Triggers**: Code review requests, checking code quality, before creating pull requests

**Output**: Creates review document in `.reviews/{branch-name}-review.md`

---

### create-project

**Description**: Creates new projects and features following repository structure conventions.

**Triggers**: Creating new projects, adding features, scaffolding code, initializing modules

**Structure**: Source files in `src/dev/`, tests in `src/Tests/`

---

### document-dev-tools

**Description**: Documents available MCP servers, tools, skills, and agents into DEVELOPMENTTOOLS.md.

**Triggers**: MCP server changes, skill modifications, user requests for tool documentation

---

### execute-workplan

**Description**: Executes a pending workplan from `.workplans/Pending/` by priority.

**Triggers**: Starting implementation, working on pending tasks, continuing planned work

**Uses**: GitHub CLI for issue management

---

### fullstack-web-dev

**Description**: Professional React/Node/TypeScript web developer with .NET backend expertise.

**Triggers**: Building web features, creating components, implementing APIs, frontend/fullstack tasks

**Key Features**: Uses Context7 for docs, browser verification required for all UI work

---

### implement-review-feedback

**Description**: Implements feedback from code reviews in the `.reviews/` folder.

**Triggers**: Addressing review comments, fixing findings, implementing suggested changes

---

### pick-and-plan

**Description**: Picks an open GitHub issue by priority and creates an execution plan.

**Triggers**: Selecting next task, planning work, asking what to work on

**Uses**: GitHub CLI for issue listing and updates

---

### write-unit-tests

**Description**: Writes comprehensive unit tests using xUnit and Moq.

**Triggers**: Creating tests, adding test coverage, testing new functionality

**Principle**: Always finds root cause of failures and fixes the code, not the tests

---

## Available Agents

| Agent Type | Purpose | Use When |
|------------|---------|----------|
| `generalPurpose` | Research, search, multi-step tasks | Complex questions, searching code, not confident finding matches quickly |
| `explore` | Fast codebase exploration | Finding files by patterns, searching for keywords, understanding codebase |
| `shell` | Command execution specialist | Git operations, bash commands, terminal tasks |

---

## Quick Reference

| Category | Count |
|----------|-------|
| MCP Servers | 4 |
| MCP Tools | 43 |
| Skills | 8 |

### Common Workflows

**Documentation Lookup**:
```
1. resolve-library-id → Get library ID
2. query-docs → Fetch current documentation
3. create_entities / add_observations → Store in memory
```

**Browser Testing**:
```
1. browser_navigate → Open page
2. browser_lock → Lock for interaction
3. browser_snapshot → Get page structure
4. [interactions]
5. browser_take_screenshot → Capture visual
6. browser_unlock → Release
```

**Issue Workflow**:
```
1. gh issue list → Fetch open issues
2. pick-and-plan → Create execution plan
3. execute-workplan → Implement solution
4. code-review → Review changes
5. gh pr create → Create pull request
```
