# Development Tools

> Auto-generated documentation of available MCP servers, tools, skills, and agents.
> Last updated: 2026-01-31

---

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

#### Repository Operations
| Tool | Description |
|------|-------------|
| `create_repository` | Create a new repository |
| `fork_repository` | Fork a repository |
| `search_repositories` | Search for repositories |
| `get_file_contents` | Get file contents from a repo |
| `create_or_update_file` | Create or update a file |
| `delete_file` | Delete a file |
| `push_files` | Push multiple files |

#### Branch & Tag Operations
| Tool | Description |
|------|-------------|
| `create_branch` | Create a new branch |
| `list_branches` | List all branches |
| `list_commits` | List commits |
| `get_commit` | Get commit details |
| `list_tags` | List tags |
| `get_tag` | Get tag details |

#### Issues
| Tool | Description |
|------|-------------|
| `issue_read` | Read issue details |
| `issue_write` | Create/update issues |
| `list_issues` | List issues |
| `search_issues` | Search issues |
| `add_issue_comment` | Add comment to issue |
| `list_issue_types` | List issue types |
| `sub_issue_write` | Manage sub-issues |
| `assign_copilot_to_issue` | Assign Copilot to issue |

#### Pull Requests
| Tool | Description |
|------|-------------|
| `create_pull_request` | Create a pull request |
| `list_pull_requests` | List pull requests |
| `search_pull_requests` | Search pull requests |
| `pull_request_read` | Read PR details |
| `update_pull_request` | Update a PR |
| `merge_pull_request` | Merge a PR |
| `update_pull_request_branch` | Update PR branch |
| `pull_request_review_write` | Write PR reviews |
| `add_comment_to_pending_review` | Add review comments |
| `request_copilot_review` | Request Copilot review |

#### Releases
| Tool | Description |
|------|-------------|
| `list_releases` | List releases |
| `get_latest_release` | Get latest release |
| `get_release_by_tag` | Get release by tag |

#### Users & Teams
| Tool | Description |
|------|-------------|
| `get_me` | Get current user info |
| `search_users` | Search users |
| `get_teams` | Get teams |
| `get_team_members` | Get team members |

#### Other
| Tool | Description |
|------|-------------|
| `get_label` | Get label details |
| `search_code` | Search code in repositories |

---

### cursor-ide-browser
IDE-integrated browser for frontend development and testing.

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to a URL |
| `browser_navigate_back` | Go back in history |
| `browser_navigate_forward` | Go forward in history |
| `browser_reload` | Reload the page |
| `browser_click` | Click on elements |
| `browser_type` | Append text to fields |
| `browser_fill` | Clear and replace text |
| `browser_fill_form` | Fill multiple form fields |
| `browser_hover` | Hover over elements |
| `browser_drag` | Drag and drop |
| `browser_scroll` | Scroll the page |
| `browser_select_option` | Select dropdown options |
| `browser_press_key` | Press keyboard keys |
| `browser_snapshot` | Get page structure/element refs |
| `browser_take_screenshot` | Capture screenshots |
| `browser_search` | Search within the page |
| `browser_tabs` | Manage browser tabs |
| `browser_resize` | Resize browser window |
| `browser_wait_for` | Wait for conditions |
| `browser_handle_dialog` | Handle native dialogs |
| `browser_console_messages` | Get console messages |
| `browser_network_requests` | Monitor network traffic |
| `browser_lock` | Lock browser for interactions |
| `browser_unlock` | Unlock browser when done |
| `browser_highlight` | Highlight elements |
| `browser_get_attribute` | Get element attributes |
| `browser_get_bounding_box` | Get element dimensions |
| `browser_get_input_value` | Get input field values |
| `browser_is_visible` | Check element visibility |
| `browser_is_enabled` | Check if element is enabled |
| `browser_is_checked` | Check checkbox/radio state |

---

## Agent Skills

### create-rule
**Description**: Create Cursor rules for persistent AI guidance.
**Triggers**: Creating rules, adding coding standards, setting up project conventions, configuring file-specific patterns, creating `.cursor/rules/` files.

---

### create-skill
**Description**: Guide users through creating effective Agent Skills for Cursor.
**Triggers**: Creating, writing, or authoring new skills, questions about skill structure, best practices, or SKILL.md format.

---

### update-cursor-settings
**Description**: Modify Cursor/VSCode user settings in settings.json.
**Triggers**: Changing editor settings, preferences, configuration, themes, font size, tab size, format on save, auto save, keybindings.

---

### document-dev-tools
**Description**: Documents available MCP servers, tools, skills, and agents into DEVELOPMENTTOOLS.md.
**Triggers**: New MCP servers/tools added, skills/agents created or modified, user requests tool documentation, setting up development environment.

---

### create-project
**Description**: Creates new projects and features following repository structure conventions.
**Triggers**: Creating a new project, adding a new feature, scaffolding code, initializing a new module.

---

## Available Agents

| Agent Type | Purpose | Best For |
|------------|---------|----------|
| `generalPurpose` | Research and multi-step tasks | Complex questions, code search, multi-step workflows |
| `explore` | Fast codebase exploration | Finding files by patterns, searching code for keywords, answering codebase questions |
| `shell` | Command execution specialist | Git operations, running bash commands, terminal tasks |

---

## Quick Reference

| Category | Count |
|----------|-------|
| MCP Servers | 5 |
| MCP Tools | 81 |
| Agent Skills | 5 |
| Agent Types | 3 |
