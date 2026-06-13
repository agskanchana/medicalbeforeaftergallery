---
title: Case filters
description: Use the six built-in filters or build your own, then set values per case.
group: Filtering
groupOrder: 4
order: 1
---

Filters let visitors narrow the gallery to the cases most relevant to them. They’re a Pro feature, managed under **Settings → Case Filters**.

## Built-in filters

Pro ships with six filters, all enabled by default and fully editable:

| Filter | Options |
| --- | --- |
| **Gender** | Female, Male |
| **Age Range** | 18-30, 31-45, 46-60, 60+ |
| **Recovery Time** | Minimal (1–3 days), Short (4–7 days), Moderate (1–2 weeks), Extended (2+ weeks) |
| **Treatment Duration** | Single Session, Multiple Sessions |
| **Results Visibility** | Immediate, Gradual |
| **Procedure Type** | Surgical, Minimally Invasive, Non-Surgical |

## Managing filters

In the Case Filters tab you can:

- **Enable or disable** any filter (disabled filters are hidden on the front end but kept in your config).
- **Edit the label and options** of any filter.
- **Reorder** filters by dragging.
- **Add custom filters** with your own label and options — there’s no limit. A URL key is generated automatically for deep-linking.
- **Reset to defaults** to restore the original six filters.

Remember to **Save** after editing.

## Setting values per case

Open a case in the editor and set its value(s) for each enabled filter. A case can match more than one value of a filter. Only enabled filters appear in the editor.

## On the front end

Enabled filters render as checkboxes in the filter **sidebar** (Classic layout) or **drawer** (Masonry layout). Visitors can combine multiple filters; active selections show as removable tags with a **clear-all** control. Filters work together with [search and sort](/docs/search-sort-deep-linking/).
