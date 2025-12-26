import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { CITIES_OPTIONS } from '../constants.ts';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocDropdownOpen, setLocDropdownOpen] = useState(false);
  const [isMobileLocExpanded, setIsMobileLocExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();
  const locRef = useRef<HTMLDivElement>(null);
  
  // Dynamic Title Logic
  const currentCity = useMemo(() => {
    return CITIES_OPTIONS.find(c => c.path === pathname) || null;
  }, [pathname]);

  const logoText = currentCity ? currentCity.label : '';

  const filteredCities = useMemo(() => {
    return CITIES_OPTIONS.filter(c => 
      c.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(e.target as Node)) setLocDropdownOpen(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  // Clear search term when dropdowns close
  useEffect(() => {
    if (!isLocDropdownOpen && !isMobileLocExpanded) {
      setSearchTerm('');
    }
  }, [isLocDropdownOpen, isMobileLocExpanded]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // Prevent scroll if already near the target position (10px threshold)
      if (Math.abs(window.scrollY - offsetPosition) > 10) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleCitySelect = (path: string | undefined) => {
    if (path) {
      localStorage.setItem('wn_preferred_city_path', path);
      navigate(path);
    } else if (path === undefined) {
      // "All India" selection
      localStorage.removeItem('wn_preferred_city_path');
      navigate('/');
    }
    
    if (path !== undefined && !path) return; // catch-all for empty string path if ever
    
    setLocDropdownOpen(false);
    // Also close mobile state if active
    setIsMobileMenuOpen(false);
    setIsMobileLocExpanded(false);
  };

  const getThemeIcon = () => {
    switch (mode) {
      case 'light': return <i className="fas fa-sun"></i>;
      case 'dark': return <i className="fas fa-moon"></i>;
      case 'auto': return <i className="fas fa-wand-magic-sparkles"></i>;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 shadow-sm backdrop-blur-md no-print border-b border-gray-100 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-1.5 md:py-4 flex justify-between items-center">
          <Link to="/" className="text-lg md:text-3xl font-extrabold playfair text-rose-500 tracking-tight flex items-center group" aria-label="The Wedding Nanny Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 64 64" role="img" className="md:w-[46px] md:h-[46px]">
              <rect rx="12" width="64" height="64" className="fill-orange-50 dark:fill-slate-800"/>
              <g transform="translate(6,6)">
                <circle cx="22" cy="16" r="12" className="fill-rose-500"/>
                <text x="22" y="20" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" fill="#fff" fontWeight="700">WN</text>
              </g>
            </svg>
            <span className="ml-2 font-bold text-rose-500 text-sm md:text-2xl truncate max-w-[150px] md:max-w-none">
              The Wedding Nanny <span className="hidden lg:inline">{logoText && `— ${logoText}`}</span>
            </span>
          </Link>

          <nav role="navigation" className="hidden lg:flex items-center space-x-5 lg:space-x-8 text-sm lg:text-base font-semibold text-gray-700 dark:text-slate-200">
            <div className="relative" ref={locRef}>
              <button 
                onClick={() => setLocDropdownOpen(!isLocDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-700 transition-all font-bold shadow-sm"
                aria-label="Select City"
                aria-expanded={isLocDropdownOpen}
              >
                <i className="fas fa-map-marker-alt"></i>
                <span className="max-w-[120px] truncate">{logoText || 'All India'}</span>
                <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${isLocDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {isLocDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden py-2 animate-fadeIn">
                  <div className="px-4 pb-3 pt-1">
                    <div className="relative">
                      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                      <input 
                        type="text" 
                        placeholder="Search our cities..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 dark:text-white"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto scrollbar-hide">
                    {!searchTerm && (
                      <button onClick={() => handleCitySelect(undefined)} className="w-full text-left px-5 py-3 hover:bg-rose-50 dark:hover:bg-slate-700 text-sm font-semibold text-gray-900 dark:text-white transition-colors">All India</button>
                    )}
                    {filteredCities.map(c => (
                      <button 
                        key={c.value} 
                        onClick={() => c.path && handleCitySelect(c.path)}
                        disabled={!c.path}
                        className={`w-full text-left px-5 py-3 hover:bg-rose-50 dark:hover:bg-slate-700 text-sm font-semibold transition-colors flex justify-between items-center ${!c.path ? 'opacity-50 cursor-not-allowed italic text-gray-500 dark:text-slate-500' : 'text-gray-900 dark:text-white'}`}
                      >
                        <span>{c.label}</span>
                        {!c.path && <span className="text-[9px] uppercase tracking-wide opacity-70 border border-gray-200 dark:border-slate-600 px-1.5 py-0.5 rounded ml-2">Coming Soon</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleNavClick('services')} className="hover:text-rose-500 transition-colors py-2 relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
            <button onClick={() => handleNavClick('packages')} className="hover:text-rose-500 transition-colors py-2 relative group">
              Packages
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
            <button onClick={() => handleNavClick('faq')} className="hover:text-rose-500 transition-colors py-2 relative group">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
            
            <button onClick={toggleMode} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800 text-rose-500 shadow-inner border border-gray-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-all transform hover:scale-110" aria-label="Toggle Dark Mode">
              {getThemeIcon()}
            </button>

            <a href="tel:+919115117795" className="hidden xl:flex items-center gap-2 text-white bg-rose-500 px-6 py-2.5 rounded-full font-bold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <i className="fas fa-phone-alt"></i><span>Call Now</span>
            </a>
          </nav>

          <div className="flex items-center gap-1.5 lg:hidden">
            <button onClick={toggleMode} className="p-2 rounded-full text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle Dark Mode">{getThemeIcon()}</button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-rose-500 p-2 rounded-lg bg-rose-50 dark:bg-slate-800 border border-rose-100 dark:border-slate-700 shadow-sm active:scale-95 transition-transform" aria-label="Open Menu"><i className="fas fa-bars"></i></button>
          </div>
        </div>
      </header>

      {/* Mobile Optimized Drawer */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-visibility duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        <div className={`relative w-[280px] bg-white dark:bg-slate-900 h-full shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-5 flex justify-between items-center border-b border-gray-50 dark:border-slate-800">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center shadow-md">
                 <i className="fas fa-heart text-white text-[10px]"></i>
               </div>
               <span className="font-bold text-slate-900 dark:text-white text-base playfair">The Wedding Nanny</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-gray-500 hover:text-rose-500 transition-colors" aria-label="Close Menu">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
          
          <nav role="navigation" className="flex-1 overflow-y-auto pt-6 px-3 space-y-1 custom-scrollbar">
            {/* Mobile Location Selector */}
            <div className="mb-6 mx-1">
              <button 
                onClick={() => setIsMobileLocExpanded(!isMobileLocExpanded)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all shadow-sm ${isMobileLocExpanded ? 'bg-white dark:bg-slate-800 border-rose-500 ring-1 ring-rose-500' : 'bg-rose-50 dark:bg-slate-800/50 border-rose-100 dark:border-slate-700'}`}
                aria-label="Change City"
                aria-expanded={isMobileLocExpanded}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isMobileLocExpanded ? 'bg-rose-500 text-white' : 'bg-white dark:bg-slate-700 text-rose-500'}`}>
                    <i className="fas fa-map-marker-alt text-xs"></i>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-500 tracking-wider">Current City</div>
                    <div className="font-bold text-navy-gemini dark:text-white text-sm">{logoText || 'All India'}</div>
                  </div>
                </div>
                <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-300 ${isMobileLocExpanded ? 'rotate-180 text-rose-500' : ''}`}></i>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileLocExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                 <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-2 shadow-sm">
                   <div className="relative mb-2">
                      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                      <input 
                        type="text" 
                        placeholder="Filter cities..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()} 
                        className="w-full pl-9 pr-4 py-2.5 text-xs bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 dark:text-white transition-all"
                      />
                   </div>
                   <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
                      {!searchTerm && (
                        <button 
                          onClick={() => handleCitySelect(undefined)}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-semibold text-gray-600 dark:text-slate-300 transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> All India
                        </button>
                      )}
                      {filteredCities.map(c => (
                        <button 
                          key={c.value}
                          onClick={() => c.path && handleCitySelect(c.path)}
                          disabled={!c.path}
                          className={`w-full text-left px-3 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-700 text-sm font-semibold transition-colors flex items-center justify-between ${!c.path ? 'opacity-50 cursor-not-allowed italic text-gray-500 dark:text-slate-500' : 'text-navy-gemini dark:text-slate-200'}`}
                        >
                          <div className="flex items-center gap-2">
                            <img src={c.thumbnail} alt="" className="w-6 h-6 rounded-md object-cover border border-gray-100 dark:border-slate-600" />
                            <span>{c.label}</span>
                          </div>
                          {c.path ? (
                            currentCity?.value === c.value && <i className="fas fa-check text-rose-500 text-xs"></i>
                          ) : (
                            <span className="text-[8px] uppercase tracking-wide opacity-70 border border-gray-200 dark:border-slate-600 px-1.5 py-0.5 rounded">Coming Soon</span>
                          )}
                        </button>
                      ))}
                      {filteredCities.length === 0 && (
                         <div className="text-center py-4 text-xs text-gray-400 italic">No cities found</div>
                      )}
                   </div>
                 </div>
              </div>
            </div>

            <p className="text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-widest mb-4 ml-4">Explore Menu</p>
            <div className="space-y-1">
               {[
                 { label: 'Home', icon: 'fa-house', action: () => { navigate('/'); setIsMobileMenuOpen(false); } },
                 { label: 'Services', icon: 'fa-star', action: () => handleNavClick('services') },
                 { label: 'Packages', icon: 'fa-gift', action: () => handleNavClick('packages') },
                 { label: 'FAQ', icon: 'fa-circle-question', action: () => handleNavClick('faq') },
                 { label: 'Partners', icon: 'fa-handshake', action: () => handleNavClick('partners') },
               ].map((item, idx) => (
                 <button 
                  key={item.label}
                  onClick={item.action} 
                  className="group w-full text-left text-sm font-bold text-slate-700 dark:text-slate-200 transition-all py-3.5 px-4 rounded-xl flex items-center justify-between relative overflow-hidden active:bg-rose-50 dark:active:bg-rose-500/10"
                  style={{ 
                    animationDelay: `${idx * 60}ms`, 
                    animation: isMobileMenuOpen ? 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none', 
                    opacity: isMobileMenuOpen ? 1 : 0 
                  }}
                >
                  <div className="flex items-center gap-3 group-hover:translate-x-1.5 transition-transform duration-300">
                    <i className={`fas ${item.icon} text-rose-500 opacity-60 text-[10px] w-4`}></i>
                    <span>{item.label}</span>
                  </div>
                  <i className="fas fa-arrow-right text-[8px] opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></i>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-rose-500 group-hover:h-1/2 transition-all duration-300 rounded-r-full"></span>
                </button>
               ))}
            </div>
            
            <div className="pt-8 px-2 space-y-3">
              <button 
                onClick={() => handleNavClick('contact')} 
                className="w-full py-4 px-6 bg-rose-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-500/20 active:scale-[0.97] transition-all hover:brightness-110"
              >
                Inquire & Book
              </button>
              <a href="tel:+919115117795" className="flex items-center justify-center gap-3 py-3.5 w-full text-slate-800 dark:text-slate-300 font-bold bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-gray-100 dark:border-slate-700 active:scale-[0.97] transition-all">
                <i className="fas fa-phone-alt text-rose-500 text-[10px]"></i> +91 911 511 7795
              </a>
            </div>
          </nav>
          
          <div className="p-5 border-t border-gray-50 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/50 flex justify-between items-center">
             <div className="flex gap-5">
               {['fa-instagram', 'fa-whatsapp'].map(icon => (
                 <a key={icon} href="#" className="text-gray-400 hover:text-rose-500 transition-colors" aria-label={icon}><i className={`fab ${icon} text-lg`}></i></a>
               ))}
             </div>
             <button onClick={toggleMode} className="flex items-center gap-2 text-[9px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-800 px-3.5 py-2 rounded-full border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all" aria-label="Toggle Dark Mode">
               {getThemeIcon()}
             </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Header;