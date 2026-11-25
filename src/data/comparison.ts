// Free 1.5.0 vs Pro 1.6.0. free/pro = available in that tier; rows in comparisonOverrides
// show words instead of a tick.

export interface ComparisonRow {
  feature: string;
  free: boolean;
  pro: boolean;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Number of cases', free: true, pro: true },
  { feature: 'Number of categories', free: true, pro: true },
  { feature: 'Comparison slider with Slider, Before and After views', free: true, pro: true },
  { feature: 'Hover-reveal cards', free: true, pro: true },
  { feature: 'Blurred photo background in the case window', free: true, pro: true },
  { feature: 'Doctors and doctor cards', free: true, pro: true },
  { feature: 'Category styles', free: true, pro: true },
  { feature: 'Ways photos compare on a card', free: true, pro: true },
  { feature: 'Category manager, image cropping and brand colour', free: true, pro: true },
  { feature: 'Guided case editor and Cases screen', free: true, pro: true },
  { feature: 'Shortcode options per gallery', free: true, pro: true },
  { feature: 'Multiple photo pairs (angles) per case', free: false, pro: true },
  { feature: 'Refined portrait cards', free: true, pro: true },
  { feature: 'Live map: face, body and smile beside the results', free: false, pro: true },
  { feature: 'Someone like you: the closest results first', free: false, pro: true },
  { feature: 'Flip wall, Expanding strips and Open row', free: false, pro: true },
  { feature: 'Masonry, Spotlight, Procedure rows, Editorial, Angles, Uncropped and Collections layouts', free: false, pro: true },
  { feature: 'Category icons (built-in library or your own image)', free: false, pro: true },
  { feature: 'Cinema, Drawer, Comparison desk and Case story windows; Story mode on phones', free: false, pro: true },
  { feature: 'Progress timeline with dated stage photos', free: false, pro: true },
  { feature: 'Single-case embed, scroll story, category carousel and body map', free: false, pro: true },
  { feature: 'Treatment hub, Treatment index, Concern first, Doctor portfolios', free: false, pro: true },
  { feature: 'Compare two cases', free: false, pro: true },
  { feature: 'Find by area and Help me choose', free: false, pro: true },
  { feature: 'Case filters (incl. doctor), search, sort and shareable links', free: false, pro: true },
  { feature: 'Design templates, style presets, dark mode and live preview', free: false, pro: true },
  { feature: 'Watermarks and Protect the originals', free: false, pro: true },
  { feature: 'Sensitive-content notice (photo by photo or whole page)', free: false, pro: true },
  { feature: 'Image annotations with a “What to notice” tour', free: false, pro: true },
  { feature: 'Booking button in the case window', free: false, pro: true },
  { feature: 'Setup wizard and ready-to-publish checks', free: false, pro: true },
  { feature: 'Photo tools: line-up, ghost camera, transformation reels', free: false, pro: true },
  { feature: 'Priority email support', free: false, pro: true },
];

// Rows where the value is a number or word rather than a tick.
export const comparisonOverrides: Record<string, { free: string; pro: string }> = {
  'Number of cases': { free: 'Up to 12', pro: 'Unlimited' },
  'Number of categories': { free: 'Up to 4', pro: 'Unlimited' },
  'Category styles': { free: '4', pro: '12' },
  'Ways photos compare on a card': { free: '2', pro: '6' },
};
