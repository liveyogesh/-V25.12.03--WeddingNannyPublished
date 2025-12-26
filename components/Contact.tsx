
import React, { useState, FormEvent, useEffect } from 'react';
import { useModal } from '../context/ModalContext.tsx';

interface ContactProps {
  defaultCity?: string;
  title?: string;
  subtitle?: string;
}

interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  event_date: string;
  city_venue: string;
  preferred_package: string;
  details: string;
  privacy_consent: boolean;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone_number?: string;
  event_date?: string;
  city_venue?: string;
  preferred_package?: string;
  details?: string;
  privacy_consent?: string;
}

const Contact: React.FC<ContactProps> = ({ 
  defaultCity = 'Delhi-NCR',
  title = "Let's Plan the Kids' Party! 🥳",
  subtitle = "Fill out this form for a detailed quote tailored to your event."
}) => {
  const { openConsentModal, selectedPackage, setSelectedPackage } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const initialFormState: FormData = {
    full_name: '',
    email: '',
    phone_number: '',
    event_date: '',
    city_venue: defaultCity,
    preferred_package: selectedPackage || '',
    details: '',
    privacy_consent: false,
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedPackage && selectedPackage !== 'Auto Recommend') {
      setFormData(prev => ({ ...prev, preferred_package: selectedPackage }));
    }
  }, [selectedPackage]);

  const validateField = (name: string, value: string | boolean) => {
    let error = '';
    switch (name) {
      case 'full_name':
        if (!value) error = 'Full name is required';
        else if ((value as string).length < 2) error = 'Name is too short';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'Email is required';
        else if (!emailRegex.test(value as string)) error = 'Invalid email format';
        break;
      case 'phone_number':
        const phoneRegex = /^(\+?\d{1,4}[\s-]?)?[\d\s-]{10,15}$/;
        if (!value) error = 'Phone number is required';
        else if (!phoneRegex.test(value as string)) error = 'Please use format like +91 98765-43210';
        break;
      case 'event_date':
        if (!value) error = 'Event date is required';
        else {
          const selected = new Date(value as string);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selected < today) error = 'Event date cannot be in the past';
        }
        break;
      case 'city_venue':
        if (!value) error = 'City and venue are required';
        break;
      case 'preferred_package':
        if (!value) error = 'Please select a package';
        break;
      case 'details':
        if (!value) error = 'Details are required';
        else if ((value as string).length < 10) error = 'Please provide more details (min 10 chars)';
        break;
      case 'privacy_consent':
        if (!value) error = 'You must agree to the terms';
        break;
      default:
        break;
    }
    return error;
  };

  useEffect(() => {
    const newErrors: FormErrors = {};
    let valid = true;
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        valid = false;
      }
    });
    setErrors(newErrors);
    setIsFormValid(valid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    
    if (name === 'preferred_package') {
      setSelectedPackage(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      const allTouched: Record<string, boolean> = {};
      Object.keys(formData).forEach(k => allTouched[k] = true);
      setTouched(allTouched);
      return;
    }

    if (!window.confirm("Are you sure you want to proceed with this request?")) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ ...initialFormState, preferred_package: '' });
      setTouched({});
    }, 1500);
  };

  const renderError = (name: keyof FormErrors) => {
    if (touched[name] && errors[name]) {
      return <p className="text-rose-600 text-xs mt-1 ml-1 font-medium">{errors[name]}</p>;
    }
    return null;
  };

  const inputClasses = (name: keyof FormErrors) => 
    `w-full p-4 border rounded-xl outline-none transition-all bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 shadow-sm ${
      touched[name] && errors[name] 
        ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/10 focus:ring-rose-200' 
        : 'border-gray-200 dark:border-slate-700 focus:ring-4 focus:ring-rose-gemini/10 focus:border-rose-gemini'
    }`;

  return (
    <section id="contact" className="py-24 bg-rose-50/30 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:space-x-12">
        <div className="lg:w-7/12 p-8 md:p-12 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl transition-colors border border-gray-100 dark:border-slate-700">
          <h2 className="text-3xl playfair md:text-4xl font-extrabold text-navy-gemini dark:text-white mb-4">{title}</h2>
          <p className="text-lg text-gray-500 dark:text-slate-400 mb-10">{subtitle}</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="full_name" 
                    placeholder="e.g. Aditi Sharma" 
                    value={formData.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('full_name')} 
                  />
                  {renderError('full_name')}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('email')} 
                  />
                  {renderError('email')}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone_number" 
                  placeholder="+91 98765-43210" 
                  value={formData.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClasses('phone_number')} 
                />
                {renderError('phone_number')}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Date</label>
                  <input 
                    type="date" 
                    name="event_date" 
                    value={formData.event_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('event_date')} 
                  />
                  {renderError('event_date')}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">City & Venue</label>
                  <input 
                    type="text" 
                    name="city_venue" 
                    placeholder="Venue Name, City" 
                    value={formData.city_venue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('city_venue')} 
                  />
                  {renderError('city_venue')}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Preferred Package</label>
                <select 
                  name="preferred_package" 
                  value={formData.preferred_package}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClasses('preferred_package')} cursor-pointer`}
                >
                  <option value="" disabled>Select Preferred Package</option>
                  <option value="Auto Recommend">Auto Recommend ✨</option>
                  <option value="Elopement Care">Elopement Care</option>
                  <option value="Basic Care">Basic Care</option>
                  <option value="Celebration Premium">Celebration Premium</option>
                  <option value="Multi-Day Event">Multi-Day Event</option>
                </select>
                {renderError('preferred_package')}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Details</label>
                <textarea 
                  name="details" 
                  placeholder="Tell us about the number of kids, ages, and any special requests..." 
                  rows={4} 
                  value={formData.details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClasses('details')}
                ></textarea>
                {renderError('details')}
              </div>

              <div className="flex flex-col pt-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="privacy_consent" 
                    id="privacyConsent" 
                    checked={formData.privacy_consent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mr-3 rounded text-rose-gemini focus:ring-rose-gemini h-5 w-5 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 transition-all cursor-pointer" 
                  />
                  <label htmlFor="privacyConsent" className="text-sm text-gray-600 dark:text-slate-400 leading-tight cursor-pointer">
                    I agree to the <button type="button" onClick={openConsentModal} className="text-rose-gemini dark:text-rose-400 hover:underline font-bold">Terms of Service</button>.
                  </label>
                </div>
                {renderError('privacy_consent')}
              </div>

              <button 
                type="submit" 
                disabled={loading || (!isFormValid && Object.keys(touched).length > 0)} 
                className={`cta-button w-full text-white font-bold py-4 mt-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all ${
                  (!isFormValid && Object.keys(touched).length > 0) ? 'opacity-50 cursor-not-allowed grayscale' : ''
                }`}
              >
                {loading ? 'Processing...' : <>Send My Inquiry <i className="fas fa-paper-plane ml-2"></i></>}
              </button>
            </form>
          ) : (
            <div className="mt-6 p-10 bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-3xl text-center space-y-6 animate-fadeIn">
              <div className="text-6xl">✨</div>
              <h3 className="text-3xl font-extrabold playfair">Request Received!</h3>
              <p className="text-lg font-medium opacity-90">Thank you! Our concierge team will reach out to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-sm text-green-700 dark:text-green-400 font-bold underline hover:opacity-75 transition-opacity">Submit another inquiry</button>
            </div>
          )}
        </div>

        <div className="lg:w-5/12 mt-12 lg:mt-0 space-y-8">
          <div className="p-8 bg-navy-gemini dark:bg-slate-950 text-white rounded-3xl shadow-2xl space-y-8 border border-white/5 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold playfair text-yellow-400 mb-3">Planner & Venue Partners 🤝</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">Expand your service offerings by adding professional event childcare to your packages. We offer dedicated support and commissions for our regular partners.</p>
              <a href="mailto:partners@weddingnanny.in" className="inline-flex items-center text-lg font-bold text-white bg-rose-gemini py-3 px-8 rounded-full hover:bg-rose-600 transition shadow-lg btn-raise">
                Become a Partner <i className="fas fa-handshake ml-2"></i>
              </a>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
            <h3 className="text-2xl font-extrabold playfair text-navy-gemini dark:text-white mb-4">Urgent Inquiries? 📱</h3>
            <p className="text-gray-500 dark:text-slate-400 mb-6 leading-relaxed">Planning a last-minute event? Tap below to chat with our booking specialist on WhatsApp.</p>
            <a href="https://wa.me/919115117795" target="_blank" rel="noreferrer" className="w-full text-lg font-bold text-white bg-green-500 py-3 px-8 rounded-full inline-flex items-center justify-center hover:bg-green-600 transition shadow-lg btn-raise">
              <i className="fab fa-whatsapp text-2xl mr-3"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
