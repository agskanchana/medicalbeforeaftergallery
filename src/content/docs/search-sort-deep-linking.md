---
title: Search, sort & shareable links
description: A search box, a sort menu, and links that open a case or a filtered view directly.
group: Finding Cases
groupOrder: 4
order: 2
---

These are Pro features. Search and sort are under **Design → Categories & filters**; shareable links under **Design → Case window**.

## Search

**Show a search box on the gallery** lets visitors search case titles, descriptions and category names. Set the placeholder text to suit your visitors. Results update as they type.

The **Search first** category style turns the search box into the way in: it suggests treatments as visitors type — see [Category styles](/docs/category-styles-and-icons/).

## Sort

**Show a sort dropdown on the gallery** and choose the default order: **Newest first**, **Oldest first** or **Title (A–Z)**. Sorting works together with filters and search.

## Shareable links

Opening a case updates the address bar, so every case has its own link. With **Reflect filters, search and sort in the URL** on, a filtered view can be bookmarked and shared too.

| Parameter | Purpose |
| --- | --- |
| `?mbcase=ID` | Open a case directly |
| `?mbcat=slug` | Choose a category |
| `?mbq=term` | Fill in the search |
| `?mbsort=newest\|oldest\|title` | Set the sort order |
| `?<filter>=value1,value2` | Choose filter values |

For example, `…/gallery/?mbcase=128` opens that case straight away — handy for sending a result by email. The page structures, Find by area and Help me choose keep their state in the address as well.

If the [sensitive-content notice](/docs/photo-protection/) is on, it also shows for visitors who arrive through a shared link.

Try it: [search and sort](https://demo.medicalbeforeaftergallery.com/pro-demos/search-and-sort/) · [shareable case links](https://demo.medicalbeforeaftergallery.com/pro-demos/shareable-case-links/).
