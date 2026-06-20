// Central site configuration. One source of truth for brand, URLs and integration IDs.

export const site = {
  name: 'MBA Gallery',
  legalName: 'Medical Before After Gallery',
  shortName: 'MBA Gallery',
  domain: 'medicalbeforeaftergallery.com',
  url: 'https://medicalbeforeaftergallery.com',
  tagline: 'Before & after galleries for medical practices',
  description:
    'The before & after image gallery plugin built for medical and aesthetic practices. Interactive comparison sliders, smart filtering, watermarking and a consent overlay — free on WordPress.org, with a Pro add-on.',

  // External properties
  demoUrl: '/demo/',
  wpOrgUrl: 'https://wordpress.org/plugins/medical-before-after-gallery/',

  // Individual demo destinations shown on the /demo/ page.
  // Leave blank to render a "Coming soon" button — fill in once each demo is live.
  demos: {
    free: 'https://demo.medicalbeforeaftergallery.com/free/',
    proGrid: 'https://demo.medicalbeforeaftergallery.com/',
    proMasonry: 'https://demo.medicalbeforeaftergallery.com/masonry/',
    proCarousel: '',
  },

  // Plugin versions (kept in sync with the released plugins)
  freeVersion: '1.3.5',
  proVersion: '1.3.1',

  // Google Analytics 4
  gaId: 'G-B88DD33940',

  // Freemius checkout (Pro purchase)
  freemius: {
    productId: '25192',
    planId: '41762',
    publicKey: 'pk_63ab50ee11257018493d6818ab8db',
    productName: 'Medical Before After Gallery',
    image: 'https://medicalbeforeaftergallery.com/100-100.jpg',
  },

  // Web3Forms contact form. Replace with your real access key (free at https://web3forms.com).
  web3formsKey: 'd0b9cc7a-9553-40fa-87b4-5fab5e1508a4',

  // Pro pricing
  proPrice: 99,
  currency: 'USD',
  guaranteeDays: 30,

  social: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  },
} as const;

export type Site = typeof site;
