---
title: Search, sort & deep-linking
description: Add a search box and sort control, and make filtered views shareable via the URL.
group: Comparison & Discovery
groupOrder: 3
order: 2
---

These discovery features are Pro and live under **Settings → Comparison & Discovery**.

## Search (Pro)

Enable **Show a search box on the gallery** to let visitors search across case **titles, descriptions and category names**. Set the **search placeholder** text to suit your audience. Results filter as the visitor types (debounced for performance).

## Sort (Pro)

Enable **Show a sort dropdown** and pick a **default sort**:

- **Newest first**
- **Oldest first**
- **Title (A–Z)**

Sorting works alongside any active filters and search.

## Deep-linking (Pro)

Turn on **Reflect filters, search and sort in the URL** to make any filtered view **bookmarkable and shareable**. As the visitor filters, searches or sorts, the URL updates without a page reload.

URL parameters used:

| Parameter | Purpose |
| --- | --- |
| `?mbcase=ID` | Open a specific case directly |
| `?mbq=term` | Pre-fill the search term |
| `?mbsort=newest\|oldest\|title` | Set the sort order |
| `?<filter>=value1,value2` | Pre-select filter values |

For example, linking to `…/gallery/?mbcase=128` opens that case immediately — handy for sharing a specific result by email or social media.

See [Case filters](/docs/case-filters/) to configure which filters appear.
