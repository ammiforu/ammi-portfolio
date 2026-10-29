# sync_analytics.ps1
# Fully automated sync of YouTube analytics to live portfolio & Vercel
# Usage: powershell.exe -ExecutionPolicy Bypass -File .\scripts\sync_analytics.ps1

$repoRoot = Resolve-Path "$PSScriptRoot\.."
$pythonPath = Join-Path $repoRoot ".venv\Scripts\python.exe"

if (!(Test-Path $pythonPath)) {
    # Fallback to system python
    $pythonPath = "python"
}

$syncScript = Join-Path $repoRoot "scripts\sync_youtube_analytics.py"

Write-Host "🔄 Running automated YouTube Analytics sync pipeline..." -ForegroundColor Cyan
& $pythonPath $syncScript --auto-push
Write-Host "✅ Pipeline execution finished." -ForegroundColor Green
