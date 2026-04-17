export const defaultUserGhpCliConfig = {
  mainBranch: 'main',
  branchPattern: '{user}/{number}-{title}',
  startWorkingStatus: 'In Progress',
  doneStatus: 'Done',
  prOpenedStatus: 'In Review',
  prMergedStatus: 'Done',
  worktreePath: '~/.ghp/worktrees',
  worktreeCopyFiles: ['.env', '.env.local'],
  worktreeSetupCommand: 'pnpm install',
  worktreeAutoSetup: true,
  parallelWork: {
    openTerminal: true,
    autoRunClaude: true,
    autoResume: true,
  },
  mcp: {
    tools: {
      read: true,
      action: false,
    },
    disabledTools: [] as string[],
  },
} as const;

export const defaultUserVsCodeSettings = {
  'ghProjects.mainBranch': 'main',
  'ghProjects.branchNamePattern': '{user}/{number}-{title}',
  'ghProjects.startWorkingStatus': 'In Progress',
  'ghProjects.prOpenedStatus': 'In Review',
  'ghProjects.prMergedStatus': 'Done',
  'ghProjects.worktreePath': '~/.ghp/worktrees',
  'ghProjects.worktreeSetupCommand': 'pnpm install',
  'ghProjects.worktreeAutoSetup': true,
  'ghProjects.parallelWork.autoRunClaude': true,
  'ghProjects.parallelWork.autoResume': true,
  'ghProjects.showSwitchButton': true,
} as const;

export const defaultWorkspaceGhpConfig = {
  mainBranch: 'main',
  branchPattern: '{user}/{number}-{title}',
  startWorkingStatus: 'In Progress',
  doneStatus: 'Done',
  prOpenedStatus: 'In Review',
  prMergedStatus: 'Done',
  issueNotInProject: 'ask',
  defaults: {
    plan: {
      mine: true,
    },
    work: {
      hideDone: true,
    },
  },
} as const;

export const defaultWorkspaceVsCodeSettings = {
  'ghProjects.showOnlyAssignedToMe': false,
  'ghProjects.showSwitchButton': true,
  'ghProjects.worktreeAutoSetup': true,
  'ghProjects.planningModeViews': [] as string[],
  'ghProjects.hiddenViews': [] as string[],
} as const;

export const defaultWorkspaceVsCodeExtensions = {
  recommendations: [
    'bretwardjames.gh-projects',
    'GitHub.vscode-pull-request-github',
    'GitHub.vscode-github-actions',
  ],
  unwantedRecommendations: [] as string[],
} as const;
