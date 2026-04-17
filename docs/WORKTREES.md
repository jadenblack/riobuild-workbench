# Worktrees

Use worktrees when you want parallel lanes without constantly stashing and switching branches.

## Recommended pattern

Keep the main repo checkout clean and use sibling directories for in-flight tasks:

```powershell
git worktree add ..\ghp-vscode-setup-beta-1 -b codex/beta-1
git worktree add ..\ghp-vscode-setup-docs -b codex/docs
```

## When to use them

Use a worktree when:

- release prep is happening while feature work continues
- docs and workflow changes should not block package implementation
- you want one lane for validation failures and another for main feature work

## When not to use them

Do not create worktrees for trivial one-file fixes if a normal branch is simpler.

## Cleanup

After merge:

```powershell
git worktree remove ..\ghp-vscode-setup-beta-1
```

Then delete the branch when it is no longer needed.
