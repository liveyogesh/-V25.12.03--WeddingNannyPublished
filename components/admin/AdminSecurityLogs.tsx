import React from 'react';
import { useConfig } from '../../context/ConfigContext.tsx';

const AdminSecurityLogs: React.FC = () => {
  const { logs } = useConfig();

  return (
    <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 animate-fadeIn">
      <h2 className="text-4xl font-black text-navy-gemini mb-12 font-sans">Security Audit Trail</h2>
      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="p-8 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-all rounded-3xl group">
             <div className="flex justify-between items-start">
                <div>
                   <h4 className="text-lg font-black text-navy-gemini mb-1 group-hover:text-rose-500 transition-colors">{log.description}</h4>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{new Date(log.timestamp).toLocaleString()} — {log.author}</p>
                </div>
                {log.page && <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{log.page}</span>}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSecurityLogs;