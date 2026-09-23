from __future__ import annotations

import argparse
from pathlib import Path
import subprocess
import tempfile

from PIL import Image

EDGE_CANDIDATES = (
    Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
    Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
)
ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "tools" / "cover-template.html"


def main() -> int:
    parser = argparse.ArgumentParser(description="Render the single 1280x720 release cover.")
    parser.add_argument("--version", required=True)
    parser.add_argument("--mods", required=True, type=int)
    parser.add_argument("--quests", required=True, type=int)
    parser.add_argument("--chapters", required=True, type=int)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    edge = next((path for path in EDGE_CANDIDATES if path.is_file()), None)
    if edge is None:
        raise RuntimeError("Microsoft Edge not found")

    output = Path(args.output).resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    html = TEMPLATE.read_text(encoding="utf-8")
    replacements = {
        "{{VERSION}}": args.version,
        "{{MODS}}": str(args.mods),
        "{{QUESTS}}": str(args.quests),
        "{{CHAPTERS}}": str(args.chapters),
    }
    for key, value in replacements.items():
        html = html.replace(key, value)

    with tempfile.TemporaryDirectory(prefix="newagesky-cover-") as temp_name:
        temp = Path(temp_name)
        html_path = temp / "cover.html"
        png_path = temp / "cover.png"
        profile = temp / "edge-profile"
        html_path.write_text(html, encoding="utf-8")
        subprocess.run(
            [
                str(edge),
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--no-first-run",
                "--force-device-scale-factor=1",
                "--window-size=2048,1152",
                f"--user-data-dir={profile}",
                f"--screenshot={png_path}",
                html_path.as_uri(),
            ],
            check=True,
        )
        image = Image.open(png_path).convert("RGB")
        image.resize((1280, 720), Image.Resampling.LANCZOS).save(
            output, "JPEG", quality=92, optimize=True, progressive=True
        )
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())