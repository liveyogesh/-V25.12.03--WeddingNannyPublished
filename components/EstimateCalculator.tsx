
import React, { useState, useEffect, useRef } from 'react';
import { CITIES_OPTIONS } from '../constants.ts';
import { useModal } from '../context/ModalContext.tsx';

interface EstimateCalculatorProps {
  defaultCity?: string;
}

const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({ defaultCity = 'Hyderabad' }) => {
  const { openBookingModal, selectedPackage, setSelectedPackage } = useModal();
  const [city, setCity] = useState(defaultCity);
  
  // Use strings for inputs to allow flexible typing before validation
  const [kidsInput, setKidsInput] = useState("10");
  const [hoursInput, setHoursInput] = useState("6");
  
  const [errors, setErrors] = useState<{ kids?: string; hours?: string }>({});

  const [estimate, setEstimate] = useState({ total: 0, deposit: 0, travel: 0, pkg: '' });
  
  const [isCityDropdownOpen, setCityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const match = CITIES_OPTIONS.find(c => c.value === defaultCity || c.label === defaultCity);
    if(match) setCity(match.value);
  }, [defaultCity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Validation Logic
  useEffect(() => {
    const newErrors: { kids?: string; hours?: string } = {};
    const k = parseInt(kidsInput);
    const h = parseInt(hoursInput);

    if (!kidsInput || isNaN(k)) {
      newErrors.kids = "Required";
    } else if (k < 1) {
      newErrors.kids = "Must be at least 1";
    }

    if (!hoursInput || isNaN(h)) {
      newErrors.hours = "Required";
    } else if (h < 1) {
      newErrors.hours = "Min 1 hour";
    } else if (h > 24) {
      newErrors.hours = "Max 24 hours";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      calculateEstimate(k, h);
    }
  }, [kidsInput, hoursInput, city, selectedPackage]);

  const calculateEstimate = (kids: number, hours: number) => {
    const cityOpt = CITIES_OPTIONS.find(c => c.value === city) || CITIES_OPTIONS[0];
    const travel = cityOpt.travelCost;
    
    let base = 0;
    let pkg = selectedPackage;

    if (selectedPackage === 'Auto Recommend') {
      if (kids <= 3 && hours <= 3) pkg = 'Elopement Care';
      else if (kids <= 6 && hours <= 4) pkg = 'Basic Care';
      else if (kids <= 20) pkg = 'Celebration Premium';
      else pkg = 'Multi-Day Event';
    }

    if (pkg === 'Elopement Care') base = 6000;
    else if (pkg === 'Basic Care') base = 8000;
    else if (pkg === 'Celebration Premium') base = 15000;
    else if (pkg === 'Multi-Day Event') base = 35000;

    const baseHours = pkg === 'Elopement Care' ? 3 : (pkg === 'Basic Care' ? 4 : 6);
    if (hours > baseHours) {
      base = Math.round(base * (1 + (hours - baseHours) * 0.15));
    }

    if (pkg === 'Elopement Care' && kids > 4) base += (kids - 4) * 1000;
    if (pkg === 'Basic Care' && kids > 6) base += (kids - 6) * 800;
    if (pkg === 'Celebration Premium' && kids > 20) base += (kids - 20) * 700;

    const total = base + travel;
    const deposit = Math.round(total * 0.25);

    setEstimate({ total, deposit, travel, pkg });
  };

  const handleBookNow = () => {
    if (Object.keys(errors).length === 0) {
      openBookingModal(estimate.pkg);
    }
  };

  const selectedCityOption = CITIES_OPTIONS.find(c => c.value === city) || CITIES_OPTIONS[0];

  const labelClasses = "text-xs md:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 block";
  // Updated inputClasses for mobile responsiveness (text-base prevents iOS zoom)
  const inputClasses = (hasError: boolean) => 
    `w-full p-3.5 border rounded-xl bg-white dark:bg-slate-800 dark:text-slate-200 outline-none transition-all text-base md:text-sm ${
      hasError 
        ? 'border-rose-500 ring-2 ring-rose-500/20' 
        : 'border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-gemini/20'
    }`;

  return (
    <section id="estimate-calculator" className="py-20 bg-stone-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-navy-gemini dark:text-white playfair">Interactive Pricing Estimator 💰</h2>
          <p className="text-lg text-stone-600 dark:text-slate-400 mt-2">Choose city and requirements to get an instant quote.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-2xl dark:shadow-rose-900/5 border border-gray-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative z-20" ref={dropdownRef}>
              <label className={labelClasses}>📍 <span>Wedding City</span></label>
              <button 
                type="button"
                onClick={() => setCityDropdownOpen(!isCityDropdownOpen)}
                className={`${inputClasses(false)} flex items-center justify-between text-left group`}
                aria-haspopup="listbox"
                aria-expanded={isCityDropdownOpen}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                   <img src={selectedCityOption.thumbnail} alt={selectedCityOption.label} className="w-8 h-8 rounded-full object-cover border border-gray-100 dark:border-slate-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                   <span className="font-semibold truncate">{selectedCityOption.label}</span>
                </div>
                <i className={`fas fa-chevron-down text-rose-500 transition-transform duration-300 ${isCityDropdownOpen ? 'rotate-180' : ''} flex-shrink-0 ml-2`}></i>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-72 overflow-y-auto">
                  <div className="p-1 space-y-0.5" role="listbox">
                    {CITIES_OPTIONS.map((opt) => (
                        <button
                        type="button"
                        key={opt.value}
                        onClick={() => {
                            setCity(opt.value);
                            setCityDropdownOpen(false);
                        }}
                        className={`w-full p-3 flex items-center gap-3 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors rounded-xl text-left group ${city === opt.value ? 'bg-rose-50 dark:bg-slate-700/50' : ''}`}
                        role="option"
                        aria-selected={city === opt.value}
                        >
                        <img src={opt.thumbnail} alt={opt.label} className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform" />
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-navy-gemini dark:text-white text-sm truncate">{opt.label}</div>
                            <div className="text-[10px] md:text-xs text-gray-500 dark:text-slate-400 truncate">Travel Fee: ₹{opt.travelCost}</div>
                        </div>
                        {city === opt.value && <i className="fas fa-check text-rose-500 flex-shrink-0"></i>}
                        </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className={labelClasses}>👶 <span>Number of Kids</span></label>
              <input 
                id="calcKids" 
                type="number" 
                min="1" 
                className={inputClasses(!!errors.kids)} 
                value={kidsInput}
                onChange={(e) => setKidsInput(e.target.value)}
                title="Enter the total number of children requiring supervision at the event."
              />
              {errors.kids && <p className="text-rose-500 text-xs font-bold mt-1 animate-pulse">{errors.kids}</p>}
            </div>

            <div>
              <label className={labelClasses}>
                ⏱️ <span>Duration (Hours)</span>
                <i className="fas fa-info-circle ml-2 text-gray-300 cursor-help" title="Exceeding the base hours (3-6h depending on package) incurs an additional 15% charge per hour."></i>
              </label>
              <input 
                id="calcHours" 
                type="number" 
                min="1" 
                max="24" 
                className={inputClasses(!!errors.hours)} 
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                title="Total hours of on-site service required, from check-in to final pickup."
              />
              {errors.hours ? (
                <p className="text-rose-500 text-xs font-bold mt-1 animate-pulse">{errors.hours}</p>
              ) : (
                <p className="text-[10px] text-gray-400 mt-1 italic leading-tight dark:text-slate-500">* Exceeding base hours adds 15% per hour.</p>
              )}
            </div>

            <div className="relative z-10">
              <label className={labelClasses}>📦 <span>Select Package</span></label>
              <div className="relative">
                <select 
                    id="calcPackage" 
                    className={`${inputClasses(false)} appearance-none cursor-pointer pr-10`} 
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                >
                    <option value="Auto Recommend">Auto Recommend ✨</option>
                    <option value="Elopement Care">Elopement Care</option>
                    <option value="Basic Care">Basic Care</option>
                    <option value="Celebration Premium">Celebration Premium</option>
                    <option value="Multi-Day Event">Multi-Day Event</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-rose-500">
                    <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center bg-gray-50 dark:bg-slate-800/50 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 pb-3 md:pb-0 pr-0 md:pr-4">
              <div className="text-[10px] text-stone-500 dark:text-slate-500 uppercase tracking-widest font-bold mb-1">Total Estimate</div>
              <div id="estPrice" className="text-2xl md:text-3xl font-extrabold text-navy-gemini dark:text-white">
                {Object.keys(errors).length > 0 ? '---' : `₹${estimate.total.toLocaleString('en-IN')}`}
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 pb-3 md:pb-0 pr-0 md:pr-4 px-0 md:px-4">
              <div className="text-[10px] text-stone-500 dark:text-slate-500 uppercase tracking-widest font-bold mb-1">Included Travel</div>
              <div id="estTravel" className="text-lg md:text-xl font-bold text-gray-700 dark:text-slate-300">₹{estimate.travel.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start pl-0 md:pl-4">
              <div className="text-[10px] text-stone-500 dark:text-slate-500 uppercase tracking-widest font-bold mb-1">Deposit (25%)</div>
              <div id="estDeposit" className="text-lg md:text-xl font-bold text-rose-500">
                <span className="inline-block bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 text-rose-500 px-3 py-1 rounded-full font-bold shadow-sm text-base md:text-lg">
                   {Object.keys(errors).length > 0 ? '---' : `₹${estimate.deposit.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4 flex-wrap">
            <button 
              onClick={handleBookNow} 
              disabled={Object.keys(errors).length > 0}
              className="px-8 py-4 bg-rose-500 disabled:bg-rose-300 disabled:cursor-not-allowed text-white rounded-xl btn-raise shadow-xl font-bold flex-grow text-lg order-1 active:scale-[0.98] transition-transform"
            >
              Book Now <i className="fas fa-calendar-check ml-2"></i>
            </button>
            <button onClick={() => window.location.href="#contact"} className="px-6 py-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 font-bold transition-all flex-grow text-lg order-2 active:scale-[0.98]">
              Detailed Quote
            </button>
          </div>

          <div className="mt-6 text-xs text-stone-400 dark:text-slate-500 text-center italic">
            * This is an estimate. Final pricing may vary based on specific logistics.
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateCalculator;
