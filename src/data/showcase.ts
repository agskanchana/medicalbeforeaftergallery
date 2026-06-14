import { site } from './site';

// Visual feature showcase (alternating image + text). Images are placeholders in
// /public/images/features/ — replace them with real screenshots. `preview` links to a live view.
export interface ShowcaseItem {
  title: string;
  description: string;
  points: string[];
  image: string;
  imageAlt: string;
  preview: string;
  previewLabel: string;
  tier: 'both' | 'pro';
}

export const showcase: ShowcaseItem[] = [
  {
    title: 'Interactive before & after slider',
    description:
      'Let visitors drag to reveal the transformation. The comparison slider feels natural on desktop and touch — and you can open each case in split, before-only, after-only or side-by-side views.',
    points: ['Smooth drag & keyboard control', 'Multiple view modes', 'Looks great on every device'],
    image: 'https://res.cloudinary.com/ekwa/image/upload/v1781457158/modal-view_hushh9.jpg',
    imageAlt: 'Interactive before and after comparison slider',
    preview: site.demoUrl,
    previewLabel: 'See it in the live demo',
    tier: 'both',
  },
  {
    title: 'Masonry layout & redesigned modal',
    description:
      'A premium, Pinterest-style gallery with a click-to-open filter drawer and an immersive case modal that includes a Treatment Overview panel and an “About this case” write-up.',
    points: ['Pinterest-style cards', 'Filter drawer & rich case modal', 'Optional dark mode'],
    image: '/images/features/masonry.png',
    imageAlt: 'Masonry gallery layout with redesigned case modal',
    preview: site.demoUrl,
    previewLabel: 'Explore the masonry demo',
    tier: 'pro',
  },
  {
    title: 'Smart filtering, search & sort',
    description:
      'Help patients find results relevant to them with six built-in filters (plus unlimited custom ones), instant search, and sort — all shareable through the URL with deep-linking.',
    points: ['Gender, age, procedure & custom filters', 'Instant search & sort', 'Shareable filtered views'],
    image: '/images/features/filtering.png',
    imageAlt: 'Gallery filtering, search and sort controls',
    preview: site.demoUrl,
    previewLabel: 'Try the filters live',
    tier: 'pro',
  },
  {
    title: 'Image annotations & hotspots',
    description:
      'Drop numbered markers directly on your images to highlight exactly what changed. Each hotspot carries a title and note, and visitors reveal them on hover or tap.',
    points: ['Up to 30 markers per image', 'Per-image-pair annotations', 'Hover or tap to reveal'],
    image: '/images/features/annotations.png',
    imageAlt: 'Numbered annotation hotspots on a before and after image',
    preview: site.demoUrl,
    previewLabel: 'See annotations in action',
    tier: 'pro',
  },
  {
    title: 'Watermarking & protection',
    description:
      'Protect your work with a text or logo watermark in nine positions — your originals are never modified. Add a sensitive-content consent overlay for responsible presentation.',
    points: ['Text or logo watermark', 'Originals never touched', 'Consent overlay for sensitive content'],
    image: '/images/features/watermarking.png',
    imageAlt: 'Watermark settings and a watermarked gallery image',
    preview: site.demoUrl,
    previewLabel: 'View a protected gallery',
    tier: 'pro',
  },
];
