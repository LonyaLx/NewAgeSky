from pathlib import Path
import json, zipfile
jar = Path(r"D:\我的世界整合包\1\versions\Creative Drawers Producer 2\mods\Re-Avaritia-neoforge-1.21.1-1.4.1-release.jar")
keys = [
    "neutron", "neutron_pile", "neutron_ingot", "crystal_matrix", "crystal_matrix_ingot",
    "diamond_lattice", "refined_coal", "star_fuel", "eternal_singularity",
    "infinity_catalyst", "infinity_ingot", "extreme_crafting_table", "extreme_anvil",
    "neutron_collector", "dense_neutron_collector", "denser_neutron_collector", "densest_neutron_collector",
    "neutron_compressor", "dense_neutron_compressor", "denser_neutron_compressor", "densest_neutron_compressor",
]
with zipfile.ZipFile(jar) as z:
    names = [n for n in z.namelist() if "/recipe/" in n and n.endswith(".json") and any(k in n for k in keys)]
    for n in names:
        obj = json.loads(z.read(n))
        print("\n###", n)
        print(json.dumps(obj, ensure_ascii=False, indent=2)[:9000])