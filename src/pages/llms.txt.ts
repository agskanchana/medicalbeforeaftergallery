// /llms.txt — a short plain-text summary of the plugin for AI search tools, with links to the
// docs, the demos and the WordPress.org page. Built from the site data, so versions, the
// rating and the doc list stay current.
import { getDocsFlat } from '../utils/docs';
import { site } from '../data/site';
import { specialties } from '../data/specialties';
import { liveDemos } from '../utils/demos';

export async function GET() {
  const docs = await getDocsFlat();
  const u = (path: string) => new URL(path, site.url).href;

  const text = `# ${site.legalName} (${site.name})

> A WordPress plugin for before and after photo galleries in clinics: plastic surgery, dermatology, dental, hair restoration, med spa and weight loss practices. The free plugin is on WordPress.org; the optional Pro add-on is a one-time purchase ($${site.proPrice}, lifetime license with updates).

Current versions: free ${site.freeVersion}, Pro ${site.proVersion}. Needs WordPress 5.0+ and PHP 7.4+. Rated ${site.wpOrg.rating} on WordPress.org (${site.wpOrg.ratingCount} reviews).

The free plugin: a comparison slider with Slider, Before and After views; hover-reveal and refined cards; a blurred photo background in the case window; doctor cards; four category styles (carousel, grid, buttons, drop-down) and a drag-and-drop category manager; image cropping; a brand colour; the [medbeafgallery] shortcode with per-gallery options. Up to 12 cases and 4 categories.

The Pro add-on: unlimited cases and categories; several photo pairs (angles) per case; a live map (face, body and smile beside the results, which change as visitors point); Someone like you (the closest results to the visitor’s gender, age and concern first); Flip wall, Expanding strips, Open row, Refined grid, Masonry, Spotlight, Procedure rows, Editorial, Angles, Uncropped and Collections layouts; six ways to compare photos (slider, after first, before first, click to switch, side by side, stacked); eight more category styles and 92 built-in category icons (or your own image); Cinema, Drawer, Comparison desk and Case story case windows, and Story mode on phones; a progress timeline with dated stage photos; the single-case embed [mba_case] with a scroll story, the category carousel [mba_category_carousel] and the body map [mba_body_map]; treatment hub, treatment index, concern first and doctor portfolios; compare two cases; Find by area and Help me choose; case filters, search, sort and shareable links; six design templates with a live preview; watermarks on copies of the photos and "Protect the originals"; a photo-by-photo sensitive-content notice; a setup wizard and ready-to-publish checks.

## Main pages

- [Home](${u('/')}): overview, feature video, free vs Pro, reviews, pricing
- [Features](${u('/features/')}): every feature, marked Free or Pro
- [Live demos](${u('/demo/')}): ${liveDemos.length} working demo pages, one per feature
- [Pricing](${u('/pricing/')})
- [FAQ](${u('/faq/')})

## Docs

${docs.map((d) => `- [${d.data.title}](${u(`/docs/${d.id}/`)})${d.data.description ? `: ${d.data.description}` : ''}`).join('\n')}

## For each kind of practice

${specialties.map((s) => `- [${s.title}](${u(`/for/${s.slug}/`)})`).join('\n')}

## Elsewhere

- [WordPress.org plugin page](${site.wpOrgUrl})
- [WordPress.org reviews](${site.wpOrgReviewsUrl})
- [Live demos](${u('/demo/')})
`;

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
