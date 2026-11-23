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
    period: `forever · version ${site.freeVersion}`,
    blurb: 'A complete before & after gallery for a small set of cases.',
    features: [
      'Up to 12 cases and 4 categories',
      'Comparison slider with Slider, Before and After views',
      'Hover-reveal or side-by-side cards',
      'Doctors, with a doctor card in each case',
      'Four category styles and a drag-and-drop category manager',
      'Image cropping, brand colour, blurred photo background',
      'Hosted free on WordPress.org',
    ],
    cta: { label: 'Download free', type: 'free' },
  },
  {
    name: 'Pro',
    price: `$${site.proPrice}`,
    period: `one-time · lifetime license · version ${site.proVersion}`,
    blurb: 'Unlimited cases and every Pro feature. Pay once.',
    featured: true,
    badge: 'One-time payment',
    features: [
      'Everything in Free, plus:',
      'Unlimited cases, categories and photo pairs',
      'Seven more layouts, four more card styles, presets and six design templates',
      'Eight more category styles, with category icons',
      'Cinema, Drawer, Comparison desk and Case story windows',
      'Progress timeline with dated stage photos',
      'Single-case embed, category carousel and body map',
      'Treatment hub, concerns, doctor portfolios, collections, compare two cases',
      'Watermarks, photo-by-photo sensitive notice, image protection',
      'Setup wizard and ready-to-publish checks',
      'Priority email support and lifetime updates',
    ],
    cta: { label: 'Get Pro', type: 'pro' },
  },
];
