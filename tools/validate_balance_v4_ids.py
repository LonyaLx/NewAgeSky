from pathlib import Path
import zipfile, re, sys

ROOT = Path(r"C:\Users\admin\Desktop\NewAgeSky-1.21.1")
MODS = ROOT / "mods"
IDS = {
    "projecte": [
        "philosophers_stone", "transmutation_table", "transmutation_tablet",
        "collector_mk1", "collector_mk2", "collector_mk3",
        "relay_mk1", "relay_mk2", "relay_mk3",
        "condenser_mk1", "condenser_mk2",
        "dark_matter", "dark_matter_block", "red_matter", "red_matter_block",
        "aeternalis_fuel", "mobius_fuel", "alchemical_coal", "iron_band",
        "alchemical_chest", "dm_furnace"
    ],
    "ae2": ["singularity", "pattern_provider", "wireless_terminal", "cell_component_256k", "quantum_ring", "quantum_link"],
    "advanced_ae": ["quantum_core"],
    "extendedcrafting": ["black_iron_ingot", "the_ultimate_ingot", "the_ultimate_component", "the_ultimate_block"],
    "packagedauto": ["me_package_component", "packaging_provider", "package_component"],
    "mekanism": ["alloy_atomic", "ultimate_control_circuit", "ultimate_energy_cube", "ultimate_bin", "ultimate_fluid_tank", "ultimate_chemical_tank", "teleporter_frame", "qio_drive_array"],
    "mekanismsun": ["supernova_alloy", "supernova_control_circuit", "supernova_energy_cube", "artificial_sun_casing", "artificial_sun_port"],
    "draconicevolution": ["draconium_core", "awakened_core", "awakened_draconium_block", "chaotic_core", "chaotic_energy_core", "energy_core"],
    "powah": ["ender_core", "energy_cell_nitro", "reactor_nitro"],
    "bigreactors": ["insanite_ingot", "energycore"],
    "hostilenetworks": ["prediction_matrix"],
    "extrahnn": ["ultimate_sim_chamber_v4", "ultimate_loot_fabricator_v4"],
    "enderio": ["reinforced_obsidian_block"],
    "immersiveengineering": ["component_steel", "capacitor_hv"],
    "create": ["precision_mechanism", "mechanical_bearing", "item_vault", "fluid_tank"],
    "pneumaticcraft": ["advanced_pressure_tube", "compressed_iron_block", "creative_compressed_iron_block"],
    "jdte": ["overclock_upgrade", "creative_upgrade"],
    "sophisticatedstorage": ["netherite_chest"],
    "projectexpansion": ["condenser_mk3", "final_power_flower"],
    "mysticalagriculture": ["supremium_essence", "prosperity_seed_base"],
}
models = {}
modids = set()
for jar in MODS.glob("*.jar"):
    try:
        with zipfile.ZipFile(jar) as z:
            for n in z.namelist():
                if n.lower() in ("meta-inf/neoforge.mods.toml", "meta-inf/mods.toml"):
                    try:
                        modids.update(re.findall(r'(?m)^\s*modId\s*=\s*"([^"]+)"', z.read(n).decode("utf-8", "ignore")))
                    except Exception:
                        pass
                if n.startswith("assets/") and "/models/item/" in n and n.endswith(".json"):
                    parts = n.split("/")
                    models.setdefault(parts[1], set()).add(Path(parts[-1]).stem)
    except zipfile.BadZipFile:
        pass

missing = []
for ns, names in IDS.items():
    unknown_ns = ns not in modids
    for name in names:
        if unknown_ns or name not in models.get(ns, set()):
            missing.append((ns, name, "namespace" if unknown_ns else "model/item"))
if missing:
    print("MISSING", len(missing))
    for row in missing:
        print(" | ".join(row))
    sys.exit(1)
print("OK", sum(len(v) for v in IDS.values()), "candidate IDs across", len(IDS), "namespaces")
