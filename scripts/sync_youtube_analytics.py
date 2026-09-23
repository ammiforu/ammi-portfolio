import glob
import json
import os
import shutil
from datetime import datetime

GOOGLE_DRIVE_ANALYTICS = r"G:\My Drive\Ammi Explains\Analytics"
DAILY_JSON = os.path.join(GOOGLE_DRIVE_ANALYTICS, "ammi_explain_daily.json")
ARCHIVE_DIR = os.path.join(GOOGLE_DRIVE_ANALYTICS, "Archive")

TARGET_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "analytics"))
os.makedirs(TARGET_DIR, exist_ok=True)
TARGET_DAILY = os.path.join(TARGET_DIR, "ammi_explain_daily.json")
TARGET_TIMESERIES = os.path.join(TARGET_DIR, "youtube_timeseries.json")

def sync():
    history_by_date = {}

    # 1. Sync daily file if Google Drive is available
    if os.path.exists(DAILY_JSON):
        print(f"Syncing from Google Drive: {DAILY_JSON}")
        shutil.copy2(DAILY_JSON, TARGET_DAILY)
    else:
        print(f"Google Drive path not found, using existing target: {TARGET_DAILY}")

    # 2. Collect historical snapshots from Archive
    if os.path.exists(ARCHIVE_DIR):
        archive_files = sorted(glob.glob(os.path.join(ARCHIVE_DIR, "*.json")))
        print(f"Found {len(archive_files)} archive snapshots")
        for fpath in archive_files:
            date_str = os.path.basename(fpath).replace(".json", "")
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
                print(f"Skipping {fpath}: {e}")

    # 3. Add latest snapshot
    if os.path.exists(TARGET_DAILY):
        try:
            with open(TARGET_DAILY, "r", encoding="utf-8") as f:
                d = json.load(f)
                ch = d.get("channel", {})
                win7 = d.get("windows", {}).get("7d", {})
                win28 = d.get("windows", {}).get("28d", {})
                gen_date = (d.get("generated_at") or datetime.utcnow().isoformat())[:10]
                history_by_date[gen_date] = {
                    "date": gen_date,
                    "subscribers": ch.get("subscribers") or 0,
                    "total_views": ch.get("total_views") or 0,
                    "weekly_views": win7.get("views") or 0,
                    "weekly_watch_hours": round(win7.get("watch_time_hours") or 0, 1),
                    "monthly_views": win28.get("views") or 0,
                }
        except Exception as e:
            print(f"Error parsing latest daily: {e}")

    # Sort chronology
    sorted_history = [history_by_date[k] for k in sorted(history_by_date.keys())]

    # Format human-friendly labels (e.g. 'Aug 10', 'Sep 23')
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

    with open(TARGET_TIMESERIES, "w", encoding="utf-8") as f:
        json.dump({
            "updated_at": datetime.utcnow().isoformat() + "Z",
            "total_days": len(formatted_data),
            "history": formatted_data
        }, f, indent=2)

    print(f"Successfully generated {TARGET_TIMESERIES} with {len(formatted_data)} data points.")

if __name__ == "__main__":
    sync()
