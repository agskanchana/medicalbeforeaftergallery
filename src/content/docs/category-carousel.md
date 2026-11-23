---
title: Category carousel
description: A sliding row of one category’s cases for treatment pages — [mba_category_carousel] and its attributes.
group: Embeds
groupOrder: 5
order: 2
---

`[mba_category_carousel]` (Pro) shows the cases of one category as a sliding row — for example the smile cases on a veneers page. Each slide has a caption with the doctor, and a slide opens the full case window.

```text
[mba_category_carousel category="veneers"]
```

Build it under **Embeds → Carousel** in the Pro workspace: choose the category and options, then copy the shortcode.

## Attributes

| Attribute | Default | Description |
| --- | --- | --- |
| `category` | *(required)* | The category’s slug. |
| `items_per_view` | `3` | Slides visible at once on wide screens. |
| `autoplay` | `false` | `true` moves to the next slide by itself; visitors get a pause button. |
| `autoplay_speed` | `3000` | Time per slide in milliseconds (at least 1000). |
| `show_navigation` | `true` | Arrows (shown only when the row scrolls). |
| `show_dots` | `true` | Dots (shown only when the row scrolls). |
| `loop` | `true` | Start again after the last slide. |
| `gap` | `20` | Space between slides, in pixels. |

```text
[mba_category_carousel category="hair-transplant" items_per_view="4" autoplay="true" autoplay_speed="5000"]
```

On phones the next card peeks in from the side, so visitors can see there is more. A carousel and a gallery can sit on the same page.

Try it: [category carousel demo](https://demo.medicalbeforeaftergallery.com/pro-demos/category-carousel/).
