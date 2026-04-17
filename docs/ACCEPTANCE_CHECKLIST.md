# Acceptance Checklist

Use this checklist when reviewing a beta branch or release PR.

## Package Validation

- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] `pnpm test` passes
- [ ] coverage output was generated and reviewed

## Release Validation

- [ ] package version is correct for the intended beta
- [ ] changelog entry matches the actual change
- [ ] prerelease mode is still appropriate
- [ ] publish secrets are configured only in CI

## Workflow Validation

- [ ] PR description explains behavior and review focus
- [ ] changeset exists when the change is user-visible
- [ ] worktree or branch scope stayed focused
- [ ] merge target is `main`
