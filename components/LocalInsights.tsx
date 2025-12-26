
import React from 'react';

interface LocalInsightsProps {
  title: string;
  content: string[];
}

const LocalInsights: React.FC<LocalInsightsProps> = ({ title, content }) => {
  return (
    <section id="local-insights" className="max-w-6xl mx-auto px-4 mt-8 pb-12 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border-l-8 border-rose-gemini dark:border-rose-500">
        <h2 className="text-3xl font-extrabold mb-6 text-navy-gemini dark:text-white playfair">{title}</h2>
        <div className="space-y-4">
          {content.map((paragraph, idx) => (
            <p key={idx} className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalInsights;
