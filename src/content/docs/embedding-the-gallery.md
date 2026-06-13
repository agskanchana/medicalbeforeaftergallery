---
title: Embedding the gallery
description: Use the [medbeafgallery] shortcode to place the full gallery on any page or post.
group: Getting Started
groupOrder: 1
order: 3
---

Place the full gallery anywhere with the **`[medbeafgallery]`** shortcode. Add it to a page or post (in a Shortcode block, or your page builder’s shortcode widget) and publish.

```text
[medbeafgallery]
```

## Shortcode attributes

| Attribute | Default | Description |
| --- | --- | --- |
| `items_per_page` | `6` | How many cases to load per page. |
| `default_category` | `all` | Category slug to show first. |
| `show_filters` | `true` | Show the category/filter controls. |
| `show_cta` | from settings | Show the consultation call-to-action button. |
| `cta_text` | from settings | Override the CTA button label. |
| `cta_link` | from settings | Override the CTA button URL. |

Example — start on a specific category and show 9 per page:

```text
[medbeafgallery default_category="veneers" items_per_page="9"]
```

## Works with any editor

The shortcode works in the **Block editor** (Shortcode block), **Classic editor**, and page builders such as **Elementor**, **Divi** and **WPBakery** via their shortcode widget.

## Other shortcodes (Pro)

Pro adds two more shortcodes for embedding pieces of your gallery:

- **`[mba_category_carousel]`** — a sliding carousel of a category.
- **`[mba_case id="123"]`** — a single case embedded inline.

See the [Shortcode reference](/docs/shortcodes/) for every attribute.

## Styling

Set your brand color and base look under **Before After Gallery → Settings**. The gallery is theme-resilient, so it renders consistently inside virtually any theme. With Pro you get extra appearance controls — see [Layouts](/docs/layouts/) and [Appearance](/docs/appearance/).
