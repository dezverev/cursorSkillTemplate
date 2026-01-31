# cursorSkillTest

> **New here?** See [USER_README.md](USER_README.md) for the recommended workflow and setup instructions.

This workspace documents the MCP servers, tools, and agent skills available in this Cursor environment.

---

## MCP Servers & Tools

### 1. user-memory
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

### 2. user-sequential-thinking
Structured reasoning server for complex problem-solving.

| Tool | Description |
|------|-------------|
| `sequentialthinking` | Break down complex problems into sequential reasoning steps |

---

### 3. user-context7
Documentation retrieval server for up-to-date library documentation.

| Tool | Description |
|------|-------------|
| `resolve-library-id` | Resolve a library name to its Context7 ID |
| `query-docs` | Query documentation for a specific library |

**Usage**: Use this server to retrieve up-to-date documentation and code examples for any library.

---

### 4. user-github
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

#### Labels
| Tool | Description |
|------|-------------|
| `get_label` | Get label details |

#### Code Search
| Tool | Description |
|------|-------------|
| `search_code` | Search code in repositories |

---

### 5. cursor-ide-browser
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

**Important**: Use `browser_lock` after navigating before any interactions, and `browser_unlock` when completely done.

---

## Agent Skills

Skills provide specialized capabilities and domain knowledge that the agent can apply when relevant.

### 1. create-rule

**Purpose**: Create Cursor rules for persistent AI guidance.

**Trigger Scenarios**:
- User wants to create a rule
- Add coding standards
- Set up project conventions
- Configure file-specific patterns
- Create `.cursor/rules/` files

**Details**:
- Rules are `.mdc` files stored in `.cursor/rules/`
- Support `alwaysApply: true` for universal rules
- Support `globs` patterns for file-specific rules
- Should be kept under 50 lines with concrete examples

---

### 2. create-skill

**Purpose**: Guide users through creating effective Agent Skills for Cursor.

**Trigger Scenarios**:
- User wants to create, write, or author a new skill
- Questions about skill structure or best practices
- Working with `SKILL.md` format

**Details**:
- Skills are directories containing a `SKILL.md` file
- Personal skills: `~/.cursor/skills/skill-name/`
- Project skills: `.cursor/skills/skill-name/`
- SKILL.md should be under 500 lines
- Supports progressive disclosure with reference files

---

### 3. update-cursor-settings

**Purpose**: Modify Cursor/VSCode user settings in `settings.json`.

**Trigger Scenarios**:
- Change editor settings or preferences
- Modify themes, font size, tab size
- Configure format on save, auto save
- Update keybindings

**Settings File Locations**:
| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/Cursor/User/settings.json` |
| Linux | `~/.config/Cursor/User/settings.json` |
| Windows | `%APPDATA%\Cursor\User\settings.json` |

**Common Settings**:
- `editor.fontSize` - Font size
- `editor.tabSize` - Tab width
- `editor.formatOnSave` - Format on save
- `editor.wordWrap` - Word wrap
- `workbench.colorTheme` - Color theme
- `files.autoSave` - Auto save

---

## Quick Reference

| Category | Count | Server/Skill |
|----------|-------|--------------|
| Knowledge Graph | 9 tools | user-memory |
| Sequential Reasoning | 1 tool | user-sequential-thinking |
| Documentation | 2 tools | user-context7 |
| GitHub Integration | 39 tools | user-github |
| IDE Browser | 30 tools | cursor-ide-browser |
| Agent Skills | 3 skills | create-rule, create-skill, update-cursor-settings |
