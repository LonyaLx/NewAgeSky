from pathlib import Path
import re, sys

root = Path(r"C:\Users\admin\Desktop\NewAgeSky-1.21.1\kubejs\server_scripts")
files = [root / "projecte_hardmode.js", root / "endgame_packaged_creatives.js", root / "avaritia_hardmode.js"]
pattern = re.compile(r"tableRecipe\(\s*'([^']+)'\s*,\s*(\d+)\s*,\s*\[(.*?)\]\s*,\s*'([^']+)'\s*\)", re.S)
for file in files:
    text = file.read_text(encoding="utf-8")
    calls = pattern.findall(text)
    print(file.name, "recipes", len(calls))
    for output, result_count, body, recipe_id in calls:
        entries = re.findall(r"\['([^']+)'\s*,\s*(\d+)\]", body)
        total = sum(int(count) for _, count in entries)
        if not entries:
            raise SystemExit(f"no ingredients parsed for {recipe_id}")
        if len(entries) > 26:
            raise SystemExit(f"too many unique ingredients for {recipe_id}: {len(entries)}")
        if total > 81:
            raise SystemExit(f"too many items for {recipe_id}: {total}")
        print(f"  {recipe_id}: {total}/81, types={len(entries)}, output={output}x{result_count}")