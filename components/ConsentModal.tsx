
import React from 'react';
import { useModal } from '../context/ModalContext.tsx';

const ConsentModal: React.FC = () => {
  const { isConsentOpen, closeConsentModal } = useModal();

  if (!isConsentOpen) return null;

  return (
    <div className="fixed inset-0 bg-navy-gemini/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print transition-all">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-lg w-full animate-fadeIn border dark:border-slate-800">
        <h3 className="text-2xl font-bold mb-4 text-navy-gemini dark:text-white playfair">Terms of Service & Privacy</h3>
        <div className="h-64 overflow-y-auto text-gray-700 dark:text-slate-400 text-sm space-y-4 pr-3 custom-scrollbar">
          <p><strong className="text-navy-gemini dark:text-slate-200">Service Agreement:</strong> The Wedding Nanny provides professional childcare services for designated event periods. Our nannies are vetted, background-checked, and trained for group supervision. We require a detailed brief on all children's needs (allergies, special requirements) at least 7 days prior to the event.</p>
          <p><strong className="text-navy-gemini dark:text-slate-200">Booking & Security:</strong> A 25% deposit is required to confirm and hold your event date. This deposit allows us to secure staff and begin zone planning.</p>
          <p><strong className="text-navy-gemini dark:text-slate-200">Cancellation Policy:</strong> The 25% deposit is non-refundable as it covers planning and staffing allocations. Cancellations made less than 30 days before the event date are subject to the full payment fee.</p>
          <p><strong className="text-navy-gemini dark:text-slate-200">Privacy:</strong> We collect contact information solely for the purpose of booking and managing our services. We do not share client data with third parties without explicit consent. By checking the box on the contact form, you consent to receive communication regarding your quote and booking.</p>
          <p className="text-rose-gemini font-bold border-l-4 border-rose-gemini pl-3 py-1 bg-rose-50 dark:bg-rose-900/10">This is a summary. Full terms are available upon booking confirmation.</p>
        </div>
        <div className="flex justify-end mt-8">
          <button onClick={closeConsentModal} className="cta-button text-white font-bold py-3 px-10 rounded-full hover:shadow-lg btn-raise">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;
