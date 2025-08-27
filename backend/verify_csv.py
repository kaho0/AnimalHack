import csv
from pathlib import Path

CSV_PATH = Path("luxury_animal_products_vegan_alternatives.csv")

with CSV_PATH.open("r", encoding="utf-8", newline="") as f:
    reader = csv.reader(f)
    rows = list(reader)

print({
    "lines_total": len(rows),
    "data_rows": len(rows) - 1,
    "has_header": rows[0] if rows else None,
    "sample_row_1": rows[1] if len(rows) > 1 else None,
    "sample_row_last": rows[-1] if len(rows) > 1 else None,
}) 