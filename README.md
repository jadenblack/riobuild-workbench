# RioBuild Workbench

RioBuild Workbench is the root workspace for `RioBuild Workbench`: a VS Code extension (GHP Fork GitHub FLow adding Extentions/Plugins/Apps) creating a DX Studio with Frontmatter Astro Agentic Dashboard stack builder being an internal module first freature, creating a control panel, installer surface, monitor, and recommendation agent team gh project automation and integration based on script, CLI, MCP-driven dterministic workflow environment.

This README is pre-roadmap workspace and purpose draft to end up as the RioBuild Workbench (*ide-ext(ghp)/cli/mcp/skills/teams/launch) product, the current repo layout, and the migration path toward the fork baseline already stored under `packages/`.

## RioBuild Identity

`Workbench` is the project.


In this repo, RioBuild Workbench is treated as:

- a VS Code extension and dashboard direction
- a Frontmatter-first stack builder and control panel
- an MCP-enabled workflow surface
- an issue-driven workspace built around GHP commands and board workflow

The current root still contains a small published library layer under `src/`, but that is only one slice of the workspace. The larger product surface is mapped under `apps/` and `packages/`.

## Current Workspace Map

| Area | Path | Current role |
| --- | --- | --- |
| Workspace MCP | [`.mcp.json`](./.mcp.json) | Root MCP entrypoint for the local GHP-adjacent control surface |
| Frontmatter data | [`.frontmatter/`](./.frontmatter/) | Frontmatter workspace state and local content data |
| Editor wiring | [`.vscode/`](./.vscode/) | VS Code workspace settings and recommendations |
| Repo automation | [`.github/`](./.github/) | GitHub workflow and repo automation layer |
| Release metadata | [`.changeset/`](./.changeset/) | Changeset state already present at the root |
| Product map | [`apps/`](./apps/) | GHP-facing workspace surfaces: builders, planning, config, stacks, teams, and work |
| Baselines and imports | [`packages/`](./packages/) | Fork/reference repositories used to shape the migration path |
| Root library slice | [`src/`](./src/) | Current TypeScript package exports still published from the root |
| Validation slice | [`test/`](./test/) | Tests for the current root library slice |
| Generated output | [`dist/`](./dist/) | Built package output from the current root package layer |
| Minimal docs | [`docs/`](./docs/) | Lightweight notes and TODO tracking, not the main product documentation |

## Detailed File Map

### Root workspace

| Path | Purpose |
| --- | --- |
| [`package.json`](./package.json) | Current root package metadata for `@jaden-black/rioflow_workbench` |
| [`tsconfig.json`](./tsconfig.json) | TypeScript config for the current root package slice |
| [`vite.config.ts`](./vite.config.ts) | Current build config for the root library layer |
| [`.env.config`](./.env.config) | Local environment configuration artifact present at the workspace root |
| [`CHANGELOG.md`](./CHANGELOG.md) | Package-facing changelog at the root |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Contributor notes for the workspace |

### GHP workspace surfaces

| Path | Purpose |
| --- | --- |
| [`apps/builders/`](./apps/builders/) | Builder-facing workspace area reserved for GHP-controlled assembly flows |
| [`apps/config/`](./apps/config/) | Configuration surface for workspace-level GHP mapping |
| [`apps/plan/`](./apps/plan/) | Planning surface for issue and board-oriented work |
| [`apps/stacks/`](./apps/stacks/) | Installable and modular RioStack component map used by the builder dashboard |
| [`apps/teams/`](./apps/teams/) | Team-facing surface for GHP coordination |
| [`apps/work/`](./apps/work/) | Active work surface; currently contains session state |

### Current concrete stack anchor

| Path | Purpose |
| --- | --- |
| [`apps/stacks/riostack-frontmatter/`](./apps/stacks/riostack-frontmatter/) | Current Frontmatter-first Astro workspace and the clearest preview-server/dashboard anchor in this repo |
| [`apps/stacks/readme.md`](./apps/stacks/readme.md) | Existing note describing the stacks area as installed/installable modular RioStack components in the builder dashboard |

### Fork and reference baselines

| Path | Purpose |
| --- | --- |
| [`packages/FORK-RioFlow-Studio-ADE_ghp-project-main/`](./packages/FORK-RioFlow-Studio-ADE_ghp-project-main/) | Planned fork baseline for the GHP monorepo migration path |
| [`packages/CLONE-ALL-RioStack-Configs_dev-env-main/`](./packages/CLONE-ALL-RioStack-Configs_dev-env-main/) | Imported reference/config source retained under `packages/` |

## Stack Manifest

This table is a current directory-level manifest of `apps/stacks/`. Roles are intentionally conservative unless the folder contents make the purpose explicit.

| Stack | Path | GHP role |
| --- | --- | --- |
| `codex-plugin` | [`apps/stacks/codex-plugin/`](./apps/stacks/codex-plugin/) | Codex-side plugin slice inside the stack map |
| `riostack-changesets` | [`apps/stacks/riostack-changesets/`](./apps/stacks/riostack-changesets/) | Release/versioning-oriented stack slice |
| `riostack-claude` | [`apps/stacks/riostack-claude/`](./apps/stacks/riostack-claude/) | Claude-oriented integration slice |
| `riostack-codex` | [`apps/stacks/riostack-codex/`](./apps/stacks/riostack-codex/) | Codex-oriented integration slice |
| `riostack-easypanel` | [`apps/stacks/riostack-easypanel/`](./apps/stacks/riostack-easypanel/) | Easypanel deployment/control-plane slice |
| `riostack-frontmatter` | [`apps/stacks/riostack-frontmatter/`](./apps/stacks/riostack-frontmatter/) | Frontmatter-first Astro preview-server and dashboard anchor |
| `riostack-gemini` | [`apps/stacks/riostack-gemini/`](./apps/stacks/riostack-gemini/) | Gemini-oriented integration slice |
| `riostack-ghp` | [`apps/stacks/riostack-ghp/`](./apps/stacks/riostack-ghp/) | GHP-specific stack slice inside the RioStack map |
| `riostack-mempalace` | [`apps/stacks/riostack-mempalace/`](./apps/stacks/riostack-mempalace/) | Memory/knowledge-oriented stack slice |
| `riostack-n8n` | [`apps/stacks/riostack-n8n/`](./apps/stacks/riostack-n8n/) | Automation/workflow integration slice |
| `riostack-obsidian` | [`apps/stacks/riostack-obsidian/`](./apps/stacks/riostack-obsidian/) | Obsidian/content graph integration slice |
| `riostack-strapi` | [`apps/stacks/riostack-strapi/`](./apps/stacks/riostack-strapi/) | CMS-oriented stack slice |
| `riostack-vercel` | [`apps/stacks/riostack-vercel/`](./apps/stacks/riostack-vercel/) | Vercel deployment/runtime slice |
| `riostack-vscode` | [`apps/stacks/riostack-vscode/`](./apps/stacks/riostack-vscode/) | VS Code profile, extension, and editor stack slice |

## GHP Workflow

This repo should be read and operated through GHP workflow concepts first.

### Primary command vocabulary

```bash
ghp work
ghp plan
ghp start <issue-number>
ghp dashboard
ghp agents list
ghp agents watch
ghp mcp --install
```

### Workflow intent

- `ghp work` is the assigned-work surface
- `ghp plan` is the board and planning surface
- `ghp start <issue-number>` is the issue-to-branch or issue-to-worktree transition
- `ghp dashboard` is the branch and change visibility surface
- `ghp agents ...` is the agent coordination surface
- `ghp mcp --install` is the MCP bootstrap path for assistant-facing workflow integration

The root repo already contains MCP wiring in [`.mcp.json`](./.mcp.json), and the fork baseline under [`packages/FORK-RioFlow-Studio-ADE_ghp-project-main/`](./packages/FORK-RioFlow-Studio-ADE_ghp-project-main/) already contains a real [`.ghp/config.json`](./packages/FORK-RioFlow-Studio-ADE_ghp-project-main/.ghp/config.json) that defines branch patterns, shortcuts, parallel-work settings, and pipeline stages.

## Frontmatter Control Surface

The clearest current developer dashboard and preview-server anchor is [`apps/stacks/riostack-frontmatter/`](./apps/stacks/riostack-frontmatter/).

That stack currently establishes:

- a Frontmatter-first Astro workspace
- a VS Code Insiders workbench baseline
- a preview-server/dashboard surface that fits the GHP control-panel direction
- an extension-install path that already includes `gh-projects` alongside Front Matter and Astro editor support

This is the main present-tense anchor for the repo’s Frontmatter Astro preview server and developer control panel narrative.

## Fork Baseline

The main migration baseline is [`packages/FORK-RioFlow-Studio-ADE_ghp-project-main/`](./packages/FORK-RioFlow-Studio-ADE_ghp-project-main/).

That imported baseline already contains:

- a GHP-centered monorepo README
- a real [`.ghp/config.json`](./packages/FORK-RioFlow-Studio-ADE_ghp-project-main/.ghp/config.json)
- a Turbo workspace layout
- `apps/vscode`
- `packages/cli`
- `packages/core`
- `packages/mcp`

This repo is not yet fully converted to that shape at the root. The fork is here as the planned lineage and migration target, not as an already-completed root implementation.

## Roadmap

This is a direction map, not a claim that the work is already finished.

1. Stabilize the root workspace as a GHP-first repo rather than a package-first repo.
2. Treat `apps/` as the visible control-plane map for builders, plan, teams, work, config, and stack installation.
3. Keep `apps/stacks/riostack-frontmatter/` as the concrete preview-server and developer dashboard anchor.
4. Align root MCP wiring with the GHP workflow model already visible in the fork baseline.
5. Reshape the root repo toward the monorepo lineage already present in `packages/FORK-RioFlow-Studio-ADE_ghp-project-main/`.
6. Converge the GHP VS Code extension, Frontmatter stack builder, control panel, installer, and MCP workflow into one coherent root workspace.

## What This README Covers

This README documents:

- the current repo structure
- the current GHP-facing workspace map
- the stack manifest under `apps/stacks/`
- the MCP and workflow anchor points already present
- the planned fork and migration direction

This README does not claim:

- that the root repo has already been fully converted into the fork baseline
- that every stack folder is already implemented as a finished feature
- that the current root package layer is the final product shape

The root source of truth for current GHP workflow lineage is the combination of:

- [`.mcp.json`](./.mcp.json)
- [`apps/`](./apps/)
- [`apps/stacks/`](./apps/stacks/)
- [`packages/FORK-RioFlow-Studio-ADE_ghp-project-main/`](./packages/FORK-RioFlow-Studio-ADE_ghp-project-main/)
