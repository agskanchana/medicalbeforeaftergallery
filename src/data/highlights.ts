// The signature designs, shown as short silent loops on the home page. The clips are cut
// from the feature video (public/video/clips/<clip>.mp4 + .webp poster). `demo` is a path
// on the demo site; a tile without a live demo page is left out (src/utils/demos.ts).

export interface Highlight {
  clip: string;
  title: string;
  text: string;
  demo: string;
  /** Tile size on wide screens: the first one leads, 'half' shares a row of two. */
  size?: 'lead' | 'half';
  alt: string;
}

export const highlights: Highlight[] = [
  { clip: 'live-map', title: 'Live map', text: 'Visitors point at the hair, the lips, the skin or the body, and the right results appear beside it at once. No treatment names needed.', demo: '/pro-demos/live-map/', size: 'lead', alt: 'A face map; pointing at the hair, the lips and the skin changes the before and after cases beside it' },
  { clip: 'someone-like-you', title: 'Someone like you', text: 'Same age, same concern: the closest result comes first.', demo: '/pro-demos/someone-like-you/', alt: 'A visitor chooses woman, 31 to 45 and skin tone, and the closest case moves to the front' },
  { clip: 'treatment-index', title: 'Treatment index', text: 'Large, quiet type. Point at a treatment and its result appears.', demo: '/pro-demos/treatment-index/', alt: 'A list of treatments in large type; the one pointed at shows its newest before and after pair' },
  { clip: 'refined-grid', title: 'Refined grid', text: 'Portrait photos without boxes, one calm line under each.', demo: '/pro-demos/refined-grid/', alt: 'A grid of portrait results turns from before to after as it scrolls' },
  { clip: 'flip-wall', title: 'Flip the whole wall', text: 'One switch turns every patient from before to after.', demo: '/pro-demos/flip-wall/', alt: 'A wall of patient photos turns from before to after in a wave' },
  { clip: 'strips', title: 'Expanding strips', text: 'Point at a face, and it opens.', demo: '/pro-demos/expanding-strips/', alt: 'Tall photo strips; the one pointed at opens into a comparison' },
  { clip: 'compare', title: 'Choose your card style', text: 'Drag, hover, switch or side by side, in every layout.', demo: '/pro-demos/card-after-first/', size: 'half', alt: 'Four cards compare before and after by dragging, hovering, switching and side by side' },
  { clip: 'navigation', title: 'Choose the navigation', text: 'A carousel, photo pills, icons, tabs or a search box.', demo: '/pro-demos/photo-pills/', size: 'half', alt: 'The same gallery with a carousel, photo pills, an icon bar, tabs and a search box' },
  { clip: 'window', title: 'Choose how a case opens', text: 'Full screen, on a comparison desk or as a story.', demo: '/pro-demos/window-cinema/', size: 'half', alt: 'A case opens full screen, on a comparison desk and as a story' },
  { clip: 'scroll-story', title: 'Scroll story', text: 'One patient’s year, told by scrolling.', demo: '/pro-demos/scroll-story/', size: 'half', alt: 'A hair transplant photo changes while a counter runs from 0 to 12 months' },
];
