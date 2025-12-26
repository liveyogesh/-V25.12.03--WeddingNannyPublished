
import React from 'react';
import { StepItem } from '../types.ts';

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: StepItem[];
}

const DEFAULT_STEPS: StepItem[] = [
  { emoji: '📅', title: "1. Share Your Event", text: "Tell us your date, venue, and kids' count." },
  { emoji: '🧸', title: "2. Choose a Package", text: "We recommend the right care level based on your requirements." },
  { emoji: '🤝', title: "3. Meet Your Nanny", text: "We introduce your lead nanny before the event." },
  { emoji: '🎉', title: "4. Enjoy Your Day", text: "We take care of the kids while you enjoy the celebrations." }
];

const HowItWorks: React.FC<HowItWorksProps> = ({
  title = "How It Works",
  subtitle = "Booking childcare for your wedding is simple and stress-free.",
  steps = DEFAULT_STEPS
}) => {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair font-extrabold text-navy-gemini dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
          {subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-6 bg-cream-gemini dark:bg-slate-800 rounded-2xl shadow-sm border border-orange-50 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3 transform hover:scale-110 transition-transform cursor-default">{step.emoji}</div>
              <h3 className="text-xl font-bold mb-2 text-navy-gemini dark:text-slate-100">{step.title}</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
