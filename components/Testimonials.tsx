import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Testimonial } from '../types.ts';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Determine items per page based on screen width
  const updateItemsPerPage = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setItemsPerPage(3);
    } else if (window.innerWidth >= 768) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(1);
    }
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [updateItemsPerPage]);

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-cycle logic
  useEffect(() => {
    if (!isPaused && testimonials.length > itemsPerPage) {
      timerRef.current = window.setInterval(next, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next, testimonials.length, itemsPerPage]);

  // Ensure index is valid if itemsPerPage changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair md:text-5xl font-extrabold text-navy-gemini dark:text-white mb-6">Loved by Parents & Planners 🥂</h2>
        <p className="text-xl text-gray-500 dark:text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          Hear from couples and event planners who trust us to manage the children's experience flawlessly.
        </p>

        <div 
          className="relative px-4 md:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-100 dark:border-slate-700 text-rose-500 hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-100 dark:border-slate-700 text-rose-500 hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25, 1, 0.5, 1)]"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {testimonials.map((t, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="h-full p-8 bg-cream-gemini dark:bg-slate-800/80 rounded-3xl shadow-lg border border-rose-100 dark:border-slate-700 transition hover:shadow-2xl text-left relative group">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-rose-gemini rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-quote-left text-sm"></i>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex text-yellow-500 text-sm gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`${i < t.rating ? 'fas' : 'far'} fa-star`}></i>
                        ))}
                      </div>
                      {t.location && (
                        <span className="text-[10px] bg-rose-100 dark:bg-rose-900/50 text-rose-gemini dark:text-rose-300 px-3 py-1 rounded-full font-bold tracking-widest uppercase border dark:border-rose-900/50">
                          📍 {t.location}
                        </span>
                      )}
                    </div>
                    <p className="italic text-gray-700 dark:text-slate-300 mb-6 leading-relaxed">"{t.text}"</p>
                    <div className="mt-auto font-bold text-navy-gemini dark:text-white text-base">— {t.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-rose-500 w-8' : 'bg-gray-300 dark:bg-slate-700 hover:bg-rose-300'}`}
                aria-label={`Go to testimonial slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-16 flex-wrap">
          {[
            "✔ Trusted by Modern Couples",
            "✔ Seamlessly Works with Planners",
            "✔ Loved by Families in All Cities"
          ].map((badge, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 shadow-sm rounded-full px-6 py-2.5 border border-rose-100 dark:border-slate-700">
              <p className="text-navy-gemini dark:text-slate-200 font-bold text-sm tracking-wide">{badge}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;