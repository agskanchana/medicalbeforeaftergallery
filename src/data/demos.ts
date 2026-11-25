// The live demo pages, one entry per page of the demo export
// (demo.medicalbeforeaftergallery.com). Titles and descriptions are the demo pages' own
// (demo-site/pages.json); the order is the order on the /demo/ landing page.
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

export type DemoGroupId = 'window' | 'layouts' | 'categories' | 'browse' | 'embeds' | 'templates' | 'protect' | 'free';

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
  /** A variant: it is linked from the card of this demo instead of having its own. */
  of?: string;
  /** Title of its card, when that differs (a card that also holds variants). */
  card?: string;
  /** The card's one short line. */
  line?: string;
  /** Its name in the card's row of variants. */
  tab?: string;
  /** What the screenshot shows (used for its alt text). */
  shot: string;
}

// The order is the order on the site: Pro first, the free plugin's demos last.
export const demoGroups: DemoGroup[] = [
  { id: 'window', title: 'Case windows', intro: 'What opens when a visitor chooses a case.', tier: 'pro' },
  { id: 'layouts', title: 'Layouts & cards', intro: 'How the cases look on the page.', tier: 'pro' },
  { id: 'categories', title: 'Category styles & icons', intro: 'Eight more ways to show your categories, with 92 built-in icons.', tier: 'pro' },
  { id: 'browse', title: 'Ways to browse', intro: 'How visitors find the cases they care about.', tier: 'pro' },
  { id: 'embeds', title: 'Embeds', intro: 'Put cases on any page of your website.', tier: 'pro' },
  { id: 'templates', title: 'Design templates & dark mode', intro: 'Set the whole look at once.', tier: 'pro' },
  { id: 'protect', title: 'Protection & sharing', intro: 'Keep photos marked, covered or shared as you choose.', tier: 'pro' },
  { id: 'free', title: 'Free plugin', intro: 'The free plugin on its own: up to 12 cases and 4 categories.', tier: 'free' },
];

/** The "Start here" row of the /demo/ page. */
export const featuredDemos = ['/pro-demos/live-map/', '/pro-demos/flip-wall/', '/pro-demos/someone-like-you/', '/pro-demos/scroll-story/'];

export const demos: Demo[] = [
  // ── Pro: case windows ──────────────────────────────────────────────────────────
  { path: '/pro-demos/window-cinema/', title: 'Cinema window', description: 'A dark full-screen stage, a filmstrip and a details sheet.', group: 'window', line: 'Full screen, with the progress timeline under the photo.', shot: 'a hair transplant case open full screen in the dark Cinema window, with a timeline of its progress photos' },
  { path: '/pro-demos/progress-stages/', title: 'Default window with progress stages', description: 'The standard case window; cases photographed over time get a progress timeline.', group: 'window', card: 'Default window with progress timeline', line: 'The standard window, with a dated photo for every stage.', shot: 'the default case window with a progress timeline under the photo' },
  { path: '/pro-demos/window-case-story/', title: 'Case story window', description: 'A scrolling case study that ends in your booking button.', group: 'window', line: 'A scrolling case study that ends in your booking button.', shot: 'a case open as a scrolling case study' },
  { path: '/pro-demos/window-comparison-desk/', title: 'Comparison desk', description: 'Before and after side by side with a linked magnifier.', group: 'window', line: 'Before and after side by side with a linked magnifier.', shot: 'before and after side by side in the Comparison desk' },
  { path: '/pro-demos/window-drawer/', title: 'Drawer window', description: 'Cases open in a side panel, or a bottom sheet on phones.', group: 'window', line: 'A side panel, or a bottom sheet on phones.', shot: 'a case open in a side panel next to the gallery' },
  { path: '/pro-demos/story-mode-on-phones/', title: 'Story mode on phones', description: 'Full-screen on phones: press and hold for the before photo, swipe between cases.', group: 'window', line: 'Hold for the before photo, swipe between cases.', shot: 'a phone showing a case full screen in Story mode' },
  { path: '/pro-demos/image-annotations/', title: 'Image annotations', description: 'Numbered markers on the photos that explain what changed.', group: 'window', line: 'Numbered markers that explain what changed.', shot: 'numbered markers on a case photo' },
  { path: '/pro-demos/case-viewer-zoom/', title: 'Zoom', description: 'Zoom into fine detail, with before and after kept in step.', group: 'window', line: 'Fine detail, with before and after kept in step.', shot: 'a case window zoomed in on the photo' },
  { path: '/pro-demos/case-details-and-booking/', title: 'Case details and booking button', description: 'A details panel with the case story, plus a booking button in every case.', group: 'window', card: 'Details, booking button and labels', line: 'The case story, a booking button and your own labels.', tab: 'Details and booking', shot: 'a case window with the details panel and a booking button' },
  { path: '/pro-demos/comparison-labels/', title: 'Labels and starting view', description: 'Rename the Before/After labels and choose what visitors see first.', group: 'window', of: '/pro-demos/case-details-and-booking/', tab: 'Labels and starting view', shot: 'a case window with Pre-op and Post-op labels' },

  // ── Pro: layouts & cards ───────────────────────────────────────────────────────
  { path: '/pro-demos/flip-wall/', title: 'Flip wall', description: 'One switch turns every photo from before to after.', group: 'layouts', line: 'One switch turns every photo from before to after.', shot: 'a wall of photos with a Before and After switch above it' },
  { path: '/pro-demos/expanding-strips/', title: 'Expanding strips', description: 'Tall strips that open into a full comparison.', group: 'layouts', line: 'Tall strips that open into a full comparison.', shot: 'a row of tall photo strips, one of them open' },
  { path: '/pro-demos/open-row/', title: 'Open row', description: 'A case opens in place and the wall parts around it.', group: 'layouts', line: 'A case opens in place; the wall parts around it.', shot: 'a dense wall of photos with a case open in its row' },
  { path: '/pro-demos/refined-grid/', title: 'Refined grid', description: 'Portrait photos without boxes, one quiet line under each.', group: 'layouts', line: 'Portrait photos without boxes.', shot: 'portrait photos without boxes, each with one line under it' },
  { path: '/pro-demos/masonry-layout/', title: 'Masonry', description: 'Every photo keeps its natural shape, with a case window that shows the case story beside the photos.', group: 'layouts', line: 'Every photo keeps its natural shape.', shot: 'cards packed into columns at their natural height' },
  { path: '/pro-demos/spotlight-layout/', title: 'Spotlight', description: 'The first matching case in one large tile, the rest around it.', group: 'layouts', line: 'One case in a large tile, the rest around it.', shot: 'one featured case in a large tile with smaller cards beside it' },
  { path: '/pro-demos/editorial-layout/', title: 'Editorial', description: 'One case per row, photos and details alternating sides.', group: 'layouts', line: 'One case per row, photos and details side by side.', shot: 'one case per row with its photos on one side and details on the other' },
  { path: '/pro-demos/procedure-rows/', title: 'Procedure rows', description: 'One scrolling row of cases per category.', group: 'layouts', line: 'One scrolling row of cases per category.', shot: 'one row of cases per category' },
  { path: '/pro-demos/card-slider/', title: 'Slider cards', description: 'Drag the divider on the card itself.', group: 'layouts', card: 'How photos compare', line: 'Six ways to show before and after on the card.', tab: 'Slider', shot: 'cards with a before and after slider on each card' },
  { path: '/pro-demos/card-after-first/', title: 'After first, hover for before', description: 'The result first; point at it to see the before photo.', group: 'layouts', of: '/pro-demos/card-slider/', tab: 'After first', shot: 'cards showing the result first' },
  { path: '/pro-demos/card-switch/', title: 'Before/after switch cards', description: 'The after photo, with a switch on the card for the before photo.', group: 'layouts', of: '/pro-demos/card-slider/', tab: 'Switch', shot: 'cards showing the after photo with a Before / After switch' },
  { path: '/pro-demos/card-hover-reveal/', title: 'Before first, hover for after', description: 'The before photo wipes to the after photo.', group: 'layouts', of: '/pro-demos/card-slider/', tab: 'Before first', shot: 'cards that wipe from the before photo to the after photo' },
  { path: '/pro-demos/card-stacked/', title: 'Stacked cards', description: 'Before above after, both whole. Good for wide photos such as smiles.', group: 'layouts', of: '/pro-demos/card-slider/', tab: 'Stacked', shot: 'cards with the before photo above the after photo' },
  { path: '/pro-demos/card-side-by-side/', title: 'Side-by-side cards', description: 'The free plugin’s card: before and after halves next to each other.', group: 'layouts', of: '/pro-demos/card-slider/', tab: 'Side by side', shot: 'cards with before and after halves next to each other' },
  { path: '/pro-demos/uncropped-layout/', title: 'Uncropped', description: 'Both complete photos, side by side, nothing cut off.', group: 'layouts', line: 'Both complete photos, nothing cut off.', shot: 'cards showing the complete before and after photos side by side' },
  { path: '/pro-demos/angles/', title: 'Angles', description: 'Small photos of a case’s other views under its card.', group: 'layouts', line: 'A case’s other views as small photos under its card.', shot: 'cards with small photos of the other views under them' },
  { path: '/pro-demos/classic-grid/', title: 'Classic grid', description: 'Even cards in a tidy grid, with filters in a sidebar and a slider in the case window.', group: 'layouts', line: 'An even grid, with your columns and card shape.', tab: 'Classic grid', shot: 'an even grid of cards with the filters in a sidebar' },
  { path: '/pro-demos/grid-columns-card-shape/', title: 'Columns and card shape', description: 'Choose the number of columns and the shape of the cards.', group: 'layouts', of: '/pro-demos/classic-grid/', tab: 'Columns and shape', shot: 'four columns of square cards' },
  { path: '/pro-demos/card-frame-framed/', title: 'Framed cards', description: 'The photo sits inside the card with a margin, like a print.', group: 'layouts', card: 'Card frames', line: 'A margin like a print, or no box at all.', tab: 'Framed', shot: 'cards with the photo inset like a print' },
  { path: '/pro-demos/card-frame-open/', title: 'Open cards', description: 'No box: the photo, with the caption underneath.', group: 'layouts', of: '/pro-demos/card-frame-framed/', tab: 'Open', shot: 'photos without a card box, the caption underneath' },
  { path: '/pro-demos/card-extras/', title: 'Card extras', description: 'The doctor, and New and Progress badges.', group: 'layouts', line: 'The doctor, and New and Progress badges.', shot: 'slider cards with the doctor and New and Progress badges' },

  // ── Pro: category styles & icons ───────────────────────────────────────────────
  { path: '/pro-demos/icon-chips/', title: 'Icon chips', description: 'A line icon, the name and the case count, with 92 built-in icons or your own image.', group: 'categories', line: 'A line icon, the name and the case count.', shot: 'category buttons with a line icon, the name and the case count' },
  { path: '/pro-demos/area-then-treatment/', title: 'Area, then treatment', description: 'Pick an area by its icon, then one of its treatments.', group: 'categories', line: 'Pick an area by its icon, then a treatment.', shot: 'areas with icons, then the treatments of the chosen area as chips' },
  { path: '/pro-demos/treatment-cards/', title: 'Treatment cards', description: 'A cover photo, name and count for each treatment.', group: 'categories', line: 'A cover photo, name and count per treatment.', shot: 'a card with a cover photo for each treatment' },
  { path: '/pro-demos/photo-pills/', title: 'Photo pills', description: 'A small result photo, the name and the case count in each button.', group: 'categories', line: 'A small result photo in each button.', shot: 'category buttons with a small photo, name and case count' },
  { path: '/pro-demos/side-menu/', title: 'Side menu', description: 'A folding list of treatments beside the gallery.', group: 'categories', line: 'A folding list of treatments beside the gallery.', shot: 'a folding list of treatments beside the cards' },
  { path: '/pro-demos/search-first/', title: 'Search first', description: 'A box that suggests treatments as visitors type.', group: 'categories', line: 'A box that suggests treatments as visitors type.', shot: 'a search box that suggests treatments above the cards' },
  { path: '/pro-demos/category-tabs/', title: 'Category tabs', description: 'Calm text tabs with case counts; subcategories open as a second row.', group: 'categories', line: 'Calm text tabs with case counts.', shot: 'text tabs with case counts above the cards' },
  { path: '/pro-demos/filter-bar/', title: 'Filter bar', description: 'Treatment, doctor and recovery time as drop-downs in one bar.', group: 'categories', line: 'Treatment, doctor and recovery time in one bar.', shot: 'treatment, doctor and recovery drop-downs in one bar' },
  { path: '/pro-demos/subcategory-pills/', title: 'Subcategory pills', description: 'Subcategories appear as pills that narrow a category further.', group: 'categories', line: 'Subcategories that narrow a category further.', shot: 'category tiles with subcategory pills below them' },

  // ── Pro: ways to browse ────────────────────────────────────────────────────────
  { path: '/pro-demos/live-map/', title: 'Live map', description: 'The face and body beside the results, which change as visitors point.', group: 'browse', line: 'Point at an area; its results appear beside it.', shot: 'a face map beside before and after cases' },
  { path: '/pro-demos/someone-like-you/', title: 'Someone like you', description: 'Visitors describe themselves and people like them come first.', group: 'browse', line: 'People closest to the visitor come first.', shot: 'a short form beside the closest results' },
  { path: '/pro-demos/treatment-index/', title: 'Treatment index', description: 'Large, quiet type in place of category tiles.', group: 'browse', line: 'A large, quiet list of treatments.', shot: 'a list of treatments in large type with a before and after pair' },
  { path: '/pro-demos/treatment-hub/', title: 'Treatment hub', description: 'Visitors start from a card per treatment, then see its cases.', group: 'browse', line: 'Start from a card per treatment.', shot: 'a card with a before and after pair for each treatment' },
  { path: '/pro-demos/concern-first/', title: 'Concern first', description: 'Visitors start from what they want to improve.', group: 'browse', line: 'Start from what the visitor wants to improve.', shot: 'concerns to choose from, each listing its treatments' },
  { path: '/pro-demos/doctor-portfolios/', title: 'Doctor portfolios', description: 'Visitors pick a doctor and see that doctor’s results.', group: 'browse', line: 'Pick a doctor and see that doctor’s results.', tab: 'Portfolios', shot: 'a row of doctors and the chosen doctor’s profile card' },
  { path: '/pro-demos/doctors/', title: 'Doctors', description: 'Doctor cards in every case window, the doctor on each card and a doctor filter.', group: 'browse', of: '/pro-demos/doctor-portfolios/', tab: 'Doctor cards and filter', shot: 'an open case with the treating doctor’s card' },
  { path: '/pro-demos/collections/', title: 'Collections', description: 'Hand-picked rows of cases. A case can be in several collections.', group: 'browse', line: 'Hand-picked rows of cases.', shot: 'hand-picked rows of cases, one per collection' },
  { path: '/pro-demos/find-by-area/', title: 'Find by area', description: 'A face, body and smile map: point at an area to see its treatments and results.', group: 'browse', line: 'A body and face map: tap an area to see its cases.', shot: 'the face and body map open over the gallery' },
  { path: '/pro-demos/help-me-choose/', title: 'Help me choose', description: 'A short guided search with your own questions and answers.', group: 'browse', line: 'A short guided search with your own questions.', shot: 'the guided search open, asking what the visitor would like to improve' },
  { path: '/pro-demos/compare-two-cases/', title: 'Compare two cases', description: 'Tick two cases to see them side by side.', group: 'browse', line: 'Tick two cases to see them side by side.', shot: 'two cases compared side by side in a dialog' },
  { path: '/pro-demos/custom-case-filters/', title: 'Case filters', description: 'Filter by gender, age range, procedure, recovery time or any filter you define.', group: 'browse', line: 'Filter by age, recovery time or your own filters.', tab: 'Case filters', shot: 'gender, age and procedure filters in a sidebar' },
  { path: '/pro-demos/search-and-sort/', title: 'Search and sort', description: 'A search box and a sort menu above the gallery.', group: 'browse', of: '/pro-demos/custom-case-filters/', tab: 'Search and sort', shot: 'a search box and a sort menu above the cards' },

  // ── Pro: embeds ────────────────────────────────────────────────────────────────
  { path: '/pro-demos/scroll-story/', title: 'Scroll story', description: 'One patient’s treatment, told by scrolling.', group: 'embeds', line: 'One patient’s treatment, told by scrolling.', shot: 'a progress photo beside a large month counter' },
  { path: '/pro-demos/single-case-stages/', title: 'Single case with progress stages', description: 'The stages of a case, step by step, inside the page.', group: 'embeds', card: 'Single case on any page', line: 'One case in a page or post, with its stages.', tab: 'Progress timeline', shot: 'an embedded case with its progress timeline under the photo' },
  { path: '/pro-demos/single-case-embed/', title: 'Single case on any page', description: 'Place one case on a treatment page, blog post or landing page.', group: 'embeds', of: '/pro-demos/single-case-stages/', tab: 'Layouts', shot: 'one case embedded in a page with its slider and details' },
  { path: '/pro-demos/category-carousel/', title: 'Category carousel', description: 'A sliding row of cases from one category, for a treatment page.', group: 'embeds', line: 'A sliding row of cases from one category.', shot: 'a sliding row of cases from one category' },
  { path: '/pro-demos/body-map-embed/', title: 'Body map on any page', description: 'The map on its own page; an area’s cases open under it.', group: 'embeds', line: 'The map on its own; an area’s cases open under it.', shot: 'the face and body map on a page of its own' },

  // ── Pro: design templates & dark mode ──────────────────────────────────────────
  { path: '/pro-demos/template-luxury/', title: 'Luxury template', description: 'A featured case first, text tabs for categories, ivory and gold, and the full-screen Cinema window.', group: 'templates', card: 'Design templates', line: 'Six ready-made looks that set the whole gallery.', tab: 'Luxury', shot: 'the gallery set up with the Luxury template' },
  { path: '/pro-demos/template-modern/', title: 'Modern template', description: 'Masonry cards that wipe from before to after, compact category buttons and a side drawer for each case.', group: 'templates', of: '/pro-demos/template-luxury/', tab: 'Modern', shot: 'the gallery set up with the Modern template' },
  { path: '/pro-demos/template-editorial/', title: 'Editorial template', description: 'One case per row with room for its story, text tabs for categories and the Case story window.', group: 'templates', of: '/pro-demos/template-luxury/', tab: 'Editorial', shot: 'the gallery set up with the Editorial template' },
  { path: '/pro-demos/template-photo-first/', title: 'Photo-first template', description: 'Portrait photos without boxes, the result first, photo pills for categories and the full-screen Cinema window.', group: 'templates', of: '/pro-demos/template-luxury/', tab: 'Photo-first', shot: 'the gallery set up with the Photo-first template' },
  { path: '/pro-demos/template-compact/', title: 'Compact template', description: 'A dense wall of photos; a case opens in place. A filter bar for categories and a side drawer for the full case.', group: 'templates', of: '/pro-demos/template-luxury/', tab: 'Compact', shot: 'the gallery set up with the Compact template' },
  { path: '/pro-demos/template-clinical/', title: 'Clinical template', description: 'Calm and familiar: an even grid with side-by-side photos, image category cards and the standard case window.', group: 'templates', of: '/pro-demos/template-luxury/', tab: 'Clinical', shot: 'the gallery set up with the Clinical template' },
  { path: '/pro-demos/style-luxury/', title: 'Luxury style', description: 'Ivory, ink and gold.', group: 'templates', card: 'Style presets', line: 'Colours for the cards, category bar and window.', tab: 'Luxury', shot: 'the gallery in the Luxury style preset' },
  { path: '/pro-demos/style-spa/', title: 'Spa style', description: 'Sage and cream with soft rounded cards.', group: 'templates', of: '/pro-demos/style-luxury/', tab: 'Spa', shot: 'the gallery in the Spa style preset' },
  { path: '/pro-demos/style-clinical/', title: 'Clinical style', description: 'White, blue and slate with crisp borders.', group: 'templates', of: '/pro-demos/style-luxury/', tab: 'Clinical', shot: 'the gallery in the Clinical style preset' },
  { path: '/pro-demos/style-midnight/', title: 'Midnight style', description: 'Dark navy with clear, light text.', group: 'templates', of: '/pro-demos/style-luxury/', tab: 'Midnight', shot: 'the gallery in the dark Midnight style preset' },
  { path: '/pro-demos/dark-mode/', title: 'Dark mode', description: 'A dark gallery for dark websites, always on or following each visitor’s device.', group: 'templates', line: 'Always on, or following each visitor’s device.', shot: 'the gallery in dark mode on a dark page' },

  // ── Pro: protection & sharing ──────────────────────────────────────────────────
  { path: '/pro-demos/automatic-watermarks/', title: 'Watermarks', description: 'Your clinic name or logo on every gallery photo; the originals stay untouched.', group: 'protect', line: 'Your name or logo on every gallery photo.', shot: 'a case photo with a watermark in its corner' },
  { path: '/pro-demos/sensitive-photos-notice/', title: 'Notice, photo by photo', description: 'Photos stay blurred until the visitor shows one, or all of them.', group: 'protect', card: 'Sensitive-content notice', line: 'Photo by photo, or one notice for the whole page.', tab: 'Photo by photo', shot: 'blurred photos, each with its own Show button' },
  { path: '/pro-demos/sensitive-content-notice/', title: 'Notice, whole page', description: 'A notice that covers the gallery until the visitor agrees.', group: 'protect', of: '/pro-demos/sensitive-photos-notice/', tab: 'Whole page', shot: 'a sensitive-content notice covering the page' },
  { path: '/pro-demos/image-protection/', title: 'Image protection', description: 'No right-click saving and no dragging photos away.', group: 'protect', line: 'No right-click saving, no dragging photos away.', shot: 'a protected gallery' },
  { path: '/pro-demos/shareable-case-links/', title: 'Shareable case links', description: 'Every case gets its own link.', group: 'protect', line: 'Every case gets its own link.', shot: 'an open case that has its own address' },

  // ── Free plugin ────────────────────────────────────────────────────────────
  { path: '/free/', title: 'The free plugin', description: 'The gallery as the free plugin shows it: category tiles in a carousel, side-by-side cards and the case window.', group: 'free', line: 'Category tiles, cards and the case window.', shot: 'category tiles in a carousel above side-by-side before and after cards' },
  { path: '/free/category-grid/', title: 'Category grid', description: 'Every category visible at once as an image tile.', group: 'free', line: 'Every category at once as an image tile.', shot: 'every category shown as an image tile above the cards' },
  { path: '/free/category-buttons/', title: 'Category buttons', description: 'Compact text buttons that wrap onto several lines.', group: 'free', line: 'Compact text buttons.', shot: 'categories as a row of compact text buttons' },
  { path: '/free/category-drop-down/', title: 'Category drop-down', description: 'One compact menu, good for many categories.', group: 'free', line: 'One compact menu.', shot: 'a single drop-down menu for the categories' },
  { path: '/free/refined-cards/', title: 'Refined cards', description: 'Portrait photos without boxes that wipe to the result.', group: 'free', line: 'Portrait photos that wipe to the result.', shot: 'portrait photos without boxes' },
  { path: '/free/hover-reveal-cards/', title: 'Hover-reveal cards', description: 'Each card shows the before photo and wipes to the after photo.', group: 'free', line: 'Cards that wipe from before to after.', shot: 'cards showing the whole before photo, ready to wipe to the after photo' },
  { path: '/free/plain-case-window/', title: 'Case window background', description: 'Fill the space around a photo with a blurred copy of it, or keep it plain.', group: 'free', line: 'A blurred or a plain background behind the photo.', shot: 'an open case window with a plain background around the photo' },
  { path: '/free/brand-colour/', title: 'Brand colour', description: 'One colour, or a gradient, for buttons and active states.', group: 'free', line: 'One colour, or a gradient.', shot: 'the gallery with a gradient brand colour on its buttons and active category' },
  { path: '/free/shortcode-options/', title: 'Shortcode options', description: 'Show one category on a treatment page, without the category bar.', group: 'free', line: 'One category on a treatment page.', shot: 'one category of cases with no category bar, as on a treatment page' },
];

/** File name (without extension) of a demo's screenshot in /images/demos/. */
export const demoSlug = (path: string): string =>
  path.replace(/^\/|\/$/g, '').replace(/^pro-demos\//, '').replace(/\//g, '-') || 'home';

export const demoUrl = (path: string): string => demoBase + path;
