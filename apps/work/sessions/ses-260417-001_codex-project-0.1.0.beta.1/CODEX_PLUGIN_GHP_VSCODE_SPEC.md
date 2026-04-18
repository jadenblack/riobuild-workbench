# Codex Plugin Spec: GHP VS Code Setup Manager

## Goal

Create a home-level Codex plugin that helps standardize GitHub Projects usage across:

- `ghp` CLI
- `ghp-mcp`
- the `gh-projects` VS Code extension
- VS Code Stable
- VS Code Insiders

The plugin is not a replacement for the existing CLI, MCP server, or VS Code extension. Its job is to manage setup templates, apply them consistently, and audit drift.

## Primary Outcome

The plugin should let Codex help a user do three things reliably:

1. Bootstrap a personal GHP + VS Code setup once.
2. Apply a workspace template for any repo that should use GHP.
3. Audit or repair mismatched configuration between CLI, MCP, workspace files, and VS Code user settings.

## Design Principles

### 1. One source of truth per concern

- `ghp-cli` owns workflow defaults and shared GHP config.
- `ghp-mcp` exposes GHP operations to AI tools.
- the VS Code extension owns in-editor display and interaction.
- the Codex plugin owns setup templates, validation, and repair workflows.

The plugin should not invent a second workflow config model.

### 2. User-level and workspace-level configuration

The plugin must support both scopes:

- User scope:
  - `~/.config/ghp-cli/config.json`
  - VS Code Stable user settings
  - VS Code Insiders user settings
  - optional MCP client config hints
- Workspace scope:
  - `.ghp/config.json`
  - `.vscode/settings.json`
  - `.vscode/extensions.json`
  - optional `.code-workspace` recommendations when appropriate

### 3. Stable and Insiders parity

On Windows, the plugin must explicitly account for both:

- Stable:
  - `%APPDATA%\\Code\\User\\settings.json`
  - `%USERPROFILE%\\.vscode\\extensions`
- Insiders:
  - `%APPDATA%\\Code - Insiders\\User\\settings.json`
  - `%USERPROFILE%\\.vscode-insiders\\extensions`

The plugin should detect both and allow:

- apply to Stable only
- apply to Insiders only
- apply to both

## Recommended Operating Model

### CLI

Use `ghp-cli` as the workflow backbone:

- auth
- start work
- worktree setup
- board filtering
- branch and status automation

### MCP

Use `ghp-mcp` as the AI control surface:

- planning and board queries
- issue creation and updates
- status moves
- work start and worktree creation

### VS Code extension

Use the extension as the visual layer:

- board display
- planning board
- item details
- quick workflow commands

### Codex plugin

Use the Codex plugin as the setup manager:

- generate templates
- apply templates
- audit configuration drift
- explain which layer should own which setting

## Plugin Responsibilities

The plugin should support these user intents:

1. "Bootstrap my GHP setup for VS Code."
2. "Apply the workspace GHP template here."
3. "Set up both VS Code Stable and Insiders."
4. "Audit this repo for GHP readiness."
5. "Repair drift between CLI config and VS Code settings."

## Configuration Ownership Rules

### User-level template

Owns:

- global `ghp-cli` defaults
- preferred worktree base path
- preferred worktree setup command
- MCP enabled tools defaults
- VS Code Stable and/or Insiders user settings for `ghProjects.*`
- extension recommendations for personal baseline docs

Does not own:

- project-specific statuses
- project-specific shortcuts that only make sense in one repo

### Workspace template

Owns:

- `.ghp/config.json`
- `.vscode/extensions.json`
- `.vscode/settings.json`
- repo-specific worktree, branch, or status defaults
- workspace recommendations for `gh-projects`, GitHub PR, and GitHub Actions extensions

Does not own:

- personal tokens
- personal auth secrets
- machine-specific absolute paths unless explicitly requested

## Template Outputs

### User-level outputs

- user config skeleton for `ghp-cli`
- VS Code Stable settings patch
- VS Code Insiders settings patch
- installation checklist for:
  - `@bretwardjames/ghp-cli`
  - `@bretwardjames/ghp-mcp`
  - `bretwardjames.gh-projects`

### Workspace-level outputs

- `.ghp/config.json`
- `.vscode/extensions.json`
- `.vscode/settings.json`
- optional `docs/ghp-workflow.md` summary when the repo needs onboarding documentation

## Recommended Defaults

### User defaults

- keep `ghp-cli` as the authoritative source for:
  - `mainBranch`
  - `branchPattern`
  - `startWorkingStatus`
  - `doneStatus`
  - worktree defaults
- sync matching editor settings into VS Code only where the extension expects them
- prefer opt-in MCP write tools instead of enabling every mutation tool by default

### Workspace defaults

- commit `.ghp/config.json`
- commit `.vscode/extensions.json`
- commit only low-risk `.vscode/settings.json` values
- avoid committing secrets, personal paths, or personal editor preferences

## Initial Plugin Deliverables

### Skill

One setup skill that teaches Codex how to:

- inspect current GHP/VS Code state
- detect Stable and Insiders
- choose user-level or workspace-level actions
- run the template generation script
- explain diffs before writing

### Script

One local script that can:

- detect current OS and editor targets
- generate template files
- merge JSON safely
- support `audit` and `apply` modes

### Assets

Minimal plugin metadata only. No MCP server or app surface is required for v1.

## Non-Goals for v1

- replacing GHP extension commands
- replacing `ghp config sync`
- launching VS Code directly
- managing authentication secrets automatically
- adding a new server-side sync layer

## Success Criteria

The plugin is successful if a user can ask Codex to:

- set up GHP across VS Code Stable and Insiders
- prepare a repo for GHP usage
- explain drift between user and workspace settings

and Codex can do so using a repeatable template instead of ad hoc edits.
