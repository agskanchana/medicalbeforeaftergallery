// The six reviews of the free plugin on WordPress.org, quoted word for word (spacing and
// punctuation as written), with the review title, the name WordPress.org shows and a link
// to each review. All six are 5-star reviews. Read from wordpress.org on 2026-11-23.
// The anonymised account shows as "anonymized-23354817" on WordPress.org; it is credited as
// "Anonymous User".

export interface Testimonial {
  title: string;
  quote: string;
  name: string;
  url: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
  {
    title: 'Professional, Secure, and User-Friendly Before-After Gallery Plugin for Medical',
    quote:
      'Medical Before After Gallery is an excellent solution for healthcare professionals and clinics looking to showcase patient transformations with before-and-after images. The plugin is easy to install and configure, and its intuitive interface makes gallery creation straightforward, even for non-technical users.',
    name: 'dias2025',
    url: 'https://wordpress.org/support/topic/professional-secure-and-user-friendly-before-after-gallery-plugin-for-medical/',
    stars: 5,
  },
  {
    title: 'Best Before/After Plugin I’ve Tried',
    quote:
      'Really happy with this plugin! I run a small clinic and needed a clean way to show before-and-after results. Setup was super easy, the slider looks professional, and it works great on mobile too. Exactly what I was looking for.',
    name: 'Anonymous User',
    url: 'https://wordpress.org/support/topic/best-before-after-plugin-ive-tried/',
    stars: 5,
  },
  {
    title: 'Best and most secure medical before–after plugin',
    quote:
      'I recently tried the Medical Before After Gallery plugin, and I’m really impressed with how well it works. The setup was very simple, and the slider looks clean, modern, and professional. It’s responsive on all devices and adds real value to medical websites by clearly showcasing before-and-after results. Definitely worth recommending!❤️',
    name: 'janith1997',
    url: 'https://wordpress.org/support/topic/best-and-most-secure-medical-before-after-plugin/',
    stars: 5,
  },
  {
    title: 'Love it !!',
    quote:
      'I love how it displays on mobile , way it shows before afters with split view , before only view and after only view. just love this plugin',
    name: 'alex7087',
    url: 'https://wordpress.org/support/topic/love-it-4303/',
    stars: 5,
  },
  {
    title: 'Most complete before and after gallery tool',
    quote:
      'This is by far the best WordPress before and after image tool i found on the internet. Easy to use, reliable, and low impact on site.',
    name: 'yourguru16',
    url: 'https://wordpress.org/support/topic/most-complete-before-and-after-gallery-tool/',
    stars: 5,
  },
  {
    title: 'Love the modal feature',
    quote: 'Love the modal feature and category navigation',
    name: 'sandyl1991',
    url: 'https://wordpress.org/support/topic/love-the-modal-feature/',
    stars: 5,
  },
];
