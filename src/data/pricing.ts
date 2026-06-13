import { site } from './site';

export interface Plan {
  name: string;
  price: string;
  period: string;
  blurb: string;
  features: string[];
  cta: { label: string; type: 'free' | 'pro' };
  featured?: boolean;
  badge?: string;
}

export const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    blurb: 'Everything you need to launch a professional before & after gallery.',
    features: [
      'Up to 12 cases & 4 categories',
      'Interactive before/after slider',
      'Responsive grid gallery & modal',
      'Category carousel navigation',
      'Image cropping tool',
      'Customizable brand color',
      'Hosted free on WordPress.org',
    ],
    cta: { label: 'Download free', type: 'free' },
  },
  {
    name: 'Pro',
    price: `$${site.proPrice}`,
    period: 'one-time · lifetime license',
    blurb: 'Unlock unlimited cases and every premium feature. Pay once, use forever.',
    featured: true,
    badge: 'Most popular',
    features: [
      'Everything in Free, plus:',
      'Unlimited cases & categories',
      'Multiple image pairs per case',
      'Masonry layout, dark mode & redesigned modal',
      'Smart, custom & searchable filters',
      'Watermarking & image protection',
      'Image annotations & consent overlay',
      'Carousel & single-case shortcodes',
      'Priority support & lifetime updates',
    ],
    cta: { label: 'Get Pro', type: 'pro' },
  },
];
