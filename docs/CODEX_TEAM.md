# Codex Team Plan

## Worker split

### Worker 1 - Front Matter workspace

Owns:

- `frontmatter.json`
- `.frontmatter/**`
- `.vscode/extensions.json`
- `.vscode/settings.json`

### Worker 2 - Astro app

Owns:

- `src/pages/**`
- `src/content/**`
- `astro.config.mjs`

### Worker 3 - Docs and workflow

Owns:

- `README.md`
- `docs/**`
- project usage instructions

## Worktree pattern

```powershell
git worktree add ..\riostack-vscode-ext-fm -b codex/fm
git worktree add ..\riostack-vscode-ext-astro -b codex/astro
git worktree add ..\riostack-vscode-ext-docs -b codex/docs
```

## Rule

Keep the write scopes separate and merge often. Do not mix FM config edits and Astro UI work in the same branch unless the change truly needs both.
