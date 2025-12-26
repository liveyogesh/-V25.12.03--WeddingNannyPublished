
import React, { FormEvent, useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';

const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBookingModal, selectedPackage } = useModal();
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  if (!isBookingOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to proceed with this callback request?")) {
      return;
    }
    setTimeout(() => {
        alert("Request received! We will call you within 24 hours.");
        closeBookingModal();
        setProfilePreview(null);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg max-w-xl w-full p-6 relative animate-fadeIn transition-colors border dark:border-slate-800">
        <button onClick={closeBookingModal} className="absolute top-4 right-4 text-stone-500 hover:text-red-500">✕</button>
        <h3 className="text-xl font-bold dark:text-white">Request a Personalized Callback</h3>
        <div className="text-sm text-rose-gemini font-semibold mt-2">Package: {selectedPackage}</div>
        <div className="flex items-center gap-3 mt-2 text-sm text-stone-600 dark:text-slate-400"><span>🛡️ Vetted caregivers</span><span>⛑️ First-aid leads</span><span>🔒 Secure payment</span></div>
        <p className="text-sm text-stone-600 dark:text-slate-400 mt-2">We will call you within 24 hours. 25% holds the date.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3" autoComplete="off">
          <input type="hidden" name="package" value={selectedPackage} />
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-rose-100 dark:border-slate-700">
              {profilePreview ? (
                <img src={profilePreview} alt="Child Profile" className="w-full h-full object-cover" />
              ) : (
                <i className="fas fa-child text-gray-400 text-2xl"></i>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Upload Child's Profile (Optional)</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 dark:file:bg-slate-800 dark:file:text-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="name" required placeholder="Your name" className="px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-rose-gemini outline-none w-full" />
            <input name="phone" required placeholder="+91 98765 43210" className="px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-rose-gemini outline-none w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="city" required placeholder="City / Venue" className="px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-rose-gemini outline-none w-full" />
            <input name="event_date" type="date" required className="px-3 py-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-rose-gemini outline-none w-full" />
          </div>
          <input name="child_info" required placeholder="Estimated children & ages (e.g. 12 kids: 3 toddlers)" className="px-3 py-2 border rounded w-full outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
          <div className="flex items-start gap-2">
            <input name="consent" type="checkbox" required className="mt-1" />
            <label className="text-sm text-stone-600 dark:text-slate-400">I consent to being contacted and understand 25% holds date.</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-rose-gemini text-white rounded-full font-bold btn-raise shadow-lg">Send Request</button>
            <button type="button" onClick={closeBookingModal} className="px-6 py-2.5 bg-gray-100 dark:bg-slate-800 dark:text-slate-300 rounded-full font-bold hover:bg-gray-200 transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
