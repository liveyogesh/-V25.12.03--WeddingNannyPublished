
import React, { useState } from 'react';
import { ComparisonFeature } from '../types.ts';

interface PackageComparisonProps {
  title?: string;
  subtitle?: string;
  features?: ComparisonFeature[];
}

const DEFAULT_FEATURES: ComparisonFeature[] = [
  { label: "Vetted Nannies", elopement: "1", basic: "1-2", premium: "2-4", multi: "Dedicated Team" },
  { label: "Child Ratio", elopement: "1:4", basic: "1:4", premium: "1:4", multi: "1:4" },
  { label: "Duration", elopement: "3 Hours", basic: "4 Hours", premium: "6 Hours", multi: "3+ Functions" },
  { label: "Activity Zone", elopement: "Basic Kit", basic: "Supervised Play", premium: "Custom Themed", multi: "Multiple Setups" },
  { label: "Nap Area", elopement: false, basic: true, premium: true, multi: true },
  { label: "Meal Help", elopement: false, basic: true, premium: true, multi: true },
  { label: "Parent Updates", elopement: false, basic: false, premium: true, multi: true },
  { label: "Lead intro", elopement: false, basic: true, premium: true, multi: true },
];

const PackageComparison: React.FC<PackageComparisonProps> = ({
  title = "Compare Plans Side-by-Side ⚖️",
  subtitle = "Find the perfect balance of care and entertainment for your specific guest list.",
  features = DEFAULT_FEATURES
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="package-comparison" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair md:text-5xl font-extrabold text-navy-gemini dark:text-white mb-6">{title}</h2>
        <p className="text-xl text-gray-500 dark:text-slate-400 mb-8 max-w-3xl mx-auto">{subtitle}</p>

        {!isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            className="group inline-flex items-center gap-2 px-8 py-3 bg-rose-50 dark:bg-slate-800 text-rose-gemini font-bold rounded-full border border-rose-100 dark:border-slate-700 hover:bg-rose-gemini hover:text-white transition-all duration-300 shadow-sm"
          >
            Show Full Comparison
            <i className="fas fa-chevron-down group-hover:translate-y-0.5 transition-transform"></i>
          </button>
        ) : (
          <div className="animate-fadeIn">
            <div className="overflow-x-auto pb-4">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border dark:border-slate-700">
                <thead>
                  <tr className="bg-navy-gemini text-white">
                    <th className="p-6 text-lg font-bold">Features</th>
                    <th className="p-6 text-center">
                      <span className="block text-sm opacity-70">Budget</span>
                      <span className="text-lg">Elopement</span>
                    </th>
                    <th className="p-6 text-center">
                      <span className="block text-sm opacity-70">Short</span>
                      <span className="text-lg">Basic</span>
                    </th>
                    <th className="p-6 text-center bg-rose-gemini relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-navy-gemini text-[10px] px-3 py-1 rounded-full font-bold">BEST VALUE</div>
                      <span className="block text-sm opacity-70">Full Event</span>
                      <span className="text-lg font-extrabold">Premium</span>
                    </th>
                    <th className="p-6 text-center">
                      <span className="block text-sm opacity-70">3+ Functions</span>
                      <span className="text-lg">Multi-Day</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {features.map((f, i) => (
                    <tr key={i} className="hover:bg-rose-50/30 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="p-6 font-bold text-navy-gemini dark:text-slate-200">{f.label}</td>
                      <td className="p-6 text-center text-sm text-gray-600 dark:text-slate-400">{renderValue(f.elopement)}</td>
                      <td className="p-6 text-center text-sm text-gray-600 dark:text-slate-400">{renderValue(f.basic)}</td>
                      <td className="p-6 text-center text-sm font-bold text-rose-gemini bg-rose-50/10 dark:bg-rose-900/5">{renderValue(f.premium)}</td>
                      <td className="p-6 text-center text-sm text-gray-600 dark:text-slate-400">{renderValue(f.multi)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-6"></td>
                    <td className="p-6 text-center"><button onClick={() => window.location.href="#contact"} className="text-xs font-bold text-rose-gemini underline text-sm">Choose</button></td>
                    <td className="p-6 text-center"><button onClick={() => window.location.href="#contact"} className="text-xs font-bold text-rose-gemini underline text-sm">Choose</button></td>
                    <td className="p-6 text-center bg-rose-50/10 dark:bg-rose-900/5"><button onClick={() => window.location.href="#contact"} className="text-xs font-bold text-rose-gemini bg-rose-gemini text-white px-4 py-2 rounded-full shadow-lg">Most Popular</button></td>
                    <td className="p-6 text-center"><button onClick={() => window.location.href="#contact"} className="text-xs font-bold text-rose-gemini underline text-sm">Enquire</button></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <button 
              onClick={() => setIsExpanded(false)}
              className="mt-8 text-sm font-bold text-gray-400 hover:text-rose-gemini transition-colors uppercase tracking-widest"
            >
              <i className="fas fa-chevron-up mr-2"></i> Hide Comparison
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

function renderValue(val: string | boolean) {
  if (typeof val === 'boolean') {
    return val ? <i className="fas fa-check-circle text-green-500 text-lg"></i> : <i className="fas fa-times-circle text-gray-200 text-lg"></i>;
  }
  return val;
}

export default PackageComparison;
