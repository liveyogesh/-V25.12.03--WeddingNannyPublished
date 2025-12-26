
import React, { useState } from 'react';

interface PartnersProps {
  title?: string;
  subtitle?: string;
}

const Partners: React.FC<PartnersProps> = ({
  title = "Planner & Venue Partnerships 🤝",
  subtitle = "Offer turnkey childcare to your clients. Revenue share & fast onboarding."
}) => {
  const [copied, setCopied] = useState(false);

  const copyTemplate = () => {
    const text = `Subject: Partnership opportunity — The Wedding Nanny\n\nHi [Planner Name],\n\nWe help your couples enjoy their ceremonies while we supervise and entertain their children at the venue. We offer vetted staff, first-aid leads, and a simple revenue share.\n\nWould you be open to a short pilot at a discounted rate? We’ll provide video testimonial and priority listing on our site.\n\n— [Your Name], The Wedding Nanny`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignup = () => {
    const name = prompt('Planner / Venue name:');
    if(name) {
       alert("Thanks — we will reach out within 48 hours.");
    }
  };

  return (
    <section id="partners" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold playfair text-navy-gemini dark:text-white mb-4">{title}</h2>
          <p className="text-lg text-stone-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="font-bold text-xl text-navy-gemini dark:text-slate-100 mb-4">Why partner with us?</h3>
            <ul className="text-stone-600 dark:text-slate-400 space-y-3 list-disc pl-5">
              <li>Dedicated onboarding & 10–15% commission.</li>
              <li>Co-branded offers and pilot events for testimonials.</li>
              <li>Partner portal (lead submission), training & SOPs provided.</li>
            </ul>
            <div className="mt-8">
              <button onClick={handleSignup} className="px-6 py-3 bg-rose-gemini text-white rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all btn-raise">Sign up as a partner</button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="font-bold text-xl text-navy-gemini dark:text-slate-100 mb-4">Planner outreach template</h3>
            <div className="p-4 border dark:border-slate-600 rounded-xl text-xs bg-gray-50 dark:bg-slate-900 font-mono text-gray-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed h-32 overflow-y-auto mb-4">
              Subject: Partnership opportunity — The Wedding Nanny...
            </div>
            <div className="text-right">
              <button onClick={copyTemplate} className="px-4 py-2 bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-full hover:bg-gray-50 dark:hover:bg-slate-600 text-sm font-bold transition-all shadow-sm">
                {copied ? 'Copied!' : <><i className="fas fa-copy mr-2"></i> Copy Template</>}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 p-10 rounded-3xl mt-12 border border-rose-100 dark:border-rose-900/30">
          <h2 className="text-2xl font-extrabold mb-8 text-navy-gemini dark:text-white text-center">How We Work Together</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
               <div className="w-12 h-12 bg-rose-gemini text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold shadow-md">1</div>
               <h3 className="font-bold mb-2 text-navy-gemini dark:text-slate-100">Partner Benefits</h3>
               <p className="text-sm text-gray-600 dark:text-slate-400">Flexible add-on at proposal stage. Dedicated partner liaison.</p>
            </div>
            <div>
               <div className="w-12 h-12 bg-rose-gemini text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold shadow-md">2</div>
               <h3 className="font-bold mb-2 text-navy-gemini dark:text-slate-100">How It Works</h3>
               <p className="text-sm text-gray-600 dark:text-slate-400">Share brief -> We propose staffing -> Confirm with 25%.</p>
            </div>
             <div>
               <div className="w-12 h-12 bg-rose-gemini text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold shadow-md">3</div>
               <h3 className="font-bold mb-2 text-navy-gemini dark:text-slate-100">Onboarding</h3>
               <p className="text-sm text-gray-600 dark:text-slate-400">Simple 5-minute call. No long-term lock-ins.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
