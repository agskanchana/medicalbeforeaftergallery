---
title: Design templates & live preview
description: Six ready-made looks, a full-screen preview at desktop, tablet and phone sizes, and a live preview of unsaved design changes.
group: Display & Layout
groupOrder: 2
order: 4
---

## Templates (Pro)

**Design → Templates** offers six ready-made looks. Each sets the layout, cards, category style, case window and colours together:

| Template | Layout and cards | Categories | Case window |
| --- | --- | --- | --- |
| **Clinical** | An even grid with side-by-side photos | Image category cards | Default |
| **Modern** | Masonry cards that wipe from before to after | Compact buttons | Drawer |
| **Luxury** | A featured case first (Spotlight), ivory and gold | Text tabs | Cinema |
| **Editorial** | One case per row with room for its story | Text tabs | Case story |
| **Compact** | A row of cases per procedure with comparison sliders | Drop-down | Comparison desk |
| **Photo-first** | Complete, uncropped photos in clean white cards | Image cards | Cinema |

- **Preview** opens the template full screen with your own cases, at **Desktop**, **Tablet** (820 px) or **Phone** (390 px). A gallery with no published cases yet is previewed with sample cases.
- **Use this template** applies it in one click — from the card or from the preview. The page then offers **Undo**.
- Everything a template sets stays editable afterwards in the other Design sections.

The setup wizard’s **Look** step offers the same templates — see [Setup wizard](/docs/setup-wizard-and-ready-to-publish/).

## Live preview of your changes (Pro)

The Pro workspace keeps track of unsaved changes (a bar shows them, with **Save** and **Discard**). **Preview** shows the gallery with your unsaved design settings at desktop, tablet or phone width before you save. Nothing changes on your site until you save.

## Style presets, motion and dark mode (Pro)

Under **Design → Colours & style** and **Design → Gallery**:

- **Presets**: Default, Clinical, Luxury, Spa, Midnight — also per gallery with `preset="luxury"`.
- **Motion**: None, Subtle, Lively (`motion` attribute). Visitors who ask for reduced motion get none.
- **Dark mode**: off, always on, or following each visitor’s device.

## Restyling with CSS

The gallery’s cards ignore your theme’s fonts and button rules, so they look the same everywhere. To restyle them on purpose, set these CSS custom properties in **Appearance → Customize → Additional CSS** (no `!important` needed): `--mbg-font`, `--mbg-heading-font`, `--mbg-text`, `--mbg-muted`, `--mbg-accent`, `--mbg-card-bg`, `--mbg-card-border`, `--mbg-card-radius`, `--mbg-card-shadow`, `--mbg-card-shadow-hover`, `--mbg-card-padding`.

```css
.medbeafgallery-container {
  --mbg-card-radius: 4px;
  --mbg-font: "Lato", sans-serif; /* a font your theme already loads */
}
```

Try the templates: [Clinical](https://demo.medicalbeforeaftergallery.com/pro-demos/template-clinical/) · [Modern](https://demo.medicalbeforeaftergallery.com/pro-demos/template-modern/) · [Luxury](https://demo.medicalbeforeaftergallery.com/pro-demos/template-luxury/) · [Editorial](https://demo.medicalbeforeaftergallery.com/pro-demos/template-editorial/) · [Compact](https://demo.medicalbeforeaftergallery.com/pro-demos/template-compact/) · [Photo-first](https://demo.medicalbeforeaftergallery.com/pro-demos/template-photo-first/).
