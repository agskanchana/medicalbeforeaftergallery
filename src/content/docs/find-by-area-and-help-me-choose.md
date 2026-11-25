---
title: Find by area & Help me choose
description: A body and face map and a short guided search, for visitors who don’t know the name of a treatment.
group: Finding Cases
groupOrder: 4
order: 4
---

Both are Pro features in the **Discovery** section of the Pro workspace. A **How it works** guide at the top of that section ticks off each step and says plainly when visitors will not see anything yet.

## Find by area

A **Find by area** button above any gallery opens a map of the face, body and smile. Visitors point at an area to see its treatments, its two newest results and how many cases there are; **See cases** lists them.

For a gallery that starts from the map, with the results changing beside it, use the [Live map](/docs/page-structures-and-collections/#live-map).

1. Turn on the map.
2. Choose the figures to show: **Face**, **Body front**, **Body back** and **Smile**.
3. Link each area to one or more categories. Child categories are included automatically; areas with no category are disabled.

The areas include, on the face: scalp / hair, forehead, eyes & brows, nose, cheeks, lips, chin & jaw, ears, neck and whole face / skin; on the body: chest / breast, abdomen, waist / flanks, arms, hands, hips, thighs, lower legs, upper and lower back, buttocks, back of arms, back of thighs and calves; and teeth / smile.

### The map on any page

`[mba_body_map]` shows the map on any page. Choosing an area shows its newest results, and **See cases** lists them all under the map. With `url` it opens your gallery page with the area chosen instead. On a page that already has a gallery, the map works that gallery.

| Attribute | Description |
| --- | --- |
| `url` | Optional: your gallery page, to open it instead of listing the cases here. |
| `figures` | Which figures to show, comma-separated: `face`, `body-front`, `body-back`, `smile`. Defaults to the figures chosen in Discovery. |
| `items_per_page`, `layout`, `card_style`, `columns`, `preset` | Optional: how the cases under the map look. |

```text
[mba_body_map figures="face,body-front"]
```

## Help me choose

A short guided search with your own questions and answers. Each answer is linked to categories and, if you like, filter values; the gallery shows the cases that match the answers chosen.

- Turn it on, set the button label (default “Help me choose”) and an intro line.
- Write up to three questions with up to eight answers each, or start from the ready-made question, which leaves out categories that have no cases yet.

Both features keep their state in the address (`?mbarea=` and `?mbguide=`), so the result can be shared.

Try them: [Find by area](https://demo.medicalbeforeaftergallery.com/pro-demos/find-by-area/) · [Help me choose](https://demo.medicalbeforeaftergallery.com/pro-demos/help-me-choose/) · [body map on its own page](https://demo.medicalbeforeaftergallery.com/pro-demos/body-map-embed/).
