# Codex Plugin Plan: GHP VS Code Setup Manager

## Implementation Sequence

1. Create a home-level local Codex plugin so it is available across repos.
2. Register it in the home marketplace.
3. Add a setup skill that defines the inspection and templating workflow.
4. Add a template script for audit/apply operations.
5. Support Windows VS Code Stable and Insiders path detection first.
6. Validate by generating dry-run output for both user-level and workspace-level setup.

## File Layout

Plugin root:

- `C:\\Users\\jaden.black\\plugins\\ghp-vscode-setup`

Contents:

- `.codex-plugin/plugin.json`
- `skills/ghp-vscode-setup/SKILL.md`
- `scripts/manage-ghp-vscode-setup.ps1`
- `templates/user/ghp-cli.config.json`
- `templates/workspace/.ghp.config.json`
- `templates/workspace/.vscode.extensions.json`
- `templates/workspace/.vscode.settings.json`
- `assets/ghp-vscode-setup.svg`

Marketplace:

- `C:\\Users\\jaden.black\\.agents\\plugins\\marketplace.json`

## Planned Behaviors

### Audit mode

- detect `ghp` and `ghp-mcp`
- detect VS Code Stable and Insiders settings files
- inspect current workspace for `.ghp` and `.vscode`
- report missing components and drift

### Apply mode

- write or merge user-level `ghp-cli` config
- write or merge VS Code Stable user settings
- write or merge VS Code Insiders user settings
- write or merge workspace template files

### Scope model

- `user`
- `workspace`
- `both`

### Editor model

- `stable`
- `insiders`
- `both`

## Validation

- run script in dry-run mode against the current repo
- confirm Stable and Insiders targets are resolved correctly on Windows
- confirm workspace template files are emitted in the repo root without secrets

## Recommendation for Daily Use

- use `ghp-cli` for workflow actions
- use `ghp-mcp` for AI-driven issue and project operations
- use the VS Code extension for board display and in-editor navigation
- use this Codex plugin only for bootstrap, templating, audit, and repair
