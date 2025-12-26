
import React from 'react';

interface WeddingRealityProps {
  title?: string;
  subtitle?: string;
}

const WeddingReality: React.FC<WeddingRealityProps> = ({
  title = "The Wedding Reality",
  subtitle = "Weddings are joyful — but they can run long. Parents often miss special moments when they manage children. Below is a simple comparison of a day without dedicated childcare versus a day with our on-demand team on-site."
}) => {
  return (
    <section id="wedding-reality" className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl playfair font-extrabold text-navy-gemini dark:text-white mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
          {subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-6">
          {/* BEFORE US */}
          <div className="p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30 bg-rose-gemini/5 dark:bg-rose-900/20 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-2xl font-extrabold playfair text-rose-gemini">Before Us</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Unstructured, stressful, and full of interruptions.</p>
              </div>
              <div className="text-4xl" aria-hidden="true">😟</div>
            </div>

            <ul className="space-y-4 text-left flex-grow">
              <li className="flex gap-3 items-start">
                <span className="text-xl">👪</span>
                <div className="text-sm text-gray-700 dark:text-slate-300"><strong className="font-semibold block text-gray-900 dark:text-white">Parents on duty</strong> family members juggle ceremonies and childcare.</div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-xl">😓</span>
                <div className="text-sm text-gray-700 dark:text-slate-300"><strong className="font-semibold block text-gray-900 dark:text-white">Bored kids</strong> tantrums and early exits increase.</div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-xl">📆</span>
                <div className="text-sm text-gray-700 dark:text-slate-300"><strong className="font-semibold block text-gray-900 dark:text-white">Planner stress</strong> last-minute babysitting requests.</div>
              </li>
            </ul>
          </div>

          {/* WITH US */}
          <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-cream-gemini dark:bg-slate-900/50 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-2xl font-extrabold playfair text-navy-gemini dark:text-white">With The Wedding Nanny</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Structured, calm, and joyful for every guest.</p>
              </div>
              <div className="text-4xl" aria-hidden="true">🎉</div>
            </div>

            <ul className="space-y-4 text-left flex-grow">
              <li className="flex gap-3 items-start">
                <span className="text-xl">🧑‍⚕️</span>
                <div className="text-sm text-gray-700 dark:text-slate-300"><strong className="font-semibold block text-gray-900 dark:text-white">Qualified caregivers</strong> background-checked and first-aid trained.</div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-xl">🎨</span>
                <div className="text-sm text-gray-700 dark:text-slate-300"><strong className="font-semibold block text-gray-900 dark:text-white">Engaging activity corners</strong> crafts, games and calm-down zones.</div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-xl">🛌</span>
                <div className="text-sm text-gray-700 dark:text-slate-300"><strong className="font-semibold block text-gray-900 dark:text-white">Dedicated nap & meal area</strong> quiet supervised space.</div>
              </li>
            </ul>
             <div className="mt-6 text-left pt-4 border-t border-gray-200 dark:border-slate-800">
                <a href="#contact" className="text-sm font-bold text-rose-gemini hover:underline">Book a childcare plan →</a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingReality;
