# Wardrobe Matrix

An interactive outfit builder and color balance checker built with vanilla HTML, CSS, and JavaScript.

## What it does

Select pieces from your wardrobe — inner top, outer layer, bottom, shoes, and accessories — and the app builds your outfit combination in real time. It also checks whether your color choices are balanced using Korean fashion principles, and generates a ready-to-use Leonardo AI prompt so you can visualize the look.

## Features

- **Mix and match selector** — click preset wardrobe pieces or type your own in the "Other" field for every category
- **Color balance checker** — detects bold, dark, and earth tone colors across all pieces and flags clashing combinations with specific feedback
- **Korean fashion concepts** — each combo is labeled with the relevant concept (Tone on Tone, WI, Go, Pan, Pointing Down, Damin Look, etc.)
- **Leonardo AI prompt generator** — auto-builds a copyable prompt based on your selected outfit, ready to paste into Leonardo AI
- **One-click copy** — copy the prompt instantly with a single button

## How to use

1. Open `index.html` in any browser — no setup or dependencies needed
2. Select one piece per category, or type a custom piece in the Other field and hit **Use this**
3. Your outfit combo, concept label, and balance check appear instantly
4. Copy the Leonardo AI prompt at the bottom to visualize the look

## Color balance logic

The checker categorizes every piece by scanning for color keywords across three lists:

- **Bold** — red, blue, green, yellow, orange, purple, pink, teal, emerald, coral, mustard, and more
- **Dark** — black, charcoal, navy, dark, deep
- **Earth** — olive, brown, beige, sand, cream, tan, khaki, terracotta, rust, grey, white

Based on the count of bold pieces it applies these rules:

- 3+ bold pieces → flagged, too many loud colors
- 2 bold pieces + dark outer layer → Pointing Down applied, balanced
- 2 bold pieces + no dark layer → flagged, needs grounding
- 1 bold piece + dark layer → Pointing Down working
- 1 bold piece + no dark layer → flagged, treat as Point accent on neutral base
- All earth/dark/neutral → good to go

## Korean fashion concepts used

| Concept | Description |
|---|---|
| Tone on Tone | Same color family, different saturation levels |
| Tone in Tone | Different colors at the same saturation |
| Point | One accent piece on an otherwise neutral outfit |
| Go | Effortless — looks put together without trying hard |
| Pan | Occasional unexpected style shift that surprises |
| Pointing Down | Pairing bold colors with dark tones to ground them |
| WI (Wit) | Subtle, playful contrast — formal + casual mix |
| Damin Look | Minimalist Korean boyfriend aesthetic — basics only |

## Built with

- HTML, CSS, JavaScript — no frameworks, no dependencies
- Runs entirely in the browser as a single file

## Background

Built as a personal wardrobe planning tool based on Korean fashion principles. Designed around an earth tone palette with grey New Balance sneakers as the base.
