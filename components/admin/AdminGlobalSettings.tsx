
import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

const AdminGlobalSettings: React.FC = () => {
  const { globalConfig, updateGlobalConfig } = useConfig();
  const { changePassword } = useAuth();

  // Password Change State
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg(null);

    if (newPass.length < 5) {
      setPassMsg({ type: 'error', text: "New password must be at least 5 characters." });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg({ type: 'error', text: "New passwords do not match." });
      return;
    }

    setIsChanging(true);
    const result = await changePassword(currPass, newPass);
    setIsChanging(false);

    if (result.success) {
      setPassMsg({ type: 'success', text: result.message });
      setCurrPass("");
      setNewPass("");
      setConfirmPass("");
    } else {
      setPassMsg({ type: 'error', text: result.message });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Global Config Section */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
        <h2 className="text-4xl font-black text-navy-gemini font-sans mb-8">Global Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Site Name</label>
              <input value={globalConfig.siteName} onChange={e => updateGlobalConfig({ ...globalConfig, siteName: e.target.value })} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl font-black text-navy-gemini focus:border-rose-500 outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Meta Title (Default)</label>
              <input value={globalConfig.metaTitle} onChange={e => updateGlobalConfig({ ...globalConfig, metaTitle: e.target.value })} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl font-bold text-navy-gemini focus:border-rose-500 outline-none" />
            </div>
             <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Meta Description (Default)</label>
              <textarea value={globalConfig.metaDescription} onChange={e => updateGlobalConfig({ ...globalConfig, metaDescription: e.target.value })} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl h-40 focus:border-rose-500 outline-none resize-none" />
            </div>
          </div>
          <div className="space-y-8">
             <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">robots.txt</label>
              <textarea value={globalConfig.robotsTxt} onChange={e => updateGlobalConfig({ ...globalConfig, robotsTxt: e.target.value })} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl h-32 font-mono text-xs focus:border-rose-500 outline-none resize-none" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">sitemap.xml</label>
              <textarea value={globalConfig.sitemapXml} onChange={e => updateGlobalConfig({ ...globalConfig, sitemapXml: e.target.value })} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl h-32 font-mono text-xs focus:border-rose-500 outline-none resize-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
           <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Head Scripts (Analytics/Pixels)</label>
              <textarea value={globalConfig.headScripts} onChange={e => updateGlobalConfig({ ...globalConfig, headScripts: e.target.value })} className="w-full p-5 bg-gray-900 text-green-400 border border-gray-800 rounded-3xl h-48 font-mono text-xs focus:border-rose-500 outline-none resize-none" placeholder="<script>...</script>" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Footer Scripts (Chat Widgets)</label>
              <textarea value={globalConfig.footerScripts} onChange={e => updateGlobalConfig({ ...globalConfig, footerScripts: e.target.value })} className="w-full p-5 bg-gray-900 text-green-400 border border-gray-800 rounded-3xl h-48 font-mono text-xs focus:border-rose-500 outline-none resize-none" placeholder="<script>...</script>" />
            </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-500">
            <i className="fas fa-lock text-xl"></i>
          </div>
          <h2 className="text-3xl font-black text-navy-gemini font-sans">Security & Access</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="max-w-xl">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Current Password</label>
              <input 
                type="password" 
                value={currPass} 
                onChange={e => setCurrPass(e.target.value)} 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-rose-500 transition-colors"
                placeholder="••••••••" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">New Password</label>
                <input 
                  type="password" 
                  value={newPass} 
                  onChange={e => setNewPass(e.target.value)} 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-rose-500 transition-colors"
                  placeholder="••••••••" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Confirm New</label>
                <input 
                  type="password" 
                  value={confirmPass} 
                  onChange={e => setConfirmPass(e.target.value)} 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-rose-500 transition-colors"
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {passMsg && (
              <div className={`p-4 rounded-xl text-xs font-bold ${passMsg.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-500'}`}>
                {passMsg.type === 'success' ? <i className="fas fa-check-circle mr-2"></i> : <i className="fas fa-exclamation-circle mr-2"></i>}
                {passMsg.text}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isChanging || !currPass || !newPass} 
              className="bg-navy-gemini text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChanging ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGlobalSettings;
