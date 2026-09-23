from pathlib import Path
import re
import sys

CONFIG = Path(sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\admin\Desktop\NewAgeSky-1.21.1\config\ProjectE")
mapping = CONFIG / "mapping.toml"
server = CONFIG / "server.toml"


def set_mapper_enabled(text: str, mapper: str, enabled: bool) -> str:
    pattern = rf'(\[{re.escape(mapper)}\]\s*\n(?:(?:\s*#[^\n]*)?\n)*?\s*)enabled\s*=\s*(?:true|false)'
    replacement = rf'\g<1>enabled = {str(enabled).lower()}'
    updated, count = re.subn(pattern, replacement, text, count=1, flags=re.M)
    if count != 1:
        raise RuntimeError(f"failed to update {mapper}")
    return updated

text = mapping.read_text(encoding="utf-8").replace("\r\n", "\n")
for mapper in (
    "mappers.Brewing-Mapper",
    "mappers.Oxidization-Mapper",
    "mappers.Waxable-Mapper",
    "mappers.Crafting-Mapper",
):
    text = set_mapper_enabled(text, mapper, False)
mapping.write_text(text, encoding="utf-8", newline="\n")

text = server.read_text(encoding="utf-8").replace("\r\n", "\n")
replacements = {
    "katarDeathAura = 1000.0": "katarDeathAura = 20.0",
    "covalenceLoss = 1.0": "covalenceLoss = 0.6",
    "timePedBonus = 18": "timePedBonus = 6",
}
for old, new in replacements.items():
    if old not in text:
        raise RuntimeError(f"missing server.toml setting: {old}")
    text = text.replace(old, new, 1)
server.write_text(text, encoding="utf-8", newline="\n")
print(f"updated {mapping}")
print(f"updated {server}")