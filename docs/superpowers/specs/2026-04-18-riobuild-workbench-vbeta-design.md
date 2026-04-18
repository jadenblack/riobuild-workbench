# RioBuild Workbench vbeta Design

## Summary

`vbeta` is the first operating beta for RioBuild Workbench.

The goal is not to ship the full product vision. The goal is to prove that a workspace can:

- start from a local repo and VS Code session
- expose work, decisions, providers, teams, and modules locally through Frontmatter
- become visible and operable through GHP inside VS Code
- promote selected work into remote GitHub Projects and release planning only when ready

This design treats the local workspace as the source of truth, Frontmatter as the dashboard and structured content surface, GHP as the workflow and visibility layer, and GitHub as the downstream projection layer.

## Product Goal

RioBuild Workbench should evolve toward a tool-agnostic, provider-agnostic, one-person agentic company operating system inside VS Code.

For `vbeta`, the prime objective is:

> make a repo locally GHP-ready and Frontmatter-ready so humans and agents can operate through the same workbench and prepare release-ready work for GitHub planning

This beta must support:

- human-led work
- agent-led work
- mixed human and agent teams
- multiple model providers with uneven availability
- modules that can be enabled, disabled, assigned, and promoted incrementally

## Non-Goals

`vbeta` does not attempt to deliver:

- full transcript ingestion as a required core behavior
- deep live orchestration across all providers
- full bidirectional sync with remote GitHub Projects
- broad marketplace or package-manager automation for every provider
- full enterprise org modeling

These can come later. `vbeta` only needs enough structure to make the workbench operable and extensible.

## Core Principles

### Local-first source of truth

The local repo is authoritative during active work. Remote GitHub state is a projection, not the authoring source.

### Structured records over raw chat

The system should prefer structured records such as work items, decisions, modules, provider states, teams, and session summaries. Raw transcripts are optional supporting artifacts.

### Module-first architecture

The workbench is assembled from modules. A module can represent a VS Code extension surface, a Codex plugin, a dashboard surface, a CLI provider integration, a method pack, or a setup pack.

### Unified team abstraction

A team can represent humans, agents, tools, methods, or a hybrid combination. Teams are deployable operating units, not just people groups.

### Provider-agnostic operation

Codex may be the reference path, but the system must support alternate providers like `z-ai`, `gemini`, `kimi`, and future providers without redesigning the workbench model.

### Promotion, not duplication

Remote GitHub Projects should receive promoted, release-relevant work, not every local note or local artifact.

## Operating Model

The workbench has three layers:

### 1. Local authoring and dashboard layer

Frontmatter manages local content and local visibility of structured records.

Primary purpose:

- author records
- browse records
- summarize state
- act as the local dashboard entrypoint

### 2. Workflow and visibility layer

GHP manages workflow defaults, visibility rules, work status, ownership, flags, and promotion readiness inside VS Code.

Primary purpose:

- show what matters now
- map work to branches, modules, teams, and release lanes
- provide a consistent workflow layer for humans and agents

### 3. Remote projection layer

GitHub Projects and release planning receive selected items that are ready to be tracked remotely.

Primary purpose:

- release planning
- milestone visibility
- shared async coordination
- PR and issue lifecycle after promotion

## Primary Entities

### Modules

Modules are the stable building blocks of the workbench.

Examples:

- `frontmatter-dashboard`
- `ghp-workflow`
- `workspace-setup`
- `release-planning`
- `provider-codex`
- `provider-z-ai`
- `provider-gemini`
- `provider-kimi`
- `team-bmad`
- `team-n8n`
- `riobuild-vscode`

Each module should support:

- identity
- type
- maturity state
- flag state
- owner team
- dependencies
- linked work items
- linked decisions

### Teams

Teams are unified operating units that may include humans, agents, tools, methods, or hybrids.

Examples:

- `codex-dev`
- `bmad-planning`
- `n8n-automation`
- `release-ops`
- `rio-core`

Each team should support:

- identity
- classification: `human`, `agent`, `tool`, `method`, `hybrid`
- specialties
- preferred providers
- owned modules
- supported modules
- owned roadmap lanes
- routing rules
- handoff rules

### Providers

Providers describe model or agent backends available to the workbench.

Examples:

- `codex`
- `z-ai`
- `gemini`
- `kimi`

Each provider should support:

- identity
- enabled state
- readiness state
- supported lanes
- primary/fallback role
- session health
- quota health
- rate-limit visibility

### Work Items

Work items are the canonical execution unit in `vbeta`.

A work item may belong to:

- a module
- a team
- a roadmap lane
- a release target

Work items can link to:

- decisions
- sessions
- branches
- GitHub issues or project items

### Decisions

Decisions capture durable product, architecture, workflow, and tool choices.

Decisions should be attachable to:

- modules
- teams
- work items
- release tracks

### Sessions

Sessions are summaries of human or agent execution windows.

`vbeta` should require:

- session summary
- timestamp
- participants or team
- extracted work items
- extracted decisions

Raw transcripts may be stored later, but they are not required for the beta model.

### Flags

Flags gate module visibility, provider visibility, and rollout state.

Flags support the incremental and mixed-state reality of the workbench.

## Recommended vbeta Scope

`vbeta` should ship with four default modules:

- `frontmatter-dashboard`
- `ghp-workflow`
- `workspace-setup`
- `release-planning`

It should also recognize:

- provider modules
- team modules
- stack modules

This gives the workbench a small default shape while keeping the architecture open.

## Team-as-Module Model

Some teams are not merely owners. They are reusable operating patterns and should be ingestible as modules.

Examples:

- `team-codex`
- `team-bmad`
- `team-n8n`

This enables:

- assigning a method to a roadmap slice
- assigning a provider-led team to a specialty lane
- reusing team templates across multiple projects

The design distinguishes:

- `team templates`: reusable operating patterns
- `team instances`: concrete assignments in a workspace

### Team template fields

- `id`
- `name`
- `teamType`
- `specialties`
- `memberTypes`
- `preferredProviders`
- `ownedModuleTypes`
- `routingRules`
- `handoffRules`
- `visibilityRules`

### Team instance fields

- `id`
- `templateId`
- `projectScope`
- `ownedModules`
- `ownedRoadmapLanes`
- `activeProviders`
- `status`

## Provider Model

The provider layer must be shallow but explicit in `vbeta`.

The workbench should support multiple providers without implementing a full routing engine.

### Provider statuses

- `available`
- `warning`
- `depleted`
- `not-configured`
- `unknown`

### Provider telemetry concepts

- `session_context_status`
- `provider_quota_status`
- `provider_rate_limit_status`

This is necessary because different surfaces expose different facts.

For example:

- slash-menu session data may expose context left
- provider quota panels may expose 5-hour and 7-day allowance
- account dashboards may expose usage or credits

The model should not collapse those into a single generic usage field.

### Provider fields

- `id`
- `name`
- `enabled`
- `primary`
- `fallbackOrder`
- `supportedLanes`
- `sessionContextStatus`
- `providerQuotaStatus`
- `providerRateLimitStatus`
- `notes`

## Roadmap Model

The roadmap should be local first and visible in GHP before promotion to GitHub.

Work can be sliced by:

- module
- team
- specialty lane
- release track

Suggested `vbeta` lanes:

- `planning`
- `setup`
- `ui`
- `automation`
- `coding`
- `docs`
- `release`

This lets a team or provider own a lane without making the whole roadmap provider-specific.

## Promotion Model

Remote GitHub Projects should only receive a reduced promoted subset of local records.

The local workbench keeps the richer graph. GitHub receives the execution-facing subset.

### Promotion states

- `local`
- `visible-in-ghp`
- `ready-for-gh`
- `projected-to-gh`
- `release-tracked`

### Promotion rules

Only promote items that have:

- a stable summary
- an owning module or team
- a status that can be represented remotely
- a release or roadmap reason for projection

Do not promote:

- raw exploratory notes
- provider noise
- local-only session telemetry
- draft internal records without stable meaning

## Workspace Surfaces

The root workspace should become the workbench control room.

### Frontmatter surface

Frontmatter should expose content collections for:

- modules
- teams
- providers
- work items
- decisions
- sessions
- releases

### GHP surface

The root workspace `.ghp/config.json` should become the local workflow contract.

It should support:

- branch and work defaults
- roadmap visibility defaults
- promotion readiness semantics
- module and team aware views later

### VS Code surface

The root `.vscode` files should support:

- GHP visibility
- recommended extensions
- worktree and planning behavior
- dashboard-first workflow

## Proposed Content Schema

The initial schema should be intentionally small.

### `modules`

- `id`
- `title`
- `moduleType`
- `status`
- `flag`
- `ownerTeam`
- `dependencies`
- `summary`

### `teams`

- `id`
- `title`
- `teamType`
- `specialties`
- `providers`
- `ownedModules`
- `summary`

### `providers`

- `id`
- `title`
- `status`
- `primary`
- `supportedLanes`
- `quotaStatus`
- `rateLimitStatus`
- `sessionContextStatus`

### `work-items`

- `id`
- `title`
- `status`
- `module`
- `team`
- `lane`
- `promotionState`
- `summary`

### `decisions`

- `id`
- `title`
- `decisionType`
- `status`
- `relatedModules`
- `relatedTeams`
- `summary`

### `sessions`

- `id`
- `title`
- `participants`
- `summary`
- `extractedWork`
- `extractedDecisions`

## Feature Flags

Flags should be used to control rollout of workbench capabilities and stack visibility.

Recommended initial flags:

- `workspace.structure.v2`
- `frontmatter.dashboard.enabled`
- `ghp.workflow.enabled`
- `module.providers.enabled`
- `module.teams.enabled`
- `sync.github-projection.enabled`
- `stack.frontmatter.enabled`
- `stack.vscode.enabled`

Flags should be attached to modules, not only to global config.

## Suggested vbeta Milestones

### Milestone 1: Root workspace visibility

- add root `.ghp/config.json`
- align root `.vscode` settings and extensions
- document the root workbench model

### Milestone 2: Frontmatter content model

- define collections for modules, teams, providers, work items, decisions, sessions
- wire Frontmatter to browse them locally

### Milestone 3: GHP-visible workbench state

- make work items and ownership visible in GHP
- add promotion fields and release readiness fields

### Milestone 4: GitHub projection

- define the reduced remote projection contract
- project only `ready-for-gh` items

## Risks

### Over-modeling too early

If the schema becomes too abstract, the workbench will slow down before it becomes useful.

Mitigation:

- keep `vbeta` records shallow
- prefer explicit metadata over heavy automation

### Provider fragmentation

If provider handling becomes too sophisticated too early, it will dominate the beta.

Mitigation:

- keep provider support to status, lane support, and fallback metadata

### Confusing local and remote sources of truth

If GitHub is treated as equal to the local graph, the system will become noisy and brittle.

Mitigation:

- enforce local-first authoring
- treat GitHub as promoted projection only

## Recommendation

Ship `vbeta` as a local operating beta with:

- Frontmatter-ready structured content
- GHP-ready workspace config
- module-first registry
- unified teams
- provider-aware telemetry model
- GitHub promotion rules

Do not attempt full automation yet.

The beta should prove that the workbench can move from init state to release planning state through one consistent local workflow.

## Acceptance Criteria

`vbeta` is successful when:

- a fresh workspace can become Frontmatter-visible and GHP-visible locally
- modules, teams, providers, work items, decisions, and sessions have a local schema
- a human can use VS Code as the primary control room
- agent and human teams can be represented with the same abstraction
- providers can be modeled with primary and fallback states
- selected work can be promoted to GitHub release planning cleanly
