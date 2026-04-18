# GHP Frontmatter Workbench vbeta Design

## Summary

`vbeta` is a narrow operating-system beta for RioBuild Workbench.

The goal is to prove that a workspace can start from an init state, become locally visible and operable in VS Code through GHP, use Frontmatter as the local dashboard and autodoc surface, and promote selected work into GitHub release planning without making GitHub the source of truth.

This beta is not a full product marketplace, not a full multi-agent scheduler, and not a full transcript-ingestion platform. It is the first stable local operating model.

## Product Goal

Build a tool-agnostic, agent-agnostic human workflow in VS Code where:

- Frontmatter is the local authoring and dashboard engine
- GHP is the workflow and visibility layer
- GitHub Projects is the downstream release-planning and remote projection layer
- modules, teams, providers, decisions, and work items are visible and manageable from one workspace

The longer-term direction is a one-person agentic company. The vbeta scope must support that future without requiring the full company model up front.

## Design Principles

- Local-first: the workspace is the source of truth
- Human-first: dashboards and workflow surfaces optimize for a human operator in VS Code
- Agent/tool agnostic: Codex is a reference provider, not a hard dependency
- Structured over raw: decisions, work items, modules, teams, and summaries matter more than raw transcript storage
- Projection over duplication: GitHub receives promoted release-planning state, not the full local knowledge base
- Modules over monolith: capabilities are modeled as modules with flags and ownership
- Teams as operating units: teams can be human, agent, method, tool, or hybrid

## vbeta Outcome

At the end of vbeta, a workspace should be able to:

- open a Frontmatter-backed dashboard locally
- expose workbench state to GHP inside VS Code
- represent modules, teams, providers, work items, decisions, and sessions in a structured way
- enable or hide modules with flags
- assign roadmap slices or specialties to teams
- track provider readiness and fallback state
- promote selected local work into GitHub release planning

## Non-Goals

vbeta does not need to include:

- mandatory raw transcript ingestion
- full bidirectional sync with GitHub Projects
- deep live orchestration between all AI providers
- marketplace-grade module installation and lifecycle management
- complete provider capability parity
- a full agent scheduler or autonomous company runtime

## Core Operating Model

The workspace is modeled around six primary entities:

### 1. Modules

Modules are stable, manageable workbench capabilities.

Examples:

- `frontmatter-dashboard`
- `ghp-workflow`
- `workspace-setup`
- `release-planning`
- `provider-codex`
- `provider-gemini`
- `provider-kimi`
- `provider-zai`
- `team-template-bmad`
- `team-template-codex-dev`
- `riobuild-vscode-surface`

Modules can represent:

- VS Code extension surfaces
- Codex plugins
- CLI integrations
- provider integrations
- dashboard surfaces
- methods and operating patterns
- automation packs

### 2. Teams

Teams are unified operating units. A team can be:

- human
- agent
- tool
- method
- hybrid

Examples:

- `codex`
- `n8n`
- `bmad`
- `release-ops`
- `frontend-strike-team`

Teams are not just member lists. They are reusable operating patterns that can own modules, roadmap lanes, specialties, and workflow rules.

### 3. Work Items

Work items are the canonical unit of execution in vbeta.

They represent:

- tasks
- initiatives
- setup flows
- experiments
- bugs
- release slices

Work items are primary because they let teams, modules, providers, and decisions all connect to something operational.

### 4. Decisions

Decisions capture product, architecture, workflow, provider, and release decisions.

Decisions are linked to work items and modules rather than acting as the top-level unit of planning.

### 5. Sessions

Sessions capture summaries and extracted artifacts from human or agent work.

Raw transcripts are optional. vbeta requires session summaries and extracted outputs, not mandatory transcript ingestion.

### 6. Flags

Flags control visibility, rollout, and maturity.

They enable gradual activation of modules and surfaces without forcing the entire workbench live at once.

## Canonical vbeta Unit of Work

The canonical unit for the first iteration is the work item.

Rationale:

- work items are the easiest bridge from local workspace to GHP to GitHub Projects
- decisions can attach to work items cleanly
- modules and teams can both own or support work items
- sessions can summarize progress against work items
- release planning is naturally work-item oriented

This avoids over-centering raw sessions while still preserving session output.

## Team-as-Module Model

Teams are represented in two layers:

### Team Templates

Reusable operating patterns such as:

- `codex-dev`
- `gemini-research`
- `kimi-planning`
- `zai-ops`
- `bmad-product`
- `n8n-automation`

Each team template declares:

- `kind`
- `specialties`
- `member_types`
- `capabilities`
- `preferred_modules`
- `preferred_providers`
- `routing_rules`
- `handoff_rules`
- `visibility_rules`

### Team Instances

Actual assignments inside a workspace or roadmap.

Examples:

- `setup-core`
- `release-ops-main`
- `planning-bmad-lane`
- `provider-codex-build-lane`

Team instances can own:

- modules
- roadmap segments
- work items
- dashboard views
- specialties

This allows teams like `codex`, `n8n`, or `BMAD` to be ingested as modules and assigned to part or all of a roadmap by specialty or separation of concern.

## Provider Model

Providers are modeled as modules from the start.

Reference providers:

- `codex`
- `gemini`
- `kimi`
- `zai`

Each provider record should include:

- `status`
- `session_context_status`
- `provider_quota_status`
- `provider_rate_limit_status`
- `primary_lanes`
- `fallback_lanes`
- `allowed_work_types`
- `notes`

Supported `status` values:

- `available`
- `warning`
- `depleted`
- `not-configured`
- `unknown`

Rationale:

- the slash menu in VS Code exposes session health
- a provider panel can expose quota-window health
- not all surfaces expose rate limits consistently

These must remain separate fields instead of being collapsed into one generic usage state.

## Proposed vbeta Default Modules

The init state should include a small default stack:

- `frontmatter-dashboard`
- `ghp-workflow`
- `workspace-setup`
- `release-planning`
- `provider-codex`
- `provider-zai`

Optional but modeled from day one:

- `provider-gemini`
- `provider-kimi`
- `team-template-bmad`
- `team-template-n8n`
- `team-template-codex-dev`

## Frontmatter Role

Frontmatter is the local dashboard and content-authoring engine.

It should expose structured content collections for:

- modules
- teams
- providers
- work items
- decisions
- sessions
- releases

The Frontmatter dashboard is where the human sees the workbench state, edits content, reviews status, and navigates linked records.

This is the primary local control room.

## GHP Role

GHP is the workflow and visibility layer inside VS Code.

It should provide:

- workspace visibility for active work
- branch and worktree awareness
- ownership awareness
- status and release-lane visibility
- promotion markers for GitHub planning
- compatibility with human-first issue and roadmap workflows

GHP should treat the local workspace as the source of truth and GitHub as the promoted projection layer.

## GitHub Role

GitHub Projects is the downstream remote planning surface.

GitHub should receive promoted records only, such as:

- release-ready work items
- milestones
- selected initiative summaries
- PR/release state

GitHub is not responsible for storing:

- the full local dashboard state
- provider readiness details
- raw session outputs
- all local module metadata

## Proposed Content Model

The vbeta content model should live under a structured workspace content area, likely inside the Frontmatter stack or a root workspace content surface.

Recommended record families:

- `modules/*.md`
- `teams/*.md`
- `providers/*.md`
- `work-items/*.md`
- `decisions/*.md`
- `sessions/*.md`
- `releases/*.md`

Each family should have a small, explicit frontmatter schema.

### Module Record

Suggested fields:

- `id`
- `name`
- `kind`
- `status`
- `owner_team`
- `supporting_teams`
- `flags`
- `provider_dependencies`
- `specialties`
- `entrypoints`
- `gh_visible`
- `release_track`

### Team Record

Suggested fields:

- `id`
- `name`
- `kind`
- `template`
- `status`
- `capabilities`
- `member_types`
- `owned_modules`
- `owned_workstreams`
- `preferred_providers`
- `fallback_providers`

### Provider Record

Suggested fields:

- `id`
- `name`
- `status`
- `session_context_status`
- `provider_quota_status`
- `provider_rate_limit_status`
- `primary_lanes`
- `fallback_lanes`
- `notes`

### Work Item Record

Suggested fields:

- `id`
- `title`
- `type`
- `status`
- `priority`
- `owner_team`
- `module`
- `decision_links`
- `provider_lane`
- `ready_for_gh`
- `release_target`
- `branch`
- `worktree`

### Decision Record

Suggested fields:

- `id`
- `title`
- `status`
- `scope`
- `related_modules`
- `related_work_items`
- `owner_team`
- `summary`

### Session Record

Suggested fields:

- `id`
- `title`
- `kind`
- `summary`
- `related_work_items`
- `related_decisions`
- `provider`
- `team`
- `transcript_ref`

`transcript_ref` should be optional in vbeta.

## Feature Flags

Feature flags should be modeled in workspace state and referenced by records.

Initial flags:

- `workspace.structure.v2`
- `frontmatter.dashboard.enabled`
- `ghp.visibility.enabled`
- `modules.teams.enabled`
- `providers.multi.enabled`
- `github.projection.enabled`
- `transcripts.optional.enabled`

Flags should support:

- visibility
- rollout readiness
- local activation
- release sequencing

## Visibility Model

GHP visibility should focus on what the human needs to see now:

- active work items
- owner team
- module
- provider lane
- readiness state
- release target
- blocked/degraded conditions
- promotion eligibility

Frontmatter should show richer local context:

- record details
- relationships
- narrative notes
- summaries
- decisions
- local session outputs

## Init-State Workflow

The vbeta init-state flow should be:

1. bootstrap workspace config
2. create minimal module, team, provider, and release records
3. open Frontmatter dashboard
4. make workspace visible to GHP
5. route local work through work items
6. promote selected items into GitHub planning

This proves the workbench can improve itself from an init state.

## Release Planning Bridge

Promotion from local workspace to GitHub should be explicit.

Suggested states:

- `local-only`
- `candidate`
- `ready-for-gh`
- `projected`
- `released`

Only `ready-for-gh` and beyond should be eligible for GitHub projection.

This avoids turning GitHub into the dumping ground for all local workbench context.

## VS Code Surfaces

The vbeta UX should center on:

- Frontmatter dashboard
- GHP visibility and commands
- provider readiness surfaces
- work item navigation
- module and team ownership views

The UI inspiration can include plugin registries, package dashboards, and agent dashboards, but vbeta should keep the implementation narrow and structured around records, not bespoke UI complexity.

## Recommended vbeta Slice

The first release slice should validate:

- Frontmatter dashboard opens and shows structured workbench records
- GHP sees the root workspace and its local workflow state
- teams and modules are visible and assignable
- providers have structured readiness metadata
- work items can move from local planning to GitHub release planning

That is sufficient proof for vbeta.

## Risks

### Risk: overloading vbeta with marketplace features

Mitigation:

- treat install/upgrade management as a later module

### Risk: over-centering transcript ingestion

Mitigation:

- require summaries and extracted artifacts first

### Risk: tying the workbench too tightly to Codex

Mitigation:

- model providers as swappable modules from the start

### Risk: GitHub becomes the real source of truth

Mitigation:

- enforce explicit local-to-remote promotion

### Risk: team abstraction becomes vague

Mitigation:

- distinguish team templates from team instances

## Recommended Next Planning Phase

The implementation plan should split into these streams:

1. root workspace GHP readiness
2. Frontmatter content model and collections
3. team/module/provider registry design
4. local promotion model to GitHub
5. vbeta init workflow and dashboard views

## Decision

Proceed with `vbeta` as a local-first operating-system beta for RioBuild Workbench, using work items as the canonical unit, modules as the stable building blocks, teams as unified operating units, providers as swappable modules, Frontmatter as the local control room, GHP as the workflow layer, and GitHub as the downstream release-planning projection layer.
