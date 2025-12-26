
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

export const homeData: CityData = {
  id: 'home',
  name: 'India',
  layout: ['hero', 'trust', 'wedding-reality', 'services', 'how-it-works', 'estimate-calculator', 'packages', 'package-comparison', 'testimonials', 'faq', 'contact', 'about', 'locations-map-pointer', 'partners'],
  hero: {
    title: "Enjoy Your Wedding. We’ll Take Care of the Little Ones.",
    subtitle: "On-demand childcare and supervised kids’ areas for Indian weddings. Vetted caregivers, clear safety procedures, and engaging activities to keep children happy while parents enjoy the celebration.",
    imageAlt: "Joyful Kids at Wedding (Vetted Nannies on Duty)",
    pillText: "PREMIER WEDDING CHILDCARE ACROSS INDIA 🇮🇳"
  },
  trust: {
    title: "Why Parents Trust Us",
    description: "Child safety is at the heart of everything we do. Our families trust us because we follow strict vetting, training, and supervision standards designed specifically for event environments."
  },
  testimonials: [
    {
      text: "We actually got to enjoy our Sangeet! The kids were mesmerized by the activity corner.",
      author: "Priya & Rohan S.",
      location: "Delhi",
      rating: 5
    },
    {
      text: "As a planner, I need reliability. The Wedding Nanny team was on time and discreet.",
      author: "Kavita M.",
      location: "Event Designer",
      rating: 5
    },
    {
      text: "My infant was cared for during the ceremony — the nap space was a genius addition.",
      author: "Sneha P.",
      location: "Client Parent",
      rating: 5
    }
  ],
  faqs: [
    {
      question: "Are you event organizers?",
      answer: "No. We provide professional childcare as an on-demand add-on service for weddings. We work alongside your planner or venue team to set up supervised kids’ areas, but we do not organize or manage the event."
    },
    ...COMMON_FAQS,
    {
      question: "Is Wedding Nanny available in multiple cities?",
      answer: "Yes — Delhi & NCR, Hyderabad, Ballia and expanding."
    }
  ],
  partners: true
};
