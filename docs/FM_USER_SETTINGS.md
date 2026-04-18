# Front Matter User Settings

Use `frontmatter.json` for team-shared settings in this repo.

Use your local or user settings for personal overrides.

## Split to preserve

Use this rule consistently:

- user settings for your global workbench behavior
- workspace settings for repo-specific behavior
- `frontmatter.json` for shared Front Matter project definitions

## Example user overrides

```json
{
  "frontMatter.custom.fullSlug": true,
  "frontMatter.dashboard.openOnStart": false
}
```

## Why

Front Matter supports a team/local split:

- team settings in `frontmatter.json`
- local overrides in `.vscode/settings.json` or user settings

That lets this repo stay shareable while your own workbench still feels personal.

## Recommended use in this project

Good user-level candidates:

- dashboard startup preference
- personal slug behavior
- local editor comfort settings

Good workspace-level candidates:

- recommended extensions
- Astro and Front Matter workspace behavior
- project paths and shared content folder definitions
