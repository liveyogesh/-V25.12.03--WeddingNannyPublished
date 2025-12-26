import React from 'react';

interface TrustProps {
  title: string;
  description: string;
}

const Trust: React.FC<TrustProps> = ({ title, description }) => {
  return (
    <section id="trust" className="py-20 bg-rose-50 dark:bg-slate-950 border-t border-rose-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair font-extrabold text-navy-gemini dark:text-white mb-6">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🛡️", title: "Background-Checked Nannies", text: "All caregivers complete reference and ID verification, including police background checks, before joining our team." },
            { icon: "⛑️", title: "First-Aid Trained Leads", text: "Senior nannies receive pediatric first-aid and emergency-response training to handle event-specific childcare needs." },
            { icon: "📋", title: "Event-Ready Protocols", text: "From check-in sheets to allergy notes and supervised areas, we follow structured SOPs to ensure safety and comfort for every child." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 text-left hover:shadow-xl transition-shadow group">
              <div className="text-4xl mb-6 transform group-hover:-translate-y-1 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-navy-gemini dark:text-slate-100">{item.title}</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;