---
title: Category styles & icons
description: The four free category styles, the eight Pro styles, and category icons — built in, your own image, and the “All cases” icon.
group: Display & Layout
groupOrder: 2
order: 3
---

The category bar is how most visitors start. Choose its style under **Design → Category Navigation** in the free plugin, or **Design → Categories & filters** in the Pro workspace. One gallery can use another style with the `category_style` shortcode attribute.

## Free styles

| Style | `category_style` | What visitors see |
| --- | --- | --- |
| Carousel | `carousel` | Image tiles in a row that scrolls (the default) |
| Grid | `grid` | Every category visible at once as an image tile |
| Buttons | `buttons` | Compact text buttons that wrap onto several lines |
| Drop-down | `dropdown` | One compact menu, good for many categories |

Parent categories and subcategories work in every style. The order follows the **Categories** screen, where you drag categories into place and choose a tile image for each.

## Pro styles

| Style | `category_style` | What visitors see |
| --- | --- | --- |
| Tabs | `tabs` | Calm text tabs with case counts; subcategories open as a second row |
| Photo pills | `photos` | A small result photo, the name and the case count in each button |
| Treatment cards | `cards` | A cover photo, name and count for each treatment |
| Area, then treatment | `areas` | Pick an area by its icon, then one of its treatments |
| Side menu | `menu` | A folding list of treatments beside the gallery |
| Search first | `search` | A box that suggests treatments as visitors type |
| Icon chips | `icons` | A line icon, the name and the case count in each button |
| Filter bar | `bar` | Treatment, doctor and recovery time as drop-downs in one bar |

```text
[medbeafgallery category_style="icons"]
```

Pro’s older “Tabs” setting moves into the Category Navigation setting automatically when you update.

## Category icons (Pro)

**Icon chips** and **Area, then treatment** show an icon for each category. Set it in the **Edit** panel of the **Categories** screen, next to the name and description:

- **Automatic** — Pro picks an icon from the category’s name.
- **A built-in icon** — 92 line icons in eight groups (Face & head, Dental, Skin, Body, Hair, Treatments & devices, Wellness, General), with a search box. The Dental set covers implants, crowns, veneers, bonding, bridges, dentures, braces, clear aligners, retainers, root canal, fillings, extractions, gums, whitening, hygiene, children’s dentistry and more; the Wellness set has IV therapy, hormone therapy, weight-loss injections and spa.
- **Your own image** from the Media Library — coloured like the built-in icons, or shown in its own colours.

The **“All cases”** tile has its own icon setting too.

Try them: [Icon chips demo](https://demo.medicalbeforeaftergallery.com/pro-demos/icon-chips/) · [Area, then treatment demo](https://demo.medicalbeforeaftergallery.com/pro-demos/area-then-treatment/).

## Subcategory pills (Pro)

Subcategories can appear as pills under the category bar, so visitors can narrow a category further. They follow the order set on the Categories screen.

## Related

- [Gallery layouts](/docs/layouts/)
- [Treatment hub, concern first & collections](/docs/page-structures-and-collections/)
- [Shortcode reference](/docs/shortcodes/)
