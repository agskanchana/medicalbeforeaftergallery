---
title: Gallery layouts & how photos compare
description: The free cards, Pro’s twelve layouts, six ways to compare before and after, card frames and card extras.
group: Display & Layout
groupOrder: 2
order: 1
---

## Layouts

The free plugin shows cases in an even grid. Pro adds more layouts: set the default under **Design → Gallery → How cases are shown**, or per gallery with `layout`.

| Layout | `layout` | What it looks like |
| --- | --- | --- |
| Classic grid | `classic` | Even cards in a tidy grid (Free and Pro) |
| Refined grid | `refined` | Portrait photos without boxes, one quiet line under each |
| Expanding strips | `strips` | A row of tall strips; pointing at one opens it into a full comparison |
| Open row | `openrow` | A dense wall of photos; a case opens in place, full width |
| Flip wall | `wall` | A wall of photos with one switch that turns them all from before to after |
| Masonry | `masonry` | Every photo keeps its natural shape, cards packed into columns |
| Spotlight | `spotlight` | The first matching case in one large tile, the rest around it |
| Procedure rows | `rows` | One scrolling row of cases per category |
| Editorial | `editorial` | One case per row, photos and details alternating sides |
| Angles | `angles` | Small photos of a case’s other views under its card |
| Uncropped | `uncropped` | Both complete photos, nothing cut off |
| Collections | `collections` | Hand-picked rows of cases (see [Collections](/docs/page-structures-and-collections/)) |

**Columns**: Auto, 1, 2, 3 or 4 (`columns`). On small screens the gallery uses fewer columns.

## How photos compare

Not every pair of photos suits a slider: photos taken at different distances or angles look better with a hover, a switch or side by side. The choice is under **Design → Gallery → How photos compare** (the free plugin: **Design → Card Style**), or per gallery with `card_style`. In Pro it works with every layout except Flip wall, which has its own switch.

| Choice | `card_style` | Plan |
| --- | --- | --- |
| Side by side | `split` | Free |
| Before, hover for after: the before photo wipes to the result on hover, keyboard focus or a press and hold | `reveal` | Free |
| Refined: the same wipe on portrait photos without boxes (in Pro this is the Refined grid layout) | `refined` | Free |
| After, hover for before: the result first | `reveal-after` | Pro |
| Slider: drag the divider on the card | `slider` | Pro |
| Click to switch: the result first, with a Before / After switch | `toggle` | Pro |
| Stacked: before above after, both whole (good for wide photos such as smiles) | `stacked` | Pro |

Refined grid, Expanding strips and Open row fill their frames with the photo; the case window shows it whole. The other layouts show hover, slider and switch photos whole, over a soft blurred copy. Visitors who ask for reduced motion see no animation.

## Card frame (Pro)

`card_frame`: **Boxed** (`boxed`, the photo across the top of the card), **Framed** (`framed`, the photo inset like a print) or **Open** (`open`, no box).

## Card extras (Pro)

Under **Design → Gallery**: the doctor’s avatar and name, a **New** badge (for cases added in the last 30 days, adjustable), a **Progress** badge for cases with recorded stages, and duration, recovery and results chips.

## Existing galleries

Updating does not change an existing gallery: classic or masonry galleries with side-by-side cards and no preset keep their look until you choose a new layout, card style or template.

Try them on the [demo page](/demo/).
