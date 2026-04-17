export type JsonPrimitive = boolean | number | string | null;
export type JsonArray = JsonValue[] | readonly JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type JsonObject = {
  [key: string]: JsonValue;
};

export type Scope = 'user' | 'workspace' | 'both';
export type Editors = 'stable' | 'insiders' | 'both';
export type AuditState =
  | 'ok'
  | 'missing'
  | 'drift'
  | 'would-create'
  | 'would-update'
  | 'created'
  | 'updated';

export interface SetupTarget {
  scope: 'user' | 'workspace';
  name: string;
  templateKey:
    | 'user-ghp-cli'
    | 'user-vscode'
    | 'workspace-ghp'
    | 'workspace-vscode-settings'
    | 'workspace-vscode-extensions';
  path: string;
  template: JsonObject;
}

export interface AuditResult {
  scope: 'user' | 'workspace';
  name: string;
  path: string;
  templateKey: SetupTarget['templateKey'];
  state: AuditState;
  diffCount: number;
  diffPaths: string[];
}

export interface AuditEnvironment {
  ghpCliAvailable: boolean;
  ghpMcpAvailable: boolean;
  stableSettingsPath: string;
  stableSettingsExists: boolean;
  insidersSettingsPath: string;
  insidersSettingsExists: boolean;
  workspacePath: string;
}

export interface AuditReport {
  scope: Scope;
  editors: Editors;
  dryRun: boolean;
  environment: AuditEnvironment;
  results: AuditResult[];
}

export interface BuildTargetsOptions {
  homeDir: string;
  appDataDir: string;
  workspacePath: string;
  scope: Scope;
  editors: Editors;
}

export interface CreateAuditReportOptions extends BuildTargetsOptions {
  fileContents: Record<string, JsonObject | undefined>;
  ghpCliAvailable?: boolean;
  ghpMcpAvailable?: boolean;
  dryRun?: boolean;
  mode?: 'audit' | 'apply';
}

export interface AuditOnDiskOptions {
  scope?: Scope;
  editors?: Editors;
  workspacePath: string;
  homeDir?: string;
  appDataDir?: string;
  dryRun?: boolean;
  ghpCliCommand?: string;
  ghpMcpCommand?: string;
}
