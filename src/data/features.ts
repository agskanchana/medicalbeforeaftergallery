// Code-verified feature inventory (Appendix A of the plan).
// tier: 'both' = in Free & Pro, 'pro' = Pro add-on only.

export type Tier = 'both' | 'pro';

export interface Feature {
  title: string;
  description: string;
  icon: string; // Font Awesome 6 class
  tier: Tier;
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
    title: 'Before & After Comparison',
    description: 'Show transformations the way patients want to see them.',
    icon: 'fa-solid fa-arrows-left-right',
    features: [
      {
        title: 'Interactive comparison slider',
        description:
          'Drag-to-reveal before/after slider (powered by Cocoen) that feels natural on desktop and touch.',
        icon: 'fa-solid fa-sliders',
        tier: 'both',
      },
      {
        title: 'View switching',
        description: 'Open cases in split-slider, before-only or after-only — your choice of default.',
        icon: 'fa-solid fa-repeat',
        tier: 'both',
      },
      {
        title: 'Side-by-side "Both" view',
        description: 'Show before and after next to each other instead of a slider, great for subtle results.',
        icon: 'fa-solid fa-table-columns',
        tier: 'pro',
      },
      {
        title: 'Custom Before / After labels',
        description: 'Rename the labels (or hide them entirely) to match your clinic’s language.',
        icon: 'fa-solid fa-tag',
        tier: 'pro',
      },
      {
        title: 'Image annotations & hotspots',
        description:
          'Drop numbered markers (up to 30 per image) with titles and notes to highlight exactly what changed.',
        icon: 'fa-solid fa-location-dot',
        tier: 'pro',
      },
    ],
  },
  {
    id: 'layout',
    title: 'Layouts & Appearance',
    description: 'A gallery that fits your brand and any WordPress theme.',
    icon: 'fa-solid fa-table-cells-large',
    features: [
      {
        title: 'Responsive grid gallery',
        description: 'A clean, mobile-first grid with a category carousel and case modal out of the box.',
        icon: 'fa-solid fa-table-cells',
        tier: 'both',
      },
      {
        title: 'Masonry layout + redesigned modal',
        description:
          'Pinterest-style cards with a click-to-open filter drawer and a polished case modal with a Treatment Overview panel.',
        icon: 'fa-solid fa-grip',
        tier: 'pro',
      },
      {
        title: 'Dark mode',
        description: 'Off, always-on, or auto (follows the visitor’s system preference).',
        icon: 'fa-solid fa-moon',
        tier: 'pro',
      },
      {
        title: 'Grid columns & card ratios',
        description: 'Choose auto / 2 / 3 / 4 columns and card aspect ratios (1:1, 4:3, 3:2).',
        icon: 'fa-solid fa-ruler-combined',
        tier: 'pro',
      },
      {
        title: 'Customizable colors',
        description: 'Set a primary brand color — a solid hex or a CSS gradient — used across the gallery.',
        icon: 'fa-solid fa-palette',
        tier: 'both',
      },
      {
        title: 'Theme-resilient & accessible',
        description: 'Renders consistently inside any theme, with ARIA roles and full keyboard navigation.',
        icon: 'fa-solid fa-universal-access',
        tier: 'pro',
      },
    ],
  },
  {
    id: 'discovery',
    title: 'Filtering & Discovery',
    description: 'Help patients find the results that matter to them.',
    icon: 'fa-solid fa-filter',
    features: [
      {
        title: 'Categories & subcategories',
        description: 'Organize cases into categories, with hierarchical subcategory pills in Pro.',
        icon: 'fa-solid fa-folder-tree',
        tier: 'both',
      },
      {
        title: 'Smart case filters',
        description:
          'Six built-in filters — gender, age range, recovery time, treatment duration, results visibility and procedure type.',
        icon: 'fa-solid fa-sliders',
        tier: 'pro',
      },
      {
        title: 'Unlimited custom filters',
        description: 'Add your own filters with custom options, reorder them, and enable/disable as needed.',
        icon: 'fa-solid fa-list-check',
        tier: 'pro',
      },
      {
        title: 'Search & sort',
        description: 'Let visitors search across cases and sort by newest, oldest or title.',
        icon: 'fa-solid fa-magnifying-glass',
        tier: 'pro',
      },
      {
        title: 'Deep-linking & shareable views',
        description:
          'Filters, search and sort are reflected in the URL. A ?mbcase=ID link opens a specific case directly.',
        icon: 'fa-solid fa-link',
        tier: 'pro',
      },
    ],
  },
  {
    id: 'cases',
    title: 'Rich Case Studies',
    description: 'Turn a single photo pair into a complete, credible case story.',
    icon: 'fa-solid fa-images',
    features: [
      {
        title: 'Multiple image pairs per case',
        description: 'Add unlimited before/after pairs per case — multiple angles, stages or sessions — each with its own label.',
        icon: 'fa-solid fa-layer-group',
        tier: 'pro',
      },
      {
        title: 'Treatment overview details',
        description: 'Capture gender, age, recovery, duration, results and procedure type, shown as clean stat tiles.',
        icon: 'fa-solid fa-clipboard-list',
        tier: 'pro',
      },
      {
        title: 'Rich case descriptions',
        description: 'A full editor for an "About this case" write-up with formatting and media.',
        icon: 'fa-solid fa-pen-to-square',
        tier: 'pro',
      },
      {
        title: 'Image cropping tool',
        description: 'Crop uploads to a consistent size right in the editor for a tidy, uniform grid.',
        icon: 'fa-solid fa-crop-simple',
        tier: 'both',
      },
    ],
  },
  {
    id: 'protection',
    title: 'Protection & Privacy',
    description: 'Built for sensitive medical imagery and compliant practices.',
    icon: 'fa-solid fa-shield-halved',
    features: [
      {
        title: 'Image watermarking',
        description:
          'Apply a text or logo watermark with 9 positions, opacity, size and padding. Originals are never modified — watermarked copies are created.',
        icon: 'fa-solid fa-stamp',
        tier: 'pro',
      },
      {
        title: 'Bulk watermark tools',
        description: 'Auto-apply on save, plus bulk apply, remove-all, clear-&-reapply and a test preview.',
        icon: 'fa-solid fa-wand-magic-sparkles',
        tier: 'pro',
      },
      {
        title: 'Sensitive-content consent overlay',
        description:
          'Gate the gallery behind a customizable consent notice that can remember the visitor’s choice.',
        icon: 'fa-solid fa-eye-slash',
        tier: 'pro',
      },
      {
        title: 'Image protection',
        description: 'Deter casual right-click saving and image dragging on the gallery and modal.',
        icon: 'fa-solid fa-lock',
        tier: 'pro',
      },
    ],
  },
  {
    id: 'embed',
    title: 'Embedding & Developers',
    description: 'Drop galleries anywhere and integrate with your stack.',
    icon: 'fa-solid fa-code',
    features: [
      {
        title: 'Gallery shortcode',
        description: 'Embed the full gallery anywhere with [medbeafgallery] and a few simple attributes.',
        icon: 'fa-solid fa-cube',
        tier: 'both',
      },
      {
        title: 'Category carousel shortcode',
        description: 'Show a sliding carousel of a category with [mba_category_carousel] (autoplay, loop, navigation).',
        icon: 'fa-solid fa-images',
        tier: 'pro',
      },
      {
        title: 'Single-case embed',
        description: 'Feature one case inline anywhere with [mba_case id="123"], including its treatment overview.',
        icon: 'fa-solid fa-id-card',
        tier: 'pro',
      },
      {
        title: 'Call-to-action button',
        description: 'Add a "Book consultation" button inside the case modal, linked wherever you like.',
        icon: 'fa-solid fa-calendar-check',
        tier: 'pro',
      },
      {
        title: 'REST API',
        description: 'Gallery and category data is exposed over a clean REST API for custom integrations.',
        icon: 'fa-solid fa-plug',
        tier: 'both',
      },
    ],
  },
];
