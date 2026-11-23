// The live demo pages, one entry per page of the demo export
// (demo.medicalbeforeaftergallery.com). Titles and one-line descriptions are taken
// from the export's own index and page intros.
//
// When the demo is rebuilt: update this list, then run
//   node scripts/capture-demo-shots.mjs
// It serves the export, checks every page in Chrome (the gallery or embed renders, a case
// window opens and closes or the embed's own control responds, no console errors, no failed
// requests), saves a screenshot per page to public/images/demos/ and writes the result to
// src/data/demo-check.json. The /demo/ landing page lists only pages that passed.
//
// Keep this file free of imports and non-erasable TypeScript: the capture script imports it
// directly with Node's type stripping.

export const demoBase = 'https://demo.medicalbeforeaftergallery.com';

export type DemoGroupId = 'free' | 'layouts' | 'browse' | 'window' | 'embeds' | 'protect';

export interface DemoGroup {
  id: DemoGroupId;
  title: string;
  intro: string;
  tier: 'free' | 'pro';
}

export interface Demo {
  /** Path on the demo site, with leading and trailing slash. */
  path: string;
  title: string;
  description: string;
  group: DemoGroupId;
  /** Sub-heading inside the group. */
  family: string;
  /** What the screenshot shows (used for its alt text). */
  shot: string;
}

export const demoGroups: DemoGroup[] = [
  { id: 'free', title: 'Free plugin', intro: 'The free plugin on its own: up to 12 cases and 4 categories.', tier: 'free' },
  { id: 'layouts', title: 'Pro: layouts & cards', intro: 'How the cases look on the page.', tier: 'pro' },
  { id: 'browse', title: 'Pro: ways to browse', intro: 'How visitors find the cases they care about.', tier: 'pro' },
  { id: 'window', title: 'Pro: case window', intro: 'What opens when a visitor chooses a case.', tier: 'pro' },
  { id: 'embeds', title: 'Pro: embeds', intro: 'A single case, a category carousel or the body map on any page.', tier: 'pro' },
  { id: 'protect', title: 'Pro: protection & sharing', intro: 'Watermarks, the sensitive-content notice and shareable links.', tier: 'pro' },
];

export const demos: Demo[] = [
  // ── Free plugin ────────────────────────────────────────────────────────────
  { path: '/free/', title: 'The free plugin', description: 'The gallery as the free plugin shows it: category tiles in a carousel, side-by-side cards and the case window.', group: 'free', family: 'Category styles', shot: 'category tiles in a carousel above side-by-side before and after cards' },
  { path: '/free/category-grid/', title: 'Category grid', description: 'Every category visible at once as an image tile.', group: 'free', family: 'Category styles', shot: 'every category shown as an image tile above the cards' },
  { path: '/free/category-buttons/', title: 'Category buttons', description: 'Compact text buttons that wrap onto several lines.', group: 'free', family: 'Category styles', shot: 'categories as a row of compact text buttons' },
  { path: '/free/category-drop-down/', title: 'Category drop-down', description: 'One compact menu, good for many categories.', group: 'free', family: 'Category styles', shot: 'a single drop-down menu for the categories' },
  { path: '/free/hover-reveal-cards/', title: 'Hover-reveal cards', description: 'Each card shows the before photo and wipes to the after photo.', group: 'free', family: 'More free options', shot: 'cards showing the whole before photo, ready to wipe to the after photo' },
  { path: '/free/plain-case-window/', title: 'Case window background', description: 'Fill the space around a photo with a blurred copy of it, or keep it plain.', group: 'free', family: 'More free options', shot: 'an open case window with a plain background around the photo' },
  { path: '/free/brand-colour/', title: 'Brand colour', description: 'One colour, or a gradient, for buttons and active states.', group: 'free', family: 'More free options', shot: 'the gallery with a gradient brand colour on its buttons and active category' },
  { path: '/free/shortcode-options/', title: 'Shortcode options', description: 'Show one category on a treatment page, without the category bar.', group: 'free', family: 'More free options', shot: 'one category of cases with no category bar, as on a treatment page' },

  // ── Pro: layouts & cards ───────────────────────────────────────────────────
  { path: '/pro-demos/classic-grid/', title: 'Classic grid', description: 'Even cards in a tidy grid, with filters in a sidebar and a slider in the case window.', group: 'layouts', family: 'Gallery layouts', shot: 'an even grid of cards with the filters in a sidebar' },
  { path: '/pro-demos/masonry-layout/', title: 'Masonry', description: 'Every photo keeps its natural shape, with a case window that shows the case story beside the photos.', group: 'layouts', family: 'Gallery layouts', shot: 'cards packed into columns at their natural height' },
  { path: '/pro-demos/spotlight-layout/', title: 'Spotlight', description: 'The first matching case in one large tile, the rest around it.', group: 'layouts', family: 'Gallery layouts', shot: 'one featured case in a large tile with smaller cards beside it' },
  { path: '/pro-demos/procedure-rows/', title: 'Procedure rows', description: 'One scrolling row of cases per category.', group: 'layouts', family: 'Gallery layouts', shot: 'one row of cases per category' },
  { path: '/pro-demos/editorial-layout/', title: 'Editorial', description: 'One case per row, photos and details alternating sides.', group: 'layouts', family: 'Gallery layouts', shot: 'one case per row with its photos on one side and details on the other' },
  { path: '/pro-demos/angles/', title: 'Angles', description: 'Small photos of a case’s other views under its card.', group: 'layouts', family: 'Gallery layouts', shot: 'cards with small photos of the other views under them' },
  { path: '/pro-demos/uncropped-layout/', title: 'Uncropped', description: 'Both complete photos, side by side, nothing cut off.', group: 'layouts', family: 'Gallery layouts', shot: 'cards showing the complete before and after photos side by side' },
  { path: '/pro-demos/grid-columns-card-shape/', title: 'Columns and card shape', description: 'Choose the number of columns and the shape of the cards.', group: 'layouts', family: 'Gallery layouts', shot: 'four columns of square cards' },
  { path: '/pro-demos/card-slider/', title: 'Slider cards', description: 'Drag the divider on the card itself.', group: 'layouts', family: 'Card styles', shot: 'cards with a before and after slider on each card' },
  { path: '/pro-demos/card-hover-reveal/', title: 'Hover-reveal cards', description: 'The before photo wipes to the after photo.', group: 'layouts', family: 'Card styles', shot: 'cards that wipe from the before photo to the after photo' },
  { path: '/pro-demos/card-photo/', title: 'Photo cards', description: 'The photo fills the card, with the title over it.', group: 'layouts', family: 'Card styles', shot: 'photo cards with the title over the photo' },
  { path: '/pro-demos/card-switch/', title: 'Before/after switch cards', description: 'The after photo, with a switch on the card for the before photo.', group: 'layouts', family: 'Card styles', shot: 'cards showing the after photo with a Before / After switch' },
  { path: '/pro-demos/card-stacked/', title: 'Stacked cards', description: 'Before above after, both whole. Good for wide photos such as smiles.', group: 'layouts', family: 'Card styles', shot: 'cards with the before photo above the after photo' },
  { path: '/pro-demos/card-side-by-side/', title: 'Side-by-side cards', description: 'The free plugin’s card: before and after halves next to each other.', group: 'layouts', family: 'Card styles', shot: 'cards with before and after halves next to each other' },
  { path: '/pro-demos/card-frame-framed/', title: 'Framed cards', description: 'The photo sits inside the card with a margin, like a print.', group: 'layouts', family: 'Card styles', shot: 'cards with the photo inset like a print' },
  { path: '/pro-demos/card-frame-open/', title: 'Open cards', description: 'No box: the photo, with the caption underneath.', group: 'layouts', family: 'Card styles', shot: 'photos without a card box, the caption underneath' },
  { path: '/pro-demos/card-extras/', title: 'Card extras', description: 'The doctor, New and Progress badges, and duration, recovery and results chips.', group: 'layouts', family: 'Card styles', shot: 'cards with the doctor, badges and duration, recovery and results chips' },
  { path: '/pro-demos/style-clinical/', title: 'Clinical style', description: 'White, blue and slate with crisp borders.', group: 'layouts', family: 'Colours and style', shot: 'the gallery in the Clinical style preset' },
  { path: '/pro-demos/style-luxury/', title: 'Luxury style', description: 'Ivory, ink and gold.', group: 'layouts', family: 'Colours and style', shot: 'the gallery in the Luxury style preset' },
  { path: '/pro-demos/style-spa/', title: 'Spa style', description: 'Sage and cream with soft rounded cards.', group: 'layouts', family: 'Colours and style', shot: 'the gallery in the Spa style preset' },
  { path: '/pro-demos/style-midnight/', title: 'Midnight style', description: 'Dark navy with clear, light text.', group: 'layouts', family: 'Colours and style', shot: 'the gallery in the dark Midnight style preset' },
  { path: '/pro-demos/dark-mode/', title: 'Dark mode', description: 'A dark gallery for dark websites, always on or following each visitor’s device.', group: 'layouts', family: 'Colours and style', shot: 'the gallery in dark mode on a dark page' },
  { path: '/pro-demos/template-clinical/', title: 'Clinical template', description: 'Calm and familiar: an even grid with side-by-side photos, image category cards and the standard case window.', group: 'layouts', family: 'Design templates', shot: 'the gallery set up with the Clinical template' },
  { path: '/pro-demos/template-modern/', title: 'Modern template', description: 'Masonry cards that wipe from before to after, compact category buttons and a side drawer for each case.', group: 'layouts', family: 'Design templates', shot: 'the gallery set up with the Modern template' },
  { path: '/pro-demos/template-luxury/', title: 'Luxury template', description: 'A featured case first, text tabs for categories, ivory and gold, and the full-screen Cinema window.', group: 'layouts', family: 'Design templates', shot: 'the gallery set up with the Luxury template' },
  { path: '/pro-demos/template-editorial/', title: 'Editorial template', description: 'One case per row with room for its story, text tabs for categories and the Case story window.', group: 'layouts', family: 'Design templates', shot: 'the gallery set up with the Editorial template' },
  { path: '/pro-demos/template-compact/', title: 'Compact template', description: 'A row of cases per procedure with comparison sliders, a drop-down for categories and the Comparison desk with its magnifier.', group: 'layouts', family: 'Design templates', shot: 'the gallery set up with the Compact template' },
  { path: '/pro-demos/template-photo-first/', title: 'Photo-first template', description: 'Complete, uncropped photos in clean white cards, image cards for categories and the full-screen Cinema window.', group: 'layouts', family: 'Design templates', shot: 'the gallery set up with the Photo-first template' },

  // ── Pro: ways to browse ────────────────────────────────────────────────────
  { path: '/pro-demos/category-tabs/', title: 'Category tabs', description: 'Calm text tabs with case counts; subcategories open as a second row.', group: 'browse', family: 'Category styles', shot: 'text tabs with case counts above the cards' },
  { path: '/pro-demos/photo-pills/', title: 'Photo pills', description: 'A small result photo, the name and the case count in each button.', group: 'browse', family: 'Category styles', shot: 'category buttons with a small photo, name and case count' },
  { path: '/pro-demos/treatment-cards/', title: 'Treatment cards', description: 'A cover photo, name and count for each treatment.', group: 'browse', family: 'Category styles', shot: 'a card with a cover photo for each treatment' },
  { path: '/pro-demos/area-then-treatment/', title: 'Area, then treatment', description: 'Pick an area by its icon, then one of its treatments.', group: 'browse', family: 'Category styles', shot: 'areas with icons, then the treatments of the chosen area as chips' },
  { path: '/pro-demos/icon-chips/', title: 'Icon chips', description: 'A line icon, the name and the case count in each button, from the built-in icons or your own image.', group: 'browse', family: 'Category styles', shot: 'category buttons with a line icon, the name and the case count' },
  { path: '/pro-demos/side-menu/', title: 'Side menu', description: 'A folding list of treatments beside the gallery.', group: 'browse', family: 'Category styles', shot: 'a folding list of treatments beside the cards' },
  { path: '/pro-demos/search-first/', title: 'Search first', description: 'A box that suggests treatments as visitors type.', group: 'browse', family: 'Category styles', shot: 'a search box that suggests treatments above the cards' },
  { path: '/pro-demos/filter-bar/', title: 'Filter bar', description: 'Treatment, doctor and recovery time as drop-downs in one bar.', group: 'browse', family: 'Category styles', shot: 'treatment, doctor and recovery drop-downs in one bar' },
  { path: '/pro-demos/subcategory-pills/', title: 'Subcategory pills', description: 'Subcategories appear as pills that narrow a category further.', group: 'browse', family: 'Finding cases', shot: 'category tiles with subcategory pills below them' },
  { path: '/pro-demos/custom-case-filters/', title: 'Case filters', description: 'Filter by gender, age range, procedure, recovery time or any filter you define.', group: 'browse', family: 'Finding cases', shot: 'gender, age and procedure filters in a sidebar' },
  { path: '/pro-demos/search-and-sort/', title: 'Search and sort', description: 'A search box and a sort menu above the gallery.', group: 'browse', family: 'Finding cases', shot: 'a search box and a sort menu above the cards' },
  { path: '/pro-demos/find-by-area/', title: 'Find by area', description: 'A body and face map: tap an area to see its cases.', group: 'browse', family: 'Finding cases', shot: 'the face and body map open over the gallery' },
  { path: '/pro-demos/help-me-choose/', title: 'Help me choose', description: 'A short guided search with your own questions and answers.', group: 'browse', family: 'Finding cases', shot: 'the guided search open, asking what the visitor would like to improve' },
  { path: '/pro-demos/treatment-hub/', title: 'Treatment hub', description: 'Visitors start from a card per treatment, then see its cases.', group: 'browse', family: 'Page structures', shot: 'a card with a before and after pair for each treatment' },
  { path: '/pro-demos/concern-first/', title: 'Concern first', description: 'Visitors start from what they want to improve.', group: 'browse', family: 'Page structures', shot: 'concerns to choose from, each listing its treatments' },
  { path: '/pro-demos/doctor-portfolios/', title: 'Doctor portfolios', description: 'Visitors pick a doctor and see that doctor’s results.', group: 'browse', family: 'Page structures', shot: 'a row of doctors and the chosen doctor’s profile card' },
  { path: '/pro-demos/doctors/', title: 'Doctors', description: 'Doctor cards in every case window, the doctor on each card and a doctor filter.', group: 'browse', family: 'Page structures', shot: 'an open case with the treating doctor’s card' },
  { path: '/pro-demos/collections/', title: 'Collections', description: 'Hand-picked rows of cases. A case can be in several collections.', group: 'browse', family: 'Page structures', shot: 'hand-picked rows of cases, one per collection' },
  { path: '/pro-demos/compare-two-cases/', title: 'Compare two cases', description: 'Tick two cases to see them side by side.', group: 'browse', family: 'Page structures', shot: 'two cases compared side by side in a dialog' },

  // ── Pro: case window ───────────────────────────────────────────────────────
  { path: '/pro-demos/progress-stages/', title: 'Default window with progress stages', description: 'The standard case window; cases photographed over time get a progress timeline under the photo.', group: 'window', family: 'Window styles', shot: 'the default case window with a progress timeline under the photo' },
  { path: '/pro-demos/window-cinema/', title: 'Cinema window', description: 'A dark full-screen stage, a filmstrip and a details sheet.', group: 'window', family: 'Window styles', shot: 'a case open in the dark, full-screen Cinema window' },
  { path: '/pro-demos/window-drawer/', title: 'Drawer window', description: 'Cases open in a side panel, or a bottom sheet on phones.', group: 'window', family: 'Window styles', shot: 'a case open in a side panel next to the gallery' },
  { path: '/pro-demos/window-comparison-desk/', title: 'Comparison desk', description: 'Before and after side by side with a linked magnifier.', group: 'window', family: 'Window styles', shot: 'before and after side by side in the Comparison desk' },
  { path: '/pro-demos/window-case-story/', title: 'Case story window', description: 'A scrolling case study that ends in your booking button.', group: 'window', family: 'Window styles', shot: 'a case open as a scrolling case study' },
  { path: '/pro-demos/story-mode-on-phones/', title: 'Story mode on phones', description: 'Full-screen on phones: press and hold for the before photo, swipe between cases.', group: 'window', family: 'Window styles', shot: 'a phone showing a case full screen in Story mode' },
  { path: '/pro-demos/case-viewer-zoom/', title: 'Zoom', description: 'Zoom into fine detail, with before and after kept in step.', group: 'window', family: 'In the window', shot: 'a case window zoomed in on the photo' },
  { path: '/pro-demos/comparison-labels/', title: 'Labels and starting view', description: 'Rename the Before/After labels and choose what visitors see first.', group: 'window', family: 'In the window', shot: 'a case window with Pre-op and Post-op labels' },
  { path: '/pro-demos/case-details-and-booking/', title: 'Case details and booking button', description: 'A details panel with the case story, plus a booking button in every case.', group: 'window', family: 'In the window', shot: 'a case window with the details panel and a booking button' },
  { path: '/pro-demos/image-annotations/', title: 'Image annotations', description: 'Numbered markers on the photos that explain what changed.', group: 'window', family: 'In the window', shot: 'numbered markers on a case photo' },

  // ── Pro: embeds ────────────────────────────────────────────────────────────
  { path: '/pro-demos/single-case-embed/', title: 'Single case on any page', description: 'Place one case on a treatment page, blog post or landing page.', group: 'embeds', family: 'Single case', shot: 'one case embedded in a page with its slider and details' },
  { path: '/pro-demos/single-case-stages/', title: 'Single case with progress stages', description: 'The stages of a case, step by step, inside the page.', group: 'embeds', family: 'Single case', shot: 'an embedded case with its progress timeline under the photo' },
  { path: '/pro-demos/category-carousel/', title: 'Category carousel', description: 'A sliding row of cases from one category, for a treatment page.', group: 'embeds', family: 'Carousel and map', shot: 'a sliding row of cases from one category' },
  { path: '/pro-demos/body-map-embed/', title: 'Body map on any page', description: 'The map without the gallery, linking to your gallery page.', group: 'embeds', family: 'Carousel and map', shot: 'the face and body map on a page of its own' },

  // ── Pro: protection & sharing ──────────────────────────────────────────────
  { path: '/pro-demos/sensitive-photos-notice/', title: 'Notice, photo by photo', description: 'Photos stay blurred until the visitor shows one, or all of them.', group: 'protect', family: 'Sensitive content notice', shot: 'blurred photos, each with its own Show button' },
  { path: '/pro-demos/sensitive-content-notice/', title: 'Notice, whole page', description: 'A notice that covers the gallery until the visitor agrees.', group: 'protect', family: 'Sensitive content notice', shot: 'a sensitive-content notice covering the page' },
  { path: '/pro-demos/image-protection/', title: 'Image protection', description: 'No right-click saving and no dragging photos away.', group: 'protect', family: 'Protection and sharing', shot: 'a protected gallery' },
  { path: '/pro-demos/automatic-watermarks/', title: 'Watermarks', description: 'Your clinic name or logo on every gallery photo; the originals stay untouched.', group: 'protect', family: 'Protection and sharing', shot: 'a case photo with a watermark in its corner' },
  { path: '/pro-demos/shareable-case-links/', title: 'Shareable case links', description: 'Every case gets its own link.', group: 'protect', family: 'Protection and sharing', shot: 'an open case that has its own address' },
];

/** File name (without extension) of a demo's screenshot in /images/demos/. */
export const demoSlug = (path: string): string =>
  path.replace(/^\/|\/$/g, '').replace(/^pro-demos\//, '').replace(/\//g, '-') || 'home';

export const demoUrl = (path: string): string => demoBase + path;
