---
title: Embedding the gallery
description: Put the gallery on any page with [medbeafgallery], and choose its options per gallery.
group: Getting Started
groupOrder: 1
order: 4
---

Place the gallery anywhere with the **`[medbeafgallery]`** shortcode — in a Shortcode block, the Classic editor, or your page builder’s shortcode widget (Elementor, Divi, WPBakery and others).

```text
[medbeafgallery]
```

With Pro, the workspace **Overview** shows this shortcode with a copy button and lists the pages that already show the gallery.

## Options (Free)

| Attribute | Default | Description |
| --- | --- | --- |
| `items_per_page` | `6` | Cases loaded at a time. |
| `default_category` | `all` | Slug of the category to show first. |
| `show_filters` | `true` | `false` hides the category bar (and, with Pro, the filter sidebar or drawer). |
| `card_style` | from Design | `split` (side by side), `reveal` (hover reveal) or `refined` (portrait photos without boxes) for this gallery. |
| `category_style` | from Design | `carousel`, `grid`, `buttons` or `dropdown` (Pro adds eight more). |

A treatment page that shows only one category, without the category bar:

```text
[medbeafgallery default_category="veneers" show_filters="false" items_per_page="9"]
```

## Options (Pro)

Pro adds `layout`, `card_style` (more values), `card_frame`, `columns`, `preset`, `motion`, `structure` and `compare` — see the [Shortcode reference](/docs/shortcodes/).

```text
[medbeafgallery layout="spotlight" preset="luxury"]
```

## More embeds (Pro)

- [`[mba_case]`](/docs/single-case-embed/) — one case on any page
- [`[mba_category_carousel]`](/docs/category-carousel/) — a sliding row of one category’s cases
- [`[mba_body_map]`](/docs/find-by-area-and-help-me-choose/) — the face and body map on any page

## Styling

Set your brand colour (a colour or a gradient) and the base look under **Design** in the gallery settings. The gallery’s cards are not restyled by your theme; with Pro you can restyle them on purpose through CSS custom properties — see [Design templates & live preview](/docs/design-templates-and-preview/).
