import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { auditSetupOnDisk } from '../src/node';

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await import('node:fs/promises').then(({ rm }) =>
      rm(dir, { recursive: true, force: true }),
    );
  }
});

describe('auditSetupOnDisk', () => {
  it('reads on-disk config and reports drift and missing files', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'ghp-vscode-setup-'));
    tempDirs.push(root);

    const homeDir = path.join(root, 'home');
    const appDataDir = path.join(root, 'appdata');
    const workspacePath = path.join(root, 'workspace');

    await mkdir(path.join(homeDir, '.config', 'ghp-cli'), { recursive: true });
    await mkdir(path.join(appDataDir, 'Code', 'User'), { recursive: true });
    await mkdir(path.join(workspacePath, '.ghp'), { recursive: true });

    await writeFile(
      path.join(homeDir, '.config', 'ghp-cli', 'config.json'),
      JSON.stringify({ mainBranch: 'main' }),
    );
    await writeFile(
      path.join(appDataDir, 'Code', 'User', 'settings.json'),
      JSON.stringify({ 'ghProjects.mainBranch': 'develop' }),
    );
    await writeFile(
      path.join(workspacePath, '.ghp', 'config.json'),
      JSON.stringify({ mainBranch: 'trunk' }),
    );

    const report = await auditSetupOnDisk({
      scope: 'both',
      editors: 'both',
      workspacePath,
      homeDir,
      appDataDir,
      ghpCliCommand: 'definitely-not-a-real-command',
      ghpMcpCommand: 'also-not-a-real-command',
    });

    expect(report.environment.ghpCliAvailable).toBe(false);
    expect(report.environment.ghpMcpAvailable).toBe(false);
    expect(report.results.find((result) => result.name === 'VS Code Stable settings')?.state).toBe('drift');
    expect(report.results.find((result) => result.name === 'VS Code Insiders settings')?.state).toBe('missing');
    expect(report.results.find((result) => result.name === 'Workspace GHP config')?.state).toBe('drift');
  });
});
