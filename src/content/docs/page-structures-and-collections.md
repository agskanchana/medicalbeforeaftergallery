---
title: Live map, Someone like you & other ways in
description: Start visitors from a live map, people like them, a treatment, a concern or a doctor, and hand-picked collections of cases.
group: Finding Cases
groupOrder: 4
order: 3
---

By default the gallery starts with the category bar and the cases. Pro adds six other ways in and a **Collections** layout. Choose one for all galleries under **Design → Gallery → How visitors find cases**, or for one gallery with the `structure` attribute. Each works with every layout.

| Structure | `structure` | Visitors start from |
| --- | --- | --- |
| Straight to the cases | `gallery` | The category bar and the cases (the default) |
| Live map | `map` | A face, body and smile beside the results |
| Someone like you | `match` | Their gender, age and concern |
| Treatment hub | `hub` | A card for each treatment |
| Treatment index | `index` | A large, quiet list of treatments |
| Concern first | `concerns` | What they would like to improve |
| Doctor portfolios | `doctors` | The doctors |

## Live map

The face, body and smile stay beside the results. Pointing at an area shows its cases at once; **All areas** shows every case again. The map replaces the category bar. On tablets and phones the results are under the map: a tap goes to them, and **Change area** goes back.

Areas link to your categories by their names. To change the links, open **Discovery → Find by area**; once you link an area there, your links are used instead.

```text
[medbeafgallery structure="map" layout="refined"]
```

## Someone like you

Visitors choose their gender and age and what they would like to improve. The people closest to them come first, the closest one large. It uses the gender and age on your cases, and your concerns (or your treatments, when you have none). Nothing visitors choose is stored, sent or written into the address.

```text
[medbeafgallery structure="match" layout="refined"]
```

## Treatment index

Your treatments in large type. Pointing at one shows its newest result; choosing it opens its cases, as in the Treatment hub.

```text
[medbeafgallery structure="index"]
```

## Treatment hub

Each treatment appears as a card with a before/after pair, its description and a **View results** link; a **Browse all** link shows every case. Choosing a treatment shows its cases, with its subcategories as chips. The browser’s Back button returns to the hub.

```text
[medbeafgallery structure="hub"]
```

## Concern first

Visitors pick a concern — what they would like to improve — and see the treatments you linked to it, then the cases. Define concerns under **Design → Gallery** (the editor shows for Concern first and Someone like you): each has a name, a short hint and the categories it leads to. With no concerns defined, the normal gallery shows.

```text
[medbeafgallery structure="concerns"]
```

## Doctor portfolios

A compact row of doctors, and one profile card with the chosen doctor’s treatments and cases. Doctors follow the order of the Doctors screen; doctors without published cases are left out. See [Doctors](/docs/doctors/).

```text
[medbeafgallery structure="doctors"]
```

The hub and doctor portfolios replace the gallery’s own category bar.

## Collections

Collections are hand-picked rows of cases — for example “Results over time”.

1. Add collections under **Medical Before After Gallery → Collections**, each with an intro and an order.
2. In the case editor, tick the collections a case belongs to. A case can be in several.
3. Use the Collections layout: `[medbeafgallery layout="collections"]`.

Each collection is a row with a **See all** link. Cases in no collection appear under **More results**.

Try them: [live map](https://demo.medicalbeforeaftergallery.com/pro-demos/live-map/) · [someone like you](https://demo.medicalbeforeaftergallery.com/pro-demos/someone-like-you/) · [treatment index](https://demo.medicalbeforeaftergallery.com/pro-demos/treatment-index/) · [treatment hub](https://demo.medicalbeforeaftergallery.com/pro-demos/treatment-hub/) · [doctor portfolios](https://demo.medicalbeforeaftergallery.com/pro-demos/doctor-portfolios/) · [collections](https://demo.medicalbeforeaftergallery.com/pro-demos/collections/).

## Related

- [Compare two cases](/docs/compare-two-cases/) works in these structures too: `[medbeafgallery structure="hub" layout="classic" compare="on"]`
- [Find by area & Help me choose](/docs/find-by-area-and-help-me-choose/)
