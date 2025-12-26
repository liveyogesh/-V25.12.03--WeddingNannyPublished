
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

// Modular Admin Components
import AdminLogin from '../components/admin/AdminLogin.tsx';
import AdminSidebar from '../components/admin/AdminSidebar.tsx';
import AdminDashboard from '../components/admin/AdminDashboard.tsx';
import AdminContentEditor from '../components/admin/AdminContentEditor.tsx';
import AdminGlobalSettings from '../components/admin/AdminGlobalSettings.tsx';
import AdminAuditHistory from '../components/admin/AdminAuditHistory.tsx';
import AdminSecurityLogs from '../components/admin/AdminSecurityLogs.tsx';

export type Tab = 'dashboard' | 'pages' | 'global' | 'backups' | 'logs' | 'audit-history';

const AdminPage: React.FC = () => {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const { mode, toggleMode } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  if (isLoading) return null; // Or a localized spinner

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Platform Health';
      case 'pages': return 'Content Management';
      case 'global': return 'Global Configuration';
      case 'backups': return 'Platform Snapshots';
      case 'logs': return 'Security Logs';
      case 'audit-history': return 'Audit History';
      default: return 'Admin';
    }
  };

  const getThemeIcon = () => {
    switch (mode) {
      case 'light': return <i className="fas fa-sun"></i>;
      case 'dark': return <i className="fas fa-moon"></i>;
      case 'auto': return <i className="fas fa-wand-magic-sparkles"></i>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Sidebar Navigation */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 ml-80 p-12">
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">{getTitle()}</h1>
           
           <div className="flex items-center gap-6">
             <button 
               onClick={toggleMode} 
               className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors"
               title="Toggle Theme"
             >
               <span className="text-lg">{getThemeIcon()}</span>
               <span className="hidden md:inline">{mode} Mode</span>
             </button>

             <div className="w-px h-4 bg-gray-300 dark:bg-slate-700"></div>

             <button 
              onClick={logout} 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors"
            >
              <i className="fas fa-sign-out-alt text-lg"></i>
              <span className="hidden md:inline">Logout</span>
            </button>
           </div>
        </header>

        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'audit-history' && <AdminAuditHistory />}
        {activeTab === 'pages' && <AdminContentEditor />}
        {activeTab === 'global' && <AdminGlobalSettings />}
        {activeTab === 'logs' && <AdminSecurityLogs />}
        
        {activeTab === 'backups' && (
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-sm border border-gray-100 dark:border-slate-800 animate-fadeIn">
            <h2 className="text-4xl font-black text-navy-gemini dark:text-white mb-12">Platform Snapshots</h2>
            <div className="p-10 bg-gray-50 dark:bg-slate-800 rounded-[2.5rem] text-center italic text-gray-400 dark:text-slate-500">
               <i className="fas fa-server text-6xl mb-6"></i>
               <p>Automated snapshots are running via StorageService.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
