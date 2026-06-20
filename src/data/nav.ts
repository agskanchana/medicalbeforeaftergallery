// Single source for primary navigation. Used by Header and Footer.

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavLink[] = [
  { label: 'Features', href: '/features/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Docs', href: '/docs/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Demo', href: '/demo/' },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'Live demo', href: '/demo/' },
      { label: 'Download free', href: 'https://wordpress.org/plugins/medical-before-after-gallery/', external: true },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Service', href: '/terms/' },
    ],
  },
];
