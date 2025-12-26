import React from 'react';
import { Tab } from '../../pages/AdminPage.tsx';

interface AdminSidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Platform Health' },
    { id: 'audit-history', icon: 'fa-clock-rotate-left', label: 'Audit Log' },
    { id: 'pages', icon: 'fa-pen-to-square', label: 'Content Editor' },
    { id: 'global', icon: 'fa-earth-asia', label: 'Global SEO' },
    { id: 'backups', icon: 'fa-server', label: 'Snapshots' },
    { id: 'logs', icon: 'fa-shield-halved', label: 'Security' },
  ];

  return (
    <aside className="w-80 bg-navy-gemini text-white p-8 shadow-2xl fixed h-full flex flex-col z-20">
      <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/10">
        <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
          <i className="fas fa-crown text-xl"></i>
        </div>
        <h1 className="text-xl font-black font-sans">Admin HQ</h1>
      </div>
      <nav className="flex-grow space-y-2">
        {navItems.map(t => (
          <button 
            key={t.id} 
            onClick={() => onTabChange(t.id as Tab)} 
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${activeTab === t.id ? 'bg-rose-500 text-white shadow-xl' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <i className={`fas ${t.icon} w-6`}></i>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
      <div className="pt-8 border-t border-white/10 opacity-40 text-[10px] font-bold uppercase tracking-widest text-center">
        v2.5.0-Preview
      </div>
    </aside>
  );
};

export default AdminSidebar;