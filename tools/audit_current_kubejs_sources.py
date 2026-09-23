from pathlib import Path
import json, re, zipfile, collections

ROOT = Path(r"C:\Users\admin\Desktop\NewAgeSky-1.21.1")
MODS = ROOT / "mods"
SCRIPTS = ROOT / "kubejs" / "server_scripts"
MODEL_IDS = set()
RECIPE_OUTPUTS = set()
RECIPE_SOURCES = collections.defaultdict(list)


def collect_ids(value):
    found = set()
    if isinstance(value, str):
        if re.fullmatch(r"[a-z0-9_.-]+:[a-z0-9_/\.-]+", value):
            found.add(value)
    elif isinstance(value, list):
        for entry in value:
            found |= collect_ids(entry)
    elif isinstance(value, dict):
        for entry in value.values():
            found |= collect_ids(entry)
    return found


def json_result_ids(obj):
    found = set()
    if isinstance(obj, dict):
        for key in ("result", "results", "output", "outputs", "itemOutput", "itemOutputs"):
            if key in obj:
                found |= collect_ids(obj[key])
        for value in obj.values():
            if isinstance(value, (dict, list)):
                found |= json_result_ids(value)
    elif isinstance(obj, list):
        for value in obj:
            found |= json_result_ids(value)
    return found

for jar in MODS.glob("*.jar"):
    try:
        with zipfile.ZipFile(jar) as z:
            for n in z.namelist():
                if n.startswith("assets/") and "/models/item/" in n and n.endswith(".json"):
                    p = n.split("/")
                    MODEL_IDS.add(p[1] + ":" + Path(p[-1]).stem)
                if n.startswith("assets/") and "/blockstates/" in n and n.endswith(".json"):
                    p = n.split("/")
                    MODEL_IDS.add(p[1] + ":" + Path(p[-1]).stem)
                if n.startswith("data/") and "/recipe/" in n and n.endswith(".json"):
                    try:
                        result = json_result_ids(json.loads(z.read(n)))
                    except Exception:
                        continue
                    for item in result:
                        RECIPE_OUTPUTS.add(item)
                        RECIPE_SOURCES[item].append(jar.name + "!" + n)
    except zipfile.BadZipFile:
        pass

references = set()
custom_outputs = set()
for script in SCRIPTS.glob("*.js"):
    text = script.read_text(encoding="utf-8")
    references |= set(re.findall(r"['\"]([a-z0-9_.-]+:[a-z0-9_/\.-]+)['\"]", text))
    for pattern in (
        r"event\.shaped\(\s*['\"]([a-z0-9_.-]+:[a-z0-9_/\.-]+)",
        r"event\.shapeless\(\s*['\"]([a-z0-9_.-]+:[a-z0-9_/\.-]+)",
        r"tableRecipe\(\s*['\"]([a-z0-9_.-]+:[a-z0-9_/\.-]+)",
        r"addCreativeRecipe\(\s*['\"]([a-z0-9_.-]+:[a-z0-9_/\.-]+)",
    ):
        custom_outputs |= set(re.findall(pattern, text))
    for item in re.findall(r"['\"]result['\"]\s*:\s*\{\s*['\"]id['\"]\s*:\s*['\"]([a-z0-9_.-]+:[a-z0-9_/\.-]+)", text):
        custom_outputs.add(item)

refs = {item for item in references if item in MODEL_IDS}
KNOWN_DYNAMIC_OUTPUTS = {'avaritia:infinity_catalyst', 'extendedcrafting:ultimate_singularity'}; missing = sorted(refs - RECIPE_OUTPUTS - custom_outputs - KNOWN_DYNAMIC_OUTPUTS)
print("referenced item ids:", len(refs))
print("standard recipe outputs:", len(RECIPE_OUTPUTS))
print("custom KubeJS outputs:", len(custom_outputs))
print("no known output recipe:", len(missing))
for item in missing:
    print(item)
