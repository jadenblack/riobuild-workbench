---
name: ghp-vscode-setup
description: Bootstrap, audit, and repair GHP CLI, MCP, and VS Code setup for user-level and workspace-level workflows. Use when the task involves GitHub Projects setup, VS Code Stable or Insiders support, workspace templates, or configuration drift between ghp-cli and the VS Code extension.
---

# GHP VS Code Setup

## Purpose

Use this skill when the user wants Codex to set up or standardize:

- `ghp-cli`
- `ghp-mcp`
- the `gh-projects` VS Code extension
- VS Code Stable user settings
- VS Code Insiders user settings
- workspace `.ghp` and `.vscode` files

This skill does not replace the existing GHP tools. It manages templates and setup.

## Workflow

1. Inspect the current state first.
2. Run the setup script in `Audit` mode before changing files.
3. Explain what belongs at user scope versus workspace scope.
4. When the user wants changes, run the script in `Apply` mode with the correct scope.
5. Prefer `Both` scopes only when the user clearly wants a full bootstrap.

## Scope Rules

### User scope

Use for:

- `~/.config/ghp-cli/config.json`
- VS Code Stable user settings
- VS Code Insiders user settings

### Workspace scope

Use for:

- `.ghp/config.json`
- `.vscode/settings.json`
- `.vscode/extensions.json`

Do not put secrets or personal tokens in workspace files.

## Commands

Run from the plugin root or pass absolute paths.

Audit current repo and both editors:

```powershell
.\scripts\manage-ghp-vscode-setup.ps1 -Mode Audit -Scope Both -Editors Both -WorkspacePath "<repo>"
```

Apply only workspace templates:

```powershell
.\scripts\manage-ghp-vscode-setup.ps1 -Mode Apply -Scope Workspace -Editors Both -WorkspacePath "<repo>"
```

Apply only user-level templates for Stable and Insiders:

```powershell
.\scripts\manage-ghp-vscode-setup.ps1 -Mode Apply -Scope User -Editors Both
```

Preview changes without writing:

```powershell
.\scripts\manage-ghp-vscode-setup.ps1 -Mode Apply -Scope Both -Editors Both -WorkspacePath "<repo>" -DryRun
```

## Guidance

- Treat `ghp-cli` as the source of truth for shared workflow defaults.
- Treat the VS Code extension as the display and interaction layer.
- Treat `ghp-mcp` as the AI control layer.
- Use the workspace template for repo-safe defaults and extension recommendations.
- On Windows, explicitly account for both `Code` and `Code - Insiders`.

## Templates Managed

- `templates/user/ghp-cli.config.json`
- `templates/user/vscode.settings.json`
- `templates/workspace/ghp.config.json`
- `templates/workspace/vscode.settings.json`
- `templates/workspace/vscode.extensions.json`
