// Feature sections for the home and features pages. Screenshots come from the demo export
// (scripts/capture-demo-shots.mjs): /images/features/<slug>.webp is 1600×900 and
// /images/demos/<slug>.webp is 800×450. `demo` is a path on the demo site; the link is only
// shown while that demo page passes its check (see src/utils/demos.ts).

export interface ShowcaseThumb {
  label: string;
  demo: string;
  image: string;
  imageAlt: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  points: string[];
  image?: string;
  imageAlt?: string;
  demo?: string;
  demoLabel?: string;
  docs?: string;
  tier: 'both' | 'pro';
  thumbs?: ShowcaseThumb[];
}

const card = (slug: string) => `/images/demos/${slug}.webp`;
const big = (slug: string) => `/images/features/${slug}.webp`;

/** Large alternating rows. */
export const showcase: ShowcaseItem[] = [
  {
    id: 'layouts',
    title: 'Layouts, and how photos compare',
    description:
      'Start with the free grid: side by side, hover reveal, or refined portrait cards. Pro adds eleven layouts and lets you choose how photos compare in each of them, because not every pair suits a slider.',
    points: [
      'Flip wall, Expanding strips, Open row, Refined grid, Masonry, Spotlight, Procedure rows, Editorial, Angles, Uncropped, Collections',
      'Slider, after first, before first, click to switch, side by side or stacked',
      'Boxed, framed or open cards, with the doctor, New and Progress badges',
    ],
    image: big('expanding-strips'),
    imageAlt: 'Screenshot of the Expanding strips layout: tall photo strips, one of them open with a Before and After switch',
    demo: '/pro-demos/expanding-strips/',
    demoLabel: 'Try the strips demo',
    docs: '/docs/layouts/',
    tier: 'pro',
    thumbs: [
      { label: 'Slider cards', demo: '/pro-demos/card-slider/', image: card('card-slider'), imageAlt: 'Slider cards: a before and after slider on each card' },
      { label: 'Spotlight', demo: '/pro-demos/spotlight-layout/', image: card('spotlight-layout'), imageAlt: 'Spotlight layout: one featured case in a large tile' },
      { label: 'Flip wall', demo: '/pro-demos/flip-wall/', image: card('flip-wall'), imageAlt: 'A wall of photos with one Before and After switch' },
      { label: 'Open row', demo: '/pro-demos/open-row/', image: card('open-row'), imageAlt: 'A case open in its row of a dense wall' },
    ],
  },
  {
    id: 'categories',
    title: 'Category styles, with icons',
    description:
      'The free plugin shows categories as an image carousel, an image grid, buttons or a drop-down. Pro adds eight more styles. Icon chips and Area, then treatment use a line icon for each category: Pro suggests one from the category’s name, you can pick another from a grouped, searchable library, or upload your own image — the “All cases” tile included.',
    points: [
      'Tabs, photo pills, treatment cards, area then treatment',
      'Icon chips, side menu, search first, filter bar',
      'Your own image as an icon, tinted to match or in its own colours',
    ],
    image: big('icon-chips'),
    imageAlt: 'Screenshot of the Icon chips category style: buttons with a line icon, the category name and the number of cases',
    demo: '/pro-demos/icon-chips/',
    demoLabel: 'Try the icon chips demo',
    docs: '/docs/category-styles-and-icons/',
    tier: 'pro',
    thumbs: [
      { label: 'Area, then treatment', demo: '/pro-demos/area-then-treatment/', image: card('area-then-treatment'), imageAlt: 'Areas with icons, then the treatments of the chosen area' },
      { label: 'Category tabs', demo: '/pro-demos/category-tabs/', image: card('category-tabs'), imageAlt: 'Text tabs with case counts' },
      { label: 'Photo pills', demo: '/pro-demos/photo-pills/', image: card('photo-pills'), imageAlt: 'Category buttons with a small photo and case count' },
    ],
  },
  {
    id: 'windows',
    title: 'Case windows',
    description:
      'Choose what opens when a visitor picks a case. The default window shows the slider and the doctor card; with Pro it also shows the case details and a progress timeline for cases photographed over time. Pro adds four more window styles, and a full-screen Story mode on phones.',
    points: [
      'Cinema: a dark, full-screen stage with a filmstrip and a details sheet',
      'Drawer: a side panel that keeps the gallery in view (a bottom sheet on phones)',
      'Comparison desk: side by side with a linked magnifier; Case story: a scrolling case study',
    ],
    image: big('window-cinema'),
    imageAlt: 'Screenshot of the Cinema case window: a hair transplant case full screen with a timeline of its progress photos',
    demo: '/pro-demos/window-cinema/',
    demoLabel: 'Open the Cinema demo',
    docs: '/docs/case-windows/',
    tier: 'pro',
    thumbs: [
      { label: 'Default, with progress timeline', demo: '/pro-demos/progress-stages/', image: card('progress-stages'), imageAlt: 'The default case window with a progress timeline under the photo' },
      { label: 'Drawer', demo: '/pro-demos/window-drawer/', image: card('window-drawer'), imageAlt: 'A case open in a side panel' },
      { label: 'Comparison desk', demo: '/pro-demos/window-comparison-desk/', image: card('window-comparison-desk'), imageAlt: 'Before and after side by side with a magnifier' },
      { label: 'Case story', demo: '/pro-demos/window-case-story/', image: card('window-case-story'), imageAlt: 'A case open as a scrolling case study' },
    ],
  },
  {
    id: 'timeline',
    title: 'Progress timeline',
    description:
      'Some results take months. Add a photo and a date for each stage of a case — 6 weeks, 3 months, 1 year — and visitors step from Before through every dated stage to After. The timeline appears in every case window style and in the single-case embed, and cards get a Progress badge.',
    points: ['Real, dated photos: never blended or invented', 'Watermarked like every other case photo', 'Keyboard and touch friendly'],
    image: big('progress-stages'),
    imageAlt: 'Screenshot of a hair transplant case in the default window, with its dated stages under the photo',
    demo: '/pro-demos/progress-stages/',
    demoLabel: 'Step through the stages',
    docs: '/docs/case-windows/#progress-timeline',
    tier: 'pro',
  },
  {
    id: 'templates',
    title: 'Design templates and live preview',
    description:
      'Six ready-made looks set the layout, cards, category style, case window and colours together: Clinical, Modern, Luxury, Editorial, Compact and Photo-first. Preview each one full screen with your own cases at desktop, tablet and phone size, apply it in one click, and undo if you change your mind. Every design change can be previewed before you save.',
    points: ['Six templates, all editable afterwards', 'Full-screen preview at three sizes', 'Clinical, Luxury, Spa and Midnight style presets'],
    image: big('template-luxury'),
    imageAlt: 'Screenshot of the gallery set up with the Luxury template: a featured case, text tabs and ivory and gold colours',
    demo: '/pro-demos/template-luxury/',
    demoLabel: 'See the Luxury template',
    docs: '/docs/design-templates-and-preview/',
    tier: 'pro',
    thumbs: [
      { label: 'Modern', demo: '/pro-demos/template-modern/', image: card('template-modern'), imageAlt: 'The Modern template' },
      { label: 'Editorial', demo: '/pro-demos/template-editorial/', image: card('template-editorial'), imageAlt: 'The Editorial template' },
      { label: 'Photo-first', demo: '/pro-demos/template-photo-first/', image: card('template-photo-first'), imageAlt: 'The Photo-first template' },
    ],
  },
  {
    id: 'protection',
    title: 'Watermarks and a photo-by-photo notice',
    description:
      'Put your clinic’s name or logo on every gallery photo. Pro saves watermarked copies and never touches the originals; it can also refuse the original files to visitors. For graphic results, the sensitive-content notice blurs each photo with its own Show button, so the page stays readable.',
    points: [
      'Watermark size as a share of the photo, with a live preview',
      'Optional “Protect the originals” on Apache and LiteSpeed',
      'Notice photo by photo or for the whole page, remembered for days you choose',
    ],
    image: big('sensitive-photos-notice'),
    imageAlt: 'Screenshot of the photo-by-photo notice: blurred case photos, each with a Show button, and a Show all photos bar',
    demo: '/pro-demos/sensitive-photos-notice/',
    demoLabel: 'See the photo-by-photo notice',
    docs: '/docs/photo-protection/',
    tier: 'pro',
    thumbs: [
      { label: 'Watermarks', demo: '/pro-demos/automatic-watermarks/', image: card('automatic-watermarks'), imageAlt: 'A case photo with a watermark in its corner' },
      { label: 'Whole-page notice', demo: '/pro-demos/sensitive-content-notice/', image: card('sensitive-content-notice'), imageAlt: 'A notice covering the gallery' },
    ],
  },
];

/** Smaller cards, two or three per row. */
export const featureCards: ShowcaseItem[] = [
  {
    id: 'single-case',
    title: 'Single case on any page',
    description:
      '[mba_case] puts one case on a treatment page or blog post. It adapts to its column — or choose split, stacked or compact — and shows the case’s progress stages under the photo.',
    points: [],
    image: card('single-case-stages'),
    imageAlt: 'An embedded hair transplant case with its stages under the photo',
    demo: '/pro-demos/single-case-embed/',
    demoLabel: 'Single-case demo',
    docs: '/docs/single-case-embed/',
    tier: 'pro',
  },
  {
    id: 'carousel',
    title: 'Category carousel',
    description:
      '[mba_category_carousel] shows a sliding row of one category’s cases, with the doctor in each caption. A slide opens the full case window.',
    points: [],
    image: card('category-carousel'),
    imageAlt: 'A sliding row of smile cases',
    demo: '/pro-demos/category-carousel/',
    demoLabel: 'Carousel demo',
    docs: '/docs/category-carousel/',
    tier: 'pro',
  },
  {
    id: 'doctors',
    title: 'Doctors',
    description:
      'Say who treated each case: photo, credentials and location on a doctor card in the case window (free). Pro adds the doctor on cards, a doctor filter and doctor portfolios.',
    points: [],
    image: card('doctors'),
    imageAlt: 'An open case with the treating doctor’s card',
    demo: '/pro-demos/doctors/',
    demoLabel: 'Doctors demo',
    docs: '/docs/doctors/',
    tier: 'both',
  },
  {
    id: 'structures',
    title: 'Treatment hub, concern first, collections',
    description:
      'Start visitors from a card per treatment, from what they want to improve, or from hand-picked collections of cases.',
    points: [],
    image: card('treatment-hub'),
    imageAlt: 'A card with a before and after pair for each treatment',
    demo: '/pro-demos/treatment-hub/',
    demoLabel: 'Treatment hub demo',
    docs: '/docs/page-structures-and-collections/',
    tier: 'pro',
  },
  {
    id: 'compare',
    title: 'Compare two cases',
    description: 'Visitors tick two cases and see their photos and recorded details side by side — on phones too.',
    points: [],
    image: card('compare-two-cases'),
    imageAlt: 'Two cases compared side by side',
    demo: '/pro-demos/compare-two-cases/',
    demoLabel: 'Compare demo',
    docs: '/docs/compare-two-cases/',
    tier: 'pro',
  },
  {
    id: 'discovery',
    title: 'Help me choose, and the map on any page',
    description:
      'A short guided search with your own questions, and the face, body and smile map on any page: an area’s cases open right under it.',
    points: [],
    image: card('body-map-embed'),
    imageAlt: 'The face map with the newest results of the chosen area',
    demo: '/pro-demos/body-map-embed/',
    demoLabel: 'Map on any page demo',
    docs: '/docs/find-by-area-and-help-me-choose/',
    tier: 'pro',
  },
];

/** The setup wizard and ready-to-publish checks are admin screens: shown as a list, not a screenshot. */
export const setupSteps = {
  wizard: ['Practice type', 'Starter categories', 'Look (a design template)', 'Gallery page'],
  checks: [
    'Main before or after photo missing',
    'Alt text missing',
    'Photo under 600 px on its shorter side',
    'Before and after shapes differ by more than 10%',
    'Watermarked copy still to make',
  ],
};
