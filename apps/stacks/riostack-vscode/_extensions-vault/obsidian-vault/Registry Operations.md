---
title: 'Registry Operations'
tags:
  - vscode-extension
  - registry
  - operations
  - cleanup
---

# Registry Operations

This note is the handoff for the VS Code extension cleanup and future registry work.

## What Is Canonical

- The canonical catalog lives in this Obsidian vault.
- Each extension note under `Extensions/` is the durable reference record.
- `extensions_index.json` is the machine-readable export.
- `riostack_vscode_extentions.json` is the raw generated manifest.
- `riostack_vscode_registry_refs.json` is the pointer map for the catalog and preserved imports.

## What Was Intentionally Removed

- Raw unpacked extension archive folders from `C:\Users\jaden.black\dev\repos\.riostack\02_vaults\vscode\extentions`
- Legacy cache directory `C:\Users\jaden.black\dev\repos\.riostack\_config__vscode-extentions`

Those were storage copies, not the active VS Code installation roots.

## What Was Preserved

- Marketplace and Open VSX links in each extension note
- GitHub and homepage links when found locally
- Categories, keywords, purpose text, observed versions, and local provenance
- Legacy cache inventory snapshot under `_extensions-vault\_imports\legacy-config-cache`
- Legacy config notes under `_extensions-vault\_imports\legacy-config`
- `extensions.json` beside this vault as a compact environment reference

## Reinstall Paths

- Release: `code --install-extension publisher.name`
- Insiders: `code-insiders --install-extension publisher.name`
- Alternative: open the Marketplace or Open VSX link from the extension note

## How To Preserve This Task Set

- Treat this note as the cleanup handoff and operating policy.
- Add future decisions as plain notes in this vault instead of rebuilding raw extension caches.
- If a future local registry project is built, use this vault as the metadata source and `extensions_index.json` as the bootstrap export.
- Add ratings, stack tags, collections, and keep/drop decisions to the extension notes rather than storing unpacked extension payloads.

## Suggested Next Metadata

- `rating`
- `keep_status`
- `stack_tags`
- `collection`
- `replacement_candidate`
- `verified_marketplace_status`
- `verified_github_status`

## Rebuild

- Script: `C:\Users\jaden.black\dev\repos\CODEX_node-space-maker\build_obsidian_vscode_registry.ps1`
- Rebuild only when you want to refresh notes from a new local cache source.
