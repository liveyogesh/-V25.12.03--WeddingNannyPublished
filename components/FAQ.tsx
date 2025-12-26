import React, { useState } from 'react';
import { FAQItem } from '../types.ts';

interface FAQProps {
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const copyLink = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevent toggling the FAQ when clicking the link icon
    const url = new URL(window.location.href);
    url.hash = `faq-${index}`;
    navigator.clipboard.writeText(url.toString());
    
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="faq" className="py-24 bg-rose-50/50 dark:bg-slate-950 border-t border-b border-rose-200/50 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl playfair md:text-5xl font-extrabold text-navy-gemini dark:text-white mb-6">Questions Answered 💡</h2>
          <p className="text-xl text-gray-500 dark:text-slate-400 leading-relaxed">Everything you need to know about our premium event childcare.</p>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const isCopied = copiedIndex === idx;
            
            return (
              <div 
                key={idx} 
                id={`faq-${idx}`}
                className={`group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-rose-100 dark:border-slate-800 overflow-hidden transition-all duration-300 ${isOpen ? 'ring-2 ring-rose-500/10 shadow-lg translate-y-[-2px]' : 'hover:border-rose-300 dark:hover:border-slate-700'}`}
              >
                <button 
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center focus:outline-none transition-colors" 
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-rose-500' : 'text-navy-gemini dark:text-slate-100'}`}>
                      {item.question}
                    </span>
                    
                    {/* Copy Link Button - Visible on hover */}
                    <button
                      onClick={(e) => copyLink(e, idx)}
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 transform ${isCopied ? 'bg-green-500 text-white scale-110' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-rose-500 opacity-0 group-hover:opacity-100'}`}
                      title="Copy link to this question"
                      aria-label="Copy link to this question"
                    >
                      {isCopied ? (
                        <i className="fas fa-check text-[10px] animate-scaleIn"></i>
                      ) : (
                        <i className="fas fa-link text-[10px]"></i>
                      )}
                      
                      {isCopied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold animate-fadeIn whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>

                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-rose-gemini text-white rotate-180 shadow-md' : 'bg-rose-50 dark:bg-slate-800 text-rose-gemini'}`}>
                     <i className="fas fa-chevron-down text-sm"></i>
                  </div>
                </button>

                {/* Smooth Grid Transition for content */}
                <div 
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${isOpen ? 'grid-template-rows-[1fr] opacity-100' : 'grid-template-rows-[0fr] opacity-0'}`}
                  style={{ display: 'grid' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-gray-600 dark:text-slate-400 border-t border-gray-50 dark:border-slate-800/50 leading-relaxed text-lg animate-fadeInFast">
                      <p className="mt-4">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .grid-template-rows-\\[1fr\\] { grid-template-rows: 1fr; }
        .grid-template-rows-\\[0fr\\] { grid-template-rows: 0fr; }
        
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }

        .animate-fadeInFast {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default FAQ;