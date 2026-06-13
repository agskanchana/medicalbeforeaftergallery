---
title: Watermarking
description: Protect your images with a text or logo watermark. Originals are never modified.
group: Media & Protection
groupOrder: 5
order: 1
---

Watermarking (Pro) overlays your text or logo on gallery images. It’s configured under **Settings → Watermark**.

> **Your originals are never changed.** The plugin generates separate watermarked **copies** and serves those in the gallery — you can remove or re-apply watermarks at any time without losing the source files.

## Requirements

Watermarking uses your server’s **Imagick** or **GD** image library (the plugin auto-detects the best available). Use the **Test** button to confirm everything is ready.

## Enable & choose a type

1. Turn on **Enable Watermarking**.
2. Choose the watermark **type**:
   - **Text** — set the **text**, **font size** (8–120px) and **color**.
   - **Image / logo** — select a transparent PNG from the media library.

## Position & style

- **Position** — one of nine spots (corners, edges, center).
- **Opacity** — 0–100%.
- **Padding** — distance from the edge, in pixels.

## Applying watermarks

- New images are watermarked automatically when you save a case.
- **Bulk apply** — watermark all existing, un-watermarked gallery images.
- **Clear & re-apply** — remove all watermarks and re-apply with your current settings (use after changing the design).
- **Remove all** — delete every watermarked copy and serve originals again.
- **Test** — preview the result before committing.

A progress bar shows the status of any bulk operation.

## Tips

- Use a **semi-transparent PNG logo** for a subtle, professional mark.
- Re-run **Clear & re-apply** whenever you change the text, logo, position or opacity so all images stay consistent.
