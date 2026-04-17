[CmdletBinding()]
param(
    [ValidateSet('Audit', 'Apply')]
    [string]$Mode = 'Audit',

    [ValidateSet('User', 'Workspace', 'Both')]
    [string]$Scope = 'Both',

    [ValidateSet('Stable', 'Insiders', 'Both')]
    [string]$Editors = 'Both',

    [string]$WorkspacePath = (Get-Location).Path,

    [switch]$DryRun,

    [switch]$AsJson
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$pluginRoot = Split-Path -Parent $PSScriptRoot
$templatesRoot = Join-Path $pluginRoot 'templates'

function Read-JsonFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        return @{}
    }

    $raw = Get-Content -LiteralPath $Path -Raw
    if ([string]::IsNullOrWhiteSpace($raw)) {
        return @{}
    }

    return (ConvertFrom-Json -InputObject $raw -AsHashtable)
}

function Write-JsonFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [object]$Value
    )

    $parent = Split-Path -Parent $Path
    if (-not (Test-Path -LiteralPath $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }

    $json = $Value | ConvertTo-Json -Depth 32
    Set-Content -LiteralPath $Path -Value ($json + "`n")
}

function Copy-Value {
    param([object]$Value)

    if ($Value -is [System.Collections.IDictionary]) {
        $copy = [ordered]@{}
        foreach ($key in $Value.Keys) {
            $copy[$key] = Copy-Value -Value $Value[$key]
        }
        return $copy
    }

    if ($Value -is [System.Collections.IList] -and -not ($Value -is [string])) {
        $items = @()
        foreach ($item in $Value) {
            $items += Copy-Value -Value $item
        }
        return $items
    }

    return $Value
}

function Merge-Value {
    param(
        [object]$Current,
        [object]$Template
    )

    if ($Current -is [System.Collections.IDictionary] -and $Template -is [System.Collections.IDictionary]) {
        $merged = [ordered]@{}
        foreach ($key in $Current.Keys) {
            $merged[$key] = Copy-Value -Value $Current[$key]
        }
        foreach ($key in $Template.Keys) {
            if ($merged.Contains($key)) {
                $merged[$key] = Merge-Value -Current $merged[$key] -Template $Template[$key]
            } else {
                $merged[$key] = Copy-Value -Value $Template[$key]
            }
        }
        return $merged
    }

    if ($Current -is [System.Collections.IList] -and $Template -is [System.Collections.IList] -and -not ($Current -is [string]) -and -not ($Template -is [string])) {
        $allScalar = $true
        foreach ($item in @($Current) + @($Template)) {
            if ($item -is [System.Collections.IDictionary] -or ($item -is [System.Collections.IList] -and -not ($item -is [string]))) {
                $allScalar = $false
                break
            }
        }

        if ($allScalar) {
            $seen = @{}
            $result = @()
            foreach ($item in @($Current) + @($Template)) {
                $key = if ($null -eq $item) { '__null__' } else { [string]$item }
                if (-not $seen.ContainsKey($key)) {
                    $seen[$key] = $true
                    $result += $item
                }
            }
            return $result
        }

        return Copy-Value -Value $Template
    }

    return Copy-Value -Value $Template
}

function Normalize-Value {
    param([object]$Value)

    if ($Value -is [System.Collections.IDictionary]) {
        $ordered = [ordered]@{}
        foreach ($key in ($Value.Keys | Sort-Object)) {
            $ordered[$key] = Normalize-Value -Value $Value[$key]
        }
        return $ordered
    }

    if ($Value -is [System.Collections.IList] -and -not ($Value -is [string])) {
        $items = @()
        foreach ($item in $Value) {
            $items += Normalize-Value -Value $item
        }
        return $items
    }

    return $Value
}

function Get-DiffPaths {
    param(
        [object]$Before,
        [object]$After,
        [string]$Prefix = ''
    )

    $beforeJson = (Normalize-Value -Value $Before) | ConvertTo-Json -Depth 32 -Compress
    $afterJson = (Normalize-Value -Value $After) | ConvertTo-Json -Depth 32 -Compress

    if ($beforeJson -eq $afterJson) {
        return @()
    }

    if ($Before -is [System.Collections.IDictionary] -and $After -is [System.Collections.IDictionary]) {
        $keys = @($Before.Keys + $After.Keys | Sort-Object -Unique)
        $diffs = @()
        foreach ($key in $keys) {
            $nextPrefix = if ([string]::IsNullOrEmpty($Prefix)) { $key } else { "$Prefix.$key" }
            $beforeValue = if ($Before.Contains($key)) { $Before[$key] } else { $null }
            $afterValue = if ($After.Contains($key)) { $After[$key] } else { $null }
            $diffs += Get-DiffPaths -Before $beforeValue -After $afterValue -Prefix $nextPrefix
        }
        return $diffs
    }

    return @($Prefix)
}

function Get-EditorTargets {
    $targets = @()
    $appData = if ($env:APPDATA) { $env:APPDATA } else { Join-Path $HOME 'AppData\Roaming' }

    if ($Editors -in @('Stable', 'Both')) {
        $targets += [pscustomobject]@{
            Scope = 'User'
            Name = 'VS Code Stable settings'
            TemplatePath = Join-Path $templatesRoot 'user\vscode.settings.json'
            TargetPath = Join-Path $appData 'Code\User\settings.json'
        }
    }

    if ($Editors -in @('Insiders', 'Both')) {
        $targets += [pscustomobject]@{
            Scope = 'User'
            Name = 'VS Code Insiders settings'
            TemplatePath = Join-Path $templatesRoot 'user\vscode.settings.json'
            TargetPath = Join-Path $appData 'Code - Insiders\User\settings.json'
        }
    }

    return $targets
}

function Get-Targets {
    $targets = @()

    if ($Scope -in @('User', 'Both')) {
        $targets += [pscustomobject]@{
            Scope = 'User'
            Name = 'ghp-cli user config'
            TemplatePath = Join-Path $templatesRoot 'user\ghp-cli.config.json'
            TargetPath = Join-Path $HOME '.config\ghp-cli\config.json'
        }
        $targets += Get-EditorTargets
    }

    if ($Scope -in @('Workspace', 'Both')) {
        $workspaceRoot = (Resolve-Path -LiteralPath $WorkspacePath).Path
        $targets += [pscustomobject]@{
            Scope = 'Workspace'
            Name = 'Workspace GHP config'
            TemplatePath = Join-Path $templatesRoot 'workspace\ghp.config.json'
            TargetPath = Join-Path $workspaceRoot '.ghp\config.json'
        }
        $targets += [pscustomobject]@{
            Scope = 'Workspace'
            Name = 'Workspace VS Code settings'
            TemplatePath = Join-Path $templatesRoot 'workspace\vscode.settings.json'
            TargetPath = Join-Path $workspaceRoot '.vscode\settings.json'
        }
        $targets += [pscustomobject]@{
            Scope = 'Workspace'
            Name = 'Workspace VS Code extensions'
            TemplatePath = Join-Path $templatesRoot 'workspace\vscode.extensions.json'
            TargetPath = Join-Path $workspaceRoot '.vscode\extensions.json'
        }
    }

    return $targets
}

function Test-Executable {
    param([string]$Name)

    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Get-EnvironmentSummary {
    $appData = if ($env:APPDATA) { $env:APPDATA } else { Join-Path $HOME 'AppData\Roaming' }

    return [pscustomobject]@{
        ghpCliAvailable = Test-Executable -Name 'ghp'
        ghpMcpAvailable = Test-Executable -Name 'ghp-mcp'
        stableSettingsPath = Join-Path $appData 'Code\User\settings.json'
        stableSettingsExists = Test-Path -LiteralPath (Join-Path $appData 'Code\User\settings.json')
        insidersSettingsPath = Join-Path $appData 'Code - Insiders\User\settings.json'
        insidersSettingsExists = Test-Path -LiteralPath (Join-Path $appData 'Code - Insiders\User\settings.json')
        workspacePath = (Resolve-Path -LiteralPath $WorkspacePath).Path
    }
}

$results = @()
foreach ($target in (Get-Targets)) {
    $template = Read-JsonFile -Path $target.TemplatePath
    $existing = Read-JsonFile -Path $target.TargetPath
    $merged = Merge-Value -Current $existing -Template $template
    $diffPaths = @(Get-DiffPaths -Before $existing -After $merged)
    $exists = Test-Path -LiteralPath $target.TargetPath

    $state = if (-not $exists) {
        'missing'
    } elseif ($diffPaths.Count -eq 0) {
        'ok'
    } else {
        'drift'
    }

    if ($Mode -eq 'Apply' -and $state -ne 'ok' -and -not $DryRun) {
        Write-JsonFile -Path $target.TargetPath -Value $merged
        $state = if ($exists) { 'updated' } else { 'created' }
    }

    if ($Mode -eq 'Apply' -and $state -ne 'ok' -and $DryRun) {
        $state = if ($exists) { 'would-update' } else { 'would-create' }
    }

    $results += [pscustomobject]@{
        scope = $target.Scope
        name = $target.Name
        path = $target.TargetPath
        template = $target.TemplatePath
        state = $state
        diffCount = $diffPaths.Count
        diffPaths = $diffPaths
    }
}

$output = [pscustomobject]@{
    mode = $Mode
    scope = $Scope
    editors = $Editors
    dryRun = [bool]$DryRun
    environment = Get-EnvironmentSummary
    results = $results
}

if ($AsJson) {
    $output | ConvertTo-Json -Depth 32
    exit 0
}

Write-Host "GHP VS Code Setup Manager"
Write-Host "Mode: $Mode | Scope: $Scope | Editors: $Editors | DryRun: $([bool]$DryRun)"
Write-Host ""
Write-Host "Environment"
Write-Host "  ghp available: $($output.environment.ghpCliAvailable)"
Write-Host "  ghp-mcp available: $($output.environment.ghpMcpAvailable)"
Write-Host "  VS Code Stable settings: $($output.environment.stableSettingsPath)"
Write-Host "  VS Code Stable exists: $($output.environment.stableSettingsExists)"
Write-Host "  VS Code Insiders settings: $($output.environment.insidersSettingsPath)"
Write-Host "  VS Code Insiders exists: $($output.environment.insidersSettingsExists)"
Write-Host "  Workspace: $($output.environment.workspacePath)"
Write-Host ""

foreach ($result in $results) {
    Write-Host "[$($result.scope)] $($result.name)"
    Write-Host "  State: $($result.state)"
    Write-Host "  Path:  $($result.path)"
    if ($result.diffCount -gt 0) {
        Write-Host "  Diff paths: $($result.diffPaths -join ', ')"
    }
    Write-Host ""
}
