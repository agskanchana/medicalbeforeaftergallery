// Specialty pages (/for/<slug>/): what the plugin does for each kind of practice.
// Facts only, taken from the plugins: the setup wizard's practice types and their starter
// categories (Pro includes/pro-setup-wizard.php), the built-in category icons
// (includes/pro-category-icons.php), the Find by area figures (includes/pro-discovery.php)
// and the readmes. Demo links are paths from src/data/demos.ts; a link is only shown while
// that demo page passes its check (src/utils/demos.ts).

export interface SpecialtyPoint {
  title: string;
  text: string;
  tier: 'free' | 'pro';
  docs?: string;
}

export interface Specialty {
  slug: string;
  /** Short name, as in "for {name}". */
  name: string;
  /** Font Awesome icon class. */
  icon: string;
  title: string;
  description: string;
  lead: string;
  /** The setup wizard's practice type and its suggested starter categories. */
  wizard: { practice: string; categories: string[] };
  /** Built-in category icons that fit this practice (names as the icon picker shows them). */
  icons: string[];
  /** Find by area: the figures and areas that fit. */
  areas: string;
  points: SpecialtyPoint[];
  /** Demo paths, in order of relevance. */
  demos: string[];
}

export const specialties: Specialty[] = [
  {
    slug: 'dental',
    name: 'dental practices',
    icon: 'fa-solid fa-tooth',
    title: 'Before and after gallery for dental practices',
    description:
      'Smile makeovers, implants, veneers, whitening and orthodontics: a before and after gallery for dental practices on WordPress, free with a Pro add-on.',
    lead: 'Show smile makeovers, implants, veneers, whitening and orthodontic results on your own WordPress site — with a comparison slider in the free plugin, and dental icons, stacked smile cards and a smile map in Pro.',
    wizard: { practice: 'Dental', categories: ['Smile makeovers', 'Dental implants', 'Veneers', 'Teeth whitening', 'Orthodontics'] },
    icons: [
      'Teeth', 'Smile', 'Smile makeover', 'Teeth whitening', 'Dental implants', 'Crowns', 'Veneers', 'Bonding', 'Bridges',
      'Dentures', 'Braces', 'Clear aligners', 'Retainers', 'Root canal', 'Fillings', 'Extractions', 'Gums',
      'Cleaning and hygiene', 'Check-up', 'X-ray', 'Children’s dentistry', 'Jaw and TMJ',
    ],
    areas: 'The Smile figure has a “Teeth / smile” area; the Face figure adds lips and chin & jaw.',
    points: [
      { title: 'Comparison slider', text: 'Visitors drag between the before and after smile, or switch to Before or After.', tier: 'free', docs: '/docs/comparison-and-labels/' },
      { title: 'Doctor cards', text: 'Name the dentist who treated each case, with photo, credentials and location.', tier: 'free', docs: '/docs/doctors/' },
      { title: 'Stacked cards', text: 'Before above after, both whole — a card style meant for wide photos such as smiles.', tier: 'pro', docs: '/docs/layouts/' },
      { title: 'A Dental icon set', text: '22 dental icons for the Icon chips and Area, then treatment category styles.', tier: 'pro', docs: '/docs/category-styles-and-icons/' },
      { title: 'Progress timeline', text: 'Dated photos for each stage of a longer treatment, such as aligners or braces.', tier: 'pro', docs: '/docs/case-windows/#progress-timeline' },
      { title: 'Cases on treatment pages', text: 'Put one case on your veneers page with [mba_case], or a row of implant cases with the category carousel.', tier: 'pro', docs: '/docs/single-case-embed/' },
    ],
    demos: ['/pro-demos/card-stacked/', '/pro-demos/icon-chips/', '/pro-demos/find-by-area/', '/pro-demos/category-carousel/', '/pro-demos/single-case-embed/', '/free/'],
  },
  {
    slug: 'plastic-surgery',
    name: 'plastic surgery practices',
    icon: 'fa-solid fa-user-doctor',
    title: 'Before and after gallery for plastic surgery practices',
    description:
      'Face, nose, breast and body contouring results in a before and after gallery for plastic surgeons on WordPress: several angles per case, a body map, doctor portfolios and a photo-by-photo sensitive-content notice.',
    lead: 'Present face, nose, breast and body results case by case: several angles per case, a face and body map for visitors who don’t know procedure names, a doctor for every case, and photos that stay blurred until a visitor chooses to see them.',
    wizard: { practice: 'Plastic surgery', categories: ['Face', 'Nose', 'Breast', 'Body contouring'] },
    icons: ['Face', 'Face profile', 'Nose', 'Eyelids and lashes', 'Brows', 'Chin and jaw', 'Neck', 'Ears', 'Breast', 'Tummy', 'Buttocks', 'Arms', 'Legs and thighs', 'Body contouring', 'Surgery'],
    areas: 'Face: nose, eyes & brows, cheeks, chin & jaw, ears, neck. Body front and back: chest / breast, abdomen, waist / flanks, arms, hips, thighs, back, buttocks.',
    points: [
      { title: 'Several angles per case', text: 'For example front and side views of one case, each a before/after pair.', tier: 'pro', docs: '/docs/creating-a-case/' },
      { title: 'Find by area', text: 'Visitors tap the nose, chest or abdomen on a map and see those cases.', tier: 'pro', docs: '/docs/find-by-area-and-help-me-choose/' },
      { title: 'Photo-by-photo notice', text: 'For graphic results: each photo blurred with its own Show button, the page still readable.', tier: 'pro', docs: '/docs/photo-protection/' },
      { title: 'Doctor portfolios', text: 'Visitors pick a surgeon and see that surgeon’s treatments and results.', tier: 'pro', docs: '/docs/page-structures-and-collections/' },
      { title: 'Comparison desk', text: 'Before and after side by side with a linked magnifier for fine detail.', tier: 'pro', docs: '/docs/case-windows/' },
      { title: 'Watermarks', text: 'Your practice’s name or logo on every gallery photo; the originals stay untouched.', tier: 'pro', docs: '/docs/watermarking/' },
    ],
    demos: ['/pro-demos/angles/', '/pro-demos/find-by-area/', '/pro-demos/sensitive-photos-notice/', '/pro-demos/doctor-portfolios/', '/pro-demos/window-comparison-desk/', '/pro-demos/automatic-watermarks/'],
  },
  {
    slug: 'dermatology',
    name: 'dermatology practices',
    icon: 'fa-solid fa-hand-sparkles',
    title: 'Before and after gallery for dermatology practices',
    description:
      'Acne, scars, pigmentation and skin rejuvenation results in a before and after gallery for dermatology practices on WordPress, with zoom, a magnifier, case filters and a guided search.',
    lead: 'Skin results are about detail and time. Let visitors zoom into the skin, compare before and after with a linked magnifier, follow a treatment course stage by stage, and filter by recovery time.',
    wizard: { practice: 'Dermatology & skin', categories: ['Acne', 'Scars', 'Skin rejuvenation', 'Pigmentation'] },
    icons: ['Skin', 'Rejuvenation', 'Skin layers', 'Acne', 'Pigmentation', 'Scars', 'Lines and wrinkles', 'Mole and skin check', 'Veins', 'Excessive sweating', 'Laser', 'Microneedling', 'Serum', 'Skincare products'],
    areas: 'Face: whole face / skin, forehead, cheeks; body areas for treatments elsewhere, such as veins on the lower legs.',
    points: [
      { title: 'Zoom and a linked magnifier', text: 'Zoom into fine detail; the Comparison desk shows the same spot before and after.', tier: 'pro', docs: '/docs/comparison-and-labels/' },
      { title: 'Progress timeline', text: 'A dated photo after each session or stage, shown on a timeline under the photo.', tier: 'pro', docs: '/docs/case-windows/#progress-timeline' },
      { title: 'Case filters', text: 'Filter by gender, age range, recovery time, single or multiple sessions, or your own filters.', tier: 'pro', docs: '/docs/case-filters/' },
      { title: 'Help me choose', text: 'A short guided search with your own questions, for visitors who don’t know treatment names.', tier: 'pro', docs: '/docs/find-by-area-and-help-me-choose/' },
      { title: 'Skin icons', text: 'Acne, pigmentation, scars, lines and wrinkles, veins and more for your category buttons.', tier: 'pro', docs: '/docs/category-styles-and-icons/' },
      { title: 'Blurred photo background', text: 'Close-ups keep their shape: a soft, blurred copy fills the space instead of black bars.', tier: 'free', docs: '/docs/case-windows/' },
    ],
    demos: ['/pro-demos/case-viewer-zoom/', '/pro-demos/window-comparison-desk/', '/pro-demos/custom-case-filters/', '/pro-demos/help-me-choose/', '/pro-demos/filter-bar/', '/free/plain-case-window/'],
  },
  {
    slug: 'hair-restoration',
    name: 'hair restoration clinics',
    icon: 'fa-solid fa-scissors',
    title: 'Before and after gallery for hair restoration clinics',
    description:
      'Hair transplant and hairline results with dated progress photos: a before and after gallery for hair restoration clinics on WordPress, with a progress timeline in every case window and on any page.',
    lead: 'Hair restoration results grow over months. Add a dated photo for each stage — for example 6 weeks, 3 months and 1 year — and visitors step through them on a timeline, in the gallery and on your treatment pages.',
    wizard: { practice: 'Hair restoration', categories: ['Hair transplant', 'Hairline restoration', 'Non-surgical hair treatment'] },
    icons: ['Hair', 'Hair transplant', 'Beard', 'Comb', 'Scissors', 'PRP', 'Injection', 'Medication'],
    areas: 'Face: the scalp / hair area.',
    points: [
      { title: 'Progress timeline', text: 'Real, dated stage photos, never blended or invented — in every case window style.', tier: 'pro', docs: '/docs/case-windows/#progress-timeline' },
      { title: 'Stages on treatment pages', text: '[mba_case] shows one case with its stages under the photo on any page.', tier: 'pro', docs: '/docs/single-case-embed/' },
      { title: 'Progress badge', text: 'Cards of cases with recorded stages can show a Progress badge.', tier: 'pro', docs: '/docs/layouts/' },
      { title: 'Several angles per case', text: 'For example the hairline and the crown of one case, each a before/after pair.', tier: 'pro', docs: '/docs/creating-a-case/' },
      { title: 'Comparison slider and doctor cards', text: 'The free plugin’s case window, with the surgeon who treated the case.', tier: 'free', docs: '/docs/doctors/' },
      { title: 'Hair icons', text: 'Hair, hair transplant, beard and PRP icons for your category buttons.', tier: 'pro', docs: '/docs/category-styles-and-icons/' },
    ],
    demos: ['/pro-demos/progress-stages/', '/pro-demos/single-case-stages/', '/pro-demos/card-extras/', '/pro-demos/window-cinema/', '/pro-demos/doctors/', '/free/'],
  },
  {
    slug: 'med-spa',
    name: 'med spas',
    icon: 'fa-solid fa-spa',
    title: 'Before and after gallery for med spas and aesthetic clinics',
    description:
      'Injectables, laser, skin and body treatments in a before and after gallery for med spas on WordPress: treatment icons, a Spa style, a treatment hub and a guided search.',
    lead: 'A med spa offers many treatments. Let visitors start from a treatment card, an area of the face or body, or a few questions — and give the gallery a calm look that fits your brand.',
    wizard: { practice: 'Med spa & aesthetics', categories: ['Injectables', 'Laser treatments', 'Skin treatments', 'Body treatments'] },
    icons: ['Injection', 'Microneedling', 'Laser', 'Energy device', 'Radiofrequency and ultrasound', 'Cooling and fat freezing', 'Serum', 'PRP', 'IV therapy', 'Weight-loss injections', 'Hormone therapy', 'Spa and massage', 'Lips', 'Lines and wrinkles'],
    areas: 'Face: forehead, eyes & brows, cheeks, lips, chin & jaw, neck, whole face / skin; body areas for body treatments.',
    points: [
      { title: 'Treatment hub', text: 'A card for each treatment with a before/after pair and a “View results” link.', tier: 'pro', docs: '/docs/page-structures-and-collections/' },
      { title: 'Area, then treatment', text: 'Visitors pick an area by its icon, then one of its treatments.', tier: 'pro', docs: '/docs/category-styles-and-icons/' },
      { title: 'Treatment and wellness icons', text: 'Injection, laser, microneedling, IV therapy, hormone therapy, spa and more.', tier: 'pro', docs: '/docs/category-styles-and-icons/' },
      { title: 'Spa style and templates', text: 'Style presets such as Spa (sage and cream, soft rounded cards) and six design templates.', tier: 'pro', docs: '/docs/design-templates-and-preview/' },
      { title: 'Help me choose', text: 'A short guided search with your own questions and answers.', tier: 'pro', docs: '/docs/find-by-area-and-help-me-choose/' },
      { title: 'Hover-reveal cards', text: 'Each card wipes from the before photo to the after photo.', tier: 'free', docs: '/docs/layouts/' },
    ],
    demos: ['/pro-demos/treatment-hub/', '/pro-demos/area-then-treatment/', '/pro-demos/style-spa/', '/pro-demos/help-me-choose/', '/pro-demos/treatment-cards/', '/free/hover-reveal-cards/'],
  },
  {
    slug: 'weight-loss',
    name: 'weight loss clinics',
    icon: 'fa-solid fa-weight-scale',
    title: 'Before and after gallery for weight loss clinics',
    description:
      'Medical weight loss, bariatric surgery and body contouring results with dated progress photos: a before and after gallery for weight loss clinics on WordPress.',
    lead: 'Weight loss happens over months. Show each stage with a dated photo, let visitors find results by body area, compare two cases side by side, and keep body photos blurred until a visitor chooses to see them.',
    wizard: { practice: 'Weight loss', categories: ['Medical weight loss', 'Bariatric surgery', 'Body contouring'] },
    icons: ['Weight', 'Measuring tape', 'Body contouring', 'Tummy', 'Weight-loss injections', 'Medication', 'Cooling and fat freezing', 'Surgery'],
    areas: 'Body front and back: abdomen, waist / flanks, arms, hips, thighs, back, buttocks.',
    points: [
      { title: 'Progress timeline', text: 'A dated photo for each stage — month by month — on a timeline under the photo.', tier: 'pro', docs: '/docs/case-windows/#progress-timeline' },
      { title: 'Find by area', text: 'Visitors tap the abdomen, waist or thighs on the body map.', tier: 'pro', docs: '/docs/find-by-area-and-help-me-choose/' },
      { title: 'Compare two cases', text: 'Visitors tick two cases and see their photos and recorded details side by side.', tier: 'pro', docs: '/docs/compare-two-cases/' },
      { title: 'Photo-by-photo notice', text: 'Body photos stay blurred with their own Show button until the visitor chooses.', tier: 'pro', docs: '/docs/photo-protection/' },
      { title: 'Collections', text: 'Hand-picked rows of cases, such as “Results over time”.', tier: 'pro', docs: '/docs/page-structures-and-collections/' },
      { title: 'Doctor cards', text: 'Name the doctor who treated each case.', tier: 'free', docs: '/docs/doctors/' },
    ],
    demos: ['/pro-demos/progress-stages/', '/pro-demos/find-by-area/', '/pro-demos/compare-two-cases/', '/pro-demos/sensitive-photos-notice/', '/pro-demos/collections/', '/pro-demos/body-map-embed/'],
  },
];
