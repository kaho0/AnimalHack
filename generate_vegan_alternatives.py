import csv
import random
from pathlib import Path

# Seed for reproducibility
random.seed(42)

OUTPUT_FILE = Path("luxury_animal_products_vegan_alternatives.csv")
NUM_ROWS = 350

HEADER = [
    "Product Name",
    "Category",
    "Animal Materials Used",
    "Animal Cruelty Flag",
    "Cruelty Note",
    "Estimated Price",
    "Vegan Alternative",
    "Material",
    "Price",
    "Why Choose Vegan",
]

brands = [
    "Gucci", "Louis Vuitton", "Hermès", "Prada", "Chanel", "Dior", "Fendi", "Saint Laurent",
    "Burberry", "Balenciaga", "Bottega Veneta", "Celine", "Givenchy", "Versace", "Loro Piana",
    "Moncler", "Canada Goose", "Miu Miu", "Valentino", "Tom Ford", "Brunello Cucinelli",
]

animal_categories = [
    ("Outerwear", ["Mink fur", "Fox fur", "Rabbit fur", "Shearling (lamb)", "Goose down", "Duck down", "Wool"], ["Parka", "Puffer Jacket", "Overcoat", "Trench Coat", "Fur Coat", "Bomber", "Peacoat"]),
    ("Handbags", ["Calfskin leather", "Lambskin leather", "Crocodile leather", "Alligator leather", "Ostrich leather", "Python skin", "Lizard skin"], ["Tote Bag", "Shoulder Bag", "Mini Bag", "Top Handle", "Clutch", "Crossbody" ]),
    ("Footwear", ["Calfskin leather", "Lambskin leather", "Suede (leather)", "Shearling (lamb)"], ["Boots", "Loafers", "Sneakers", "Heels", "Sandals"]),
    ("Accessories", ["Silk", "Cashmere", "Wool", "Mohair", "Leather"], ["Scarf", "Gloves", "Wallet", "Belt", "Card Holder"]),
    ("Small Leather Goods", ["Calfskin leather", "Lambskin leather", "Ostrich leather", "Python skin"], ["Wallet", "Card Case", "Key Pouch", "Phone Case"]),
]

vegan_brands = [
    "Stella McCartney", "Matt & Nat", "JW Pei", "Nanushka", "Veja", "Will's Vegan Store",
    "Beyond Skin", "Noize", "Save the Duck", "Von Holzhausen", "Pangaia", "Angela Roi",
    "Gunas", "Sans Beast", "Corkor", "Bellroy", "Thesus", "Rothy's",
]

vegan_materials = [
    ("Faux Fur", ["soft, insulating, and animal-free warmth", "luxe texture without harm", "plush look with no trapping or killing"]),
    ("Recycled Vegan Leather", ["lower-impact production using recycled plastics", "durable finish made from post-consumer materials", "less waste and fewer virgin resources"]),
    ("Bio-Based Leather (Apple)", ["made from apple waste", "uses agricultural byproducts to reduce waste", "bio-content with premium feel"]),
    ("Bio-Based Leather (Pineapple)", ["derived from pineapple leaf fibers", "supports farm byproduct economies", "breathable and lightweight"]),
    ("Bio-Based Leather (Cactus)", ["made from nopal cactus", "water-efficient cultivation", "soft touch and robust performance"]),
    ("Plant-Based Silk", ["silky drape without boiling silkworms", "elegant handfeel with no insect harm", "low-cruelty alternative to traditional silk"]),
    ("Microfiber", ["lightweight and resilient", "scuff-resistant with easy care", "long-wearing everyday performance"]),
    ("Cork Leather", ["renewable cork bark harvesting", "naturally water-resistant", "unique texture with minimal waste"]),
    ("Hemp Canvas", ["low-water crop with high durability", "naturally antimicrobial", "breathable and sturdy"]),
    ("Mycelium (Mushroom) Leather", ["grown from mushroom mycelium", "innovative, rapidly renewable", "soft yet strong handfeel"]),
]

animal_cruelty_notes = {
    "Mink fur": "Minks are confined in small, wire cages without enrichment, often driven to self-mutilation and stress-induced behaviors. They are commonly killed by gassing or electrocution, experiencing fear and suffering solely for fashion.",
    "Fox fur": "Foxes are bred on fur farms, kept in cramped cages with wire flooring that injures their paws. Killing methods include gassing and electrocution, causing prolonged distress and pain.",
    "Rabbit fur": "Rabbits are kept in overcrowded hutches and handled roughly; many suffer broken bones and severe stress. They are slaughtered for trims and linings despite plentiful alternatives.",
    "Shearling (lamb)": "Shearling requires killing lambs for their skin and wool. Transport and slaughter can involve fear, rough handling, and painful procedures.",
    "Goose down": "Down is often obtained from birds who may be live-plucked or subjected to force-feeding in related industries. Handling causes pain and distress, and slaughter ends in a violent death.",
    "Duck down": "Ducks face similar suffering as geese, with live-plucking reported and stressful confinement. Their bodies are commodified for insulation despite humane options.",
    "Wool": "Intensive wool production can involve mulesing, rough shearing, and stressful transport. Injuries are common, with animals treated as raw materials.",
    "Calfskin leather": "Calves are separated from mothers early, transported long distances, and slaughtered for hides. The tanning process also carries environmental toxins.",
    "Lambskin leather": "Lambs, still young, are killed for their soft hides. Transport, handling, and slaughter create fear and pain for sensitive animals.",
    "Crocodile leather": "Crocodiles are raised in concrete pens with minimal enrichment. Methods include electrocution and cutting while conscious, causing severe suffering.",
    "Alligator leather": "Alligators on farms endure overcrowding and stress; killing can involve crude tools and inadequate stunning, leading to prolonged pain.",
    "Ostrich leather": "Ostriches are deprived of natural space and slaughtered for exotic skins; handling and killing are stressful and frightening.",
    "Python skin": "Snakes may be inflated with water or air and skinned, sometimes while still moving. Capture and transport are highly stressful for wild-caught individuals.",
    "Lizard skin": "Lizards are often tied and left for hours before slaughter; inhumane methods can leave them conscious during skinning.",
    "Silk": "Conventional silk production boils silkworms alive in their cocoons to preserve filament quality, killing thousands for a single item.",
    "Cashmere": "Goats are combed harshly in cold seasons, with injuries and stress common; expanding demand drives land degradation and animal suffering.",
    "Mohair": "Angora goats are handled roughly during shearing; investigations show ear cutting and injuries, with animals left bleeding and stressed.",
    "Leather": "Leather relies on slaughter and often long, stressful transport. Tanning contributes to pollution that harms workers and ecosystems.",
    "Suede (leather)": "Suede is produced from animal hides, meaning animals are slaughtered; the split leather process does not reduce the inherent cruelty.",
}

product_adjectives = [
    "Heritage", "Signature", "Icon", "Classic", "Modern", "Elegance", "Premier", "Refined",
    "Studio", "Atelier", "Sculpted", "Metropolitan", "Tailored", "Luxe", "Archive",
]

why_vegan_reasons = [
    "cuts direct funding to industries built on animal suffering",
    "offers comparable quality, comfort, and style without cruelty",
    "reduces environmental impact from animal agriculture and tanning",
    "supports innovative materials and circular design principles",
    "is often more affordable while maintaining premium aesthetics",
    "aligns purchases with compassion and conscious living",
    "avoids micro-violence hidden behind luxury marketing narratives",
    "helps push the market toward humane, future-forward textiles",
]

sustainability_benefits = [
    "lower water consumption",
    "fewer greenhouse gas emissions",
    "less toxic chemical use",
    "recycled or bio-based content",
    "reduced land degradation",
    "better worker safety in production",
]

currency_symbol = "$"


def price_str(low: int, high: int) -> str:
    price = random.randint(low, high)
    return f"{currency_symbol}{price:,}"


def build_product_name(brand: str, category: str, shape: str) -> str:
    descriptor = random.choice(product_adjectives)
    return f"{brand} {descriptor} {shape} {category[:-1] if category.endswith('s') else category}"


def pick_animal_material(category: str):
    for cat, materials, shapes in animal_categories:
        if cat == category:
            material = random.choice(materials)
            shape = random.choice(shapes)
            return material, shape
    # Fallback
    return "Leather", "Item"


def cruelty_note(material: str) -> str:
    base = animal_cruelty_notes.get(material)
    if not base:
        base = "Animals are subjected to confinement, rough handling, and painful slaughter for fashion, despite humane alternatives."
    env = random.choice(sustainability_benefits)
    return (
        f"{base} Choosing animal-free options avoids this harm and helps drive {env}."
    )


def vegan_alt(category: str):
    brand = random.choice(vegan_brands)
    material, benefits = random.choice(vegan_materials)
    # Map category to a plausible vegan product type
    alt_type_map = {
        "Outerwear": ["Vegan Parka", "Faux Fur Coat", "Insulated Jacket", "Tailored Overcoat"],
        "Handbags": ["Vegan Leather Tote", "Crossbody", "Top Handle Bag", "Shoulder Bag"],
        "Footwear": ["Vegan Boots", "Sneakers", "Loafers", "Heels"],
        "Accessories": ["Vegan Scarf", "Belt", "Wallet", "Gloves"],
        "Small Leather Goods": ["Card Case", "Wallet", "Key Pouch", "Mini Zip"],
    }
    alt_shape = random.choice(alt_type_map.get(category, ["Vegan Alternative"]))
    name = f"{brand} {alt_shape}"
    why = (
        f"Selecting {material.lower()} provides {random.choice(benefits)}, "
        f"and {random.choice(why_vegan_reasons)}. "
        f"It pairs modern performance with a refined look, proving that luxury can be compassionate."
    )
    return name, material, why


def estimate_prices(category: str, material: str):
    # Rough realistic luxury pricing bands
    if category == "Outerwear":
        animal_low, animal_high = 900, 12000
        vegan_low, vegan_high = 150, 1200
    elif category == "Handbags":
        if "Crocodile" in material or "Alligator" in material or "Ostrich" in material or "Python" in material or "Lizard" in material:
            animal_low, animal_high = 5000, 150000
        else:
            animal_low, animal_high = 1200, 9000
        vegan_low, vegan_high = 80, 600
    elif category == "Footwear":
        animal_low, animal_high = 600, 2500
        vegan_low, vegan_high = 80, 350
    elif category == "Accessories":
        if material == "Silk":
            animal_low, animal_high = 180, 1200
        else:
            animal_low, animal_high = 200, 1500
        vegan_low, vegan_high = 40, 250
    else:  # Small Leather Goods
        animal_low, animal_high = 300, 1800
        vegan_low, vegan_high = 40, 250

    return price_str(animal_low, animal_high), price_str(vegan_low, vegan_high)


def generate_rows(n: int):
    rows = []
    used_names = set()

    # Expand brand combinations for variety
    categories = [c[0] for c in animal_categories]

    while len(rows) < n:
        category = random.choice(categories)
        brand = random.choice(brands)
        material, shape = pick_animal_material(category)

        name = build_product_name(brand, category, shape)
        # Ensure some uniqueness
        if name in used_names:
            name = f"{name} {random.randint(2, 99)}"
        used_names.add(name)

        cruelty = cruelty_note(material)
        animal_price, vegan_price = estimate_prices(category, material)
        alt_name, alt_material, why_choose = vegan_alt(category)

        # More detailed cruelty with context to keep richness
        context_addendum = random.choice([
            "Transport to slaughterhouses can involve long hours without food or water, compounding fear.",
            "Investigations repeatedly document injuries, untreated wounds, and chronic stress.",
            "Wild-caught individuals suffer during capture and holding, enduring extreme panic.",
            "The industry treats living beings as interchangeable inputs, disregarding sentience.",
            "Environmental runoff from processing contaminates waterways and harms communities.",
        ])
        cruelty_full = f"{cruelty} {context_addendum}"

        rows.append([
            name,
            category,
            material,
            "YES",
            cruelty_full,
            animal_price,
            alt_name,
            alt_material,
            vegan_price,
            why_choose,
        ])

    return rows


def write_csv(path: Path, rows):
    with path.open("w", newline='', encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(HEADER)
        writer.writerows(rows)


if __name__ == "__main__":
    data_rows = generate_rows(NUM_ROWS)
    write_csv(OUTPUT_FILE, data_rows)
    print(f"Wrote {len(data_rows)} rows to {OUTPUT_FILE}") 