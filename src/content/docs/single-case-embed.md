---
title: Single-case embed [mba_case]
description: Put one case on a treatment page or blog post, with its progress stages — every attribute of [mba_case].
group: Embeds
groupOrder: 5
order: 1
---

`[mba_case]` (Pro) places one case inside a page: a header with the category, title and doctor, the comparison (Slider, Before, After, side by side), the case’s progress stages, the treatment overview and description, and your booking button. It adapts to the column it sits in, from a sidebar to the full width.

```text
[mba_case id="123"]
```

Build it without typing under **Embeds → Single case** in the Pro workspace: pick a published case, choose the options and copy the shortcode.

## Attributes

| Attribute | Default | Values |
| --- | --- | --- |
| `id` | *(required)* | The case’s ID. It must be a published case. |
| `layout` | `auto` | `auto` — side by side when the embed’s column is wide, stacked when it is narrow; `split`; `stacked`; `compact` — the viewer, title and button only (for sidebars and grids); `story` — a scroll story (cases with progress stages). |
| `view` | `slider` | The first comparison view: `slider`, `before`, `after` or `side` (side by side). |
| `show_title` | `true` | `false` hides the case title. |
| `heading` | `3` | Heading level of the case title, `2`–`6`, to fit the page’s outline. |
| `show_details` | `true` | `false` hides the treatment overview and description. |
| `show_cta` | `true` | `false` hides the booking button (the button needs a booking link in the case window settings). |
| `show_stages` | `true` | `false` leaves out the progress stages under the photo. |

The `true`/`false` attributes also accept `1`/`0`, `yes`/`no` and `on`/`off`.

## Examples

On a treatment page, with the case title as an `h2`, opening side by side:

```text
[mba_case id="123" heading="2" view="side"]
```

A sidebar card:

```text
[mba_case id="123" layout="compact"]
```

Without the stages:

```text
[mba_case id="123" show_stages="false"]
```

## Scroll story

```text
[mba_case id="123" layout="story"]
```

A case with three or more progress photos, told by scrolling: one photo changes stage by stage while the months count up beside it, with the note you wrote for each stage. The counter uses the stages’ dates. Visitors who ask for reduced motion see the stages as a list. Cases without stages show the normal embed.

## Progress stages

Cases with a [progress timeline](/docs/case-windows/#progress-timeline) show it under the photo, as in the case windows: visitors click a stage to see that photo. When the photo stands alone in its column, the title and booking button are centred under it. Turning off **Show progress timelines** in the case window settings hides the stages everywhere.

Try it: [scroll story](https://demo.medicalbeforeaftergallery.com/pro-demos/scroll-story/) · [single case](https://demo.medicalbeforeaftergallery.com/pro-demos/single-case-embed/) · [single case with stages](https://demo.medicalbeforeaftergallery.com/pro-demos/single-case-stages/).
