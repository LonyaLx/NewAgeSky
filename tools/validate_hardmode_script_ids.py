from pathlib import Path
import re, sys, zipfile

ROOT = Path(r"C:\Users\admin\Desktop\NewAgeSky-1.21.1")
FILES = [
    ROOT / "kubejs" / "server_scripts" / "skyblock_materials.js",
    ROOT / "kubejs" / "server_scripts" / "avaritia_hardmode.js",
    ROOT / "kubejs" / "server_scripts" / "material_source_fixes.js",
    ROOT / "kubejs" / "server_scripts" / "smithing_templates.js",
]
CUSTOM = {
    "kubejs:smithing_template_blank",
}
VALID_TYPES = {
    "avaritia:shaped_table", "avaritia:infinity_catalyst_eternal", "packagedauto:processing",
}
known = set()
for jar in (ROOT / "mods").glob("*.jar"):
    try:
        with zipfile.ZipFile(jar) as z:
            for n in z.namelist():
                if n.startswith("assets/") and "/models/item/" in n and n.endswith(".json"):
                    p = n.split("/")
                    known.add(p[1] + ":" + Path(p[-1]).stem)
                if n.startswith("assets/") and "/blockstates/" in n and n.endswith(".json"):
                    p = n.split("/")
                    known.add(p[1] + ":" + Path(p[-1]).stem)
    except zipfile.BadZipFile:
        pass

refs = set()
for file in FILES:
    refs.update(re.findall(r"['\"]([a-z0-9_.-]+:[a-z0-9_/\.-]+)['\"]", file.read_text(encoding="utf-8")))

missing = []
for item in sorted(refs):
    if item in CUSTOM or item in VALID_TYPES:
        continue
    if item.startswith(("sky-craft-creation:", "minecraft:")) or "_ae" in item:
        continue
    if ":item/" in item or ":block/" in item:
        continue
    if item not in known:
        missing.append(item)
print("references", len(refs), "missing", len(missing))
for item in missing:
    print(item)
if missing:
    sys.exit(1)