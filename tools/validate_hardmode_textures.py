from pathlib import Path
import re, sys, zipfile

root = Path(r"C:\Users\admin\Desktop\NewAgeSky-1.21.1")
source = root / "kubejs" / "startup_scripts" / "endgame_items.js"
refs = re.findall(r"\.texture\('([^']+)'\)", source.read_text(encoding="utf-8"))
files = set()
for jar in (root / "mods").glob("*.jar"):
    try:
        with zipfile.ZipFile(jar) as z:
            files.update(z.namelist())
    except zipfile.BadZipFile:
        pass
missing = []
for ref in refs:
    namespace, path = ref.split(":", 1)
    expected = f"assets/{namespace}/textures/{path}.png"
    print(("OK  " if expected in files else "MISS"), ref)
    if expected not in files:
        missing.append(ref)
if missing:
    sys.exit(1)