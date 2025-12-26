
import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { PackageType } from '../types.ts';

interface PackagesProps {
  title?: string;
  subtitle?: string;
  items?: PackageType[];
}

const DEFAULT_PACKAGES: PackageType[] = [
  {
    name: "Elopement Care",
    description: "Perfect for intimate elopements or small dinners.",
    price: "₹6,000+",
    subPrice: "for up to 3 hours",
    features: [
      { text: "1 Vetted Nanny", included: true },
      { text: "Basic Supervision Only", included: true },
      { text: "Small Activity Kit Included", included: true },
      { text: "No Custom Zone Setup", included: false }
    ],
    badge: "BUDGET FRIENDLY"
  },
  {
    name: "Basic Care",
    description: "Ideal for smaller, shorter functions.",
    price: "₹8,000+",
    subPrice: "for up to 4 hours",
    features: [
      { text: "1-2 Vetted Nannies", included: true },
      { text: "Supervised Play Area", included: true },
      { text: "Basic Meal Assistance", included: true },
      { text: "No Custom Activity Zone", included: false }
    ]
  },
  {
    name: "Celebration Premium",
    description: "Our recommended full-service experience.",
    price: "₹15,000+",
    subPrice: "for up to 6 hours",
    features: [
      { text: "2-4 Vetted Nannies (1:4 Ratio)", included: true },
      { text: "Custom Activity Zone", included: true },
      { text: "Dedicated Nap Area Setup", included: true },
      { text: "Parent Communication Support", included: true }
    ],
    recommended: true,
    colorTheme: "navy",
    badge: "MOST POPULAR 🏆"
  },
  {
    name: "Multi-Day Event",
    description: "For Sangeet, Mehendi, and Wedding.",
    price: "Custom",
    subPrice: "Best for 3+ functions",
    features: [
      { text: "Dedicated Lead Nanny", included: true },
      { text: "Bulk Discounted Rate", included: true },
      { text: "Seamless Setup Transition", included: true },
      { text: "Priority Scheduling", included: true }
    ]
  }
];

const Packages: React.FC<PackagesProps> = ({
  title = "Our Stress-Free Packages 💍",
  subtitle = "Choose the level of care that fits your celebration. All packages require a 25% deposit to secure your date.",
  items = DEFAULT_PACKAGES
}) => {
  const { setSelectedPackage } = useModal();

  const handleSelect = (pkg: string) => {
    setSelectedPackage(pkg);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-20 bg-rose-50 dark:bg-slate-950 border-t border-b border-rose-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl playfair md:text-5xl font-extrabold text-navy-gemini dark:text-white mb-4">{title}</h2>
        <p className="text-xl text-gray-500 dark:text-slate-400 mb-12 max-w-4xl mx-auto">{subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {items.map((pkg, idx) => {
            const isPremium = pkg.colorTheme === 'navy';
            return (
              <div 
                key={idx}
                className={`package-card p-6 rounded-3xl shadow-xl flex flex-col relative overflow-hidden transition duration-300 border dark:border-slate-700
                  ${isPremium 
                    ? 'bg-navy-gemini dark:bg-slate-800 border-t-8 border-yellow-400 transform lg:scale-[1.05] hover:lg:scale-[1.08] ring-4 ring-yellow-400/20' 
                    : 'bg-white dark:bg-slate-900 border-t-8 border-rose-300 dark:border-rose-400/50 hover:shadow-rose-300/40'
                  }
                `}
              >
                {pkg.badge && (
                  <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold border z-10 
                    ${isPremium ? 'absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-navy-gemini py-1 px-4 mt-4 shadow-lg' : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'}
                  `}>
                    {pkg.badge}
                  </div>
                )}
                
                <h3 className={`text-2xl font-extrabold mb-2 playfair ${isPremium ? 'text-white mt-2' : 'text-navy-gemini dark:text-white'}`}>
                  {pkg.name}
                </h3>
                <p className={`mb-4 text-sm ${isPremium ? 'text-rose-200 dark:text-rose-400/80' : 'text-gray-500 dark:text-slate-400'}`}>
                  {pkg.description}
                </p>
                <div className={`text-4xl font-bold mb-6 ${isPremium ? 'text-yellow-400' : 'text-rose-gemini'}`}>
                  {pkg.price} 
                  <span className={`text-xs font-normal block ${isPremium ? 'text-white/70' : 'text-gray-500 dark:text-slate-500'}`}>
                    {pkg.subPrice}
                  </span>
                </div>
                
                <ul className={`text-left space-y-3 mb-8 flex-grow text-sm ${isPremium ? 'text-white' : 'text-gray-700 dark:text-slate-300'}`}>
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className={`flex items-start ${!feat.included ? (isPremium ? 'opacity-50' : 'text-gray-400 dark:text-slate-600') : ''}`}>
                      <i className={`fas ${feat.included ? 'fa-check-circle' : 'fa-times-circle'} mt-1 mr-3 ${feat.included ? (isPremium ? 'text-yellow-400' : 'text-green-500') : (isPremium ? 'text-gray-400' : 'text-gray-300 dark:text-slate-700')}`}></i>
                      <span className={feat.included && isPremium && fIdx === 1 ? 'font-bold' : ''}>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSelect(pkg.name)} 
                  className={`w-full font-bold py-3 px-4 rounded-full shadow-xl transition text-sm btn-raise
                    ${isPremium ? 'bg-yellow-400 text-navy-gemini hover:bg-yellow-300' : 'cta-button text-white'}
                  `}
                >
                  {isPremium ? 'Select Premium' : (pkg.name.includes('Multi') ? 'Custom Quote' : 'Select & Secure')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Packages;
