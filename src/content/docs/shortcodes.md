---
title: Shortcode reference
description: Every shortcode and attribute — the gallery, the category carousel and single-case embeds.
group: Reference
groupOrder: 7
order: 1
---

The plugin provides three shortcodes. The first is in the free plugin; the other two are Pro.

## `[medbeafgallery]` — full gallery (Free)

Embeds the complete, filterable gallery.

| Attribute | Default | Description |
| --- | --- | --- |
| `items_per_page` | `6` | Cases loaded per page. |
| `default_category` | `all` | Category slug to show first. |
| `show_filters` | `true` | Show the filter controls. |
| `show_cta` | from settings | Show the consultation CTA button. |
| `cta_text` | from settings | Override CTA label. |
| `cta_link` | from settings | Override CTA URL. |

```text
[medbeafgallery default_category="botox" items_per_page="9"]
```

## `[mba_category_carousel]` — category carousel (Pro)

A sliding carousel of cases from a category, powered by Splide.

| Attribute | Default | Description |
| --- | --- | --- |
| `category` | *(all)* | Category slug to display. |
| `items_per_view` | `3` | Slides visible at once (1–5). |
| `autoplay` | `false` | Auto-advance slides. |
| `autoplay_speed` | `3000` | Delay between slides, ms (1000–15000). |
| `show_navigation` | `true` | Show prev/next arrows. |
| `show_dots` | `true` | Show pagination dots. |
| `loop` | `true` | Infinite loop. |
| `gap` | `20` | Space between slides, px. |

```text
[mba_category_carousel category="facelift" items_per_view="4" autoplay="true" autoplay_speed="5000"]
```

Clicking a carousel item opens the same case modal as the main gallery. There’s a generator under **Before After Gallery → Settings → Carousel** that builds the shortcode for you.

## `[mba_case]` — single case (Pro)

Embeds one full case inline — viewer, pair navigation and (optionally) the treatment overview and description.

| Attribute | Default | Description |
| --- | --- | --- |
| `id` | *(required)* | The case’s post ID. |
| `show_details` | `true` | Show treatment overview + description. |
| `show_cta` | `true` | Show the CTA button (if configured). |

```text
[mba_case id="123" show_details="true"]
```

A generator under **Settings → Single Case** lets you pick a published case and copy the shortcode.

## Using shortcodes in builders

All three work in the **Block editor** (Shortcode block), **Classic editor**, and page builders such as **Elementor**, **Divi** and **WPBakery** via their shortcode widgets. You can place multiple carousels and single-case embeds on the same page.
