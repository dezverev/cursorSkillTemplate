# User Guide

This repository includes AI-powered skills for automated issue planning and execution.

## Workflow

### 1. Create a GitHub Issue

Create an issue in your GitHub repository describing the work to be done. Use labels to set priority:

| Label | Priority | Description |
|-------|----------|-------------|
| `CONT` | P0 | Continue existing work |
| `CRITICAL` | P1 | Critical issues |
| `BUG` | P2 | Bug fixes |
| `MAINT` | P3 | Maintenance tasks |
| `DOC` | P4 | Documentation |
| `FEAT` | P5 | New features |

### 2. Pick and Plan

Run the pick-and-plan skill to select the highest priority issue and create an execution plan:

```
/pick-and-plan
```

This will:
- Fetch open issues from GitHub
- Select the highest priority issue
- Create an execution plan
- Save the plan to `.workplans/Pending/`
- Add the `PLANCREATED` label to the issue

### 3. Execute the Plan

Run the execute-workplan skill to implement the plan:

```
/execute-workplan
```

This will:
- Pick the highest priority pending workplan
- Implement the changes
- Create tests
- Generate a summary report
- Create a pull request
- Close the issue

---

## Recommended MCP Servers

For the best experience, add these MCP servers to your Cursor configuration (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx -y @modelcontextprotocol/server-memory@latest",
      "env": {},
      "args": []
    },
    "sequential-thinking": {
      "command": "npx -y @modelcontextprotocol/server-sequential-thinking@latest",
      "env": {},
      "args": []
    },
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

### Server Details

| Server | Purpose | Link |
|--------|---------|------|
| **memory** | Persistent knowledge graph for storing context across sessions | [GitHub](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) |
| **sequential-thinking** | Structured problem-solving through adaptive thinking steps | [GitHub](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking) |
| **context7** | Up-to-date documentation and code examples for libraries | [GitHub](https://github.com/upstash/context7) |

---

## Custom MCP Configuration

If you add different MCP servers or choose not to add the recommended ones, run this command before executing any workflows:

```
/document-dev-tools
```

This will scan your current MCP configuration and update `.cursor/DEVELOPMENTTOOLS.md` with the available tools, ensuring the AI skills work correctly with your setup.

---

## Available Skills

| Skill | Command | Description |
|-------|---------|-------------|
| Pick and Plan | `/pick-and-plan` | Select GitHub issue and create execution plan |
| Execute Workplan | `/execute-workplan` | Implement a pending workplan |
| Code Review | `/code-review` | Review branch changes before PR |
| Implement Review Feedback | `/implement-review-feedback` | Address code review findings |
| Write Unit Tests | `/write-unit-tests` | Create xUnit/Moq tests |
| Document Dev Tools | `/document-dev-tools` | Update tool documentation |
| Create Project | `/create-project` | Scaffold new features |
| Fullstack Web Dev | `/fullstack-web-dev` | Web development with browser verification |

---

## Project Structure

```
src/
├── dev/      # Source files (production code)
└── Tests/    # Test files
```

See `.cursor/rules/project-structure.mdc` for detailed conventions.
