import argparse
import glob
import json
import os
import shutil
import subprocess
from datetime import datetime, timezone

# Primary & Fallback paths
GOOGLE_DRIVE_ANALYTICS = r"G:\My Drive\Ammi Explains\Analytics"
LOCAL_OUTPUT_ANALYTICS = r"D:\Ai Automation\YoutubeAutomation\output"

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TARGET_DIR = os.path.join(REPO_ROOT, "public", "analytics")
LOGS_DIR = os.path.join(REPO_ROOT, "logs")
os.makedirs(TARGET_DIR, exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)

TARGET_DAILY = os.path.join(TARGET_DIR, "ammi_explain_daily.json")
TARGET_TIMESERIES = os.path.join(TARGET_DIR, "youtube_timeseries.json")
LOG_FILE = os.path.join(LOGS_DIR, "youtube_analytics_sync.log")

def log(msg: str):
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    line = f"[{timestamp}] {msg}"
    print(line)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass

def find_best_daily_file():
    gdrive_daily = os.path.join(GOOGLE_DRIVE_ANALYTICS, "ammi_explain_daily.json")
    local_daily = os.path.join(LOCAL_OUTPUT_ANALYTICS, "ammi_explain_daily.json")

    candidates = []
    if os.path.exists(gdrive_daily):
        candidates.append((os.path.getmtime(gdrive_daily), gdrive_daily, "Google Drive"))
    if os.path.exists(local_daily):
        candidates.append((os.path.getmtime(local_daily), local_daily, "Local Automation Output"))

    if not candidates:
        return None, "None"

    # Pick the most recently modified file
    candidates.sort(key=lambda c: c[0], reverse=True)
    return candidates[0][1], candidates[0][2]

def sync(auto_push: bool = False):
    log("=== Starting YouTube Portfolio Analytics Sync ===")
    history_by_date = {}

    # 1. Locate and copy best daily file
    source_file, source_name = find_best_daily_file()
    if source_file and os.path.exists(source_file):
        log(f"Syncing daily snapshot from {source_name}: {source_file}")
        shutil.copy2(source_file, TARGET_DAILY)
    else:
        log(f"No external daily file found, using existing target: {TARGET_DAILY}")

    # 2. Collect historical snapshots from both Google Drive Archive and Local Archive
    archive_dirs = [
        os.path.join(GOOGLE_DRIVE_ANALYTICS, "Archive"),
        os.path.join(LOCAL_OUTPUT_ANALYTICS, "archive"),
    ]

    found_files = []
    for adir in archive_dirs:
        if os.path.exists(adir):
            files = glob.glob(os.path.join(adir, "*.json"))
            log(f"Found {len(files)} archive snapshots in {adir}")
            found_files.extend(files)

    for fpath in sorted(found_files):
        date_str = os.path.basename(fpath).replace(".json", "")
        # Only parse valid YYYY-MM-DD
        if len(date_str) != 10 or date_str[4] != '-' or date_str[7] != '-':
            continue
        try:
            with open(fpath, "r", encoding="utf-8") as f:
                d = json.load(f)
                ch = d.get("channel", {})
                win7 = d.get("windows", {}).get("7d", {})
                win28 = d.get("windows", {}).get("28d", {})
                history_by_date[date_str] = {
                    "date": date_str,
                    "subscribers": ch.get("subscribers") or 0,
                    "total_views": ch.get("total_views") or 0,
                    "weekly_views": win7.get("views") or 0,
                    "weekly_watch_hours": round(win7.get("watch_time_hours") or 0, 1),
                    "monthly_views": win28.get("views") or 0,
                }
        except Exception as e:
            log(f"Skipping {fpath}: {e}")

    # 3. Add latest snapshot from TARGET_DAILY
    latest_views = 0
    latest_subs = 0
    latest_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    if os.path.exists(TARGET_DAILY):
        try:
            with open(TARGET_DAILY, "r", encoding="utf-8") as f:
                d = json.load(f)
                ch = d.get("channel", {})
                win7 = d.get("windows", {}).get("7d", {})
                win28 = d.get("windows", {}).get("28d", {})
                gen_date = (d.get("generated_at") or datetime.now(timezone.utc).isoformat())[:10]
                latest_views = ch.get("total_views") or 0
                latest_subs = ch.get("subscribers") or 0
                latest_date = gen_date
                history_by_date[gen_date] = {
                    "date": gen_date,
                    "subscribers": latest_subs,
                    "total_views": latest_views,
                    "weekly_views": win7.get("views") or 0,
                    "weekly_watch_hours": round(win7.get("watch_time_hours") or 0, 1),
                    "monthly_views": win28.get("views") or 0,
                }
        except Exception as e:
            log(f"Error parsing latest daily: {e}")

    # Sort chronology
    sorted_history = [history_by_date[k] for k in sorted(history_by_date.keys())]

    # Format human-friendly labels (e.g. 'Aug 10', 'Sep 23', 'Oct 29')
    formatted_data = []
    for item in sorted_history:
        try:
            dt = datetime.strptime(item["date"], "%Y-%m-%d")
            display_date = dt.strftime("%b %d")
        except Exception:
            display_date = item["date"]
        formatted_data.append({
            **item,
            "displayDate": display_date,
        })

    timeseries_payload = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "total_days": len(formatted_data),
        "history": formatted_data
    }

    with open(TARGET_TIMESERIES, "w", encoding="utf-8") as f:
        json.dump(timeseries_payload, f, indent=2)

    log(f"Saved {TARGET_TIMESERIES} with {len(formatted_data)} data points (Latest: {latest_views:,} views, {latest_subs:,} subs)")

    # 4. Optional Auto-commit and Push to GitHub
    if auto_push:
        log("Checking git status for analytics changes...")
        try:
            diff_proc = subprocess.run(
                ["git", "status", "--porcelain", "public/analytics"],
                cwd=REPO_ROOT,
                capture_output=True,
                text=True,
                check=True
            )
            changes = diff_proc.stdout.strip()
            if changes:
                log(f"Detected changes in public/analytics:\n{changes}")
                subprocess.run(["git", "add", "public/analytics"], cwd=REPO_ROOT, check=True)
                commit_msg = f"data(analytics): auto-sync YouTube stats - {latest_views:,} views, {latest_subs:,} subs [{latest_date}]"
                subprocess.run(["git", "commit", "-m", commit_msg], cwd=REPO_ROOT, check=True)
                log(f"Committed: '{commit_msg}'")
                log("Pushing to GitHub origin master...")
                push_res = subprocess.run(["git", "push", "origin", "master"], cwd=REPO_ROOT, capture_output=True, text=True, check=True)
                log(f"Git push success! Vercel auto-deployment triggered. Output: {push_res.stdout.strip()}")
            else:
                log("No changes detected in public/analytics. Repository is already up-to-date.")
        except subprocess.CalledProcessError as cpe:
            log(f"Git operation failed: {cpe.stderr if cpe.stderr else str(cpe)}")
        except Exception as ge:
            log(f"Unexpected error during git auto-push: {ge}")

    log("=== YouTube Portfolio Analytics Sync Completed ===")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync YouTube analytics into portfolio public directory.")
    parser.add_argument("--auto-push", action="store_true", help="Automatically git commit and push if data changed.")
    args = parser.parse_args()
    sync(auto_push=args.auto_push)
