// ─────────────────────────────────────────────
// Wardrobe Component Taxonomy — TypeScript Schema
// ─────────────────────────────────────────────

// ── Types ─────────────────────────────────────

export type Category = 'upperBody' | 'lowerBody' | 'accessories';

export type UpperBodySubCategory = 'innerLayer' | 'midLayer' | 'outerLayer';
export type LowerBodySubCategory =
  | 'denim'
  | 'chinos'
  | 'trousers'
  | 'cargo'
  | 'utilityStreet'
  | 'activewear'
  | 'shorts';
export type AccessorySubCategory =
  | 'headwear'
  | 'eyewear'
  | 'neckwear'
  | 'wrist'
  | 'belts'
  | 'bags'
  | 'jewelry';

export type SubCategory =
  | UpperBodySubCategory
  | LowerBodySubCategory
  | AccessorySubCategory;

export interface WardrobeItem {
  id: string;
  label: string;
  category: Category;
  subCategory: SubCategory;
  fit?: string;
  tags: string[];
}

// ── Layering order for upper-body pieces ──────
// A lower number = closer to the body (inner). Items can only be layered in
// ascending order: innerLayer (0) → midLayer (1) → outerLayer (2).
const UPPER_BODY_LAYER_ORDER: Record<UpperBodySubCategory, number> = {
  innerLayer: 0,
  midLayer: 1,
  outerLayer: 2,
};

// ── Data ──────────────────────────────────────

export const wardrobeItems: WardrobeItem[] = [

  // ── Upper Body / Inner Layer ────────────────

  // Regular Fit
  { id: 'standard-tee',         label: 'Standard Tee',         category: 'upperBody', subCategory: 'innerLayer', fit: 'regular',   tags: ['regular', 'basics', 'versatile', 'everyday'] },
  { id: 'regular-fit-tee',      label: 'Regular Fit Tee',      category: 'upperBody', subCategory: 'innerLayer', fit: 'regular',   tags: ['regular', 'basics', 'versatile'] },

  // Slim Fit
  { id: 'slim-fit-tee',         label: 'Slim Fit Tee',         category: 'upperBody', subCategory: 'innerLayer', fit: 'slim',      tags: ['slim', 'fitted', 'clean'] },
  { id: 'body-fit-tee',         label: 'Body Fit Tee',         category: 'upperBody', subCategory: 'innerLayer', fit: 'slim',      tags: ['slim', 'fitted', 'athletic'] },

  // Relaxed Fit
  { id: 'relaxed-fit-tee',      label: 'Relaxed Fit Tee',      category: 'upperBody', subCategory: 'innerLayer', fit: 'relaxed',   tags: ['relaxed', 'comfortable', 'casual'] },
  { id: 'soft-loose-tee',       label: 'Soft Loose Tee',       category: 'upperBody', subCategory: 'innerLayer', fit: 'relaxed',   tags: ['relaxed', 'soft', 'casual', 'comfortable'] },

  // Oversized Fit
  { id: 'oversized-tee',        label: 'Oversized Tee',        category: 'upperBody', subCategory: 'innerLayer', fit: 'oversized', tags: ['oversized', 'streetwear', 'boxy'] },
  { id: 'drop-shoulder-tee',    label: 'Drop Shoulder Tee',    category: 'upperBody', subCategory: 'innerLayer', fit: 'oversized', tags: ['oversized', 'streetwear', 'drop-shoulder'] },
  { id: 'street-oversized-tee', label: 'Street Oversized Tee', category: 'upperBody', subCategory: 'innerLayer', fit: 'oversized', tags: ['oversized', 'streetwear', 'statement'] },

  // Boxy Fit
  { id: 'boxy-tee',             label: 'Boxy Tee',             category: 'upperBody', subCategory: 'innerLayer', fit: 'boxy',      tags: ['boxy', 'streetwear', 'heavyweight'] },
  { id: 'cropped-boxy-tee',     label: 'Cropped Boxy Tee',     category: 'upperBody', subCategory: 'innerLayer', fit: 'boxy',      tags: ['boxy', 'cropped', 'streetwear'] },

  // Longline Fit
  { id: 'longline-tee',         label: 'Longline Tee',         category: 'upperBody', subCategory: 'innerLayer', fit: 'longline',  tags: ['longline', 'extended', 'layering'] },
  { id: 'extended-tee',         label: 'Extended Tee',         category: 'upperBody', subCategory: 'innerLayer', fit: 'longline',  tags: ['longline', 'layering', 'minimal'] },

  // ── Upper Body / Mid Layer ──────────────────

  // Shirting
  { id: 'classic-shirt',        label: 'Classic Shirt',        category: 'upperBody', subCategory: 'midLayer', tags: ['shirt', 'smart-casual', 'button-up', 'versatile'] },
  { id: 'flannel-shirt',        label: 'Flannel Shirt',        category: 'upperBody', subCategory: 'midLayer', tags: ['shirt', 'flannel', 'casual', 'layering', 'autumn'] },
  { id: 'linen-shirt',          label: 'Linen Shirt',          category: 'upperBody', subCategory: 'midLayer', tags: ['shirt', 'linen', 'summer', 'breathable', 'relaxed'] },
  { id: 'short-sleeve-button',  label: 'Short Sleeve Button-Up', category: 'upperBody', subCategory: 'midLayer', tags: ['shirt', 'button-up', 'summer', 'casual'] },

  // Overshirts
  { id: 'shacket',              label: 'Shacket',              category: 'upperBody', subCategory: 'midLayer', tags: ['overshirt', 'shacket', 'layering', 'casual', 'transitional'] },
  { id: 'utility-shirt',        label: 'Utility Shirt',        category: 'upperBody', subCategory: 'midLayer', tags: ['overshirt', 'utility', 'layering', 'workwear'] },
  { id: 'heavy-flannel',        label: 'Heavy Flannel',        category: 'upperBody', subCategory: 'midLayer', tags: ['overshirt', 'flannel', 'heavyweight', 'layering', 'autumn'] },
  { id: 'canvas-overshirt',     label: 'Canvas Overshirt',     category: 'upperBody', subCategory: 'midLayer', tags: ['overshirt', 'canvas', 'workwear', 'structured', 'layering'] },

  // Knitwear
  { id: 'cardigan',             label: 'Cardigan',             category: 'upperBody', subCategory: 'midLayer', tags: ['knit', 'cardigan', 'layering', 'smart-casual', 'autumn'] },
  { id: 'knit-sweater',         label: 'Knit Sweater',         category: 'upperBody', subCategory: 'midLayer', tags: ['knit', 'sweater', 'warm', 'casual'] },
  { id: 'zip-knit',             label: 'Zip Knit',             category: 'upperBody', subCategory: 'midLayer', tags: ['knit', 'zip', 'sporty', 'layering'] },
  { id: 'pullover-sweater',     label: 'Pullover Sweater',     category: 'upperBody', subCategory: 'midLayer', tags: ['knit', 'pullover', 'warm', 'minimal'] },

  // Sweats
  { id: 'pullover-hoodie',      label: 'Pullover Hoodie',      category: 'upperBody', subCategory: 'midLayer', tags: ['sweats', 'hoodie', 'casual', 'streetwear'] },
  { id: 'zip-hoodie',           label: 'Zip Hoodie',           category: 'upperBody', subCategory: 'midLayer', tags: ['sweats', 'hoodie', 'zip', 'casual', 'layering'] },
  { id: 'sweatshirt',           label: 'Sweatshirt',           category: 'upperBody', subCategory: 'midLayer', tags: ['sweats', 'crewneck', 'casual', 'streetwear'] },
  { id: 'crewneck-sweater',     label: 'Crewneck Sweater',     category: 'upperBody', subCategory: 'midLayer', tags: ['sweats', 'crewneck', 'minimal', 'clean'] },

  // ── Upper Body / Outer Layer ────────────────

  // Light / Mid Jackets
  { id: 'denim-jacket',         label: 'Denim Jacket',         category: 'upperBody', subCategory: 'outerLayer', tags: ['jacket', 'denim', 'casual', 'iconic', 'transitional'] },
  { id: 'bomber-jacket',        label: 'Bomber Jacket',        category: 'upperBody', subCategory: 'outerLayer', tags: ['jacket', 'bomber', 'streetwear', 'casual'] },
  { id: 'coach-jacket',         label: 'Coach Jacket',         category: 'upperBody', subCategory: 'outerLayer', tags: ['jacket', 'coach', 'sporty', 'streetwear', 'light'] },
  { id: 'leather-jacket',       label: 'Leather Jacket',       category: 'upperBody', subCategory: 'outerLayer', tags: ['jacket', 'leather', 'statement', 'edgy', 'iconic'] },
  { id: 'windbreaker',          label: 'Windbreaker',          category: 'upperBody', subCategory: 'outerLayer', tags: ['jacket', 'windbreaker', 'sporty', 'lightweight', 'functional'] },

  // Formal / Tailored
  { id: 'casual-blazer',        label: 'Casual Blazer',        category: 'upperBody', subCategory: 'outerLayer', tags: ['blazer', 'smart-casual', 'tailored', 'elevated'] },
  { id: 'structured-blazer',    label: 'Structured Blazer',    category: 'upperBody', subCategory: 'outerLayer', tags: ['blazer', 'formal', 'structured', 'tailored'] },
  { id: 'unstructured-blazer',  label: 'Unstructured Blazer',  category: 'upperBody', subCategory: 'outerLayer', tags: ['blazer', 'relaxed', 'smart-casual', 'soft'] },

  // Heavy Outerwear
  { id: 'trench-coat',          label: 'Trench Coat',          category: 'upperBody', subCategory: 'outerLayer', tags: ['coat', 'trench', 'classic', 'formal', 'rain'] },
  { id: 'wool-coat',            label: 'Wool Coat',            category: 'upperBody', subCategory: 'outerLayer', tags: ['coat', 'wool', 'formal', 'winter', 'tailored'] },
  { id: 'parka',                label: 'Parka',                category: 'upperBody', subCategory: 'outerLayer', tags: ['coat', 'parka', 'winter', 'heavy', 'functional'] },
  { id: 'puffer-jacket',        label: 'Puffer Jacket',        category: 'upperBody', subCategory: 'outerLayer', tags: ['jacket', 'puffer', 'winter', 'warm', 'casual'] },
  { id: 'overcoat',             label: 'Overcoat',             category: 'upperBody', subCategory: 'outerLayer', tags: ['coat', 'overcoat', 'formal', 'winter', 'classic'] },

  // ── Lower Body ──────────────────────────────

  // Denim
  { id: 'slim-jeans',           label: 'Slim Jeans',           category: 'lowerBody', subCategory: 'denim', fit: 'slim',    tags: ['jeans', 'denim', 'slim', 'versatile'] },
  { id: 'regular-jeans',        label: 'Regular Jeans',        category: 'lowerBody', subCategory: 'denim', fit: 'regular', tags: ['jeans', 'denim', 'regular', 'classic'] },
  { id: 'straight-jeans',       label: 'Straight Jeans',       category: 'lowerBody', subCategory: 'denim', fit: 'straight',tags: ['jeans', 'denim', 'straight', 'clean'] },
  { id: 'loose-jeans',          label: 'Loose Jeans',          category: 'lowerBody', subCategory: 'denim', fit: 'loose',   tags: ['jeans', 'denim', 'relaxed', 'streetwear'] },
  { id: 'wide-leg-jeans',       label: 'Wide Leg Jeans',       category: 'lowerBody', subCategory: 'denim', fit: 'wide-leg',tags: ['jeans', 'denim', 'wide-leg', 'statement', 'streetwear'] },

  // Chinos
  { id: 'slim-chinos',          label: 'Slim Chinos',          category: 'lowerBody', subCategory: 'chinos', fit: 'slim',    tags: ['chinos', 'smart-casual', 'slim', 'versatile'] },
  { id: 'regular-chinos',       label: 'Regular Chinos',       category: 'lowerBody', subCategory: 'chinos', fit: 'regular', tags: ['chinos', 'smart-casual', 'regular', 'everyday'] },
  { id: 'relaxed-chinos',       label: 'Relaxed Chinos',       category: 'lowerBody', subCategory: 'chinos', fit: 'relaxed', tags: ['chinos', 'relaxed', 'casual', 'comfortable'] },

  // Trousers
  { id: 'tailored-trousers',    label: 'Tailored Trousers',    category: 'lowerBody', subCategory: 'trousers', fit: 'tailored',  tags: ['trousers', 'formal', 'tailored', 'smart'] },
  { id: 'pleated-trousers',     label: 'Pleated Trousers',     category: 'lowerBody', subCategory: 'trousers', fit: 'pleated',   tags: ['trousers', 'formal', 'pleated', 'classic'] },
  { id: 'straight-trousers',    label: 'Straight Trousers',    category: 'lowerBody', subCategory: 'trousers', fit: 'straight',  tags: ['trousers', 'smart-casual', 'straight', 'clean'] },
  { id: 'wide-leg-trousers',    label: 'Wide Leg Trousers',    category: 'lowerBody', subCategory: 'trousers', fit: 'wide-leg',  tags: ['trousers', 'wide-leg', 'statement', 'relaxed'] },

  // Cargo
  { id: 'slim-cargo',           label: 'Slim Cargo Pants',     category: 'lowerBody', subCategory: 'cargo', fit: 'slim',    tags: ['cargo', 'utility', 'slim', 'functional'] },
  { id: 'regular-cargo',        label: 'Regular Cargo Pants',  category: 'lowerBody', subCategory: 'cargo', fit: 'regular', tags: ['cargo', 'utility', 'regular', 'workwear'] },
  { id: 'baggy-cargo',          label: 'Baggy Cargo Pants',    category: 'lowerBody', subCategory: 'cargo', fit: 'baggy',   tags: ['cargo', 'streetwear', 'baggy', 'statement'] },

  // Utility / Street
  { id: 'tech-pants',           label: 'Tech Pants',           category: 'lowerBody', subCategory: 'utilityStreet', tags: ['utility', 'tech', 'functional', 'modern'] },
  { id: 'parachute-pants',      label: 'Parachute Pants',      category: 'lowerBody', subCategory: 'utilityStreet', tags: ['utility', 'streetwear', 'relaxed', 'statement'] },
  { id: 'nylon-pants',          label: 'Nylon Pants',          category: 'lowerBody', subCategory: 'utilityStreet', tags: ['utility', 'nylon', 'sporty', 'lightweight'] },
  { id: 'track-pants',          label: 'Track Pants',          category: 'lowerBody', subCategory: 'utilityStreet', tags: ['utility', 'sporty', 'casual', 'athletic'] },

  // Activewear
  { id: 'slim-joggers',         label: 'Slim Joggers',         category: 'lowerBody', subCategory: 'activewear', fit: 'slim',      tags: ['joggers', 'athletic', 'slim', 'casual'] },
  { id: 'regular-joggers',      label: 'Regular Joggers',      category: 'lowerBody', subCategory: 'activewear', fit: 'regular',   tags: ['joggers', 'athletic', 'regular', 'comfortable'] },
  { id: 'oversized-sweatpants', label: 'Oversized Sweatpants', category: 'lowerBody', subCategory: 'activewear', fit: 'oversized', tags: ['joggers', 'streetwear', 'oversized', 'relaxed'] },
  { id: 'cuffed-joggers',       label: 'Cuffed Joggers',       category: 'lowerBody', subCategory: 'activewear', fit: 'cuffed',    tags: ['joggers', 'athletic', 'cuffed', 'clean'] },

  // Shorts
  { id: 'denim-shorts',         label: 'Denim Shorts',         category: 'lowerBody', subCategory: 'shorts', tags: ['shorts', 'denim', 'casual', 'summer'] },
  { id: 'chino-shorts',         label: 'Chino Shorts',         category: 'lowerBody', subCategory: 'shorts', tags: ['shorts', 'chinos', 'smart-casual', 'summer'] },
  { id: 'cargo-shorts',         label: 'Cargo Shorts',         category: 'lowerBody', subCategory: 'shorts', tags: ['shorts', 'cargo', 'utility', 'casual'] },
  { id: 'sweat-shorts',         label: 'Sweat Shorts',         category: 'lowerBody', subCategory: 'shorts', tags: ['shorts', 'sweats', 'athletic', 'casual'] },

  // ── Accessories ─────────────────────────────

  // Headwear
  { id: 'baseball-cap',         label: 'Baseball Cap',         category: 'accessories', subCategory: 'headwear', tags: ['cap', 'casual', 'streetwear', 'everyday'] },
  { id: 'beanie',               label: 'Beanie',               category: 'accessories', subCategory: 'headwear', tags: ['beanie', 'winter', 'casual', 'streetwear'] },
  { id: 'bucket-hat',           label: 'Bucket Hat',           category: 'accessories', subCategory: 'headwear', tags: ['hat', 'casual', 'streetwear', 'summer'] },
  { id: 'snapback',             label: 'Snapback',             category: 'accessories', subCategory: 'headwear', tags: ['cap', 'streetwear', 'statement'] },
  { id: 'fedora',               label: 'Fedora',               category: 'accessories', subCategory: 'headwear', tags: ['hat', 'formal', 'statement', 'classic'] },

  // Eyewear
  { id: 'sunglasses',           label: 'Sunglasses',           category: 'accessories', subCategory: 'eyewear', tags: ['glasses', 'summer', 'statement', 'classic'] },
  { id: 'optical-glasses',      label: 'Optical Glasses',      category: 'accessories', subCategory: 'eyewear', tags: ['glasses', 'everyday', 'smart'] },
  { id: 'rimless-glasses',      label: 'Rimless Glasses',      category: 'accessories', subCategory: 'eyewear', tags: ['glasses', 'minimal', 'clean'] },
  { id: 'sports-shades',        label: 'Sports Shades',        category: 'accessories', subCategory: 'eyewear', tags: ['glasses', 'sporty', 'athletic', 'functional'] },

  // Neckwear
  { id: 'necklace',             label: 'Necklace',             category: 'accessories', subCategory: 'neckwear', tags: ['necklace', 'jewelry', 'casual'] },
  { id: 'chain',                label: 'Chain',                category: 'accessories', subCategory: 'neckwear', tags: ['chain', 'jewelry', 'streetwear', 'statement'] },
  { id: 'pendant',              label: 'Pendant',              category: 'accessories', subCategory: 'neckwear', tags: ['pendant', 'jewelry', 'minimal', 'personal'] },
  { id: 'scarf',                label: 'Scarf',                category: 'accessories', subCategory: 'neckwear', tags: ['scarf', 'winter', 'layering', 'classic'] },

  // Wrist
  { id: 'watch',                label: 'Watch',                category: 'accessories', subCategory: 'wrist', tags: ['watch', 'classic', 'smart-casual', 'functional'] },
  { id: 'bracelet',             label: 'Bracelet',             category: 'accessories', subCategory: 'wrist', tags: ['bracelet', 'casual', 'layering', 'minimal'] },
  { id: 'wristband',            label: 'Wristband',            category: 'accessories', subCategory: 'wrist', tags: ['wristband', 'sporty', 'casual', 'athletic'] },

  // Belts
  { id: 'leather-belt',         label: 'Leather Belt',         category: 'accessories', subCategory: 'belts', tags: ['belt', 'leather', 'classic', 'formal', 'versatile'] },
  { id: 'fabric-belt',          label: 'Fabric Belt',          category: 'accessories', subCategory: 'belts', tags: ['belt', 'fabric', 'casual', 'relaxed'] },
  { id: 'canvas-belt',          label: 'Canvas Belt',          category: 'accessories', subCategory: 'belts', tags: ['belt', 'canvas', 'casual', 'utility'] },
  { id: 'statement-belt',       label: 'Statement Belt',       category: 'accessories', subCategory: 'belts', tags: ['belt', 'statement', 'fashion', 'bold'] },

  // Bags
  { id: 'backpack',             label: 'Backpack',             category: 'accessories', subCategory: 'bags', tags: ['bag', 'backpack', 'functional', 'everyday'] },
  { id: 'sling-bag',            label: 'Sling Bag',            category: 'accessories', subCategory: 'bags', tags: ['bag', 'sling', 'streetwear', 'compact'] },
  { id: 'tote-bag',             label: 'Tote Bag',             category: 'accessories', subCategory: 'bags', tags: ['bag', 'tote', 'casual', 'minimal'] },
  { id: 'messenger-bag',        label: 'Messenger Bag',        category: 'accessories', subCategory: 'bags', tags: ['bag', 'messenger', 'functional', 'urban'] },
  { id: 'waist-bag',            label: 'Waist Bag',            category: 'accessories', subCategory: 'bags', tags: ['bag', 'waist', 'streetwear', 'compact', 'utility'] },

  // Jewelry
  { id: 'rings',                label: 'Rings',                category: 'accessories', subCategory: 'jewelry', tags: ['ring', 'jewelry', 'minimal', 'stacking'] },
  { id: 'earrings',             label: 'Earrings',             category: 'accessories', subCategory: 'jewelry', tags: ['earring', 'jewelry', 'statement', 'casual'] },
  { id: 'minimal-studs',        label: 'Minimal Studs',        category: 'accessories', subCategory: 'jewelry', tags: ['earring', 'jewelry', 'minimal', 'clean'] },
  { id: 'statement-rings',      label: 'Statement Rings',      category: 'accessories', subCategory: 'jewelry', tags: ['ring', 'jewelry', 'statement', 'bold'] },
];

// ── Helper Functions ───────────────────────────

/**
 * Filter items by subCategory, tag, category, or any combination.
 * All provided filters are ANDed together.
 *
 * @example
 * filterItems({ subCategory: 'innerLayer' })
 * filterItems({ tag: 'streetwear' })
 * filterItems({ category: 'upperBody', tag: 'layering' })
 * filterItems({ subCategory: 'midLayer', tag: 'flannel' })
 */
export function filterItems(filters: {
  category?: Category;
  subCategory?: SubCategory;
  tag?: string;
  fit?: string;
}): WardrobeItem[] {
  return wardrobeItems.filter(item => {
    if (filters.category    && item.category    !== filters.category)    return false;
    if (filters.subCategory && item.subCategory !== filters.subCategory) return false;
    if (filters.fit         && item.fit         !== filters.fit)         return false;
    if (filters.tag         && !item.tags.includes(filters.tag))         return false;
    return true;
  });
}

/**
 * Search items by a free-text query matched against id, label, and tags.
 * Case-insensitive.
 *
 * @example
 * searchItems('oversized')
 * searchItems('denim')
 */
export function searchItems(query: string): WardrobeItem[] {
  const q = query.toLowerCase();
  return wardrobeItems.filter(item =>
    item.id.includes(q) ||
    item.label.toLowerCase().includes(q) ||
    item.tags.some(t => t.includes(q))
  );
}

// ── Layering Logic ─────────────────────────────

export interface LayeringResult {
  valid: boolean;
  order: WardrobeItem[];
  conflicts: string[];
}

/**
 * Validates a set of upper-body items against the layering rule:
 *   innerLayer (0) → midLayer (1) → outerLayer (2)
 *
 * Rules:
 * - At most one item per layer tier is allowed.
 * - Only innerLayer items may be worn without a mid or outer layer.
 * - A midLayer requires an innerLayer beneath it.
 * - An outerLayer may sit over a midLayer or directly over an innerLayer.
 *
 * Returns a sorted order (inner → outer) and a list of conflict messages.
 *
 * @example
 * checkLayering([
 *   wardrobeItems.find(i => i.id === 'boxy-tee')!,
 *   wardrobeItems.find(i => i.id === 'cardigan')!,
 *   wardrobeItems.find(i => i.id === 'trench-coat')!,
 * ])
 */
export function checkLayering(items: WardrobeItem[]): LayeringResult {
  const upperBodyItems = items.filter(i => i.category === 'upperBody');
  const conflicts: string[] = [];

  // Group by sub-category
  const byTier: Record<UpperBodySubCategory, WardrobeItem[]> = {
    innerLayer: [],
    midLayer:   [],
    outerLayer: [],
  };

  for (const item of upperBodyItems) {
    const tier = item.subCategory as UpperBodySubCategory;
    if (!(tier in byTier)) continue; // not an upper-body layer
    byTier[tier].push(item);
  }

  // Rule: at most one item per tier
  for (const tier of Object.keys(byTier) as UpperBodySubCategory[]) {
    if (byTier[tier].length > 1) {
      conflicts.push(
        `Multiple items in the same tier (${tier}): ${byTier[tier].map(i => i.label).join(', ')}. Only one piece per layer tier is allowed.`
      );
    }
  }

  // Rule: midLayer requires an innerLayer
  if (byTier.midLayer.length > 0 && byTier.innerLayer.length === 0) {
    conflicts.push(
      `Mid layer (${byTier.midLayer.map(i => i.label).join(', ')}) requires an inner layer underneath it.`
    );
  }

  // Produce sorted order: inner → mid → outer (omit empty tiers)
  const order: WardrobeItem[] = [
    ...byTier.innerLayer,
    ...byTier.midLayer,
    ...byTier.outerLayer,
  ];

  return {
    valid: conflicts.length === 0,
    order,
    conflicts,
  };
}

// ── Mock Data (10 sample entries) ──────────────

/**
 * Ten representative sample entries drawn from the full wardrobeItems array.
 * Useful for prototyping, testing, and API mocks.
 */
export const mockEntries: WardrobeItem[] = [
  wardrobeItems.find(i => i.id === 'boxy-tee')!,
  wardrobeItems.find(i => i.id === 'drop-shoulder-tee')!,
  wardrobeItems.find(i => i.id === 'linen-shirt')!,
  wardrobeItems.find(i => i.id === 'canvas-overshirt')!,
  wardrobeItems.find(i => i.id === 'cardigan')!,
  wardrobeItems.find(i => i.id === 'bomber-jacket')!,
  wardrobeItems.find(i => i.id === 'straight-jeans')!,
  wardrobeItems.find(i => i.id === 'relaxed-chinos')!,
  wardrobeItems.find(i => i.id === 'slim-cargo')!,
  wardrobeItems.find(i => i.id === 'bucket-hat')!,
];

// ── Usage Examples (commented out) ────────────
//
// All streetwear pieces:
//   filterItems({ tag: 'streetwear' })
//
// All oversized inner layers:
//   filterItems({ subCategory: 'innerLayer', fit: 'oversized' })
//
// All bags:
//   filterItems({ subCategory: 'bags' })
//
// Validate a three-piece layered outfit:
//   checkLayering([
//     wardrobeItems.find(i => i.id === 'regular-fit-tee')!,
//     wardrobeItems.find(i => i.id === 'flannel-shirt')!,
//     wardrobeItems.find(i => i.id === 'wool-coat')!,
//   ])
//
// Free-text search:
//   searchItems('cargo')
