# Beta Workflow

This document explains the workflow in the most practical order.

## Why prerelease first

You are still shaping the package surface and contributor workflow.

A `beta` track gives you:

- a stable naming scheme
- installable packages for validation
- release notes on every meaningful increment
- room to change the contract before `1.0.0`

## The simple mental model

Think in three layers:

1. Code changes: `src/` and `test/`
2. Release intent: `.changeset/*.md`
3. Publication: CI on `main`

If the code changes but the user experience does not, you may not need a changeset.
If the user experience changes, add one.

## The command sequence

For a normal feature branch:

```powershell
pnpm release:check
pnpm changeset
```

Before merge or when preparing a release branch update:

```powershell
pnpm version-packages
```

After merge to `main`, GitHub Actions handles the release PR or publish step.

## Beta numbering

While prerelease mode is active, the package versions move through beta numbers such as:

- `0.1.0-beta.0`
- `0.1.0-beta.1`
- `0.1.0-beta.2`

This lets you validate the same intended release line without pretending it is stable yet.

## Acceptance checklist

Before calling a beta official:

- `pnpm lint` passes
- `pnpm build` passes
- `pnpm test` passes
- coverage is generated
- release notes are clear
- PR description explains what changed and how it was checked
