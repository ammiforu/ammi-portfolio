# sync_analytics.ps1
# One command to sync your YouTube analytics to the live portfolio
# Usage: .\scripts\sync_analytics.ps1

$src = "G:\My Drive\Ammi Explains\Analytics\ammi_explain_daily.json"
$dest = "$PSScriptRoot\..\public\analytics\ammi_explain_daily.json"

Write-Host "🔄 Syncing YouTube analytics..." -ForegroundColor Cyan

if (!(Test-Path $src)) {
    Write-Host "❌ Source file not found: $src" -ForegroundColor Red
    exit 1
}

Copy-Item $src -Destination $dest -Force
Write-Host "✅ Analytics synced from Google Drive" -ForegroundColor Green

# Auto-commit and push
Set-Location "$PSScriptRoot\.."
git add public/analytics/ammi_explain_daily.json
git commit -m "data: Sync YouTube analytics $(Get-Date -Format 'yyyy-MM-dd')"
git push

Write-Host "🚀 Pushed to GitHub! Vercel will auto-deploy in ~30s." -ForegroundColor Green
