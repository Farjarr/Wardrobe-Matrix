export const wardrobe = {
  inner_layer: {
    regular_fit: ['Regular Fit Tee', 'Standard Tee'],
    relaxed_fit: ['Relaxed Tee', 'Loose Tee'],
    oversized_fit: ['Oversized Tee', 'Drop Shoulder Tee'],
    boxy_fit: ['Boxy Tee', 'Cropped Boxy Tee'],
  },
  outer_layer: {
    shirt_layer: ['Shirt', 'Flannel Shirt', 'Linen Shirt', 'Short Sleeve Button-Up'],
    overshirt_layer: ['Overshirt (Shacket)', 'Utility Shirt', 'Canvas Overshirt'],
    knit_layer: ['Cardigan', 'Knit Sweater', 'Pullover Sweater'],
    jacket_layer: ['Denim Jacket', 'Bomber Jacket', 'Coach Jacket', 'Leather Jacket', 'Windbreaker'],
    hoodie_sweat_layer: ['Pullover Hoodie', 'Zip Hoodie', 'Sweatshirt', 'Crewneck Sweater'],
    blazer: ['Casual Blazer', 'Structured Blazer', 'Unstructured Blazer'],
    coat_heavy_layer: ['Trench Coat', 'Wool Coat', 'Parka', 'Puffer Jacket', 'Overcoat'],
  },
  bottom_layer: {
    jeans: ['Slim Jeans', 'Regular Jeans', 'Straight Jeans', 'Loose Jeans'],
    chinos: ['Slim Chinos', 'Regular Chinos', 'Relaxed Chinos'],
    trousers: ['Tailored Trousers', 'Pleated Trousers', 'Straight Trousers', 'Wide Trousers'],
    shorts: ['Denim Shorts', 'Chino Shorts', 'Cargo Shorts', 'Sweat Shorts'],
    joggers_sweatpants: ['Slim Joggers', 'Regular Joggers', 'Sweatpants'],
    cargo_pants: ['Slim Cargo', 'Regular Cargo', 'Baggy Cargo'],
  },
  footwear: {
    sneakers: ['Low-Top Sneakers', 'High-Top Sneakers', 'Running Shoes', 'Skate Shoes'],
    loafers: ['Penny Loafers', 'Tassel Loafers', 'Bit Loafers'],
    formal_shoes: ['Oxford Shoes', 'Derby Shoes', 'Monk Strap Shoes', 'Wholecut Shoes'],
    boots: ['Chelsea Boots', 'Combat Boots', 'Desert Boots', 'Work Boots'],
    sandals_slides: ['Slides', 'Sandals', 'Sport Sandals'],
  },
} as const;

export const colors = {
  neutrals: ['Black', 'White', 'Off-White', 'Grey', 'Charcoal', 'Navy', 'Beige', 'Cream', 'Brown', 'Tan'],
  earth_tones: ['Olive', 'Khaki', 'Sand', 'Camel', 'Rust', 'Terracotta', 'Mustard'],
  cool_tones: ['Blue', 'Light Blue', 'Sky Blue', 'Teal', 'Mint', 'Emerald', 'Forest Green'],
  warm_colors: ['Red', 'Burgundy', 'Orange', 'Coral', 'Yellow'],
  pastels: ['Baby Blue', 'Lilac', 'Soft Pink', 'Mint Pastel', 'Peach'],
  statement: ['Cobalt Blue', 'Hot Pink', 'Neon Green', 'Electric Blue', 'Purple'],
} as const;

export const outfitTypes = {
  minimal: ['neutrals'],
  smart_casual: ['neutrals', 'earth_tones'],
  streetwear: ['neutrals', 'statement'],
  casual: ['neutrals', 'cool_tones', 'earth_tones'],
  summer: ['pastels', 'neutrals'],
} as const;

export type OutfitTypeKey = keyof typeof outfitTypes;
export type ColorGroupKey = keyof typeof colors;

export type InnerLayerKey = keyof typeof wardrobe.inner_layer;
export type OuterLayerKey = keyof typeof wardrobe.outer_layer;
export type BottomLayerKey = keyof typeof wardrobe.bottom_layer;
export type FootwearKey = keyof typeof wardrobe.footwear;

export function getPrioritizedColors(outfitType: OutfitTypeKey): string[] {
  const priority = outfitTypes[outfitType] as readonly ColorGroupKey[];
  const all = Object.keys(colors) as ColorGroupKey[];
  const ordered = [...priority, ...all.filter((c) => !priority.includes(c))];
  const result: string[] = [];
  ordered.forEach((group) => {
    colors[group].forEach((color) => {
      if (!result.includes(color)) result.push(color);
    });
  });
  return result;
}

export function formatKey(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
