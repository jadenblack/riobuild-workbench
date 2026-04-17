import path from 'node:path';
import { buildSetupTargets } from './targets';
import { getDiffPaths, mergeTemplate } from './merge';
import type {
  AuditEnvironment,
  AuditReport,
  AuditResult,
  CreateAuditReportOptions,
} from './types';

function createEnvironment(options: CreateAuditReportOptions): AuditEnvironment {
  const stableSettingsPath = path.join(
    options.appDataDir,
    'Code',
    'User',
    'settings.json',
  );
  const insidersSettingsPath = path.join(
    options.appDataDir,
    'Code - Insiders',
    'User',
    'settings.json',
  );

  return {
    ghpCliAvailable: options.ghpCliAvailable ?? false,
    ghpMcpAvailable: options.ghpMcpAvailable ?? false,
    stableSettingsPath,
    stableSettingsExists: options.fileContents[stableSettingsPath] !== undefined,
    insidersSettingsPath,
    insidersSettingsExists:
      options.fileContents[insidersSettingsPath] !== undefined,
    workspacePath: options.workspacePath,
  };
}

function createResult(
  targetPath: string,
  name: string,
  scope: AuditResult['scope'],
  templateKey: AuditResult['templateKey'],
  diffPaths: string[],
  exists: boolean,
  dryRun: boolean,
  mode: 'audit' | 'apply',
): AuditResult {
  let state: AuditResult['state'];

  if (!exists) {
    state = mode === 'apply' ? (dryRun ? 'would-create' : 'created') : 'missing';
  } else if (diffPaths.length === 0) {
    state = 'ok';
  } else {
    state = mode === 'apply' ? (dryRun ? 'would-update' : 'updated') : 'drift';
  }

  return {
    scope,
    name,
    path: targetPath,
    templateKey,
    state,
    diffCount: diffPaths.length,
    diffPaths,
  };
}

export function createAuditReport(
  options: CreateAuditReportOptions,
): AuditReport {
  const mode = options.mode ?? 'audit';
  const dryRun = options.dryRun ?? false;
  const targets = buildSetupTargets(options);
  const results = targets.map((target) => {
    const existing = options.fileContents[target.path] ?? {};
    const merged = mergeTemplate(existing, target.template);
    const diffPaths = getDiffPaths(existing, merged);

    return createResult(
      target.path,
      target.name,
      target.scope,
      target.templateKey,
      diffPaths,
      options.fileContents[target.path] !== undefined,
      dryRun,
      mode,
    );
  });

  return {
    scope: options.scope,
    editors: options.editors,
    dryRun,
    environment: createEnvironment(options),
    results,
  };
}
