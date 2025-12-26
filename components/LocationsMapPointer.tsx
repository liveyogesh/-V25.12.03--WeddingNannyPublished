
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CITIES_OPTIONS } from '../constants.ts';

const LocationsMapPointer: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Projection logic for India markers
  // These bounds are tuned for the specific SVG path below
  const mapLatToY = (lat: number) => {
    const minLat = 6.0;
    const maxLat = 38.0;
    return ((maxLat - lat) / (maxLat - minLat)) * 100;
  };

  const mapLngToX = (lng: number) => {
    const minLng = 68.0;
    const maxLng = 98.0;
    return ((lng - minLng) / (maxLng - minLng)) * 100;
  };

  const handleCityClick = (path?: string) => {
    if (path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="locations-map-pointer" className="py-24 bg-rose-50/20 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Text Content & List */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] font-bold tracking-widest uppercase mb-4 border border-rose-200 dark:border-rose-800">
                Expanding Coverage 🇮🇳
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-navy-gemini dark:text-white playfair mb-6 leading-tight">
                Premium Childcare, <br/>Now Across India
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-400 max-w-xl">
                We're bringing high-end, vetted event childcare to the most iconic wedding destinations in India. Click on a marker to see how we serve each city.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CITIES_OPTIONS.map((city) => (
                <button
                  key={city.value}
                  onMouseEnter={() => setHoveredCity(city.value)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => handleCityClick(city.path)}
                  className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 ${
                    hoveredCity === city.value
                      ? 'bg-white dark:bg-slate-800 border-rose-500 shadow-xl translate-x-1'
                      : 'bg-white/40 dark:bg-slate-900/40 border-gray-100 dark:border-slate-800 hover:border-rose-300'
                  } ${!city.path ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex-shrink-0">
                      <img src={city.thumbnail} alt={city.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <div className="font-bold text-navy-gemini dark:text-white text-sm flex items-center gap-1.5">
                        {city.label}
                        {city.path && <i className="fas fa-circle-check text-green-500 text-[10px]"></i>}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-slate-500 font-bold">
                        {city.path ? 'Operational' : 'Coming Soon'}
                      </div>
                    </div>
                  </div>
                  {city.path && (
                    <i className={`fas fa-chevron-right absolute right-4 top-1/2 -translate-y-1/2 text-rose-500 transition-all ${hoveredCity === city.value ? 'opacity-100' : 'opacity-0'}`}></i>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Interactive Map Container */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative w-full max-w-[450px] aspect-[400/480] bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-[3rem] p-8 shadow-2xl border border-white dark:border-slate-800 group/map">
              {/* Subtle Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] rounded-[3rem] opacity-40"></div>
              
              <div className="relative w-full h-full">
                {/* SVG Silhouette of India */}
                <svg viewBox="0 0 400 480" className="w-full h-full drop-shadow-2xl filter brightness-100 dark:brightness-90 transition-all duration-700 hover:scale-[1.02]">
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" className="stop-color-rose-50 dark:stop-color-slate-800" style={{ stopColor: 'currentColor' }} />
                      <stop offset="100%" className="stop-color-white dark:stop-color-slate-900" style={{ stopColor: 'currentColor' }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M152.1,8.3c10,4.6,22.2,16,29.9,15c10.5-1.4,26.4-11,38.2-1.9c12,9.3,27.9,16,28,26.3c0,11.3-10.7,18-11.2,28.7 c-0.5,10.6,21.5,10.2,36,11.5c16.3,1.4,32.7,4.8,37.3,20c4.5,14.6-13,15.5-22,12.7c-9.5-3-15.5,16-24.3,23.3c-10.7,8.9-19.4-4-24.1,8.7 c-4.8,12.8-5.3,25.7,3.6,37c8,10.1-5,16.5-15.3,19c-10.3,2.5-24,3-25.7,14c-1.8,11.3,12.3,13.7,13.7,25c1.4,11.3-13.3,16-16,26.7 c-2.7,10.7,11.3,14,12.7,24.7c1.4,10.7-18,21.3-26,35.3s-19.3,58.7-19.3,58.7c0,0-23.3-33.3-38-41.3c-14.7-8-36.7-18-47.3-31.3 c-10.7-13.3-19.3-32-15.3-43.3c4-11.3,13.3-22.7,3.3-38.7c-10-16-12-16.7,10-33.3c22-16.7-10.7-22.7-13.3-32.7c-2.7-10,36.7-10.7,42.7-27.3 C130.4,49,142.1,3.7,152.1,8.3z"
                    className="fill-rose-50 dark:fill-slate-800 stroke-rose-200 dark:stroke-slate-700 stroke-2 transition-colors duration-500"
                  />
                </svg>

                {/* Interactive Markers */}
                {CITIES_OPTIONS.map((city) => {
                  if (!city.lat || !city.lng) return null;
                  
                  const top = mapLatToY(city.lat);
                  const left = mapLngToX(city.lng);
                  const isHovered = hoveredCity === city.value;

                  return (
                    <div
                      key={city.value}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{ top: `${top}%`, left: `${left}%` }}
                      onMouseEnter={() => setHoveredCity(city.value)}
                      onMouseLeave={() => setHoveredCity(null)}
                      onClick={() => handleCityClick(city.path)}
                    >
                      <div className="relative group/marker cursor-pointer p-3">
                        {/* Background Pulsing Ring */}
                        {city.path && (
                          <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${isHovered ? 'bg-rose-500 scale-150' : 'bg-rose-400'}`}></div>
                        )}
                        
                        {/* Marker Core */}
                        <div className={`relative w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-xl transition-all duration-500 ${
                          isHovered 
                            ? 'bg-rose-600 scale-125 ring-4 ring-rose-500/20 dark:ring-rose-400/30' 
                            : city.path ? 'bg-rose-500' : 'bg-gray-400'
                        }`}>
                           {/* Little white dot in center */}
                           <div className="absolute inset-0.5 bg-white rounded-full opacity-40"></div>
                        </div>

                        {/* Floating Tooltip Label */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-300 origin-bottom transform ${
                          isHovered ? 'opacity-100 scale-100 -translate-y-1' : 'opacity-0 scale-75 translate-y-2 pointer-events-none'
                        }`}>
                          <div className="bg-navy-gemini dark:bg-white text-white dark:text-navy-gemini px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 dark:border-gray-200">
                             <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 border border-white/20 dark:border-gray-100">
                                <img src={city.thumbnail} alt="" className="w-full h-full object-cover" />
                             </div>
                             <div className="flex flex-col items-start leading-none">
                               <span className="text-xs font-black uppercase tracking-tight">{city.label}</span>
                               <span className="text-[9px] font-bold opacity-60 mt-1">{city.path ? 'Book Services' : 'Opening Soon'}</span>
                             </div>
                          </div>
                          {/* Triangle Tip */}
                          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-navy-gemini dark:border-t-white mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Footer Information */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-40 text-[9px] font-black uppercase tracking-widest text-navy-gemini dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div> Fully Operational
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div> Expanding
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsMapPointer;
