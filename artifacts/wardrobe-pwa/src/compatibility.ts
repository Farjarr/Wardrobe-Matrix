// ─────────────────────────────────────────────────────────────────────────────
// Outfit Compatibility Engine
// ─────────────────────────────────────────────────────────────────────────────

export interface CheckResult {
  status: 'ok' | 'warn';
  message: string;
}

// ── Color classification ──────────────────────────────────────────────────────

const DARK_COLORS = new Set([
  'black', 'charcoal', 'navy', 'brown', 'forest green', 'burgundy',
]);

const LIGHT_COLORS = new Set([
  'white', 'off-white', 'cream', 'beige', 'tan', 'sand', 'camel',
  'baby blue', 'lilac', 'soft pink', 'mint pastel', 'peach',
  'light blue', 'sky blue', 'khaki',
]);

const STATEMENT_COLORS = new Set([
  'cobalt blue', 'hot pink', 'neon green', 'electric blue', 'purple',
]);

const EARTH_TONES = new Set([
  'olive', 'khaki', 'sand', 'camel', 'rust', 'terracotta', 'mustard',
]);

function colorTone(color: string): 'dark' | 'light' | 'statement' | 'earth' | 'medium' {
  const c = color.toLowerCase();
  if (DARK_COLORS.has(c)) return 'dark';
  if (LIGHT_COLORS.has(c)) return 'light';
  if (STATEMENT_COLORS.has(c)) return 'statement';
  if (EARTH_TONES.has(c)) return 'earth';
  return 'medium';
}

// ── Volume classification ─────────────────────────────────────────────────────

const VOLUMINOUS_FITS = new Set(['oversized_fit', 'boxy_fit', 'relaxed_fit']);

const VOLUMINOUS_BOTTOMS = new Set([
  'Loose Jeans', 'Wide Trousers', 'Pleated Trousers', 'Sweatpants',
  'Baggy Cargo', 'Sweat Shorts',
]);

const VOLUMINOUS_OUTERS = new Set([
  'Pullover Hoodie', 'Sweatshirt', 'Crewneck Sweater', 'Pullover Sweater',
  'Puffer Jacket', 'Overcoat', 'Wool Coat', 'Parka',
]);

// ── Formality classification ──────────────────────────────────────────────────

const FORMAL_FOOTWEAR = new Set([
  'Oxford Shoes', 'Derby Shoes', 'Monk Strap Shoes', 'Wholecut Shoes',
  'Penny Loafers', 'Tassel Loafers', 'Bit Loafers',
]);

const STREETWEAR_OUTERS = new Set([
  'Pullover Hoodie', 'Zip Hoodie', 'Sweatshirt', 'Bomber Jacket',
  'Coach Jacket', 'Windbreaker', 'Puffer Jacket',
]);

const FORMAL_OUTERS = new Set([
  'Casual Blazer', 'Structured Blazer', 'Unstructured Blazer',
  'Trench Coat', 'Wool Coat', 'Overcoat',
]);

const SUMMER_HEAVY_OUTERS = new Set([
  'Parka', 'Puffer Jacket', 'Wool Coat', 'Overcoat', 'Trench Coat',
]);

// ─────────────────────────────────────────────────────────────────────────────

interface OutfitInput {
  outfitType: string;
  innerFit: string;
  innerItem: string;
  color: string;
  outerCat: string;
  outerItem: string;
  bottomCat: string;
  bottomItem: string;
  footwearCat: string;
  footwearItem: string;
}

export function checkCompatibility(outfit: OutfitInput): CheckResult[] {
  const results: CheckResult[] = [];
  const tone = colorTone(outfit.color);
  const hasOuter = outfit.outerCat !== 'none' && outfit.outerItem !== '';
  const vibe = outfit.outfitType;

  // ── 1. Statement color in a minimal outfit ────────────────────────────────
  if (tone === 'statement' && vibe === 'minimal') {
    results.push({
      status: 'warn',
      message: `${outfit.color} is a bold statement color, but the Minimal vibe calls for restraint — try Black, White, or Grey instead.`,
    });
  }

  // ── 2. Pastels in a streetwear outfit ────────────────────────────────────
  if (tone === 'light' && LIGHT_COLORS.has(outfit.color.toLowerCase()) && vibe === 'streetwear') {
    const lightPastels = new Set(['baby blue', 'lilac', 'soft pink', 'mint pastel', 'peach']);
    if (lightPastels.has(outfit.color.toLowerCase())) {
      results.push({
        status: 'warn',
        message: `${outfit.color} is too soft for Streetwear — this vibe hits harder in Black, White, or a statement color.`,
      });
    }
  }

  // ── 3. Statement color + formal outer ────────────────────────────────────
  if (tone === 'statement' && hasOuter && FORMAL_OUTERS.has(outfit.outerItem)) {
    results.push({
      status: 'warn',
      message: `Your ${outfit.color} inner top is bold, but a ${outfit.outerItem} reads formal — the clash may feel unintentional. Try a bomber or overshirt instead.`,
    });
  }

  // ── 4. Light color inner + heavy streetwear outer ────────────────────────
  if (tone === 'light' && hasOuter && STREETWEAR_OUTERS.has(outfit.outerItem) && vibe === 'streetwear') {
    results.push({
      status: 'warn',
      message: `Your ${outfit.color} inner top isn't dark enough to anchor a ${outfit.outerItem} in a streetwear look — try Black, Charcoal, or Navy.`,
    });
  }

  // ── 5. Formal footwear + streetwear vibe ─────────────────────────────────
  if (vibe === 'streetwear' && FORMAL_FOOTWEAR.has(outfit.footwearItem)) {
    results.push({
      status: 'warn',
      message: `${outfit.footwearItem} clash with a Streetwear vibe — swap for sneakers or boots to keep the look cohesive.`,
    });
  }

  // ── 6. Formal footwear + casual bottoms ──────────────────────────────────
  const casualBottoms = new Set(['Sweatpants', 'Slim Joggers', 'Regular Joggers', 'Sweat Shorts', 'Cargo Shorts']);
  if (FORMAL_FOOTWEAR.has(outfit.footwearItem) && casualBottoms.has(outfit.bottomItem)) {
    results.push({
      status: 'warn',
      message: `${outfit.footwearItem} with ${outfit.bottomItem} is a sharp contrast — intentional athleisure or an accidental mismatch? Consider chinos or trousers.`,
    });
  }

  // ── 7. Smart casual + sweatpants/joggers ─────────────────────────────────
  const tooRelaxedBottoms = new Set(['Sweatpants', 'Baggy Cargo', 'Sweat Shorts']);
  if (vibe === 'smart_casual' && tooRelaxedBottoms.has(outfit.bottomItem)) {
    results.push({
      status: 'warn',
      message: `${outfit.bottomItem} undercut the Smart Casual vibe — try Chinos, Straight Jeans, or Tailored Trousers to lift the look.`,
    });
  }

  // ── 8. Smart casual + hoodie outer ───────────────────────────────────────
  const hoodieOuters = new Set(['Pullover Hoodie', 'Zip Hoodie', 'Sweatshirt']);
  if (vibe === 'smart_casual' && hasOuter && hoodieOuters.has(outfit.outerItem)) {
    results.push({
      status: 'warn',
      message: `A ${outfit.outerItem} softens the Smart Casual intent — swap for a Cardigan, Blazer, or Overshirt to keep it elevated.`,
    });
  }

  // ── 9. Volume overload: big top + voluminous outer ────────────────────────
  if (VOLUMINOUS_FITS.has(outfit.innerFit) && hasOuter && VOLUMINOUS_OUTERS.has(outfit.outerItem)) {
    results.push({
      status: 'warn',
      message: `Your ${outfit.innerItem} is already roomy — layering a ${outfit.outerItem} on top adds too much volume. Try a slimmer jacket or coach jacket instead.`,
    });
  }

  // ── 10. Volume overload: big top + baggy bottoms ─────────────────────────
  if (VOLUMINOUS_FITS.has(outfit.innerFit) && VOLUMINOUS_BOTTOMS.has(outfit.bottomItem)) {
    results.push({
      status: 'warn',
      message: `${outfit.innerItem} plus ${outfit.bottomItem} is a lot of volume — balance it out with Slim Jeans, Chinos, or Straight Trousers.`,
    });
  }

  // ── 11. Summer vibe + heavy coat ─────────────────────────────────────────
  if (vibe === 'summer' && hasOuter && SUMMER_HEAVY_OUTERS.has(outfit.outerItem)) {
    results.push({
      status: 'warn',
      message: `A ${outfit.outerItem} fights the Summer vibe — go for a light Shirt Layer, Cardigan, or skip the outer entirely.`,
    });
  }

  // ── 12. Shorts + heavy outer ─────────────────────────────────────────────
  const shortBottoms = new Set(['Denim Shorts', 'Chino Shorts', 'Cargo Shorts', 'Sweat Shorts']);
  if (shortBottoms.has(outfit.bottomItem) && hasOuter && SUMMER_HEAVY_OUTERS.has(outfit.outerItem)) {
    results.push({
      status: 'warn',
      message: `Shorts with a ${outfit.outerItem} sends mixed seasonal signals — either go full warm-weather or full layered.`,
    });
  }

  // ── 13. Sandals/slides + heavy coat or streetwear ────────────────────────
  const slides = new Set(['Slides', 'Sandals', 'Sport Sandals']);
  if (slides.has(outfit.footwearItem) && hasOuter && SUMMER_HEAVY_OUTERS.has(outfit.outerItem)) {
    results.push({
      status: 'warn',
      message: `${outfit.footwearItem} with a ${outfit.outerItem} clashes seasonally — match your footwear to the weather your outfit suggests.`,
    });
  }

  // ── 14. Earth tones + statement color ────────────────────────────────────
  if (tone === 'statement' && (vibe === 'smart_casual' || vibe === 'casual')) {
    results.push({
      status: 'warn',
      message: `${outfit.color} is vivid for a ${outfit.outfitType.replace('_', ' ')} outfit — consider anchoring with a neutral outer layer or bottoms to keep it grounded.`,
    });
  }

  // ── All good ──────────────────────────────────────────────────────────────
  if (results.length === 0) {
    const positives: string[] = [];

    if (tone === 'dark' && hasOuter) {
      positives.push(`Your ${outfit.color} inner grounds the layered look — clean and intentional.`);
    } else if (tone === 'earth' && (vibe === 'casual' || vibe === 'smart_casual')) {
      positives.push(`${outfit.color} is a perfect earth-tone pick for ${outfit.outfitType.replace('_', ' ')} — versatile and cohesive.`);
    } else if (vibe === 'minimal' && (tone === 'dark' || tone === 'light')) {
      positives.push(`Solid neutral in a minimal outfit — understated and sharp.`);
    } else {
      positives.push(`This combination balances well — the pieces complement each other.`);
    }

    results.push({ status: 'ok', message: positives[0] });
  }

  return results;
}
