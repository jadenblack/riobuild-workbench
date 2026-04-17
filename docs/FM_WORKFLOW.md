# Front Matter Workflow

## First run

1. Install the recommended extensions.
2. Open this repo in VS Code Insiders.
3. Run `Front Matter: Open dashboard`.
4. If prompted, let Front Matter use the existing `frontmatter.json`.

## Project switching

Use the Front Matter project switcher to move between:

- `site` for Astro content in `src/content/docs`
- `notes` for workbench notes in `notes`

## Dashboard model

Use Front Matter as the main operational UI:

- dashboard for content entry and navigation
- project switcher for `site` versus `notes`
- built-in commands for media, snippets, and data
- repo scripts for setup or repair tasks that Front Matter should launch or support

The Astro app stays the rendered product surface, not the dashboard shell.

## Built-in commands to use

- `Front Matter: Open dashboard`
- `Front Matter: Open media dashboard`
- `Front Matter: Open snippets dashboard`
- `Front Matter: Open data dashboard`
- `Front Matter: Switch project`

## Principle

Keep content management in Front Matter.
Keep planning in GHP.
Keep Astro as the app surface.
Keep custom code out of the stack until FM stops being enough.
