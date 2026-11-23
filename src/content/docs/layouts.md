---
title: Gallery layouts & card styles
description: The free grid and Pro’s eight layouts, six card styles, card frames and card extras.
group: Display & Layout
groupOrder: 2
order: 1
---

## Layouts

The free plugin shows cases in an even grid. Pro adds more layouts: set the default under **Design → Gallery**, or per gallery with `layout`.

| Layout | `layout` | What it looks like |
| --- | --- | --- |
| Classic grid | `classic` | Even cards in a tidy grid (Free and Pro) |
| Masonry | `masonry` | Every photo keeps its natural shape, cards packed into columns |
| Spotlight | `spotlight` | The first matching case in one large tile, the rest around it |
| Procedure rows | `rows` | One scrolling row of cases per category |
| Editorial | `editorial` | One case per row, photos and details alternating sides |
| Angles | `angles` | Small photos of a case’s other views under its card |
| Uncropped | `uncropped` | Both complete photos, nothing cut off |
| Collections | `collections` | Hand-picked rows of cases (see [Collections](/docs/page-structures-and-collections/)) |

**Columns**: Auto, 1, 2, 3 or 4 (`columns`). On small screens the gallery uses fewer columns.

## Card styles

| Card style | `card_style` | Plan |
| --- | --- | --- |
| Side by side | `split` | Free |
| Hover reveal — the before photo wipes to the after photo on hover, keyboard focus or a press-and-hold, and plays once on the first card that scrolls into view | `reveal` | Free |
| Slider — drag the divider on the card | `slider` | Pro |
| Photo — the photo fills the card | `photo` | Pro |
| Before/after switch — the after photo with a Before / After switch | `toggle` | Pro |
| Stacked — before above after, both whole (good for wide photos such as smiles) | `stacked` | Pro |

Slider, photo, hover-reveal and uncropped cards never crop a photo: each is shown whole over a soft blurred copy of itself. Visitors who ask for reduced motion never see the hover-reveal animation.

## Card frame (Pro)

`card_frame`: **Boxed** (`boxed`, the photo across the top of the card), **Framed** (`framed`, the photo inset like a print) or **Open** (`open`, no box).

## Card extras (Pro)

Under **Design → Gallery**: the doctor’s avatar and name, a **New** badge (for cases added in the last 30 days, adjustable), a **Progress** badge for cases with recorded stages, and duration, recovery and results chips.

## Existing galleries

Updating does not change an existing gallery: classic or masonry galleries with side-by-side cards and no preset keep their look until you choose a new layout, card style or template.

Try them on the [demo page](/demo/).
