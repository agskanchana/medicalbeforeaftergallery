---
title: Watermarking
description: Text or logo watermarks on copies of your photos — size, position, live preview, background updates and the bulk tools.
group: Media & Protection
groupOrder: 6
order: 2
---

Watermarks (Pro) put your clinic’s name or logo on gallery photos. They are set in **Protection → Watermark** in the Pro workspace.

> **Your originals are never changed.** Pro saves separate watermarked **copies** and shows those in the gallery. You can remove or redo watermarks at any time.

## Requirements

Watermarks use the server’s **Imagick** or **GD** library; the screen says which one is used. **Test Config** checks your settings.

## Settings

1. Turn on **Enable Watermarking**.
2. Choose the **type**: **Text** (your text and its colour) or **Image / logo** (a PNG with transparency works best).
3. **Size**: **Share of the photo’s width** (recommended — the same look on large and small photos, and the distance from the edge grows with the photo) or **Fixed size**. New sites start with the share of the width.
4. **Position** (nine positions), **Opacity** and **Padding** (the distance from the edge).

A **live preview** draws your unsaved settings on one of your photos.

## Keeping watermarks up to date

- New photos are watermarked when you save a case — progress-timeline stage photos too.
- Pro also makes watermarked copies at thumbnail and card sizes, so gallery cards load a small photo.
- When you change the settings, existing watermarks are updated in the background. Each photo keeps its current watermark until the new one is ready. A progress line shows how far it is; **Update them now** does the rest straight away.
- A photo whose watermarked copy is missing is held back instead of being shown without a watermark, and the admin names it.

## Tools

- **Apply Watermarks** — watermark every gallery photo that doesn’t have one yet.
- **Clear & Reapply** — regenerate every watermark with the current settings.
- **Remove All** — delete every watermarked copy. The originals are never modified.

Bulk tools run in batches with real progress, so large galleries don’t time out.

## Protect the originals

To stop visitors opening the original files, turn on **Protect the originals** — see [Photo protection](/docs/photo-protection/).

Try it: [watermarks demo](https://demo.medicalbeforeaftergallery.com/pro-demos/automatic-watermarks/).
