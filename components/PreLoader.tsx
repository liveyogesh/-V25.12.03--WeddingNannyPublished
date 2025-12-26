
import React from 'react';

const PreLoader: React.FC = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream-gemini dark:bg-slate-950 transition-colors duration-700 overflow-hidden">
    {/* Decorative Background Elements */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-300/10 dark:bg-rose-800/5 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

    <div className="relative flex flex-col items-center">
      {/* Central Animated Logo Element */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8">
        {/* Outer Rotating Ring */}
        <div className="absolute inset-0 border-[3px] border-rose-100 dark:border-slate-800 rounded-full"></div>
        <div className="absolute inset-0 border-[3px] border-transparent border-t-rose-500 rounded-full animate-spin-slow"></div>
        
        {/* Inner Pulsing Heart Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-slate-900 rounded-full shadow-xl flex items-center justify-center animate-heartbeat border border-rose-50 dark:border-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-rose-500 animate-float">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Brand & Loading Message */}
      <div className="text-center space-y-3 px-6 max-w-sm">
        <h2 className="text-2xl md:text-3xl font-bold playfair text-navy-gemini dark:text-white animate-fadeIn tracking-tight">
          The Wedding Nanny
        </h2>
        <div className="flex items-center justify-center gap-1.5 h-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500/60 dark:text-rose-400/50 animate-pulse">
            Setting the Stage
          </span>
          <div className="flex gap-1">
             <span className="w-1 h-1 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
             <span className="w-1 h-1 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
             <span className="w-1 h-1 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
        <p className="text-sm text-gray-400 dark:text-slate-500 italic opacity-0 animate-fadeIn" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          Preparing your stress-free celebration...
        </p>
      </div>
    </div>

    {/* Custom Animations Inline */}
    <style>{`
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 2.5s linear infinite;
      }
      @keyframes heartbeat {
        0% { transform: scale(1); box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.1); }
        15% { transform: scale(1.1); box-shadow: 0 20px 35px -5px rgba(244, 63, 94, 0.2); }
        30% { transform: scale(1); box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.1); }
        45% { transform: scale(1.15); box-shadow: 0 25px 45px -5px rgba(244, 63, 94, 0.25); }
        70% { transform: scale(1); box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.1); }
      }
      .animate-heartbeat {
        animation: heartbeat 2s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      .animate-float {
        animation: float 2s ease-in-out infinite;
      }
    `}</style>
  </div>
);

export default PreLoader;
