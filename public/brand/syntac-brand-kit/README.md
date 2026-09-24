# SYNTAC — Brand Kit (Prompt direction)

All logos are flat vector, transparent background, delivered as SVG + PNG.

## Folders
| Folder | Contents |
|---|---|
| `logos/combination/` | Icon + SYNTAC + SOFTWARE. `syntac-combination` (rounded), `-circle` (rounded-full), `-square` (no rounding), `-accent` (yellow `>`) |
| `logos/icon/` | App tile in 3 backgrounds × 3 shapes: `syntac-icon-{green,dark,light}-{rounded,circle,square}` |
| `logos/icon/` (transparent) | `syntac-icon-transparent` = the `>_` mark alone, no tile or shape, transparent background (green `>`, yellow cursor). `-simple` = just `>` and `_` (no sparks / ground shadow). One-colour versions live in `extras/white/icon` and `extras/black/icon` |
| `logos/wordmark/` | `syntac-wordmark` (SYNTAC only) and `syntac-wordmark-accent` (yellow `>` in place of the A) |
| `extras/white/`, `extras/black/` | One-colour versions of every logo above (white also has the yellow-`>` accent versions) |
| `favicon/{dark,light}/{rounded,circle,square}/` | Full favicon set for each: `.ico`, `.svg`, 16/32/48 px PNGs, Apple touch, Android 192/512, webmanifest, `<head>` snippet |
| `presentation/` | Brand presentation, applications and logo-system boards |

## Colour
| Role | Name | HEX |
|---|---|---|
| Primary | Syntac Green | `#0B9944` |
| Secondary | Deep Forest | `#063D22` |
| Accent | Signal Yellow | `#FFC400` |
| Light tint | Mint Mist | `#E3F5E9` |
| Dark neutral | Ink | `#0B0F19` |
| Light neutral | Paper | `#F2F5F3` |

Syntac Green is ~3.7 : 1 on white and ~5.1 : 1 on Ink, so the full-colour logos work in light and dark mode.
Use Deep Forest for body text on light backgrounds. Signal Yellow is an accent only (cursor, sparks, the `>` accent variant) — it is low-contrast on white, so use the accent wordmark on dark or green backgrounds.

## Typeface
**Geist** (Regular, SemiBold, Bold) — used for the SOFTWARE tagline and all brand typography. Free and open source (SIL OFL). The SYNTAC wordmark itself is custom-drawn artwork — do not retype it.

## Usage
- Favicons: use `dark` or `light` sets, not the green tile. Pick the shape that suits the platform: rounded (default), circle (avatars), square (app stores that apply their own mask).
- Minimum size: combination 120 px wide · wordmark 90 px wide · icon 24 px (use favicon files below that).
- Clear space: at least the height of the `>` on every side.
- Don't stretch, rotate, recolour, add shadows/gradients, or place the green logo on a mid-green background — use `extras/white` there.

## Favicon
Paste `favicon-snippet.html` from your chosen folder into `<head>` and upload that folder's files to the site root.
