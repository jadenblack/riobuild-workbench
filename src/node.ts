import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createAuditReport } from './audit';
import type { AuditOnDiskOptions, AuditReport, JsonObject } from './types';

async function readJson(pathname: string): Promise<JsonObject | undefined> {
  try {
    const raw = await readFile(pathname, 'utf8');
    if (raw.trim().length === 0) {
      return {};
    }
    return JSON.parse(raw) as JsonObject;
  } catch {
    return undefined;
  }
}

async function commandExists(command: string): Promise<boolean> {
  const pathValue = process.env.PATH ?? '';
  const extensions = process.platform === 'win32'
    ? (process.env.PATHEXT?.split(';') ?? ['.EXE', '.CMD', '.BAT', '.PS1'])
    : [''];

  for (const entry of pathValue.split(path.delimiter)) {
    if (!entry) {
      continue;
    }

    for (const extension of extensions) {
      const candidate = process.platform === 'win32' && path.extname(command) === ''
        ? path.join(entry, `${command}${extension}`)
        : path.join(entry, command);

      try {
        await access(candidate);
        return true;
      } catch {
        continue;
      }
    }
  }

  return false;
}

export async function auditSetupOnDisk(
  options: AuditOnDiskOptions,
): Promise<AuditReport> {
  const scope = options.scope ?? 'both';
  const editors = options.editors ?? 'both';
  const homeDir = options.homeDir ?? process.env.USERPROFILE ?? process.env.HOME ?? '';
  const appDataDir = options.appDataDir ?? process.env.APPDATA ?? path.join(homeDir, 'AppData', 'Roaming');

  const targetPaths = [
    path.join(homeDir, '.config', 'ghp-cli', 'config.json'),
    path.join(appDataDir, 'Code', 'User', 'settings.json'),
    path.join(appDataDir, 'Code - Insiders', 'User', 'settings.json'),
    path.join(options.workspacePath, '.ghp', 'config.json'),
    path.join(options.workspacePath, '.vscode', 'settings.json'),
    path.join(options.workspacePath, '.vscode', 'extensions.json'),
  ];

  const fileContentsEntries = await Promise.all(
    targetPaths.map(async (targetPath) => [targetPath, await readJson(targetPath)] as const),
  );

  const fileContents = Object.fromEntries(fileContentsEntries);

  return createAuditReport({
    scope,
    editors,
    workspacePath: options.workspacePath,
    homeDir,
    appDataDir,
    dryRun: options.dryRun ?? false,
    ghpCliAvailable: await commandExists(options.ghpCliCommand ?? 'ghp'),
    ghpMcpAvailable: await commandExists(options.ghpMcpCommand ?? 'ghp-mcp'),
    fileContents,
  });
}
