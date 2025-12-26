
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

export const balliaData: CityData = {
  id: 'ballia',
  name: 'Ballia',
  layout: ['hero', 'local-insights', 'wedding-reality', 'trust', 'services', 'estimate-calculator', 'packages', 'package-comparison', 'testimonials', 'how-it-works', 'faq', 'contact', 'about', 'locations-map-pointer', 'partners'],
  hero: {
    title: "Enjoy Your Wedding in Ballia. We’ll Take Care of the Little Ones.",
    subtitle: "On-demand childcare and supervised kids’ areas for Indian weddings. Vetted caregivers, clear safety procedures, and engaging activities to keep children happy while parents enjoy the celebration.",
    imageAlt: "Kids playing in supervised kids corner Ballia",
    pillText: "PREMIER EVENT CHILDCARE 🇮🇳"
  },
  trust: {
    title: "Why Parents in Ballia Trust Us",
    description: "Child safety is at the heart of everything we do. We operate as an on-demand, optional add-on service for weddings, and our families trust us because we follow strict vetting, training, and event-ready supervision standards."
  },
  testimonials: [
    {
      text: "Late-night wedding functions ke dauraan bachchon ke liye shaant aur safe space milna parents ke liye bahut rahat bhara tha.",
      author: "Parent",
      location: "Ballia, UP",
      rating: 5
    },
    {
      text: "Guests apne bachchon ke saath aaye the, aur caregivers ne khana, khel aur rest sab smoothly manage kiya.",
      author: "Family member",
      location: "Ballia, UP",
      rating: 5
    }
  ],
  faqs: [
    {
      question: "Do you travel to villages near Ballia for home weddings?",
      answer: "Yes — we serve Ballia and nearby districts; travel charges depend on distance and logistics."
    },
    ...COMMON_FAQS
  ],
  localInsights: {
    title: "Serving Ballia & nearby districts",
    content: [
      "Ballia hosts many family-centered, multi-day weddings. We bring structured childcare with locally-aware teams that manage travel and setup in semi-urban and rural venues.",
      "The Multi-Day package is particularly useful here — families appreciate a consistent lead nanny across ceremonies for predictable routines and smoother mealtimes."
    ]
  },
  partners: true
};
