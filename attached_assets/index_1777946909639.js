// =======================
// WARDROBE SYSTEM
// =======================

const wardrobe = {
  inner_layer: {
    regular_fit: ["regular fit tee", "standard tee"],
    relaxed_fit: ["relaxed tee", "loose tee"],
    oversized_fit: ["oversized tee", "drop shoulder tee"],
    boxy_fit: ["boxy tee", "cropped boxy tee"]
  },
  outer_layer: {
    shirt_layer: ["shirt", "flannel shirt", "linen shirt", "short sleeve button-up"],
    overshirt_layer: ["overshirt (shacket)", "utility shirt", "canvas overshirt"],
    knit_layer: ["cardigan", "knit sweater", "pullover sweater"],
    jacket_layer: ["denim jacket", "bomber jacket", "coach jacket", "leather jacket", "windbreaker"],
    hoodie_sweat_layer: ["pullover hoodie", "zip hoodie", "sweatshirt", "crewneck sweater"],
    blazer: ["casual blazer", "structured blazer", "unstructured blazer"],
    coat_heavy_layer: ["trench coat", "wool coat", "parka", "puffer jacket", "overcoat"]
  },
  bottom_layer: {
    jeans: ["slim jeans", "regular jeans", "straight jeans", "loose jeans"],
    chinos: ["slim chinos", "regular chinos", "relaxed chinos"],
    trousers: ["tailored trousers", "pleated trousers", "straight trousers", "wide trousers"],
    shorts: ["denim shorts", "chino shorts", "cargo shorts", "sweat shorts"],
    joggers_sweatpants: ["slim joggers", "regular joggers", "sweatpants"],
    cargo_pants: ["slim cargo", "regular cargo", "baggy cargo"]
  },
  footwear: {
    sneakers: [],
    loafers: ["penny loafers", "tassel loafers", "bit loafers"],
    formal_shoes: ["oxford shoes", "derby shoes", "monk strap shoes", "wholecut shoes"],
    boots: [],
    sandals_slides: []
  },
  accessories: {
    headwear: ["cap", "beanie", "bucket hat"],
    eyewear: ["sunglasses", "optical glasses"],
    neck: ["necklace", "chain", "pendant"],
    wrist: ["watch", "bracelet"],
    jewelry: ["rings", "earrings"]
  }
};

// =======================
// COLOR SYSTEM
// =======================

const colors = {
  neutrals: ["black", "white", "off-white", "grey", "charcoal", "navy", "beige", "cream", "brown", "tan"],
  earth_tones: ["olive", "khaki", "sand", "camel", "rust", "terracotta", "mustard"],
  cool_tones: ["blue", "light blue", "sky blue", "teal", "mint", "emerald", "forest green"],
  warm_colors: ["red", "burgundy", "orange", "coral", "yellow"],
  pastels: ["baby blue", "lilac", "soft pink", "mint pastel", "peach"],
  statement: ["cobalt blue", "hot pink", "neon green", "electric blue", "purple"]
};

// =======================
// OUTFIT TYPES
// =======================

const outfitTypes = {
  minimal: ["neutrals"],
  smart_casual: ["neutrals", "earth_tones"],
  streetwear: ["neutrals", "statement"],
  casual: ["neutrals", "cool_tones", "earth_tones"],
  summer: ["pastels", "neutrals"]
};

// =======================
// FUNCTIONS
// =======================

// Step 1: get categories
function getCategories() {
  return Object.keys(wardrobe);
}

// Step 2: get items inside category
function getItems(category) {
  return wardrobe[category] || "Invalid category";
}

// Step 3: get prioritized color groups
function getColorGroups(outfitType) {
  const priority = outfitTypes[outfitType] || [];
  const all = Object.keys(colors);

  // put priority first, then rest
  const ordered = [...priority, ...all.filter(c => !priority.includes(c))];
  return ordered;
}

// Step 4: get colors from group
function getColors(group) {
  return colors[group] || "Invalid color group";
}

// =======================
// SIMULATION (TEST FLOW)
// =======================

function simulate() {
  const outfit = "streetwear";
  const category = "outer_layer";
  const sub = "jacket_layer";
  const item = "bomber jacket";

  console.log("OUTFIT:", outfit);
  console.log("CATEGORY:", category);
  console.log("SUB:", sub);
  console.log("ITEM:", item);

  const colorGroups = getColorGroups(outfit);
  console.log("\nSuggested Color Groups:");
  console.log(colorGroups);

  const selectedGroup = colorGroups[0]; // pick top priority
  console.log("\nSelected Group:", selectedGroup);

  const finalColors = getColors(selectedGroup);
  console.log("\nAvailable Colors:");
  console.log(finalColors);
}

// run test
simulate();