---
title: Treatment hub, concern first & collections
description: Page structures that start visitors from a treatment, a concern or a doctor, and hand-picked collections of cases.
group: Finding Cases
groupOrder: 4
order: 3
---

By default the gallery starts with the category bar and the cases. Pro adds three other ways in, called **page structures**, and a **Collections** layout. Choose the structure for all galleries under **Design → Gallery**, or for one gallery with the `structure` attribute.

| Structure | `structure` | Visitors start from |
| --- | --- | --- |
| Gallery | `gallery` | The category bar and the cases (the default) |
| Treatment hub | `hub` | A card for each treatment |
| Concern first | `concerns` | What they would like to improve |
| Doctor portfolios | `doctors` | The doctors |

## Treatment hub

Each treatment appears as a card with a before/after pair, its description and a **View results** link; a **Browse all** link shows every case. Choosing a treatment shows its cases, with its subcategories as chips. The browser’s Back button returns to the hub.

```text
[medbeafgallery structure="hub"]
```

## Concern first

Visitors pick a concern — what they would like to improve — and see the treatments you linked to it, then the cases. Define concerns under **Design → Gallery**: each has a name, a short hint and the categories it leads to. With no concerns defined, the normal gallery shows.

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

Try them: [treatment hub](https://demo.medicalbeforeaftergallery.com/pro-demos/treatment-hub/) · [doctor portfolios](https://demo.medicalbeforeaftergallery.com/pro-demos/doctor-portfolios/) · [collections](https://demo.medicalbeforeaftergallery.com/pro-demos/collections/).

## Related

- [Compare two cases](/docs/compare-two-cases/) works in these structures too: `[medbeafgallery structure="hub" layout="classic" compare="on"]`
- [Find by area & Help me choose](/docs/find-by-area-and-help-me-choose/)
