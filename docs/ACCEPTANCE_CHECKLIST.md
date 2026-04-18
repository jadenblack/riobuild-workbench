# Acceptance Checklist

Use this checklist for the first FM-first workbench acceptance pass.

- Open the repo in VS Code Insiders.
- Confirm the recommended extensions prompt includes Front Matter, GHP, and Astro.
- Run `Front Matter: Open dashboard`.
- Confirm the Front Matter project switcher shows `site` and `notes`.
- Confirm `site` resolves content from `src/content/docs`.
- Confirm `notes` resolves content from `notes`.
- Run `pnpm dev` and confirm the Astro app starts locally.
- Confirm the repo still opens and works in VS Code Stable.

If one of these fails, fix the workspace pattern first before adding more tooling.
