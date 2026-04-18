# Research

## Decision

Do not build a custom VS Code dashboard extension for the MVP.

Use Front Matter directly as the dashboard, command surface, and multi-project UI.

## Why

Front Matter already provides the core surfaces we need:

- dashboard views
- commands like `frontMatter.dashboard` and `frontMatter.init`
- team settings in `frontmatter.json`
- local overrides in `.vscode/settings.json`
- project switching for multiple sites or environments
- UI extensibility and custom actions later if we really need them

That means the faster path is to build a good Astro + Front Matter workspace, not another dashboard layer.

## Practical product shape

The repo should be:

- an Astro workspace
- configured for Front Matter team settings
- prepared for multiple Front Matter projects
- opinionated about extension recommendations and setup scripts

## Sources

- Front Matter getting started: [frontmatter.codes/docs/getting-started](https://frontmatter.codes/docs/getting-started)
- Front Matter settings and team/local split: [frontmatter.codes/docs/settings](https://frontmatter.codes/docs/settings)
- Front Matter projects: [frontmatter.codes/docs/settings/projects](https://frontmatter.codes/docs/settings/projects)
- Front Matter commands: [frontmatter.codes/docs/commands](https://frontmatter.codes/docs/commands)
- Front Matter dashboard overview: [frontmatter.codes/docs/dashboard](https://frontmatter.codes/docs/dashboard)
- Front Matter UI extensibility: [frontmatter.codes/docs/ui-extensibility](https://frontmatter.codes/docs/ui-extensibility)
- VS Code extension installation docs: [code.visualstudio.com/docs/getstarted/extensions](https://code.visualstudio.com/docs/getstarted/extensions)
- VS Code extension publishing and pre-release behavior: [code.visualstudio.com/api/working-with-extensions/publishing-extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
