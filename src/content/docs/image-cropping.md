---
title: Image cropping
description: Crop uploads to a consistent size for a tidy, uniform gallery grid.
group: Media & Protection
groupOrder: 5
order: 3
---

The built-in cropping tool (available in the **free** plugin) helps you keep before/after images the same size so your grid looks even.

## Enable cropping

Under **Before After Gallery → Settings**, the **cropping tool** is enabled by default. You can set the target **width** and **height** (default 800 × 800).

## Cropping an image

When you add an image to a case, the cropper opens so you can frame the shot to the configured dimensions. Confirm to save the cropped version.

- Your **original upload is preserved** — the plugin stores a cropped copy and remembers the link back to the original.
- Cropping makes the **before** and **after** images line up perfectly, which is essential for a convincing comparison slider.

## Tips

- Use the **same crop framing** for the before and after image of a pair so the comparison wipes cleanly.
- A square (1:1) crop works well with the [card aspect ratio](/docs/appearance/) options in the Classic layout.
- Cropping relies on the **GD** or **Imagick** image library — the same libraries used for [watermarking](/docs/watermarking/).
