
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

export const delhiNcrData: CityData = {
  id: 'delhi-ncr',
  name: 'Delhi & NCR',
  layout: ['hero', 'services', 'trust', 'estimate-calculator', 'packages', 'package-comparison', 'wedding-reality', 'how-it-works', 'testimonials', 'faq', 'contact', 'about', 'locations-map-pointer', 'partners'],
  hero: {
    title: "Enjoy Your Wedding in Delhi & NCR. We’ll Take Care of the Little Ones.",
    subtitle: "On-demand childcare and supervised kids’ areas for weddings across Delhi, Noida, Gurugram, Faridabad, and the wider NCR region.",
    imageAlt: "Kids playing in supervised kids corner Delhi",
    pillText: "PREMIER EVENT CHILDCARE 🇮🇳"
  },
  trust: {
    title: "Why Parents in Delhi & NCR Trust Us",
    description: "Child safety is at the heart of everything we do. We follow strict vetting and event-ready supervision standards for the fast-paced NCR wedding scene."
  },
  testimonials: [
    {
      text: "The childcare setup worked seamlessly with our planner and venue timelines. Everything was handled professionally.",
      author: "Parent",
      location: "Delhi-NCR",
      rating: 5
    }
  ],
  faqs: COMMON_FAQS,
  partners: true
};
