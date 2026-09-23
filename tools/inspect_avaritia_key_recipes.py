from pathlib import Path
import json, zipfile
jar = Path(r"D:\我的世界整合包\1\versions\Creative Drawers Producer 2\mods\Re-Avaritia-neoforge-1.21.1-1.4.1-release.jar")
wanted = {
"extreme_crafting_table", "extreme_anvil", "neutron_collector", "dense_neutron_collector",
"denser_neutron_collector", "densest_neutron_collector", "neutron_compressor",
"dense_neutron_compressor", "denser_neutron_compressor", "densest_neutron_compressor",
"infinity_catalyst", "infinity_ingot", "eternal_singularity", "endest_pearl",
"infinity_helmet", "infinity_chestplate", "infinity_pants", "infinity_boots",
"infinity_sword", "infinity_pickaxe", "infinity_axe", "infinity_shovel", "infinity_bow",
"infinity_shield", "refined_coal", "star_fuel", "compressed_chest",
}
with zipfile.ZipFile(jar) as z:
    for n in z.namelist():
        if "/recipe/" not in n or not n.endswith(".json"):
            continue
        stem = Path(n).stem
        if stem not in wanted:
            continue
        obj = json.loads(z.read(n))
        print("\n###", n)
        print(json.dumps(obj, ensure_ascii=False, indent=2))