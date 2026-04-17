# Contributing

This repo is intentionally set up around a small, reviewable workflow.

## Development Loop

1. Start from `main`.
2. Create a branch or a worktree for one focused change.
3. Make the smallest useful implementation change.
4. Add or update tests in `test/`.
5. Run:

```powershell
pnpm release:check
```

6. If the change is user-visible, add a changeset:

```powershell
pnpm changeset
```

7. Open a PR with the acceptance checklist completed.

## Worktrees

Worktrees are the easiest way to keep multiple tracks moving without branch churn in one directory.

Example:

```powershell
git worktree add ..\ghp-vscode-setup-beta-docs -b codex/beta-docs
```

That creates a sibling directory on a new branch while leaving your main checkout untouched.

Good worktree use:

- one feature or bugfix per worktree
- one release-prep lane
- one docs or validation lane

## Changesets

Use a changeset when a user, integrator, or reviewer would care about the change in release notes.

Typical cases:

- new exported behavior
- changed defaults
- new workflow docs that change how the package should be used
- release-process changes that affect contributors

## Pull Requests

PRs should be easy to review:

- keep them scoped
- describe the behavior change
- link the changeset when one exists
- include the exact commands you ran
