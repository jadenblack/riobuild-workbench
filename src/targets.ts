import path from 'node:path';
import {
  defaultUserGhpCliConfig,
  defaultUserVsCodeSettings,
  defaultWorkspaceGhpConfig,
  defaultWorkspaceVsCodeExtensions,
  defaultWorkspaceVsCodeSettings,
} from './templates';
import type { BuildTargetsOptions, SetupTarget } from './types';

export function buildSetupTargets(options: BuildTargetsOptions): SetupTarget[] {
  const { appDataDir, editors, homeDir, scope, workspacePath } = options;
  const targets: SetupTarget[] = [];

  if (scope === 'user' || scope === 'both') {
    targets.push({
      scope: 'user',
      name: 'ghp-cli user config',
      templateKey: 'user-ghp-cli',
      path: path.join(homeDir, '.config', 'ghp-cli', 'config.json'),
      template: structuredClone(defaultUserGhpCliConfig),
    });

    if (editors === 'stable' || editors === 'both') {
      targets.push({
        scope: 'user',
        name: 'VS Code Stable settings',
        templateKey: 'user-vscode',
        path: path.join(appDataDir, 'Code', 'User', 'settings.json'),
        template: structuredClone(defaultUserVsCodeSettings),
      });
    }

    if (editors === 'insiders' || editors === 'both') {
      targets.push({
        scope: 'user',
        name: 'VS Code Insiders settings',
        templateKey: 'user-vscode',
        path: path.join(appDataDir, 'Code - Insiders', 'User', 'settings.json'),
        template: structuredClone(defaultUserVsCodeSettings),
      });
    }
  }

  if (scope === 'workspace' || scope === 'both') {
    targets.push(
      {
        scope: 'workspace',
        name: 'Workspace GHP config',
        templateKey: 'workspace-ghp',
        path: path.join(workspacePath, '.ghp', 'config.json'),
        template: structuredClone(defaultWorkspaceGhpConfig),
      },
      {
        scope: 'workspace',
        name: 'Workspace VS Code settings',
        templateKey: 'workspace-vscode-settings',
        path: path.join(workspacePath, '.vscode', 'settings.json'),
        template: structuredClone(defaultWorkspaceVsCodeSettings),
      },
      {
        scope: 'workspace',
        name: 'Workspace VS Code extensions',
        templateKey: 'workspace-vscode-extensions',
        path: path.join(workspacePath, '.vscode', 'extensions.json'),
        template: structuredClone(defaultWorkspaceVsCodeExtensions),
      },
    );
  }

  return targets;
}
