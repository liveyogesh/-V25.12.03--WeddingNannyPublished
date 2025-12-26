
import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

interface HeroProps {
  title: string;
  subtitle: string;
  imageAlt: string;
  pillText?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageAlt, pillText }) => {
  const { resolvedTheme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Refs for elements that animate on scroll to avoid state re-renders
  const heroRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blobCenterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const y = window.scrollY;

      // Apply transforms directly to the DOM elements
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${y * 0.08}px`;
      }
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(0, ${y * 0.1}px, 0) scale(${1 + y * 0.0001})`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(0, ${y * -0.05}px, 0)`;
      }
      if (blobCenterRef.current) {
        blobCenterRef.current.style.transform = `translate3d(-50%, calc(-50% + ${y * -0.05}px), 0)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${y * 0.03}px, 0)`;
      }
      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.transform = `translate3d(0, ${y * -0.04}px, 0)`;
      }
      if (imageRef.current) {
        imageRef.current.style.transform = `rotate(${y * 0.005}deg)`;
      }
      if (heartRef.current) {
        heartRef.current.style.transform = `rotate(${2 + y * 0.01}deg) translate3d(0, ${Math.sin(y * 0.01) * 3}px, 0)`;
        heartRef.current.style.boxShadow = `0 ${8 + y * 0.03}px ${16 + y * 0.05}px rgba(244, 63, 94, 0.15)`;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = () => {
    const el = document.getElementById('estimate-calculator');
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        const input = document.getElementById('calcKids');
        if (input) input.focus();
      }, 500);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const radialGradient = resolvedTheme === 'dark' 
    ? 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.03) 0%, transparent 60%)'
    : 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.06) 0%, transparent 70%)';

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="hero-pattern relative overflow-hidden pt-16 pb-20 md:pt-24 lg:pt-32 bg-rose-50 dark:bg-slate-950 border-b-4 border-rose-gemini/20 dark:border-rose-900/10 transition-colors duration-300"
      style={{ 
        backgroundImage: `${radialGradient}, var(--tw-bg-image)`,
        willChange: 'background-position'
      }}
    >
      {/* Dynamic Background Blobs - Subtler Parallax Layers */}
      <div 
        ref={blob1Ref}
        className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-rose-200/15 dark:bg-rose-900/10 rounded-full blur-[140px] pointer-events-none z-0"
      ></div>
      
      <div 
        ref={blob2Ref}
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-rose-300/10 dark:bg-rose-800/5 rounded-full blur-[120px] pointer-events-none z-0"
      ></div>

      <div className="max-w-7xl mx-auto px-4 lg:flex lg:items-center relative z-10">
        <div 
          ref={textRef}
          className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left transition-transform duration-300 ease-out"
        >
          {pillText && (
            <div className="inline-block px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-gemini dark:text-rose-400 text-[10px] md:text-sm font-bold tracking-widest uppercase mb-4 animate-fadeIn border border-rose-200 dark:border-rose-900/50 shadow-sm">
              {pillText}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-navy-gemini dark:text-white leading-tight playfair mb-6 drop-shadow-sm">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-slate-300 mb-4">{subtitle}</p>
          <p className="text-base md:text-lg text-gray-600 dark:text-slate-400 mt-2 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Professional childcare as a premium add-on. We create supervised kids’ areas and comfortable spaces so parents can fully enjoy the celebration while their children are safely entertained.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-start gap-4 w-full max-w-md mx-auto lg:mx-0">
            <button 
              onClick={scrollToContact} 
              className="cta-button text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transition w-full sm:w-auto text-center btn-raise group"
            >
              Book Stress-Free Day 
              <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>

            <button 
              onClick={scrollToPricing} 
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-navy-gemini dark:text-slate-200 font-bold py-4 px-8 rounded-full text-lg shadow-sm hover:shadow-md transition w-full sm:w-auto inline-flex items-center justify-center btn-raise"
            >
              <i className="fas fa-calculator mr-2 text-rose-500" aria-hidden="true"></i>
              Instant estimate
            </button>
          </div>

          <div className="mt-12 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed flex flex-wrap justify-center lg:justify-start gap-y-1">
             <span>Vetted caregivers</span>
             <span className="mx-3 text-rose-gemini opacity-30">•</span>
             <span>First-aid leads</span>
             <span className="mx-3 text-rose-gemini opacity-30">•</span>
             <span>On-demand add-on</span>
             <span className="mx-3 text-rose-gemini opacity-30">•</span>
             <span>25% holds the date</span>
          </div>
        </div>

        <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div 
            ref={imageWrapperRef}
            className="relative group w-full max-w-[540px]"
          >
             <img 
              ref={imageRef}
              src={`https://placehold.co/600x400/f43f5e/ffffff?text=${encodeURIComponent(imageAlt)}`} 
              alt={imageAlt || "Childcare services provided by The Wedding Nanny"} 
              title={imageAlt || "Childcare services provided by The Wedding Nanny"}
              onLoad={() => setImageLoaded(true)}
              className={`rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 transition-all duration-1000 max-w-full h-auto cursor-pointer ${!imageLoaded ? 'skeleton-img opacity-50' : 'opacity-100'} group-hover:scale-[1.01]`}
              loading="eager"
            />
            
            {/* Refined Scroll-Synced Floating Heart Icon */}
            <div 
              ref={heartRef}
              className="absolute -top-6 -left-6 md:-top-8 md:-left-8 bg-white dark:bg-slate-800 p-4 md:p-5 rounded-full shadow-2xl text-3xl md:text-4xl border-2 md:border-4 border-rose-gemini transition-all z-20 pointer-events-none"
              style={{ 
                // Initial state
                transform: `rotate(2deg) translate3d(0, 0, 0)`,
                boxShadow: `0 8px 16px rgba(244, 63, 94, 0.15)`
              }}
            >
              💖
            </div>
            
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-navy-gemini/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        </div>
      </div>
      
      {/* Centered subtle parallax blob */}
      <div 
        ref={blobCenterRef}
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-rose-200/5 dark:bg-rose-900/5 rounded-full blur-[160px] pointer-events-none -z-0"
        style={{ transform: `translate3d(-50%, -50%, 0)` }}
      ></div>
    </section>
  );
};

export default Hero;
