// Free vs Pro comparison rows (Appendix A.3). free/pro = available in that tier.

export interface ComparisonRow {
  feature: string;
  free: boolean;
  pro: boolean;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Before/after comparison slider', free: true, pro: true },
  { feature: 'Responsive grid gallery', free: true, pro: true },
  { feature: 'Categories & category carousel', free: true, pro: true },
  { feature: 'Image cropping tool', free: true, pro: true },
  { feature: 'Customizable brand color', free: true, pro: true },
  { feature: 'Before/after view switching', free: true, pro: true },
  { feature: 'Modal case navigation', free: true, pro: true },
  { feature: 'REST API', free: true, pro: true },
  { feature: 'Number of cases', free: false, pro: true }, // 12 vs unlimited — rendered specially
  { feature: 'Number of categories', free: false, pro: true },
  { feature: 'Multiple image pairs per case', free: false, pro: true },
  { feature: 'Subcategories', free: false, pro: true },
  { feature: 'Smart & custom filters (age, gender, procedure…)', free: false, pro: true },
  { feature: 'Search & sort', free: false, pro: true },
  { feature: 'Deep-linking & shareable views', free: false, pro: true },
  { feature: 'Masonry layout + redesigned modal', free: false, pro: true },
  { feature: 'Dark mode', free: false, pro: true },
  { feature: 'Image watermarking (text / logo)', free: false, pro: true },
  { feature: 'Image protection', free: false, pro: true },
  { feature: 'Image annotations / hotspots', free: false, pro: true },
  { feature: 'Sensitive-content consent overlay', free: false, pro: true },
  { feature: 'Detailed case info / Treatment Overview', free: false, pro: true },
  { feature: 'Carousel & single-case shortcodes', free: false, pro: true },
  { feature: 'Modal call-to-action button', free: false, pro: true },
  { feature: 'Priority support', free: false, pro: true },
];

// Rows where the value is a number/word rather than a simple check.
export const comparisonOverrides: Record<string, { free: string; pro: string }> = {
  'Number of cases': { free: 'Up to 12', pro: 'Unlimited' },
  'Number of categories': { free: 'Up to 4', pro: 'Unlimited' },
};
