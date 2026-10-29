# setup_windows_sync_task.ps1
# Creates a Windows Scheduled Task to auto-sync YouTube analytics daily

$TaskName = "AmmiPortfolio-YouTubeSync"
$ScriptPath = "D:\Jobprofile\scripts\sync_analytics.ps1"
$Cmd = "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File \`"$ScriptPath\`""

Write-Host "Creating/Updating Windows Scheduled Task: $TaskName" -ForegroundColor Cyan

# Create using schtasks.exe (supports non-admin user tasks)
& schtasks.exe /create /tn $TaskName /tr $Cmd /sc daily /st 07:15 /f

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Scheduled Task '$TaskName' registered successfully!" -ForegroundColor Green
    Write-Host "Runs daily at 07:15 AM (Next run scheduled)." -ForegroundColor Green
} else {
    Write-Host "❌ Failed to register scheduled task." -ForegroundColor Red
}
