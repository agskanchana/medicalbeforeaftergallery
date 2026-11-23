---
title: Photo protection
description: Watermarks that never touch your originals, protecting the original files, and the sensitive-content notice — photo by photo or for the whole page.
group: Media & Protection
groupOrder: 6
order: 1
---

Pro protects case photos in three ways, all in the **Protection** section of the Pro workspace.

## Watermarks

Your clinic’s name or logo on every gallery photo. Pro saves **watermarked copies**; your original uploads are never changed. Details: [Watermarking](/docs/watermarking/).

- **Size as a share of the photo’s width** (recommended), so the watermark looks the same on large and small photos — or a fixed size.
- A **live preview** of unsaved watermark settings on one of your photos.
- Copies at thumbnail and card sizes, so gallery cards load a small watermarked photo.
- After a settings change, watermarks are brought up to date in the background. Each photo keeps its current watermark until the new one is ready; **Update them now** does it straight away.
- Stage photos of the [progress timeline](/docs/case-windows/#progress-timeline) are watermarked too.

## Protect the originals

**Protect the originals** (opt-in) makes sure visitors can only open the watermarked photos:

- on Apache and LiteSpeed servers, the original files of gallery photos are refused to visitors;
- the media API, attachment pages and image tags hand out the watermarked copies;
- editors still see the originals in the Media Library.

On nginx or IIS the screen tells you that the files stay reachable by their exact address. The rules are lifted automatically whenever Pro is not running, so the gallery never links to refused files. **Check protection** tests it with a visitor request.

## Sensitive-content notice

For graphic results, turn on the **Sensitive Content Notice** under **Protection → Privacy** and choose **How it looks**:

| Style | What visitors see |
| --- | --- |
| **Photo by photo** (recommended) | Each case photo is blurred with its own **Show** button, and one **Show all photos** line sits above the gallery. The rest of the page stays readable. |
| **Whole page** | A dialog covers the page until the visitor agrees. |

You set the heading, message and button text, whether the answer is remembered, and for how many days (0 = until the visitor clears their browser). Changing the wording asks visitors again. Sites that already used the whole-page notice keep it until you choose otherwise.

The notice also applies to the single-case and carousel embeds and to shared case links. With Photo by photo, the photos are still downloaded (blurred): the notice is about what visitors see, not about access.

## Image protection

**Image protection** turns off right-click saving and dragging photos away. It deters casual copying; for real protection use watermarks and Protect the originals.

Try them: [photo-by-photo notice](https://demo.medicalbeforeaftergallery.com/pro-demos/sensitive-photos-notice/) · [whole-page notice](https://demo.medicalbeforeaftergallery.com/pro-demos/sensitive-content-notice/) · [watermarks](https://demo.medicalbeforeaftergallery.com/pro-demos/automatic-watermarks/).

> These tools help you present sensitive photos responsibly; they do not replace written patient consent. Follow the privacy rules that apply to your practice.
