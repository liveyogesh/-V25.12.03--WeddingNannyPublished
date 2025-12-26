
import { CityData } from '../../types.ts';

const COMMON_FAQS = [
  {
    question: "What is the nanny-to-child ratio?",
    answer: "We maintain a strict ratio of 1:4 for under 3 years and 1:6 for 3+. Infant care uses more staff."
  },
  {
    question: "What is included in the 'Custom Activity Zone'?",
    answer: "Professional setup/takedown, curated games, sensory play, craft supplies and themed decorations matching the event decor."
  },
  {
    question: "When should I book?",
    answer: "We recommend booking 3–6 months in advance for peak dates to ensure availability and planning time."
  }
];

export const hyderabadData: CityData = {
  id: 'hyderabad',
  name: 'Hyderabad',
  layout: ['hero', 'estimate-calculator', 'testimonials', 'services', 'trust', 'wedding-reality', 'how-it-works', 'packages', 'package-comparison', 'local-insights', 'faq', 'contact', 'about', 'locations-map-pointer', 'partners'],
  hero: {
    title: "Enjoy Your Wedding in Hyderabad. We’ll Take Care of the Little Ones.",
    subtitle: "On-demand childcare and supervised kids' areas for Hyderabad weddings. Stress-free ceremonies for parents in Jubilee Hills, Banjara Hills, and beyond.",
    imageAlt: "Kids playing in supervised kids corner Hyderabad",
    pillText: "PREMIER EVENT CHILDCARE 🇮🇳"
  },
  trust: {
    title: "Why Parents in Hyderabad Trust Us",
    description: "Child safety is at the heart of everything we do. We bring high-end childcare standards to Hyderabad's elite wedding venues."
  },
  testimonials: [
    {
      text: "Our Mehendi ran late in Jubilee Hills — the kid's corner kept our little guests engaged and we could enjoy the night.",
      author: "Priya & Raj",
      location: "Jubilee Hills",
      rating: 5
    }
  ],
  faqs: COMMON_FAQS,
  localInsights: {
    title: "Why Hyderabad trusts The Wedding Nanny",
    content: [
      "Hyderabad weddings mix long evenings and cosmopolitan venues. We design discreet kids' corners that fit into popular local venues—from Jubilee Hills homes to large banquet halls in HITEC City."
    ]
  },
  partners: true
};
