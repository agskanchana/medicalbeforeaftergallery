---
title: Compare two cases
description: Let visitors put two cases side by side, with their photos and recorded details.
group: Finding Cases
groupOrder: 4
order: 5
---

With **Compare two cases** (Pro) on, each card gets a **Compare** checkbox. Visitors tick two cases, and a tray at the bottom of the gallery opens them side by side in a dialog.

## Turn it on

- For every gallery: **Design → Gallery**, comparison setting.
- For one gallery: `compare="on"` (or `off`).

```text
[medbeafgallery compare="on"]
[medbeafgallery structure="hub" layout="classic" compare="on"]
```

It works across the gallery layouts and page structures.

## What the comparison shows

The before and after photos of both cases, and their recorded details next to each other: treatment, duration, recovery, results, doctor and photo dates. A detail a case does not have reads “Not recorded”.

The dialog works with the keyboard (Escape closes it). On phones, A and B buttons switch between the two cases.

Try it: [compare two cases demo](https://demo.medicalbeforeaftergallery.com/pro-demos/compare-two-cases/).
