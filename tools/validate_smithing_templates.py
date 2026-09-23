from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
SERVER = ROOT / "kubejs/server_scripts/smithing_templates.js"
STARTUP = ROOT / "kubejs/startup_scripts/smithing_templates.js"
text = SERVER.read_text(encoding="utf-8")
expected = [
    "minecraft:netherite_upgrade_smithing_template",
    "minecraft:coast_armor_trim_smithing_template",
    "minecraft:dune_armor_trim_smithing_template",
    "minecraft:eye_armor_trim_smithing_template",
    "minecraft:host_armor_trim_smithing_template",
    "minecraft:raiser_armor_trim_smithing_template",
    "minecraft:rib_armor_trim_smithing_template",
    "minecraft:sentry_armor_trim_smithing_template",
    "minecraft:shaper_armor_trim_smithing_template",
    "minecraft:silence_armor_trim_smithing_template",
    "minecraft:snout_armor_trim_smithing_template",
    "minecraft:spire_armor_trim_smithing_template",
    "minecraft:tide_armor_trim_smithing_template",
    "minecraft:vex_armor_trim_smithing_template",
    "minecraft:ward_armor_trim_smithing_template",
    "minecraft:wayfinder_armor_trim_smithing_template",
    "minecraft:wild_armor_trim_smithing_template",
]
listed = re.findall(r"'(minecraft:[a-z0-9_]+_smithing_template)'", text)
assert listed == expected, (listed, expected)
assert len(re.findall(r"event\.shaped\(\s*'4x kubejs:smithing_template_blank'", text)) == 1
assert "kubejs:smithing_template_blank" in STARTUP.read_text(encoding="utf-8")
assert len(listed) == 17 and text.count("event.shaped(") == 2
print(f"OK templates={len(expected)} blank_recipe=1 generated_shaped={len(listed) + 1}")
