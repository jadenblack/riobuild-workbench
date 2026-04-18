# GHP Frontmatter Workbench vbeta Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the root workspace locally GHP-ready, expose a minimal structured workbench model through the Frontmatter Astro stack, and prove the first local-to-GitHub release-planning contract for `vbeta`.

**Architecture:** The root repo becomes the GHP-visible workspace contract through `.ghp/config.json` and root `.vscode` settings. The `riostack-frontmatter` stack becomes the local dashboard and structured content engine through Astro content collections and seeded records. GitHub projection stays local-first by representing promotion state in records and documentation before any remote sync automation is added.

**Tech Stack:** GHP CLI, VS Code workspace settings, Front Matter config, Astro content collections, Markdown content records, TypeScript, Astro build/check

---

## File Structure

### Root workspace contract

- Create `.ghp/config.json` as the root GHP workflow contract
- Create `.vscode/extensions.json` for root extension recommendations
- Modify `.vscode/settings.json` to align with the GHP workspace template

### Frontmatter workspace surface

- Modify `apps/stacks/riostack-frontmatter/frontmatter.json` so the dashboard can browse structured workbench records
- Modify `apps/stacks/riostack-frontmatter/src/content/config.ts` to define the new content collections
- Create collection folders under `apps/stacks/riostack-frontmatter/src/content/` for:
  - `modules`
  - `teams`
  - `providers`
  - `work-items`
  - `decisions`
  - `sessions`
  - `releases`

### Dashboard implementation

- Create `apps/stacks/riostack-frontmatter/src/lib/workbench.ts` to normalize collection data for the page
- Modify `apps/stacks/riostack-frontmatter/src/pages/index.astro` to render the workbench overview

### Seed records and docs

- Create one seed record per collection so the dashboard and Frontmatter can render real data immediately
- Create `apps/stacks/riostack-frontmatter/src/content/docs/github-projection.md` to define the local-to-GitHub promotion contract

---

### Task 1: Make The Root Workspace GHP-Ready

**Files:**
- Create: `.ghp/config.json`
- Create: `.vscode/extensions.json`
- Modify: `.vscode/settings.json`
- Test: `apps/stacks/codex-plugin/ghp-vscode-setup/scripts/manage-ghp-vscode-setup.ps1`

- [ ] **Step 1: Run the current workspace audit and capture the failing baseline**

Run:

```powershell
& 'apps\stacks\codex-plugin\ghp-vscode-setup\scripts\manage-ghp-vscode-setup.ps1' -Mode Audit -Scope Workspace -Editors Both -WorkspacePath '.'
```

Expected: FAILING baseline with:

```text
[Workspace] Workspace GHP config
  State: missing

[Workspace] Workspace VS Code settings
  State: drift

[Workspace] Workspace VS Code extensions
  State: missing
```

- [ ] **Step 2: Create the root `.ghp/config.json` from the workspace template**

Create `.ghp/config.json`:

```json
{
  "mainBranch": "main",
  "branchPattern": "{user}/{number}-{title}",
  "startWorkingStatus": "In Progress",
  "doneStatus": "Done",
  "prOpenedStatus": "In Review",
  "prMergedStatus": "Done",
  "issueNotInProject": "ask",
  "defaults": {
    "plan": {
      "mine": true
    },
    "work": {
      "hideDone": true
    }
  }
}
```

- [ ] **Step 3: Replace the root workspace VS Code settings with the template-aligned GHP settings**

Replace `.vscode/settings.json`:

```json
{
  "ghProjects.showOnlyAssignedToMe": false,
  "ghProjects.showSwitchButton": true,
  "ghProjects.worktreeAutoSetup": true,
  "ghProjects.planningModeViews": [],
  "ghProjects.hiddenViews": []
}
```

- [ ] **Step 4: Add the root workspace extension recommendations**

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "bretwardjames.gh-projects",
    "GitHub.vscode-pull-request-github",
    "GitHub.vscode-github-actions"
  ],
  "unwantedRecommendations": []
}
```

- [ ] **Step 5: Re-run the workspace audit and verify the baseline is clean**

Run:

```powershell
& 'apps\stacks\codex-plugin\ghp-vscode-setup\scripts\manage-ghp-vscode-setup.ps1' -Mode Audit -Scope Workspace -Editors Both -WorkspacePath '.'
```

Expected: all three workspace checks report `State: ok`.

- [ ] **Step 6: Commit the workspace baseline**

Run:

```bash
git add .ghp/config.json .vscode/settings.json .vscode/extensions.json
git commit -m "chore: align root workspace with GHP baseline"
```

### Task 2: Define The Frontmatter Workbench Content Model

**Files:**
- Modify: `apps/stacks/riostack-frontmatter/frontmatter.json`
- Modify: `apps/stacks/riostack-frontmatter/src/content/config.ts`
- Create: `apps/stacks/riostack-frontmatter/src/content/modules/frontmatter-dashboard.md`
- Create: `apps/stacks/riostack-frontmatter/src/content/teams/setup-core.md`
- Create: `apps/stacks/riostack-frontmatter/src/content/providers/codex.md`
- Create: `apps/stacks/riostack-frontmatter/src/content/providers/zai.md`
- Create: `apps/stacks/riostack-frontmatter/src/content/work-items/vbeta-workspace-bootstrap.md`
- Create: `apps/stacks/riostack-frontmatter/src/content/decisions/local-first-vbeta.md`
- Create: `apps/stacks/riostack-frontmatter/src/content/sessions/initial-vbeta-design.md`
- Create: `apps/stacks/riostack-frontmatter/src/content/releases/vbeta.md`
- Test: `apps/stacks/riostack-frontmatter/package.json`

- [ ] **Step 1: Write the seed records before defining the collections**

Create `apps/stacks/riostack-frontmatter/src/content/modules/frontmatter-dashboard.md`:

```md
---
id: frontmatter-dashboard
name: Frontmatter Dashboard
kind: dashboard
status: active
owner_team: setup-core
supporting_teams: []
flags:
  - frontmatter.dashboard.enabled
provider_dependencies: []
specialties:
  - dashboard
  - docs
entrypoints:
  - frontmatter
gh_visible: true
release_track: vbeta
---

Frontmatter is the local control room for the workbench.
```

Create `apps/stacks/riostack-frontmatter/src/content/teams/setup-core.md`:

```md
---
id: setup-core
name: Setup Core
kind: hybrid
template: codex-dev
status: active
capabilities:
  - setup
  - docs
  - planning
member_types:
  - human
  - agent
owned_modules:
  - frontmatter-dashboard
owned_workstreams:
  - vbeta-bootstrap
preferred_providers:
  - codex
fallback_providers:
  - zai
---

Hybrid team responsible for bootstrapping the local workbench.
```

Create `apps/stacks/riostack-frontmatter/src/content/providers/codex.md`:

```md
---
id: codex
name: Codex
status: warning
session_context_status: warning
provider_quota_status: warning
provider_rate_limit_status: unknown
primary_lanes:
  - coding
  - review
fallback_lanes:
  - docs
  - planning
notes: Slash menu exposes session context. Quota window is available from the provider panel.
---

Reference provider for the workbench.
```

Create `apps/stacks/riostack-frontmatter/src/content/providers/zai.md`:

```md
---
id: zai
name: Z.AI
status: available
session_context_status: unknown
provider_quota_status: available
provider_rate_limit_status: unknown
primary_lanes:
  - planning
  - docs
fallback_lanes:
  - coding
notes: Healthy fallback provider for vbeta while Codex quota is constrained.
---

Fallback provider for the first workbench slice.
```

Create `apps/stacks/riostack-frontmatter/src/content/work-items/vbeta-workspace-bootstrap.md`:

```md
---
id: vbeta-workspace-bootstrap
title: Bootstrap root GHP and Frontmatter vbeta workspace
type: initiative
status: in-progress
priority: high
owner_team: setup-core
module: frontmatter-dashboard
decision_links:
  - local-first-vbeta
provider_lane: codex
ready_for_gh: false
release_target: vbeta
branch: develop
worktree: root
---

Track the initial root workspace setup and structured dashboard bootstrap for vbeta.
```

Create `apps/stacks/riostack-frontmatter/src/content/decisions/local-first-vbeta.md`:

```md
---
id: local-first-vbeta
title: Keep vbeta local-first and project to GitHub later
status: accepted
scope: architecture
related_modules:
  - frontmatter-dashboard
related_work_items:
  - vbeta-workspace-bootstrap
owner_team: setup-core
summary: Frontmatter and GHP are the local source of truth. GitHub receives promoted release-ready records only.
---

This decision keeps vbeta focused on a local operating model.
```

Create `apps/stacks/riostack-frontmatter/src/content/sessions/initial-vbeta-design.md`:

```md
---
id: initial-vbeta-design
title: Initial vbeta design approval
kind: design
summary: Approved the local-first workbench design and moved into planning.
related_work_items:
  - vbeta-workspace-bootstrap
related_decisions:
  - local-first-vbeta
provider: codex
team: setup-core
transcript_ref:
---

Session summary for the approved vbeta design.
```

Create `apps/stacks/riostack-frontmatter/src/content/releases/vbeta.md`:

```md
---
id: vbeta
title: Workbench vbeta
status: candidate
release_date:
summary: First local-first workbench beta for GHP visibility and Frontmatter dashboarding.
---

Release record for the first workbench beta.
```

- [ ] **Step 2: Run Astro checks and verify the new records fail because the collections are undefined**

Run:

```powershell
Set-Location 'apps\stacks\riostack-frontmatter'
pnpm check
```

Expected: FAIL with collection errors similar to:

```text
Collection "modules" does not exist
Collection "teams" does not exist
```

- [ ] **Step 3: Define the new Astro content collections**

Replace `apps/stacks/riostack-frontmatter/src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const modules = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    kind: z.string(),
    status: z.string(),
    owner_team: z.string(),
    supporting_teams: z.array(z.string()).default([]),
    flags: z.array(z.string()).default([]),
    provider_dependencies: z.array(z.string()).default([]),
    specialties: z.array(z.string()).default([]),
    entrypoints: z.array(z.string()).default([]),
    gh_visible: z.boolean().default(false),
    release_track: z.string()
  })
});

const teams = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    kind: z.string(),
    template: z.string(),
    status: z.string(),
    capabilities: z.array(z.string()).default([]),
    member_types: z.array(z.string()).default([]),
    owned_modules: z.array(z.string()).default([]),
    owned_workstreams: z.array(z.string()).default([]),
    preferred_providers: z.array(z.string()).default([]),
    fallback_providers: z.array(z.string()).default([])
  })
});

const providers = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    status: z.string(),
    session_context_status: z.string(),
    provider_quota_status: z.string(),
    provider_rate_limit_status: z.string(),
    primary_lanes: z.array(z.string()).default([]),
    fallback_lanes: z.array(z.string()).default([]),
    notes: z.string().optional()
  })
});

const workItems = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    type: z.string(),
    status: z.string(),
    priority: z.string(),
    owner_team: z.string(),
    module: z.string(),
    decision_links: z.array(z.string()).default([]),
    provider_lane: z.string(),
    ready_for_gh: z.boolean().default(false),
    release_target: z.string(),
    branch: z.string(),
    worktree: z.string()
  })
});

const decisions = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    scope: z.string(),
    related_modules: z.array(z.string()).default([]),
    related_work_items: z.array(z.string()).default([]),
    owner_team: z.string(),
    summary: z.string()
  })
});

const sessions = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    kind: z.string(),
    summary: z.string(),
    related_work_items: z.array(z.string()).default([]),
    related_decisions: z.array(z.string()).default([]),
    provider: z.string(),
    team: z.string(),
    transcript_ref: z.string().optional()
  })
});

const releases = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    release_date: z.string().nullable().optional(),
    summary: z.string()
  })
});

export const collections = {
  docs,
  modules,
  teams,
  providers,
  'work-items': workItems,
  decisions,
  sessions,
  releases
};
```

- [ ] **Step 4: Make Front Matter browse the structured workbench records**

Replace `apps/stacks/riostack-frontmatter/frontmatter.json`:

```json
{
  "$schema": "https://frontmatter.codes/frontmatter.schema.json",
  "frontMatter.projects": [
    {
      "name": "site",
      "default": true,
      "configuration": {
        "frontMatter.content.pageFolders": [
          {
            "title": "Docs",
            "path": "[[workspace]]/src/content/docs"
          },
          {
            "title": "Workbench Modules",
            "path": "[[workspace]]/src/content/modules"
          },
          {
            "title": "Workbench Teams",
            "path": "[[workspace]]/src/content/teams"
          },
          {
            "title": "Workbench Providers",
            "path": "[[workspace]]/src/content/providers"
          },
          {
            "title": "Workbench Items",
            "path": "[[workspace]]/src/content/work-items"
          },
          {
            "title": "Workbench Decisions",
            "path": "[[workspace]]/src/content/decisions"
          },
          {
            "title": "Workbench Sessions",
            "path": "[[workspace]]/src/content/sessions"
          },
          {
            "title": "Workbench Releases",
            "path": "[[workspace]]/src/content/releases"
          }
        ],
        "frontMatter.content.publicFolder": "[[workspace]]/public"
      }
    },
    {
      "name": "notes",
      "configuration": {
        "frontMatter.content.pageFolders": [
          {
            "title": "Workbench Notes",
            "path": "[[workspace]]/notes"
          }
        ],
        "frontMatter.content.publicFolder": "[[workspace]]/public"
      }
    }
  ]
}
```

- [ ] **Step 5: Re-run Astro checks and verify the content model is valid**

Run:

```powershell
Set-Location 'apps\stacks\riostack-frontmatter'
pnpm check
```

Expected: PASS with no collection schema errors.

- [ ] **Step 6: Commit the content model and seed records**

Run:

```bash
git add apps/stacks/riostack-frontmatter/frontmatter.json apps/stacks/riostack-frontmatter/src/content/config.ts apps/stacks/riostack-frontmatter/src/content/modules/frontmatter-dashboard.md apps/stacks/riostack-frontmatter/src/content/teams/setup-core.md apps/stacks/riostack-frontmatter/src/content/providers/codex.md apps/stacks/riostack-frontmatter/src/content/providers/zai.md apps/stacks/riostack-frontmatter/src/content/work-items/vbeta-workspace-bootstrap.md apps/stacks/riostack-frontmatter/src/content/decisions/local-first-vbeta.md apps/stacks/riostack-frontmatter/src/content/sessions/initial-vbeta-design.md apps/stacks/riostack-frontmatter/src/content/releases/vbeta.md
git commit -m "feat: add workbench content model and seed records"
```

### Task 3: Build The Workbench Dashboard Surface

**Files:**
- Create: `apps/stacks/riostack-frontmatter/src/lib/workbench.ts`
- Modify: `apps/stacks/riostack-frontmatter/src/pages/index.astro`
- Test: `apps/stacks/riostack-frontmatter/package.json`

- [ ] **Step 1: Rewrite the page to use a helper that does not exist yet**

Replace `apps/stacks/riostack-frontmatter/src/pages/index.astro`:

```astro
---
import { getWorkbenchOverview } from '../lib/workbench';

const overview = await getWorkbenchOverview();
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>RioBuild Workbench vbeta</title>
  </head>
  <body>
    <main>
      <h1>RioBuild Workbench vbeta</h1>
      <p>{overview.summary}</p>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Run the build to verify it fails because the helper is missing**

Run:

```powershell
Set-Location 'apps\stacks\riostack-frontmatter'
pnpm build
```

Expected: FAIL with an import error for `../lib/workbench`.

- [ ] **Step 3: Create the workbench helper**

Create `apps/stacks/riostack-frontmatter/src/lib/workbench.ts`:

```ts
import { getCollection } from 'astro:content';

export async function getWorkbenchOverview() {
  const [modules, teams, providers, workItems, decisions, sessions, releases] = await Promise.all([
    getCollection('modules'),
    getCollection('teams'),
    getCollection('providers'),
    getCollection('work-items'),
    getCollection('decisions'),
    getCollection('sessions'),
    getCollection('releases')
  ]);

  return {
    summary: 'Local-first GHP and Frontmatter workbench state',
    counts: {
      modules: modules.length,
      teams: teams.length,
      providers: providers.length,
      workItems: workItems.length,
      decisions: decisions.length,
      sessions: sessions.length,
      releases: releases.length
    },
    modules: modules.map((entry) => entry.data),
    teams: teams.map((entry) => entry.data),
    providers: providers.map((entry) => entry.data),
    workItems: workItems.map((entry) => entry.data),
    decisions: decisions.map((entry) => entry.data),
    sessions: sessions.map((entry) => entry.data),
    releases: releases.map((entry) => entry.data)
  };
}
```

- [ ] **Step 4: Replace the page with the actual vbeta dashboard**

Replace `apps/stacks/riostack-frontmatter/src/pages/index.astro`:

```astro
---
import { getWorkbenchOverview } from '../lib/workbench';

const overview = await getWorkbenchOverview();

const priorityWork = overview.workItems[0];
const primaryDecision = overview.decisions[0];
const release = overview.releases[0];
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>RioBuild Workbench vbeta</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0c111b;
        --panel: #131a27;
        --panel-2: #1a2233;
        --ink: #eaf0ff;
        --muted: #93a0bd;
        --line: #28344a;
        --accent: #7fb4ff;
        --accent-2: #90f0c0;
        --warn: #ffd37f;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background: radial-gradient(circle at top, #15213a, var(--bg) 55%);
        color: var(--ink);
      }

      main {
        max-width: 1120px;
        margin: 0 auto;
        padding: 40px 20px 72px;
      }

      .hero {
        display: grid;
        gap: 16px;
        margin-bottom: 28px;
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 12px;
        color: var(--accent-2);
      }

      .hero h1 {
        margin: 0;
        font-size: clamp(2.3rem, 6vw, 4.5rem);
        line-height: 0.95;
      }

      .hero p {
        max-width: 70ch;
        margin: 0;
        color: var(--muted);
        font-size: 1.05rem;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin-bottom: 28px;
      }

      .card, .list {
        background: linear-gradient(180deg, var(--panel), var(--panel-2));
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 18px;
      }

      .card h2, .list h2 {
        margin: 0 0 10px;
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--muted);
      }

      .metric {
        font-size: 2rem;
        font-weight: 700;
      }

      .stack {
        display: grid;
        gap: 16px;
      }

      ul {
        margin: 0;
        padding-left: 18px;
      }

      li + li {
        margin-top: 8px;
      }

      .badge {
        display: inline-block;
        margin-left: 8px;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 12px;
        background: rgba(127, 180, 255, 0.12);
        color: var(--accent);
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <p class="eyebrow">Local-first operating system beta</p>
        <h1>RioBuild Workbench vbeta</h1>
        <p>{overview.summary}. Frontmatter is the local control room, GHP is the workflow layer, and GitHub is the downstream release projection surface.</p>
      </section>

      <section class="grid">
        <article class="card">
          <h2>Modules</h2>
          <div class="metric">{overview.counts.modules}</div>
        </article>
        <article class="card">
          <h2>Teams</h2>
          <div class="metric">{overview.counts.teams}</div>
        </article>
        <article class="card">
          <h2>Providers</h2>
          <div class="metric">{overview.counts.providers}</div>
        </article>
        <article class="card">
          <h2>Work Items</h2>
          <div class="metric">{overview.counts.workItems}</div>
        </article>
      </section>

      <section class="stack">
        <article class="list">
          <h2>Current Priority</h2>
          <p><strong>{priorityWork.title}</strong><span class="badge">{priorityWork.status}</span></p>
          <p>Owner team: {priorityWork.owner_team}</p>
          <p>Module: {priorityWork.module}</p>
          <p>Release target: {priorityWork.release_target}</p>
        </article>

        <article class="list">
          <h2>Primary Decision</h2>
          <p><strong>{primaryDecision.title}</strong><span class="badge">{primaryDecision.status}</span></p>
          <p>{primaryDecision.summary}</p>
        </article>

        <article class="list">
          <h2>Provider Readiness</h2>
          <ul>
            {overview.providers.map((provider) => (
              <li>
                <strong>{provider.name}</strong> - {provider.status}
              </li>
            ))}
          </ul>
        </article>

        <article class="list">
          <h2>Release Bridge</h2>
          <p><strong>{release.title}</strong><span class="badge">{release.status}</span></p>
          <p>Promote only `ready-for-gh` work items into GitHub release planning.</p>
        </article>
      </section>
    </main>
  </body>
</html>
```

- [ ] **Step 5: Run Astro checks and the production build**

Run:

```powershell
Set-Location 'apps\stacks\riostack-frontmatter'
pnpm check
pnpm build
```

Expected:

```text
Astro check passes
Astro build completes successfully
```

- [ ] **Step 6: Commit the dashboard surface**

Run:

```bash
git add apps/stacks/riostack-frontmatter/src/lib/workbench.ts apps/stacks/riostack-frontmatter/src/pages/index.astro
git commit -m "feat: add vbeta workbench dashboard"
```

### Task 4: Add The Local GitHub Projection Contract

**Files:**
- Create: `apps/stacks/riostack-frontmatter/src/content/docs/github-projection.md`
- Modify: `apps/stacks/riostack-frontmatter/src/content/work-items/vbeta-workspace-bootstrap.md`
- Test: `apps/stacks/riostack-frontmatter/package.json`

- [ ] **Step 1: Add the local GitHub projection document**

Create `apps/stacks/riostack-frontmatter/src/content/docs/github-projection.md`:

```md
---
title: GitHub Projection Contract
description: Local-first release planning contract for workbench vbeta.
draft: false
---

# GitHub Projection Contract

The workbench remains local-first in vbeta.

Only work items in the following states may be projected into GitHub:

- `candidate`
- `ready-for-gh`
- `projected`
- `released`

Local records stay authoritative for:

- module metadata
- provider readiness
- session summaries
- local-only work

GitHub receives:

- promoted work items
- release-ready initiative summaries
- milestone and PR state
```

- [ ] **Step 2: Mark the seed work item as ready for projection**

Replace `apps/stacks/riostack-frontmatter/src/content/work-items/vbeta-workspace-bootstrap.md`:

```md
---
id: vbeta-workspace-bootstrap
title: Bootstrap root GHP and Frontmatter vbeta workspace
type: initiative
status: candidate
priority: high
owner_team: setup-core
module: frontmatter-dashboard
decision_links:
  - local-first-vbeta
provider_lane: codex
ready_for_gh: true
release_target: vbeta
branch: develop
worktree: root
---

Track the initial root workspace setup and structured dashboard bootstrap for vbeta.
```

- [ ] **Step 3: Run Astro checks and build again**

Run:

```powershell
Set-Location 'apps\stacks\riostack-frontmatter'
pnpm check
pnpm build
```

Expected: PASS with the docs collection and work item updates included in the build output.

- [ ] **Step 4: Re-run the root GHP workspace audit**

Run:

```powershell
Set-Location 'C:\Users\jaden.black\dev\repos\.jaden.black\05-projects\riobuild_workbench'
& 'apps\stacks\codex-plugin\ghp-vscode-setup\scripts\manage-ghp-vscode-setup.ps1' -Mode Audit -Scope Workspace -Editors Both -WorkspacePath '.'
```

Expected: root GHP config, root VS Code settings, and root VS Code extensions all remain `State: ok`.

- [ ] **Step 5: Commit the projection contract**

Run:

```bash
git add apps/stacks/riostack-frontmatter/src/content/docs/github-projection.md apps/stacks/riostack-frontmatter/src/content/work-items/vbeta-workspace-bootstrap.md
git commit -m "docs: add local GitHub projection contract"
```

## Self-Review

### Spec coverage

- Root GHP readiness: covered by Task 1
- Frontmatter content model and collections: covered by Task 2
- Team/module/provider registry: covered by Task 2
- Dashboard views: covered by Task 3
- Local-to-GitHub promotion model: covered by Task 4

### Placeholder scan

- No `TBD`, `TODO`, or deferred implementation markers remain
- All commands, file paths, and file contents are concrete

### Type consistency

- Collection names match the content paths and page/helper imports
- `work-items` is consistently used as the collection key
- Provider readiness field names match the approved spec

## Notes For Execution

- Execute this plan in a clean worktree rooted from the commit that contains the approved spec when possible
- Keep commits scoped per task so the root workspace baseline, content model, dashboard, and projection contract can be reviewed independently
- Do not attempt live GitHub Project sync in this slice; the goal is the local contract and visibility model
