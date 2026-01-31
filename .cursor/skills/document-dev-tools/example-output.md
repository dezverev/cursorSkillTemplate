# Example DEVELOPMENTTOOLS.md Output

This is an example of what the generated `.cursor/DEVELOPMENTTOOLS.md` should look like.

---

```markdown
# Development Tools

> Auto-generated documentation of available MCP servers, tools, skills, and agents.
> Last updated: 2026-01-30

## MCP Servers & Tools

### user-memory
Knowledge graph server for persistent memory and entity management.

| Tool | Description |
|------|-------------|
| `create_entities` | Create new entities in the graph |
| `create_relations` | Create relationships between entities |
| `add_observations` | Add observations to entities |
| `read_graph` | Read the entire knowledge graph |
| `search_nodes` | Search for nodes in the graph |
| `open_nodes` | Open specific nodes by name |
| `delete_entities` | Delete entities from the graph |
| `delete_relations` | Delete relationships |
| `delete_observations` | Delete observations |

---

### user-sequential-thinking
Structured reasoning server for complex problem-solving.

| Tool | Description |
|------|-------------|
| `sequentialthinking` | Break down complex problems into sequential reasoning steps |

---

### user-context7
Documentation retrieval server for up-to-date library documentation.

| Tool | Description |
|------|-------------|
| `resolve-library-id` | Resolve a library name to its Context7 ID |
| `query-docs` | Query documentation for a specific library |

---

### user-github
GitHub platform integration for repository and issue management.

| Tool | Description |
|------|-------------|
| `create_repository` | Create a new repository |
| `fork_repository` | Fork a repository |
| `create_pull_request` | Create a pull request |
| `issue_write` | Create/update issues |
| `search_code` | Search code in repositories |
| ... | (additional tools) |

---

### cursor-ide-browser
IDE-integrated browser for frontend development and testing.

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to a URL |
| `browser_click` | Click on elements |
| `browser_snapshot` | Get page structure/element refs |
| `browser_take_screenshot` | Capture screenshots |
| ... | (additional tools) |

---

## Agent Skills

### create-rule
**Description**: Create Cursor rules for persistent AI guidance.
**Triggers**: Creating rules, adding coding standards, setting up project conventions, configuring file-specific patterns.

### create-skill
**Description**: Guide users through creating effective Agent Skills for Cursor.
**Triggers**: Creating, writing, or authoring new skills, questions about skill structure or SKILL.md format.

### update-cursor-settings
**Description**: Modify Cursor/VSCode user settings in settings.json.
**Triggers**: Changing editor settings, preferences, themes, font size, tab size, format on save.

### document-dev-tools
**Description**: Documents available MCP servers, tools, skills, and agents.
**Triggers**: New MCP servers/tools added, skills modified, user requests tool documentation.

---

## Available Agents

| Agent Type | Purpose | Best For |
|------------|---------|----------|
| `generalPurpose` | Research and multi-step tasks | Complex questions, code search, executing multi-step workflows |
| `explore` | Fast codebase exploration | Finding files, searching code, answering codebase questions |
| `shell` | Command execution | Git operations, running bash commands, terminal tasks |

---

## Quick Reference

| Category | Count |
|----------|-------|
| MCP Servers | 5 |
| MCP Tools | 81 |
| Agent Skills | 4 |
| Agent Types | 3 |
```
