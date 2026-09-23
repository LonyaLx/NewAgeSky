from pathlib import Path
import json, re, zipfile
jar = Path(r"D:\我的世界整合包\1\versions\Creative Drawers Producer 2\mods\Re-Avaritia-neoforge-1.21.1-1.4.1-release.jar")
models = set()
outputs = set()
with zipfile.ZipFile(jar) as z:
    for n in z.namelist():
        if n.startswith("assets/avaritia/models/item/") and n.endswith(".json"):
            models.add("avaritia:" + Path(n).stem)
        if "/recipe/" in n and n.endswith(".json"):
            text = z.read(n).decode("utf-8", "ignore")
            for out in re.findall(r'"id"\s*:\s*"(avaritia:[^"]+)"', text):
                outputs.add(out)
    # Recipes can output items with ids in nested result objects only; this is sufficient for the audit.
missing = sorted(models - outputs)
print("models", len(models), "recipe_outputs", len(outputs), "missing", len(missing))
for item in missing:
    print(item)