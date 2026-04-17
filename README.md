# riostack-vscode-ext

This repo is the FM-first testbed for the RioStack local workbench.

It is not a custom VS Code extension. The product model is:

- Front Matter is the dashboard
- Astro is the workspace app surface
- GitHub Projects is the planning surface
- VS Code Insiders is the primary user workbench
- VS Code Stable is kept compatible for the same baseline setup

## MVP shape

The MVP stays deliberately small:

- a real Astro workspace
- team-shared Front Matter config in `frontmatter.json`
- a multi-project Front Matter dashboard for `site` and `notes`
- recommended extensions for Front Matter, GHP, and Astro
- shell scripts through `package.json` to install the baseline in Stable or Insiders
- room for user-level Front Matter settings on top of the shared workspace defaults

The intent is to prove the workflow without writing custom VS Code extension code.

## Quick start

```powershell
pnpm install
pnpm setup:extensions:insiders
pnpm dev
```

Then in VS Code Insiders:

1. Open this repo.
2. Run `Front Matter: Open dashboard`.
3. Use the Front Matter project switcher for `site` and `notes`.

For VS Code Stable, use `pnpm setup:extensions:stable`.

## How this repo fits with `ghp-vscode-setup`

`riostack-vscode-ext` is the test project.

`ghp-vscode-setup` is the installable setup toolchain that should:

- install the baseline extensions
- audit user and workspace drift
- apply or update the shared setup template
- document the expected user-level and workspace-level configuration

## Docs

- [Research](./docs/RESEARCH.md)
- [Roadmap](./docs/ROADMAP.md)
- [FM workflow](./docs/FM_WORKFLOW.md)
- [User settings](./docs/FM_USER_SETTINGS.md)
- [Codex team plan](./docs/CODEX_TEAM.md)
