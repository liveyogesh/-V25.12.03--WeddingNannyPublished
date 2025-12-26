
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext.tsx';

const Footer: React.FC = () => {
  const { openConsentModal } = useModal();
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleExploreAll = () => {
    localStorage.removeItem('wn_preferred_city_path');
    navigate('/');
  };

  return (
    <footer id="footer" className="bg-[#020617] text-gray-400 pt-12 pb-8 transition-colors duration-300 border-t border-slate-900 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4 md:gap-x-8">
          
          {/* Column 1: Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-[13px] md:text-base mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Quick Links
            </h4>
            <ul className="space-y-3 md:space-y-4 text-[11px] md:text-sm font-medium">
              <li><button onClick={() => handleNavClick('services')} className="hover:text-rose-500 transition-colors text-left block">Services Overview</button></li>
              <li><button onClick={() => handleNavClick('packages')} className="hover:text-rose-500 transition-colors text-left block">Pricing & Packages</button></li>
              <li><button onClick={() => handleNavClick('partners')} className="hover:text-rose-500 transition-colors text-left block">Partner with Us</button></li>
              <li><button onClick={openConsentModal} className="hover:text-rose-500 transition-colors text-left block">Privacy Policy</button></li>
              <li><Link to="/admin" className="hover:text-rose-500 transition-colors block">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Column 2: Locations */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-[13px] md:text-base mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Locations
            </h4>
            <ul className="space-y-3 md:space-y-4 text-[11px] md:text-sm font-medium">
              <li>
                <Link to="/hyderabad" className="hover:text-rose-500 transition-colors flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-rose-500/60 w-3 text-center"></i> Hyderabad, TS
                </Link>
              </li>
              <li>
                <Link to="/ballia" className="hover:text-rose-500 transition-colors flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-rose-500/60 w-3 text-center"></i> Ballia, UP
                </Link>
              </li>
              <li>
                <Link to="/delhi-ncr" className="hover:text-rose-500 transition-colors flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-rose-500/60 w-3 text-center"></i> Delhi & NCR
                </Link>
              </li>
              <li className="pt-2">
                <button 
                  onClick={handleExploreAll}
                  className="hover:text-rose-500 transition-colors flex items-center gap-2 text-left font-bold text-white/90"
                >
                  <i className="fas fa-globe text-rose-500 w-3 text-center"></i> Explore All Cities
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-[13px] md:text-base mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Contact Us
            </h4>
            <div className="space-y-3 md:space-y-5">
              <a href="tel:+919115117795" className="hover:text-rose-500 transition-colors flex items-center gap-3 text-[11px] md:text-sm font-medium">
                <i className="fa-solid fa-phone text-rose-500 w-4 text-center"></i> +91 911 511 7795
              </a>
              <a href="mailto:hello@weddingnanny.in" className="hover:text-rose-500 transition-colors flex items-center gap-3 text-[11px] md:text-sm font-medium truncate">
                <i className="fa-solid fa-envelope text-rose-500 w-4 text-center"></i> hello@weddingnanny.in
              </a>
              
              <div className="flex space-x-2 md:space-x-3 pt-4">
                {[
                  { icon: 'fa-instagram', label: 'Instagram', href: '#' },
                  { icon: 'fa-facebook-f', label: 'Facebook', href: '#' },
                  { icon: 'fa-youtube', label: 'YouTube', href: '#' }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    aria-label={social.label} 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900/50 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm group"
                  >
                    <i className={`fa-brands ${social.icon} text-xs md:text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Branding Column - Desktop only or secondary on mobile */}
          <div className="col-span-3 lg:col-span-1 pt-8 lg:pt-0 border-t border-slate-900 lg:border-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-rose-500 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-heart text-white text-sm"></i>
              </div>
              <span className="font-bold text-lg text-white playfair">The Wedding Nanny</span>
            </div>
            <p className="text-[11px] md:text-xs leading-relaxed max-w-sm">
              Premium childcare for Indian weddings. Professional vetting, first-aid leads, and supervised zones.
            </p>
          </div>
        </div>
        
        <div className="text-center text-[10px] md:text-[11px] border-t border-slate-900 pt-8 mt-12 opacity-30 tracking-widest uppercase font-bold">
          &copy; {new Date().getFullYear()} The Wedding Nanny. Modern Childcare for Indian Celebrations.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
