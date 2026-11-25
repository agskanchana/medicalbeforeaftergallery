---
title: Shortcode reference
description: Every shortcode and attribute — the gallery, the single-case embed, the category carousel and the body map.
group: Reference
groupOrder: 7
order: 1
---

There are four shortcodes. `[medbeafgallery]` is in the free plugin; the other three are Pro. All of them work in the Block editor (Shortcode block), the Classic editor and page builders such as Elementor, Divi and WPBakery.

## `[medbeafgallery]` — the gallery

### Free attributes

| Attribute | Default | Values |
| --- | --- | --- |
| `items_per_page` | `6` | Cases loaded at a time. |
| `default_category` | `all` | Slug of the category shown first. |
| `show_filters` | `true` | `false` hides the category bar (and Pro’s filter sidebar or drawer). |
| `card_style` | from Design | `split`, `reveal`, `refined` — Pro adds `reveal-after`, `slider`, `toggle`, `stacked`. |
| `category_style` | from Design | `carousel`, `grid`, `buttons`, `dropdown` — Pro adds `tabs`, `photos`, `cards`, `areas`, `menu`, `search`, `icons`, `bar`. |

### Pro attributes

| Attribute | Default | Values |
| --- | --- | --- |
| `layout` | from Design | `classic`, `refined`, `strips`, `openrow`, `wall`, `masonry`, `spotlight`, `rows`, `editorial`, `angles`, `uncropped`, `collections` |
| `card_frame` | `boxed` | `boxed`, `framed`, `open` |
| `columns` | from Design | `auto`, `1`, `2`, `3`, `4` |
| `preset` | `default` | `default`, `clinical`, `luxury`, `spa`, `midnight` |
| `motion` | `subtle` | `none`, `subtle`, `lively` |
| `structure` | `gallery` | `gallery`, `map`, `match`, `hub`, `index`, `concerns`, `doctors` |
| `compare` | `off` | `off`, `on` |

`gallery_layout` and `grid_columns` are accepted as other names for `layout` and `columns`. An attribute that is left out uses the saved Design setting, so existing galleries keep their look.

```text
[medbeafgallery layout="spotlight" preset="luxury"]
[medbeafgallery structure="hub" layout="classic" compare="on"]
[medbeafgallery default_category="veneers" show_filters="false" card_style="stacked"]
```

## `[mba_case]` — one case (Pro)

| Attribute | Default | Values |
| --- | --- | --- |
| `id` | *(required)* | A published case’s ID |
| `layout` | `auto` | `auto`, `split`, `stacked`, `compact`, `story` |
| `view` | `slider` | `slider`, `before`, `after`, `side` |
| `show_title` | `true` | `true`, `false` |
| `heading` | `3` | `2`–`6` |
| `show_details` | `true` | `true`, `false` |
| `show_cta` | `true` | `true`, `false` |
| `show_stages` | `true` | `true`, `false` |

```text
[mba_case id="123" layout="split" show_stages="false"]
```

Details: [Single-case embed](/docs/single-case-embed/).

## `[mba_category_carousel]` — category carousel (Pro)

| Attribute | Default | Values |
| --- | --- | --- |
| `category` | *(required)* | Category slug |
| `items_per_view` | `3` | Slides visible at once |
| `autoplay` | `false` | `true`, `false` |
| `autoplay_speed` | `3000` | Milliseconds per slide (at least 1000) |
| `show_navigation` | `true` | Arrows |
| `show_dots` | `true` | Dots |
| `loop` | `true` | `true`, `false` |
| `gap` | `20` | Pixels between slides |

```text
[mba_category_carousel category="veneers" items_per_view="4" autoplay="true"]
```

Details: [Category carousel](/docs/category-carousel/).

## `[mba_body_map]` — the map on any page (Pro)

| Attribute | Default | Values |
| --- | --- | --- |
| `url` | *(none)* | Your gallery page, to open it instead of listing the cases under the map |
| `figures` | from Discovery | `face`, `body-front`, `body-back`, `smile`, comma-separated |
| `items_per_page`, `layout`, `card_style`, `columns`, `preset` | `8`, from Design | How the cases under the map look |

```text
[mba_body_map figures="face,smile"]
```

Details: [Find by area & Help me choose](/docs/find-by-area-and-help-me-choose/).

## Builders

The Pro workspace builds the embed shortcodes for you under **Embeds → Carousel** and **Embeds → Single case**, and the **Overview** shows the gallery shortcode with a copy button.
