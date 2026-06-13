// FAQ content, authored from the code-verified feature inventory (Appendix A).
// Answers are plain text/inline HTML; rendered into an accordion and FAQPage JSON-LD.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'What’s the difference between the Free and Pro versions?',
    answer:
      'The free plugin includes the interactive before/after slider, a responsive grid gallery, categories, image cropping and customizable colors — up to 12 cases and 4 categories. Pro removes those limits (unlimited cases & categories) and adds multiple image pairs per case, smart and custom filters, search & sort, a masonry layout with a redesigned modal, dark mode, watermarking, image annotations, a sensitive-content consent overlay, and extra shortcodes.',
  },
  {
    question: 'Do I need the free plugin to use Pro?',
    answer:
      'Yes. The Pro add-on extends the free “Medical Before After Gallery” plugin, so the free plugin must be installed and active. Install the free version from WordPress.org, then add the Pro add-on and activate your license.',
  },
  {
    question: 'How much does Pro cost?',
    answer:
      'Pro is a one-time payment of $99 for a lifetime license, which includes ongoing updates. There’s no recurring subscription, and it’s backed by a 30-day money-back guarantee.',
  },
  {
    question: 'Will watermarking change my original images?',
    answer:
      'No. Watermarking never modifies your original uploads — the plugin generates separate watermarked copies and serves those in the gallery. You can apply, remove, or clear-and-reapply watermarks at any time, and there’s a test preview before you commit.',
  },
  {
    question: 'Is the plugin HIPAA-friendly for sensitive before/after photos?',
    answer:
      'The plugin is designed with sensitive medical imagery in mind. Pro includes a customizable consent overlay that gates the gallery behind a notice (and can remember the visitor’s choice), plus image-protection deterrents. As always, you’re responsible for obtaining proper patient consent and following your jurisdiction’s privacy regulations before publishing any images.',
  },
  {
    question: 'Are there any server requirements for watermarking?',
    answer:
      'Watermarking uses your server’s image library — either Imagick or GD, both of which ship with most WordPress hosts. The plugin auto-detects the best available library and includes a built-in health check so you know it’s ready.',
  },
  {
    question: 'Can I show more than one gallery on a page?',
    answer:
      'Yes. Use the [medbeafgallery] shortcode for the full gallery, [mba_category_carousel] for a sliding carousel of a category, and [mba_case id="123"] to feature a single case inline. You can place multiple carousels and single-case embeds on the same page.',
  },
  {
    question: 'Does it work with my theme and page builder?',
    answer:
      'Yes. The gallery is theme-resilient and renders consistently inside virtually any WordPress theme. Because everything is shortcode-based, it works with Gutenberg, Elementor, Divi, WPBakery and other builders via their shortcode blocks/widgets.',
  },
  {
    question: 'Which practices is this built for?',
    answer:
      'It’s ideal for plastic surgery, dermatology, cosmetic dentistry, medical spas, weight-loss, hair restoration and any aesthetic or medical practice that showcases before & after results.',
  },
  {
    question: 'What happens to my galleries if I stop renewing?',
    answer:
      'Pro is a lifetime license, so there’s nothing to renew — you keep using the version you have, with the updates included. If you ever deactivate Pro, your cases remain; the gallery simply reverts to the free plugin’s limits and features.',
  },
];
