from pathlib import Path
import sys

config = Path(sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\admin\Desktop\NewAgeSky-1.21.1\config")
avaritia = config / "avaritia-common.toml"
packaged = config / "packagedavaritia-server.toml"

text = avaritia.read_text(encoding="utf-8")
avaritia.write_text(text, encoding="utf-8", newline="\n")

text = packaged.read_text(encoding="utf-8")
replacements = {
    ("[sculk_crafter]", "energy_capacity = 5000"): "energy_capacity = 20000",
    ("[sculk_crafter]", "energy_req = 500"): "energy_req = 2000",
    ("[sculk_crafter]", "energy_usage = 100"): "energy_usage = 200",
    ("[nether_crafter]", "energy_capacity = 5000"): "energy_capacity = 50000",
    ("[nether_crafter]", "energy_req = 1000"): "energy_req = 5000",
    ("[nether_crafter]", "energy_usage = 125"): "energy_usage = 500",
    ("[end_crafter]", "energy_capacity = 5000"): "energy_capacity = 200000",
    ("[end_crafter]", "energy_req = 2500"): "energy_req = 20000",
    ("[end_crafter]", "energy_usage = 250"): "energy_usage = 2000",
    ("[extreme_crafter]", "energy_capacity = 5000"): "energy_capacity = 1000000",
    ("[extreme_crafter]", "energy_req = 5000"): "energy_req = 100000",
    ("[extreme_crafter]", "energy_usage = 500"): "energy_usage = 10000",
}
for (section, old), new in replacements.items():
    start = text.index(section)
    end = text.find("\n[", start + 1)
    if end < 0:
        end = len(text)
    block = text[start:end]
    if old not in block:
        raise RuntimeError(f"missing {old} in {section}")
    block = block.replace(old, new, 1)
    text = text[:start] + block + text[end:]
packaged.write_text(text, encoding="utf-8", newline="\n")
print(f"updated {avaritia}")
print(f"updated {packaged}")