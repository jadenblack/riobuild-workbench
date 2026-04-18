# RioBuild Workbench

## Purpose

`riostack-vscode-ext` is the integration test project for this package.

Path:

```powershell
C:\Users\jaden.black\dev\repos\.jaden.black\05-projects\riobuild_workbench
```

## Repo split

Use the two repos for different concerns:

- `riostack-vscode-ext` defines the FM-first Astro workspace pattern
- `ghp-vscode-setup` installs, audits, updates, and repairs that pattern

This keeps the product workspace and the setup toolchain separate.

## What this package should manage for the testbed

- VS Code Stable and VS Code Insiders baseline extension installs
- user-level settings that are safe to recommend globally
- workspace files such as `.vscode/settings.json` and `.vscode/extensions.json`
- Front Matter project template expectations
- drift detection between the expected template and the actual repo state

## Validation target

When this package changes, validate against the testbed by checking:

1. user setup for Stable and Insiders
2. workspace setup in `riostack-vscode-ext`
3. Front Matter project visibility for `site` and `notes`
4. extension recommendations for Front Matter, GHP, and Astro

## Non-goals

This package should not become a custom VS Code extension for the dashboard.

The dashboard remains Front Matter-based unless that model fails in practice.
