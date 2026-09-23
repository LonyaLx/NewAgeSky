from pathlib import Path
import re, sys, zipfile

root = Path(r"C:\Users\admin\Desktop\NewAgeSky-1.21.1")
script = root / "kubejs" / "server_scripts" / "avaritia_hardmode.js"
text = script.read_text(encoding="utf-8")
refs = set(re.findall(r"['\"]([a-z0-9_]+:[a-z0-9_/\.-]+)['\"]", text))
refs = {r for r in refs if not r.startswith(("sky-craft-creation:", "minecraft:", "kubejs:")) and ":item/" not in r and ":block/" not in r}
refs.discard("avaritia:shaped_table")
refs.discard("avaritia:infinity_catalyst_eternal")
refs = {r for r in refs if not (r.startswith('packagedavaritia:') and r.endswith('_ae'))}

known = set()
for jar in (root / "mods").glob("*.jar"):
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

missing = sorted(refs - known)
if missing:
    print("missing ids:")
    for item in missing:
        print(item)
    sys.exit(1)

for m in re.finditer(r"pattern\s*:\s*\[(.*?)\]", text, re.S):
    rows = re.findall(r"['\"]([^'\"]+)['\"]", m.group(1))
    lengths = {len(row) for row in rows}
    if len(lengths) != 1:
        raise SystemExit(f"pattern row lengths differ: {rows}")
print("avaritia refs", len(refs), "patterns", len(re.findall(r'pattern\s*:', text)), "ok")