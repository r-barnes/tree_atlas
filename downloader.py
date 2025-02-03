#!/usr/bin/env python3

from pathlib import Path
import shutil
import subprocess
import sys
import time

import tqdm

assert str(Path().cwd()).endswith("tree_atlas")

OUT_DIR = Path("out")
OUT_DIR.mkdir(exist_ok=True)

def save_page(url: str, base: str, load_wait: int = 3, save_wait: int = 3) -> None:
    print(f"Archiving {url}")
    subprocess.run(["google-chrome-stable", url], check=True)
    time.sleep(load_wait)
    while True:
        subprocess.run(["xdotool", "key", "Control_L+s"], check=True)
        time.sleep(1)
        subprocess.run(["xdotool", "key", "Enter"], check=True)
        time.sleep(save_wait)
        tree_number = Path(url).name
        try:
            shutil.move(Path("/z/downloads"), OUT_DIR / f"{base}_{tree_number}")
        except FileNotFoundError:
            continue
        break
    subprocess.run(["xdotool", "key", "Control_L+w"], check=True)
    subprocess.run(["xdotool", "key", "F12"], check=True)
    time.sleep(0.5)
    subprocess.run(["xdotool", "key", "F12"], check=True)

urls = Path(sys.argv[1]).read_text().splitlines()
numbers = [Path(x).name for x in urls]
# for x in urls:
#     save_page(x, "main")

# for x in tqdm.tqdm(numbers):
#     assert x.isdigit()
#     save_page(f"https://www.fs.usda.gov/nrs/atlas/tree/v4/modals/pred-imp-table.php?spp={x}", "pred-imp-table", load_wait=2, save_wait=1.5)

# for x in tqdm.tqdm(numbers):
#     assert x.isdigit()
#     save_page(f"https://www.fs.usda.gov/nrs/atlas/tree/v4/modals/modfacs.php?spp={x}", "modfacs", load_wait=2, save_wait=1.5)

# for x in tqdm.tqdm(numbers):
#     assert x.isdigit()
#     save_page(f"https://www.fs.usda.gov/nrs/atlas/tree/v4/modals/summary-change.php?spp={x}", "summary-change", load_wait=5, save_wait=1.5)

for x in tqdm.tqdm(numbers):
    assert x.isdigit()
    save_page(f"https://www.fs.usda.gov/nrs/atlas/tree/v4/modals/niche.php?spp={x}", "niche", load_wait=5, save_wait=1.5)


