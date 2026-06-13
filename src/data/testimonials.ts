// NOTE: Replace these with real, attributable testimonials when available.
// Photos are stock images; swap `image` for real headshots or remove.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'MBA Gallery transformed how we showcase our procedures. Patients are more confident when they can see real results, and the interactive slider makes a huge difference.',
    name: 'Dr. Sarah Johnson',
    role: 'Plastic Surgeon',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'The multiple image pairs and treatment overview have been a game-changer for our dental practice. We can now present a full case, not just one photo.',
    name: 'Dr. Michael Chen',
    role: 'Cosmetic Dentist',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Setup took minutes and the filtering makes it easy for prospective patients to find results relevant to them. Exactly what our website needed.',
    name: 'Dr. Rebecca Martinez',
    role: 'Dermatologist',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&q=80',
  },
];

// Honest value-prop highlights shown under the hero (no fabricated metrics).
export const stats: { number: string; label: string }[] = [
  { number: 'Free', label: 'Core plugin on WordPress.org' },
  { number: 'Unlimited', label: 'Cases & categories with Pro' },
  { number: '30-day', label: 'Money-back guarantee' },
];
