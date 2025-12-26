import React from 'react';

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/919115117795?text=Hello%2C%20I%20am%20interested%20in%20The%20Wedding%20Nanny%20services." 
      target="_blank" 
      rel="noreferrer"
      className="whatsapp-btn fixed bottom-5 right-5 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl lg:w-16 lg:h-16 lg:text-3xl text-2xl no-print hover:scale-110 transition-transform" 
      aria-label="WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;