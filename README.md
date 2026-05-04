# Wardrobe Matrix

An interactive outfit builder and color balance checker built with vanilla HTML, CSS, and JavaScript. Plan your looks using Korean fashion principles, then generate Leonardo AI prompts to visualize them.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://farjarr.github.io/Wardrobe-Matrix/)

## ✨ Features

- **Mix and Match Selector** — Choose from preset wardrobe pieces or add custom items for every category (inner top, outer layer, bottom, shoes, accessories)
- **Smart Color Balance Checker** — Detects bold, dark, and earth tone colors; flags clashing combinations with specific feedback
- **Korean Fashion Concepts** — Auto-labels outfits with relevant styling principles (Tone on Tone, WI, Go, Pan, Pointing Down, Damin Look, etc.)
- **Leonardo AI Prompt Generator** — Auto-generates a copyable prompt based on your selected outfit
- **One-Click Copy** — Instantly copy the prompt to paste into Leonardo AI

## 🚀 Quick Start

1. Open `farjarr.github.io/Wardrobe-Matrix/` in any browser — no setup or dependencies needed
2. Select one piece per category, or type a custom piece in the Other field and hit **Use this**
3. Your outfit combo, concept label, and balance check appear instantly
4. Copy the Leonardo AI prompt to visualize the look

## 🎨 Color Balance Logic

The app categorizes every piece by scanning for color keywords:

| Category | Colors |
|----------|--------|
| **Bold** | red, blue, green, yellow, orange, purple, pink, teal, emerald, coral, mustard, etc. |
| **Dark** | black, charcoal, navy, deep |
| **Earth** | olive, brown, beige, sand, cream, tan, khaki, terracotta, rust, grey, white |

### Balance Rules

- **3+ bold pieces** → ⚠️ Flagged (too many loud colors)
- **2 bold + dark outer** → ✅ Pointing Down applied (balanced)
- **2 bold + no dark** → ⚠️ Flagged (needs grounding)
- **1 bold + dark outer** → ✅ Pointing Down working
- **1 bold + no dark** → ⚠️ Point accent on neutral base
- **All earth/dark/neutral** → ✅ Good to go

## 👗 Korean Fashion Concepts

| Concept | Description |
|---------|-------------|
| **Tone on Tone** | Same color family, different saturation levels |
| **Tone in Tone** | Different colors at same saturation |
| **Point** | One accent piece on otherwise neutral outfit |
| **Go** | Effortless — looks put together without trying |
| **Pan** | Occasional unexpected style shift |
| **Pointing Down** | Bold colors paired with dark tones for grounding |
| **WI (Wit)** | Subtle playful contrast — formal + casual mix |
| **Damin Look** | Minimalist Korean boyfriend aesthetic — basics only |

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **No frameworks or dependencies** — runs entirely in the browser as a single file
- **Deployment**: GitHub Pages

## 📦 Development

This monorepo uses `pnpm` for package management:

```bash
# Install dependencies
pnpm install

# Type checking
pnpm run typecheck

# Build all packages
pnpm run build

# Format code
pnpm exec prettier --write .
```

### CI/CD

The repository includes GitHub Actions workflows for:
- **Type checking** across Node 18 & 20
- **Code formatting** validation with Prettier

## 💡 Background

Built as a personal wardrobe planning tool based on Korean fashion principles. Designed around an earth tone palette with grey New Balance sneakers as the foundation piece.

Perfect for:
- Planning outfits before building them IRL
- Generating AI references with Leonardo AI
- Learning Korean fashion styling concepts
- Quick color harmony checks

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

## 🔗 Links

- **Live Demo**: https://farjarr.github.io/Wardrobe-Matrix/
- **Repository**: https://github.com/Farjarr/Wardrobe-Matrix
