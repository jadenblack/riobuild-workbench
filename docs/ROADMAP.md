# Roadmap

## Product direction

This repo stays FM-first and no-custom-extension-first.

The roadmap assumes:

- Front Matter owns the dashboard experience
- Astro owns the app and content surface
- existing VS Code extensions do the heavy lifting
- `ghp-vscode-setup` owns install, audit, repair, and update workflow

## Phase 0 - Baseline workbench

- Astro workspace scaffold
- Front Matter team settings in `frontmatter.json`
- multi-project setup for `site` and `notes`
- extension recommendations for Front Matter, GHP, and Astro
- setup scripts for VS Code Stable and Insiders
- first-pass docs for user settings and daily workflow

## Phase 1 - Front Matter as the real dashboard

- refine the `site` project for Astro docs/content
- refine the `notes` project for workbench operations notes
- document which Front Matter dashboards to use for each activity
- standardize command-driven setup and maintenance from the repo scripts

## Phase 2 - Shared workbench conventions

- define user-level Front Matter settings that are safe to recommend globally
- define workspace-level Front Matter settings that should stay repo-local
- document multi-project dashboard conventions across more than one repo
- document how GHP planning maps to FM content and operational notes

## Phase 3 - Toolchain integration

- make `ghp-vscode-setup` the canonical installer and auditor for this workspace pattern
- add template coverage for Front Matter user settings and workspace files
- add validation steps that confirm Stable and Insiders stay aligned
- use this repo as the standing integration test project for the setup package

## Phase 4 - Optional extensibility

Only if the FM-first model proves insufficient:

- Front Matter custom actions
- Front Matter dashboard or panel UI extensions
- repo-specific generated settings

This phase is intentionally deferred. The default answer remains "use existing FM capabilities first."
