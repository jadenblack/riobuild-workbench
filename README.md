# ghp-vscode-setup

Minimal MVP for a Codex-managed GHP setup package.

This repo now contains:

- a real TypeScript package in `src/`
- a Vitest suite in `test/`
- the original project spec and planning docs in `docs/`
- the local Codex plugin snapshot in `codex-plugin/ghp-vscode-setup/`
- prerelease automation with Changesets and GitHub Actions

## Working Directory

Use this directory as the Codex working directory:

```powershell
C:\Users\jaden.black\dev\repos\.jaden.black\05-projects\ghp-vscode-setup
```

## What The Package Does Today

The publishable package models the setup workflow itself:

- builds user and workspace setup targets
- merges template defaults safely
- computes configuration drift
- audits a real machine or repo layout from Node

This is intentionally the smallest honest MVP. It gives you a testable, versioned artifact before expanding into richer runtime behavior.

## Daily Development

```powershell
pnpm install
pnpm lint
pnpm build
pnpm test
```

## Beta Release Flow

This repo is currently in prerelease mode for the `beta` tag.

For a normal day-to-day change:

```powershell
pnpm changeset
pnpm release:check
pnpm version-packages
```

For publishing from CI on `main`:

```powershell
pnpm release
```

If you need to leave prerelease mode later:

```powershell
pnpm pre:exit
```

## Recommended Review Flow

1. Create a short-lived branch or worktree for one change.
2. Add or update tests first when behavior changes.
3. Run `pnpm release:check`.
4. Add a changeset for user-visible changes.
5. Open a PR for user acceptance.
6. Merge to `main` only when CI is green.

## Repository Layout

```text
src/           Publishable library code
test/          Vitest coverage-backed tests
docs/          Spec, workflow, and planning docs
session/       Session artifacts and audit outputs
codex-plugin/  Snapshot of the local plugin source
```

## Notes

- The npm package is `@jaden-black/ghp-vscode-setup`.
- The GitHub release workflow expects `NPM_TOKEN` in Actions secrets.
- The local installed plugin copy still lives at `C:\Users\jaden.black\plugins\ghp-vscode-setup`.
