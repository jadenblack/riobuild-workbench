import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { createAuditReport } from '../src/audit';
import { getDiffPaths, mergeTemplate } from '../src/merge';
import { buildSetupTargets } from '../src/targets';

describe('mergeTemplate', () => {
  it('preserves current keys while overlaying template defaults', () => {
    const merged = mergeTemplate(
      {
        custom: 'keep-me',
        nested: {
          enabled: false,
        },
      },
      {
        nested: {
          enabled: true,
          mode: 'beta',
        },
      },
    );

    expect(merged).toEqual({
      custom: 'keep-me',
      nested: {
        enabled: true,
        mode: 'beta',
      },
    });
  });

  it('deduplicates scalar arrays', () => {
    const merged = mergeTemplate(
      {
        recommendations: ['a', 'b'],
      },
      {
        recommendations: ['b', 'c'],
      },
    );

    expect(merged.recommendations).toEqual(['a', 'b', 'c']);
  });
});

describe('getDiffPaths', () => {
  it('returns dotted paths for nested drift', () => {
    expect(
      getDiffPaths(
        {
          outer: {
            inner: 'a',
          },
        },
        {
          outer: {
            inner: 'b',
          },
        },
      ),
    ).toEqual(['outer.inner']);
  });
});

describe('buildSetupTargets', () => {
  it('builds stable and insiders user targets', () => {
    const targets = buildSetupTargets({
      homeDir: 'C:\\Users\\jaden.black',
      appDataDir: 'C:\\Users\\jaden.black\\AppData\\Roaming',
      workspacePath: 'C:\\repo',
      scope: 'user',
      editors: 'both',
    });

    expect(targets.map((target) => target.name)).toEqual([
      'ghp-cli user config',
      'VS Code Stable settings',
      'VS Code Insiders settings',
    ]);
  });
});

describe('createAuditReport', () => {
  it('marks missing targets and detects drift', () => {
    const homeDir = 'C:\\Users\\jaden.black';
    const appDataDir = 'C:\\Users\\jaden.black\\AppData\\Roaming';
    const workspacePath = 'C:\\repo';
    const stablePath = path.join(appDataDir, 'Code', 'User', 'settings.json');

    const report = createAuditReport({
      scope: 'both',
      editors: 'both',
      homeDir,
      appDataDir,
      workspacePath,
      ghpCliAvailable: true,
      ghpMcpAvailable: true,
      fileContents: {
        [stablePath]: {
          'ghProjects.mainBranch': 'develop',
        },
      },
    });

    expect(report.environment.ghpCliAvailable).toBe(true);
    expect(report.environment.ghpMcpAvailable).toBe(true);
    expect(report.results.find((result) => result.name === 'ghp-cli user config')?.state).toBe('missing');
    expect(report.results.find((result) => result.name === 'VS Code Stable settings')?.state).toBe('drift');
    expect(report.results.find((result) => result.name === 'Workspace VS Code extensions')?.state).toBe('missing');
  });

  it('reports clean state when existing files already satisfy the template', () => {
    const homeDir = 'C:\\Users\\jaden.black';
    const appDataDir = 'C:\\Users\\jaden.black\\AppData\\Roaming';
    const workspacePath = 'C:\\repo';
    const targets = buildSetupTargets({
      homeDir,
      appDataDir,
      workspacePath,
      scope: 'both',
      editors: 'both',
    });

    const fileContents = Object.fromEntries(
      targets.map((target) => [target.path, target.template]),
    );

    const report = createAuditReport({
      scope: 'both',
      editors: 'both',
      homeDir,
      appDataDir,
      workspacePath,
      fileContents,
    });

    expect(report.results.every((result) => result.state === 'ok')).toBe(true);
  });
});
