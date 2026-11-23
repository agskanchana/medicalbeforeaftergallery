// Feature inventory for free 1.5.0 and Pro 1.6.0, written from the two readme.txt files and
// the plugin code (option and attribute names are the real ones).
// tier: 'both' = in the free plugin (and so in Pro too), 'pro' = Pro add-on only.

export type Tier = 'both' | 'pro';

export interface Feature {
  title: string;
  description: string;
  icon: string; // Font Awesome 6 class
  tier: Tier;
  /** Optional link: a docs page or a live demo path. */
  href?: string;
}

export interface FeatureGroup {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: Feature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'comparison',
    title: 'Before & after comparison',
    description: 'Let visitors compare the photos the way that suits them.',
    icon: 'fa-solid fa-arrows-left-right',
    features: [
      {
        title: 'Comparison slider',
        description: 'Drag the divider to compare, or switch to the before or after photo with the labelled Slider, Before and After buttons.',
        icon: 'fa-solid fa-sliders',
        tier: 'both',
        href: '/docs/comparison-and-labels/',
      },
      {
        title: 'Hover-reveal cards',
        description: 'A card shows the whole before photo and wipes to the after photo on hover, keyboard focus or a press-and-hold on phones.',
        icon: 'fa-solid fa-hand-pointer',
        tier: 'both',
        href: '/docs/layouts/',
      },
      {
        title: 'Blurred photo background',
        description: 'The case window fills the space around a photo with a soft, blurred copy of it instead of black bars.',
        icon: 'fa-solid fa-droplet',
        tier: 'both',
        href: '/docs/case-windows/',
      },
      {
        title: 'Your own labels and starting view',
        description: 'Rename the Before / After labels (for example Pre-op / Post-op) or hide them, and choose whether a case opens on the slider, either photo or both side by side.',
        icon: 'fa-solid fa-tag',
        tier: 'pro',
        href: '/docs/comparison-and-labels/',
      },
      {
        title: 'Image annotations',
        description: 'Numbered markers on the photos with a short note each, and a “What to notice” tour that walks visitors through them.',
        icon: 'fa-solid fa-location-dot',
        tier: 'pro',
        href: '/docs/image-annotations/',
      },
    ],
  },
  {
    id: 'layout',
    title: 'Layouts, cards & style',
    description: 'A gallery that fits your site, set up in one place.',
    icon: 'fa-solid fa-table-cells-large',
    features: [
      {
        title: 'Classic grid',
        description: 'An even, responsive grid of cases — the free plugin’s layout.',
        icon: 'fa-solid fa-table-cells',
        tier: 'both',
        href: '/docs/layouts/',
      },
      {
        title: 'Seven more layouts',
        description: 'Masonry, Spotlight, Procedure rows, Editorial, Angles, Uncropped and Collections.',
        icon: 'fa-solid fa-grip',
        tier: 'pro',
        href: '/docs/layouts/',
      },
      {
        title: 'Card styles and frames',
        description: 'Side-by-side and hover-reveal cards in the free plugin; slider, photo, before/after switch and stacked cards in Pro, each boxed, framed or open.',
        icon: 'fa-solid fa-clone',
        tier: 'pro',
        href: '/docs/layouts/',
      },
      {
        title: 'Card extras',
        description: 'The doctor, a New badge, a Progress badge for cases with stages, and duration, recovery and results chips.',
        icon: 'fa-solid fa-id-badge',
        tier: 'pro',
        href: '/docs/layouts/',
      },
      {
        title: 'Style presets and dark mode',
        description: 'Clinical, Luxury, Spa and Midnight presets, dark mode (always on or following the visitor’s device) and three motion levels.',
        icon: 'fa-solid fa-palette',
        tier: 'pro',
        href: '/docs/appearance/',
      },
      {
        title: 'Brand colour',
        description: 'A solid colour or a gradient for buttons and active states.',
        icon: 'fa-solid fa-fill-drip',
        tier: 'both',
        href: '/docs/appearance/',
      },
      {
        title: 'Design templates with a live preview',
        description: 'Six ready-made looks — Clinical, Modern, Luxury, Editorial, Compact and Photo-first — previewed with your own cases at desktop, tablet and phone size, applied in one click, with Undo.',
        icon: 'fa-solid fa-swatchbook',
        tier: 'pro',
        href: '/docs/design-templates-and-preview/',
      },
      {
        title: 'Theme-proof, and restylable',
        description: 'Your theme’s fonts and button rules don’t change the cards, while CSS custom properties (--mbg-font, --mbg-accent, --mbg-card-radius…) let you restyle them.',
        icon: 'fa-solid fa-shield',
        tier: 'pro',
        href: '/docs/appearance/',
      },
    ],
  },
  {
    id: 'browse',
    title: 'Categories & finding cases',
    description: 'Help visitors find results like the ones they want.',
    icon: 'fa-solid fa-filter',
    features: [
      {
        title: 'Four category styles',
        description: 'Image carousel, image grid, compact buttons or a drop-down menu, with parent and subcategories.',
        icon: 'fa-solid fa-folder-tree',
        tier: 'both',
        href: '/docs/category-styles-and-icons/',
      },
      {
        title: 'Eight more category styles',
        description: 'Tabs with counts, photo pills, treatment cards, area then treatment, icon chips, side menu, search first and a filter bar.',
        icon: 'fa-solid fa-icons',
        tier: 'pro',
        href: '/docs/category-styles-and-icons/',
      },
      {
        title: 'Category icons',
        description: 'Pick a line icon for each category from a grouped, searchable library, or use your own image — the “All cases” tile included.',
        icon: 'fa-solid fa-shapes',
        tier: 'pro',
        href: '/docs/category-styles-and-icons/',
      },
      {
        title: 'Simple category manager',
        description: 'Add, rename, nest and drag categories into order, with a tile image for each.',
        icon: 'fa-solid fa-arrow-down-up-across-line',
        tier: 'both',
        href: '/docs/category-styles-and-icons/',
      },
      {
        title: 'Case filters, search and sort',
        description: 'Gender, age, procedure, recovery, doctor and your own filters; a search box; newest, oldest or title order.',
        icon: 'fa-solid fa-magnifying-glass',
        tier: 'pro',
        href: '/docs/case-filters/',
      },
      {
        title: 'Find by area and Help me choose',
        description: 'A face, body and smile map: tap an area to see its cases. Or answer up to three short questions of your own.',
        icon: 'fa-solid fa-person',
        tier: 'pro',
        href: '/docs/find-by-area-and-help-me-choose/',
      },
      {
        title: 'Treatment hub, concerns and doctor portfolios',
        description: 'Start visitors from a card per treatment, from what they want to improve, or from a doctor.',
        icon: 'fa-solid fa-sitemap',
        tier: 'pro',
        href: '/docs/page-structures-and-collections/',
      },
      {
        title: 'Collections',
        description: 'Hand-picked rows of cases; a case can sit in several collections.',
        icon: 'fa-solid fa-layer-group',
        tier: 'pro',
        href: '/docs/page-structures-and-collections/',
      },
      {
        title: 'Compare two cases',
        description: 'Tick two cases to see their photos and recorded details side by side.',
        icon: 'fa-solid fa-code-compare',
        tier: 'pro',
        href: '/docs/compare-two-cases/',
      },
    ],
  },
  {
    id: 'window',
    title: 'Case windows & progress',
    description: 'What a visitor sees when they open a case.',
    icon: 'fa-solid fa-window-maximize',
    features: [
      {
        title: 'Case window',
        description: 'The slider, labelled views, the doctor card and moving between cases without closing the window.',
        icon: 'fa-solid fa-window-restore',
        tier: 'both',
        href: '/docs/case-windows/',
      },
      {
        title: 'Four more window styles',
        description: 'Cinema, Drawer, Comparison desk with a linked magnifier, and Case story — plus a full-screen Story mode on phones.',
        icon: 'fa-solid fa-display',
        tier: 'pro',
        href: '/docs/case-windows/',
      },
      {
        title: 'Progress timeline',
        description: 'Real, dated photos for each stage (6 weeks, 3 months, 1 year…), shown as a timeline in every case window and in the single-case embed. Photos are never blended or invented.',
        icon: 'fa-solid fa-timeline',
        tier: 'pro',
        href: '/docs/case-windows/',
      },
      {
        title: 'Zoom',
        description: 'Zoom into fine detail in the masonry window, with before and after kept on the same spot.',
        icon: 'fa-solid fa-magnifying-glass-plus',
        tier: 'pro',
        href: '/docs/case-windows/',
      },
      {
        title: 'Case details and booking button',
        description: 'A Treatment Overview, the case write-up and a booking button that leads to your contact or booking page.',
        icon: 'fa-solid fa-calendar-check',
        tier: 'pro',
        href: '/docs/case-windows/',
      },
      {
        title: 'Multiple photo pairs per case',
        description: 'Add more angles or sessions to a case, each with its own label.',
        icon: 'fa-solid fa-images',
        tier: 'pro',
        href: '/docs/creating-a-case/',
      },
    ],
  },
  {
    id: 'embed',
    title: 'Embeds & doctors',
    description: 'Put cases where patients read about a treatment.',
    icon: 'fa-solid fa-code',
    features: [
      {
        title: 'Gallery shortcode',
        description: '[medbeafgallery] with options for the first category, cases per page, category style, card style and the category bar.',
        icon: 'fa-solid fa-cube',
        tier: 'both',
        href: '/docs/embedding-the-gallery/',
      },
      {
        title: 'Single-case embed',
        description: '[mba_case] places one case on a treatment page or blog post: split, stacked or compact, with its progress stages under the photo.',
        icon: 'fa-solid fa-id-card',
        tier: 'pro',
        href: '/docs/single-case-embed/',
      },
      {
        title: 'Category carousel',
        description: '[mba_category_carousel] shows a sliding row of one category’s cases; a slide opens the full case window.',
        icon: 'fa-solid fa-images',
        tier: 'pro',
        href: '/docs/category-carousel/',
      },
      {
        title: 'Body map on any page',
        description: '[mba_body_map] puts the face and body map on a page of its own, linking to your gallery.',
        icon: 'fa-solid fa-street-view',
        tier: 'pro',
        href: '/docs/find-by-area-and-help-me-choose/',
      },
      {
        title: 'Doctors',
        description: 'A Doctors screen with photo, credentials, location and profile link; a doctor card in the case window.',
        icon: 'fa-solid fa-user-doctor',
        tier: 'both',
        href: '/docs/doctors/',
      },
      {
        title: 'Doctor filter and portfolios',
        description: 'Visitors filter by doctor, or start from a doctor and see that doctor’s results.',
        icon: 'fa-solid fa-users',
        tier: 'pro',
        href: '/docs/doctors/',
      },
    ],
  },
  {
    id: 'protection',
    title: 'Protection & privacy',
    description: 'For sensitive medical photos.',
    icon: 'fa-solid fa-shield-halved',
    features: [
      {
        title: 'Watermarks',
        description: 'Your text or logo on every gallery photo, sized as a share of the photo’s width, with a live preview. Originals are never changed — the plugin saves watermarked copies.',
        icon: 'fa-solid fa-stamp',
        tier: 'pro',
        href: '/docs/watermarking/',
      },
      {
        title: 'Protect the originals',
        description: 'Optional: visitors can only open the watermarked copies; the original files are refused on Apache and LiteSpeed servers.',
        icon: 'fa-solid fa-lock',
        tier: 'pro',
        href: '/docs/photo-protection/',
      },
      {
        title: 'Sensitive-content notice',
        description: 'Photo by photo (each photo blurred with its own Show button) or a whole-page notice, remembered for the number of days you choose.',
        icon: 'fa-solid fa-eye-slash',
        tier: 'pro',
        href: '/docs/consent-and-protection/',
      },
      {
        title: 'Image protection',
        description: 'Blocks right-click saving and dragging on gallery photos. A deterrent; watermarks are the real protection.',
        icon: 'fa-solid fa-hand',
        tier: 'pro',
        href: '/docs/consent-and-protection/',
      },
      {
        title: 'Your cases stay yours',
        description: 'Deleting the plugin keeps your cases and categories unless you tick the option to delete them.',
        icon: 'fa-solid fa-box-archive',
        tier: 'both',
        href: '/docs/installation/',
      },
    ],
  },
  {
    id: 'workspace',
    title: 'Setup & everyday work',
    description: 'Less time in the dashboard.',
    icon: 'fa-solid fa-gauge',
    features: [
      {
        title: 'Guided case editor',
        description: 'A Title · Photos · Category · Details · Publish checklist that ticks itself, with the photos first.',
        icon: 'fa-solid fa-list-check',
        tier: 'both',
        href: '/docs/creating-a-case/',
      },
      {
        title: 'Cases screen',
        description: 'Photo cards or a compact list with status, categories and doctor; search, filter, and publish or trash several cases at once.',
        icon: 'fa-solid fa-table-list',
        tier: 'both',
        href: '/docs/creating-a-case/',
      },
      {
        title: 'Image cropping',
        description: 'Crop before and after photos to the same size on upload so they line up. The original upload is kept.',
        icon: 'fa-solid fa-crop-simple',
        tier: 'both',
        href: '/docs/image-cropping/',
      },
      {
        title: 'Setup wizard',
        description: 'Practice type, starter categories, a look and a gallery page, in a few steps.',
        icon: 'fa-solid fa-wand-magic-sparkles',
        tier: 'pro',
        href: '/docs/setup-wizard-and-ready-to-publish/',
      },
      {
        title: 'Ready-to-publish checks',
        description: 'Missing photos or alt text, small or mismatched photos and pending watermarks, listed per case.',
        icon: 'fa-solid fa-clipboard-check',
        tier: 'pro',
        href: '/docs/setup-wizard-and-ready-to-publish/',
      },
      {
        title: 'Photo tools',
        description: 'Drop both photos at once, a line-up tool for the after photo, a ghost camera on phones and short transformation reels for social media.',
        icon: 'fa-solid fa-camera',
        tier: 'pro',
        href: '/docs/creating-a-case/',
      },
    ],
  },
];
