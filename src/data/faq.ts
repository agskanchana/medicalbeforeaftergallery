// FAQ for free 1.5.0 and Pro 1.6.0, written from the readmes and the plugin code.
// Answers are plain text or inline HTML; rendered into an accordion and FAQPage JSON-LD.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'What’s the difference between the free plugin and Pro?',
    answer:
      'The free plugin gives you a working gallery: the comparison slider with Slider, Before and After views, side-by-side, hover-reveal or refined cards, doctor cards, four category styles, a category manager, image cropping and a brand colour — for up to 12 cases and 4 categories. Pro removes those limits and adds the live map, Someone like you and the scroll story, more photo pairs per case, eleven more layouts, eight more category styles with icons, the Cinema, Drawer, Comparison desk and Case story windows, progress timelines, the single-case embed, carousel and body map, treatment hub, concern-first and doctor pages, compare two cases, filters and search, design templates, watermarks, the sensitive-content notice, a setup wizard and ready-to-publish checks. The <a href="/features/#comparison">comparison table</a> lists everything.',
  },
  {
    question: 'Do I need the free plugin to use Pro?',
    answer:
      'Yes. Pro is an add-on to the free “Medical Before After Gallery” plugin, which must be installed and active. Pro 1.6.0 works with free 1.3.2 and newer; doctor cards, filtering by doctor, the per-gallery shortcode options and the Design screens need free 1.5.0 or newer, so update both together.',
  },
  {
    question: 'How much does Pro cost?',
    answer:
      'Pro is a one-time payment of $99 for a lifetime license, which includes updates. There’s no subscription, and it’s backed by a 30-day money-back guarantee.',
  },
  {
    question: 'Can I see it working before I install anything?',
    answer:
      'Yes. The <a href="/demo/">live demos</a> show the main Pro and free features on their own pages with the same sample cases: you can filter, open cases, drag the slider and step through progress stages.',
  },
  {
    question: 'Will watermarks change my original photos?',
    answer:
      'No. Pro saves watermarked copies (also at thumbnail and card sizes) and shows only those; your originals stay as they are. When you change the watermark settings, the copies are brought up to date in the background, and each photo keeps its current watermark until the new one is ready. With the optional “Protect the originals” setting, visitors can only open the watermarked copies.',
  },
  {
    question: 'How does the sensitive-content notice work?',
    answer:
      'Pro offers two styles. Photo by photo blurs each case photo with its own Show button and adds one “Show all photos” line above the gallery, so the rest of the page stays readable. Whole page covers the gallery with a notice until the visitor agrees. You write the wording and choose for how many days the answer is remembered; changing the wording asks every visitor again. The photos still download in the background (blurred), so this is a courtesy to visitors, not access control.',
  },
  {
    question: 'Does it make my site HIPAA compliant?',
    answer:
      'No plugin can do that on its own. The plugin keeps patient photos on your own server (no photos or visitor data are sent to third parties) and gives you tools such as watermarks, the sensitive-content notice and image protection. You remain responsible for patient consent and for following the privacy rules that apply to your practice.',
  },
  {
    question: 'Can visitors see results over time, not only before and after?',
    answer:
      'With Pro, add a photo and a date for each stage of a case (for example 6 weeks, 3 months, 1 year). Visitors step through the stages on a timeline in the case window and in the single-case embed. The photos are the ones you took: nothing is blended or invented.',
  },
  {
    question: 'Can I put a single case on a treatment page?',
    answer:
      'Yes, with Pro’s [mba_case id="123"] shortcode. It adapts to the column it sits in, or you choose split, stacked or compact. Options include the first view, the title, the details, the booking button and the progress stages (show_stages="false" leaves them out). Dashboard → Embeds → Single Case builds the shortcode for you.',
  },
  {
    question: 'Can I show more than one gallery on a page?',
    answer:
      'Use one [medbeafgallery] gallery per page. Alongside it you can add [mba_case] single cases, [mba_category_carousel] carousels and the [mba_body_map] map; each works on its own. Two full galleries on one page do not yet filter independently.',
  },
  {
    question: 'Does it work with my theme and page builder?',
    answer:
      'Yes. Everything is placed with shortcodes, so it works in the block editor, the classic editor, Elementor, Divi, WPBakery and other builders. Pro’s cards ignore your theme’s fonts and button rules so they look the same everywhere, and you can restyle them with CSS custom properties such as --mbg-font, --mbg-accent and --mbg-card-radius.',
  },
  {
    question: 'Are there server requirements?',
    answer:
      'WordPress 5.0 or newer and PHP 7.4 or newer. Cropping and watermarks need the GD or Imagick image library, which most hosts include; the plugin tells you which one it found. “Protect the originals” blocks the original files on Apache and LiteSpeed; on nginx or IIS the media API, attachment pages and image tags are still covered, but the files stay reachable by their exact address.',
  },
  {
    question: 'Which practices is it for?',
    answer:
      'Any practice that shows before and after results: plastic surgery, dermatology, cosmetic dentistry, medical spas, weight loss, hair restoration and other aesthetic or medical clinics.',
  },
  {
    question: 'What happens to my cases if I deactivate Pro or delete the plugin?',
    answer:
      'Your cases and categories stay. Without Pro the gallery goes back to the free plugin’s features and its limits of 12 cases and 4 categories. Deleting the free plugin keeps your cases too, unless you first tick “Also delete all cases, categories and their images” under Data &amp; Uninstall.',
  },
];
