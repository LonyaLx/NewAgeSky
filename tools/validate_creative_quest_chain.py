from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
CHAPTER = ROOT / "config/ftbquests/quests/chapters/1_7e92de28de7f8513.snbt"
LANG = ROOT / "config/ftbquests/quests/lang/zh_cn.snbt"
text = CHAPTER.read_text(encoding="utf-8")
lang = LANG.read_text(encoding="utf-8")
blocks = re.findall(r"(?ms)^\t\t\{\n(.*?)^\t\t\}(?:,)?", text)
expected = [
    ("kubejs:tiangong_alloy_frame", 4),
    ("kubejs:quantum_control_matrix", 4),
    ("kubejs:emc_focus_module", 4),
    ("kubejs:infinity_structural_core", 2),
    ("kubejs:celestial_frame", 4),
    ("kubejs:worldheart_matrix", 2),
    ("kubejs:tiangong_core", 4),
    ("mekanism:creative_energy_cube", 1),
    ("create:creative_motor", 1),
    ("mekanism:creative_bin", 1),
    ("create:creative_crate", 1),
    ("mekanism:creative_fluid_tank", 1),
    ("mekanism:creative_chemical_tank", 1),
    ("create:creative_fluid_tank", 1),
    ("draconicevolution:creative_op_capacitor", 1),
    ("pneumaticcraft:creative_compressed_iron_block", 1),
    ("jdte:creative_upgrade", 1),
    ("kubejs:creative_convergence_core", 1),
    ("ae2:creative_storage_cell", 1),
]
parsed = []
for block in blocks:
    qid = re.search(r'(?m)^\s*id:\s*"([0-9A-F]{16})"', block)
    task = re.search(r'(?m)^\s*id:\s*"([0-9A-F]{16})"', block[block.find("tasks:"):])
    item = re.search(r'item:\s*\{\s*count:\s*1,\s*id:\s*"([^"]+)"\s*\}', block)
    count = re.search(r'(?m)^\s*count:\s*(\d+)L', block)
    dep = re.search(r"(?ms)dependencies:\s*\[(.*?)\]", block)
    if not (qid and task and item):
        raise SystemExit("Malformed quest block")
    parsed.append((qid.group(1), item.group(1), int(count.group(1)) if count else 1, re.findall(r'"([0-9A-F]{16})"', dep.group(1)) if dep else []))
if [(item, count) for _, item, count, _ in parsed] != expected:
    raise SystemExit("Unexpected quest item order or count")
qids = {qid for qid, _, _, _ in parsed}
if len(qids) != len(parsed):
    raise SystemExit("Duplicate quest ID")
for qid, _, _, deps in parsed:
    if qid in deps or any(dep not in qids for dep in deps):
        raise SystemExit(f"Invalid dependency for {qid}")
if "functionalstorage:creative_vending_upgrade" in text:
    raise SystemExit("Old final target still present")
if "chapter.7E92DE28DE7F8513.title" not in lang:
    raise SystemExit("Chapter title missing")
for qid, item, _, _ in parsed:
    if f"quest.{qid}.title" not in lang or f"quest.{qid}.quest_desc" not in lang:
        raise SystemExit(f"Missing language entry for {qid} {item}")
print(f"OK quests={len(parsed)} unique_ids={len(qids)} final={parsed[-1][1]} dependencies={sum(len(x[3]) for x in parsed)}")
