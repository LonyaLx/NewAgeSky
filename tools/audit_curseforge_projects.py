from __future__ import annotations

import concurrent.futures
import datetime as dt
import json
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESOLVED = ROOT / "_excluded" / "curseforge_resolved.json"
REPORT_DIR = ROOT / "_excluded"
USER_AGENT = "Mozilla/5.0 NewAgeSky-CurseForge-Audit/1.0"
WORKERS = 6
RETRIES = 4


def fetch(project_id: int) -> dict:
    request = urllib.request.Request(
        f"https://api.cfwidget.com/{project_id}",
        headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
    )
    last_error = None
    for attempt in range(RETRIES):
        try:
            with urllib.request.urlopen(request, timeout=45) as response:
                return json.load(response)
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                return {"missing": True, "http_status": 404}
            last_error = exc
            if exc.code not in (403, 408, 425, 429, 500, 502, 503, 504):
                raise
        except (urllib.error.URLError, TimeoutError) as exc:
            last_error = exc
        if attempt + 1 < RETRIES:
            time.sleep(1.5 * (attempt + 1))
    raise last_error


def check(item: tuple[str, dict]) -> dict:
    name, meta = item
    project_id = int(meta["projectID"])
    file_id = int(meta["fileID"])
    result = {
        "file": name,
        "projectID": project_id,
        "fileID": file_id,
        "slug": meta.get("slug", ""),
        "title": meta.get("title", ""),
    }
    data = fetch(project_id)
    if data.get("missing"):
        return {**result, "status": "project_missing"}
    file_ids = {int(entry["id"]) for entry in data.get("files", []) if "id" in entry}
    download_id = data.get("download", {}).get("id")
    if isinstance(download_id, int):
        file_ids.add(download_id)
    result.update(
        {
            "status": "ok" if file_id in file_ids else "file_missing",
            "page": data.get("url", ""),
            "actual_title": data.get("title", ""),
        }
    )
    return result


def main() -> int:
    mapping = json.loads(RESOLVED.read_text(encoding="utf-8"))
    entries = [(name, meta) for name, meta in mapping.items() if meta.get("projectID") and meta.get("fileID")]
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = {pool.submit(check, item): item for item in entries}
        completed = 0
        for future in concurrent.futures.as_completed(futures):
            item = futures[future]
            completed += 1
            try:
                results.append(future.result())
            except Exception as exc:
                results.append(
                    {
                        "file": item[0],
                        "projectID": item[1].get("projectID"),
                        "fileID": item[1].get("fileID"),
                        "status": "error",
                        "error": f"{type(exc).__name__}: {exc}",
                    }
                )
            if completed % 20 == 0 or completed == len(entries):
                print(f"checked {completed}/{len(entries)}", flush=True)

    problems = [row for row in results if row["status"] != "ok"]
    report = {
        "generated_at": dt.datetime.now().astimezone().isoformat(timespec="seconds"),
        "checked": len(results),
        "ok": len(results) - len(problems),
        "problems": problems,
        "results": sorted(results, key=lambda row: row["file"].lower()),
    }
    path = REPORT_DIR / f"curseforge_project_audit_{dt.datetime.now():%Y%m%d_%H%M%S}.json"
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"checked": report["checked"], "ok": report["ok"], "problems": len(problems)}, ensure_ascii=False))
    for row in problems:
        print(f"{row['status']}: {row.get('title') or row['file']} ({row['projectID']}/{row['fileID']})")
    print(f"report={path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())