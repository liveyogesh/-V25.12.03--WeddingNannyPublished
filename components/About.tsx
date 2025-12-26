
import React from 'react';

interface AboutProps {
  title?: string;
  paragraphs?: string[];
  imageAlt?: string;
  statsCount?: string;
  statsLabel?: string;
}

const DEFAULT_PARAGRAPHS = [
  "The Wedding Nanny was created to help families enjoy weddings without worrying about childcare. Parents deserve to be fully present for the big moments, and children deserve a space where they feel safe, engaged, and cared for.",
  "Our nannies are experienced, background-checked, and trained for event environments. From infants who need constant attention to toddlers who need structured activities, we support families through every ceremony.",
  "We are committed to giving parents peace of mind, creating a joyful experience for kids, and making every celebration smoother for planners and venues."
];

const About: React.FC<AboutProps> = ({
  title = "About The Wedding Nanny",
  paragraphs = DEFAULT_PARAGRAPHS,
  imageAlt = "About The Wedding Nanny",
  statsCount = "100+",
  statsLabel = "Events Served"
}) => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 lg:flex lg:space-x-12 items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-4xl playfair font-extrabold text-navy-gemini dark:text-white mb-6">
            {title}
          </h2>
          <div className="space-y-4 text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="relative group">
            <img 
              src={`https://placehold.co/500x350/f43f5e/ffffff?text=${encodeURIComponent(imageAlt)}`}
              alt={imageAlt}
              className="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 skeleton-img max-w-full h-auto transition-transform group-hover:scale-105 duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-rose-gemini text-white p-6 rounded-2xl shadow-xl hidden md:block animate-fadeIn">
              <div className="text-3xl font-bold">{statsCount}</div>
              <div className="text-xs uppercase font-bold tracking-widest opacity-80">{statsLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
