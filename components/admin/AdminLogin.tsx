
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';

const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsProcessing(true);
    
    try {
      // Trim whitespace to avoid copy-paste errors
      const success = await login(password.trim());
      if (!success) {
        setError("Invalid credentials. (Check console for debug info)");
      }
    } catch (err) {
      setError("Authentication service unavailable.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center relative">
      <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-12 rounded-[3rem] shadow-2xl w-full max-w-md animate-fadeIn z-10">
        <div className="w-20 h-20 bg-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-rose-500/20">
          <i className="fas fa-shield-halved text-white text-3xl"></i>
        </div>
        <h1 className="text-3xl font-black text-white mb-2 font-sans">Admin HQ</h1>
        <p className="text-slate-400 text-sm mb-8">Secure Access Only</p>
        
        {error && (
          <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-xl animate-shake">
            {error}
          </div>
        )}

        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white outline-none text-center text-2xl tracking-[0.3em] mb-6 focus:border-rose-500 transition-all" 
          autoFocus 
          placeholder="••••••••"
          disabled={isProcessing}
        />
        <button 
          type="submit" 
          disabled={isProcessing}
          className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? <i className="fas fa-circle-notch fa-spin"></i> : 'Authenticate'}
        </button>
        
        <div className="mt-6 flex justify-between items-center text-[10px] text-gray-500">
           <span>Default: <strong>admin</strong></span>
           <button 
             type="button" 
             onClick={() => setShowForgotModal(true)}
             className="text-rose-500 hover:text-rose-400 transition-colors font-bold"
           >
             Forgot Password?
           </button>
        </div>
      </form>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-sm w-full text-left">
            <h3 className="text-white text-xl font-bold mb-4">Reset Credentials</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              This is a secure static application. Password resets require administrator intervention as there is no automated email reset service.
            </p>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              To restore access, please contact the system administrator or perform a hard reset on the local storage if you are the developer.
            </p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowForgotModal(false)}
                className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
